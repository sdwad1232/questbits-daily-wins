import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, CheckCircle2 } from 'lucide-react';
import { Habit } from '@/types';
import { useApp } from '@/context/AppContext';
import { getTodayDate, wasLoggedOnDate } from '@/lib/dateUtils';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from '@/hooks/use-toast';

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const { t } = useTranslation();
  const { state, dispatch } = useApp();
  const [isLogging, setIsLogging] = useState(false);
  
  const today = getTodayDate();
  const isLoggedToday = wasLoggedOnDate(state.logs, habit.id, today);

  const handleLog = async () => {
    if (isLoggedToday) return;
    
    setIsLogging(true);
    dispatch({ type: 'LOG_HABIT', payload: { habitId: habit.id, date: today } });
    
    toast({
      title: t('habit.logged'),
      description: `+10 ${t('dashboard.points').toLowerCase()}`,
      duration: 2000,
    });
    
    setTimeout(() => setIsLogging(false), 300);
  };

  const handleDelete = () => {
    if (window.confirm(t('habit.confirmDelete'))) {
      dispatch({ type: 'DELETE_HABIT', payload: habit.id });
      toast({
        title: t('habit.delete'),
        description: habit.name,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{habit.name}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleLog}
            disabled={isLoggedToday || isLogging}
            variant={isLoggedToday ? "secondary" : "default"}
            className="min-w-20"
          >
            {isLoggedToday ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-1" />
                {t('habit.logged')}
              </>
            ) : (
              t('habit.log')
            )}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from '@/hooks/use-toast';

export function AddHabitDialog() {
  const { t } = useTranslation();
  const { state, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const canAddMore = state.habits.length < 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    if (!canAddMore) {
      toast({
        title: t('dashboard.maxHabits'),
        variant: 'destructive',
      });
      return;
    }

    dispatch({
      type: 'ADD_HABIT',
      payload: {
        id: crypto.randomUUID(),
        name: name.trim(),
        createdAt: new Date().toISOString(),
      },
    });

    toast({
      title: t('habit.add'),
      description: name.trim(),
    });

    setName('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={!canAddMore}>
          <Plus className="w-4 h-4 mr-2" />
          {t('dashboard.addHabit')}
          {!canAddMore && ` (${state.habits.length}/10)`}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('dashboard.addHabit')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="habit-name">{t('habit.name')}</Label>
            <Input
              id="habit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('habit.placeholder')}
              maxLength={50}
              autoFocus
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t('habit.cancel')}
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {t('habit.add')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

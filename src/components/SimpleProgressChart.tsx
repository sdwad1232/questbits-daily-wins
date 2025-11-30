import { useTranslation } from 'react-i18next';
import { useApp } from '@/context/AppContext';
import { getLast30Days } from '@/lib/dateUtils';
import { Card } from './ui/card';

export function SimpleProgressChart() {
  const { t } = useTranslation();
  const { state } = useApp();
  
  const last30Days = getLast30Days();
  
  // Count habits logged per day
  const dailyCounts = last30Days.map(date => {
    return state.logs.filter(log => log.date === date).length;
  });

  const maxCount = Math.max(...dailyCounts, 1);

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">{t('chart.title')}</h2>
      
      <div className="space-y-4">
        {/* Chart visualization */}
        <div className="flex items-end justify-between gap-1 h-40">
          {dailyCounts.map((count, index) => {
            const height = (count / maxCount) * 100;
            const isToday = index === dailyCounts.length - 1;
            
            return (
              <div key={last30Days[index]} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t transition-all ${
                    count > 0
                      ? isToday
                        ? 'bg-accent'
                        : 'bg-primary'
                      : 'bg-muted'
                  }`}
                  style={{ height: `${Math.max(height, 4)}%` }}
                  title={`${last30Days[index]}: ${count} ${count === 1 ? 'habit' : 'habits'}`}
                />
              </div>
            );
          })}
        </div>
        
        {/* Day labels (show every 5th day) */}
        <div className="flex justify-between text-xs text-muted-foreground">
          {[1, 5, 10, 15, 20, 25, 30].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" />
            <span>{t('chart.habitsLogged')}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

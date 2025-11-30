import { useTranslation } from 'react-i18next';
import { useApp } from '@/context/AppContext';
import { Trophy, Zap } from 'lucide-react';
import { Card } from './ui/card';

export function StatsCard() {
  const { t } = useTranslation();
  const { state, level } = useApp();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t('dashboard.points')}</p>
            <p className="text-2xl font-bold text-foreground">{state.points}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Trophy className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t('dashboard.level')}</p>
            <p className="text-2xl font-bold text-foreground">{level}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

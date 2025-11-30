import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Award } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getEarnedBadges, getLockedBadges } from '@/lib/badges';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function BadgesModal() {
  const { t } = useTranslation();
  const { state } = useApp();
  const [open, setOpen] = useState(false);

  const earnedBadges = getEarnedBadges(state.points);
  const lockedBadges = getLockedBadges(state.points);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Award className="w-4 h-4 mr-2" />
          {t('badges.viewBadges')} ({earnedBadges.length}/3)
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('badges.title')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {earnedBadges.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-success flex items-center gap-2">
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  {t('badges.earned')}
                </Badge>
              </h3>
              <div className="space-y-2">
                {earnedBadges.map((badge) => (
                  <Card key={badge.id} className="p-4 bg-success/5 border-success/20">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{badge.icon}</span>
                      <div>
                        <h4 className="font-semibold text-foreground">{t(`badges.${badge.id}`)}</h4>
                        <p className="text-sm text-muted-foreground">{t(`badges.${badge.id}Desc`)}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {lockedBadges.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Badge variant="outline" className="bg-muted">
                  {t('badges.locked')}
                </Badge>
              </h3>
              <div className="space-y-2">
                {lockedBadges.map((badge) => (
                  <Card key={badge.id} className="p-4 opacity-60 bg-muted/20">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl grayscale">{badge.icon}</span>
                      <div>
                        <h4 className="font-semibold text-foreground">{t(`badges.${badge.id}`)}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t(`badges.${badge.id}Desc`)} • {badge.pointsRequired - state.points} more points
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

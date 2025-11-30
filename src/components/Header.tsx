import { useTranslation } from 'react-i18next';
import { Trophy, Globe } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import questbitsIcon from '@/assets/questbits-icon.png';

export function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={questbitsIcon} alt="QuestBits" className="w-10 h-10 sm:w-12 sm:h-12" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {t('app.title')}
            </h1>
            <span className="hidden sm:inline text-sm text-muted-foreground">
              {t('app.tagline')}
            </span>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={t('settings.language')}>
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeLanguage('en')}>
              🇬🇧 {t('settings.english')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('nb')}>
              🇳🇴 {t('settings.norwegian')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

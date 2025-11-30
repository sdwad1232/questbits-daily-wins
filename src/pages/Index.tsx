import { useTranslation } from 'react-i18next';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { StatsCard } from '@/components/StatsCard';
import { HabitCard } from '@/components/HabitCard';
import { AddHabitDialog } from '@/components/AddHabitDialog';
import { BadgesModal } from '@/components/BadgesModal';
import { SimpleProgressChart } from '@/components/SimpleProgressChart';

const Index = () => {
  const { t } = useTranslation();
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Stats Section */}
          <StatsCard />
          
          {/* Actions Section */}
          <div className="grid sm:grid-cols-2 gap-4">
            <AddHabitDialog />
            <BadgesModal />
          </div>
          
          {/* Habits Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t('dashboard.title')}
            </h2>
            
            {state.habits.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>{t('dashboard.noHabits')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {state.habits.map((habit) => (
                  <HabitCard key={habit.id} habit={habit} />
                ))}
              </div>
            )}
          </div>
          
          {/* Chart Section */}
          {state.logs.length > 0 && <SimpleProgressChart />}
        </div>
      </main>
    </div>
  );
};

export default Index;

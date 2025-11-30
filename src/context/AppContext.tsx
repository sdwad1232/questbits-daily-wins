import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, AppAction } from '@/types';
import { loadState, saveState } from '@/lib/storage';

const initialState: AppState = {
  habits: [],
  logs: [],
  points: 0
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_HABIT':
      return {
        ...state,
        habits: [...state.habits, { 
          ...action.payload, 
          currentStreak: 0, 
          longestStreak: 0 
        }]
      };
    
    case 'DELETE_HABIT':
      return {
        ...state,
        habits: state.habits.filter(h => h.id !== action.payload),
        logs: state.logs.filter(l => l.habitId !== action.payload)
      };
    
    case 'LOG_HABIT': {
      const existingLog = state.logs.find(
        l => l.habitId === action.payload.habitId && l.date === action.payload.date
      );
      
      if (existingLog) {
        return state; // Already logged today
      }
      
      // Calculate streak
      const habit = state.habits.find(h => h.id === action.payload.habitId);
      if (!habit) return state;
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      const loggedYesterday = state.logs.some(
        l => l.habitId === action.payload.habitId && l.date === yesterdayStr
      );
      
      const newStreak = loggedYesterday ? habit.currentStreak + 1 : 1;
      const newLongestStreak = Math.max(newStreak, habit.longestStreak);
      
      return {
        ...state,
        logs: [...state.logs, action.payload],
        points: state.points + 10,
        habits: state.habits.map(h =>
          h.id === action.payload.habitId
            ? {
                ...h,
                currentStreak: newStreak,
                longestStreak: newLongestStreak,
                lastLoggedDate: action.payload.date
              }
            : h
        )
      };
    }
    
    case 'LOAD_STATE':
      return action.payload;
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  level: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Calculate level based on points
  const level = Math.floor(state.points / 100) + 1;
  
  // Load state from storage on mount
  useEffect(() => {
    loadState().then(savedState => {
      if (savedState) {
        dispatch({ type: 'LOAD_STATE', payload: savedState });
      }
    });
  }, []);
  
  // Save state to storage whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);
  
  return (
    <AppContext.Provider value={{ state, dispatch, level }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

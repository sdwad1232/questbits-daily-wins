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
        habits: [...state.habits, action.payload]
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
      
      return {
        ...state,
        logs: [...state.logs, action.payload],
        points: state.points + 10
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

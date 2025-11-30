export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  currentStreak: number;
  longestStreak: number;
  lastLoggedDate?: string;
}

export interface LogEntry {
  habitId: string;
  date: string; // YYYY-MM-DD format
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  icon: string;
}

export interface AppState {
  habits: Habit[];
  logs: LogEntry[];
  points: number;
}

export type AppAction =
  | { type: 'ADD_HABIT'; payload: Habit }
  | { type: 'DELETE_HABIT'; payload: string }
  | { type: 'LOG_HABIT'; payload: { habitId: string; date: string } }
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'RESET_STATE' };

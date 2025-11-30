/**
 * Format date as YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDate(): string {
  return formatDate(new Date());
}

/**
 * Get date N days ago in YYYY-MM-DD format
 */
export function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDate(date);
}

/**
 * Get array of last N days in YYYY-MM-DD format
 */
export function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    days.push(getDaysAgo(i));
  }
  return days;
}

/**
 * Check if a habit was logged on a specific date
 */
export function wasLoggedOnDate(logs: { habitId: string; date: string }[], habitId: string, date: string): boolean {
  return logs.some(log => log.habitId === habitId && log.date === date);
}

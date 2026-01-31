import { WorkoutDay } from '../types';

export const generateSchedule = (startDate: Date, completedDays: string[]): WorkoutDay[] => {
  const days: WorkoutDay[] = [];
  const totalDays = 28; // 4 weeks
  
  // Normalize start date to midnight
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  // Pattern: 3 days Training, 1 day Rest
  // Cycle length: 4 days
  
  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    
    // Determine week number (1-based)
    const weekNumber = Math.floor(i / 7) + 1;
    
    // Determine if rest day (Day 4 of every 4-day cycle)
    // i starts at 0. 
    // i=0 (Day 1) -> Train
    // i=1 (Day 2) -> Train
    // i=2 (Day 3) -> Train
    // i=3 (Day 4) -> Rest
    const cyclePos = (i % 4);
    const isRestDay = cyclePos === 3;
    
    const dateString = currentDate.toISOString().split('T')[0];
    
    days.push({
      date: currentDate,
      dayIndex: i,
      isRestDay,
      weekNumber,
      isCompleted: completedDays.includes(dateString)
    });
  }
  
  return days;
};

export const getFormattedDate = (date: Date): string => {
  return date.toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'short' });
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};
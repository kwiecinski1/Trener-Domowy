
export interface Exercise {
  id: string;
  name: string;
  target: string;
  description: string;
  imageUrl: string; // Path to the webp image file
}

export interface WeeklyRule {
  weekNumber: number;
  title: string;
  description: string;
  sets: number;
  repsLabel: string;
  plankLabel: string;
  restTimeSec: number;
  specialInstruction?: string;
}

export interface WorkoutDay {
  date: Date;
  dayIndex: number; // 0-27
  isRestDay: boolean;
  weekNumber: number; // 1-4
  isCompleted: boolean;
}

export type ViewState = 'onboarding' | 'calendar' | 'workout';

export interface DailyProgress {
  [exerciseId: string]: boolean[]; // Array of completed sets
}

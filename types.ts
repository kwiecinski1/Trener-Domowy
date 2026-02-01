import React from 'react';

export interface Exercise {
  id: string;
  name: string;
  target: string;
  description: string;
  videoUrls: string[]; // Array of MP4 URLs. If multiple, play sequentially.
  tip?: string; // Specific technical tip for this exercise
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

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string; // Tailwind color class for bg (e.g. bg-yellow-500)
  conditionType: 'week' | 'plank' | 'program' | 'start';
  conditionValue?: number; // week number or seconds
}
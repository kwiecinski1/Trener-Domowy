
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { EXERCISES, WEEKLY_RULES, BADGES } from './constants';
import { WorkoutDay, ViewState } from './types';
import { generateSchedule, getFormattedDate, isToday } from './utils/schedule';
import { ExerciseCard } from './components/ExerciseCard';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { DataSyncModal } from './components/DataSyncModal';
import { RestTimerOverlay } from './components/RestTimerOverlay';
import { AchievementsModal } from './components/AchievementsModal';
import { Calendar, ChevronLeft, Dumbbell, CheckCircle, Info, Flame, Trophy, Cloud, Moon, Sun, Lock } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('onboarding');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [schedule, setSchedule] = useState<WorkoutDay[]>([]);
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  
  // Achievement State
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [plankRecord, setPlankRecord] = useState<number>(0);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [showNewBadgeToast, setShowNewBadgeToast] = useState<string | null>(null);
  const [hasUnseenBadges, setHasUnseenBadges] = useState(false);

  // Animation State
  const [animatingDayIndex, setAnimatingDayIndex] = useState<number | null>(null);

  // Rest Timer State
  const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);
  const [restDuration, setRestDuration] = useState(60);

  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [currentProgress, setCurrentProgress] = useState<Record<string, boolean[]>>({});
  
  // Refs for auto-scrolling
  const exerciseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const savedStart = localStorage.getItem('workout_start_date');
    const savedCompleted = localStorage.getItem('workout_completed_days');
    const savedBadges = localStorage.getItem('earned_badges');
    const savedPlankRecord = localStorage.getItem('plank_record');
    
    // Notification logic
    const viewedBadgesCount = parseInt(localStorage.getItem('viewed_badges_count') || '0', 10);

    if (savedStart) {
      const date = new Date(savedStart);
      setStartDate(date);
      setCompletedDays(savedCompleted ? JSON.parse(savedCompleted) : []);
      if (savedBadges) {
          const badges = JSON.parse(savedBadges);
          setEarnedBadges(badges);
          if (badges.length > viewedBadgesCount) {
              setHasUnseenBadges(true);
          }
      }
      if (savedPlankRecord) setPlankRecord(Number(savedPlankRecord));
      setView('calendar');
    }
  }, []);

  useEffect(() => {
    if (startDate) {
      setSchedule(generateSchedule(startDate, completedDays));
    }
  }, [startDate, completedDays]);

  // Check achievements whenever data changes
  useEffect(() => {
     if (!schedule.length) return;
     checkAchievements();
  }, [completedDays, plankRecord, schedule]);

  const checkAchievements = () => {
    const newEarned = new Set(earnedBadges);
    let badgesChanged = false;

    // Calculate actual counts
    const completedWorkoutsCount = schedule.filter(d => d.isCompleted && !d.isRestDay).length;
    const completedRestDaysCount = schedule.filter(d => d.isCompleted && d.isRestDay).length;

    // 1. Start Badge
    if (completedDays.length > 0 && !newEarned.has('start')) {
        newEarned.add('start');
        badgesChanged = true;
        showToast('Pierwszy Krok');
    }

    // 2. Week Badges
    for (let i = 1; i <= 3; i++) {
        const weekDays = schedule.filter(d => d.weekNumber === i && !d.isRestDay);
        // Check if all workout days in this week are completed
        const isWeekComplete = weekDays.every(d => completedDays.includes(d.date.toISOString().split('T')[0]));
        
        if (isWeekComplete && !newEarned.has(`week_${i}`)) {
            newEarned.add(`week_${i}`);
            badgesChanged = true;
            showToast(`Ukończono Tydzień ${i}`);
        }
    }

    // 3. Workout Quantity Badges
    if (completedWorkoutsCount >= 6 && !newEarned.has('workouts_6')) {
        newEarned.add('workouts_6');
        badgesChanged = true;
        showToast('Szósty Bieg');
    }

    if (completedWorkoutsCount >= 12 && !newEarned.has('workouts_12')) {
        newEarned.add('workouts_12');
        badgesChanged = true;
        showToast('Maszyna');
    }

    // 4. Funny Rest Badge
    if (completedRestDaysCount >= 5 && !newEarned.has('rest_5')) {
        newEarned.add('rest_5');
        badgesChanged = true;
        showToast('Ekspert Regeneracji');
    }

    // 5. Program Complete
    if (completedWorkoutsCount >= 12) { // Minimum threshold to check
        const allWorkouts = schedule.filter(d => !d.isRestDay);
        const allDone = allWorkouts.every(d => completedDays.includes(d.date.toISOString().split('T')[0]));
        if (allDone && !newEarned.has('program_complete')) {
            newEarned.add('program_complete');
            badgesChanged = true;
            showToast('Mistrz Domu!');
        }
    }

    // 6. Plank Badges
    const plankBadges = BADGES.filter(b => b.conditionType === 'plank');
    plankBadges.forEach(b => {
        if (b.conditionValue && plankRecord >= b.conditionValue && !newEarned.has(b.id)) {
            newEarned.add(b.id);
            badgesChanged = true;
            showToast(b.title);
        }
    });

    if (badgesChanged) {
        const updatedList = Array.from(newEarned);
        setEarnedBadges(updatedList);
        localStorage.setItem('earned_badges', JSON.stringify(updatedList));
        setHasUnseenBadges(true);
    }
  };

  const showToast = (title: string) => {
    setShowNewBadgeToast(title);
    setTimeout(() => setShowNewBadgeToast(null), 3000);
  };

  const openAchievements = () => {
      setIsAchievementsOpen(true);
      setHasUnseenBadges(false);
      localStorage.setItem('viewed_badges_count', earnedBadges.length.toString());
  };

  // Dark Mode Effect
  useEffect(() => {
    if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleStartProgram = (dateStr: string) => {
    if (!dateStr) return;
    const date = new Date(dateStr);
    setStartDate(date);
    localStorage.setItem('workout_start_date', date.toISOString());
    setCompletedDays([]);
    localStorage.setItem('workout_completed_days', JSON.stringify([]));
    setView('calendar');
  };

  const handleImportData = (newDate: Date, newCompleted: string[]) => {
    setStartDate(newDate);
    setCompletedDays(newCompleted);
    localStorage.setItem('workout_start_date', newDate.toISOString());
    localStorage.setItem('workout_completed_days', JSON.stringify(newCompleted));
    setView('calendar');
  };

  const handlePlankRecord = (seconds: number) => {
    if (seconds > plankRecord) {
        setPlankRecord(seconds);
        localStorage.setItem('plank_record', seconds.toString());
        // Toast for new record could be here, but checkAchievements will handle badges
    }
  };

  const handleDaySelect = (dayIndex: number) => {
    setSelectedDayIndex(dayIndex);
    const day = schedule[dayIndex];
    
    if (!day.isRestDay) {
        const rule = WEEKLY_RULES.find(r => r.weekNumber === day.weekNumber) || WEEKLY_RULES[0];
        const initialProgress: Record<string, boolean[]> = {};
        
        // Determine if the day is already completed
        const isDayDone = day.isCompleted;

        EXERCISES.forEach(ex => {
            // Fill with true if day is done, false otherwise
            initialProgress[ex.id] = Array(rule.sets).fill(isDayDone);
        });
        setCurrentProgress(initialProgress);
        
        // Reset refs
        exerciseRefs.current = new Array(EXERCISES.length).fill(null);
    }
    
    setView('workout');
    window.scrollTo(0, 0);
  };

  const toggleSet = (exerciseIndex: number, exerciseId: string, setIndex: number) => {
    if (selectedDayIndex === null) return;
    const day = schedule[selectedDayIndex];
    const rule = WEEKLY_RULES.find(r => r.weekNumber === day.weekNumber) || WEEKLY_RULES[0];
    const totalSets = rule.sets;

    setCurrentProgress(prev => {
      const newSets = [...(prev[exerciseId] || [])];
      
      // Determine if we are checking (completing) or unchecking
      const isCompleting = !newSets[setIndex];
      newSets[setIndex] = isCompleting;
      
      // Create a hypothetical next state to check for column completion
      const nextProgress = { ...prev, [exerciseId]: newSets };

      // Auto-scroll logic only when marking as complete
      if (isCompleting) {
          setTimeout(() => {
            const nextIndex = (exerciseIndex + 1) % EXERCISES.length;
            exerciseRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300); // Small delay for UX

          // CHECK FOR COLUMN COMPLETION (Rest Timer Logic)
          // Check if setIndex is now true for ALL exercises in nextProgress
          const isColumnComplete = EXERCISES.every(ex => {
             // For the currently modified exercise, use newSets. For others, use prev state.
             if (ex.id === exerciseId) return newSets[setIndex];
             return prev[ex.id]?.[setIndex];
          });

          // Trigger timer if: 
          // 1. Column is complete
          // 2. It is NOT the last set (because after last set workout is done)
          if (isColumnComplete && setIndex < totalSets - 1) {
              setRestDuration(rule.restTimeSec);
              // Small delay to allow the check animation to show before overlay appears
              setTimeout(() => setIsRestTimerOpen(true), 500);
          }
      }

      return nextProgress;
    });
  };

  const completeAllSets = (exerciseId: string, totalSets: number) => {
     setCurrentProgress(prev => {
        // Create an array of size 'totalSets' filled with true
        const newSets = new Array(totalSets).fill(true);
        return { ...prev, [exerciseId]: newSets };
     });
  };

  const finishWorkout = () => {
    if (selectedDayIndex === null) return;
    
    const day = schedule[selectedDayIndex];
    const dateString = day.date.toISOString().split('T')[0];
    const currentHour = new Date().getHours();
    
    if (!completedDays.includes(dateString)) {
      const newCompleted = [...completedDays, dateString];
      setCompletedDays(newCompleted);
      localStorage.setItem('workout_completed_days', JSON.stringify(newCompleted));

      // Check Night Owl Badge immediately
      if (currentHour >= 20 && !earnedBadges.includes('night_owl')) {
         const newBadges = [...earnedBadges, 'night_owl'];
         setEarnedBadges(newBadges);
         localStorage.setItem('earned_badges', JSON.stringify(newBadges));
         setHasUnseenBadges(true);
         showToast('Nocny Marek');
      }

      // Trigger Animation
      setAnimatingDayIndex(day.dayIndex);
      setTimeout(() => setAnimatingDayIndex(null), 2000); // Stop after 2s
    }
    
    setView('calendar');
    setSelectedDayIndex(null);
  };

  const resetProgram = () => {
    if(confirm("Czy na pewno chcesz zresetować cały plan?")) {
        localStorage.clear();
        setStartDate(null);
        setCompletedDays([]);
        setEarnedBadges([]);
        setPlankRecord(0);
        setHasUnseenBadges(false);
        setView('onboarding');
    }
  };

  // Group schedule into weeks
  const weeklySchedule = useMemo(() => {
    const weeks = [];
    for (let i = 0; i < schedule.length; i += 7) {
        weeks.push(schedule.slice(i, i + 7));
    }
    return weeks;
  }, [schedule]);

  if (view === 'onboarding') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
        <button 
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-slate-800 text-gray-800 dark:text-yellow-300 shadow-md transition-colors"
        >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center border border-gray-100 dark:border-slate-800">
          <div className="bg-primary/10 dark:bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Dumbbell className="text-primary w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Trener Domowy</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Twój 4-tygodniowy plan transformacji. Wiosłowanie, deska i zdrowy ruch.
          </p>
          
          <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kiedy zaczynamy?
          </label>
          <input
            type="date"
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none mb-6"
            style={{ colorScheme: darkMode ? 'dark' : 'light' }}
            onChange={(e) => handleStartProgram(e.target.value)}
          />
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Wybierz dzisiejszą datę lub datę z przeszłości, jeśli już zacząłeś.
          </p>
          <div className="mt-8 border-t border-gray-100 dark:border-slate-800 pt-6">
            <button 
                onClick={() => setIsSyncModalOpen(true)}
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-primary flex items-center justify-center gap-2 mx-auto"
            >
                <Cloud size={16} /> Masz kod zapisu? Wczytaj postęp
            </button>
          </div>
          <DataSyncModal 
            isOpen={isSyncModalOpen}
            onClose={() => setIsSyncModalOpen(false)}
            startDate={startDate}
            completedDays={completedDays}
            onImport={handleImportData}
          />
        </div>
      </div>
    );
  }

  if (view === 'calendar' && startDate) {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const completedCount = schedule.filter(d => d.isCompleted).length;
    const progressPercent = Math.round((completedCount / 28) * 100);

    // Determine the first incomplete day (the "active" next day)
    const activeDay = schedule.find(d => !d.isCompleted);
    const activeDayIndex = activeDay ? activeDay.dayIndex : schedule.length;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-10 transition-colors duration-300 relative">
        <DataSyncModal 
            isOpen={isSyncModalOpen}
            onClose={() => setIsSyncModalOpen(false)}
            startDate={startDate}
            completedDays={completedDays}
            onImport={handleImportData}
        />
        <AchievementsModal
            isOpen={isAchievementsOpen}
            onClose={() => setIsAchievementsOpen(false)}
            earnedBadgeIds={earnedBadges}
            plankRecord={plankRecord}
        />

        {/* Badge Notification Toast */}
        {showNewBadgeToast && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
                <Trophy className="text-yellow-400" />
                <div>
                    <p className="text-xs font-bold uppercase text-yellow-500">Nowa odznaka!</p>
                    <p className="font-bold">{showNewBadgeToast}</p>
                </div>
            </div>
        )}

        <header className="bg-white dark:bg-slate-900 sticky top-0 z-10 shadow-sm border-b border-gray-200 dark:border-slate-800 px-4 py-4 flex justify-between items-center transition-colors">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Twój Plan</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Całkowity postęp: {progressPercent}%</p>
          </div>
          <div className="flex gap-2 items-center">
             <button onClick={openAchievements} className="relative text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 transition-colors p-2" title="Osiągnięcia">
                <Trophy size={24} />
                {hasUnseenBadges && (
                    <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                    </span>
                )}
             </button>
             <button onClick={toggleTheme} className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-yellow-300 transition-colors p-2">
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
             </button>
             <button onClick={() => setIsSyncModalOpen(true)} className="text-gray-500 hover:text-primary dark:text-gray-400 transition-colors p-2" title="Synchronizuj dane">
                <Cloud size={24} />
             </button>
             <button onClick={resetProgram} className="text-xs text-red-400 hover:text-red-600 dark:hover:text-red-300 ml-1">
                Resetuj
             </button>
          </div>
        </header>
        
        <div className="max-w-3xl mx-auto p-4 space-y-8">
            {weeklySchedule.map((weekDays, weekIndex) => {
                const weekNum = weekIndex + 1;
                // Calculate week progress
                const completedInWeek = weekDays.filter(d => d.isCompleted).length;
                const totalInWeek = 7; 
                const weekProgress = (completedInWeek / totalInWeek) * 100;
                const rule = WEEKLY_RULES.find(r => r.weekNumber === weekNum);

                return (
                    <div key={weekNum} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-end mb-3 px-2">
                             <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">Tydzień {weekNum}</h3>
                                <p className="text-xs text-gray-500 dark:text-slate-400">{rule?.title}</p>
                            </div>
                            <div className="text-right w-1/3 max-w-[120px]">
                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{Math.round(weekProgress)}% Ukończone</span>
                                <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                                    <div className="bg-primary h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${weekProgress}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                            {weekDays.map((day) => {
                                const isPast = day.date < today;
                                const isCurrent = isToday(day.date);
                                const isAnimating = animatingDayIndex === day.dayIndex;
                                const isLocked = day.dayIndex > activeDayIndex;
                                
                                let cardClass = "relative p-2 rounded-xl border flex flex-col items-center justify-center min-h-[90px] transition-all ";
                                
                                if (isLocked) {
                                    cardClass += "bg-gray-50 dark:bg-slate-900 border-dashed border-gray-200 dark:border-slate-800 opacity-40 grayscale cursor-not-allowed";
                                } else {
                                    cardClass += "cursor-pointer ";
                                    if (day.isCompleted) {
                                        cardClass += "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800";
                                    } else if (isCurrent) {
                                        cardClass += "bg-white dark:bg-slate-800 border-primary dark:border-primary shadow-lg ring-2 ring-primary/20 scale-105 z-10";
                                    } else if (isPast) {
                                        cardClass += "bg-gray-100 dark:bg-slate-900 border-gray-200 dark:border-slate-800 opacity-60";
                                    } else {
                                        cardClass += "bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600";
                                    }
                                }

                                return (
                                    <div 
                                        key={day.dayIndex} 
                                        onClick={() => !isLocked && handleDaySelect(day.dayIndex)}
                                        className={cardClass}
                                    >
                                        {/* Lock Icon for future days */}
                                        {isLocked && (
                                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                                <Lock className="text-gray-400 dark:text-slate-600" size={24} />
                                            </div>
                                        )}

                                        {/* Explosion Animation Overlay */}
                                        {isAnimating && (
                                            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
                                                <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-yellow-400/30 animate-ping rounded-full"></div>
                                                <div className="absolute top-0 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-[ping_1s_ease-out]"></div>
                                                <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-[ping_1.2s_ease-out]"></div>
                                                <div className="absolute top-1/4 right-0 w-2 h-2 bg-green-400 rounded-full animate-[ping_0.8s_ease-out]"></div>
                                            </div>
                                        )}

                                        <div className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">
                                            {getFormattedDate(day.date).split(',')[0]}
                                        </div>
                                        
                                        {day.isRestDay ? (
                                            <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-500 dark:text-amber-400 rounded-full p-1.5 mb-1">
                                                <Flame size={16} />
                                            </div>
                                        ) : (
                                            <div className={`rounded-full p-1.5 mb-1 transition-transform duration-500 ${isAnimating ? 'scale-150 rotate-12' : ''} ${day.isCompleted ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' : 'bg-primary/10 dark:bg-primary/20 text-primary'}`}>
                                                {day.isCompleted ? <CheckCircle size={16} /> : <Dumbbell size={16} />}
                                            </div>
                                        )}

                                        <div className="text-xs font-medium text-gray-600 dark:text-slate-300">
                                            {day.date.getDate()}
                                        </div>
                                        
                                        {isCurrent && !day.isCompleted && !isLocked && (
                                            <span className="absolute -top-2 bg-primary text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                                                DZIŚ
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    );
  }

  if (view === 'workout' && selectedDayIndex !== null) {
    const day = schedule[selectedDayIndex];
    const rule = WEEKLY_RULES.find(r => r.weekNumber === day.weekNumber) || WEEKLY_RULES[0];
    const isAllSetsCompleted = (Object.values(currentProgress) as boolean[][]).every(sets => sets.every(s => s));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
            <RestTimerOverlay 
                isOpen={isRestTimerOpen} 
                onClose={() => setIsRestTimerOpen(false)} 
                durationSec={restDuration} 
            />
            
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
                <button 
                    onClick={() => setView('calendar')}
                    className="p-2 -ml-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="text-center">
                    <h2 className="font-bold text-gray-900 dark:text-white">{getFormattedDate(day.date)}</h2>
                    <p className="text-xs text-primary font-medium">{rule.title}</p>
                </div>
                <div className="w-10">
                    <button onClick={toggleTheme} className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-yellow-300 transition-colors">
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>

            <div className="max-w-xl mx-auto p-4 pb-24">
                
                {day.isRestDay ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                         <div className="w-32 h-32 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Flame size={64} className="text-amber-500 dark:text-amber-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Dzień Regeneracji</h1>
                        <p className="text-gray-600 dark:text-slate-400 max-w-sm mb-8">
                            Mięśnie rosną kiedy odpoczywasz, nie kiedy trenujesz. Wykorzystaj ten dzień na spacer, rozciąganie lub po prostu relaks.
                        </p>
                        <button 
                            onClick={finishWorkout}
                            className="bg-gray-800 dark:bg-slate-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700 dark:hover:bg-slate-600 transition-colors"
                        >
                            Oznacz jako zrobione
                        </button>
                    </div>
                ) : (
                    <>
                        <GeminiAdvisor dayTitle={rule.title} exercises={EXERCISES} />

                        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 mb-6 border border-primary/20 dark:border-primary/10 shadow-sm relative overflow-hidden transition-colors">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                                <Info size={18} className="text-primary" />
                                Zasady na ten tydzień
                            </h3>
                            <ul className="text-sm text-gray-600 dark:text-slate-400 space-y-1">
                                <li>• <strong>Przerwy:</strong> {rule.restTimeSec} sekund</li>
                                <li>• <strong>Tempo:</strong> {rule.specialInstruction}</li>
                            </ul>
                        </div>

                        {EXERCISES.map((ex, index) => (
                            <div key={ex.id} ref={el => { exerciseRefs.current[index] = el }}>
                                <ExerciseCard
                                    exercise={ex}
                                    setsCount={rule.sets}
                                    repsLabel={rule.repsLabel}
                                    completedSets={currentProgress[ex.id] || []}
                                    onToggleSet={(setIndex) => toggleSet(index, ex.id, setIndex)}
                                    onCompleteAll={() => completeAllSets(ex.id, rule.sets)}
                                    onPlankRecord={ex.id === 'plank' ? handlePlankRecord : undefined}
                                    specialInstruction={
                                        rule.specialInstruction
                                    }
                                    isPlank={ex.id === 'plank'}
                                    plankLabel={rule.plankLabel}
                                />
                            </div>
                        ))}

                        <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-20">
                            <button
                                onClick={finishWorkout}
                                disabled={!isAllSetsCompleted}
                                className={`
                                    flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all transform
                                    ${isAllSetsCompleted 
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 scale-105' 
                                        : 'bg-white dark:bg-slate-800 text-gray-400 dark:text-slate-500 border border-gray-200 dark:border-slate-700'
                                    }
                                `}
                            >
                                {isAllSetsCompleted ? (
                                    <>
                                        <Trophy className="w-6 h-6" />
                                        Zakończ Trening
                                    </>
                                ) : (
                                    <span>Ukończ wszystkie serie</span>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
  }

  return null;
};

export default App;

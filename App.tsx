
import React, { useState, useEffect, useMemo } from 'react';
import { EXERCISES, WEEKLY_RULES } from './constants';
import { WorkoutDay, ViewState } from './types';
import { generateSchedule, getFormattedDate, isToday } from './utils/schedule';
import { ExerciseCard } from './components/ExerciseCard';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { DataSyncModal } from './components/DataSyncModal';
import { Calendar, ChevronLeft, Dumbbell, CheckCircle, Info, Flame, Trophy, Cloud } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('onboarding');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [schedule, setSchedule] = useState<WorkoutDay[]>([]);
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  
  const [currentProgress, setCurrentProgress] = useState<Record<string, boolean[]>>({});

  useEffect(() => {
    const savedStart = localStorage.getItem('workout_start_date');
    const savedCompleted = localStorage.getItem('workout_completed_days');

    if (savedStart) {
      const date = new Date(savedStart);
      setStartDate(date);
      setCompletedDays(savedCompleted ? JSON.parse(savedCompleted) : []);
      setView('calendar');
    }
  }, []);

  useEffect(() => {
    if (startDate) {
      setSchedule(generateSchedule(startDate, completedDays));
    }
  }, [startDate, completedDays]);

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

  const handleDaySelect = (dayIndex: number) => {
    setSelectedDayIndex(dayIndex);
    const day = schedule[dayIndex];
    
    if (!day.isRestDay) {
        const rule = WEEKLY_RULES.find(r => r.weekNumber === day.weekNumber) || WEEKLY_RULES[0];
        const initialProgress: Record<string, boolean[]> = {};
        EXERCISES.forEach(ex => {
            initialProgress[ex.id] = Array(rule.sets).fill(false);
        });
        setCurrentProgress(initialProgress);
    }
    
    setView('workout');
  };

  const toggleSet = (exerciseId: string, setIndex: number) => {
    setCurrentProgress(prev => {
      const newSets = [...(prev[exerciseId] || [])];
      newSets[setIndex] = !newSets[setIndex];
      return { ...prev, [exerciseId]: newSets };
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
    
    if (!completedDays.includes(dateString)) {
      const newCompleted = [...completedDays, dateString];
      setCompletedDays(newCompleted);
      localStorage.setItem('workout_completed_days', JSON.stringify(newCompleted));
    }
    
    setView('calendar');
    setSelectedDayIndex(null);
  };

  const resetProgram = () => {
    if(confirm("Czy na pewno chcesz zresetować cały plan?")) {
        localStorage.clear();
        setStartDate(null);
        setCompletedDays([]);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Dumbbell className="text-primary w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trener Domowy</h1>
          <p className="text-gray-600 mb-8">
            Twój 4-tygodniowy plan transformacji. Wiosłowanie, deska i zdrowy ruch.
          </p>
          
          <label className="block text-left text-sm font-medium text-gray-700 mb-2">
            Kiedy zaczynamy?
          </label>
          <input
            type="date"
            className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none mb-6"
            style={{ colorScheme: 'light' }}
            onChange={(e) => handleStartProgram(e.target.value)}
          />
          <p className="text-xs text-gray-400">
            Wybierz dzisiejszą datę lub datę z przeszłości, jeśli już zacząłeś.
          </p>
          <div className="mt-8 border-t border-gray-100 pt-6">
            <button 
                onClick={() => setIsSyncModalOpen(true)}
                className="text-gray-500 text-sm hover:text-primary flex items-center justify-center gap-2 mx-auto"
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

    return (
      <div className="min-h-screen bg-gray-50 pb-10">
        <DataSyncModal 
            isOpen={isSyncModalOpen}
            onClose={() => setIsSyncModalOpen(false)}
            startDate={startDate}
            completedDays={completedDays}
            onImport={handleImportData}
        />
        <header className="bg-white sticky top-0 z-10 shadow-sm px-4 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Twój Plan</h2>
            <p className="text-xs text-gray-500 font-medium">Całkowity postęp: {progressPercent}%</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => setIsSyncModalOpen(true)} className="text-gray-500 hover:text-primary transition-colors" title="Synchronizuj dane">
                <Cloud size={24} />
             </button>
             <button onClick={resetProgram} className="text-xs text-red-400 hover:text-red-600">
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
                                <h3 className="text-lg font-bold text-gray-800">Tydzień {weekNum}</h3>
                                <p className="text-xs text-gray-500">{rule?.title}</p>
                            </div>
                            <div className="text-right w-1/3 max-w-[120px]">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{Math.round(weekProgress)}% Ukończone</span>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
                                    <div className="bg-primary h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${weekProgress}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                            {weekDays.map((day) => {
                                const isPast = day.date < today;
                                const isCurrent = isToday(day.date);
                                
                                let cardClass = "relative p-2 rounded-xl border flex flex-col items-center justify-center min-h-[90px] transition-all cursor-pointer ";
                                
                                if (day.isCompleted) {
                                    cardClass += "bg-emerald-50 border-emerald-200";
                                } else if (isCurrent) {
                                    cardClass += "bg-white border-primary shadow-lg ring-2 ring-primary/20 scale-105 z-10";
                                } else if (isPast) {
                                    cardClass += "bg-gray-100 border-gray-200 opacity-60";
                                } else {
                                    cardClass += "bg-white border-gray-100 hover:border-gray-300";
                                }

                                return (
                                    <div 
                                        key={day.dayIndex} 
                                        onClick={() => handleDaySelect(day.dayIndex)}
                                        className={cardClass}
                                    >
                                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                                            {getFormattedDate(day.date).split(',')[0]}
                                        </div>
                                        
                                        {day.isRestDay ? (
                                            <div className="bg-amber-100 text-amber-500 rounded-full p-1.5 mb-1">
                                                <Flame size={16} />
                                            </div>
                                        ) : (
                                            <div className={`rounded-full p-1.5 mb-1 ${day.isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-primary/10 text-primary'}`}>
                                                {day.isCompleted ? <CheckCircle size={16} /> : <Dumbbell size={16} />}
                                            </div>
                                        )}

                                        <div className="text-xs font-medium text-gray-600">
                                            {day.date.getDate()}
                                        </div>
                                        
                                        {isCurrent && !day.isCompleted && (
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
        <div className="min-h-screen bg-gray-50">
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <button 
                    onClick={() => setView('calendar')}
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="text-center">
                    <h2 className="font-bold text-gray-900">{getFormattedDate(day.date)}</h2>
                    <p className="text-xs text-primary font-medium">{rule.title}</p>
                </div>
                <div className="w-10"></div>
            </div>

            <div className="max-w-xl mx-auto p-4 pb-24">
                
                {day.isRestDay ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                         <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Flame size={64} className="text-amber-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dzień Regeneracji</h1>
                        <p className="text-gray-600 max-w-sm mb-8">
                            Mięśnie rosną kiedy odpoczywasz, nie kiedy trenujesz. Wykorzystaj ten dzień na spacer, rozciąganie lub po prostu relaks.
                        </p>
                        <button 
                            onClick={finishWorkout}
                            className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700 transition-colors"
                        >
                            Oznacz jako zrobione
                        </button>
                    </div>
                ) : (
                    <>
                        <GeminiAdvisor dayTitle={rule.title} exercises={EXERCISES} />

                        <div className="bg-white rounded-xl p-5 mb-6 border border-primary/20 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <Info size={18} className="text-primary" />
                                Zasady na ten tydzień
                            </h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• <strong>Przerwy:</strong> {rule.restTimeSec} sekund</li>
                                <li>• <strong>Tempo:</strong> {rule.specialInstruction}</li>
                            </ul>
                        </div>

                        {EXERCISES.map((ex) => (
                            <ExerciseCard
                                key={ex.id}
                                exercise={ex}
                                setsCount={rule.sets}
                                repsLabel={rule.repsLabel}
                                completedSets={currentProgress[ex.id] || []}
                                onToggleSet={(idx) => toggleSet(ex.id, idx)}
                                onCompleteAll={() => completeAllSets(ex.id, rule.sets)}
                                specialInstruction={rule.specialInstruction}
                                isPlank={ex.id === 'plank'}
                                plankLabel={rule.plankLabel}
                            />
                        ))}

                        <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-20">
                            <button
                                onClick={finishWorkout}
                                disabled={!isAllSetsCompleted}
                                className={`
                                    flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all transform
                                    ${isAllSetsCompleted 
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 scale-105' 
                                        : 'bg-white text-gray-400 border border-gray-200'
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

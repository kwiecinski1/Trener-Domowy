
import React, { useState } from 'react';
import { Exercise } from '../types';
import { CheckCircle2, Circle, Play, Info, X, CheckCheck, Lock } from 'lucide-react';
import { PlankTimer } from './PlankTimer';

interface ExerciseCardProps {
  exercise: Exercise;
  setsCount: number;
  repsLabel: string;
  completedSets: boolean[];
  onToggleSet: (setIndex: number) => void;
  onCompleteAll: () => void;
  onPlankRecord?: (seconds: number) => void;
  specialInstruction?: string;
  isPlank: boolean;
  plankLabel: string;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  setsCount,
  repsLabel,
  completedSets,
  onToggleSet,
  onCompleteAll,
  onPlankRecord,
  specialInstruction,
  isPlank,
  plankLabel
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Use the specific exercise tip if available, otherwise fall back to weekly instruction, or null
  const displayTip = exercise.tip || specialInstruction;

  const handleVideoEnded = () => {
    if (exercise.videoUrls.length > 1) {
        setCurrentVideoIndex((prev) => (prev + 1) % exercise.videoUrls.length);
    }
  };

  return (
    <>
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden mb-6 group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-56 bg-gray-800 overflow-hidden">
            {/* Video Player */}
            <video
                key={exercise.videoUrls[currentVideoIndex]} // Force re-render on source change
                src={exercise.videoUrls[currentVideoIndex]}
                autoPlay
                muted
                loop={exercise.videoUrls.length === 1} // Loop natively if only 1 video
                playsInline
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 transition-opacity duration-300"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

            {/* Text Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
            <h3 className="text-white text-xl font-bold flex items-center gap-2 drop-shadow-md">
                {exercise.name}
            </h3>
            <span className="text-white/90 text-xs font-semibold bg-white/20 px-2 py-0.5 rounded backdrop-blur-md inline-block mt-1 border border-white/10">
                {exercise.target}
            </span>
            {exercise.videoUrls.length > 1 && (
                 <span className="text-white/70 text-[10px] ml-2 font-mono">
                    Krok {currentVideoIndex + 1}/{exercise.videoUrls.length}
                 </span>
            )}
            </div>

            {/* YouTube Link */}
            <a 
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " ćwiczenie technika")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white pl-2 pr-3 py-1.5 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-1 group/yt pointer-events-auto"
            title="Zobacz instruktaż wideo"
            >
            <Play size={16} fill="white" className="ml-0.5" />
            <span className="text-xs font-bold">WIDEO</span>
            </a>
        </div>
        
        <div className="p-5">
            <div className="flex justify-between items-start mb-4">
                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">
                    {exercise.description}
                </p>
                <button 
                    onClick={() => setShowInfo(true)}
                    className="ml-2 text-primary hover:text-sky-700 dark:hover:text-sky-400 transition-colors p-1"
                    title="Pełny opis"
                >
                    <Info size={20} />
                </button>
            </div>

            {displayTip && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs rounded-lg border border-blue-100 dark:border-blue-800/50 flex gap-2 items-start">
                <div className="mt-0.5 min-w-[4px] h-4 bg-blue-400 rounded-full"></div>
                <span>
                <strong>Wskazówka:</strong> {displayTip}
                </span>
            </div>
            )}

            <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider border-b border-gray-100 dark:border-slate-800 pb-2 mb-2">
                <span>Cel: {isPlank ? plankLabel : repsLabel}</span>
                <button 
                    onClick={onCompleteAll}
                    className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 px-3 py-1.5 rounded transition-colors active:scale-95"
                >
                    <CheckCheck size={16} />
                    Zalicz wszystko
                </button>
            </div>

            {isPlank && <PlankTimer onSaveRecord={onPlankRecord} />}

            <div className="flex gap-3 mt-1 justify-center sm:justify-start flex-wrap">
                {Array.from({ length: setsCount }).map((_, index) => {
                    const isCompleted = completedSets[index];
                    // Logic: Locked if previous set is not completed (unless it's the first set)
                    const isLocked = index > 0 && !completedSets[index - 1];

                    return (
                        <button
                            key={index}
                            onClick={() => onToggleSet(index)}
                            disabled={isLocked}
                            className={`flex flex-col items-center gap-1 group focus:outline-none transition-all duration-200 ${
                                isLocked ? 'opacity-40 cursor-not-allowed' : isCompleted ? 'scale-105' : 'hover:scale-110'
                            }`}
                        >
                            {isCompleted ? (
                                <CheckCircle2 className="text-emerald-500 w-12 h-12 shadow-sm rounded-full bg-white dark:bg-slate-800" />
                            ) : isLocked ? (
                                <div className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-slate-700 flex items-center justify-center bg-gray-50 dark:bg-slate-800 text-gray-300 dark:text-slate-600">
                                    <Lock size={20} />
                                </div>
                            ) : (
                                <Circle className="text-gray-200 dark:text-slate-600 w-12 h-12 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                            )}
                            <span className={`text-[10px] font-bold uppercase tracking-wide ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-600'}`}>
                                Seria {index + 1}
                            </span>
                        </button>
                    );
                })}
            </div>
            </div>
        </div>
        </div>

        {/* Modal Overlay */}
        {showInfo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowInfo(false)}>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative border border-gray-100 dark:border-slate-800" onClick={e => e.stopPropagation()}>
                    <button 
                        onClick={() => setShowInfo(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X size={24} />
                    </button>
                    
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{exercise.name}</h3>
                    <span className="inline-block bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded mb-4">
                        {exercise.target}
                    </span>
                    
                    <div className="prose prose-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                        <p>{exercise.description}</p>
                        
                        {displayTip && (
                            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <h5 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Wskazówka Trenera:</h5>
                                <p className="text-blue-800 dark:text-blue-200">{displayTip}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-end">
                        <button 
                            onClick={() => setShowInfo(false)} 
                            className="px-6 py-2 bg-gray-900 dark:bg-slate-800 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-slate-700 transition-colors"
                        >
                            Zamknij
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

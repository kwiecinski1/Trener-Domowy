
import React, { useState } from 'react';
import { Exercise } from '../types';
import { CheckCircle2, Circle, Play, Info, X, CheckCheck } from 'lucide-react';
import { PlankTimer } from './PlankTimer';

interface ExerciseCardProps {
  exercise: Exercise;
  setsCount: number;
  repsLabel: string;
  completedSets: boolean[];
  onToggleSet: (setIndex: number) => void;
  onCompleteAll: () => void;
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
  specialInstruction,
  isPlank,
  plankLabel
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-56 bg-gray-800 overflow-hidden">
            {/* Image Display (WebP) */}
            <img
              src={exercise.imageUrl}
              alt={exercise.name}
              className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 transition-opacity duration-300"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Text Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-xl font-bold flex items-center gap-2 drop-shadow-md">
                {exercise.name}
            </h3>
            <span className="text-white/90 text-xs font-semibold bg-white/20 px-2 py-0.5 rounded backdrop-blur-md inline-block mt-1 border border-white/10">
                {exercise.target}
            </span>
            </div>

            {/* YouTube Link */}
            <a 
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " ćwiczenie technika")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white pl-2 pr-3 py-1.5 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-1 group/yt"
            title="Zobacz instruktaż wideo"
            >
            <Play size={16} fill="white" className="ml-0.5" />
            <span className="text-xs font-bold">WIDEO</span>
            </a>
        </div>
        
        <div className="p-5">
            <div className="flex justify-between items-start mb-4">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {exercise.description}
                </p>
                <button 
                    onClick={() => setShowInfo(true)}
                    className="ml-2 text-primary hover:text-sky-700 transition-colors p-1"
                    title="Pełny opis"
                >
                    <Info size={20} />
                </button>
            </div>

            {specialInstruction && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-800 text-xs rounded-lg border border-blue-100 flex gap-2 items-start">
                <div className="mt-0.5 min-w-[4px] h-4 bg-blue-400 rounded-full"></div>
                <span>
                <strong>Wskazówka:</strong> {specialInstruction}
                </span>
            </div>
            )}

            <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2 mb-2">
                <span>Cel: {isPlank ? plankLabel : repsLabel}</span>
                <button 
                    onClick={onCompleteAll}
                    className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded transition-colors active:scale-95"
                >
                    <CheckCheck size={16} />
                    Zalicz wszystko
                </button>
            </div>

            {isPlank && <PlankTimer />}

            <div className="flex gap-3 mt-1 justify-center sm:justify-start flex-wrap">
                {Array.from({ length: setsCount }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => onToggleSet(index)}
                    className={`flex flex-col items-center gap-1 group focus:outline-none transition-all duration-200 ${
                        completedSets[index] ? 'scale-105' : 'hover:scale-110'
                    }`}
                >
                    {completedSets[index] ? (
                    <CheckCircle2 className="text-emerald-500 w-12 h-12 shadow-sm rounded-full bg-white" />
                    ) : (
                    <Circle className="text-gray-200 w-12 h-12 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                    )}
                    <span className={`text-[10px] font-bold uppercase tracking-wide ${completedSets[index] ? 'text-emerald-600' : 'text-gray-400'}`}>
                    Seria {index + 1}
                    </span>
                </button>
                ))}
            </div>
            </div>
        </div>
        </div>

        {/* Modal Overlay */}
        {showInfo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowInfo(false)}>
                <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
                    <button 
                        onClick={() => setShowInfo(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X size={24} />
                    </button>
                    
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{exercise.name}</h3>
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded mb-4">
                        {exercise.target}
                    </span>
                    
                    <div className="prose prose-sm text-gray-600 leading-relaxed">
                        <p>{exercise.description}</p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                        <button 
                            onClick={() => setShowInfo(false)} 
                            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
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

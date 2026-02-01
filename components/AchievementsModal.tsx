
import React from 'react';
import { X, Lock, Trophy } from 'lucide-react';
import { BADGES } from '../constants';
import { Badge } from '../types';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  earnedBadgeIds: string[];
  plankRecord: number;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  earnedBadgeIds,
  plankRecord
}) => {
  if (!isOpen) return null;

  const earnedCount = earnedBadgeIds.length;
  const totalBadges = BADGES.length;
  const progressPercent = Math.round((earnedCount / totalBadges) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl relative border border-gray-100 dark:border-slate-800 flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50 rounded-t-2xl">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Trophy className="text-yellow-500" /> Sala Chwały
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Twój rekord deski: <span className="text-emerald-500 font-bold">{plankRecord}s</span></p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
             <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                <span>POSTĘP ODZNAK</span>
                <span>{earnedCount}/{totalBadges}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div className="bg-yellow-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
            </div>
        </div>

        {/* Badge Grid */}
        <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {BADGES.map((badge: Badge) => {
                    const isUnlocked = earnedBadgeIds.includes(badge.id);
                    
                    return (
                        <div 
                            key={badge.id}
                            className={`relative p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                                isUnlocked 
                                ? 'bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-800/50 border-gray-200 dark:border-slate-700 shadow-md transform hover:-translate-y-1' 
                                : 'bg-gray-50 dark:bg-slate-900 border-dashed border-gray-200 dark:border-slate-800 opacity-60'
                            }`}
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-inner ${
                                isUnlocked ? badge.color + ' text-white' : 'bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-600'
                            }`}>
                                {isUnlocked ? badge.icon : <Lock size={20} />}
                            </div>
                            
                            <h4 className={`font-bold text-sm mb-1 ${isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>
                                {badge.title}
                            </h4>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                                {badge.description}
                            </p>

                            {isUnlocked && (
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 shadow-sm animate-pulse"></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

      </div>
    </div>
  );
};

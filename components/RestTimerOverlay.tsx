
import React, { useState, useEffect } from 'react';
import { X, Plus, SkipForward, Timer } from 'lucide-react';

interface RestTimerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  durationSec: number;
}

export const RestTimerOverlay: React.FC<RestTimerOverlayProps> = ({
  isOpen,
  onClose,
  durationSec
}) => {
  const [timeLeft, setTimeLeft] = useState(durationSec);

  // Reset timer when opened with new duration
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(durationSec);
    }
  }, [isOpen, durationSec]);

  // Countdown logic
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, timeLeft]);

  // Auto close on 0? Or play sound? 
  // For now let's just show 00:00 and let user close, or maybe auto close after 1s?
  // User experience: better to hear a beep (if audio allowed) or just see it finished.
  // Let's auto-close after a short delay to keep flow smooth.
  useEffect(() => {
    if (timeLeft === 0 && isOpen) {
        const timeout = setTimeout(() => {
            onClose();
        }, 1000);
        return () => clearTimeout(timeout);
    }
  }, [timeLeft, isOpen, onClose]);

  if (!isOpen) return null;

  const progress = Math.max(0, (timeLeft / durationSec) * 100);
  
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const addTime = () => setTimeLeft(prev => prev + 30);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md text-white p-6 animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X size={24} />
      </button>

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 justify-center">
            <Timer className="text-primary animate-pulse" size={32} />
            Przerwa
        </h2>
        <p className="text-white/60">Odpocznij przed kolejną serią</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        {/* SVG Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-slate-800"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-primary transition-all duration-1000 ease-linear"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="text-6xl font-mono font-bold tracking-tighter">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-sm">
        <button
          onClick={addTime}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold transition-all active:scale-95"
        >
          <Plus size={20} />
          +30s
        </button>
        <button
          onClick={onClose}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-slate-900 hover:bg-gray-100 font-bold transition-all active:scale-95"
        >
          <SkipForward size={20} />
          Pomiń
        </button>
      </div>
    </div>
  );
};

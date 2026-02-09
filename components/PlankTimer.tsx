
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Target } from 'lucide-react';

interface PlankTimerProps {
    onSaveRecord?: (seconds: number) => void;
}

export const PlankTimer: React.FC<PlankTimerProps> = ({ onSaveRecord }) => {
  const [time, setTime] = useState(0);
  const [targetTime, setTargetTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Sound Effect Logic (Web Audio API)
  const playSuccessSound = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Configuration for a pleasant "Ding" sound
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.1); // Octave jump

        // Envelope (Fade out)
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 1.5);
    } catch (e) {
        console.error("Audio playback failed", e);
    }
  };

  // Monitor time for sound trigger
  useEffect(() => {
    if (time === targetTime && time > 0) {
        playSuccessSound();
    }
  }, [time, targetTime]);

  // Countdown Logic
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      setIsRunning(true);
    }
  }, [countdown]);

  // Main Timer Logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    if (isRunning) {
        // Pausing
        setIsRunning(false);
        if (onSaveRecord && time > 0) {
            onSaveRecord(time);
        }
    } else {
        // Start countdown
        setCountdown(3);
    }
  };

  const resetTimer = () => {
    if (onSaveRecord && time > 0) {
        onSaveRecord(time);
    }
    setIsRunning(false);
    setCountdown(null);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isTargetReached = time >= targetTime;

  return (
    <div className={`flex flex-col items-center p-4 rounded-xl mt-2 transition-colors duration-500 relative overflow-hidden ${
        isTargetReached && time > 0 
        ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' 
        : 'bg-gray-100 dark:bg-slate-800'
    }`}>
      
      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 z-10 bg-black/80 flex items-center justify-center rounded-xl animate-in fade-in duration-200">
            <div className="text-white font-bold text-6xl animate-bounce">
                {countdown}
            </div>
            <p className="absolute bottom-4 text-white/80 text-sm">Przygotuj się...</p>
        </div>
      )}

      <div className={`text-4xl font-mono font-bold mb-2 ${
        isTargetReached && time > 0 
        ? 'text-emerald-600 dark:text-emerald-400' 
        : 'text-slate-800 dark:text-slate-200'
      }`}>
        {formatTime(time)}
      </div>

      {isTargetReached && time > 0 && (
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4 animate-bounce">
          Cel osiągnięty!
        </span>
      )}

      {/* Target Slider */}
      {!isRunning && time === 0 && countdown === null && (
        <div className="w-full max-w-xs mb-4 px-2">
            <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 mb-1 font-medium">
                <span className="flex items-center gap-1"><Target size={14}/> Cel: {formatTime(targetTime)}</span>
            </div>
            <input 
                type="range" 
                min="10" 
                max="180" 
                step="5" 
                value={targetTime}
                onChange={(e) => setTargetTime(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary"
            />
             <div className="flex justify-between text-[10px] text-gray-400 dark:text-slate-500 mt-1">
                <span>10s</span>
                <span>3 min</span>
            </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleStart}
          disabled={countdown !== null}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-white font-medium transition-colors shadow-md ${
            isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-primary hover:bg-sky-600 disabled:bg-gray-400'
          }`}
        >
          {isRunning ? <><Pause size={20} /> Pauza</> : <><Play size={20} /> Start</>}
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
        >
          <RotateCcw size={20} /> Reset
        </button>
      </div>
    </div>
  );
};

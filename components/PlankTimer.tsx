import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Target } from 'lucide-react';

export const PlankTimer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [targetTime, setTargetTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

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

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isTargetReached = time >= targetTime;

  return (
    <div className={`flex flex-col items-center p-4 rounded-xl mt-2 transition-colors duration-500 ${isTargetReached && time > 0 ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-100'}`}>
      <div className={`text-4xl font-mono font-bold mb-2 ${isTargetReached && time > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
        {formatTime(time)}
      </div>

      {isTargetReached && time > 0 && (
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4 animate-bounce">
          Cel osiągnięty!
        </span>
      )}

      {/* Target Slider */}
      {!isRunning && time === 0 && (
        <div className="w-full max-w-xs mb-4 px-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
                <span className="flex items-center gap-1"><Target size={14}/> Cel: {formatTime(targetTime)}</span>
            </div>
            <input 
                type="range" 
                min="10" 
                max="180" 
                step="5" 
                value={targetTime}
                onChange={(e) => setTargetTime(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-primary"
            />
             <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>10s</span>
                <span>3 min</span>
            </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-white font-medium transition-colors shadow-md ${
            isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-primary hover:bg-sky-600'
          }`}
        >
          {isRunning ? <><Pause size={20} /> Pauza</> : <><Play size={20} /> Start</>}
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
        >
          <RotateCcw size={20} /> Reset
        </button>
      </div>
    </div>
  );
};
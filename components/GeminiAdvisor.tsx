import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2 } from 'lucide-react';
import { Exercise } from '../types';

interface GeminiAdvisorProps {
  dayTitle: string;
  exercises: Exercise[];
}

export const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ dayTitle, exercises }) => {
  const [loading, setLoading] = useState(false);
  const [tip, setTip] = useState<string | null>(null);

  const getTip = async () => {
    if (!process.env.API_KEY) {
      setTip("Klucz API nie jest skonfigurowany. Uruchom aplikację z kluczem, aby otrzymać poradę.");
      return;
    }

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const exerciseNames = exercises.map(e => e.name).join(", ");
      
      const prompt = `
        Jesteś światowej klasy trenerem personalnym.
        Dziś mój podopieczny wykonuje trening: "${dayTitle}".
        Lista ćwiczeń: ${exerciseNames}.
        
        Podaj JEDNĄ, krótką, motywującą i konkretną wskazówkę dotyczącą techniki jednego z tych ćwiczeń lub mentalnego nastawienia.
        Odpowiedź ma być krótka (maks 2 zdania) i po polsku.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      
      setTip(response.text.trim());
    } catch (error) {
      console.error("Gemini Error:", error);
      setTip("Nie udało się pobrać porady. Pamiętaj o nawodnieniu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white shadow-lg mb-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold flex items-center gap-2">
          <Sparkles size={18} className="text-yellow-300" />
          Trener AI
        </h4>
        {!tip && !loading && (
          <button 
            onClick={getTip}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
          >
            Pobierz wskazówkę
          </button>
        )}
      </div>
      
      {loading && (
        <div className="flex items-center gap-2 text-sm text-white/80">
          <Loader2 size={16} className="animate-spin" />
          Generuję poradę...
        </div>
      )}
      
      {tip && (
        <p className="text-sm text-white/90 italic border-l-2 border-yellow-300 pl-3 py-1">
          "{tip}"
        </p>
      )}
    </div>
  );
};
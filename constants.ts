
import { Exercise, WeeklyRule, Badge } from './types';
import React from 'react';
import { Award, Zap, Shield, Crown, Star, Flame, Timer, Medal, Moon, Trophy, Dumbbell, BicepsFlexed, Coffee } from 'lucide-react';

export const EXERCISES: Exercise[] = [
  {
    id: 'row',
    name: 'Wiosłowanie w drzwiach (Doorway row)',
    target: 'Plecy / Bicepsy',
    description: 'Przyciągaj klatkę piersiową do krawędzi framugi w zwisie podpartym, uginając ramiona i zachowując wyprostowaną sylwetkę.',
    videoUrls: ['https://static.fabrykasily.pl/atlas/m_wioslowanie_w_drzwiach.mp4'],
    tip: 'Inicjuj ruch od mocnego ściągnięcia łopatek, aby to mięśnie grzbietu, a nie tylko ramiona, wykonały główną pracę.'
  },
  {
    id: 'tricep',
    name: 'Pompki przy ścianie',
    target: 'Tricepsy',
    description: 'Opuść klatkę piersiową w stronę ściany i wróć do pozycji wyjściowej poprzez prostowanie ramion w podporze stojącym, zachowując przy tym ciało w linii prostej.',
    videoUrls: ['https://static.fabrykasily.pl/atlas/m_pompki_przy_scianie.mp4'],
    tip: 'Utrzymuj stale napięte mięśnie brzucha i pośladków, aby zapobiec wyginaniu kręgosłupa i zapewnić pełną kontrolę nad ruchem.'
  },
  {
    id: 'lateral',
    name: 'Odwodzenie ramion w bok',
    target: 'Barki',
    description: 'Unoś hantle bokiem do linii barków i powoli je opuszczaj, utrzymując wyprostowaną sylwetkę oraz lekko ugięte łokcie.',
    videoUrls: ['https://static.fabrykasily.pl/atlas/odwodzenie_ramion_w_bok_ze_sztangielkami.mp4'],
    tip: 'Unikaj kołysania tułowiem i kontroluj ciężar zwłaszcza podczas ruchu w dół, aby utrzymać stałe napięcie w mięśniach naramiennych.'
  },
  {
    id: 'plank',
    name: 'Deska na przedramionach',
    target: 'Brzuch / Core',
    description: 'Utrzymuj nieruchomą pozycję w podporze na przedramionach, dbając o to, by całe ciało tworzyło linię prostą równoległą do podłoża.',
    videoUrls: ['https://static.fabrykasily.pl/atlas/deska_scianka_plank.mp4'],
    tip: 'Mocno napnij mięśnie brzucha oraz pośladków i pamiętaj o spokojnym oddechu, aby zapobiec opadaniu bioder i przeciążeniu odcinka lędźwiowego.'
  },
  {
    id: 'ytw',
    name: 'Y-T-W na macie',
    target: 'Plecy / Postawa',
    description: 'Leżąc na brzuchu, unosisz ręce w kolejnych układach liter Y, T, W.',
    videoUrls: [
        'https://static.fabrykasily.pl/atlas/i_raise_wznosy_ramion_w_lezeniu_na_brzuchu.mp4',
        'https://static.fabrykasily.pl/atlas/t_raise_wznosy_ramion_w_lezeniu_na_brzuchu.mp4',
        'https://static.fabrykasily.pl/atlas/w_raise_wznosy_ramion_z_przyciaganiem_w_lezeniu_na_brzuchu.mp4'
    ],
    tip: 'Przez cały czas trwania ćwiczenia trzymaj kciuki skierowane do sufitu i mocno ściągaj łopatki do kręgosłupa.'
  }
];

export const WEEKLY_RULES: WeeklyRule[] = [
  {
    weekNumber: 1,
    title: 'Tydzień 1: Nauka techniki',
    description: 'Twoim celem jest idealna technika. Nie spiesz się.',
    sets: 3,
    repsLabel: '10-12 powtórzeń',
    plankLabel: '15-20 sekund (max techniczny)',
    restTimeSec: 120,
    specialInstruction: 'Skup się na czuciu mięśniowym, nie na tempie.'
  },
  {
    weekNumber: 2,
    title: 'Tydzień 2: Zwiększamy objętość',
    description: 'Znasz ruchy, więc robimy więcej pracy.',
    sets: 3,
    repsLabel: '15 powtórzeń',
    plankLabel: '+5-10 sek do rekordu',
    restTimeSec: 90,
    specialInstruction: 'Spróbuj skrócić przerwy między ćwiczeniami.'
  },
  {
    weekNumber: 3,
    title: 'Tydzień 3: Czas napięcia (Tempo)',
    description: 'Wolniejsze powtórzenia dla większego zaangażowania.',
    sets: 3,
    repsLabel: '10-12 (wolne tempo)',
    plankLabel: 'Do upadku (drżenie)',
    restTimeSec: 120,
    specialInstruction: 'Tempo: 1s w górę, 3s powoli w dół.'
  },
  {
    weekNumber: 4,
    title: 'Tydzień 4: Wytrzymałość',
    description: 'Tydzień wyzwania. Krótkie przerwy, więcej serii.',
    sets: 4,
    repsLabel: '12-15 powtórzeń',
    plankLabel: 'Bijemy rekordy',
    restTimeSec: 60,
    specialInstruction: 'Daj z siebie wszystko, to ostatni tydzień cyklu!'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'start',
    title: 'Pierwszy Krok',
    description: 'Ukończono pierwszy trening. Najtrudniejsze za Tobą!',
    icon: React.createElement(Zap, { size: 24 }),
    color: 'bg-yellow-400',
    conditionType: 'start'
  },
  {
    id: 'week_1',
    title: 'Debiutant',
    description: 'Ukończono Tydzień 1.',
    icon: React.createElement(Star, { size: 24 }),
    color: 'bg-emerald-400',
    conditionType: 'week',
    conditionValue: 1
  },
  {
    id: 'workouts_6',
    title: 'Szósty Bieg',
    description: 'Ukończono 6 pełnych treningów (bez dni przerwy). Rośniesz!',
    icon: React.createElement(Dumbbell, { size: 24 }),
    color: 'bg-cyan-500',
    conditionType: 'program'
  },
  {
    id: 'night_owl',
    title: 'Nocny Marek',
    description: 'Ukończono trening po godzinie 20:00.',
    icon: React.createElement(Moon, { size: 24 }),
    color: 'bg-indigo-500',
    conditionType: 'program' // Managed manually in code
  },
  {
    id: 'week_2',
    title: 'Rozkręcony',
    description: 'Ukończono Tydzień 2.',
    icon: React.createElement(Flame, { size: 24 }),
    color: 'bg-orange-400',
    conditionType: 'week',
    conditionValue: 2
  },
  {
    id: 'plank_30',
    title: 'Deska Drewniana',
    description: 'Utrzymano deskę przez 30 sekund.',
    icon: React.createElement(Timer, { size: 24 }),
    color: 'bg-amber-600',
    conditionType: 'plank',
    conditionValue: 30
  },
  {
    id: 'workouts_12',
    title: 'Maszyna',
    description: '12 treningów za Tobą. Jesteś nie do zatrzymania.',
    icon: React.createElement(BicepsFlexed, { size: 24 }),
    color: 'bg-pink-500',
    conditionType: 'program'
  },
  {
    id: 'week_3',
    title: 'Konsekwentny',
    description: 'Ukończono Tydzień 3.',
    icon: React.createElement(Shield, { size: 24 }),
    color: 'bg-blue-400',
    conditionType: 'week',
    conditionValue: 3
  },
  {
    id: 'rest_5',
    title: 'Ekspert Regeneracji',
    description: '5 dni odpoczynku. Leżenie do góry brzuchem to też element taktyki!',
    icon: React.createElement(Coffee, { size: 24 }),
    color: 'bg-teal-400',
    conditionType: 'program'
  },
  {
    id: 'plank_60',
    title: 'Deska Stalowa',
    description: 'Utrzymano deskę przez 60 sekund.',
    icon: React.createElement(Medal, { size: 24 }),
    color: 'bg-slate-400',
    conditionType: 'plank',
    conditionValue: 60
  },
  {
    id: 'program_complete',
    title: 'Mistrz Domu',
    description: 'Ukończono cały 28-dniowy program!',
    icon: React.createElement(Award, { size: 24 }),
    color: 'bg-rose-500',
    conditionType: 'program'
  },
  {
    id: 'plank_120',
    title: 'Deska Tytanowa',
    description: 'Utrzymano deskę przez 2 minuty. Legenda.',
    icon: React.createElement(Trophy, { size: 24 }),
    color: 'bg-yellow-500',
    conditionType: 'plank',
    conditionValue: 120
  }
];


import { Exercise, WeeklyRule } from './types';

export const EXERCISES: Exercise[] = [
  {
    id: 'row',
    name: 'Wiosłowanie w drzwiach (Doorway row)',
    target: 'Plecy / Bicepsy',
    description: 'Chwytasz framugę i przyciągasz się do niej. Im stopy bliżej framugi, tym trudniej.',
    imageUrl: 'm_wioslowanie_w_drzwiach.webp'
  },
  {
    id: 'tricep',
    name: 'Pompki przy ścianie',
    target: 'Tricepsy',
    description: 'Zginasz łokcie, zbliżając czoło do ściany, i odpychasz się.',
    imageUrl: 'm_pompki_przy_scianie.webp'
  },
  {
    id: 'lateral',
    name: 'Odwodzenie ramion w bok',
    target: 'Barki',
    description: 'Unosisz butelki na boki. Łokcie lekko ugięte, ruch tylko do poziomu barków.',
    imageUrl: 'odwodzenie_ramion_w_bok_ze_sztangielkami.webp'
  },
  {
    id: 'plank',
    name: 'Deska na przedramionach',
    target: 'Brzuch / Core',
    description: 'Opierasz się na łokciach i palcach stóp. Ciało w linii prostej. Nie puszczaj bioder!',
    imageUrl: 'deska_scianka_plank.webp'
  },
  {
    id: 'ytw',
    name: 'Y-T-W na macie',
    target: 'Plecy / Postawa',
    description: 'Leżąc na brzuchu, unosisz ręce w kolejnych układach liter Y, T, W.',
    imageUrl: 'Prone Y T W.webp'
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

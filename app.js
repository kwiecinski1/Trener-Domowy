const EXERCISES = [
  {
    id: 'row',
    name: 'Wiosłowanie w drzwiach (Doorway row)',
    target: 'Plecy / Bicepsy',
    description:
      'Przyciągaj klatkę piersiową do krawędzi framugi w zwisie podpartym, uginając ramiona i zachowując wyprostowaną sylwetkę.',
    videoUrls: ['https://static.fabrykasily.pl/atlas/m_wioslowanie_w_drzwiach.mp4'],
    tip:
      'Inicjuj ruch od mocnego ściągnięcia łopatek, aby to mięśnie grzbietu, a nie tylko ramiona, wykonały główną pracę.'
  },
  {
    id: 'tricep',
    name: 'Pompki przy ścianie',
    target: 'Tricepsy',
    description:
      'Opuść klatkę piersiową w stronę ściany i wróć do pozycji wyjściowej poprzez prostowanie ramion w podporze stojącym, zachowując przy tym ciało w linii prostej.',
    videoUrls: ['https://static.fabrykasily.pl/atlas/m_pompki_przy_scianie.mp4'],
    tip:
      'Utrzymuj stale napięte mięśnie brzucha i pośladków, aby zapobiec wyginaniu kręgosłupa i zapewnić pełną kontrolę nad ruchem.'
  },
  {
    id: 'lateral',
    name: 'Odwodzenie ramion w bok',
    target: 'Barki',
    description:
      'Unoś hantle bokiem do linii barków i powoli je opuszczaj, utrzymując wyprostowaną sylwetkę oraz lekko ugięte łokcie.',
    videoUrls: ['https://static.fabrykasily.pl/atlas/odwodzenie_ramion_w_bok_ze_sztangielkami.mp4'],
    tip:
      'Unikaj kołysania tułowiem i kontroluj ciężar zwłaszcza podczas ruchu w dół, aby utrzymać stałe napięcie w mięśniach naramiennych.'
  },
  {
    id: 'plank',
    name: 'Deska na przedramionach',
    target: 'Brzuch / Core',
    description:
      'Utrzymuj nieruchomą pozycję w podporze na przedramionach, dbając o to, by całe ciało tworzyło linię prostą równoległą do podłoża.',
    videoUrls: ['https://static.fabrykasily.pl/atlas/deska_scianka_plank.mp4'],
    tip:
      'Mocno napnij mięśnie brzucha oraz pośladków i pamiętaj o spokojnym oddechu, aby zapobiec opadaniu bioder i przeciążeniu odcinka lędźwiowego.'
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
    tip:
      'Przez cały czas trwania ćwiczenia trzymaj kciuki skierowane do sufitu i mocno ściągaj łopatki do kręgosłupa.'
  }
];

const WEEKLY_RULES = [
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

const BADGES = [
  {
    id: 'start',
    title: 'Pierwszy Krok',
    description: 'Ukończono pierwszy trening. Najtrudniejsze za Tobą!',
    icon: 'zap',
    color: 'bg-yellow-400',
    conditionType: 'start'
  },
  {
    id: 'week_1',
    title: 'Debiutant',
    description: 'Ukończono Tydzień 1.',
    icon: 'star',
    color: 'bg-emerald-400',
    conditionType: 'week',
    conditionValue: 1
  },
  {
    id: 'workouts_6',
    title: 'Szósty Bieg',
    description: 'Ukończono 6 pełnych treningów (bez dni przerwy). Rośniesz!',
    icon: 'dumbbell',
    color: 'bg-cyan-500',
    conditionType: 'program'
  },
  {
    id: 'night_owl',
    title: 'Nocny Marek',
    description: 'Ukończono trening po godzinie 20:00.',
    icon: 'moon',
    color: 'bg-indigo-500',
    conditionType: 'program'
  },
  {
    id: 'week_2',
    title: 'Rozkręcony',
    description: 'Ukończono Tydzień 2.',
    icon: 'flame',
    color: 'bg-orange-400',
    conditionType: 'week',
    conditionValue: 2
  },
  {
    id: 'plank_30',
    title: 'Deska Drewniana',
    description: 'Utrzymano deskę przez 30 sekund.',
    icon: 'timer',
    color: 'bg-amber-600',
    conditionType: 'plank',
    conditionValue: 30
  },
  {
    id: 'workouts_12',
    title: 'Maszyna',
    description: '12 treningów za Tobą. Jesteś nie do zatrzymania.',
    icon: 'biceps-flexed',
    color: 'bg-pink-500',
    conditionType: 'program'
  },
  {
    id: 'week_3',
    title: 'Konsekwentny',
    description: 'Ukończono Tydzień 3.',
    icon: 'shield',
    color: 'bg-blue-400',
    conditionType: 'week',
    conditionValue: 3
  },
  {
    id: 'rest_5',
    title: 'Ekspert Regeneracji',
    description: '5 dni odpoczynku. Leżenie do góry brzuchem to też element taktyki!',
    icon: 'coffee',
    color: 'bg-teal-400',
    conditionType: 'program'
  },
  {
    id: 'plank_60',
    title: 'Deska Stalowa',
    description: 'Utrzymano deskę przez 60 sekund.',
    icon: 'medal',
    color: 'bg-slate-400',
    conditionType: 'plank',
    conditionValue: 60
  },
  {
    id: 'program_complete',
    title: 'Mistrz Domu',
    description: 'Ukończono cały 28-dniowy program!',
    icon: 'award',
    color: 'bg-rose-500',
    conditionType: 'program'
  },
  {
    id: 'plank_120',
    title: 'Deska Tytanowa',
    description: 'Utrzymano deskę przez 2 minuty. Legenda.',
    icon: 'trophy',
    color: 'bg-yellow-500',
    conditionType: 'plank',
    conditionValue: 120
  }
];

const root = document.getElementById('root');

const state = {
  view: 'onboarding',
  lastView: null,
  startDate: null,
  schedule: [],
  completedDays: [],
  selectedDayIndex: null,
  currentProgress: {},
  exerciseOverrides: {},
  skippedExercises: [],
  isSyncModalOpen: false,
  isSettingsOpen: false,
  settingsTab: 'program',
  isAchievementsOpen: false,
  earnedBadges: [],
  plankRecord: 0,
  showNewBadgeToast: null,
  hasUnseenBadges: false,
  animatingDayIndex: null,
  restTimerOpen: false,
  restDuration: 60,
  restTimeLeft: 60,
  restInterval: null,
  infoExerciseId: null,
  exerciseVideoIndex: {},
  syncTab: 'export',
  syncPreview: null,
  importCode: '',
  notificationInterval: null,
  plankTimer: {
    time: 0,
    target: 30,
    running: false,
    countdown: null,
    countdownInterval: null,
    interval: null
  },
  darkMode: false,
  settings: {
    trainingDays: 3,
    restDays: 1,
    autoRestTimer: true,
    weeklyOverrides: {},
    notifications: {
      enabled: false,
      time: '18:00'
    }
  }
};

const init = () => {
  const savedStart = localStorage.getItem('workout_start_date');
  const savedCompleted = localStorage.getItem('workout_completed_days');
  const savedBadges = localStorage.getItem('earned_badges');
  const savedPlankRecord = localStorage.getItem('plank_record');
  const savedTheme = localStorage.getItem('theme');
  const savedSettings = localStorage.getItem('app_settings');
  const achievementsOpened = localStorage.getItem('achievements_opened') === 'true';

  if (savedSettings) {
    try {
      const parsed = JSON.parse(savedSettings);
      state.settings = {
        ...state.settings,
        ...parsed,
        notifications: {
          ...state.settings.notifications,
          ...(parsed.notifications || {})
        }
      };
    } catch (e) {
      console.warn('Failed to parse settings', e);
    }
  }

  if (savedTheme) {
    state.darkMode = savedTheme === 'dark';
  } else {
    state.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();

  if (savedStart) {
    const date = new Date(savedStart);
    state.startDate = date;
    state.completedDays = savedCompleted ? JSON.parse(savedCompleted) : [];
    if (savedBadges) {
      state.earnedBadges = JSON.parse(savedBadges);
    }
    if (savedPlankRecord) state.plankRecord = Number(savedPlankRecord);
    state.view = 'calendar';
  }

  state.hasUnseenBadges = !achievementsOpened;

  if (state.startDate) {
    state.schedule = generateSchedule(state.startDate, state.completedDays, state.settings);
  }

  render();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js');
    });
  }

  if (state.settings.notifications.enabled) {
    scheduleReminders();
  }
};

const applyTheme = () => {
  document.documentElement.classList.toggle('dark', state.darkMode);
  localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
};

const saveSettings = () => {
  localStorage.setItem('app_settings', JSON.stringify(state.settings));
};

const getWeeklyRule = (weekNumber) => {
  const base = WEEKLY_RULES.find((r) => r.weekNumber === weekNumber) || WEEKLY_RULES[0];
  const override = state.settings.weeklyOverrides[weekNumber] || {};
  return {
    ...base,
    ...override
  };
};

const generateSchedule = (startDate, completedDays, settings) => {
  const days = [];
  const totalDays = 28;
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const trainingDays = Math.max(1, Number(settings.trainingDays) || 3);
  const restDays = Math.max(1, Number(settings.restDays) || 1);
  const cycleLength = trainingDays + restDays;

  for (let i = 0; i < totalDays; i += 1) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    const weekNumber = Math.floor(i / 7) + 1;
    const cyclePos = i % cycleLength;
    const isRestDay = cyclePos >= trainingDays;
    const dateString = currentDate.toISOString().split('T')[0];

    days.push({
      date: currentDate,
      dayIndex: i,
      isRestDay,
      weekNumber,
      isCompleted: completedDays.includes(dateString)
    });
  }

  return days;
};

const getFormattedDate = (date) =>
  date.toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'short' });

const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const getStats = () => {
  const completedSet = new Set(state.completedDays);
  const sortedSchedule = [...state.schedule].sort((a, b) => a.date - b.date);
  const totalCompleted = state.completedDays.length;
  const workoutsCompleted = sortedSchedule.filter((d) => d.isCompleted && !d.isRestDay).length;
  const restCompleted = sortedSchedule.filter((d) => d.isCompleted && d.isRestDay).length;

  let currentStreak = 0;
  for (let i = sortedSchedule.length - 1; i >= 0; i -= 1) {
    const day = sortedSchedule[i];
    const key = day.date.toISOString().split('T')[0];
    if (completedSet.has(key)) {
      currentStreak += 1;
    } else if (currentStreak > 0) {
      break;
    }
  }

  let longestStreak = 0;
  let tempStreak = 0;
  sortedSchedule.forEach((day) => {
    const key = day.date.toISOString().split('T')[0];
    if (completedSet.has(key)) {
      tempStreak += 1;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  });

  return {
    totalCompleted,
    workoutsCompleted,
    restCompleted,
    currentStreak,
    longestStreak
  };
};

const showToast = (title) => {
  state.showNewBadgeToast = title;
  render();
  setTimeout(() => {
    state.showNewBadgeToast = null;
    render();
  }, 3000);
};

const checkAchievements = () => {
  if (!state.schedule.length) return;
  const newEarned = new Set(state.earnedBadges);
  let badgesChanged = false;

  const completedWorkoutsCount = state.schedule.filter((d) => d.isCompleted && !d.isRestDay).length;
  const completedRestDaysCount = state.schedule.filter((d) => d.isCompleted && d.isRestDay).length;

  if (state.completedDays.length > 0 && !newEarned.has('start')) {
    newEarned.add('start');
    badgesChanged = true;
    showToast('Pierwszy Krok');
  }

  for (let i = 1; i <= 3; i += 1) {
    const weekDays = state.schedule.filter((d) => d.weekNumber === i && !d.isRestDay);
    const isWeekComplete = weekDays.every((d) =>
      state.completedDays.includes(d.date.toISOString().split('T')[0])
    );
    if (isWeekComplete && !newEarned.has(`week_${i}`)) {
      newEarned.add(`week_${i}`);
      badgesChanged = true;
      showToast(`Ukończono Tydzień ${i}`);
    }
  }

  if (completedWorkoutsCount >= 6 && !newEarned.has('workouts_6')) {
    newEarned.add('workouts_6');
    badgesChanged = true;
    showToast('Szósty Bieg');
  }

  if (completedWorkoutsCount >= 12 && !newEarned.has('workouts_12')) {
    newEarned.add('workouts_12');
    badgesChanged = true;
    showToast('Maszyna');
  }

  if (completedRestDaysCount >= 5 && !newEarned.has('rest_5')) {
    newEarned.add('rest_5');
    badgesChanged = true;
    showToast('Ekspert Regeneracji');
  }

  if (completedWorkoutsCount >= 12) {
    const allWorkouts = state.schedule.filter((d) => !d.isRestDay);
    const allDone = allWorkouts.every((d) =>
      state.completedDays.includes(d.date.toISOString().split('T')[0])
    );
    if (allDone && !newEarned.has('program_complete')) {
      newEarned.add('program_complete');
      badgesChanged = true;
      showToast('Mistrz Domu!');
    }
  }

  BADGES.filter((b) => b.conditionType === 'plank').forEach((badge) => {
    if (badge.conditionValue && state.plankRecord >= badge.conditionValue && !newEarned.has(badge.id)) {
      newEarned.add(badge.id);
      badgesChanged = true;
      showToast(badge.title);
    }
  });

  if (badgesChanged) {
    state.earnedBadges = Array.from(newEarned);
    localStorage.setItem('earned_badges', JSON.stringify(state.earnedBadges));
  }
};

const handleStartProgram = (dateStr) => {
  if (!dateStr) return;
  const date = new Date(dateStr);
  state.startDate = date;
  localStorage.setItem('workout_start_date', date.toISOString());
  state.completedDays = [];
  localStorage.setItem('workout_completed_days', JSON.stringify([]));
  state.schedule = generateSchedule(date, state.completedDays, state.settings);
  state.hasUnseenBadges = localStorage.getItem('achievements_opened') !== 'true';
  state.view = 'calendar';
  render();
};

const handleImportData = (newDate, newCompleted, newPlankRecord) => {
  const parsedPlankRecord = Number.isFinite(Number(newPlankRecord))
    ? Number(newPlankRecord)
    : state.plankRecord;
  state.startDate = newDate;
  state.completedDays = newCompleted;
  state.plankRecord = parsedPlankRecord;
  localStorage.setItem('workout_start_date', newDate.toISOString());
  localStorage.setItem('workout_completed_days', JSON.stringify(newCompleted));
  localStorage.setItem('plank_record', parsedPlankRecord.toString());
  state.schedule = generateSchedule(newDate, newCompleted, state.settings);
  state.view = 'calendar';
  state.isSyncModalOpen = false;
  state.syncPreview = null;
  checkAchievements();
  render();
};

const handlePlankRecord = (seconds) => {
  if (seconds > state.plankRecord) {
    state.plankRecord = seconds;
    localStorage.setItem('plank_record', seconds.toString());
    checkAchievements();
  }
};

const handleDaySelect = (dayIndex) => {
  state.selectedDayIndex = dayIndex;
  const day = state.schedule[dayIndex];
  if (!day.isRestDay) {
    const rule = getWeeklyRule(day.weekNumber);
    const initialProgress = {};
    const isDayDone = day.isCompleted;
    EXERCISES.forEach((ex) => {
      initialProgress[ex.id] = Array(rule.sets).fill(isDayDone);
    });
    state.currentProgress = initialProgress;
  }
  if (state.plankTimer.interval) clearInterval(state.plankTimer.interval);
  if (state.plankTimer.countdownInterval) clearInterval(state.plankTimer.countdownInterval);
  state.plankTimer = {
    time: 0,
    target: 30,
    running: false,
    countdown: null,
    countdownInterval: null,
    interval: null
  };
  state.exerciseOverrides = {};
  state.skippedExercises = [];
  state.view = 'workout';
  state.infoExerciseId = null;
  render();
  window.scrollTo(0, 0);
};

const toggleSet = (exerciseIndex, exerciseId, setIndex) => {
  if (state.selectedDayIndex === null) return;
  const day = state.schedule[state.selectedDayIndex];
  const rule = getWeeklyRule(day.weekNumber);
  const totalSets = getExerciseSets(exerciseId, rule);

  const newSets = [...(state.currentProgress[exerciseId] || [])];
  const isCompleting = !newSets[setIndex];
  newSets[setIndex] = isCompleting;
  state.currentProgress = { ...state.currentProgress, [exerciseId]: newSets };

  if (isCompleting) {
    const nextIndex = (exerciseIndex + 1) % EXERCISES.length;
    state.pendingScrollTo = nextIndex;

    const isColumnComplete = EXERCISES.every((ex) => {
      if (isExerciseSkipped(ex.id)) return true;
      const exTotal = getExerciseSets(ex.id, rule);
      if (setIndex >= exTotal) return true;
      if (ex.id === exerciseId) return newSets[setIndex];
      return state.currentProgress[ex.id]?.[setIndex];
    });

    if (state.settings.autoRestTimer && isColumnComplete && setIndex < totalSets - 1) {
      openRestTimer(rule.restTimeSec);
    }
  }

  render();
};

const completeAllSets = (exerciseId, totalSets) => {
  const newSets = new Array(totalSets).fill(true);
  state.currentProgress = { ...state.currentProgress, [exerciseId]: newSets };
  render();
};

const finishWorkout = () => {
  if (state.selectedDayIndex === null) return;
  const day = state.schedule[state.selectedDayIndex];
  const dateString = day.date.toISOString().split('T')[0];
  const currentHour = new Date().getHours();

  if (!state.completedDays.includes(dateString)) {
    state.completedDays = [...state.completedDays, dateString];
    localStorage.setItem('workout_completed_days', JSON.stringify(state.completedDays));

    if (currentHour >= 20 && !state.earnedBadges.includes('night_owl')) {
      state.earnedBadges = [...state.earnedBadges, 'night_owl'];
      localStorage.setItem('earned_badges', JSON.stringify(state.earnedBadges));
      showToast('Nocny Marek');
    }

    state.animatingDayIndex = day.dayIndex;
    setTimeout(() => {
      state.animatingDayIndex = null;
      render();
    }, 2000);
  }

  state.view = 'calendar';
  state.selectedDayIndex = null;
  state.schedule = generateSchedule(state.startDate, state.completedDays, state.settings);
  checkAchievements();
  render();
};

const resetProgram = () => {
  if (confirm('Czy na pewno chcesz zresetować cały plan?')) {
    localStorage.clear();
    state.startDate = null;
    state.completedDays = [];
    state.earnedBadges = [];
    state.plankRecord = 0;
    state.hasUnseenBadges = false;
    state.view = 'onboarding';
    state.schedule = [];
    render();
  }
};

const openAchievements = () => {
  state.isAchievementsOpen = true;
  state.hasUnseenBadges = false;
  localStorage.setItem('achievements_opened', 'true');
  render();
};

const generateExportCode = () => {
  if (!state.startDate) return '';
  const data = { s: state.startDate.toISOString(), c: state.completedDays, p: state.plankRecord };
  try {
    return btoa(JSON.stringify(data));
  } catch (e) {
    return 'Error generating code';
  }
};

const handleCopy = async () => {
  const exportCode = generateExportCode();
  try {
    await navigator.clipboard.writeText(exportCode);
    const indicator = document.querySelector('[data-copy-indicator]');
    if (indicator) {
      indicator.textContent = 'Skopiowano!';
      setTimeout(() => {
        indicator.textContent = 'Kopiuj';
      }, 2000);
    }
  } catch (err) {
    console.error('Failed to copy', err);
  }
};

const handleImport = () => {
  const textarea = document.querySelector('#import-code');
  const error = document.querySelector('#import-error');
  if (error) error.textContent = '';

  try {
    if (!state.syncPreview) {
      if (error) error.textContent = 'Najpierw wykonaj podgląd danych.';
      return;
    }

    handleImportData(
      state.syncPreview.date,
      state.syncPreview.completed,
      state.syncPreview.plankRecord
    );
    state.syncPreview = null;
    state.importCode = '';
    alert('Dane załadowane pomyślnie!');
  } catch (e) {
    if (error) error.textContent = 'Nieprawidłowy kod. Sprawdź czy skopiowałeś całość.';
  }
};

const handlePreview = () => {
  const error = document.querySelector('#import-error');
  if (error) error.textContent = '';

  try {
    if (!state.importCode.trim()) {
      if (error) error.textContent = 'Wklej kod przed podglądem.';
      return;
    }

    const jsonString = atob(state.importCode.trim());
    const data = JSON.parse(jsonString);

    if (!data.s || !Array.isArray(data.c)) {
      throw new Error('Nieprawidłowy format danych');
    }

    const newDate = new Date(data.s);
    if (Number.isNaN(newDate.getTime())) {
      throw new Error('Nieprawidłowa data');
    }

    const parsedPlankRecord = Number.isFinite(Number(data.p)) ? Number(data.p) : 0;

    state.syncPreview = {
      date: newDate,
      startDate: newDate.toISOString().split('T')[0],
      completedCount: data.c.length,
      completed: data.c,
      plankRecord: parsedPlankRecord
    };
    render();
  } catch (e) {
    state.syncPreview = null;
    if (error) error.textContent = 'Nieprawidłowy kod. Sprawdź czy skopiowałeś całość.';
  }
};

const openRestTimer = (duration) => {
  state.restDuration = duration;
  state.restTimeLeft = duration;
  state.restTimerOpen = true;
  render();
  startRestInterval();
};

const startRestInterval = () => {
  if (state.restInterval) clearInterval(state.restInterval);
  state.restInterval = setInterval(() => {
    if (!state.restTimerOpen) return;
    state.restTimeLeft = Math.max(0, state.restTimeLeft - 1);
    updateRestTimerUI();
    if (state.restTimeLeft === 0) {
      clearInterval(state.restInterval);
      setTimeout(() => closeRestTimer(), 1000);
    }
  }, 1000);
};

const closeRestTimer = () => {
  state.restTimerOpen = false;
  if (state.restInterval) clearInterval(state.restInterval);
  state.restInterval = null;
  render();
};

const updateRestTimerUI = () => {
  const timeEl = document.querySelector('[data-rest-time]');
  const ringEl = document.querySelector('[data-rest-ring]');
  if (!timeEl || !ringEl) return;
  timeEl.textContent = formatTime(state.restTimeLeft);
  const progress = Math.max(0, (state.restTimeLeft / state.restDuration) * 100);
  const offset = 283 - (283 * progress) / 100;
  ringEl.style.strokeDashoffset = offset;
};

const formatTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const playSuccessSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1.5);
  } catch (e) {
    console.error('Audio playback failed', e);
  }
};

const scheduleReminders = () => {
  if (state.notificationInterval) {
    clearInterval(state.notificationInterval);
    state.notificationInterval = null;
  }
  if (!state.settings.notifications.enabled) return;

  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  state.notificationInterval = setInterval(() => {
    if (!state.settings.notifications.enabled) return;
    const [hourStr, minStr] = state.settings.notifications.time.split(':');
    const hour = Number(hourStr);
    const minute = Number(minStr);
    const now = new Date();
    if (now.getHours() !== hour || now.getMinutes() !== minute) return;
    const lastKey = 'last_reminder_date';
    const today = now.toISOString().split('T')[0];
    if (localStorage.getItem(lastKey) === today) return;
    localStorage.setItem(lastKey, today);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Czas na trening!', {
        body: 'Otwórz Trenera Domowego i zrób plan na dziś.',
        icon: './icons/icon-192.svg'
      });
    } else {
      alert('Czas na trening!');
    }
  }, 30000);
};

const getExerciseSets = (exerciseId, rule) => {
  const override = state.exerciseOverrides[exerciseId];
  return override?.sets || rule.sets;
};

const isExerciseSkipped = (exerciseId) => state.skippedExercises.includes(exerciseId);

const isExerciseComplete = (exerciseId, rule) => {
  if (isExerciseSkipped(exerciseId)) return true;
  const totalSets = getExerciseSets(exerciseId, rule);
  const progress = state.currentProgress[exerciseId] || [];
  if (progress.length < totalSets) return false;
  return progress.slice(0, totalSets).every(Boolean);
};

const updatePlankTimerUI = () => {
  const timerEl = document.querySelector('[data-plank-time]');
  const targetLabel = document.querySelector('[data-plank-target-label]');
  const badgeEl = document.querySelector('[data-plank-badge]');
  const startButton = document.querySelector('[data-plank-start]');
  if (!timerEl || !targetLabel || !startButton) return;

  timerEl.textContent = formatTime(state.plankTimer.time);
  targetLabel.textContent = `Cel: ${formatTime(state.plankTimer.target)}`;

  const isTargetReached = state.plankTimer.time >= state.plankTimer.target && state.plankTimer.time > 0;
  timerEl.classList.toggle('text-emerald-600', isTargetReached);
  timerEl.classList.toggle('dark:text-emerald-400', isTargetReached);
  timerEl.classList.toggle('text-slate-800', !isTargetReached);
  timerEl.classList.toggle('dark:text-slate-200', !isTargetReached);
  if (badgeEl) badgeEl.classList.toggle('hidden', !isTargetReached);

  if (state.plankTimer.running) {
    startButton.innerHTML = '<i data-lucide="pause" class="w-5 h-5"></i> Pauza';
    startButton.classList.remove('bg-primary');
    startButton.classList.add('bg-amber-500');
  } else {
    startButton.innerHTML = '<i data-lucide="play" class="w-5 h-5"></i> Start';
    startButton.classList.remove('bg-amber-500');
    startButton.classList.add('bg-primary');
  }

};

const startPlankCountdown = () => {
  if (state.plankTimer.running || state.plankTimer.countdown !== null) return;
  state.plankTimer.countdown = 3;
  renderPlankCountdown();
  state.plankTimer.countdownInterval = setInterval(() => {
    state.plankTimer.countdown -= 1;
    renderPlankCountdown();
    if (state.plankTimer.countdown === 0) {
      clearInterval(state.plankTimer.countdownInterval);
      state.plankTimer.countdown = null;
      startPlankTimer();
    }
  }, 1000);
};

const renderPlankCountdown = () => {
  const overlay = document.querySelector('[data-plank-countdown]');
  if (!overlay) return;
  if (state.plankTimer.countdown === null) {
    overlay.classList.add('hidden');
    return;
  }
  overlay.classList.remove('hidden');
  overlay.querySelector('span').textContent = state.plankTimer.countdown;
};

const startPlankTimer = () => {
  state.plankTimer.running = true;
  updatePlankTimerUI();
  if (state.plankTimer.interval) clearInterval(state.plankTimer.interval);
  state.plankTimer.interval = setInterval(() => {
    state.plankTimer.time += 1;
    if (state.plankTimer.time === state.plankTimer.target) playSuccessSound();
    updatePlankTimerUI();
  }, 1000);
};

const pausePlankTimer = () => {
  state.plankTimer.running = false;
  if (state.plankTimer.interval) clearInterval(state.plankTimer.interval);
  state.plankTimer.interval = null;
  if (state.plankTimer.time > 0) handlePlankRecord(state.plankTimer.time);
  updatePlankTimerUI();
};

const resetPlankTimer = () => {
  if (state.plankTimer.interval) clearInterval(state.plankTimer.interval);
  state.plankTimer.interval = null;
  if (state.plankTimer.time > 0) handlePlankRecord(state.plankTimer.time);
  state.plankTimer.time = 0;
  state.plankTimer.running = false;
  state.plankTimer.countdown = null;
  updatePlankTimerUI();
  renderPlankCountdown();
};

const render = () => {
  const previousScroll = window.scrollY;
  const shouldRestoreScroll = state.lastView === state.view;

  if (state.view === 'onboarding') {
    root.innerHTML = renderOnboarding();
  } else if (state.view === 'calendar') {
    root.innerHTML = renderCalendar();
  } else if (state.view === 'workout') {
    root.innerHTML = renderWorkout();
  }

  if (state.showNewBadgeToast) {
    const toast = document.querySelector('[data-toast]');
    if (toast) toast.classList.add('toast-slide-in');
  }

  if (window.lucide) window.lucide.createIcons();

  if (state.pendingScrollTo !== undefined && state.view === 'workout') {
    const target = document.querySelector(`[data-exercise-index="${state.pendingScrollTo}"]`);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
    delete state.pendingScrollTo;
  }

  if (state.restTimerOpen) updateRestTimerUI();
  renderPlankCountdown();
  updatePlankTimerUI();

  if (shouldRestoreScroll) {
    window.scrollTo(0, previousScroll);
  } else {
    window.scrollTo(0, 0);
  }
  state.lastView = state.view;
};

const renderOnboarding = () => `
  <div class="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
    <button
      data-action="toggle-theme"
      class="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-slate-800 text-gray-800 dark:text-yellow-300 shadow-md transition-colors"
      aria-label="Zmień motyw"
    >
      <i data-lucide="${state.darkMode ? 'sun' : 'moon'}" class="w-5 h-5"></i>
    </button>

    <div class="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center border border-gray-100 dark:border-slate-800">
      <div class="bg-primary/10 dark:bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <i data-lucide="dumbbell" class="text-primary w-10 h-10"></i>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Trener Domowy</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Twój 4-tygodniowy plan transformacji. Wiosłowanie, deska i zdrowy ruch.
      </p>

      <label class="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Kiedy zaczynamy?
      </label>
      <input
        type="date"
        data-action="start-program"
        class="w-full px-4 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none mb-6"
        style="color-scheme: ${state.darkMode ? 'dark' : 'light'}"
      />
      <p class="text-xs text-gray-400 dark:text-gray-500">
        Wybierz dzisiejszą datę lub datę z przeszłości, jeśli już zacząłeś.
      </p>
      <div class="mt-8 border-t border-gray-100 dark:border-slate-800 pt-6">
        <button
          data-action="open-sync"
          class="text-gray-500 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-primary flex items-center justify-center gap-2 mx-auto"
        >
          <i data-lucide="cloud" class="w-4 h-4"></i> Masz kod zapisu? Wczytaj postęp
        </button>
      </div>
      ${state.isSyncModalOpen ? renderSyncModal() : ''}
    </div>
  </div>
`;

const renderCalendar = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const completedCount = state.schedule.filter((d) => d.isCompleted).length;
  const progressPercent = Math.round((completedCount / 28) * 100);
  const activeDay = state.schedule.find((d) => !d.isCompleted);
  const activeDayIndex = activeDay ? activeDay.dayIndex : state.schedule.length;
  const stats = getStats();

  const weeks = [];
  for (let i = 0; i < state.schedule.length; i += 7) {
    weeks.push(state.schedule.slice(i, i + 7));
  }

  return `
  <div class="min-h-screen bg-gray-50 dark:bg-slate-950 pb-10 transition-colors duration-300 relative">
    ${state.isSyncModalOpen ? renderSyncModal() : ''}
    ${state.isSettingsOpen ? renderSettingsModal() : ''}
    ${state.isAchievementsOpen ? renderAchievementsModal() : ''}
    ${state.showNewBadgeToast ? renderToast() : ''}

    <header class="bg-white dark:bg-slate-900 sticky top-0 z-10 shadow-sm border-b border-gray-200 dark:border-slate-800 px-4 py-4 flex justify-between items-center transition-colors">
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Twój Plan</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Całkowity postęp: ${progressPercent}%</p>
      </div>
      <div class="flex gap-2 items-center">
        <button data-action="open-achievements" class="relative text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 transition-colors p-2" title="Osiągnięcia">
          <i data-lucide="trophy" class="w-6 h-6"></i>
          ${
            state.hasUnseenBadges
              ? `<span class="absolute top-1 right-1 flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                </span>`
              : ''
          }
        </button>
        <button data-action="toggle-theme" class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-yellow-300 transition-colors p-2">
          <i data-lucide="${state.darkMode ? 'sun' : 'moon'}" class="w-6 h-6"></i>
        </button>
        <button data-action="open-settings" class="text-gray-500 hover:text-primary dark:text-gray-400 transition-colors p-2" title="Ustawienia">
          <i data-lucide="sliders-horizontal" class="w-6 h-6"></i>
        </button>
        <button data-action="open-sync" class="text-gray-500 hover:text-primary dark:text-gray-400 transition-colors p-2" title="Synchronizuj dane">
          <i data-lucide="cloud" class="w-6 h-6"></i>
        </button>
        <button data-action="reset-program" class="text-xs text-red-400 hover:text-red-600 dark:hover:text-red-300 ml-1">Resetuj</button>
      </div>
    </header>

    <div class="max-w-3xl mx-auto p-4 space-y-8">
      <div class="bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-100 dark:border-slate-800 shadow-sm">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Statystyki</h3>
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <p class="text-xs text-gray-500 dark:text-slate-400">Ukończone dni</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">${stats.totalCompleted}</p>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <p class="text-xs text-gray-500 dark:text-slate-400">Treningi</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">${stats.workoutsCompleted}</p>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <p class="text-xs text-gray-500 dark:text-slate-400">Regeneracje</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">${stats.restCompleted}</p>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <p class="text-xs text-gray-500 dark:text-slate-400">Aktualny streak</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">${stats.currentStreak}</p>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <p class="text-xs text-gray-500 dark:text-slate-400">Najdłuższy streak</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">${stats.longestStreak}</p>
          </div>
        </div>
      </div>
      ${weeks
        .map((weekDays, weekIndex) => {
          const weekNum = weekIndex + 1;
          const completedInWeek = weekDays.filter((d) => d.isCompleted).length;
          const totalInWeek = 7;
          const weekProgress = (completedInWeek / totalInWeek) * 100;
          const rule = getWeeklyRule(weekNum);

          return `
            <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div class="flex justify-between items-end mb-3 px-2">
                <div>
                  <h3 class="text-lg font-bold text-gray-800 dark:text-slate-100">Tydzień ${weekNum}</h3>
                  <p class="text-xs text-gray-500 dark:text-slate-400">${rule?.title || ''}</p>
                </div>
                <div class="text-right w-1/3 max-w-[120px]">
                  <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">${Math.round(weekProgress)}% Ukończone</span>
                  <div class="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div class="bg-primary h-full rounded-full transition-all duration-700 ease-out" style="width: ${weekProgress}%"></div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-4 sm:grid-cols-7 gap-3">
                ${weekDays
                  .map((day) => {
                    const isPast = day.date < today;
                    const isCurrent = isToday(day.date);
                    const isAnimating = state.animatingDayIndex === day.dayIndex;
                    const isLocked = day.dayIndex > activeDayIndex;

                    let cardClass =
                      'relative p-2 rounded-xl border flex flex-col items-center justify-center min-h-[90px] transition-all ';

                    if (isLocked) {
                      cardClass +=
                        'bg-gray-50 dark:bg-slate-900 border-dashed border-gray-200 dark:border-slate-800 opacity-40 grayscale cursor-not-allowed';
                    } else {
                      cardClass += 'cursor-pointer ';
                      if (day.isCompleted) {
                        cardClass +=
                          'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
                      } else if (isCurrent) {
                        cardClass +=
                          'bg-white dark:bg-slate-800 border-primary dark:border-primary shadow-lg ring-2 ring-primary/20 scale-105 z-10';
                      } else if (isPast) {
                        cardClass +=
                          'bg-gray-100 dark:bg-slate-900 border-gray-200 dark:border-slate-800 opacity-60';
                      } else {
                        cardClass +=
                          'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600';
                      }
                    }

                    return `
                      <div class="${cardClass}" data-action="select-day" data-day-index="${day.dayIndex}">
                        ${
                          isLocked
                            ? `<div class="absolute inset-0 flex items-center justify-center z-20">
                                <i data-lucide="lock" class="text-gray-400 dark:text-slate-600" style="width:24px;height:24px;"></i>
                              </div>`
                            : ''
                        }
                        ${
                          isAnimating
                            ? `<div class="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
                                <div class="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-yellow-400/30 animate-ping rounded-full"></div>
                                <div class="absolute top-0 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-[ping_1s_ease-out]"></div>
                                <div class="absolute bottom-0 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-[ping_1.2s_ease-out]"></div>
                                <div class="absolute top-1/4 right-0 w-2 h-2 bg-green-400 rounded-full animate-[ping_0.8s_ease-out]"></div>
                              </div>`
                            : ''
                        }
                        <div class="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">
                          ${getFormattedDate(day.date).split(',')[0]}
                        </div>
                        ${
                          day.isRestDay
                            ? `<div class="bg-amber-100 dark:bg-amber-900/40 text-amber-500 dark:text-amber-400 rounded-full p-1.5 mb-1">
                                <i data-lucide="flame" class="w-4 h-4"></i>
                              </div>`
                            : `<div class="rounded-full p-1.5 mb-1 transition-transform duration-500 ${
                                isAnimating ? 'scale-150 rotate-12' : ''
                              } ${
                                day.isCompleted
                                  ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
                                  : 'bg-primary/10 dark:bg-primary/20 text-primary'
                              }">
                                <i data-lucide="${day.isCompleted ? 'check-circle' : 'dumbbell'}" class="w-4 h-4"></i>
                              </div>`
                        }
                        <div class="text-xs font-medium text-gray-600 dark:text-slate-300">${day.date.getDate()}</div>
                        ${
                          isCurrent && !day.isCompleted && !isLocked
                            ? `<span class="absolute -top-2 bg-primary text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">DZIŚ</span>`
                            : ''
                        }
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            </div>
          `;
        })
        .join('')}
    </div>
  </div>
  `;
};

const renderWorkout = () => {
  const day = state.schedule[state.selectedDayIndex];
  const rule = getWeeklyRule(day.weekNumber);
  const isAllSetsCompleted = EXERCISES.every((ex) => isExerciseComplete(ex.id, rule));

  return `
  <div class="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
    ${state.restTimerOpen ? renderRestTimerOverlay() : ''}

    <div class="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
      <button data-action="back-to-calendar" class="p-2 -ml-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
        <i data-lucide="chevron-left" class="w-6 h-6"></i>
      </button>
      <div class="text-center">
        <h2 class="font-bold text-gray-900 dark:text-white">${getFormattedDate(day.date)}</h2>
        <p class="text-xs text-primary font-medium">${rule.title}</p>
      </div>
      <div class="w-10">
        <button data-action="toggle-theme" class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-yellow-300 transition-colors">
          <i data-lucide="${state.darkMode ? 'sun' : 'moon'}" class="w-5 h-5"></i>
        </button>
      </div>
    </div>

    <div class="max-w-xl mx-auto p-4 pb-24">
      ${
        day.isRestDay
          ? renderRestDay()
          : `
            <div class="bg-white dark:bg-slate-900 rounded-xl p-5 mb-6 border border-primary/20 dark:border-primary/10 shadow-sm relative overflow-hidden transition-colors">
              <div class="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <h3 class="font-bold text-lg mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                <i data-lucide="info" class="text-primary w-5 h-5"></i>
                Zasady na ten tydzień
              </h3>
              <ul class="text-sm text-gray-600 dark:text-slate-400 space-y-1">
                <li>• <strong>Przerwy:</strong> ${rule.restTimeSec} sekund</li>
                <li>• <strong>Tempo:</strong> ${rule.specialInstruction}</li>
              </ul>
            </div>
            ${EXERCISES.map((ex, index) => renderExerciseCard(ex, rule, index)).join('')}
            <div class="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-20">
              <button
                data-action="finish-workout"
                ${isAllSetsCompleted ? '' : 'disabled'}
                class="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all transform ${
                  isAllSetsCompleted
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-400 dark:text-slate-500 border border-gray-200 dark:border-slate-700'
                }"
              >
                ${
                  isAllSetsCompleted
                    ? '<i data-lucide="trophy" class="w-6 h-6"></i> Zakończ Trening'
                    : '<span>Ukończ wszystkie serie</span>'
                }
              </button>
            </div>
          `
      }
      ${state.infoExerciseId ? renderExerciseModal() : ''}
    </div>
  </div>
  `;
};

const renderRestDay = () => `
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div class="w-32 h-32 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
      <i data-lucide="flame" class="text-amber-500 dark:text-amber-400" style="width:64px;height:64px;"></i>
    </div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">Dzień Regeneracji</h1>
    <p class="text-gray-600 dark:text-slate-400 max-w-sm mb-8">
      Mięśnie rosną kiedy odpoczywasz, nie kiedy trenujesz. Wykorzystaj ten dzień na spacer, rozciąganie lub po prostu relaks.
    </p>
    <button
      data-action="finish-workout"
      class="bg-gray-800 dark:bg-slate-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700 dark:hover:bg-slate-600 transition-colors"
    >
      Oznacz jako zrobione
    </button>
  </div>
`;

const renderExerciseCard = (exercise, rule, index) => {
  const displayTip = exercise.tip || rule.specialInstruction;
  const completedSets = state.currentProgress[exercise.id] || [];
  const totalSets = getExerciseSets(exercise.id, rule);
  const currentVideoIndex = state.exerciseVideoIndex[exercise.id] || 0;
  const isPlank = exercise.id === 'plank';
  const isSkipped = isExerciseSkipped(exercise.id);

  if (isSkipped) {
    return `
      <div class="bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-gray-200 dark:border-slate-800 p-5 mb-6 flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-700 dark:text-slate-200">${exercise.name}</h3>
          <p class="text-xs text-gray-500 dark:text-slate-400">Ćwiczenie pominięte w tym treningu.</p>
        </div>
        <button data-action="toggle-skip" data-exercise-id="${exercise.id}" class="text-sm text-primary hover:text-sky-600 font-semibold">Przywróć</button>
      </div>
    `;
  }

  return `
    <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden mb-6 group/card transition-shadow duration-300 hover:shadow-lg" data-exercise-index="${index}">
      <div class="relative h-56 bg-gray-800 overflow-hidden">
        <video
          src="${exercise.videoUrls[currentVideoIndex]}"
          ${exercise.videoUrls.length === 1 ? 'loop' : ''}
          autoplay
          muted
          playsinline
          data-action="video-ended"
          data-exercise-id="${exercise.id}"
          class="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 transition-opacity duration-300"
        ></video>
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
          <h3 class="text-white text-xl font-bold flex items-center gap-2 drop-shadow-md">${exercise.name}</h3>
          <span class="text-white/90 text-xs font-semibold bg-white/20 px-2 py-0.5 rounded backdrop-blur-md inline-block mt-1 border border-white/10">${exercise.target}</span>
          ${
            exercise.videoUrls.length > 1
              ? `<span class="text-white/70 text-[10px] ml-2 font-mono">Krok ${currentVideoIndex + 1}/${exercise.videoUrls.length}</span>`
              : ''
          }
        </div>
        <a
          href="https://www.youtube.com/results?search_query=${encodeURIComponent(
            exercise.name + ' ćwiczenie technika'
          )}"
          target="_blank"
          rel="noopener noreferrer"
          class="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white pl-2 pr-3 py-1.5 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-1 group/yt pointer-events-auto"
          title="Zobacz instruktaż wideo"
        >
          <i data-lucide="play" class="w-4 h-4" style="fill:white;"></i>
          <span class="text-xs font-bold">WIDEO</span>
        </a>
      </div>

      <div class="p-5">
        <div class="flex justify-between items-start mb-4">
          <p class="text-gray-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">
            ${exercise.description}
          </p>
          <button data-action="open-info" data-exercise-id="${exercise.id}" class="ml-2 text-primary hover:text-sky-700 dark:hover:text-sky-400 transition-colors p-1" title="Pełny opis">
            <i data-lucide="info" class="w-5 h-5"></i>
          </button>
        </div>
        <div class="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-500 dark:text-slate-400">
          <label class="flex items-center gap-2">
            Serie
            <select data-action="set-override" data-exercise-id="${exercise.id}" class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded px-2 py-1 text-gray-700 dark:text-slate-200">
              ${[1, 2, 3, 4, 5, 6]
                .map(
                  (value) => `<option value="${value}" ${value === totalSets ? 'selected' : ''}>${value}</option>`
                )
                .join('')}
            </select>
          </label>
          <button data-action="toggle-skip" data-exercise-id="${exercise.id}" class="text-red-500 hover:text-red-600 font-semibold">Pomiń dziś</button>
        </div>
        ${
          displayTip
            ? `<div class="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs rounded-lg border border-blue-100 dark:border-blue-800/50 flex gap-2 items-start">
                <div class="mt-0.5 min-w-[4px] h-4 bg-blue-400 rounded-full"></div>
                <span><strong>Wskazówka:</strong> ${displayTip}</span>
              </div>`
            : ''
        }
        <div class="flex flex-col gap-3">
          <div class="flex justify-between items-center text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider border-b border-gray-100 dark:border-slate-800 pb-2 mb-2">
            <span>Cel: ${isPlank ? rule.plankLabel : rule.repsLabel}</span>
            <button data-action="complete-all" data-exercise-id="${exercise.id}" data-sets="${totalSets}" class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 px-3 py-1.5 rounded transition-colors active:scale-95">
              <i data-lucide="check-check" class="w-4 h-4"></i>
              Zalicz wszystko
            </button>
          </div>
          ${isPlank ? renderPlankTimer() : ''}
          <div class="flex gap-3 mt-1 justify-center sm:justify-start flex-wrap">
            ${Array.from({ length: totalSets })
              .map((_, setIndex) => {
                const isCompleted = completedSets[setIndex];
                const isLocked = setIndex > 0 && !completedSets[setIndex - 1];
                return `
                  <button
                    data-action="toggle-set"
                    data-exercise-id="${exercise.id}"
                    data-exercise-index="${index}"
                    data-set-index="${setIndex}"
                    ${isLocked ? 'disabled' : ''}
                    class="flex flex-col items-center gap-1 group focus:outline-none transition-all duration-200 ${
                      isLocked
                        ? 'opacity-40 cursor-not-allowed'
                        : isCompleted
                          ? 'scale-105'
                          : 'hover:scale-110'
                    }"
                  >
                    ${
                      isCompleted
                        ? '<i data-lucide="check-circle-2" class="text-emerald-500 w-12 h-12 shadow-sm rounded-full bg-white dark:bg-slate-800"></i>'
                        : isLocked
                          ? '<div class="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-slate-700 flex items-center justify-center bg-gray-50 dark:bg-slate-800 text-gray-300 dark:text-slate-600"><i data-lucide="lock" class="w-5 h-5"></i></div>'
                          : '<i data-lucide="circle" class="text-gray-200 dark:text-slate-600 w-12 h-12 group-hover:text-primary transition-colors" style="stroke-width:1.5"></i>'
                    }
                    <span class="text-[10px] font-bold uppercase tracking-wide ${
                      isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-600'
                    }">Seria ${setIndex + 1}</span>
                  </button>
                `;
              })
              .join('')}
          </div>
        </div>
      </div>
    </div>
  `;
};

const renderPlankTimer = () => `
  <div class="flex flex-col items-center p-4 rounded-xl mt-2 transition-colors duration-500 relative overflow-hidden bg-gray-100 dark:bg-slate-800" id="plank-timer">
    <div data-plank-countdown class="hidden absolute inset-0 z-10 bg-black/80 flex items-center justify-center rounded-xl">
      <div class="text-white font-bold text-6xl animate-bounce"><span>3</span></div>
      <p class="absolute bottom-4 text-white/80 text-sm">Przygotuj się...</p>
    </div>
    <div class="text-4xl font-mono font-bold mb-2 text-slate-800 dark:text-slate-200" data-plank-time>${formatTime(
      state.plankTimer.time
    )}</div>
    <span data-plank-badge class="hidden text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4 animate-bounce">Cel osiągnięty!</span>

    <div class="w-full max-w-xs mb-4 px-2">
      <div class="flex justify-between text-xs text-gray-500 dark:text-slate-400 mb-1 font-medium">
        <span class="flex items-center gap-1"><i data-lucide="target" class="w-4 h-4"></i> <span data-plank-target-label>Cel: ${formatTime(
          state.plankTimer.target
        )}</span></span>
      </div>
      <input
        type="range"
        min="10"
        max="180"
        step="5"
        value="${state.plankTimer.target}"
        data-action="plank-target"
        class="w-full h-2 bg-gray-300 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary"
        ${state.plankTimer.running || state.plankTimer.time > 0 ? 'disabled' : ''}
      />
      <div class="flex justify-between text-[10px] text-gray-400 dark:text-slate-500 mt-1">
        <span>10s</span>
        <span>3 min</span>
      </div>
    </div>

    <div class="flex gap-4">
      <button data-action="plank-start" data-plank-start class="flex items-center gap-2 px-6 py-2 rounded-full text-white font-medium transition-colors shadow-md bg-primary hover:bg-sky-600">
        <i data-lucide="play" class="w-5 h-5"></i> Start
      </button>
      <button data-action="plank-reset" class="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors shadow-sm">
        <i data-lucide="rotate-ccw" class="w-5 h-5"></i> Reset
      </button>
    </div>
  </div>
`;

const renderExerciseModal = () => {
  const exercise = EXERCISES.find((ex) => ex.id === state.infoExerciseId);
  if (!exercise) return '';
  const rule = getWeeklyRule(state.schedule[state.selectedDayIndex].weekNumber);
  const displayTip = exercise.tip || rule.specialInstruction;

  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" data-action="close-info">
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative border border-gray-100 dark:border-slate-800" data-stop-prop>
        <button data-action="close-info" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
        <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">${exercise.name}</h3>
        <span class="inline-block bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded mb-4">${exercise.target}</span>
        <div class="prose prose-sm text-gray-600 dark:text-slate-300 leading-relaxed">
          <p>${exercise.description}</p>
          ${
            displayTip
              ? `<div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <h5 class="font-bold text-blue-900 dark:text-blue-100 mb-1">Wskazówka Trenera:</h5>
                  <p class="text-blue-800 dark:text-blue-200">${displayTip}</p>
                </div>`
              : ''
          }
        </div>
        <div class="mt-8 pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-end">
          <button data-action="close-info" class="px-6 py-2 bg-gray-900 dark:bg-slate-800 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-slate-700 transition-colors">Zamknij</button>
        </div>
      </div>
    </div>
  `;
};

const renderSyncModal = () => {
  const exportCode = generateExportCode();
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" data-action="close-sync">
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl relative border border-gray-100 dark:border-slate-800" data-stop-prop>
        <button data-action="close-sync" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
        <h3 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Synchronizacja</h3>
        <div class="flex border-b border-gray-200 dark:border-slate-800 mb-6">
          <button data-action="sync-tab" data-tab="export" class="flex-1 pb-3 font-medium text-sm transition-colors ${
            state.syncTab === 'export'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }">
            <span class="flex items-center justify-center gap-2">
              <i data-lucide="upload" class="w-4 h-4"></i> Eksportuj (Zapisz)
            </span>
          </button>
          <button data-action="sync-tab" data-tab="import" class="flex-1 pb-3 font-medium text-sm transition-colors ${
            state.syncTab === 'import'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }">
            <span class="flex items-center justify-center gap-2">
              <i data-lucide="download" class="w-4 h-4"></i> Importuj (Wczytaj)
            </span>
          </button>
        </div>
        ${
          state.syncTab === 'export'
            ? `
              <p class="text-sm text-gray-600 dark:text-slate-400 mb-3">Skopiuj ten kod i wklej go na innym urządzeniu, aby przenieść swój postęp.</p>
              <div class="relative">
                <textarea readonly class="w-full h-32 p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs font-mono text-gray-600 dark:text-slate-300 resize-none focus:outline-none">${exportCode}</textarea>
                <button data-action="copy-sync" class="absolute bottom-2 right-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all">
                  <i data-lucide="copy" class="w-4 h-4"></i>
                  <span data-copy-indicator>Kopiuj</span>
                </button>
              </div>
            `
            : `
              <p class="text-sm text-gray-600 dark:text-slate-400 mb-3">Wklej kod wygenerowany na innym urządzeniu.<br/><span class="text-red-500 dark:text-red-400 text-xs font-bold">Uwaga: To nadpisze obecny postęp na tym urządzeniu!</span></p>
              <textarea id="import-code" placeholder="Wklej kod tutaj..." class="w-full h-32 p-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-xs font-mono text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary focus:border-primary outline-none mb-4">${state.importCode}</textarea>
              <div class="flex gap-2 mb-3">
                <button data-action="preview-sync" class="flex-1 bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Podgląd danych</button>
                <button data-action="import-sync" ${state.syncPreview ? '' : 'disabled'} class="flex-1 bg-primary hover:bg-sky-600 text-white py-2 rounded-lg text-sm font-semibold shadow-md transition-colors disabled:opacity-50">
                  Załaduj dane
                </button>
              </div>
              <div class="text-xs text-gray-500 dark:text-slate-400 mb-3">
                ${
                  state.syncPreview
                    ? `Start: <strong>${state.syncPreview.startDate}</strong> • Ukończone dni: <strong>${state.syncPreview.completedCount}</strong> • Rekord deski: <strong>${state.syncPreview.plankRecord}s</strong>`
                    : 'Brak podglądu — kliknij „Podgląd danych”.'
                }
              </div>
              <p id="import-error" class="text-red-500 dark:text-red-400 text-xs mb-4"></p>
            `
        }
      </div>
    </div>
  `;
};

const renderSettingsModal = () => `
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" data-action="close-settings">
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-3xl w-full shadow-2xl relative border border-gray-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto" data-stop-prop>
      <button data-action="close-settings" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
      <h3 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Ustawienia</h3>
      <div class="flex border-b border-gray-200 dark:border-slate-800 mb-6">
        <button data-action="settings-tab" data-tab="program" class="flex-1 pb-3 font-medium text-sm transition-colors ${
          state.settingsTab === 'program'
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }">Program</button>
        <button data-action="settings-tab" data-tab="notifications" class="flex-1 pb-3 font-medium text-sm transition-colors ${
          state.settingsTab === 'notifications'
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }">Powiadomienia</button>
      </div>

      ${
        state.settingsTab === 'program'
          ? `
        <div class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label class="text-sm text-gray-600 dark:text-slate-300">
              Dni treningowe w cyklu
              <input data-setting="trainingDays" type="number" min="1" max="6" value="${state.settings.trainingDays}" class="mt-2 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"/>
            </label>
            <label class="text-sm text-gray-600 dark:text-slate-300">
              Dni regeneracji w cyklu
              <input data-setting="restDays" type="number" min="1" max="3" value="${state.settings.restDays}" class="mt-2 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"/>
            </label>
            <label class="text-sm text-gray-600 dark:text-slate-300 flex items-center gap-2">
              <input data-setting="autoRestTimer" type="checkbox" ${state.settings.autoRestTimer ? 'checked' : ''} class="accent-primary"/>
              Automatyczny timer przerwy
            </label>
          </div>

          <div class="space-y-4">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white">Tygodniowe reguły</h4>
            ${[1, 2, 3, 4]
              .map((week) => {
                const rule = getWeeklyRule(week);
                return `
                  <div class="border border-gray-100 dark:border-slate-800 rounded-xl p-4">
                    <h5 class="font-semibold text-gray-800 dark:text-white mb-3">Tydzień ${week}</h5>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <label class="text-xs text-gray-500 dark:text-slate-400">
                        Serie
                        <input data-week="${week}" data-field="sets" type="number" min="1" max="6" value="${rule.sets}" class="mt-1 w-full px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"/>
                      </label>
                      <label class="text-xs text-gray-500 dark:text-slate-400">
                        Przerwa (sek)
                        <input data-week="${week}" data-field="restTimeSec" type="number" min="30" max="300" value="${rule.restTimeSec}" class="mt-1 w-full px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"/>
                      </label>
                      <label class="text-xs text-gray-500 dark:text-slate-400">
                        Powtórzenia
                        <input data-week="${week}" data-field="repsLabel" type="text" value="${rule.repsLabel}" class="mt-1 w-full px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"/>
                      </label>
                      <label class="text-xs text-gray-500 dark:text-slate-400">
                        Plank
                        <input data-week="${week}" data-field="plankLabel" type="text" value="${rule.plankLabel}" class="mt-1 w-full px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"/>
                      </label>
                      <label class="text-xs text-gray-500 dark:text-slate-400 sm:col-span-2">
                        Instrukcja
                        <input data-week="${week}" data-field="specialInstruction" type="text" value="${rule.specialInstruction}" class="mt-1 w-full px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"/>
                      </label>
                    </div>
                  </div>
                `;
              })
              .join('')}
          </div>
          <div class="flex justify-end">
            <button data-action="reset-settings" class="text-sm text-red-500 hover:text-red-600">Resetuj ustawienia</button>
          </div>
        </div>
      `
          : `
        <div class="space-y-4">
          <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
            <input data-setting="notifications.enabled" type="checkbox" ${
              state.settings.notifications.enabled ? 'checked' : ''
            } class="accent-primary"/>
            Włącz przypomnienia
          </label>
          <label class="text-sm text-gray-600 dark:text-slate-300">
            Godzina przypomnienia
            <input data-setting="notifications.time" type="time" value="${state.settings.notifications.time}" class="mt-2 w-full max-w-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"/>
          </label>
          <p class="text-xs text-gray-500 dark:text-slate-400">
            Aplikacja poprosi o zgodę na powiadomienia. Przypomnienia są realizowane lokalnie.
          </p>
        </div>
      `
      }
    </div>
  </div>
`;

const renderAchievementsModal = () => {
  const earnedCount = state.earnedBadges.length;
  const totalBadges = BADGES.length;
  const progressPercent = Math.round((earnedCount / totalBadges) * 100);

  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" data-action="close-achievements">
      <div class="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl relative border border-gray-100 dark:border-slate-800 flex flex-col max-h-[90vh]" data-stop-prop>
        <div class="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50 rounded-t-2xl">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <i data-lucide="trophy" class="text-yellow-500 w-6 h-6"></i> Sala Chwały
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Twój rekord deski: <span class="text-emerald-500 font-bold">${state.plankRecord}s</span></p>
          </div>
          <button data-action="close-achievements" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>
        <div class="px-6 pt-4">
          <div class="flex justify-between text-xs font-bold text-gray-500 mb-1">
            <span>POSTĘP ODZNAK</span>
            <span>${earnedCount}/${totalBadges}</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div class="bg-yellow-500 h-full rounded-full transition-all duration-1000" style="width: ${progressPercent}%"></div>
          </div>
        </div>
        <div class="p-6 overflow-y-auto">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            ${BADGES.map((badge) => {
              const isUnlocked = state.earnedBadges.includes(badge.id);
              return `
                <div class="relative p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-800/50 border-gray-200 dark:border-slate-700 shadow-md transform hover:-translate-y-1'
                    : 'bg-gray-50 dark:bg-slate-900 border-dashed border-gray-200 dark:border-slate-800 opacity-60'
                }">
                  <div class="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-inner ${
                    isUnlocked
                      ? `${badge.color} text-white`
                      : 'bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-600'
                  }">
                    ${
                      isUnlocked
                        ? `<i data-lucide="${badge.icon}" class="w-6 h-6"></i>`
                        : '<i data-lucide="lock" class="w-5 h-5"></i>'
                    }
                  </div>
                  <h4 class="font-bold text-sm mb-1 ${
                    isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'
                  }">${badge.title}</h4>
                  <p class="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">${badge.description}</p>
                  ${
                    isUnlocked
                      ? '<div class="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 shadow-sm animate-pulse"></div>'
                      : ''
                  }
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
};

const renderRestTimerOverlay = () => `
  <div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md text-white p-6 animate-in fade-in duration-300">
    <button data-action="close-rest" class="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
      <i data-lucide="x" class="w-6 h-6"></i>
    </button>
    <div class="mb-8 text-center">
      <h2 class="text-3xl font-bold mb-2 flex items-center gap-3 justify-center">
        <i data-lucide="timer" class="text-primary animate-pulse w-8 h-8"></i>
        Przerwa
      </h2>
      <p class="text-white/60">Odpocznij przed kolejną serią</p>
    </div>
    <div class="relative w-64 h-64 flex items-center justify-center mb-12">
      <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="6" class="text-slate-800"></circle>
        <circle data-rest-ring cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="6" class="text-primary transition-all duration-1000 ease-linear timer-ring" stroke-linecap="round"></circle>
      </svg>
      <div class="text-6xl font-mono font-bold tracking-tighter" data-rest-time>${formatTime(
        state.restTimeLeft
      )}</div>
    </div>
    <div class="flex gap-4 w-full max-w-sm">
      <button data-action="add-rest" class="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold transition-all active:scale-95">
        <i data-lucide="plus" class="w-5 h-5"></i>
        +30s
      </button>
      <button data-action="close-rest" class="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-slate-900 hover:bg-gray-100 font-bold transition-all active:scale-95">
        <i data-lucide="skip-forward" class="w-5 h-5"></i>
        Pomiń
      </button>
    </div>
  </div>
`;

const renderToast = () => `
  <div data-toast class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3">
    <i data-lucide="trophy" class="text-yellow-400 w-5 h-5"></i>
    <div>
      <p class="text-xs font-bold uppercase text-yellow-500">Nowa odznaka!</p>
      <p class="font-bold">${state.showNewBadgeToast}</p>
    </div>
  </div>
`;

root.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  if (action.startsWith('close-') && !target.closest('[data-stop-prop]')) {
    if (event.target.closest('[data-stop-prop]')) {
      return;
    }
  }

  switch (action) {
    case 'toggle-theme':
      state.darkMode = !state.darkMode;
      applyTheme();
      render();
      break;
    case 'open-sync':
      state.isSyncModalOpen = true;
      state.syncPreview = null;
      state.importCode = '';
      render();
      break;
    case 'open-settings':
      state.isSettingsOpen = true;
      render();
      break;
    case 'close-sync':
      state.isSyncModalOpen = false;
      state.syncPreview = null;
      state.importCode = '';
      render();
      break;
    case 'close-settings':
      state.isSettingsOpen = false;
      render();
      break;
    case 'settings-tab':
      state.settingsTab = target.dataset.tab;
      render();
      break;
    case 'sync-tab':
      state.syncTab = target.dataset.tab;
      render();
      break;
    case 'copy-sync':
      handleCopy();
      break;
    case 'preview-sync':
      handlePreview();
      break;
    case 'import-sync':
      handleImport();
      break;
    case 'open-achievements':
      openAchievements();
      break;
    case 'close-achievements':
      state.isAchievementsOpen = false;
      render();
      break;
    case 'reset-program':
      resetProgram();
      break;
    case 'select-day':
      if (target.classList.contains('cursor-not-allowed')) return;
      handleDaySelect(Number(target.dataset.dayIndex));
      break;
    case 'back-to-calendar':
      state.view = 'calendar';
      render();
      break;
    case 'open-info':
      state.infoExerciseId = target.dataset.exerciseId;
      render();
      break;
    case 'close-info':
      state.infoExerciseId = null;
      render();
      break;
    case 'toggle-set':
      toggleSet(
        Number(target.dataset.exerciseIndex),
        target.dataset.exerciseId,
        Number(target.dataset.setIndex)
      );
      break;
    case 'complete-all':
      completeAllSets(target.dataset.exerciseId, Number(target.dataset.sets));
      break;
    case 'toggle-skip':
      {
        const exerciseId = target.dataset.exerciseId;
        if (isExerciseSkipped(exerciseId)) {
          state.skippedExercises = state.skippedExercises.filter((id) => id !== exerciseId);
        } else {
          state.skippedExercises = [...state.skippedExercises, exerciseId];
        }
        render();
      }
      break;
    case 'finish-workout':
      finishWorkout();
      break;
    case 'close-rest':
      closeRestTimer();
      break;
    case 'add-rest':
      state.restTimeLeft += 30;
      updateRestTimerUI();
      break;
    case 'reset-settings':
      state.settings = {
        trainingDays: 3,
        restDays: 1,
        autoRestTimer: true,
        weeklyOverrides: {},
        notifications: {
          enabled: false,
          time: '18:00'
        }
      };
      saveSettings();
      scheduleReminders();
      if (state.startDate) {
        state.schedule = generateSchedule(state.startDate, state.completedDays, state.settings);
      }
      render();
      break;
    case 'plank-start':
      if (state.plankTimer.running) {
        pausePlankTimer();
      } else {
        startPlankCountdown();
      }
      break;
    case 'plank-reset':
      resetPlankTimer();
      break;
    default:
      break;
  }
});

root.addEventListener('change', (event) => {
  const target = event.target;
  if (target.matches('[data-action="start-program"]')) {
    handleStartProgram(target.value);
  }
  if (target.matches('[data-action="set-override"]')) {
    const exerciseId = target.dataset.exerciseId;
    const newSets = Number(target.value);
    state.exerciseOverrides[exerciseId] = { sets: newSets };
    const prev = state.currentProgress[exerciseId] || [];
    if (prev.length < newSets) {
      state.currentProgress[exerciseId] = [...prev, ...new Array(newSets - prev.length).fill(false)];
    } else {
      state.currentProgress[exerciseId] = prev.slice(0, newSets);
    }
    render();
  }
  if (target.matches('[data-setting]')) {
    const key = target.dataset.setting;
    if (key === 'autoRestTimer') {
      state.settings.autoRestTimer = target.checked;
    } else if (key === 'notifications.enabled') {
      state.settings.notifications.enabled = target.checked;
    } else if (key === 'notifications.time') {
      state.settings.notifications.time = target.value;
    } else if (key === 'trainingDays') {
      state.settings.trainingDays = Number(target.value);
    } else if (key === 'restDays') {
      state.settings.restDays = Number(target.value);
    }
    saveSettings();
    if (state.startDate) {
      state.schedule = generateSchedule(state.startDate, state.completedDays, state.settings);
    }
    scheduleReminders();
    render();
  }
  if (target.matches('[data-week]')) {
    const week = Number(target.dataset.week);
    const field = target.dataset.field;
    const value = target.value;
    state.settings.weeklyOverrides[week] = {
      ...(state.settings.weeklyOverrides[week] || {}),
      [field]: field === 'sets' || field === 'restTimeSec' ? Number(value) : value
    };
    saveSettings();
    render();
  }
});

root.addEventListener('input', (event) => {
  const target = event.target;
  if (target.matches('[data-action="plank-target"]')) {
    state.plankTimer.target = Number(target.value);
    updatePlankTimerUI();
  }
  if (target.id === 'import-code') {
    state.importCode = target.value;
    state.syncPreview = null;
  }
});

root.addEventListener('ended', (event) => {
  const target = event.target;
  if (target.matches('[data-action="video-ended"]')) {
    const id = target.dataset.exerciseId;
    const exercise = EXERCISES.find((ex) => ex.id === id);
    if (!exercise || exercise.videoUrls.length <= 1) return;
    const currentIndex = state.exerciseVideoIndex[id] || 0;
    const nextIndex = (currentIndex + 1) % exercise.videoUrls.length;
    state.exerciseVideoIndex[id] = nextIndex;
    render();
  }
}, true);

init();

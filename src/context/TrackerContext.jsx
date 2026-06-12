// src/context/TrackerContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_PROBLEMS } from '../data/sheetData';
import { 
  auth, 
  getDocRef, 
  getDocData, 
  setDocData, 
  logInUser, 
  registerUser, 
  logOutUser, 
  loginWithGoogle 
} from '../firebase';

const TrackerContext = createContext();

export const useTracker = () => useContext(TrackerContext);

// Utility to get date string in YYYY-MM-DD
const getDateString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const getOffsetDateString = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return getDateString(d);
};

// Generates the default mock history (Days 1-10 solved)
const getInitialMockData = () => {
  const progress = {};
  const notes = {};
  const spacedRepetition = {};
  const starred = [];

  for (let day = 1; day <= 10; day++) {
    const dateSolved = getOffsetDateString(-(11 - day)); // Day 1 solved 10 days ago, Day 10 solved 1 day ago
    const dayProbs = ALL_PROBLEMS.filter(p => p.day === day);
    dayProbs.forEach((p, idx) => {
      progress[p.id] = {
        status: 'Solved',
        timeSpent: 900 + idx * 300,
        confidence: 4 + (idx % 2),
        failureReason: null,
        dateSolved: dateSolved
      };
      notes[p.id] = {
        text: `Day ${day} problem completed successfully. Focused on runtime optimization and edge cases.`,
        memos: [],
        photos: []
      };
      spacedRepetition[p.id] = {
        problemId: p.id,
        interval: 3,
        nextDue: getOffsetDateString(-(11 - day) + 3),
        history: [{ date: dateSolved, action: 'solved' }]
      };
    });
  }

  return { progress, notes, spacedRepetition, starred };
};

export const TrackerProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [progress, setProgress] = useState({});
  const [starred, setStarred] = useState([]);
  const [notes, setNotes] = useState({});
  const [spacedRepetition, setSpacedRepetition] = useState({});
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(10); // default mock longest streak
  const [heatmap, setHeatmap] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentDay, setCurrentDay] = useState(1);
  const [currentProblemId, setCurrentProblemId] = useState(null);

  // Load guest data as local fallback
  const loadGuestData = () => {
    const storedProgress = localStorage.getItem('dsa_tracker_v3_progress');
    const storedStarred = localStorage.getItem('dsa_tracker_v3_starred');
    const storedNotes = localStorage.getItem('dsa_tracker_v3_notes');
    const storedSR = localStorage.getItem('dsa_tracker_v3_sr');

    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
      setStarred(JSON.parse(storedStarred || '[]'));
      setNotes(JSON.parse(storedNotes || '{}'));
      setSpacedRepetition(JSON.parse(storedSR || '{}'));
    } else {
      const mock = getInitialMockData();
      setProgress(mock.progress);
      setStarred(mock.starred);
      setNotes(mock.notes);
      setSpacedRepetition(mock.spacedRepetition);

      // Save defaults
      localStorage.setItem('dsa_tracker_v3_progress', JSON.stringify(mock.progress));
      localStorage.setItem('dsa_tracker_v3_starred', JSON.stringify(mock.starred));
      localStorage.setItem('dsa_tracker_v3_notes', JSON.stringify(mock.notes));
      localStorage.setItem('dsa_tracker_v3_sr', JSON.stringify(mock.spacedRepetition));
    }
  };

  // Auth observer
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setAuthLoading(true);
      if (currentUser) {
        setUser(currentUser);
        // Fetch remote data
        const docRef = getDocRef('users', currentUser.uid);
        try {
          const docSnap = await getDocData(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setProgress(userData.progress || {});
            setStarred(userData.starred || []);
            setNotes(userData.notes || {});
            setSpacedRepetition(userData.spacedRepetition || {});
            setLongestStreak(userData.longestStreak || 10);
          } else {
            // New user registration: initialize remote DB with default pre-loaded Days 1-10 solves
            const mock = getInitialMockData();
            setProgress(mock.progress);
            setStarred(mock.starred);
            setNotes(mock.notes);
            setSpacedRepetition(mock.spacedRepetition);
            setLongestStreak(10);
            
            await setDocData(docRef, {
              progress: mock.progress,
              starred: mock.starred,
              notes: mock.notes,
              spacedRepetition: mock.spacedRepetition,
              longestStreak: 10
            });
          }
        } catch (err) {
          console.error("Error fetching user data from database:", err);
          loadGuestData();
        }
      } else {
        setUser(null);
        loadGuestData();
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync state changes to LocalStorage & Firestore (only if logged in)
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem('dsa_tracker_v3_progress', JSON.stringify(progress));
      if (user) {
        setDocData(getDocRef('users', user.uid), { progress }, { merge: true });
      }
    }
  }, [progress, user]);

  useEffect(() => {
    localStorage.setItem('dsa_tracker_v3_starred', JSON.stringify(starred));
    if (user) {
      setDocData(getDocRef('users', user.uid), { starred }, { merge: true });
    }
  }, [starred, user]);

  useEffect(() => {
    if (Object.keys(notes).length > 0) {
      localStorage.setItem('dsa_tracker_v3_notes', JSON.stringify(notes));
      if (user) {
        setDocData(getDocRef('users', user.uid), { notes }, { merge: true });
      }
    }
  }, [notes, user]);

  useEffect(() => {
    if (Object.keys(spacedRepetition).length > 0) {
      localStorage.setItem('dsa_tracker_v3_sr', JSON.stringify(spacedRepetition));
      if (user) {
        setDocData(getDocRef('users', user.uid), { spacedRepetition }, { merge: true });
      }
    }
  }, [spacedRepetition, user]);

  // Compute stats on progress changes
  useEffect(() => {
    // 1. Calculate Heatmap & Streak
    const solvedDates = {};
    Object.values(progress).forEach(p => {
      if (p.status === 'Solved' && p.dateSolved) {
        solvedDates[p.dateSolved] = (solvedDates[p.dateSolved] || 0) + 1;
      }
    });
    setHeatmap(solvedDates);

    // Calculate daily streak
    const datesArr = Object.keys(solvedDates).sort((a, b) => new Date(b) - new Date(a));
    let currentStreak = 0;
    let checkDate = new Date();
    
    const todayStr = getDateString(checkDate);
    const yesterdayStr = getOffsetDateString(-1);
    
    if (solvedDates[todayStr] || solvedDates[yesterdayStr]) {
      let cursor = solvedDates[todayStr] ? checkDate : new Date(Date.now() - 86400000);
      while (true) {
        const cursorStr = getDateString(cursor);
        if (solvedDates[cursorStr]) {
          currentStreak++;
          cursor.setDate(cursor.getDate() - 1);
        } else {
          break;
        }
      }
    }
    setStreak(currentStreak);

    // Sync longest streak
    if (currentStreak > longestStreak) {
      setLongestStreak(currentStreak);
      if (user) {
        setDocData(getDocRef('users', user.uid), { longestStreak: currentStreak }, { merge: true });
      }
    }
  }, [progress, longestStreak, user]);

  // Actions
  const updateProblemStatus = (problemId, status, updates = {}) => {
    setProgress(prev => {
      const current = prev[problemId] || { status: 'Not Started', timeSpent: 0, confidence: 0, failureReason: null, dateSolved: null };
      const updated = {
        ...current,
        status,
        ...updates
      };
      
      if (status === 'Solved' && !current.dateSolved) {
        updated.dateSolved = getDateString(new Date());
        
        setSpacedRepetition(prevSR => ({
          ...prevSR,
          [problemId]: {
            problemId,
            interval: 3,
            nextDue: getOffsetDateString(3),
            history: [{ date: getDateString(new Date()), action: 'solved' }]
          }
        }));
      } else if (status !== 'Solved') {
        updated.dateSolved = null;
        setSpacedRepetition(prevSR => {
          const newSR = { ...prevSR };
          delete newSR[problemId];
          return newSR;
        });
      }

      return {
        ...prev,
        [problemId]: updated
      };
    });
  };

  const toggleStarProblem = (problemId) => {
    setStarred(prev => {
      if (prev.includes(problemId)) {
        return prev.filter(id => id !== problemId);
      } else {
        return [...prev, problemId];
      }
    });
  };

  const updateNotes = (problemId, textUpdates = {}, audioUpdates = null, photoUpdates = null) => {
    setNotes(prev => {
      const current = prev[problemId] || { text: '', memos: [], photos: [] };
      const updated = { ...current };

      if (textUpdates.hasOwnProperty('text')) {
        updated.text = textUpdates.text;
      }
      
      if (audioUpdates) {
        updated.memos = [...current.memos, audioUpdates];
      }

      if (photoUpdates) {
        updated.photos = [...current.photos, photoUpdates];
      }

      return {
        ...prev,
        [problemId]: updated
      };
    });
  };

  const deleteMemo = (problemId, memoId) => {
    setNotes(prev => {
      const current = prev[problemId];
      if (!current) return prev;
      return {
        ...prev,
        [problemId]: {
          ...current,
          memos: current.memos.filter(m => m.id !== memoId)
        }
      };
    });
  };

  const deletePhoto = (problemId, photoIndex) => {
    setNotes(prev => {
      const current = prev[problemId];
      if (!current) return prev;
      return {
        ...prev,
        [problemId]: {
          ...current,
          photos: current.photos.filter((_, idx) => idx !== photoIndex)
        }
      };
    });
  };

  const submitActiveRecall = (problemId, score, passed) => {
    setSpacedRepetition(prev => {
      const current = prev[problemId];
      if (!current) return prev;

      let nextInterval = current.interval;
      if (passed) {
        if (current.interval === 3) nextInterval = 7;
        else if (current.interval === 7) nextInterval = 14;
        else if (current.interval === 14) nextInterval = 30;
      } else {
        nextInterval = 3;
        toggleStarProblem(problemId);
      }

      return {
        ...prev,
        [problemId]: {
          ...current,
          interval: nextInterval,
          nextDue: getOffsetDateString(nextInterval),
          history: [...current.history, { date: getDateString(new Date()), action: 'recall', score, passed }]
        }
      };
    });
  };

  const login = async (email, password) => {
    return logInUser(email, password);
  };

  const register = async (email, password) => {
    return registerUser(email, password);
  };

  const logout = async () => {
    return logOutUser();
  };

  const googleLogin = async () => {
    return loginWithGoogle();
  };

  const totalSolved = Object.values(progress).filter(p => p.status === 'Solved').length;

  return (
    <TrackerContext.Provider
      value={{
        user,
        authLoading,
        progress,
        starred,
        notes,
        spacedRepetition,
        streak,
        longestStreak,
        heatmap,
        activeTab,
        currentDay,
        currentProblemId,
        totalSolved,
        setActiveTab,
        setCurrentDay,
        setCurrentProblemId,
        updateProblemStatus,
        toggleStarProblem,
        updateNotes,
        deleteMemo,
        deletePhoto,
        submitActiveRecall,
        login,
        register,
        logout,
        googleLogin
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

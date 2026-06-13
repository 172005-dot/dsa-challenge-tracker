// src/components/DayDetail.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTracker } from '../context/TrackerContext';
import { SHEET_DAYS, ALL_PROBLEMS } from '../data/sheetData';
import { 
  Play, Pause, ArrowLeft, Clock, CheckCircle2, 
  ExternalLink, Star, ChevronDown, ChevronUp, Sparkles,
  HelpCircle, Eye, ShieldAlert, Flag, Trophy
} from 'lucide-react';
import Visualizer from './ProblemTabs/Visualizer';
import NotesTab from './ProblemTabs/NotesTab';
import PlaygroundTab from './ProblemTabs/PlaygroundTab';
import DailySummaryModal from './DailySummaryModal';

export default function DayDetail() {
  const { 
    progress, 
    updateProblemStatus, 
    starred, 
    toggleStarProblem, 
    currentDay, 
    setActiveTab 
  } = useTracker();

  const dayData = SHEET_DAYS.find(d => d.day === currentDay);
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Set default expanded problem to first unsolved, or first problem
  useEffect(() => {
    if (dayData) {
      const firstUnsolved = dayData.problems.find(p => progress[p.id]?.status !== 'Solved');
      setExpandedProblem(firstUnsolved ? firstUnsolved.id : dayData.problems[0].id);
    }
  }, [currentDay, dayData]);

  if (!dayData) {
    return (
      <div className="text-center py-12 text-slate-400">
        Day data not found. Return to <button onClick={() => setActiveTab('dashboard')} className="text-brandPurple underline">Dashboard</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 space-y-6">
      {/* Back to Dashboard Header */}
      <div className="flex items-center justify-between border-b border-slate-850 pb-4">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </button>

        <div className="flex items-center gap-4">
          {dayData.problems.every(p => progress[p.id]?.status === 'Solved') && (
            <button 
              onClick={() => setShowSummaryModal(true)}
              className="bg-gradient-to-r from-brandPurple to-brandPink text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs hover:scale-105 transition-all shadow-md shadow-brandPurple/15 flex items-center gap-1.5 animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5" /> Generate Summary
            </button>
          )}
          <div className="text-right">
            <span className="text-xs text-brandPurple font-semibold uppercase tracking-wider">Day {dayData.day}</span>
            <h2 className="text-xl font-bold text-slate-100 font-sans">{dayData.topic}</h2>
          </div>
        </div>
      </div>

      {/* Accordion of 3 Problems */}
      <div className="space-y-4">
        {dayData.problems.map((prob) => {
          const isExpanded = expandedProblem === prob.id;
          const probProgress = progress[prob.id] || { status: 'Not Started', timeSpent: 0, confidence: 0, failureReason: null };
          
          return (
            <div 
              key={prob.id} 
              className={`glass-panel rounded-2xl overflow-hidden border transition-all ${
                isExpanded 
                  ? 'border-slate-800 bg-slate-950/20' 
                  : 'border-slate-850/60 bg-slate-950/10 hover:border-slate-800'
              }`}
            >
              {/* Accordion Trigger Header */}
              <div 
                onClick={() => setExpandedProblem(isExpanded ? null : prob.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 max-w-[80%]">
                  {/* Status indicator */}
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    probProgress.status === 'Solved' 
                      ? 'bg-emerald-500 shadow-sm shadow-emerald-500/20' 
                      : probProgress.status === 'In Progress' 
                        ? 'bg-yellow-500 animate-pulse' 
                        : 'bg-slate-850 border border-slate-700'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-bold text-base text-slate-200 tracking-tight">{prob.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${
                        prob.difficulty === 'Easy' 
                          ? 'text-emerald-400 bg-emerald-950/30 border-emerald-900/30' 
                          : prob.difficulty === 'Medium' 
                            ? 'text-brandBlue bg-blue-950/30 border-blue-900/30' 
                            : 'text-brandPink bg-pink-950/30 border-pink-900/30'
                      }`}>
                        {prob.difficulty}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Est. Time: {prob.estTime} mins</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quick indicators */}
                  {probProgress.confidence > 0 && (
                    <div className="hidden sm:flex items-center gap-0.5 text-xs text-yellow-500">
                      {Array.from({ length: probProgress.confidence }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-500" />
                      ))}
                    </div>
                  )}
                  {starred.includes(prob.id) && (
                    <Flag className="w-4 h-4 text-brandPink fill-brandPink/10" />
                  )}
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </div>

              {/* Problem Work Area (when expanded) */}
              {isExpanded && (
                <div className="border-t border-slate-850 p-5 space-y-6">
                  <ProblemWorkspace 
                    problem={prob} 
                    progData={probProgress} 
                    isStarred={starred.includes(prob.id)}
                    onToggleStar={() => toggleStarProblem(prob.id)}
                    onUpdateStatus={(status, updates) => updateProblemStatus(prob.id, status, updates)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DailySummaryModal 
        isOpen={showSummaryModal} 
        onClose={() => setShowSummaryModal(false)} 
        dayNum={currentDay} 
      />
    </div>
  );
}

// Inner workspace component representing one problem's learning workflow
function ProblemWorkspace({ problem, progData, isStarred, onToggleStar, onUpdateStatus }) {
  const { progress } = useTracker();
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('intuition');
  
  // Timer States
  const [elapsedTime, setElapsedTime] = useState(progData.timeSpent || 0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef(null);

  // Solved Questionnaire states
  const [solvingRating, setSolvingRating] = useState(progData.confidence || 0);
  const [solvingFailure, setSolvingFailure] = useState(progData.failureReason || '');

  // Seen Before Detector
  const getSeenBefore = () => {
    const solvedIds = Object.entries(progress)
      .filter(([_, data]) => data.status === 'Solved')
      .map(([id]) => id);
    
    if (solvedIds.length === 0) return null;

    const similar = ALL_PROBLEMS.find(p => 
      p.id !== problem.id && 
      p.pattern === problem.pattern && 
      solvedIds.includes(p.id)
    );

    return similar ? { day: similar.day, index: similar.index, name: similar.name } : null;
  };
  const seenBefore = getSeenBefore();

  // Intuition state triggers
  const [eli5Mode, setEli5Mode] = useState(false);
  const [isPatternGuessed, setIsPatternGuessed] = useState(false);

  // Hint State triggers
  const [hintLevel, setHintLevel] = useState(0);

  // Interview Mode states
  const [interviewSeconds, setInterviewSeconds] = useState(1200); // 20 mins
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [interviewNotes, setInterviewNotes] = useState('');
  const interviewTimerRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  // Interview timer logic
  useEffect(() => {
    if (isInterviewActive && interviewSeconds > 0) {
      interviewTimerRef.current = setInterval(() => {
        setInterviewSeconds(prev => {
          if (prev <= 1) {
            setIsInterviewActive(false);
            clearInterval(interviewTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (interviewTimerRef.current) clearInterval(interviewTimerRef.current);
    }

    return () => {
      if (interviewTimerRef.current) clearInterval(interviewTimerRef.current);
    };
  }, [isInterviewActive, interviewSeconds]);

  // Sync elapsed time from storage
  useEffect(() => {
    setElapsedTime(progData.timeSpent || 0);
  }, [problem.id, progData.timeSpent]);

  // Handle Mark Solved
  const handleMarkSolved = () => {
    setIsTimerRunning(false);
    onUpdateStatus('Solved', {
      timeSpent: elapsedTime,
      confidence: solvingRating || 4, // default to 4 stars if not rated
      failureReason: solvingFailure || null
    });
  };

  // Handle Mark In Progress
  const handleMarkInProgress = () => {
    onUpdateStatus('In Progress', { timeSpent: elapsedTime });
  };

  const handleRatingChange = (stars) => {
    setSolvingRating(stars);
    if (progData.status === 'Solved') {
      onUpdateStatus('Solved', { confidence: stars });
    }
  };

  const handleFailureChange = (reason) => {
    setSolvingFailure(reason);
    if (progData.status === 'Solved') {
      onUpdateStatus('Solved', { failureReason: reason || null });
    }
  };

  const startInterviewMode = () => {
    setIsInterviewActive(true);
    setInterviewSeconds(1200); // reset 20 mins
    setInterviewNotes('');
  };

  const formatTimer = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between bg-slate-900/30 p-4 rounded-2xl border border-slate-850 gap-4">
        {/* Practice Links */}
        <div className="flex items-center gap-3">
          <a 
            href={problem.leetcode} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs bg-slate-950 border border-slate-850 hover:border-orange-500/40 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all"
          >
            Practice on LeetCode <ExternalLink className="w-3 h-3 text-orange-500" />
          </a>
          <a 
            href={problem.tuf} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs bg-slate-950 border border-slate-850 hover:border-brandPurple/40 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all"
          >
            Practice on TUF <ExternalLink className="w-3 h-3 text-brandPurple" />
          </a>
        </div>

        {/* Stopwatch & Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Stopwatch */}
          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-850 font-mono text-xs text-slate-300 select-none">
            <Clock className="w-4 h-4 text-brandPurple" />
            <span>{formatTimer(elapsedTime)}</span>
            <button 
              onClick={toggleTimer}
              className={`ml-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded transition-all ${
                isTimerRunning 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {isTimerRunning ? 'Stop' : 'Start'}
            </button>
          </div>

          {/* Quick status actions */}
          <div className="flex gap-2">
            {progData.status !== 'Solved' && (
              <>
                <button 
                  onClick={handleMarkInProgress}
                  className={`text-xs px-3.5 py-2 rounded-xl border transition-all ${
                    progData.status === 'In Progress'
                      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                      : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {progData.status === 'In Progress' ? 'In Progress' : 'Set Active'}
                </button>
                <button 
                  onClick={handleMarkSolved}
                  className="text-xs bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl shadow-md shadow-emerald-500/10 transition-all flex items-center gap-1"
                >
                  <CheckCircle2 className="w-4 h-4" /> Mark Solved
                </button>
              </>
            )}

            {progData.status === 'Solved' && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-900/30 px-3.5 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Solved
                <button 
                  onClick={() => onUpdateStatus('In Progress')}
                  className="text-[10px] underline ml-2 text-slate-500 hover:text-slate-350"
                >
                  Re-open
                </button>
              </div>
            )}

            {/* Revision Flag Button */}
            <button 
              onClick={onToggleStar}
              title={isStarred ? "Unflag revision" : "Flag for revision"}
              className={`p-2 rounded-xl border transition-all ${
                isStarred 
                  ? 'bg-brandPink/10 border-brandPink/35 text-brandPink' 
                  : 'bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-300'
              }`}
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Solved Form details (Visible after solving or when solved) */}
      {progData.status === 'Solved' && (
        <div className="glass-panel p-5 rounded-2xl border border-emerald-950/30 bg-emerald-950/5 space-y-4">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-emerald-400" /> Solve Questionnaire
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Star Rating */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-medium">How confident do you feel about this solution?</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className="p-1 rounded hover:bg-slate-900 transition-all"
                  >
                    <Star 
                      className={`w-6 h-6 ${
                        star <= solvingRating 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-slate-700'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500">
                {solvingRating <= 2 && solvingRating > 0 && "⚠️ Automatically added to spaced repetition queue."}
              </p>
            </div>

            {/* Failure Reason */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-medium">Did you hit any roadblocks/struggles?</label>
              <select 
                value={solvingFailure}
                onChange={(e) => handleFailureChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 text-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-brandPurple transition-all"
              >
                <option value="">No struggles - Cleared smoothly</option>
                <option value="Wrong Approach">Wrong Approach initially</option>
                <option value="Wrong Edge Case">Failed on tricky edge cases</option>
                <option value="Wrong Syntax">Struggled with language syntax</option>
                <option value="Time Limit Exceeded">TLE (Time Limit Exceeded) errors</option>
                <option value="Couldn't Start">Couldn't begin without hints</option>
              </select>
            </div>
          </div>

          {/* Seen Before Pattern Detector Notice */}
          {seenBefore && (
            <div className="mt-2 bg-brandPurple/10 border border-brandPurple/20 rounded-xl p-3 flex items-center gap-2.5 text-xs text-brandPurple">
              <Sparkles className="w-4 h-4 text-brandPurple animate-pulse" />
              <span>
                💡 **Pattern Recall**: You previously solved a similar problem using this pattern: **Day {seenBefore.day} Problem {seenBefore.index}: {seenBefore.name}**. Try utilizing similar pointer or structure logic!
              </span>
            </div>
          )}
        </div>
      )}

      {/* 7-Tab Layout Container */}
      <div className="space-y-4">
        {/* Workspace Tab triggers */}
        <div className="flex flex-wrap gap-1 border-b border-slate-850 pb-2">
          {['intuition', 'hints', 'brute', 'optimal', 'playground', 'notes', 'interview'].map((tab) => {
            const labels = {
              intuition: '1. Intuition',
              hints: '2. Hints',
              brute: '3. Brute Force',
              optimal: '4. Optimal',
              playground: '5. Playground',
              notes: '6. My Notes',
              interview: '7. Interview Mode'
            };
            const isTabActive = activeWorkspaceTab === tab;
            const isLocked = isInterviewActive && tab !== 'interview';
            return (
              <button
                key={tab}
                disabled={isLocked}
                onClick={() => setActiveWorkspaceTab(tab)}
                className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition-all ${
                  isTabActive 
                    ? 'bg-slate-900 border border-slate-800 text-brandPurple shadow-sm' 
                    : isLocked
                      ? 'text-slate-700 cursor-not-allowed opacity-30'
                      : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* Tab content renders */}
        <div className="pt-2">
          {/* TAB 1 — INTUITION */}
          {activeWorkspaceTab === 'intuition' && (
            <div className="space-y-6">
              {/* Intuition Header with ELI5 toggle */}
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-350 uppercase tracking-wider">Algorithm Intuition</h4>
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-850 gap-1 text-xs">
                  <button 
                    onClick={() => setEli5Mode(false)}
                    className={`px-3 py-1 rounded-lg ${!eli5Mode ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400'}`}
                  >
                    Technical
                  </button>
                  <button 
                    onClick={() => setEli5Mode(true)}
                    className={`px-3 py-1 rounded-lg ${eli5Mode ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400'}`}
                  >
                    ELI5 Analogy
                  </button>
                </div>
              </div>

              {/* Text Explanation Panel */}
              <div className="bg-slate-950/40 border border-slate-850/80 p-5 rounded-2xl text-slate-300 leading-relaxed text-sm">
                {eli5Mode ? (
                  <p>{problem.eli5}</p>
                ) : (
                  <p>{problem.intuition}</p>
                )}
              </div>

              {/* Pattern Guessing Challenge */}
              <div className="glass-panel p-5 rounded-2xl border border-slate-850 space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pattern Recognition Challenge</h4>
                <p className="text-xs text-slate-400">Can you identify what core structural template this problem belongs to before checking?</p>
                
                {isPatternGuessed ? (
                  <div className="bg-brandPurple/10 border border-brandPurple/25 rounded-xl p-3.5 text-sm font-semibold text-brandPurple animate-fade-in">
                    🎯 Pattern Revealed: {problem.pattern}
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-xl bg-slate-950 border border-slate-850 p-4 flex flex-col items-center justify-center min-h-[90px]">
                    {/* Blurry text overlay */}
                    <span className="blur-md text-xl font-bold select-none text-slate-700">SLIDING WINDOW / TWOPTR RANGE</span>
                    <button 
                      onClick={() => setIsPatternGuessed(true)}
                      className="absolute bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs text-slate-300 font-bold px-4 py-2 rounded-xl transition-all"
                    >
                      Guess and Reveal Pattern
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2 — HINT SYSTEM */}
          {activeWorkspaceTab === 'hints' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-850 pb-2 flex-wrap gap-2">
                <div>
                  <h4 className="text-sm font-semibold text-slate-350 uppercase tracking-wider">Progressive Hint System</h4>
                  <p className="text-[11px] text-slate-500">Reveal clues incrementally to guide your path before looking at solutions.</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md border border-brandPurple/30 bg-brandPurple/10 text-brandPurple font-semibold">
                  Pattern: {problem.pattern}
                </span>
              </div>

              <div className="space-y-4 pt-2">
                {problem.hints.map((hint, idx) => {
                  const isRevealed = hintLevel >= idx + 1;
                  return (
                    <div 
                      key={idx}
                      className={`border rounded-2xl p-4 transition-all ${
                        isRevealed 
                          ? 'border-slate-850 bg-slate-950/40 text-slate-350' 
                          : 'border-slate-900 bg-slate-950/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-brandPurple uppercase">Clue {idx + 1} {idx === 0 ? "(Vague)" : idx === 1 ? "(Specific)" : "(Almost Solution)"}</span>
                        {!isRevealed && (
                          <button 
                            onClick={() => setHintLevel(idx + 1)}
                            className="text-[10px] text-brandPurple bg-brandPurple/10 border border-brandPurple/20 hover:bg-brandPurple/20 px-2.5 py-1 rounded-lg font-bold"
                          >
                            Reveal Hint
                          </button>
                        )}
                      </div>
                      {isRevealed ? (
                        <p className="text-sm leading-relaxed animate-fade-in">{hint}</p>
                      ) : (
                        <p className="text-xs text-slate-600 italic">Content hidden. Tap reveal to unlock.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3 — BRUTE FORCE & TAB 4 — OPTIMAL APPROACH */}
          {(activeWorkspaceTab === 'brute' || activeWorkspaceTab === 'optimal') && (
            <div className="space-y-6">
              {/* Complexities and Title */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-850 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-200 capitalize">
                    {activeWorkspaceTab === 'brute' ? 'Brute Force Solution' : 'Optimal Solution'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {activeWorkspaceTab === 'brute' ? problem.brute.explain : problem.optimal.explain}
                  </p>
                </div>

                {/* Complexities */}
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2.5 py-1 rounded-md">
                    Time: {activeWorkspaceTab === 'brute' ? problem.brute.complexity.time : problem.optimal.complexity.time}
                  </span>
                  <span className="text-[10px] font-bold text-brandBlue bg-blue-950/40 border border-blue-900/30 px-2.5 py-1 rounded-md">
                    Space: {activeWorkspaceTab === 'brute' ? problem.brute.complexity.space : problem.optimal.complexity.space}
                  </span>
                </div>
              </div>

              {/* Step Visualizer */}
            <Visualizer problem={problem} />

              {/* Dry Run Table */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dry Run Log</label>
                <div className="overflow-x-auto border border-slate-850 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-slate-450 border-b border-slate-850">
                        <th className="p-3 font-semibold w-16">Step</th>
                        <th className="p-3 font-semibold">Action</th>
                        <th className="p-3 font-semibold">Pointers State</th>
                        <th className="p-3 font-semibold">Output/Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850/50">
                      {(activeWorkspaceTab === 'brute' ? problem.dryRunTable.slice(0, 3) : problem.dryRunTable).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-900/40 text-slate-300">
                          <td className="p-3 font-mono text-slate-500 font-bold">{row.step}</td>
                          <td className="p-3 font-medium">{row.action}</td>
                          <td className="p-3 font-mono text-slate-400">{row.state}</td>
                          <td className="p-3 text-emerald-400 font-semibold">{row.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Code blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Pseudocode */}
                <div className="flex flex-col bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden font-mono text-xs">
                  <div className="bg-slate-900 px-4 py-2 text-slate-400 font-semibold border-b border-slate-850">Pseudocode Template</div>
                  <pre className="p-4 text-slate-300 overflow-x-auto text-[12px] leading-5 font-mono h-64 overflow-y-auto">
                    {activeWorkspaceTab === 'brute' ? problem.brute.pseudocode : problem.optimal.pseudocode}
                  </pre>
                </div>

                {/* Java Implementation */}
                <div className="flex flex-col bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden font-mono text-xs relative">
                  <div className="bg-slate-900 px-4 py-2 text-slate-400 font-semibold border-b border-slate-850 flex justify-between items-center">
                    <span>Java Solution</span>
                    <button 
                      onClick={() => {
                        const code = activeWorkspaceTab === 'brute' ? problem.brute.code : problem.optimal.code;
                        navigator.clipboard.writeText(code);
                        alert("Java code copied!");
                      }}
                      className="text-[10px] text-brandPurple bg-brandPurple/10 border border-brandPurple/20 px-2 py-0.5 rounded font-bold hover:bg-brandPurple/20"
                    >
                      Copy Code
                    </button>
                  </div>
                  <pre className="p-4 text-slate-350 overflow-x-auto text-[12px] leading-5 font-mono h-64 overflow-y-auto">
                    {activeWorkspaceTab === 'brute' ? problem.brute.code : problem.optimal.code}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5 — CODE PLAYGROUND */}
          {activeWorkspaceTab === 'playground' && (
            <PlaygroundTab problemId={problem.id} optimalCode={problem.optimal.code} />
          )}

          {/* TAB 6 — MY NOTES */}
          {activeWorkspaceTab === 'notes' && (
            <NotesTab problemId={problem.id} />
          )}

          {/* TAB 7 — INTERVIEW MODE */}
          {activeWorkspaceTab === 'interview' && (
            <div className="space-y-6">
              {/* Interview Status Header */}
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Mock Interview Simulation</h4>
                  <p className="text-[10px] text-slate-500">Test yourself under real-world timing pressure. All helpers are locked.</p>
                </div>

                {isInterviewActive ? (
                  <div className="flex items-center gap-3 bg-rose-950/20 border border-rose-500/35 px-4 py-1.5 rounded-xl font-mono text-sm text-rose-400 select-none animate-pulse">
                    <span>⏳ {Math.floor(interviewSeconds / 60)}:{(interviewSeconds % 60).toString().padStart(2, '0')}</span>
                  </div>
                ) : (
                  <button 
                    onClick={startInterviewMode}
                    className="text-xs bg-brandPurple hover:bg-brandPurple-700 text-white font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    Start 20-Min Countdown
                  </button>
                )}
              </div>

              {isInterviewActive ? (
                /* Interview Active Panel */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  {/* Problem statement panel */}
                  <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
                    <span className="text-xs font-bold text-slate-500 uppercase">Problem Statement</span>
                    <h3 className="font-bold text-lg text-slate-200">{problem.name}</h3>
                    <p className="text-xs text-slate-450 leading-relaxed font-sans">
                      Implement the optimal solution for **{problem.name}** in Java. You should strive to achieve the best time complexity of **{problem.optimal.complexity.time}** and space complexity of **{problem.optimal.complexity.space}**.
                    </p>
                    <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850 text-slate-400 text-xs space-y-2.5">
                      <p>1. Formulate a brute force solution and outline its time/space complexity.</p>
                      <p>2. Optimize the solution using typical structures. Explain why your optimal approach is better.</p>
                      <p>3. Do a dry run of your optimal logic on a custom test case.</p>
                      <p className="text-rose-400 font-medium font-sans mt-2">🚨 Hints, intuition, code walkthroughs, and playground diff compare are locked until the timer expires or you end the interview.</p>
                    </div>
                  </div>

                  {/* Brainstorming notepad */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Interview Scratchpad</label>
                    <textarea
                      value={interviewNotes}
                      onChange={(e) => setInterviewNotes(e.target.value)}
                      placeholder="Type your approach descriptions, pointer traces, or pseudocode dry runs here..."
                      className="w-full h-64 bg-slate-950/60 border border-slate-850 rounded-2xl p-4 text-xs font-mono text-slate-300 outline-none resize-none focus:border-rose-500 transition-all leading-relaxed"
                    />
                    <div className="flex items-center justify-between pt-1">
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to end the interview and reveal the solutions?")) {
                            setIsInterviewActive(false);
                            setActiveWorkspaceTab('optimal');
                          }
                        }}
                        className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/35 hover:bg-rose-500/30 px-3.5 py-1.5 rounded-xl font-bold transition-all"
                      >
                        Reveal Solutions / End Interview
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm("Quit simulation? Your progress won't be revealed immediately.")) {
                            setIsInterviewActive(false);
                          }
                        }}
                        className="text-[10px] text-slate-500 hover:text-slate-350 hover:underline"
                      >
                        Quit Simulation
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Interview Locked panel */
                <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-850 rounded-2xl bg-slate-950/20 text-center space-y-4">
                  <ShieldAlert className="w-12 h-12 text-slate-600" />
                  <div>
                    <h5 className="font-bold text-slate-300 text-sm">Simulate Board Interview</h5>
                    <p className="text-xs text-slate-500 max-w-sm mt-1">
                      Hides all intuition statements, solution templates, and progressive hints. You must outline and solve the logic on a clean blank canvas.
                    </p>
                  </div>
                  <button 
                    onClick={startInterviewMode}
                    className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs text-slate-200 px-5 py-2.5 rounded-xl font-bold transition-all"
                  >
                    Start Practice Session
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

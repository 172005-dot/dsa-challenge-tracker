// src/components/ActiveRecall.jsx
import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { ALL_PROBLEMS } from '../data/sheetData';
import { 
  Award, Brain, RefreshCw, Calendar, CheckCircle, 
  AlertTriangle, ArrowRight, Play, BookOpen 
} from 'lucide-react';

export default function ActiveRecall() {
  const { spacedRepetition, submitActiveRecall, setActiveTab, setCurrentDay, setCurrentProblemId } = useTracker();
  
  const [selectedRecallId, setSelectedRecallId] = useState(null);
  const [recallText, setRecallText] = useState('');
  const [recallResult, setRecallResult] = useState(null); // { score, passed, keywordsMatched }

  const todayStr = new Date().toISOString().split('T')[0];

  // Map spaced repetition entries to full problems info
  const items = Object.values(spacedRepetition).map(item => {
    const prob = ALL_PROBLEMS.find(p => p.id === item.problemId);
    return { ...item, prob };
  }).filter(item => item.prob !== undefined);

  // Group items by due status
  const dueToday = items.filter(item => new Date(item.nextDue) <= new Date(todayStr));
  const upcoming = items.filter(item => new Date(item.nextDue) > new Date(todayStr))
    .sort((a, b) => new Date(a.nextDue) - new Date(b.nextDue));

  const activeRecallItem = dueToday.find(item => item.problemId === selectedRecallId) || dueToday[0];

  // Keywords dictionary by category to perform validation match
  const getKeywordsForProblem = (prob) => {
    const name = prob.name.toLowerCase();
    const cat = prob.category.toLowerCase();
    const keys = [];

    // General category keys
    if (cat.includes('binary search')) {
      keys.push('mid', 'left', 'right', 'low', 'high', 'divide', 'sorted');
    }
    if (cat.includes('heap') || cat.includes('priority')) {
      keys.push('heap', 'priority', 'min-heap', 'max-heap', 'priorityqueue', 'size');
    }
    if (cat.includes('stack') || cat.includes('queue')) {
      keys.push('stack', 'queue', 'pop', 'push', 'top', 'peek', 'monotonic');
    }
    if (cat.includes('graph')) {
      keys.push('graph', 'visited', 'queue', 'bfs', 'dfs', 'node', 'adjacency', 'recursion');
    }
    if (cat.includes('dynamic') || cat.includes('dp')) {
      keys.push('dp', 'memoization', 'tabulation', 'subproblem', 'state', 'array', 'transition');
    }
    if (cat.includes('linked list')) {
      keys.push('head', 'next', 'prev', 'pointer', 'reverse', 'node', 'slow', 'fast');
    }
    if (cat.includes('trie')) {
      keys.push('node', 'trie', 'prefix', 'insert', 'search', 'children', 'character');
    }

    // Problem-specific keys
    if (name.includes('rotated')) keys.push('pivot', 'rotated', 'range');
    if (name.includes('median')) keys.push('median', 'stream', 'partition');
    if (name.includes('lru')) keys.push('lru', 'cache', 'hashmap', 'doubly', 'evict');
    if (name.includes('anagram')) keys.push('anagram', 'frequency', 'count', 'characters');
    if (name.includes('tree')) keys.push('tree', 'root', 'left', 'right', 'height', 'traversal');
    if (name.includes('dijkstra')) keys.push('dijkstra', 'shortest', 'weight', 'relax');
    if (name.includes('subset')) keys.push('subset', 'sum', 'recursion', 'target');
    if (name.includes('queen')) keys.push('queen', 'backtracking', 'board', 'row', 'col');

    return [...new Set(keys)]; // unique keywords
  };

  const evaluateRecall = () => {
    if (!activeRecallItem || recallText.trim().length < 15) {
      alert("Please write a detailed explanation (at least 15 characters).");
      return;
    }

    const prob = activeRecallItem.prob;
    const keywords = getKeywordsForProblem(prob);
    const typedText = recallText.toLowerCase();

    // Check matched count
    const matched = keywords.filter(word => typedText.includes(word));
    
    // Calculate raw percentage
    let baseScore = keywords.length > 0 ? (matched.length / keywords.length) * 100 : 80;
    
    // Adjust based on text length (encourages detailed answers)
    const wordCount = recallText.split(/\s+/).filter(Boolean).length;
    let lengthBonus = 0;
    if (wordCount > 30) lengthBonus = 15;
    else if (wordCount > 15) lengthBonus = 5;

    let score = Math.round(baseScore + lengthBonus);
    if (score > 100) score = 100;
    
    const passed = score >= 60; // 60% threshold to pass recall

    // Save recall results
    setRecallResult({
      score,
      passed,
      keywordsMatched: matched
    });

    // Submit back to tracker context
    submitActiveRecall(prob.id, score, passed);
  };

  const closeRecallResult = () => {
    setRecallResult(null);
    setRecallText('');
    setSelectedRecallId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-850 pb-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Brain className="w-6 h-6 text-brandBlue" /> Active Recall Center
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Review solved problems at spaced intervals (3 days, 7 days, 14 days) to build long-term memory retention.
        </p>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Active due problems list */}
        <div className="lg:col-span-1 space-y-6">
          {/* Due Today Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-brandBlue uppercase tracking-wider">Due Today ({dueToday.length})</h3>
            
            {dueToday.length === 0 ? (
              <div className="bg-slate-950/20 border border-slate-850 rounded-2xl p-6 text-center text-slate-550 text-xs">
                🎉 No active recall due today!
              </div>
            ) : (
              <div className="space-y-3">
                {dueToday.map(item => {
                  const isSelected = selectedRecallId === item.problemId || (!selectedRecallId && dueToday[0].problemId === item.problemId);
                  return (
                    <div 
                      key={item.problemId}
                      onClick={() => {
                        setSelectedRecallId(item.problemId);
                        setRecallResult(null);
                        setRecallText('');
                      }}
                      className={`glass-panel p-4 rounded-xl cursor-pointer border transition-all ${
                        isSelected 
                          ? 'border-brandBlue bg-brandBlue/5' 
                          : 'border-slate-850 bg-slate-950/20 hover:border-slate-800'
                      }`}
                    >
                      <span className="text-[10px] text-brandBlue font-semibold uppercase">Day {item.prob.day}</span>
                      <h4 className="font-bold text-sm text-slate-200 mt-0.5 truncate">{item.prob.name}</h4>
                      <div className="flex justify-between items-center mt-2.5 text-[10px] text-slate-500 font-medium">
                        <span>Due: Today</span>
                        <span className="px-1.5 py-0.2 bg-slate-900 rounded border border-slate-850">
                          Int: {item.interval}d
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Schedule */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upcoming Reviews ({upcoming.length})</h3>
            
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
              {upcoming.length === 0 ? (
                <p className="text-[11px] text-slate-655 text-center py-4 font-medium">No reviews scheduled</p>
              ) : (
                upcoming.map(item => (
                  <div 
                    key={item.problemId}
                    className="flex justify-between items-center bg-slate-950/20 border border-slate-850/60 rounded-xl p-3 text-xs"
                  >
                    <div className="max-w-[70%]">
                      <h5 className="font-medium text-slate-300 truncate">{item.prob.name}</h5>
                      <span className="text-[9px] text-slate-500">Day {item.prob.day}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-850 flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3 text-slate-500" /> {item.nextDue}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right column: Workspace to type recall answer */}
        <div className="lg:col-span-2">
          {dueToday.length > 0 && activeRecallItem ? (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
              {recallResult === null ? (
                /* Interactive Recall Challenge Input */
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-brandBlue uppercase">Active recall challenge</span>
                      <h3 className="text-lg font-bold text-slate-200 mt-1">{activeRecallItem.prob.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">Topic: {activeRecallItem.prob.category} | Day: {activeRecallItem.prob.day}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setCurrentDay(activeRecallItem.prob.day);
                        setActiveTab('detail');
                      }}
                      className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 border border-slate-800 hover:bg-slate-900 px-2 py-1 rounded-lg"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> View Problem
                    </button>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl text-xs text-slate-400 space-y-2 leading-relaxed">
                    <h5 className="font-semibold text-slate-350">💡 Instruction:</h5>
                    <p>Without looking at the hints or optimal solution templates, describe the optimal algorithm in your own words.</p>
                    <p>Explain: **What is the core data structure used?**, **What are the pointer updates?**, and **What are the time/space complexities?**.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Explanation</label>
                    <textarea
                      value={recallText}
                      onChange={(e) => setRecallText(e.target.value)}
                      placeholder="Type your explanation here. Be as descriptive as possible (e.g. 'Use a min-heap to store elements...')"
                      className="w-full h-48 bg-slate-950 border border-slate-850 focus:border-brandBlue rounded-xl p-4 text-xs font-mono text-slate-300 outline-none resize-none focus:ring-0 leading-relaxed"
                    />
                  </div>

                  <button 
                    onClick={evaluateRecall}
                    className="w-full bg-brandBlue hover:bg-brandBlue-600 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-brandBlue/10 transition-all"
                  >
                    <Brain className="w-4 h-4 fill-slate-950" /> Verify Explanation
                  </button>
                </>
              ) : (
                /* Scoring & Evaluation Report */
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center space-y-2 pb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recall Result</span>
                    
                    {/* Score ring */}
                    <div className="flex items-center justify-center pt-2">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle
                            className="text-slate-800"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            cx="18"
                            cy="18"
                            r="15.915"
                          />
                          <circle
                            className={recallResult.passed ? "text-emerald-500" : "text-rose-500"}
                            strokeDasharray={`${recallResult.score}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            cx="18"
                            cy="18"
                            r="15.915"
                          />
                        </svg>
                        <span className="absolute text-2xl font-black font-sans">{recallResult.score}%</span>
                      </div>
                    </div>
                    
                    <h3 className={`text-base font-bold ${recallResult.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {recallResult.passed ? "Recall Success!" : "Recall Unsuccessful"}
                    </h3>
                  </div>

                  {/* Feedback description */}
                  <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl text-xs space-y-3.5 leading-relaxed text-slate-350">
                    {recallResult.passed ? (
                      <div className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <p>
                          Great job! Your answer matches key algorithm structures. The next review interval has been extended to **{activeRecallItem.interval === 3 ? 7 : activeRecallItem.interval === 7 ? 14 : 30} days**.
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                        <p>
                          The score did not meet the 60% threshold. The problem has been **flagged for revision** and rescheduled for review in **3 days**. Try revising the optimal approach block.
                        </p>
                      </div>
                    )}

                    <div className="border-t border-slate-850/60 pt-3">
                      <span className="font-semibold block text-slate-400 mb-1.5">Matched Keywords:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {recallResult.keywordsMatched.length === 0 ? (
                          <span className="text-slate-600 italic">None</span>
                        ) : (
                          recallResult.keywordsMatched.map((k, kIdx) => (
                            <span key={kIdx} className="bg-emerald-950/30 border border-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-semibold">
                              {k}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={closeRecallResult}
                    className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs text-slate-300 font-bold py-2.5 rounded-xl transition-all"
                  >
                    Proceed to Next Challenge
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-2xl border border-slate-850 text-center flex flex-col items-center justify-center space-y-4">
              <Brain className="w-12 h-12 text-slate-700" />
              <div>
                <h4 className="font-bold text-slate-300 text-sm">Active Recall Completed</h4>
                <p className="text-xs text-slate-550 max-w-sm mt-1">
                  You are all caught up on your spaced reviews for today!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// src/components/RevisionCenter.jsx
import React from 'react';
import { useTracker } from '../context/TrackerContext';
import { ALL_PROBLEMS } from '../data/sheetData';
import { Flag, Trash2, ArrowRight, PlayCircle, Star, Sparkles } from 'lucide-react';

export default function RevisionCenter() {
  const { starred, toggleStarProblem, setActiveTab, setCurrentDay, setCurrentProblemId, progress } = useTracker();

  // Find all flagged problems and map details
  const flaggedProblems = ALL_PROBLEMS.filter(p => starred.includes(p.id));

  // Group by day/topic
  const groupedFlagged = flaggedProblems.reduce((acc, curr) => {
    const dayKey = curr.day;
    if (!acc[dayKey]) {
      acc[dayKey] = {
        day: dayKey,
        topic: curr.topicName,
        problems: []
      };
    }
    acc[dayKey].problems.push(curr);
    return acc;
  }, {});

  const groupedList = Object.values(groupedFlagged).sort((a, b) => a.day - b.day);

  const launchProblem = (prob) => {
    setCurrentDay(prob.day);
    setCurrentProblemId(prob.id);
    setActiveTab('detail');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-850 pb-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Flag className="w-5 h-5 text-brandPink" /> Revision Center
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Review and re-attempt all flagged problems. Space repetition schedules are organized here.
        </p>
      </div>

      {flaggedProblems.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-slate-850 text-center flex flex-col items-center justify-center space-y-4">
          <Flag className="w-12 h-12 text-slate-700" />
          <div>
            <h4 className="font-bold text-slate-350 text-sm">Revision Queue Clean!</h4>
            <p className="text-xs text-slate-550 max-w-sm mt-1">
              No problems are currently flagged. When solving a problem, use the Flag button to add it here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary Alert */}
          <div className="bg-brandPink/10 border border-brandPink/25 rounded-2xl p-4 flex items-center gap-3 text-xs text-brandPink leading-relaxed">
            <Sparkles className="w-4 h-4 text-brandPink flex-shrink-0 animate-pulse" />
            <span>
              💡 **Study Tip**: When re-attempting problems, focus on coding the solution in the **Code Playground** from scratch. Try to decrease your solving time compared to your first attempt!
            </span>
          </div>

          {/* Grouped Lists */}
          <div className="space-y-6">
            {groupedList.map(group => (
              <div key={group.day} className="glass-panel rounded-2xl border border-slate-850 overflow-hidden">
                <div className="bg-slate-900/60 border-b border-slate-850 px-5 py-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-brandPink font-bold uppercase">Day {group.day}</span>
                    <h3 className="font-bold text-sm text-slate-200 mt-0.5">{group.topic}</h3>
                  </div>
                  <span className="text-[10px] bg-slate-950 border border-slate-850 px-2 py-0.5 rounded-lg text-slate-400 font-semibold">
                    {group.problems.length} {group.problems.length === 1 ? 'problem' : 'problems'}
                  </span>
                </div>

                <div className="p-4 divide-y divide-slate-850/40">
                  {group.problems.map(prob => {
                    const probProgress = progress[prob.id] || { status: 'Not Started', confidence: 0 };
                    let diffColor = 'text-emerald-400 bg-emerald-950/30';
                    if (prob.difficulty === 'Medium') diffColor = 'text-brandBlue bg-blue-950/30';
                    if (prob.difficulty === 'Hard') diffColor = 'text-brandPink bg-pink-950/30';

                    return (
                      <div 
                        key={prob.id} 
                        className="py-3 flex items-center justify-between hover:bg-slate-900/10 px-2 rounded-xl transition-all"
                      >
                        <div className="flex items-center gap-3 max-w-[70%]">
                          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                            probProgress.status === 'Solved' ? 'bg-emerald-500' : 'bg-yellow-500'
                          }`} />
                          <div className="truncate">
                            <h4 className="font-semibold text-sm text-slate-350 truncate">{prob.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-[9px] px-1.5 py-0.1 rounded font-bold ${diffColor}`}>
                                {prob.difficulty}
                              </span>
                              {probProgress.confidence > 0 && (
                                <div className="flex text-[9px] text-yellow-500 items-center">
                                  {Array.from({ length: probProgress.confidence }).map((_, i) => (
                                    <Star key={i} className="w-2.5 h-2.5 fill-yellow-500" />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleStarProblem(prob.id)}
                            title="Remove from revision"
                            className="p-2 text-slate-655 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => launchProblem(prob)}
                            className="text-[11px] bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-all group"
                          >
                            Practice <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

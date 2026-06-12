// src/components/MistakeJournal.jsx
import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { ALL_PROBLEMS } from '../data/sheetData';
import { BookOpen, Star, AlertCircle, ArrowRight, FileText, Mic, Image as ImageIcon } from 'lucide-react';

export default function MistakeJournal() {
  const { progress, notes, setActiveTab, setCurrentDay, setCurrentProblemId } = useTracker();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Filter problems for mistakes: solved and (confidence < 3 OR has failureReason)
  const struggles = Object.entries(progress)
    .filter(([_, data]) => {
      return data.status === 'Solved' && (data.confidence < 3 || data.failureReason !== null);
    })
    .map(([id, data]) => {
      const prob = ALL_PROBLEMS.find(p => p.id === id);
      const problemNotes = notes[id] || { text: '', memos: [], photos: [] };
      return { id, data, prob, notes: problemNotes };
    })
    .filter(item => item.prob !== undefined);

  // Extract unique categories
  const categories = [...new Set(struggles.map(item => item.prob.category))];

  // Apply search query and category filters
  const filteredStruggles = struggles.filter(item => {
    const matchesSearch = item.prob.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.notes.text && item.notes.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (item.data.failureReason && item.data.failureReason.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === '' || item.prob.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
          <BookOpen className="w-5 h-5 text-brandPink" /> Mistake Journal
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          A dedicated repository of your algorithm struggles. Auto-compiles low-confidence solutions or failure-reason entries.
        </p>
      </div>

      {struggles.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-slate-850 text-center flex flex-col items-center justify-center space-y-4">
          <BookOpen className="w-12 h-12 text-slate-700" />
          <div>
            <h4 className="font-bold text-slate-350 text-sm">Mistake Journal is Empty</h4>
            <p className="text-xs text-slate-550 max-w-sm mt-1">
              Awesome job! You have not logged any low confidence (&lt; 3) or failed attempts yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 bg-slate-900/30 p-4 border border-slate-850 rounded-2xl">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Search by problem name, notes, or roadblock..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 text-slate-350 placeholder-slate-600 rounded-xl px-4 py-2 text-xs outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple/30 transition-all"
              />
            </div>
            <div className="w-full sm:w-48">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 text-slate-350 rounded-xl px-3 py-2 text-xs outline-none focus:border-brandPurple transition-all"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl flex items-center justify-between text-xs text-slate-400">
            <span>Struggling Problems logged: <span className="font-bold text-slate-200">{filteredStruggles.length} of {struggles.length}</span></span>
            <span className="text-[10px] text-brandPink bg-brandPink/10 border border-brandPink/20 px-2 py-0.5 rounded">Auto-synchronized</span>
          </div>

          {filteredStruggles.length === 0 ? (
            <div className="glass-panel p-12 rounded-2xl border border-slate-850 text-center flex flex-col items-center justify-center space-y-3">
              <BookOpen className="w-8 h-8 text-slate-700" />
              <div>
                <h4 className="font-bold text-slate-350 text-sm">No Matching Struggles Found</h4>
                <p className="text-xs text-slate-550 max-w-sm mt-1">
                  Adjust your search keyword or category filter.
                </p>
              </div>
              <button 
                onClick={() => { setSearchQuery(''); setCategoryFilter(''); }}
                className="text-xs text-brandPurple underline hover:text-brandPurple/85 font-semibold mt-2"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            /* Struggles list */
            <div className="space-y-4">
              {filteredStruggles.map(item => {
                let reasonColor = 'text-rose-400 bg-rose-950/20 border border-rose-900/30';
                if (item.data.failureReason === 'Wrong Syntax') reasonColor = 'text-yellow-400 bg-yellow-950/20 border border-yellow-900/30';
                if (item.data.failureReason === 'Time Limit Exceeded') reasonColor = 'text-orange-400 bg-orange-950/20 border border-orange-900/30';

                return (
                  <div 
                    key={item.id}
                    className="glass-panel rounded-2xl border border-slate-850 p-5 grid grid-cols-1 md:grid-cols-3 gap-6 hover:border-slate-800 transition-all"
                  >
                    {/* Problem details */}
                    <div className="md:col-span-1 space-y-3">
                      <div>
                        <span className="text-[10px] text-brandPink font-bold uppercase">Day {item.prob.day} • {item.prob.category}</span>
                        <h3 className="font-bold text-base text-slate-200 mt-0.5">{item.prob.name}</h3>
                      </div>

                      <div className="space-y-2 text-xs">
                        {/* Confidence */}
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <span>Confidence:</span>
                          <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < item.data.confidence ? 'fill-yellow-500 text-yellow-500' : 'text-slate-700'}`} 
                              />
                            ))}
                          </div>
                        </div>

                        {/* Failure Reason Badge */}
                        {item.data.failureReason && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <span>Roadblock:</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded font-semibold ${reasonColor}`}>
                              {item.data.failureReason}
                            </span>
                          </div>
                        )}

                        {/* Time Spent */}
                        <div className="text-slate-500 text-[10px]">
                          Practice Time: {Math.round(item.data.timeSpent / 60)} mins
                        </div>
                      </div>

                      <button
                        onClick={() => launchProblem(item.prob)}
                        className="text-[11px] bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-all group w-fit"
                      >
                        Re-attempt Problem <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                    {/* Personal notes for this struggle */}
                    <div className="md:col-span-2 bg-slate-950/40 border border-slate-850/60 rounded-xl p-4 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase">
                          <FileText className="w-3.5 h-3.5 text-slate-500" /> Study Notes
                        </div>
                        {item.notes.text ? (
                          <p className="text-xs text-slate-300 leading-relaxed max-h-[100px] overflow-y-auto font-medium">
                            "{item.notes.text}"
                          </p>
                        ) : (
                          <p className="text-xs text-slate-600 italic">No notes typed for this problem.</p>
                        )}
                      </div>

                      {/* Media Attachments bar */}
                      {(item.notes.memos.length > 0 || item.notes.photos.length > 0) && (
                        <div className="flex gap-4 border-t border-slate-850/40 pt-2.5 text-[10px] text-slate-500">
                          {item.notes.memos.length > 0 && (
                            <span className="flex items-center gap-1 font-semibold text-brandPurple">
                              <Mic className="w-3 h-3 text-brandPurple" /> {item.notes.memos.length} voice memo(s)
                            </span>
                          )}
                          {item.notes.photos.length > 0 && (
                            <span className="flex items-center gap-1 font-semibold text-brandPink">
                              <ImageIcon className="w-3 h-3 text-brandPink" /> {item.notes.photos.length} photo(s)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

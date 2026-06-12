// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { SHEET_DAYS } from '../data/sheetData';
import { motion } from 'framer-motion';
import { 
  Flame, CheckCircle2, Calendar, Award, Sparkles, 
  ArrowRight, BookOpen, AlertCircle, BarChart3, HelpCircle 
} from 'lucide-react';

export default function Dashboard() {
  const { 
    progress, 
    starred, 
    spacedRepetition, 
    streak, 
    longestStreak,
    heatmap, 
    setActiveTab, 
    setCurrentDay, 
    totalSolved 
  } = useTracker();

  const [showReport, setShowReport] = useState(false);

  // Get active recall items due today
  const todayStr = new Date().toISOString().split('T')[0];
  const recallDueCount = Object.values(spacedRepetition).filter(item => {
    return new Date(item.nextDue) <= new Date(todayStr);
  }).length;

  // Calculate overall stats
  const totalProblemsCount = 135;
  const progressPercent = Math.round((totalSolved / totalProblemsCount) * 100);

  // Calculate completed days count (days where all 3 problems are solved)
  const completedDaysCount = SHEET_DAYS.filter(dayObj => {
    return dayObj.problems.every(p => progress[p.id]?.status === 'Solved');
  }).length;

  // Generate 45-day challenge heatmap
  const getHeatmapDays = () => {
    const days = [];
    for (let day = 1; day <= 45; day++) {
      const dayObj = SHEET_DAYS.find(d => d.day === day);
      let solvedCount = 0;
      if (dayObj) {
        dayObj.problems.forEach(p => {
          if (progress[p.id]?.status === 'Solved') solvedCount++;
        });
      }
      days.push({
        day,
        solvedCount,
        isToday: day === todaysDay,
        isCompleted: solvedCount === 3,
        isMissed: day < todaysDay && solvedCount < 3,
      });
    }
    return days;
  };
  const heatmapDays = getHeatmapDays();

  // Weekly Report calculations
  const solvedList = Object.entries(progress)
    .filter(([_, data]) => data.status === 'Solved')
    .map(([id, data]) => {
      // Find problem info
      const day = parseInt(id.split('_')[0].replace('Day', ''));
      const index = parseInt(id.split('_')[1].replace('P', ''));
      const dayData = SHEET_DAYS.find(d => d.day === day);
      const prob = dayData?.problems.find(p => p.index === index);
      return { id, data, prob };
    });

  const getWeeklyReport = () => {
    if (solvedList.length === 0) {
      return {
        solved: 0,
        avgConfidence: 0,
        strongest: 'None',
        weakest: 'None',
        timeSpent: 0,
        weakestReason: 'No data'
      };
    }

    let totalConf = 0;
    let totalTime = 0;
    const topicStats = {};
    const failureStats = {};

    solvedList.forEach(item => {
      totalConf += item.data.confidence || 0;
      totalTime += item.data.timeSpent || 0;
      
      const topic = item.prob?.category || 'General';
      if (!topicStats[topic]) {
        topicStats[topic] = { count: 0, sumConf: 0 };
      }
      topicStats[topic].count++;
      topicStats[topic].sumConf += item.data.confidence || 0;

      if (item.data.failureReason) {
        failureStats[item.data.failureReason] = (failureStats[item.data.failureReason] || 0) + 1;
      }
    });

    const avgConfidence = (totalConf / solvedList.length).toFixed(1);
    const avgTimePerProblem = Math.round((totalTime / solvedList.length) / 60);

    // Find strongest / weakest topics
    let strongest = 'None';
    let weakest = 'None';
    let maxConf = -1;
    let minConf = 6;

    Object.entries(topicStats).forEach(([topic, stats]) => {
      const avg = stats.sumConf / stats.count;
      if (avg > maxConf) {
        maxConf = avg;
        strongest = topic;
      }
      if (avg < minConf) {
        minConf = avg;
        weakest = topic;
      }
    });

    // Find most common failure reason
    let weakestReason = 'None';
    let maxFailCount = -1;
    Object.entries(failureStats).forEach(([reason, count]) => {
      if (count > maxFailCount) {
        maxFailCount = count;
        weakestReason = reason;
      }
    });

    return {
      solved: solvedList.length,
      avgConfidence,
      strongest,
      weakest,
      timeSpent: avgTimePerProblem,
      weakestReason
    };
  };

  const report = getWeeklyReport();

  // Find "Today's Day" (first day that is not 3/3 solved)
  const getTodaysDay = () => {
    for (const dayObj of SHEET_DAYS) {
      let solvedCount = 0;
      dayObj.problems.forEach(p => {
        if (progress[p.id]?.status === 'Solved') solvedCount++;
      });
      if (solvedCount < 3) return dayObj.day;
    }
    return 11; // fallback to Day 11 if all solved
  };
  const todaysDay = getTodaysDay();

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-12">
      {/* Top Bar Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Total Progress */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-36">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brandPurple/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-sm">Overall Progress</span>
            <CheckCircle2 className="text-brandPurple w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold font-sans">{totalSolved}</span>
              <span className="text-slate-500">/ {totalProblemsCount} solved</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-brandPurple to-brandPink h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Streaks & Consistency */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-36">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brandPink/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-sm">Streaks & Consistency</span>
            <Flame className={`w-5 h-5 ${streak > 0 ? "text-orange-500 fill-orange-500/20 animate-pulse" : "text-slate-600"}`} />
          </div>
          <div className="flex justify-between items-baseline gap-4 mt-2">
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Current</div>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
                {streak} <span className="text-xs text-slate-500 font-medium font-sans">days</span>
              </span>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Longest</div>
              <span className="text-xl font-bold text-slate-350">
                {longestStreak} <span className="text-[10px] text-slate-500 font-medium font-sans">days</span>
              </span>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Timeline</div>
              <span className="text-xl font-bold text-emerald-400">
                {completedDaysCount}/45 <span className="text-[10px] text-slate-500 font-medium font-sans">days</span>
              </span>
            </div>
          </div>
        </div>

        {/* Active Recall Due */}
        <div 
          onClick={() => setActiveTab('recall')}
          className="glass-panel p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-36 cursor-pointer hover:border-brandBlue/30 transition-all group"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brandBlue/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-sm">Active Recall Center</span>
            <Award className="text-brandBlue w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`text-3xl font-bold ${recallDueCount > 0 ? 'text-brandBlue' : 'text-slate-400'}`}>
                {recallDueCount}
              </span>
              <span className="text-slate-500">due today</span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              Spaced recall review <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </div>

        {/* Revision Queue */}
        <div 
          onClick={() => setActiveTab('revision')}
          className="glass-panel p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-36 cursor-pointer hover:border-brandPink/30 transition-all group"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brandPink/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-sm">Mistakes & Revision</span>
            <AlertCircle className="text-brandPink w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`text-3xl font-bold ${starred.length > 0 ? 'text-brandPink' : 'text-slate-400'}`}>
                {starred.length}
              </span>
              <span className="text-slate-500">flagged problems</span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              View mistake log <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </div>
      </div>

      {/* Heatmap & Weekly report section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Calendar */}
        <div className="glass-panel p-5 rounded-2xl lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brandPurple" />
              Day 1 to 45 Activity Map
            </h3>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">45-day challenge</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 items-center justify-start">
            {heatmapDays.map((d) => {
              let color = 'bg-slate-950 border-slate-850/60 text-slate-600'; // Default uncompleted/not started
              
              if (d.isCompleted) {
                color = 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-sm shadow-emerald-500/25';
              } else if (d.isMissed) {
                color = 'bg-slate-800 border-slate-700 text-slate-500'; // Missed (grey)
              } else if (d.solvedCount > 0) {
                // partially solved, e.g. 1/3 or 2/3
                color = 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400';
              }
              
              const borderStyle = d.isToday 
                ? 'ring-2 ring-brandPurple ring-offset-2 ring-offset-slate-950 border-brandPurple animate-pulse'
                : '';

              return (
                <div 
                  key={d.day} 
                  title={`Day ${d.day}: ${d.solvedCount}/3 solved`}
                  onClick={() => {
                    setCurrentDay(d.day);
                    setActiveTab('detail');
                  }}
                  className={`w-[28px] h-[28px] rounded-lg border flex flex-col items-center justify-center text-[9px] font-extrabold cursor-pointer hover:scale-115 transition-all ${color} ${borderStyle}`}
                >
                  D{d.day}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 flex-wrap gap-2">
            <span className="text-[10px] text-slate-500 font-medium">💡 Click any cell to jump to that Day</span>
            <div className="flex items-center gap-3">
              <span>Legend:</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-950 border border-slate-850/60 rounded-sm" /> Lock</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-800 border border-slate-700 rounded-sm" /> Missed</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-950 border border-emerald-900/50 rounded-sm" /> In Progress</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 border border-emerald-400 rounded-sm" /> Done</span>
            </div>
          </div>
        </div>

        {/* Weekly Report Card Widget */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 w-24 h-24 bg-brandPurple/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brandPurple" />
              Weekly Performance
            </h3>
            <button 
              onClick={() => setShowReport(!showReport)}
              className="text-xs text-brandPurple font-medium hover:underline"
            >
              {showReport ? "Hide" : "Details"}
            </button>
          </div>

          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Total Solved</span>
              <span className="font-bold text-slate-200">{report.solved}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Avg. Confidence</span>
              <span className="font-bold text-slate-200 flex items-center gap-1">
                {report.avgConfidence}/5.0 🌟
              </span>
            </div>
            
            {showReport && (
              <>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Strong Topic</span>
                  <span className="font-bold text-emerald-400 max-w-[150px] truncate">{report.strongest}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Weak Topic</span>
                  <span className="font-bold text-rose-400 max-w-[150px] truncate">{report.weakest}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Time / Problem</span>
                  <span className="font-bold text-slate-200">{report.timeSpent} mins</span>
                </div>
                {report.weakestReason !== 'None' && (
                  <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-2 text-xs text-rose-300 mt-2">
                    ⚠️ Most failures due to: <span className="font-bold">{report.weakestReason}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <button 
            onClick={() => setActiveTab('insights')}
            className="w-full bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 rounded-xl py-2 flex items-center justify-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-brandPurple" />
            Analyze Pattern Insights
          </button>
        </div>
      </div>

      {/* Day Grid Header */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h2 className="text-xl font-bold font-sans">SDE Challenge Timeline</h2>
          <p className="text-xs text-slate-400">Day 1 to Day 45 (135 problems total)</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Easy
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-brandBlue" /> Medium
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-brandPink" /> Hard
          </span>
        </div>
      </div>

      {/* Grid of Day Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHEET_DAYS.map((dayObj) => {
          const isToday = dayObj.day === todaysDay;

          // Calculate day progress
          let solvedCount = 0;
          dayObj.problems.forEach(p => {
            if (progress[p.id]?.status === 'Solved') solvedCount++;
          });

          return (
            <motion.div
              key={dayObj.day}
              whileHover={{ y: -4 }}
              onClick={() => {
                setCurrentDay(dayObj.day);
                setActiveTab('detail');
              }}
              className={`glass-panel p-5 rounded-2xl cursor-pointer transition-all relative ${
                isToday 
                  ? 'border-brandPurple/60 glow-purple bg-gradient-to-b from-brandPurple/5 to-transparent' 
                  : 'hover:border-slate-700/60 hover:bg-slate-900/40'
              }`}
            >
              {/* Highlight badge for today */}
              {isToday && (
                <span className="absolute -top-2.5 right-4 bg-brandPurple text-[10px] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wide flex items-center gap-1 animate-pulse">
                  <Flame className="w-3 h-3 fill-white" /> Active Day
                </span>
              )}

              {/* Card Title & Progress */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs text-brandPurple font-semibold uppercase tracking-wider">Day {dayObj.day}</span>
                  <h3 className="font-bold text-lg text-slate-100 font-sans tracking-tight">{dayObj.topic}</h3>
                </div>

                {/* Progress Ring representation */}
                <div className="relative flex items-center justify-center w-11 h-11">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={solvedCount === 3 ? "text-emerald-500" : "text-brandPurple"}
                      strokeDasharray={`${(solvedCount / 3) * 100}, 100`}
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className={`absolute text-[11px] font-bold ${solvedCount === 3 ? 'text-emerald-400' : 'text-slate-300'}`}>{solvedCount}/3</span>
                </div>
              </div>

              {/* Problems list */}
              <div className="space-y-2.5">
                {dayObj.problems.map((p) => {
                  const status = progress[p.id]?.status || 'Not Started';
                  let statusDot = 'bg-slate-800';
                  if (status === 'In Progress') statusDot = 'bg-yellow-500 animate-pulse';
                  if (status === 'Solved') statusDot = 'bg-emerald-500';

                  let diffColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-900/30';
                  if (p.difficulty === 'Medium') diffColor = 'text-brandBlue bg-blue-950/40 border-blue-900/30';
                  if (p.difficulty === 'Hard') diffColor = 'text-brandPink bg-pink-950/40 border-pink-900/30';

                  return (
                    <div 
                      key={p.id} 
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-900/40 border border-slate-800/30 hover:border-slate-850 hover:bg-slate-900/80 transition-all text-sm"
                    >
                      <div className="flex items-center gap-2 max-w-[70%]">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusDot}`} />
                        <span className="text-slate-300 truncate font-medium">{p.name}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${diffColor}`}>
                        {p.difficulty}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

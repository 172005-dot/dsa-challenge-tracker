// src/components/WeeklyReportCard.jsx
import React from 'react';
import { useTracker } from '../context/TrackerContext';
import { SHEET_DAYS, ALL_PROBLEMS } from '../data/sheetData';
import { Award, Calendar, BarChart3, Download, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

export default function WeeklyReportCard() {
  const { progress, streak } = useTracker();

  // Get current date offset
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  // Filter solved problems solved within the last 7 days (or fallback to all solved if list is small)
  const solvedList = Object.entries(progress)
    .filter(([_, data]) => data.status === 'Solved')
    .map(([id, data]) => {
      const day = parseInt(id.split('_')[0].replace('Day', ''));
      const index = parseInt(id.split('_')[1].replace('P', ''));
      const dayData = SHEET_DAYS.find(d => d.day === day);
      const prob = dayData?.problems.find(p => p.index === index);
      return { id, data, prob };
    })
    .filter(item => item.prob !== undefined);

  // Calculate statistics
  const totalSolved = solvedList.length;
  let totalConfidence = 0;
  let totalTime = 0;
  const topicStats = {};
  const failureStats = {};

  solvedList.forEach(item => {
    totalConfidence += item.data.confidence || 4;
    totalTime += item.data.timeSpent || 0;
    
    const topic = item.prob.category || 'General';
    if (!topicStats[topic]) {
      topicStats[topic] = { count: 0, sumConf: 0, failCount: 0 };
    }
    topicStats[topic].count++;
    topicStats[topic].sumConf += item.data.confidence || 4;
    if (item.data.failureReason) {
      topicStats[topic].failCount++;
      failureStats[item.data.failureReason] = (failureStats[item.data.failureReason] || 0) + 1;
    }
  });

  const avgConfidence = totalSolved > 0 ? (totalConfidence / totalSolved).toFixed(1) : '0.0';
  const totalTimeMins = Math.round(totalTime / 60);
  const avgTimePerProblem = totalSolved > 0 ? Math.round(totalTimeMins / totalSolved) : 0;

  // Determine strong/weak topic
  let strongestTopic = 'None';
  let weakestTopic = 'None';
  let maxConf = -1;
  let minConf = 6;

  Object.entries(topicStats).forEach(([topic, stats]) => {
    const avg = stats.sumConf / stats.count;
    if (avg > maxConf) {
      maxConf = avg;
      strongestTopic = topic;
    }
    if (avg < minConf) {
      minConf = avg;
      weakestTopic = topic;
    }
  });

  // Most common failure
  let topFailure = 'None';
  let maxFail = -1;
  Object.entries(failureStats).forEach(([reason, count]) => {
    if (count > maxFail) {
      maxFail = count;
      topFailure = reason;
    }
  });

  // Canvas Exporter for Weekly Card
  const downloadWeeklyCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 800, 500);
    grad.addColorStop(0, '#090a0f');
    grad.addColorStop(1, '#15102a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 500);

    // Glow accents
    ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
    ctx.beginPath();
    ctx.arc(400, 250, 200, 0, Math.PI * 2);
    ctx.fill();

    // Border
    const borderGrad = ctx.createLinearGradient(0, 0, 800, 500);
    borderGrad.addColorStop(0, '#8b5cf6');
    borderGrad.addColorStop(0.5, '#3b82f6');
    borderGrad.addColorStop(1, '#ec4899');
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 780, 480);

    // Title
    ctx.fillStyle = '#8b5cf6';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('45-DAY DSA CHALLENGE TRACKER', 50, 60);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText('Weekly Report Card 🏆', 50, 105);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, 50, 130);

    // Stats Grid on Canvas
    // Col 1: Problems Solved
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fillRect(50, 160, 210, 110);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeRect(50, 160, 210, 110);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText('PROBLEMS SOLVED', 70, 195);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`${totalSolved} Sheet`, 70, 235);

    // Col 2: Avg Confidence
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fillRect(290, 160, 210, 110);
    ctx.strokeRect(290, 160, 210, 110);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText('AVG CONFIDENCE', 310, 195);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`${avgConfidence} / 5.0`, 310, 235);

    // Col 3: Streak
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fillRect(530, 160, 220, 110);
    ctx.strokeRect(530, 160, 220, 110);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText('CURRENT STREAK', 550, 195);
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`${streak} Days`, 550, 235);

    // Bottom Stats details
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Topic Insights:', 50, 315);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Strongest Topic Area:', 50, 350);
    ctx.fillStyle = '#10b981';
    ctx.fillText(strongestTopic, 230, 350);

    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Weakest Topic Area:', 50, 385);
    ctx.fillStyle = '#ef4444';
    ctx.fillText(weakestTopic, 230, 385);

    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Primary Failure Mode:', 50, 420);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(topFailure, 230, 420);

    // Brand marks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.font = 'bold italic 14px sans-serif';
    ctx.fillText('DSA Tracker', 600, 460);

    // Trigger download
    const link = document.createElement('a');
    const localDateStr = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
    link.download = `DSA_Weekly_Report_${localDateStr}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-850 pb-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Award className="w-6 h-6 text-brandPurple animate-pulse" /> Weekly Report Card
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Automated performance assessment summarizing your practice consistency, topic strengths, and codebase velocity.
        </p>
      </div>

      {totalSolved === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-slate-850 text-center flex flex-col items-center justify-center space-y-4">
          <Award className="w-12 h-12 text-slate-700" />
          <div>
            <h4 className="font-bold text-slate-350 text-sm">No Stats Compiled Yet</h4>
            <p className="text-xs text-slate-550 max-w-sm mt-1">
              Solve problems and log confidence scores to automatically generate your weekly report card.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Solved */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-850 space-y-2 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-16 h-16 bg-brandPurple/5 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Solved Problems</span>
              <span className="text-3xl font-black text-slate-200 block">{totalSolved}</span>
              <p className="text-[10px] text-slate-455 leading-relaxed font-semibold">Problems completed in DSA Tracker.</p>
            </div>

            {/* Confidence */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-850 space-y-2 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-16 h-16 bg-yellow-500/5 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Avg Confidence</span>
              <span className="text-3xl font-black text-yellow-500 block">{avgConfidence}/5.0</span>
              <p className="text-[10px] text-slate-450 leading-relaxed font-semibold">Self-rated confidence average.</p>
            </div>

            {/* Time spent */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-850 space-y-2 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-16 h-16 bg-brandBlue/5 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Practice Velocity</span>
              <span className="text-3xl font-black text-brandBlue block">{avgTimePerProblem} mins</span>
              <p className="text-[10px] text-slate-450 leading-relaxed font-semibold">Average duration spent per problem.</p>
            </div>
          </div>

          {/* Details list */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <h3 className="font-bold text-base text-slate-200 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brandPurple" /> Weekly Analytical Breakdown
              </h3>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-655" /> Past 7 Days
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2.5 border-b border-slate-850/40">
                  <span className="text-slate-400">Strongest Topic Area</span>
                  <span className="font-bold text-emerald-400">{strongestTopic}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-850/40">
                  <span className="text-slate-400">Weakest Topic Area</span>
                  <span className="font-bold text-rose-400">{weakestTopic}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-850/40">
                  <span className="text-slate-400">Common Roadmap Roadblock</span>
                  <span className="font-bold text-yellow-500">{topFailure}</span>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-slate-850 rounded-xl p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] text-brandPurple font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Performance summary
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {totalSolved >= 3 
                      ? `Your weekly consistency is strong! You have completed ${totalSolved} problems with an average confidence rating of ${avgConfidence}. Focus on resolving edge cases in ${weakestTopic} to raise your score.`
                      : "Keep practicing daily! Try to complete at least 3 problems per week to generate deep analytical insights."}
                  </p>
                </div>

                <div className="text-[10px] text-slate-500 font-semibold italic pt-2">
                  - DSA Tracker Coach
                </div>
              </div>
            </div>

            {/* Download certificate card trigger */}
            <button 
              onClick={downloadWeeklyCard}
              className="w-full bg-gradient-to-r from-brandPurple to-brandBlue text-slate-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.01] transition-all text-xs"
            >
              <Download className="w-4 h-4 text-slate-950" /> Download Shareable Weekly Report Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

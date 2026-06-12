// src/components/DailySummaryModal.jsx
import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { SHEET_DAYS } from '../data/sheetData';
import { X, Copy, Check, Download, Share2, Award, Sparkles, Clock, Flame } from 'lucide-react';

export default function DailySummaryModal({ isOpen, onClose, dayNum }) {
  if (!isOpen) return null;

  const { progress, streak } = useTracker();
  const dayData = SHEET_DAYS.find(d => d.day === dayNum);
  const [isCopied, setIsCopied] = useState(false);

  if (!dayData) return null;

  // Extract day stats
  let totalTime = 0;
  let totalConf = 0;
  const problems = dayData.problems;
  
  problems.forEach(p => {
    const pProg = progress[p.id] || { timeSpent: 0, confidence: 4 };
    totalTime += pProg.timeSpent || 0;
    totalConf += pProg.confidence || 4;
  });

  const avgConf = (totalConf / problems.length).toFixed(1);

  // Generate LinkedIn post content with real user stats
  const generateLinkedInPost = () => {
    const probList = problems.map(p => {
      const confidence = progress[p.id]?.confidence || 5;
      const ratingStars = '⭐'.repeat(confidence);
      return `• ${p.name} (${p.difficulty}) - ${ratingStars}`;
    }).join('\n');

    const completedDays = SHEET_DAYS.filter(dayObj => {
      return dayObj.problems.every(p => progress[p.id]?.status === 'Solved');
    }).length;

    const completedTopics = SHEET_DAYS.filter(dayObj => {
      return dayObj.problems.every(p => progress[p.id]?.status === 'Solved');
    }).map(dayObj => dayObj.topic);
    const distinctCompletedTopics = [...new Set(completedTopics)];
    const topicSummaryText = distinctCompletedTopics.length > 0
      ? `📚 Topics Mastered So Far: ${distinctCompletedTopics.slice(-3).join(', ')}`
      : `📚 Starting my journey strong on: ${dayData.topic}`;

    return `🚀 Just smashed Day ${dayNum} of the 45-day DSA Challenge!

Today's focus: ${dayData.topic}

Problems Solved Today:
${probList}

📈 CHALLENGE PROGRESS STATS:
🔥 Active Streak: ${streak} Days
🏆 Days Fully Completed: ${completedDays}/45
⏱️ Today's Practice Time: ${Math.round(totalTime / 60)} minutes
🌟 Today's Avg Confidence: ${avgConf}/5.0
${topicSummaryText}

Consistency builds capability. Onward to Day ${dayNum === 45 ? 45 : dayNum + 1}! 💻

#DSATracker #StriversSDESheet #CodingChallenge #SoftwareEngineering #DataStructures #Algorithms`;
  };

  const postText = generateLinkedInPost();

  const handleCopyPost = () => {
    navigator.clipboard.writeText(postText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Canvas Image Download Generator
  const downloadSummaryCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    // 1. Draw Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 800, 500);
    grad.addColorStop(0, '#08090c');
    grad.addColorStop(0.5, '#0d0f1a');
    grad.addColorStop(1, '#150f24');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 500);

    // Decorative glowing dots
    ctx.fillStyle = 'rgba(139, 92, 246, 0.08)';
    ctx.beginPath();
    ctx.arc(600, 150, 180, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(236, 72, 153, 0.04)';
    ctx.beginPath();
    ctx.arc(200, 380, 200, 0, Math.PI * 2);
    ctx.fill();

    // 2. Draw Decorative Border
    const borderGrad = ctx.createLinearGradient(0, 0, 800, 500);
    borderGrad.addColorStop(0, '#8b5cf6');
    borderGrad.addColorStop(1, '#ec4899');
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, 780, 480);

    // 3. Draw Header Title
    ctx.fillStyle = '#8b5cf6';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('45-DAY DSA CHALLENGE TRACKER', 50, 60);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(`Day ${dayNum} Completed! 🚀`, 50, 105);

    // Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.fillText(`Topic: ${dayData.topic}`, 50, 135);

    // Divider line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 165);
    ctx.lineTo(750, 165);
    ctx.stroke();

    // 4. Draw Solved Problems
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('Problems Solved:', 50, 205);

    ctx.font = '16px sans-serif';
    problems.forEach((p, idx) => {
      // Bullet dot
      ctx.fillStyle = p.difficulty === 'Easy' ? '#10b981' : p.difficulty === 'Medium' ? '#3b82f6' : '#ec4899';
      ctx.beginPath();
      ctx.arc(65, 243 + idx * 38, 5, 0, Math.PI * 2);
      ctx.fill();

      // Text name
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(p.name, 85, 248 + idx * 38);

      // Badge difficulty text
      ctx.fillStyle = '#64748b';
      ctx.font = '12px sans-serif';
      ctx.fillText(`[${p.difficulty}]`, 500, 248 + idx * 38);
      ctx.font = '16px sans-serif'; // restore font
    });

    // Divider line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.moveTo(50, 360);
    ctx.lineTo(750, 360);
    ctx.stroke();

    // 5. Stats blocks
    // Time spent
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText('PRACTICE TIME', 50, 395);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(`${Math.round(totalTime / 60)} Min`, 50, 425);

    // Streak
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText('STREAK', 230, 395);
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(`${streak} Days`, 230, 425);

    // Confidence
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText('CONFIDENCE', 380, 395);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(`${avgConf} / 5.0`, 380, 425);

    // Brand mark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.font = 'italic bold 16px sans-serif';
    ctx.fillText('DSA Tracker', 640, 425);

    // Trigger download
    const link = document.createElement('a');
    link.download = `DSA_Tracker_Day${dayNum}_Smashed.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto">
      <div className="relative max-w-2xl w-full glass-panel border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 my-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-850 rounded-xl transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-brandPurple to-brandPink rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-brandPurple/20 animate-bounce">
            <Award className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-100 font-sans">Day {dayNum} Smashed!</h2>
          <p className="text-xs text-slate-400">Congratulations on maintaining consistency! Here is your daily digest.</p>
        </div>

        {/* Stats breakdown */}
        <div className="grid grid-cols-3 gap-4 bg-slate-950/60 p-4 border border-slate-850 rounded-2xl">
          <div className="text-center space-y-1">
            <span className="text-[10px] text-slate-500 font-semibold uppercase flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brandPurple" /> Time
            </span>
            <span className="text-sm font-bold text-slate-200">{Math.round(totalTime / 60)} mins</span>
          </div>
          <div className="text-center space-y-1">
            <span className="text-[10px] text-slate-500 font-semibold uppercase flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" /> Streak
            </span>
            <span className="text-sm font-bold text-orange-400">{streak} Days</span>
          </div>
          <div className="text-center space-y-1">
            <span className="text-[10px] text-slate-500 font-semibold uppercase flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Confidence
            </span>
            <span className="text-sm font-bold text-yellow-400">{avgConf}/5.0</span>
          </div>
        </div>

        {/* Social Share section */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Share2 className="w-4 h-4 text-brandPurple" /> LinkedIn Update Generator
          </label>
          <div className="relative">
            <textarea
              readOnly
              value={postText}
              className="w-full h-36 bg-slate-950 border border-slate-850 rounded-2xl p-4 text-xs font-sans text-slate-400 outline-none resize-none leading-relaxed"
            />
            <button
              onClick={handleCopyPost}
              className="absolute bottom-4 right-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs text-slate-200 px-3.5 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Post
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Text
                </>
              )}
            </button>
          </div>
        </div>

        {/* Exporter triggers */}
        <div className="flex gap-4">
          <button 
            onClick={downloadSummaryCard}
            className="flex-1 bg-gradient-to-r from-brandPurple to-brandPink text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-brandPurple/15 hover:scale-[1.02] transition-all text-xs"
          >
            <Download className="w-4 h-4 text-slate-950" /> Download Shareable Card
          </button>
          <button 
            onClick={onClose}
            className="px-5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs text-slate-300 font-bold py-3 rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// src/components/PatternInsights.jsx
import React from 'react';
import { useTracker } from '../context/TrackerContext';
import { ALL_PROBLEMS } from '../data/sheetData';
import { Sparkles, BrainCircuit, AlertCircle, TrendingDown, BookOpen, ThumbsUp } from 'lucide-react';

export default function PatternInsights() {
  const { progress } = useTracker();

  // Extract all solved items
  const solvedProblems = Object.entries(progress)
    .filter(([_, data]) => data.status === 'Solved')
    .map(([id, data]) => {
      const prob = ALL_PROBLEMS.find(p => p.id === id);
      return { id, data, prob };
    })
    .filter(item => item.prob !== undefined);

  // 1. Analyze Roadblocks (Failure Reasons)
  const calculateRoadblocks = () => {
    const counts = {
      'Wrong Approach': 0,
      'Wrong Edge Case': 0,
      'Wrong Syntax': 0,
      'Time Limit Exceeded': 0,
      'Couldn\'t Start': 0
    };

    let totalFailures = 0;
    solvedProblems.forEach(item => {
      if (item.data.failureReason && counts.hasOwnProperty(item.data.failureReason)) {
        counts[item.data.failureReason]++;
        totalFailures++;
      }
    });

    return { counts, total: totalFailures };
  };

  const { counts: roadblockCounts, total: totalRoadblocks } = calculateRoadblocks();

  // 2. Analyze Topics Average Confidence
  const calculateTopicStats = () => {
    const stats = {}; // { TopicName: { sumConfidence: 0, count: 0, failCount: 0 } }

    solvedProblems.forEach(item => {
      const topic = item.prob.category;
      if (!stats[topic]) {
        stats[topic] = { sumConfidence: 0, count: 0, failCount: 0 };
      }
      stats[topic].count++;
      stats[topic].sumConfidence += item.data.confidence || 0;
      if (item.data.failureReason) {
        stats[topic].failCount++;
      }
    });

    const list = Object.entries(stats).map(([topic, data]) => {
      return {
        topic,
        count: data.count,
        avgConfidence: (data.sumConfidence / data.count).toFixed(1),
        failPercent: Math.round((data.failCount / data.count) * 100)
      };
    });

    return list;
  };

  const topicStats = calculateTopicStats();
  const sortedByWeakness = [...topicStats].sort((a, b) => parseFloat(a.avgConfidence) - parseFloat(b.avgConfidence));
  const weakestTopic = sortedByWeakness[0];

  // 3. Recommendation engine
  const getRecommendation = () => {
    if (solvedProblems.length === 0) {
      return {
        title: "Start practicing to unlock insights",
        text: "Solve your first daily problem and rate your confidence to generate custom optimization patterns."
      };
    }

    if (totalRoadblocks === 0) {
      return {
        title: "Excellent code clarity!",
        text: "You haven't logged any major roadblocks so far. Keep solving daily to push your boundaries on Hard problems."
      };
    }

    // Find highest roadblock reason
    let maxReason = 'Wrong Approach';
    let maxCount = -1;
    Object.entries(roadblockCounts).forEach(([reason, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxReason = reason;
      }
    });

    if (maxReason === 'Wrong Edge Case') {
      return {
        title: "Focus on Pre-check & Constraint Checks",
        text: `Your biggest challenge is hitting Edge Cases. Before writing code, spend 2 minutes outlining edge inputs: empty arrays, single node, integer overflows, negative values. Focus on ${weakestTopic ? weakestTopic.topic : 'your current topic'} constraints.`
      };
    }

    if (maxReason === 'Wrong Approach') {
      return {
        title: "Revise Structural Patterns",
        text: `You frequently choose the Wrong Approach first. We recommend trying the 'Guess Pattern' challenge in the Intuition tab on new problems. Study the core pattern markers (e.g. Subarray Sum -> sliding window vs hashing) before coding.`
      };
    }

    if (maxReason === 'Time Limit Exceeded') {
      return {
        title: "Analyze Complexity Boundaries",
        text: "You are experiencing TLE errors. Remember to calculate target space/time limits: N <= 10^5 generally implies O(N log N) or O(N) is required. Re-evaluate recursion trees before building optimal DP solutions."
      };
    }

    if (maxReason === 'Wrong Syntax') {
      return {
        title: "Syntax Refactoring Practice",
        text: "Java syntax or collection library APIs (e.g. PriorityQueue sorting logic, Map methods) are causing blockers. Write small code snippets in the built-in playground and use the Compare Diff tool to check helper functions."
      };
    }

    return {
      title: `Practice ${weakestTopic ? weakestTopic.topic : 'Weak Areas'}`,
      text: `Focus on revising ${weakestTopic ? weakestTopic.topic : 'your lowest confidence'} problems. Re-attempt them in Spaced Repetition to increase retention.`
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-850 pb-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-brandPurple animate-pulse" /> Pattern Insights
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Automated pattern metrics parsing your solved logs to isolate logic flaws and recommend targeted study paths.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Roadblocks Breakdown */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div>
            <h3 className="font-bold text-base text-slate-200">Roadblock Frequency</h3>
            <p className="text-xs text-slate-500 mt-1">Breakdown of roadblock counts recorded during Solved feedback.</p>
          </div>

          {totalRoadblocks === 0 ? (
            <div className="text-slate-550 text-xs py-8 text-center border border-dashed border-slate-850 rounded-xl">
              No roadblock entries logged. Mark struggles during solved surveys to see metrics.
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(roadblockCounts).map(([reason, count]) => {
                const percent = Math.round((count / totalRoadblocks) * 100) || 0;
                let colorClass = 'bg-brandPurple';
                if (reason === 'Wrong Edge Case') colorClass = 'bg-brandPink';
                if (reason === 'Time Limit Exceeded') colorClass = 'bg-brandBlue';
                if (reason === 'Wrong Syntax') colorClass = 'bg-yellow-500';

                return (
                  <div key={reason} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-350">{reason}</span>
                      <span className="text-slate-400 font-bold">{count} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-850/60">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Recommendation Card */}
        <div className="lg:col-span-1 space-y-6">
          {/* Weakest area highlights */}
          {weakestTopic && (
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs text-rose-400 font-bold uppercase">
                <TrendingDown className="w-4 h-4" /> Weakest Topic area
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-200">{weakestTopic.topic}</h4>
                <p className="text-xs text-slate-500 mt-1">Average confidence: {weakestTopic.avgConfidence}/5.0 🌟</p>
              </div>
              <div className="text-xs text-slate-400">
                ⚠️ Failures recorded on <span className="text-rose-400 font-bold">{weakestTopic.failPercent}%</span> of solved problems in this topic.
              </div>
            </div>
          )}

          {/* AI Recommendation Widget */}
          <div className="glass-panel p-5 rounded-2xl border border-brandPurple/30 bg-brandPurple/5 space-y-3">
            <div className="flex items-center gap-2 text-xs text-brandPurple font-bold uppercase">
              <Sparkles className="w-4 h-4 animate-pulse" /> Study Recommendation
            </div>
            <h4 className="font-bold text-sm text-slate-200">{recommendation.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              {recommendation.text}
            </p>
          </div>
        </div>
      </div>

      {/* Topic Confidence grid */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div>
          <h3 className="font-bold text-base text-slate-200">Topic Confidence Breakdown</h3>
          <p className="text-xs text-slate-500 mt-1">Your confidence ratings tracked across algorithm topics.</p>
        </div>

        {topicStats.length === 0 ? (
          <p className="text-xs text-slate-550 py-4 text-center">Solve a problem and give a confidence rating to populate topic metrics.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicStats.map(item => (
              <div key={item.topic} className="bg-slate-900/40 border border-slate-850 p-4 rounded-xl space-y-3.5">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-xs text-slate-200 truncate max-w-[130px]">{item.topic}</h4>
                  <span className="text-[10px] text-slate-500 font-medium">{item.count} solved</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-450">Avg Confidence:</span>
                  <span className="font-bold text-yellow-500 flex items-center gap-0.5">
                    {item.avgConfidence} ★
                  </span>
                </div>

                {/* Progress bar represent */}
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-yellow-500 h-full rounded-full"
                    style={{ width: `${(parseFloat(item.avgConfidence) / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// src/components/ProblemTabs/PlaygroundTab.jsx
import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Code, Eye, RefreshCw } from 'lucide-react';

export default function PlaygroundTab({ problemId, optimalCode = "" }) {
  const [userCode, setUserCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [viewMode, setViewMode] = useState('editor'); // 'editor' or 'diff'
  const [diffResults, setDiffResults] = useState({ userLines: [], optimalLines: [] });

  const defaultTemplate = `class Solution {
    public int solve() {
        // Write your optimal Java code here
        // Click "Compare Diff" to verify against the optimal solution
        return 0;
    }
}`;

  // Load saved playground code from localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem(`dsa_playground_code_${problemId}`);
    if (savedCode) {
      setUserCode(savedCode);
    } else {
      // Find method signature from optimalCode or use default
      setUserCode(defaultTemplate);
    }
    setViewMode('editor');
  }, [problemId, optimalCode]);

  const handleCodeChange = (val) => {
    setUserCode(val);
    localStorage.setItem(`dsa_playground_code_${problemId}`, val);
  };

  const handleReset = () => {
    if (window.confirm("Reset editor to default template?")) {
      handleCodeChange(defaultTemplate);
      setViewMode('editor');
    }
  };

  const copyOptimalCode = () => {
    navigator.clipboard.writeText(optimalCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Custom Line-by-Line Diff logic
  const calculateDiff = () => {
    const userLines = userCode.split('\n');
    const optLines = optimalCode.split('\n');
    
    const maxLines = Math.max(userLines.length, optLines.length);
    const highlightedUser = [];
    const highlightedOpt = [];

    for (let i = 0; i < maxLines; i++) {
      const uLine = userLines[i] !== undefined ? userLines[i] : '';
      const oLine = optLines[i] !== undefined ? optLines[i] : '';

      // Normalize lines by stripping whitespace to compare core logic
      const uNorm = uLine.trim();
      const oNorm = oLine.trim();

      if (uLine === undefined || uNorm === '') {
        // user didn't write this line, only optimal has it
        highlightedUser.push({ text: ' ', type: 'empty' });
        highlightedOpt.push({ text: oLine, type: 'added' });
      } else if (optLines[i] === undefined || oNorm === '') {
        // optimal doesn't have it, user has extra lines
        highlightedUser.push({ text: uLine, type: 'removed' });
        highlightedOpt.push({ text: ' ', type: 'empty' });
      } else if (uNorm !== oNorm) {
        // lines differ
        highlightedUser.push({ text: uLine, type: 'removed' });
        highlightedOpt.push({ text: oLine, type: 'added' });
      } else {
        // identical lines
        highlightedUser.push({ text: uLine, type: 'unchanged' });
        highlightedOpt.push({ text: oLine, type: 'unchanged' });
      }
    }

    setDiffResults({ userLines: highlightedUser, optimalLines: highlightedOpt });
    setViewMode('diff');
  };

  // Generate line numbers helper
  const lineNumbers = (viewMode === 'editor' ? userCode : userCode)
    .split('\n')
    .map((_, i) => i + 1);

  return (
    <div className="space-y-4">
      {/* Tab bar headers */}
      <div className="flex items-center justify-between bg-slate-900/40 p-1.5 rounded-xl border border-slate-850">
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('editor')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              viewMode === 'editor' 
                ? 'bg-slate-950 text-white shadow-sm border border-slate-800' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" /> Code Editor
          </button>
          <button 
            onClick={calculateDiff}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              viewMode === 'diff' 
                ? 'bg-slate-950 text-white shadow-sm border border-slate-800' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" /> Compare Diff
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={copyOptimalCode}
            className="text-[10px] text-slate-400 bg-slate-900 border border-slate-850 hover:bg-slate-800 hover:text-slate-200 px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" /> Copied Optimal
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Copy Optimal Code
              </>
            )}
          </button>
          
          <button 
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-900 rounded-lg transition-all"
            title="Reset to Template"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code Workspace Grid */}
      {viewMode === 'editor' ? (
        /* Code Editor Mode */
        <div className="flex border border-slate-850 rounded-2xl overflow-hidden bg-slate-950 font-mono text-sm leading-relaxed glow-blue">
          {/* Line Numbers */}
          <div className="bg-slate-900/60 text-slate-600 select-none text-right py-4 px-3 border-r border-slate-850 min-w-[45px] text-[12px]">
            {lineNumbers.map(n => (
              <div key={n}>{n}</div>
            ))}
          </div>
          {/* Main Textarea */}
          <textarea
            value={userCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-96 bg-transparent text-slate-200 p-4 border-none outline-none resize-none font-mono text-[13px] leading-6 focus:ring-0"
            spellCheck="false"
          />
        </div>
      ) : (
        /* Diff Split Screen Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User Code with Highlights */}
          <div className="border border-slate-850 rounded-2xl overflow-hidden bg-slate-950 font-mono text-xs flex flex-col">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-850 text-slate-400 font-semibold flex justify-between items-center">
              <span>Your Playground Code</span>
              <span className="text-[10px] text-rose-400 bg-rose-950/20 px-1.5 rounded">Red = Differs</span>
            </div>
            <div className="overflow-x-auto p-4 h-96 overflow-y-auto leading-5 text-[12px]">
              {diffResults.userLines.map((line, idx) => {
                let cl = "diff-unchanged";
                if (line.type === 'removed') cl = "diff-removed px-1";
                return (
                  <pre key={idx} className={`whitespace-pre font-mono py-[1px] ${cl}`}>
                    {idx + 1} | {line.text}
                  </pre>
                );
              })}
            </div>
          </div>

          {/* Optimal Code with Highlights */}
          <div className="border border-slate-850 rounded-2xl overflow-hidden bg-slate-950 font-mono text-xs flex flex-col">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-850 text-slate-400 font-semibold flex justify-between items-center">
              <span>Optimal Solution Reference</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/20 px-1.5 rounded">Green = Target</span>
            </div>
            <div className="overflow-x-auto p-4 h-96 overflow-y-auto leading-5 text-[12px]">
              {diffResults.optimalLines.map((line, idx) => {
                let cl = "diff-unchanged opacity-60";
                if (line.type === 'added') cl = "diff-added px-1";
                return (
                  <pre key={idx} className={`whitespace-pre font-mono py-[1px] ${cl}`}>
                    {idx + 1} | {line.text}
                  </pre>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

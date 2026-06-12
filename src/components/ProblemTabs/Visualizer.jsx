// src/components/ProblemTabs/Visualizer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

export default function Visualizer({ steps = [], type = 'two-pointer' }) {
  if (!steps || steps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40 text-slate-500 text-sm">
        No visualizer steps pre-loaded for this problem.
      </div>
    );
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // ms per step
  const timerRef = useRef(null);

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps]);

  const stepForward = () => {
    setIsPlaying(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepBackward = () => {
    setIsPlaying(false);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetVisualizer = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const activeStep = steps[currentStep] || steps[0];
  const { data = [], pointers = {}, description = "", highlights = [], stack = null } = activeStep;

  // Find if a pointer points to index
  const getPointersForIndex = (idx) => {
    const list = [];
    Object.entries(pointers).forEach(([pName, pIdx]) => {
      if (pIdx === idx) {
        list.push(pName);
      }
    });
    return list;
  };

  // Switch layouts based on visualizerType
  const renderVisualizerWork = () => {
    if (stack !== null) {
      return (
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold uppercase">Stack Memory</span>
          <div className="w-28 border-x-2 border-b-2 border-slate-700 bg-slate-950/40 rounded-b-lg p-2 min-h-[90px] flex flex-col-reverse gap-1.5">
            {stack.length === 0 ? (
              <span className="text-[10px] text-slate-600 text-center py-6 font-medium">Empty</span>
            ) : (
              stack.map((item, idx) => (
                <div 
                  key={idx} 
                  className="w-full bg-gradient-to-r from-brandPurple/20 to-brandPink/15 border border-brandPurple/30 text-slate-200 text-xs py-1 rounded text-center font-bold shadow-sm animate-fade-in"
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    switch (type) {
      case 'grid':
        return (
          <div className="flex flex-col gap-2 p-2 bg-slate-950/40 border border-slate-850 rounded-xl">
            {data.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-2">
                {row.map((cell, cIdx) => {
                  const isPointersMatch = pointers.r === rIdx && pointers.c === cIdx;
                  const isHighlighted = highlights.includes(rIdx) || highlights.includes(cIdx);
                  return (
                    <div 
                      key={cIdx} 
                      className={`w-9 h-9 border rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isPointersMatch ? 'border-brandPink bg-brandPink/20 text-brandPink shadow-sm shadow-brandPink/15' :
                        isHighlighted ? 'border-brandPurple/50 bg-brandPurple/10 text-brandPurple' : 'border-slate-800 bg-slate-950/65 text-slate-400'
                      }`}
                    >
                      {cell}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );

      case 'linked-list':
        return (
          <div className="flex items-center gap-3 p-4 overflow-x-auto max-w-full">
            {data.map((nodeVal, idx) => {
              const isCurr = pointers.curr === idx;
              const isPrev = pointers.prev === idx;
              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center relative min-w-[40px]">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-extrabold transition-all duration-300 ${
                      isCurr ? 'border-brandPink bg-brandPink/20 text-brandPink animate-pulse shadow-sm shadow-brandPink/15' :
                      isPrev ? 'border-brandPurple bg-brandPurple/20 text-brandPurple' : 'border-slate-800 bg-slate-950/60 text-slate-400'
                    }`}>
                      {nodeVal}
                    </div>
                    {/* Labels under node */}
                    {(isCurr || isPrev) && (
                      <span className="absolute -bottom-5 text-[8px] font-bold text-slate-450 uppercase tracking-wider">
                        {isCurr && isPrev ? 'c, p' : isCurr ? 'curr' : 'prev'}
                      </span>
                    )}
                  </div>
                  {idx < data.length - 1 && (
                    <span className="text-slate-650 font-black text-sm">&rarr;</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        );

      case 'tree':
        return (
          <div className="flex flex-col items-center gap-4 py-2">
            {/* Level 0 */}
            <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${pointers.active === 0 ? 'border-brandPink bg-brandPink/25 text-brandPink animate-pulse shadow-sm' : 'border-slate-800 bg-slate-950/60'}`}>{data[0] || 1}</div>
            {/* Level 1 */}
            <div className="flex gap-12 relative">
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${pointers.active === 1 ? 'border-brandPink bg-brandPink/25 text-brandPink animate-pulse shadow-sm' : 'border-slate-800 bg-slate-950/60'}`}>{data[1] || 2}</div>
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${pointers.active === 2 ? 'border-brandPink bg-brandPink/25 text-brandPink animate-pulse shadow-sm' : 'border-slate-800 bg-slate-950/60'}`}>{data[2] || 3}</div>
            </div>
            {/* Level 2 */}
            <div className="flex gap-4">
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${pointers.active === 3 ? 'border-brandPink bg-brandPink/25 text-brandPink animate-pulse shadow-sm' : 'border-slate-800 bg-slate-950/60'}`}>{data[3] || 4}</div>
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${pointers.active === 4 ? 'border-brandPink bg-brandPink/25 text-brandPink animate-pulse shadow-sm' : 'border-slate-800 bg-slate-950/60'}`}>{data[4] || 5}</div>
            </div>
          </div>
        );

      case 'graph':
        return (
          <div className="flex items-center justify-center gap-4 p-4 flex-wrap">
            {data.map((node, idx) => {
              const isActive = pointers.active === idx || pointers.activeNode === idx;
              return (
                <div 
                  key={idx} 
                  className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-extrabold transition-all duration-300 ${
                    isActive ? 'border-brandPink bg-brandPink/20 text-brandPink animate-pulse shadow-sm shadow-brandPink/15' : 'border-slate-800 bg-slate-950/60 text-slate-400'
                  }`}
                >
                  V{node}
                </div>
              );
            })}
          </div>
        );

      case 'dp':
        return (
          <div className="flex gap-2.5 p-3 overflow-x-auto max-w-full">
            {data.map((val, idx) => {
              const isActive = pointers.i === idx || pointers.r === idx;
              return (
                <div key={idx} className="flex flex-col items-center min-w-[36px]">
                  <div className={`w-9 h-9 border rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isActive ? 'border-brandPink bg-brandPink/20 text-brandPink shadow-sm' : 'border-slate-800 bg-slate-950/60 text-slate-455'
                  }`}>
                    {val}
                  </div>
                  <span className="text-[9px] text-slate-600 mt-1 font-mono">[{idx}]</span>
                </div>
              );
            })}
          </div>
        );

      case 'interval':
        return (
          <div className="flex flex-col gap-2 w-full max-w-[280px] p-2 bg-slate-950/40 border border-slate-850 rounded-xl">
            {data.map((interval, idx) => {
              const isActive = pointers.active === idx;
              return (
                <div 
                  key={idx} 
                  className={`p-2 rounded-lg border text-xs font-semibold flex justify-between transition-all duration-300 ${
                    isActive ? 'border-brandPink bg-brandPink/20 text-brandPink shadow-sm' : 'border-slate-850/60 bg-slate-950/10 text-slate-450'
                  }`}
                >
                  <span>Interval {idx + 1}</span>
                  <span className="font-mono">[{interval[0]}, {interval[1]}]</span>
                </div>
              );
            })}
          </div>
        );

      case 'two-pointer':
      default:
        return (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex items-center gap-2">
              {data.map((val, idx) => {
                const indexPointers = getPointersForIndex(idx);
                const isHighlighted = highlights.includes(idx);
                
                let boxClass = "border-slate-800 bg-slate-950/60 text-slate-400";
                if (isHighlighted) {
                  boxClass = "border-brandPurple bg-brandPurple/20 text-brandPurple font-bold shadow-sm shadow-brandPurple/15";
                }

                return (
                  <div key={idx} className="flex flex-col items-center w-11 relative">
                    {/* Element Box */}
                    <div className={`w-10 h-10 border rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${boxClass}`}>
                      {val}
                    </div>

                    {/* Array Index label */}
                    <span className="text-[9px] text-slate-600 mt-1 font-mono">[{idx}]</span>

                    {/* Pointers mapping beneath node */}
                    {indexPointers.length > 0 && (
                      <div className="absolute -bottom-8 flex flex-col items-center gap-0.5 z-10 animate-bounce">
                        <div className="w-0.5 h-1.5 bg-brandPink" />
                        {indexPointers.map((p, pIdx) => (
                          <span 
                            key={pIdx} 
                            className="bg-brandPink text-[8px] text-white px-1 py-0.2 rounded font-bold uppercase tracking-wider scale-90"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Added spacer for pointers */}
            <div className="h-6" />
          </div>
        );
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-950/20 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-850 pb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">Execution Visualizer</h4>
          <p className="text-[10px] text-slate-555 font-bold">Step {currentStep + 1} of {steps.length} ({type.toUpperCase()})</p>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Speed:</span>
          <input 
            type="range" 
            min="400" 
            max="2000" 
            step="200"
            value={2400 - speed} 
            onChange={(e) => setSpeed(2400 - parseInt(e.target.value))}
            className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brandPurple"
          />
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="min-h-[140px] flex items-center justify-center p-4 bg-slate-900/20 border border-slate-850/60 rounded-xl relative overflow-x-auto">
        {renderVisualizerWork()}
      </div>

      {/* Description Panel */}
      <div className="bg-slate-950/80 border border-slate-850 p-3 rounded-xl min-h-[60px] flex items-start gap-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-brandPurple mt-1.5 flex-shrink-0 animate-pulse" />
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          {description}
        </p>
      </div>

      {/* Control Buttons Bar */}
      <div className="flex items-center justify-center gap-4 pt-1">
        <button 
          onClick={resetVisualizer}
          title="Reset"
          className="p-2 rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-800 hover:border-slate-750 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button 
          onClick={stepBackward}
          disabled={currentStep === 0}
          title="Step Backward"
          className={`p-2 rounded-xl border transition-all ${
            currentStep === 0 
              ? 'bg-slate-900/40 border-slate-900 text-slate-700 cursor-not-allowed' 
              : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? "Pause" : "Play"}
          className="p-3 rounded-full bg-gradient-to-r from-brandPurple to-brandPink text-white hover:scale-105 transition-all shadow-md shadow-brandPurple/20"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
        </button>

        <button 
          onClick={stepForward}
          disabled={currentStep === steps.length - 1}
          title="Step Forward"
          className={`p-2 rounded-xl border transition-all ${
            currentStep === steps.length - 1 
              ? 'bg-slate-900/40 border-slate-900 text-slate-700 cursor-not-allowed' 
              : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

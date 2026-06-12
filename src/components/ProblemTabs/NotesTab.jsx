// src/components/ProblemTabs/NotesTab.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTracker } from '../../context/TrackerContext';
import { 
  Mic, Square, Play, Pause, Trash2, Camera, 
  Image as ImageIcon, Plus, Maximize2, X 
} from 'lucide-react';

export default function NotesTab({ problemId }) {
  const { notes, updateNotes, deleteMemo, deletePhoto } = useTracker();
  const problemNotes = notes[problemId] || { text: '', memos: [], photos: [] };

  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingMemoId, setPlayingMemoId] = useState(null);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [expandedPhoto, setExpandedPhoto] = useState(null);
  
  const recordIntervalRef = useRef(null);
  const playIntervalRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sync text state with context updates
  useEffect(() => {
    setText(problemNotes.text);
  }, [problemId, problemNotes.text]);

  // Save text note to context (debounced/on blur or change)
  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    updateNotes(problemId, { text: val });
  };

  // Voice recording controls
  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    recordIntervalRef.current = setInterval(() => {
      setRecordingSeconds(prev => {
        if (prev >= 59) {
          stopRecording(true);
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = (shouldSave = true) => {
    setIsRecording(false);
    if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    
    if (shouldSave && recordingSeconds > 0) {
      const newMemo = {
        id: Date.now(),
        duration: recordingSeconds,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        url: '#' // simulated audio memo url
      };
      updateNotes(problemId, {}, newMemo);
    }
    setRecordingSeconds(0);
  };

  const playMemo = (memo) => {
    if (playingMemoId === memo.id) {
      // Pause
      setPlayingMemoId(null);
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    } else {
      // Play
      setPlayingMemoId(memo.id);
      setPlaybackSeconds(0);
      
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
      
      playIntervalRef.current = setInterval(() => {
        setPlaybackSeconds(prev => {
          if (prev >= memo.duration - 1) {
            setPlayingMemoId(null);
            clearInterval(playIntervalRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  // Image Upload handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert file to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      // Compress slightly by drawing on canvas if needed, or store base64 directly
      updateNotes(problemId, {}, null, reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Text Note Area */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Notebook</label>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Write down your insights, edge cases to watch out for, or complexity reminders..."
          className="w-full h-44 bg-slate-950/60 border border-slate-850 hover:border-slate-800 focus:border-brandPurple focus:ring-1 focus:ring-brandPurple rounded-2xl p-4 text-sm text-slate-200 outline-none resize-none transition-all placeholder:text-slate-650"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Voice Recorder Block */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 space-y-4">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Voice Memos</label>

          {isRecording ? (
            /* Recording State UI */
            <div className="flex items-center justify-between bg-slate-900/40 border border-rose-950/30 rounded-xl p-3.5 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <span className="text-xs font-medium text-slate-350">Recording voice memo...</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold font-mono text-slate-300">
                  0:{recordingSeconds.toString().padStart(2, '0')} / 1:00
                </span>
                <button 
                  onClick={() => stopRecording(true)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                >
                  <Square className="w-4 h-4 fill-white" />
                </button>
              </div>
            </div>
          ) : (
            /* Idle State UI */
            <button 
              onClick={startRecording}
              className="w-full bg-slate-900/40 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-xs text-slate-300 rounded-xl py-3 flex items-center justify-center gap-2 transition-all group"
            >
              <Mic className="w-4 h-4 text-brandPurple group-hover:scale-110 transition-transform" />
              Record Voice Memo (Max 60s)
            </button>
          )}

          {/* Memos List */}
          <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
            {problemNotes.memos.length === 0 ? (
              <p className="text-[11px] text-slate-600 text-center py-4 font-medium">No voice notes recorded</p>
            ) : (
              problemNotes.memos.map((memo) => {
                const isPlaying = playingMemoId === memo.id;
                const playPercent = isPlaying ? (playbackSeconds / memo.duration) * 100 : 0;

                return (
                  <div 
                    key={memo.id} 
                    className="flex items-center justify-between bg-slate-950/40 border border-slate-850/60 rounded-xl p-3 text-xs"
                  >
                    <div className="flex items-center gap-3 w-[70%]">
                      <button 
                        onClick={() => playMemo(memo)}
                        className={`p-2 rounded-lg transition-all ${
                          isPlaying 
                            ? 'bg-brandPurple text-white' 
                            : 'bg-slate-900 text-brandPurple hover:bg-slate-850'
                        }`}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-brandPurple ml-0.5" />}
                      </button>
                      <div className="w-full">
                        <div className="flex justify-between font-medium text-slate-400 mb-1">
                          <span>{memo.date}</span>
                          <span>
                            {isPlaying 
                              ? `0:${playbackSeconds.toString().padStart(2, '0')}` 
                              : `0:${memo.duration.toString().padStart(2, '0')}`}
                          </span>
                        </div>
                        {/* Playback timeline */}
                        <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                          <div 
                            className="bg-brandPurple h-full transition-all duration-300"
                            style={{ width: `${playPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => deleteMemo(problemId, memo.id)}
                      className="p-2 text-slate-655 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Photo Attachment Block */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Photo Notes</label>
            <input 
              type="file" 
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="text-[10px] text-brandPurple bg-brandPurple/10 border border-brandPurple/20 hover:bg-brandPurple/20 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3 h-3" /> Add Image
            </button>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-3 gap-3 max-h-[160px] overflow-y-auto pr-1">
            {problemNotes.photos.length === 0 ? (
              <div className="col-span-3 flex flex-col items-center justify-center py-6 border border-dashed border-slate-850 rounded-xl text-slate-600 bg-slate-950/20">
                <ImageIcon className="w-5 h-5 mb-1 opacity-70" />
                <span className="text-[10px] font-medium">Attach handwritten notes</span>
              </div>
            ) : (
              problemNotes.photos.map((src, index) => (
                <div 
                  key={index}
                  className="relative group aspect-square bg-slate-950 rounded-xl overflow-hidden border border-slate-850 cursor-pointer"
                >
                  <img src={src} alt="Handwritten notes" className="w-full h-full object-cover" />
                  
                  {/* Photo hovering panel */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all">
                    <button 
                      onClick={() => setExpandedPhoto(src)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-850 text-slate-350 rounded-md"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePhoto(problemId, index);
                      }}
                      className="p-1.5 bg-slate-900 hover:bg-red-950 text-red-400 rounded-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Expandable Image Modal */}
      {expandedPhoto && (
        <div className="fixed inset-0 bg-slate-950/90 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative max-w-4xl max-h-[90vh] glass-panel border border-slate-800 rounded-2xl p-2 overflow-hidden flex flex-col items-center">
            <button 
              onClick={() => setExpandedPhoto(null)}
              className="absolute top-4 right-4 p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={expandedPhoto} alt="Full resolution notes" className="max-w-full max-h-[80vh] rounded-lg object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}

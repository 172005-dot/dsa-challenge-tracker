// src/App.jsx
import React, { useState } from 'react';
import { useTracker } from './context/TrackerContext';
import Dashboard from './components/Dashboard';
import DayDetail from './components/DayDetail';
import ActiveRecall from './components/ActiveRecall';
import RevisionCenter from './components/RevisionCenter';
import MistakeJournal from './components/MistakeJournal';
import PatternInsights from './components/PatternInsights';
import WeeklyReportCard from './components/WeeklyReportCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, LayoutDashboard, Calendar, Brain, 
  Flag, BookOpen, BrainCircuit, Award, Flame, LogIn, LogOut, User, Sparkles
} from 'lucide-react';

export default function App() {
  const { 
    activeTab, 
    setActiveTab, 
    streak, 
    user, 
    authLoading, 
    login, 
    register, 
    logout, 
    googleLogin 
  } = useTracker();

  // Authentication states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError('');
    setPending(true);
    try {
      if (isRegisterMode) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      if (err.message.includes('wrong-password') || err.message.includes('wrong-password-or-user-not-found')) {
        setError('Incorrect email or password.');
      } else if (err.message.includes('email-already-in-use')) {
        setError('Email is already registered.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setPending(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await googleLogin();
      setShowAuthModal(false);
    } catch (err) {
      setError(err.message || 'Google Login failed.');
    }
  };

  // Page switcher router helper
  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key="dashboard" />;
      case 'detail':
        return <DayDetail key="detail" />;
      case 'recall':
        return <ActiveRecall key="recall" />;
      case 'revision':
        return <RevisionCenter key="revision" />;
      case 'mistakes':
        return <MistakeJournal key="mistakes" />;
      case 'insights':
        return <PatternInsights key="insights" />;
      case 'weekly':
        return <WeeklyReportCard key="weekly" />;
      default:
        return <Dashboard key="dashboard" />;
    }
  };

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'detail', label: 'Practice Focus', icon: Calendar },
    { id: 'recall', label: 'Recall Center', icon: Brain },
    { id: 'revision', label: 'Revision Queue', icon: Flag },
    { id: 'mistakes', label: 'Mistakes Log', icon: BookOpen },
    { id: 'insights', label: 'Pattern Insights', icon: BrainCircuit },
    { id: 'weekly', label: 'Weekly Report', icon: Award }
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background breathing glow layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-brandPurple/5 to-transparent blur-3xl pointer-events-none pulsing-glow-layer z-0" />

      {/* Main Desktop Header Navbar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-900 px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brandPurple to-brandPink flex items-center justify-center shadow-md shadow-brandPurple/15">
            <Terminal className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-extrabold text-sm font-sans tracking-tight text-slate-100 group-hover:text-white transition-colors">
            DSA <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandPurple to-brandPink">Tracker</span>
          </span>
        </div>

        {/* Navigation center links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-950/40 p-1 border border-slate-900 rounded-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`text-xs px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  isActive 
                    ? 'bg-slate-900 border border-slate-800 text-brandPurple shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Streak & User info indicator */}
        <div className="flex items-center gap-3">
          {/* Active Streak */}
          <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/25 px-3 py-1.5 rounded-full font-mono text-xs text-orange-400 font-bold select-none">
            <Flame className="w-3.5 h-3.5 fill-orange-500" />
            <span>{streak} DAYS STREAK</span>
          </div>

          {/* User Auth Info */}
          {authLoading ? (
            <div className="w-8 h-8 rounded-full border border-slate-800 border-t-brandPurple animate-spin" />
          ) : user ? (
            <div className="flex items-center gap-2 group relative">
              <img 
                src={user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`} 
                alt="user avatar" 
                className="w-8 h-8 rounded-full border border-brandPurple/40 bg-slate-900 cursor-pointer"
              />
              <span className="hidden md:inline text-xs font-semibold text-slate-350">{user.displayName || user.email.split('@')[0]}</span>
              
              {/* Tooltip Hover Logout Trigger */}
              <div className="absolute right-0 top-8 bg-slate-950 border border-slate-850 p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50 min-w-[120px]">
                <button 
                  onClick={logout}
                  className="w-full text-left text-[11px] font-bold text-rose-400 hover:bg-slate-900 p-2 rounded-lg flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => { setError(''); setShowAuthModal(true); }}
              className="bg-slate-900 border border-slate-800 hover:border-brandPurple/30 text-xs font-bold text-slate-200 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all"
            >
              <LogIn className="w-3.5 h-3.5 text-brandPurple" /> Sign In
            </button>
          )}
        </div>
      </header>

      {/* Guest Mode Nudge Banner */}
      {!authLoading && !user && (
        <div className="w-full bg-gradient-to-r from-brandPurple/15 to-brandPink/5 border-b border-brandPurple/25 py-2 px-4 text-center text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 relative z-20">
          <Sparkles className="w-4 h-4 text-brandPurple animate-pulse" />
          <span>You are running in Guest Mode.</span>
          <button 
            onClick={() => { setError(''); setShowAuthModal(true); }}
            className="text-brandPurple hover:text-brandPink underline font-bold"
          >
            Sign in to sync your progress to the cloud
          </button>
        </div>
      )}

      {/* Main Page Layout Workspace */}
      <main className="flex-1 py-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Responsive Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-900 backdrop-blur-md px-4 py-2 flex items-center justify-around">
        {navLinks.slice(0, 5).map((link) => {
          const Icon = link.icon;
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg text-[10px] font-medium transition-all ${
                isActive 
                  ? 'text-brandPurple' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{link.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative max-w-sm w-full glass-panel border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-slate-100 font-sans">{isRegisterMode ? "Create Account" : "Welcome Back"}</h3>
              <p className="text-xs text-slate-400">Save progress and synchronize notes to the cloud.</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-rose-950/30 border border-rose-900/40 text-rose-350 text-xs p-3 rounded-xl font-medium text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAuthAction} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs outline-none focus:border-brandPurple/60 text-slate-200 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs outline-none focus:border-brandPurple/60 text-slate-200 font-medium"
                />
              </div>

              <button 
                type="submit"
                disabled={pending}
                className="w-full bg-gradient-to-r from-brandPurple to-brandPink text-slate-950 font-bold py-3 rounded-xl text-xs hover:scale-[1.01] transition-all flex items-center justify-center"
              >
                {pending ? (
                  <div className="w-4 h-4 rounded-full border border-slate-950 border-t-transparent animate-spin" />
                ) : (
                  isRegisterMode ? "Sign Up" : "Sign In"
                )}
              </button>
            </form>

            <div className="relative flex items-center justify-center my-2 text-[10px] font-bold text-slate-600">
              <div className="absolute w-full h-[1px] bg-slate-900" />
              <span className="relative bg-slate-950 px-3 z-10 uppercase">Or continue with</span>
            </div>

            {/* Google Mock Login */}
            <button 
              onClick={handleGoogleLogin}
              className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold py-3 rounded-xl text-slate-200 flex items-center justify-center gap-2 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.927h6.6c-.29 1.5-.143 2.927-.723 3.927l3.11 2.42c1.82-1.68 2.868-4.15 2.868-6.197z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.11-2.42c-.86.58-1.97.92-3.11.92-3.11 0-5.74-2.11-6.68-4.96l-3.22 2.48c1.97 3.92 6.01 6.98 10.19 6.98z"/>
                <path fill="#FBBC05" d="M5.32 14.63c-.24-.73-.38-1.5-.38-2.3s.14-1.57.38-2.3L2.1 7.55C1.04 9.68.45 12.06.45 14.5s.59 4.82 1.65 6.95l3.22-2.82z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.81 0 3.77 3.06 1.8 6.98l3.22 2.48c.94-2.85 3.57-4.71 6.98-4.71z"/>
              </svg>
              Google Account
            </button>

            {/* Mode Switcher */}
            <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-900">
              {isRegisterMode ? "Already have an account?" : "New to DSA Tracker?"}{" "}
              <button 
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-brandPurple hover:underline font-bold"
              >
                {isRegisterMode ? "Sign In" : "Create Account"}
              </button>
            </div>

            {/* Cancel Button */}
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-4 text-xs font-bold text-slate-500 hover:text-slate-350 p-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

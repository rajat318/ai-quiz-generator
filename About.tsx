import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Trophy, Home, RotateCcw, ChevronDown, CheckCircle2, 
  XCircle, Info, Download, Share2, BarChart3, Star, AlertCircle, HelpCircle, Brain
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { QuizSession } from '../types';

export function Results() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [sessions] = useLocalStorage<QuizSession[]>('edu_quiz_sessions', []);
  
  const session = useMemo(() => sessions.find(s => s.id === quizId), [sessions, quizId]);

  useEffect(() => {
    if (session && session.score >= 70) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#6366f1', '#10b981']
      });
    }
  }, [session]);

  if (!session) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4">
        <AlertCircle size={48} className="mx-auto text-amber-500" />
        <h2 className="text-2xl font-bold">Quiz Results Not Found</h2>
        <Link to="/generate" className="glass-button inline-flex">Go to Generator</Link>
      </div>
    </div>
  );

  const getGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const getStatusColor = (score: number) => {
    if (score >= 70) return 'text-emerald-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      {/* Hero Score Section */}
      <section className="glass-card text-center relative overflow-hidden py-12">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500" />
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="inline-flex items-center justify-center w-32 h-32 rounded-full glass border-white/10 mb-6"
        >
          <Trophy size={60} className={session.score >= 70 ? 'text-amber-400' : 'text-slate-500'} />
        </motion.div>
        
        <div className="space-y-4">
           <h1 className="text-5xl font-display font-extrabold tracking-tight">
             You Scored <span className="gradient-text">{session.score}%</span>
           </h1>
           <p className={`text-xl font-bold ${getStatusColor(session.score)}`}>
             Grade: {getGrade(session.score)} • {session.score >= 70 ? 'Excellent Work!' : 'Keep Practicing!'}
           </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button 
            onClick={() => window.print()}
             className="glass-button text-xs font-bold uppercase tracking-wider"
          >
            <Download size={14} />
            Export Results
          </button>
          <button className="glass-button text-xs font-bold uppercase tracking-wider">
            <Share2 size={14} />
            Share With Friends
          </button>
          <Link to="/generate" className="px-6 py-3 bg-cyan-500 rounded-xl font-bold flex items-center gap-2 hover:bg-cyan-600 transition-all text-sm">
            <RotateCcw size={16} />
            Try New Quiz
          </Link>
          <Link to="/" className="glass-button text-xs font-bold uppercase tracking-wider">
            <Home size={14} />
            Home
          </Link>
        </div>
      </section>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total', value: session.questions.length, icon: <HelpCircle size={14} /> },
          { label: 'Correct', value: session.questions.filter(q => session.answers[q.id] === q.correctAnswer).length, icon: <CheckCircle2 size={14} className="text-emerald-400" /> },
          { label: 'Wrong', value: session.questions.filter(q => session.answers[q.id] && session.answers[q.id] !== q.correctAnswer).length, icon: <XCircle size={14} className="text-red-400" /> },
          { label: 'Skipped', value: session.questions.filter(q => !session.answers[q.id]).length, icon: <Info size={14} className="text-slate-400" /> },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card flex items-center justify-between p-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                {stat.icon}
                {stat.label}
              </p>
              <p className="text-xl font-bold text-slate-200">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Answer Review Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold">Review Answers</h2>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
             <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Correct</span>
             <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400" /> Incorrect</span>
          </div>
        </div>

        <div className="space-y-4">
          {session.questions.map((q, idx) => {
            const isCorrect = session.answers[q.id] === q.correctAnswer;
            const isSkipped = !session.answers[q.id];
            
            return (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`glass-card p-6 border-l-4 ${
                  isSkipped ? 'border-l-slate-600' : isCorrect ? 'border-l-emerald-500' : 'border-l-red-500'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h4 className="font-semibold text-slate-200">{idx + 1}. {q.question}</h4>
                  {isCorrect ? <CheckCircle2 className="text-emerald-500 shrink-0" size={20} /> : <XCircle className="text-red-500 shrink-0" size={20} />}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-4">
                  <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] font-bold uppercase text-slate-500">Your Answer</p>
                    <p className={isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                      {session.answers[q.id] || '(Skipped)'}
                    </p>
                  </div>
                  <div className="space-y-1 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-[10px] font-bold uppercase text-emerald-500/60">Correct Answer</p>
                    <p className="text-emerald-400 font-bold">{q.correctAnswer}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 text-sm">
                   <p className="text-[10px] font-bold uppercase text-slate-500 mb-2 flex items-center gap-2">
                     <Brain size={12} className="text-cyan-400" />
                     Learning Insights & Explanation
                   </p>
                   <p className="text-slate-300 leading-relaxed italic">
                     {q.explanation}
                   </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Weak Areas Suggestion */}
      <section className="glass-card bg-indigo-600/5 border-indigo-500/20 p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Star size={32} className="text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold">Recommended for Revision</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Based on your performance, we recommend focusing on <b>"{session.questions.filter(q => session.answers[q.id] !== q.correctAnswer)[0]?.topic || session.config.topic}"</b>. 
          Use the AI Study Assistant to clarify doubts!
        </p>
        <Link to="/assistant" className="inline-flex text-indigo-400 font-semibold hover:underline items-center gap-2 text-sm">
          Talk to Study Assistant <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

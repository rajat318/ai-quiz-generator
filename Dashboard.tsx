import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Brain, Zap, BarChart3, Clock, Share2 } from 'lucide-react';

export function Home() {
  const features = [
    {
      title: 'AI Quiz Generation',
      description: 'Generate custom quizzes from topics, chapters, or PDF notes in seconds.',
      icon: <Brain className="text-cyan-400" size={32} />,
      color: 'from-cyan-500/20 to-cyan-500/5'
    },
    {
      title: 'Interactive Practice',
      description: 'Experience a modern quiz interface with timers, progress tracking, and instant feedback.',
      icon: <Zap className="text-amber-400" size={32} />,
      color: 'from-amber-500/20 to-amber-500/5'
    },
    {
      title: 'Performance Analytics',
      description: 'Analyze your weak areas and track improvement with detailed charts and history.',
      icon: <BarChart3 className="text-emerald-400" size={32} />,
      color: 'from-emerald-500/20 to-emerald-500/5'
    }
  ];

  const highlights = [
    { label: 'MCQs', icon: <Zap size={16} /> },
    { label: 'True/False', icon: <Clock size={16} /> },
    { label: 'Fill Blanks', icon: <Brain size={16} /> },
    { label: 'Short answer', icon: <BookOpen size={16} /> },
    { label: 'PDF Support', icon: <Share2 size={16} /> },
  ];

  return (
    <div className="flex flex-col gap-24 py-20 px-4">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mx-auto"
        >
          <Sparkles size={14} />
          Powered by Gemini 3.1 Pro
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-display font-extrabold tracking-tight leading-[0.9]"
        >
          Study Smarter <br />
          <span className="gradient-text">AI Architecture</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Transform your notes, PDFs, or topics into interactive quizzes instantly. 
          Perfect for exam prep, competitive exams, and self-study.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link
            to="/generate"
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_10px_30px_rgba(6,182,212,0.4)] transition-all text-white group"
          >
            Create New Session
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto px-10 py-5 glass rounded-2xl border border-white/10 hover:bg-white/10 font-bold transition-all"
          >
            System Info
          </Link>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 pt-10"
        >
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-cyan-400">
                {item.icon}
              </div>
              {item.label}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="glass-card relative overflow-hidden group"
          >
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${feature.color}`} />
            <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Social Proof / Stats */}
      <section className="max-w-5xl mx-auto w-full py-12 px-4 rounded-[2rem] glass-card flex flex-wrap justify-around items-center gap-10 text-center">
        <div>
          <h4 className="text-3xl font-bold gradient-text">99.9%</h4>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mt-1">Accuracy</p>
        </div>
        <div className="hidden sm:block w-px h-10 bg-white/10" />
        <div>
          <h4 className="text-3xl font-bold gradient-text">10+</h4>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mt-1">Question Types</p>
        </div>
        <div className="hidden sm:block w-px h-10 bg-white/10" />
        <div>
          <h4 className="text-3xl font-bold gradient-text">24/7</h4>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mt-1">AI Support</p>
        </div>
      </section>
    </div>
  );
}

function Sparkles(props: any) {
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
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

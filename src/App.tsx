import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, FlaskConical, Hash, User, ChevronRight, Beaker, Layers, Atom, Zap, Activity, Waves, Battery, Grid, Leaf, ArrowLeft, TrendingUp, Award, Clock, Calendar, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Module, UserProgress, LabExperiment } from './types';
import { Simulation } from './components/Simulation';
import { Quiz } from './components/Quiz';
import { Calculators } from './components/Calculators';
import { FrequencyDeck } from './components/FrequencyDeck';
import { MODULES as LOCAL_MODULES } from './data';
import { LAB_EXPERIMENTS as LOCAL_LABS } from './labData';

const iconMap: Record<string, any> = {
  Beaker, Layers, Atom, Zap, Activity, Waves, Battery, Hash, Grid, Leaf
};

export default function App() {
  const [modules, setModules] = useState<Module[]>([]);
  const [labs, setLabs] = useState<LabExperiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'learn' | 'lab' | 'formula' | 'profile'>('learn');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLab, setSelectedLab] = useState<LabExperiment | null>(null);
  const [moduleView, setModuleView] = useState<'concept' | 'notes' | 'ppt' | 'test'>('concept');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('chemsoul_progress');
    const defaultProfile = {
      name: 'Chandan Kaushik',
      university: 'Dr. A.P.J. Abdul Kalam Technical University',
      branch: 'Chemical Engineering / Chemistry Enthusiast',
      year: 'B.Tech Student',
      bio: 'Building a modern chemistry learning experience with curiosity, consistency, and practical understanding. Guided by Mrs. Rajni Verma.',
      email: 'chandan@example.com'
    };
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        completedModules: parsed.completedModules || [],
        quizScores: parsed.quizScores || {},
        completionHistory: parsed.completionHistory || [],
        userNotes: parsed.userNotes || {},
        profile: parsed.profile || defaultProfile
      };
    }
    return { completedModules: [], quizScores: {}, completionHistory: [], userNotes: {}, profile: defaultProfile };
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState(progress.profile);

  const saveUserNote = (moduleId: string, content: string) => {
    setProgress(prev => ({
      ...prev,
      userNotes: {
        ...prev.userNotes,
        [moduleId]: content
      }
    }));
  };

  // Track whether this is the first render to avoid overwriting localStorage on mount
  const isFirstRender = useRef(true);

  useEffect(() => {
    setModules(LOCAL_MODULES as Module[]);
    setLabs(LOCAL_LABS as LabExperiment[]);
    setLoading(false);
  }, []);

  // Persist progress to localStorage only; the app is frontend-only.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('chemsoul_progress', JSON.stringify(progress));
  }, [progress]);

  const updateProfile = () => {
    setProgress(prev => ({ ...prev, profile: editProfileData }));
    setIsEditingProfile(false);
  };

  const getModuleProgress = (moduleId: string) => {
    const module = modules.find((item) => item.id === moduleId);
    const completed = (progress.completedModules || []).includes(moduleId);
    const score = progress.quizScores[moduleId];

    if (completed) return 100;
    if (score !== undefined && module) {
      return Math.min(95, Math.round((score / Math.max(1, module.quiz.length)) * 100));
    }
    return 0;
  };

  const downloadTextFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadModuleNotes = (module: Module) => {
    const content = [
      `CHEMSOUL MODULE NOTES: ${module.title}`,
      '',
      `Description: ${module.description}`,
      '',
      'Topics:',
      ...module.topics.map((topic) => `- ${topic}`),
      '',
      'Study Notes:',
      ...module.notes.map((note, index) => `${index + 1}. ${note}`),
      '',
      'Prepared for offline study.'
    ].join('\n');
    downloadTextFile(`${module.id}-notes.txt`, content);
  };

  const downloadStudyPack = (module: Module) => {
    const content = [
      `CHEMSOUL STUDY PACK: ${module.title}`,
      '',
      `Description: ${module.description}`,
      '',
      'Concept Summary:',
      module.explanation,
      '',
      'Key Topics:',
      ...module.topics.map((topic) => `- ${topic}`),
      '',
      'Important Notes:',
      ...module.notes.map((note, index) => `${index + 1}. ${note}`),
      '',
      'Test Questions:',
      ...module.testPaper.map((q, index) => `${index + 1}. ${q.text}`)
    ].join('\n');
    downloadTextFile(`${module.id}-study-pack.txt`, content);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditProfileData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuizComplete = (moduleId: string, score: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    setProgress(prev => {
      const isNewCompletion = !prev.completedModules.includes(moduleId);
      const newHistory = [...(prev.completionHistory || [])];
      
      if (isNewCompletion) {
        const existingDay = newHistory.find(h => h.date === today);
        if (existingDay) {
          existingDay.count += 1;
        } else {
          newHistory.push({ date: today, count: 1 });
        }
      }

      return {
        ...prev,
        completedModules: isNewCompletion ? [...prev.completedModules, moduleId] : prev.completedModules,
        quizScores: { ...prev.quizScores, [moduleId]: score },
        completionHistory: newHistory
      };
    });
  };

  const renderLearn = () => (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b-3 border-black gap-4">
        <div>
          <h1 className="text-6xl font-display font-bold text-black tracking-tight">ChemSoul</h1>
          <p className="text-text-secondary text-lg font-medium mt-1">
            Welcome back, <span className="text-black font-bold underline decoration-[#ffb703] decoration-3">{progress.profile.name.split(' ')[0]}</span>! Ready to master more chemistry?
          </p>
          <p className="text-sm font-semibold text-[#d48c00] mt-2">
            Project by Chandan Kaushik under the guidance of Mrs. Rajni Verma.
          </p>
        </div>
        <div 
          onClick={() => setActiveTab('profile')}
          className="w-16 h-16 rounded-full border-2.5 border-black bg-white overflow-hidden cursor-pointer hover:scale-105 transition-all shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[4px_4px_0px_#1a1a1a] shrink-0"
        >
          {progress.profile.avatar ? (
            <img src={progress.profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#e1d5f5]">
              <User size={28} className="text-black" />
            </div>
          )}
        </div>
      </header>

      {/* Grid of Modules */}
      <div className="grid gap-6">
        {modules.map((module, idx) => {
          const colors = ['#ffd3d6', '#a2eae6', '#fff0a2', '#e1d5f5', '#ffb085', '#c9f2c9'];
          const cardAccentColor = colors[idx % colors.length];
          const progressPercent = getModuleProgress(module.id);
          const isCompleted = progressPercent === 100;
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => { setSelectedModule(module); setModuleView('concept'); }}
              className="glass-card p-6 flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-6">
                <div 
                  className="w-16 h-16 rounded-2xl border-2.5 border-black flex items-center justify-center text-black shadow-[3px_3px_0px_#1a1a1a] transition-all duration-200 group-hover:scale-105"
                  style={{ backgroundColor: cardAccentColor }}
                >
                  {React.createElement(iconMap[module.methodologies[0].icon] || Beaker, { size: 32 })}
                </div>
                <div className="flex-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#d48c00] font-bold">{module.label}</span>
                  <h3 className="text-2xl font-display font-bold text-black mt-0.5">{module.title}</h3>
                  <p className="text-text-secondary text-sm font-semibold line-clamp-1">{module.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full border-2 border-black bg-white overflow-hidden">
                      <div className="h-full rounded-full bg-[#ffb703]" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{isCompleted ? 'Completed' : `${progressPercent}%`}</span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border-2.5 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_#1a1a1a] group-hover:bg-[#ffb703] group-hover:translate-x-1 transition-all shrink-0">
                <ChevronRight className="text-black animate-none" size={20} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderLab = () => {
    if (selectedLab) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 pb-24"
        >
          {/* Header with Back button */}
          <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b-3 border-black gap-4">
            <button 
              onClick={() => setSelectedLab(null)}
              className="gold-btn px-5 py-2.5 text-sm shrink-0"
            >
              <ArrowLeft size={16} /> BACK TO LABS
            </button>
            <div className="text-left md:text-right">
              <h1 className="text-4xl font-display font-bold text-black leading-tight">{selectedLab.title}</h1>
              <p className="text-text-secondary text-sm font-semibold uppercase tracking-wider mt-1">Virtual Lab Exercise</p>
            </div>
          </header>

          <div className="space-y-8">
            {/* Aim */}
            <div className="glass-card p-6 border-l-8 border-l-[#ffb703] bg-white">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-2 text-black font-display uppercase tracking-wider">
                <Activity size={20} className="text-black" /> AIM
              </h3>
              <p className="text-text-secondary text-base font-semibold">{selectedLab.aim}</p>
            </div>

            {/* Apparatus & Chemicals Side-by-Side */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6 bg-white">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3 text-black font-display uppercase tracking-wider">
                  <Layers size={20} className="text-black" /> APPARATUS
                </h3>
                <ul className="space-y-2 text-text-secondary font-bold">
                  {selectedLab.apparatus.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full border border-black bg-[#ffb085] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-6 bg-white">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3 text-black font-display uppercase tracking-wider">
                  <Beaker size={20} className="text-black" /> CHEMICALS
                </h3>
                <ul className="space-y-2 text-text-secondary font-bold">
                  {selectedLab.chemicals.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full border border-black bg-[#a2eae6] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Procedure styled like screenshot infographic */}
            <div className="glass-card p-8 bg-white">
              <h3 className="text-2xl font-display font-bold text-black uppercase tracking-wider">
                PROCEDURE
              </h3>
              <hr className="border-dashed border-t-2 border-black my-4" />
              <div className="space-y-4 mt-6">
                {selectedLab.procedure.map((step, i) => {
                  const colors = ['badge-teal', 'badge-pink', 'badge-yellow', 'badge-purple', 'badge-orange', 'badge-green'];
                  const badgeClass = colors[i % colors.length];
                  return (
                    <div key={i} className="glass-card p-5 flex gap-5 items-start bg-white hover:translate-y-0 shadow-[3px_3px_0px_#1a1a1a]">
                      <div className={`comic-badge ${badgeClass} mt-1`}>
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-black font-display text-lg mb-1">Step {i + 1}</h4>
                        <p className="text-text-secondary font-semibold leading-relaxed">{step}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Observations */}
            <div className="glass-card p-6 bg-white">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-3 text-black font-display uppercase tracking-wider">
                <Activity size={20} className="text-black" /> OBSERVATIONS
              </h3>
              <ul className="space-y-2.5 text-text-secondary font-bold">
                {selectedLab.observations.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start bg-slate-50 p-3 border-2 border-black rounded-xl shadow-[1.5px_1.5px_0px_#1a1a1a]">
                    <span className="text-black font-bold mr-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Result */}
            <div className="glass-card p-6 border-l-8 border-l-[#8ecee6] bg-white">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-2 text-black font-display uppercase tracking-wider">
                <Award size={20} className="text-black" /> RESULT
              </h3>
              <p className="text-text-secondary text-base font-bold italic">{selectedLab.result}</p>
            </div>

            {/* Precautions */}
            <div className="glass-card p-6 border-2.5 border-black bg-[#ffd3d6] shadow-[4px_4px_0px_#1a1a1a] hover:translate-y-0">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-3 text-red-600 font-display uppercase tracking-wider">
                <Zap size={20} /> PRECAUTIONS
              </h3>
              <ul className="space-y-2 text-text-secondary font-bold">
                {selectedLab.precautions.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-red-500 font-bold mr-1">⚠️</span>
                    <span className="text-black">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <div className="space-y-8 pb-24">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b-3 border-black">
          <div>
            <h1 className="text-6xl font-display font-bold text-black tracking-tight">Virtual Lab Exercises</h1>
            <p className="text-text-secondary text-lg font-medium mt-1">
              Practical applications and experimental procedures
            </p>
          </div>
        </header>

        <div className="grid gap-4">
          {labs.map((exercise, idx) => {
            const colors = ['badge-teal', 'badge-pink', 'badge-yellow', 'badge-purple', 'badge-orange', 'badge-green'];
            const badgeClass = colors[idx % colors.length];
            return (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedLab(exercise)}
                className="glass-card p-5 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`comic-badge ${badgeClass}`}>
                    {idx + 1}
                  </div>
                  <span className="text-lg font-bold text-black group-hover:text-[#d48c00] transition-colors">{exercise.title}</span>
                  {['dissolved-oxygen', 'coal-analysis', 'flash-fire-point', 'alkalinity-water', 'chloride-mohr', 'saponification-value'].includes(exercise.id) && (
                    <span className="px-2.5 py-0.5 border-2 border-black bg-[#ffb085] text-black text-[10px] font-bold rounded-full uppercase tracking-wider shadow-[1.5px_1.5px_0px_#1a1a1a]">New</span>
                  )}
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_#1a1a1a] group-hover:bg-[#ffb703] transition-all">
                  <ChevronRight className="text-black" size={20} />
                </div>
              </motion.div>
            );
          })}
          
          {/* Curriculum Exercises */}
          <div className="mt-8 pt-8 border-t-3 border-dashed border-black">
            <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-4 font-display">Additional Curriculum Exercises</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {["Saponification/acid value of an oil", "Lattice structures and packing of spheres", "Chemical oscillations - Iodine clock reaction", "Determination of the partition coefficient", "Adsorption of acetic acid by charcoal", "Determination of melting point of organic compounds", "Isoelectric point demonstration using viscometers"].map((ex, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#1a1a1a] flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-black bg-[#ffb703]" />
                  <span className="text-sm font-bold text-black">{ex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const downloadTestPaper = (module: Module) => {
    const content = `TEST PAPER: ${module.title}\n\n` + 
      module.testPaper.map((q, i) => {
        return `${i + 1}. ${q.text}\n` + 
          q.options.map((opt, oi) => `   ${String.fromCharCode(65 + oi)}) ${opt}`).join('\n') + 
          `\n   Correct Answer: ${String.fromCharCode(65 + q.correctIndex)}\n`;
      }).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${module.id}-test-paper.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderModuleDetail = (module: Module) => {
    const progressPercent = getModuleProgress(module.id);
    const isCompleted = progressPercent === 100;
    const score = progress.quizScores[module.id];

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8 pb-24"
      >
        {/* Header with back button */}
        <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b-3 border-black gap-4">
          <button 
            onClick={() => setSelectedModule(null)}
            className="gold-btn px-5 py-2.5 text-sm shrink-0"
          >
            <ArrowLeft size={16} /> BACK TO MODULES
          </button>
          <div className="text-left md:text-right">
            <span className="text-[11px] uppercase tracking-widest text-[#d48c00] font-bold">{module.label}</span>
            <h1 className="text-4xl font-display font-bold text-black leading-tight mt-1">{module.title}</h1>
          </div>
        </header>

        {/* Hero Info Card */}
        <div className="glass-card p-8 bg-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-text-secondary text-lg font-bold max-w-3xl leading-relaxed">{module.description}</p>
          </div>
        </div>

        {/* Syllabus Tags */}
        <div className="glass-card p-6 bg-white">
          <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-4 font-display">Syllabus Coverage</h3>
          <div className="flex flex-wrap gap-2">
            {module.topics.map((topic, i) => {
              const pastelColors = ['#ffd3d6', '#a2eae6', '#fff0a2', '#e1d5f5', '#ffb085', '#c9f2c9'];
              const tagColor = pastelColors[i % pastelColors.length];
              return (
                <span 
                  key={i} 
                  className="px-3.5 py-1.5 border-2 border-black rounded-full text-xs font-bold text-black shadow-[1.5px_1.5px_0px_#1a1a1a]"
                  style={{ backgroundColor: tagColor }}
                >
                  {topic}
                </span>
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glass-card p-6 bg-white">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-black uppercase tracking-wider">Module Progress</span>
            <span className="text-black font-bold uppercase tracking-wider">{progressPercent}% Complete</span>
          </div>
          <div className="h-5 bg-white border-2 border-black rounded-full overflow-hidden p-0.5 shadow-[1.5px_1.5px_0px_#1a1a1a]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-[#ffb703] rounded-full border-r border-black"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs Navigation */}
            <div className="flex gap-3 border-b-3 border-dashed border-black pb-5 overflow-x-auto">
              {[
                { id: 'concept', label: 'CONCEPT' },
                { id: 'notes', label: 'STUDY NOTES' },
                { id: 'ppt', label: 'PPT RESOURCES' },
                { id: 'test', label: 'TEST PAPER' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setModuleView(tab.id as any)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold border-2 border-black shadow-[2.5px_2.5px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a] transition-all shrink-0 ${moduleView === tab.id ? 'bg-[#ffb703] text-black translate-y-[-1px]' : 'bg-white text-black hover:bg-slate-50'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {moduleView === 'concept' && (
              <>
                {/* Concept Framework */}
                <div className="glass-card p-8 bg-white">
                  <h2 className="text-2xl font-display font-bold mb-4 text-black uppercase tracking-wider">Conceptual Framework</h2>
                  <p className="text-text-secondary leading-relaxed text-base font-semibold">
                    {module.explanation}
                  </p>
                </div>

                {/* Interactive Simulator */}
                <div className="glass-card p-6 bg-white">
                  {module.id === 'spectroscopy' ? (
                    <FrequencyDeck />
                  ) : (
                    <>
                      <h2 className="text-2xl font-display font-bold mb-4 text-black uppercase tracking-wider">Visual Simulation</h2>
                      <Simulation type={module.simulationType} />
                      <p className="text-center text-xs text-text-secondary mt-4 uppercase tracking-widest font-bold">Interactive Real-time Visualization</p>
                    </>
                  )}
                </div>

                {/* Methodologies */}
                <div className="grid md:grid-cols-2 gap-6">
                  {module.methodologies.map((m, i) => {
                    const colors = ['#ffd3d6', '#a2eae6', '#fff0a2', '#e1d5f5', '#ffb085', '#c9f2c9'];
                    const color = colors[i % colors.length];
                    return (
                      <div 
                        key={i} 
                        className="glass-card p-6 bg-white"
                        style={{ borderLeftWidth: '8px', borderLeftColor: color }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#1a1a1a]" style={{ backgroundColor: color }}>
                            {React.createElement(iconMap[m.icon] || Beaker, { size: 20 })}
                          </div>
                          <h3 className="font-bold text-lg text-black font-display">{m.title}</h3>
                        </div>
                        <p className="text-text-secondary text-sm font-semibold">{m.description}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {moduleView === 'notes' && (
              <div className="space-y-6">
                <div className="glass-card p-8 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-black uppercase tracking-wider">Chapter Summary & Notes</h2>
                    <p className="text-text-secondary text-sm font-semibold">Comprehensive study material for {module.title}</p>
                  </div>
                  <button 
                    onClick={() => downloadModuleNotes(module)}
                    className="gold-btn px-4 py-2.5 text-xs"
                  >
                    <Download size={14} /> DOWNLOAD NOTES
                  </button>
                </div>
                <div className="space-y-4">
                  {module.notes?.map((note, i) => {
                    const colors = ['badge-teal', 'badge-pink', 'badge-yellow', 'badge-purple', 'badge-orange', 'badge-green'];
                    const badgeClass = colors[i % colors.length];
                    return (
                      <div key={i} className="glass-card p-6 flex gap-4 bg-white hover:translate-y-0 shadow-[3px_3px_0px_#1a1a1a]">
                        <div className={`comic-badge ${badgeClass}`}>
                          {i + 1}
                        </div>
                        <p className="text-text-secondary font-semibold leading-relaxed self-center">{note}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {moduleView === 'ppt' && (
              <div className="space-y-6">
                <div className="glass-card p-8 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-black uppercase tracking-wider">Lecture Resources</h2>
                    <p className="text-text-secondary text-sm font-semibold">Visual slides and presentation materials for {module.title}</p>
                  </div>
                  <button 
                    onClick={() => downloadStudyPack(module)}
                    className="gold-btn px-4 py-2.5 text-xs"
                  >
                    <Download size={14} /> DOWNLOAD PACK
                  </button>
                </div>
                <div className="glass-card p-8 bg-white text-center border-dashed border-3 border-black shadow-none hover:translate-y-0">
                  <Layers size={48} className="mx-auto mb-4 text-[#ffb703]" />
                  <h3 className="text-xl font-bold text-black mb-2 font-display">Module Presentation Available</h3>
                  <p className="text-text-secondary text-sm font-semibold mb-4">Complete lecture slide deck covering all subtopics including chemical formulations, properties, and applications.</p>
                  <button 
                    onClick={() => downloadStudyPack(module)}
                    className="inline-flex gold-btn text-xs px-5 py-2.5"
                  >
                    Download Study Pack
                  </button>
                </div>
              </div>
            )}

            {moduleView === 'test' && (
              <div className="space-y-6">
                <div className="glass-card p-8 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-black uppercase tracking-wider">Module Test Paper</h2>
                    <p className="text-text-secondary text-sm font-semibold">10 Questions to test your mastery of {module.title}</p>
                  </div>
                  <button 
                    onClick={() => downloadTestPaper(module)}
                    className="gold-btn px-4 py-2.5 text-xs"
                  >
                    <Download size={14} /> DOWNLOAD PAPER
                  </button>
                </div>
                <div className="space-y-6">
                  {module.testPaper.map((q, i) => (
                    <div key={q.id} className="glass-card p-6 bg-white hover:translate-y-0 shadow-[3px_3px_0px_#1a1a1a]">
                      <div className="flex gap-4 items-start">
                        <span className="comic-badge badge-teal mt-0.5">Q{i + 1}</span>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-black font-display mt-2 leading-snug">{q.text}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                            {q.options.map((opt, oi) => (
                              <div key={oi} className="p-3 border-2 border-black rounded-xl bg-white text-sm font-bold text-black shadow-[1.5px_1.5px_0px_#1a1a1a]">
                                <span className="text-[#d48c00] font-bold mr-2">{String.fromCharCode(65 + oi)}.</span>
                                {opt}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {/* Knowledge Check Sticky Box */}
            <div className="glass-card p-6 sticky top-8 bg-white">
              <h2 className="text-2xl font-display font-bold mb-4 text-black uppercase tracking-wider">Knowledge Check</h2>
              <Quiz 
                questions={module.quiz} 
                onComplete={(score) => handleQuizComplete(module.id, score)} 
              />
              {score !== undefined && (
                <div className="mt-6 pt-6 border-t-2 border-dashed border-black text-center">
                  <p className="text-xs text-text-secondary uppercase tracking-widest font-bold">Previous Best Score</p>
                  <p className="text-3xl font-display font-bold text-black mt-1">
                    <span className="underline decoration-[#ffb703] decoration-4">{score}</span> / {module.quiz.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderProfile = () => {
    const scores = Object.entries(progress.quizScores || {}) as [string, number][];
    const totalPossible = scores.reduce((acc, [id, _]) => {
      const module = modules.find(m => m.id === id);
      return acc + (module?.quiz.length || 0);
    }, 0);
    const totalEarned = scores.reduce((acc, [_, score]) => acc + score, 0);
    const avgScore = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;
    const totalPoints = totalEarned;
    const completionRate = Math.round(((progress.completedModules || []).length / (modules.length || 1)) * 100);

    const calculateStreak = () => {
      if (!progress.completionHistory || progress.completionHistory.length === 0) return 0;
      const sortedHistory = [...progress.completionHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      let streak = 0;
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      for (const entry of sortedHistory) {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === streak) {
          streak++;
        } else if (diffDays > streak) {
          break;
        }
      }
      return streak;
    };

    const streak = calculateStreak();

    // Mock data for chart if history is empty
    const chartData = (progress.completionHistory && progress.completionHistory.length > 0) 
      ? progress.completionHistory 
      : [
          { date: '2024-03-10', count: 0 },
          { date: '2024-03-11', count: 1 },
          { date: '2024-03-12', count: 0 },
          { date: '2024-03-13', count: 2 },
          { date: '2024-03-14', count: 1 },
          { date: '2024-03-15', count: 0 },
        ];

    return (
      <div className="space-y-8 pb-24">
        {/* Profile Card */}
        <div className="glass-card p-8 bg-white relative overflow-hidden hover:translate-y-0">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group shrink-0">
              <div className="w-32 h-32 rounded-full border-3 border-black bg-white flex items-center justify-center overflow-hidden shadow-[4px_4px_0px_#1a1a1a]">
                {progress.profile.avatar ? (
                  <img src={progress.profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#ffd3d6] flex items-center justify-center text-black">
                    <User size={64} className="text-black" />
                  </div>
                )}
              </div>
              <button 
                onClick={() => { setEditProfileData(progress.profile); setIsEditingProfile(true); }}
                className="absolute bottom-0 right-0 w-10 h-10 bg-[#ffb703] text-black border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_#1a1a1a] hover:scale-105 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a] transition-all"
              >
                <Activity size={20} />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div>
                  <h1 className="text-4xl font-display font-bold text-black">{progress.profile.name}</h1>
                  <p className="text-[#d48c00] font-bold uppercase tracking-widest text-xs mt-1">{progress.profile.year} • {progress.profile.branch}</p>
                </div>
                <button 
                  onClick={() => { setEditProfileData(progress.profile); setIsEditingProfile(true); }}
                  className="inline-flex gold-btn px-5 py-2 text-xs"
                >
                  Edit Profile
                </button>
              </div>
              <p className="text-text-secondary font-semibold leading-relaxed max-w-2xl">{progress.profile.bio}</p>
              <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-xs font-bold text-black border-2 border-black px-3 py-1.5 rounded-xl bg-[#fff0a2] shadow-[1.5px_1.5px_0px_#1a1a1a]">
                  <Award size={14} className="text-black" />
                  Built by Chandan Kaushik • Guided by Mrs. Rajni Verma
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-black border-2 border-black px-3 py-1.5 rounded-xl bg-[#e1d5f5] shadow-[1.5px_1.5px_0px_#1a1a1a]">
                  <BookOpen size={14} className="text-black" />
                  {progress.profile.university}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-black border-2 border-black px-3 py-1.5 rounded-xl bg-[#a2eae6] shadow-[1.5px_1.5px_0px_#1a1a1a]">
                  <User size={14} className="text-black" />
                  {progress.profile.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Modal */}
        {isEditingProfile && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-6 bg-white"
            >
              <h2 className="text-3xl font-display font-bold text-black uppercase tracking-wider border-b-2 border-black pb-3">Edit Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black font-bold mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={editProfileData.name} 
                      onChange={(e) => setEditProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black font-bold mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={editProfileData.email} 
                      onChange={(e) => setEditProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black font-bold mb-1">University</label>
                    <input 
                      type="text" 
                      value={editProfileData.university} 
                      onChange={(e) => setEditProfileData(prev => ({ ...prev, university: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black font-bold mb-1">Academic Year</label>
                    <select 
                      value={editProfileData.year} 
                      onChange={(e) => setEditProfileData(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full"
                    >
                      <option value="First Year B.Tech">First Year B.Tech</option>
                      <option value="Second Year B.Tech">Second Year B.Tech</option>
                      <option value="Third Year B.Tech">Third Year B.Tech</option>
                      <option value="Fourth Year B.Tech">Fourth Year B.Tech</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black font-bold mb-1">Branch</label>
                    <input 
                      type="text" 
                      value={editProfileData.branch} 
                      onChange={(e) => setEditProfileData(prev => ({ ...prev, branch: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black font-bold mb-1">Profile Picture</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="w-full text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-black font-bold mb-1">Short Bio</label>
                <textarea 
                  value={editProfileData.bio} 
                  onChange={(e) => setEditProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full h-24 resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t-2 border-dashed border-black">
                <button 
                  onClick={updateProfile}
                  className="flex-1 gold-btn"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 py-3 border-2 border-black rounded-xl text-black font-bold bg-white hover:bg-slate-50 shadow-[3px_3px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a] transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Mastered', value: (progress.completedModules || []).length, icon: Award, color: 'badge-teal' },
            { label: 'Avg Accuracy', value: `${avgScore}%`, icon: TrendingUp, color: 'badge-pink' },
            { label: 'Total Points', value: totalPoints, icon: Clock, color: 'badge-yellow' },
            { label: 'Study Streak', value: `${streak} Days`, icon: Calendar, color: 'badge-purple' },
            { label: 'Completion', value: `${completionRate}%`, icon: TrendingUp, color: 'badge-green' }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center bg-white shadow-[3px_3px_0px_#1a1a1a]">
              <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-2 ${stat.color} shadow-[1.5px_1.5px_0px_#1a1a1a]`}>
                <stat.icon size={20} className="text-black" />
              </div>
              <span className="text-3xl font-display font-bold text-black">{stat.value}</span>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary mt-1 font-bold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Learning Momentum Chart */}
        <div className="glass-card p-8 bg-white hover:translate-y-0 shadow-[4px_4px_0px_#1a1a1a]">
          <h2 className="text-2xl font-display font-bold mb-6 text-black uppercase tracking-wider">Learning Momentum</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e0" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#1a1a1a" 
                  fontSize={11}
                  tickFormatter={(str) => str.split('-').slice(1).join('/')}
                />
                <YAxis stroke="#1a1a1a" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #1a1a1a', borderRadius: '8px', boxShadow: '2px 2px 0px #1a1a1a' }}
                  itemStyle={{ color: '#1a1a1a', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#ffb703" 
                  fillOpacity={0.2} 
                  fill="#ffb703" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Certificates */}
        <div className="glass-card p-8 bg-white hover:translate-y-0 shadow-[4px_4px_0px_#1a1a1a]">
          <h2 className="text-2xl font-display font-bold mb-6 text-black uppercase tracking-wider">My Certificates</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {modules.map(m => {
              const completed = (progress.completedModules || []).includes(m.id);
              return (
                <div 
                  key={m.id} 
                  className={`p-6 rounded-2xl border-2.5 border-black flex flex-col justify-between h-48 relative overflow-hidden transition-all ${completed ? 'bg-[#c9f2c9] shadow-[3px_3px_0px_#1a1a1a]' : 'bg-[#fff0a2]/20 border-dashed opacity-75'}`}
                >
                  <div>
                    <Award size={32} className="text-black mb-3" />
                    <h3 className="font-bold text-lg leading-tight text-black font-display">{m.title}</h3>
                    <p className="text-xs text-text-secondary mt-1 uppercase tracking-widest font-bold">Completion Certificate</p>
                  </div>
                  {completed ? (
                    <button 
                      onClick={() => alert(`Generating certificate for ${m.title}... (Demo Feature)`)}
                      className="mt-4 w-full py-2 border-2 border-black bg-white text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-colors shadow-[2px_2px_0px_#1a1a1a]"
                    >
                      Download PDF
                    </button>
                  ) : (
                    <div className="mt-4 text-[10px] text-text-secondary uppercase tracking-widest font-bold">
                      Complete module to unlock
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Resources */}
        <div className="glass-card p-8 bg-white hover:translate-y-0 shadow-[4px_4px_0px_#1a1a1a]">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-black uppercase tracking-wider">Quick Resources</h2>
            <a 
              href="https://example.com/pdf/full-syllabus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn px-4 py-2.5 text-xs"
            >
              Download Full Syllabus
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {modules.map(m => (
              <div key={m.id} className="space-y-3">
                <a 
                  href={m.pptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-black hover:bg-slate-50 transition-colors group shadow-[2.5px_2.5px_0px_#1a1a1a]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg border-2 border-black bg-[#ffd3d6] flex items-center justify-center text-black group-hover:scale-105 transition-transform">
                      <Layers size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black">{m.title}</p>
                      <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Lecture Slides (PPTX)</p>
                    </div>
                  </div>
                  <Download size={16} className="text-black" />
                </a>
                <a 
                  href={m.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-black hover:bg-slate-50 transition-colors group shadow-[2.5px_2.5px_0px_#1a1a1a]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg border-2 border-black bg-[#a2eae6] flex items-center justify-center text-black group-hover:scale-105 transition-transform">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black">{m.title}</p>
                      <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Chapter Notes (PDF)</p>
                    </div>
                  </div>
                  <Download size={16} className="text-black" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Study Notes */}
        <div className="glass-card p-8 bg-white hover:translate-y-0 shadow-[4px_4px_0px_#1a1a1a]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-black uppercase tracking-wider">My Personal Study Notes</h2>
            <span className="text-[10px] uppercase tracking-widest text-[#d48c00] font-bold flex items-center gap-1">
              <Clock size={10} /> Auto-saved to local storage
            </span>
          </div>
          <div className="space-y-6">
            {modules.map(m => (
              <div key={m.id} className="space-y-4">
                <div className="flex items-center gap-2 text-black">
                  <BookOpen size={18} className="text-black" />
                  <h3 className="font-bold uppercase tracking-wider text-sm font-display">{m.title}</h3>
                </div>
                <div className="bg-white rounded-xl overflow-hidden border-2 border-black shadow-[2.5px_2.5px_0px_#1a1a1a]">
                  <textarea 
                    value={(progress.userNotes || {})[m.id] || ''} 
                    onChange={(e) => saveUserNote(m.id, e.target.value)}
                    placeholder={`Add your notes for ${m.title}...`}
                    className="w-full h-48 bg-transparent text-black placeholder:text-[#888888] focus:outline-none resize-none font-sans p-4 leading-relaxed font-bold border-none shadow-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div className="glass-card p-8 bg-white hover:translate-y-0 shadow-[4px_4px_0px_#1a1a1a]">
          <h2 className="text-2xl font-display font-bold mb-6 text-black uppercase tracking-wider">Learning Path</h2>
          <div className="space-y-4">
            {modules.map(m => {
              const completed = (progress.completedModules || []).includes(m.id);
              return (
                <div key={m.id} className="flex items-center justify-between p-4 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#1a1a1a]">
                  <div className="flex items-center gap-4">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 border-black ${completed ? 'bg-[#ffb703]' : 'bg-white'}`} />
                    <span className="font-bold text-black">{m.title}</span>
                  </div>
                  {completed && (
                    <div className="flex items-center gap-2 bg-[#c9f2c9] px-2.5 py-1 border-2 border-black rounded-full shadow-[1px_1px_0px_#1a1a1a]">
                      <Award size={14} className="text-black" />
                      <span className="text-[10px] text-black font-bold uppercase">Mastered</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset Progress */}
        <div className="glass-card p-8 border-red-500 bg-[#ffd3d6] hover:translate-y-0">
          <h2 className="text-2xl font-display font-bold text-red-600 mb-6 uppercase tracking-wider font-display">Danger Zone</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-white border-2 border-black rounded-2xl shadow-[3px_3px_0px_#1a1a1a]">
            <div>
              <h3 className="font-bold text-lg text-black font-display">Reset All Progress</h3>
              <p className="text-sm text-text-secondary font-semibold">This will permanently delete your scores, notes, and certificates.</p>
            </div>
            <button 
              onClick={() => {
                if (window.confirm('Are you absolutely sure? This cannot be undone.')) {
                  localStorage.removeItem('chemsoul_progress');
                  window.location.reload();
                }
              }}
              className="px-6 py-3 border-2 border-red-500 bg-white text-red-500 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#ffd3d6] transition-all shadow-[2.5px_2.5px_0px_#ef4444] active:translate-y-0.5 active:shadow-[1px_1px_0px_#ef4444] cursor-pointer"
            >
              Reset Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-black border-t-[#ffb703] rounded-full animate-spin mx-auto"></div>
          <p className="text-text-primary font-display font-bold animate-pulse uppercase tracking-widest text-sm">Initializing Backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary px-4 md:px-8 pt-8">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {selectedModule ? (
            renderModuleDetail(selectedModule)
          ) : (
            <>
              {activeTab === 'learn' && renderLearn()}
              {activeTab === 'formula' && <Calculators />}
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'lab' && renderLab()}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md nav-blur p-2.5 flex justify-around items-center z-50">
        <button 
          onClick={() => { setActiveTab('learn'); setSelectedModule(null); }}
          className={`flex flex-col items-center p-2.5 transition-all ${activeTab === 'learn' ? 'nav-item-active' : 'text-text-secondary font-bold'}`}
        >
          <BookOpen size={20} />
          <span className="text-[10px] uppercase tracking-widest mt-1 font-bold">Learn</span>
        </button>
        <button 
          onClick={() => { setActiveTab('lab'); setSelectedModule(null); }}
          className={`flex flex-col items-center p-2.5 transition-all ${activeTab === 'lab' ? 'nav-item-active' : 'text-text-secondary font-bold'}`}
        >
          <FlaskConical size={20} />
          <span className="text-[10px] uppercase tracking-widest mt-1 font-bold">Lab</span>
        </button>
        <button 
          onClick={() => { setActiveTab('formula'); setSelectedModule(null); }}
          className={`flex flex-col items-center p-2.5 transition-all ${activeTab === 'formula' ? 'nav-item-active' : 'text-text-secondary font-bold'}`}
        >
          <Hash size={20} />
          <span className="text-[10px] uppercase tracking-widest mt-1 font-bold">Formula</span>
        </button>
        <button 
          onClick={() => { setActiveTab('profile'); setSelectedModule(null); }}
          className={`flex flex-col items-center p-2.5 transition-all ${activeTab === 'profile' ? 'nav-item-active' : 'text-text-secondary font-bold'}`}
        >
          <User size={20} />
          <span className="text-[10px] uppercase tracking-widest mt-1 font-bold">Profile</span>
        </button>
      </nav>
    </div>
  );
}

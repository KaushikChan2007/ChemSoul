import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Zap, Thermometer, Radio, Activity, Share2, Info } from 'lucide-react';

export const FrequencyDeck: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'electronic' | 'ir' | 'nmr'>('electronic');
  const [frequency, setFrequency] = useState(450.28);
  const [intensity, setIntensity] = useState(88.4);
  const [phase, setPhase] = useState(0.12);
  const [isScanning, setIsScanning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulate resonance peaks
  useEffect(() => {
    const targetIntensity = 70 + Math.sin(frequency * 0.1) * 20 + Math.random() * 5;
    const targetPhase = 0.1 + Math.cos(frequency * 0.05) * 0.05;
    
    const timer = setTimeout(() => {
      setIntensity(prev => prev + (targetIntensity - prev) * 0.1);
      setPhase(prev => prev + (targetPhase - prev) * 0.1);
    }, 50);

    return () => clearTimeout(timer);
  }, [frequency]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw paper background
      ctx.fillStyle = '#fcfbf9';
      ctx.fillRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(26, 26, 26, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 20; i++) {
        const x = (width / 19) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw waves (sketch style, solid colors, no glows)
      const drawWave = (color: string, offset: number, amp: number, freq: number, opacity: number, lineWidth = 2) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = lineWidth;
        
        for (let x = 0; x < width; x++) {
          const y = centerY + Math.sin(x * 0.01 * freq + time + offset) * amp * (intensity / 100);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      // Background decorative waves (thin black/grey sketch lines)
      drawWave('rgba(26, 26, 26, 0.15)', phase, 35, frequency / 100, 0.8, 1.5);
      drawWave('rgba(26, 26, 26, 0.25)', -phase, 30, frequency / 120, 0.8, 1.5);
      
      // Main active wave
      const mainColor = activeTab === 'electronic' ? '#ffb703' : activeTab === 'ir' ? '#ff7e7e' : '#8ecee6';
      drawWave(mainColor, 0, 42, frequency / 80, 1.0, 3.5);
      
      // Double stroke shadow line (classic comic style outline effect)
      ctx.globalAlpha = 0.5;
      drawWave('#1a1a1a', 0, 42, frequency / 80, 0.4, 1.5);
      ctx.globalAlpha = 1;

      // Scan line effect (dashed neobrutalist lines)
      if (isScanning) {
        const scanX = (Math.sin(time * 0.5) * 0.5 + 0.5) * width;
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(scanX, 0);
        ctx.lineTo(scanX, height);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Scan label
        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 9px "Comic Neue"';
        ctx.fillText('SCANNING', scanX + 6, 15);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [frequency, intensity, phase, activeTab, isScanning]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto bg-white p-6 rounded-2xl border-2.5 border-black shadow-[4px_4px_0px_#1a1a1a] relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center relative z-10 pb-4 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#fff0a2] rounded-xl flex items-center justify-center border-2 border-black shadow-[1.5px_1.5px_0px_#1a1a1a]">
            <Activity className="text-black w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-black font-display font-bold text-xl leading-tight tracking-tight">The Frequency Deck</h2>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border border-black bg-[#c9f2c9]" />
              <p className="text-[10px] text-text-secondary uppercase font-bold tracking-[0.15em]">Module 3: Spectroscopy</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsScanning(!isScanning)}
            className={`w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center transition-all shadow-[1.5px_1.5px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[0.5px_0.5px_0px_#1a1a1a] cursor-pointer ${isScanning ? 'bg-[#c9f2c9]' : 'bg-white hover:bg-slate-50'}`}
          >
            <Zap size={18} className="text-black" />
          </button>
          <button 
            onClick={() => alert("Frequency Deck: Tune the frequency range to find molecular resonance peaks.")}
            className="w-10 h-10 rounded-xl border-2 border-black bg-white flex items-center justify-center text-black hover:bg-slate-50 shadow-[1.5px_1.5px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[0.5px_0.5px_0px_#1a1a1a] cursor-pointer"
          >
            <Info size={18} />
          </button>
        </div>
      </div>

      {/* Hero Diagram Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-48 rounded-2xl overflow-hidden border-2.5 border-black shadow-[3px_3px_0px_#1a1a1a]"
      >
        <img 
          src="https://picsum.photos/seed/spectroscopy/1200/800" 
          alt="Resonance Field" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c9f2c9] border-2 border-black rounded-full shadow-[1.5px_1.5px_0px_#1a1a1a]">
            <div className="w-2.5 h-2.5 rounded-full border border-black bg-black animate-pulse" />
            <span className="text-[10px] font-bold text-black uppercase tracking-widest">Active Sim</span>
          </div>
          <h3 className="text-2xl font-display font-bold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Active Resonance Field</h3>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { id: 'electronic', label: 'Electronic', icon: Zap, color: 'bg-[#fff0a2]' },
          { id: 'ir', label: 'Infrared (IR)', icon: Thermometer, color: 'bg-[#ffd3d6]' },
          { id: 'nmr', label: 'Nuclear (NMR)', icon: Radio, color: 'bg-[#a2eae6]' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              relative flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border-2 border-black transition-all cursor-pointer shadow-[2.5px_2.5px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a]
              ${activeTab === tab.id 
                ? `${tab.color} text-black font-bold scale-102` 
                : 'bg-white text-black hover:bg-slate-50'}
            `}
          >
            <tab.icon size={22} className="text-black" />
            <span className="text-[10px] font-bold uppercase tracking-[0.1em]">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Display Box */}
      <div className="bg-white border-2 border-black rounded-2xl p-6 space-y-6 shadow-[3px_3px_0px_#1a1a1a]">
        <div className="text-center space-y-1">
          <p className="text-[11px] font-bold text-[#d48c00] uppercase tracking-[0.25em]">Target Resonance Frequency</p>
          <div className="flex items-baseline justify-center gap-2">
            <motion.h1 
              key={frequency}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-display font-bold text-black tracking-tighter"
            >
              {frequency.toFixed(2)}
            </motion.h1>
            <span className="text-lg font-display italic text-[#ffb703] font-bold">THz</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#ffd3d6] border-2 border-black rounded-2xl p-4 text-center shadow-[2px_2px_0px_#1a1a1a]">
            <p className="text-[10px] font-bold text-black uppercase tracking-wider mb-1">Signal Intensity</p>
            <p className="text-2xl font-display font-bold text-black">{intensity.toFixed(1)}%</p>
          </div>
          <div className="bg-[#e1d5f5] border-2 border-black rounded-2xl p-4 text-center shadow-[2px_2px_0px_#1a1a1a]">
            <p className="text-[10px] font-bold text-black uppercase tracking-wider mb-1">Phase Shift</p>
            <p className="text-2xl font-display font-bold text-black">{phase.toFixed(2)}π</p>
          </div>
        </div>

        {/* Wave Visualizer Canvas Box */}
        <div className="relative h-44 w-full bg-[#fcfbf9] rounded-2xl overflow-hidden border-2.5 border-black shadow-[2.5px_2.5px_0px_#1a1a1a]">
          <canvas ref={canvasRef} width={600} height={176} className="w-full h-full block" />
          <div className="absolute inset-x-0 bottom-4 flex justify-between px-6 text-[10px] font-bold uppercase tracking-widest text-black/50">
            <span>Low Freq</span>
            <span>Resonance Tuning</span>
            <span>High Freq</span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-2 px-1">
          <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase tracking-widest">
            <span>300 THz</span>
            <span>600 THz</span>
          </div>
          <input 
            type="range" 
            min="300" 
            max="600" 
            step="0.01"
            value={frequency}
            onChange={(e) => setFrequency(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Detail Explanations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-black border-l-8 border-l-[#c9f2c9] rounded-xl p-5 space-y-2 shadow-[2.5px_2.5px_0px_#1a1a1a]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#c9f2c9] border border-black rounded-lg flex items-center justify-center shadow-[1px_1px_0px_#1a1a1a]">
              <Activity size={14} className="text-black" />
            </div>
            <h4 className="text-black font-bold text-xs uppercase tracking-wider">Spectral Analysis</h4>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed font-semibold">
            Electronic transitions involve the movement of electrons between orbitals. Higher frequencies correlate with greater energy gaps in the molecular structure.
          </p>
        </div>

        <div className="bg-white border-2 border-black border-l-8 border-l-[#ffb085] rounded-xl p-5 space-y-2 shadow-[2.5px_2.5px_0px_#1a1a1a]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#ffb085] border border-black rounded-lg flex items-center justify-center shadow-[1px_1px_0px_#1a1a1a]">
              <Share2 size={14} className="text-black" />
            </div>
            <h4 className="text-black font-bold text-xs uppercase tracking-wider">Molecular Geometry</h4>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed font-semibold">
            Tuning the frequency helps identify specific functional groups by matching their unique resonance peaks within the spectrum.
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';

interface SimulationProps {
  type: 'ions' | 'orbitals' | 'spectrum' | 'galvanic' | 'graphene';
}

export const Simulation: React.FC<SimulationProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frequency, setFrequency] = useState(450.28);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 300;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      time += 0.02;
      
      // Draw canvas background in warm sketch-style off-white
      ctx.fillStyle = '#fcfbf9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw paper grid (neobrutalist detail)
      ctx.strokeStyle = 'rgba(26, 26, 26, 0.04)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (type === 'ions') {
        // Ion sequestration simulation in sketch style
        const ions = [
          { label: 'Ca²⁺', color: '#ffd3d6' },
          { label: 'Mg²⁺', color: '#a2eae6' },
          { label: 'Ca²⁺', color: '#fff0a2' }
        ];
        
        // Draw simple connection line indicating bonding/trapping
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.1, canvas.height * 0.5);
        ctx.lineTo(canvas.width * 0.9, canvas.height * 0.5);
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        ions.forEach((ion, i) => {
          const x = (Math.sin(time + i * 2) * 0.15 + 0.3 + i * 0.2) * canvas.width;
          const y = (Math.cos(time * 0.8 + i) * 0.12 + 0.5) * canvas.height;
          
          ctx.save();
          // Ion circle
          ctx.beginPath();
          ctx.arc(x, y, 28, 0, Math.PI * 2);
          ctx.fillStyle = ion.color;
          ctx.fill();
          ctx.strokeStyle = '#1a1a1a';
          ctx.lineWidth = 2.5;
          ctx.stroke();
          
          // Inner detail circle
          ctx.beginPath();
          ctx.arc(x, y, 22, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(26, 26, 26, 0.15)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Label
          ctx.fillStyle = '#1a1a1a';
          ctx.font = 'bold 13px "Comic Neue"';
          ctx.textAlign = 'center';
          ctx.fillText(ion.label, x, y + 4);
          ctx.restore();
        });
      } else if (type === 'orbitals') {
        // Orbital cloud with electrons in sketch style
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(time * 0.2);
        
        // Nucleus
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#ffb703';
        ctx.fill();
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        
        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 10px "Comic Neue"';
        ctx.textAlign = 'center';
        ctx.fillText('N+', 0, 3);

        // Orbitals (Dashed ellipses)
        for (let i = 0; i < 3; i++) {
          ctx.rotate(Math.PI / 3);
          ctx.beginPath();
          ctx.ellipse(0, 0, 45 + i * 22, 105 + i * 12, 0, 0, Math.PI * 2);
          ctx.strokeStyle = '#1a1a1a';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
          
          // Electron on orbit
          const ex = Math.cos(time * (1 + i * 0.4)) * (45 + i * 22);
          const ey = Math.sin(time * (1 + i * 0.4)) * (105 + i * 12);
          
          ctx.beginPath();
          ctx.arc(ex, ey, 7, 0, Math.PI * 2);
          ctx.fillStyle = i === 0 ? '#ffd3d6' : i === 1 ? '#a2eae6' : '#fff0a2';
          ctx.fill();
          ctx.strokeStyle = '#1a1a1a';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.restore();
      } else if (type === 'spectrum') {
        // Interactive spectrum wave lines (sketch style)
        const waveCount = 3;
        const spacing = canvas.height / (waveCount + 1);
        
        for (let i = 0; i < waveCount; i++) {
          ctx.beginPath();
          ctx.moveTo(0, spacing * (i + 1));
          
          for (let x = 0; x < canvas.width; x += 2) {
            const freqFactor = (frequency / 450) * (1 + i * 0.4);
            const y = spacing * (i + 1) + Math.sin(x * 0.045 * freqFactor + time * 2.5) * 22;
            ctx.lineTo(x, y);
          }
          
          // Flat thick colored stroke lines
          ctx.strokeStyle = i === 0 ? '#ffb703' : i === 1 ? '#8ecee6' : '#ffd3d6';
          ctx.lineWidth = 3.5;
          ctx.stroke();
          
          // Black sketch shadow line underneath for depth
          ctx.beginPath();
          ctx.moveTo(0, spacing * (i + 1) + 2);
          for (let x = 0; x < canvas.width; x += 4) {
            const freqFactor = (frequency / 450) * (1 + i * 0.4);
            const y = spacing * (i + 1) + Math.sin(x * 0.045 * freqFactor + time * 2.5) * 22 + 2.5;
            ctx.lineTo(x, y);
          }
          ctx.strokeStyle = '#1a1a1a';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      } else if (type === 'galvanic') {
        // Galvanic cell in hand-drawn diagram style
        const leftX = canvas.width * 0.3;
        const rightX = canvas.width * 0.7;
        const y = 140;

        // Beaker fluids (pastel fills)
        ctx.fillStyle = '#e9f8f7'; // zinc sulfate (teal tint)
        ctx.fillRect(leftX - 48, y + 20, 96, 98);
        ctx.fillStyle = '#fff9eb'; // copper sulfate (yellow tint)
        ctx.fillRect(rightX - 48, y + 20, 96, 98);

        // Beakers outlines
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(leftX - 50, y, 100, 120);
        ctx.strokeRect(rightX - 50, y, 100, 120);

        // Salt Bridge
        ctx.beginPath();
        ctx.moveTo(leftX + 15, y + 40);
        ctx.lineTo(leftX + 15, y + 10);
        ctx.lineTo(rightX - 15, y + 10);
        ctx.lineTo(rightX - 15, y + 40);
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#f1f1f1';
        ctx.stroke();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#1a1a1a';
        ctx.stroke();

        // Electrodes
        ctx.fillStyle = '#d1d1d1'; // zinc anode
        ctx.fillRect(leftX - 15, y - 10, 30, 100);
        ctx.strokeRect(leftX - 15, y - 10, 30, 100);
        
        ctx.fillStyle = '#ffb085'; // copper cathode
        ctx.fillRect(rightX - 15, y - 10, 30, 100);
        ctx.strokeRect(rightX - 15, y - 10, 30, 100);

        // Labels
        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 11px "Comic Neue"';
        ctx.textAlign = 'center';
        ctx.fillText('ANODE (Zn)', leftX, y - 20);
        ctx.fillText('CATHODE (Cu)', rightX, y - 20);

        // Wire
        ctx.beginPath();
        ctx.moveTo(leftX, y - 10);
        ctx.lineTo(leftX, y - 50);
        ctx.lineTo(rightX, y - 50);
        ctx.lineTo(rightX, y - 10);
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Electron particle
        const electronPos = (time % 2) / 2;
        const ex = leftX + (rightX - leftX) * electronPos;
        
        ctx.beginPath();
        ctx.arc(ex, y - 50, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#fff0a2';
        ctx.fill();
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (type === 'graphene') {
        // Graphene lattice in sketch style
        const size = 24;
        const rows = 5;
        const cols = 7;
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2;
        
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * size * 1.5 + 40;
            const y = r * size * Math.sqrt(3) + (c % 2) * (size * Math.sqrt(3) / 2) + 40;
            
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = i * 60 * Math.PI / 180;
              const px = x + size * Math.cos(angle);
              const py = y + size * Math.sin(angle);
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
            
            // Hexagon fill color (light yellow/teal)
            if ((r + c) % 3 === 0) {
              ctx.fillStyle = 'rgba(162, 234, 230, 0.15)';
              ctx.fill();
            }

            // Atom circle
            const pulse = Math.sin(time + r + c) * 1.5 + 4.5;
            ctx.beginPath();
            ctx.arc(x, y, pulse, 0, Math.PI * 2);
            ctx.fillStyle = '#ffb703';
            ctx.fill();
            ctx.strokeStyle = '#1a1a1a';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, frequency]);

  return (
    <div className="space-y-4">
      {/* Neobrutalist Canvas Wrapper */}
      <div className="w-full bg-[#fcfbf9] rounded-2xl overflow-hidden border-2.5 border-black relative shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[4px_4px_0px_#1a1a1a] transition-all">
        <div className="absolute top-4 left-4 bg-[#c9f2c9] border-2 border-black px-3 py-1 rounded-full shadow-[1.5px_1.5px_0px_#1a1a1a] z-10">
          <span className="text-[10px] font-bold text-black uppercase tracking-widest">Live Sketch Sim</span>
        </div>
        <canvas ref={canvasRef} className="w-full block" />
      </div>
      
      {type === 'spectrum' && (
        <div className="glass-panel p-6 bg-white shadow-[3px_3px_0px_#1a1a1a]">
          <div className="flex justify-between items-center mb-4">
            <span className="metric-label font-bold text-black">Target Frequency</span>
            <span className="text-2xl font-display font-bold text-black">
              {frequency.toFixed(2)} <span className="text-sm text-text-secondary">THz</span>
            </span>
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
          <div className="flex justify-between mt-2 text-[10px] text-text-secondary font-bold uppercase tracking-widest">
            <span>Low Freq</span>
            <span>Resonance Tuning</span>
            <span>High Freq</span>
          </div>
        </div>
      )}
    </div>
  );
};

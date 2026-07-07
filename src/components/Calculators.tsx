import React, { useState } from 'react';
import { Hash, Percent, Waves, Activity, Zap, Grid } from 'lucide-react';

export const Calculators: React.FC = () => {
  // Nernst
  const [e0, setE0] = useState<string>('1.1');
  const [temp, setTemp] = useState<string>('298');
  const [n, setN] = useState<string>('2');
  const [q, setQ] = useState<string>('1');
  const [nernstResult, setNernstResult] = useState<number | null>(null);

  // Atom Economy
  const [productMass, setProductMass] = useState<string>('');
  const [reactantMass, setReactantMass] = useState<string>('');
  const [atomEconomy, setAtomEconomy] = useState<number | null>(null);

  // Water Hardness
  const [vEdta, setVEdta] = useState<string>('');
  const [mEdta, setMEdta] = useState<string>('0.01');
  const [vSample, setVSample] = useState<string>('50');
  const [hardnessResult, setHardnessResult] = useState<number | null>(null);

  // Beer-Lambert
  const [epsilon, setEpsilon] = useState<string>('');
  const [pathLength, setPathLength] = useState<string>('1');
  const [concentration, setConcentration] = useState<string>('');
  const [absorbance, setAbsorbance] = useState<number | null>(null);

  // Photon Energy
  const [wavelength, setWavelength] = useState<string>('');
  const [energy, setEnergy] = useState<number | null>(null);

  // Surface Area to Volume (Spherical Nano)
  const [radius, setRadius] = useState<string>('');
  const [savRatio, setSavRatio] = useState<number | null>(null);

  const calculateNernst = () => {
    const R = 8.314;
    const F = 96485;
    const E0_val = parseFloat(e0);
    const T_val = parseFloat(temp);
    const n_val = parseFloat(n);
    const Q_val = parseFloat(q);
    if (isNaN(E0_val) || isNaN(T_val) || isNaN(n_val) || isNaN(Q_val) || Q_val <= 0) return;
    const result = E0_val - (R * T_val / (n_val * F)) * Math.log(Q_val);
    setNernstResult(result);
  };

  const calculateAtomEconomy = () => {
    const p = parseFloat(productMass);
    const r = parseFloat(reactantMass);
    if (isNaN(p) || isNaN(r) || r <= 0) return;
    setAtomEconomy((p / r) * 100);
  };

  const calculateHardness = () => {
    const v = parseFloat(vEdta);
    const m = parseFloat(mEdta);
    const s = parseFloat(vSample);
    if (isNaN(v) || isNaN(m) || isNaN(s) || s <= 0) return;
    // Hardness (ppm) = (V_EDTA * M_EDTA * 100 * 1000) / V_Sample
    const result = (v * m * 100 * 1000) / s;
    setHardnessResult(result);
  };

  const calculateBeerLambert = () => {
    const e = parseFloat(epsilon);
    const l = parseFloat(pathLength);
    const c = parseFloat(concentration);
    if (isNaN(e) || isNaN(l) || isNaN(c)) return;
    setAbsorbance(e * l * c);
  };

  const calculatePhotonEnergy = () => {
    const h = 6.626e-34;
    const c = 3e8;
    const w = parseFloat(wavelength) * 1e-9; // nm to m
    if (isNaN(w) || w <= 0) return;
    setEnergy((h * c) / w);
  };

  const calculateSAV = () => {
    const r = parseFloat(radius);
    if (isNaN(r) || r <= 0) return;
    // SA = 4*pi*r^2, V = (4/3)*pi*r^3 => SA/V = 3/r
    setSavRatio(3 / r);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-display font-bold text-black mb-2 tracking-tight uppercase">Scientific Calculators</h1>
        <p className="text-text-secondary text-base font-semibold">Precision tools for Engineering Chemistry</p>
        <hr className="border-dashed border-t-2 border-black my-4 max-w-md mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Nernst Calculator */}
        <div className="glass-card p-6 bg-white shadow-[4px_4px_0px_#1a1a1a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border-2 border-black rounded-xl bg-[#fff0a2] flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_#1a1a1a]">
              <Hash className="text-black" size={20} />
            </div>
            <h2 className="text-xl font-bold text-black font-display uppercase tracking-wider">Nernst Equation</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Standard Potential (E°)</label>
              <input type="number" value={e0} onChange={(e) => setE0(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Temp (K)</label>
                <input type="number" value={temp} onChange={(e) => setTemp(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Electrons (n)</label>
                <input type="number" value={n} onChange={(e) => setN(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Quotient (Q)</label>
              <input type="number" value={q} onChange={(e) => setQ(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <button onClick={calculateNernst} className="w-full py-3 border-2 border-black bg-[#ffb703] text-black font-bold rounded-xl shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a] transition-all cursor-pointer">Calculate E</button>
            {nernstResult !== null && (
              <div className="mt-4 p-4 bg-[#c9f2c9] border-2 border-black rounded-xl text-center shadow-[2.5px_2.5px_0px_#1a1a1a] animate-none">
                <span className="text-xs text-black font-bold uppercase tracking-widest block mb-1">Potential (E)</span>
                <span className="text-2xl font-display font-bold text-black">{nernstResult.toFixed(4)} V</span>
              </div>
            )}
          </div>
        </div>

        {/* Water Hardness Calculator */}
        <div className="glass-card p-6 bg-white shadow-[4px_4px_0px_#1a1a1a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border-2 border-black rounded-xl bg-[#a2eae6] flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_#1a1a1a]">
              <Waves className="text-black" size={20} />
            </div>
            <h2 className="text-xl font-bold text-black font-display uppercase tracking-wider">Water Hardness</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Vol of EDTA (ml)</label>
              <input type="number" value={vEdta} onChange={(e) => setVEdta(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Molarity of EDTA</label>
              <input type="number" value={mEdta} onChange={(e) => setMEdta(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Sample Vol (ml)</label>
              <input type="number" value={vSample} onChange={(e) => setVSample(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <button onClick={calculateHardness} className="w-full py-3 border-2 border-black bg-[#ffb703] text-black font-bold rounded-xl shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a] transition-all cursor-pointer">Calculate Hardness</button>
            {hardnessResult !== null && (
              <div className="mt-4 p-4 bg-[#c9f2c9] border-2 border-black rounded-xl text-center shadow-[2.5px_2.5px_0px_#1a1a1a] animate-none">
                <span className="text-xs text-black font-bold uppercase tracking-widest block mb-1">Hardness (ppm)</span>
                <span className="text-2xl font-display font-bold text-black">{hardnessResult.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Beer-Lambert Calculator */}
        <div className="glass-card p-6 bg-white shadow-[4px_4px_0px_#1a1a1a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border-2 border-black rounded-xl bg-[#ffd3d6] flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_#1a1a1a]">
              <Activity className="text-black" size={20} />
            </div>
            <h2 className="text-xl font-bold text-black font-display uppercase tracking-wider">Beer-Lambert Law</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Molar Absorptivity (ε)</label>
              <input type="number" value={epsilon} onChange={(e) => setEpsilon(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Path Length (cm)</label>
              <input type="number" value={pathLength} onChange={(e) => setPathLength(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Concentration (M)</label>
              <input type="number" value={concentration} onChange={(e) => setConcentration(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <button onClick={calculateBeerLambert} className="w-full py-3 border-2 border-black bg-[#ffb703] text-black font-bold rounded-xl shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a] transition-all cursor-pointer">Calculate Absorbance</button>
            {absorbance !== null && (
              <div className="mt-4 p-4 bg-[#c9f2c9] border-2 border-black rounded-xl text-center shadow-[2.5px_2.5px_0px_#1a1a1a] animate-none">
                <span className="text-xs text-black font-bold uppercase tracking-widest block mb-1">Absorbance (A)</span>
                <span className="text-2xl font-display font-bold text-black">{absorbance.toFixed(4)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Photon Energy Calculator */}
        <div className="glass-card p-6 bg-white shadow-[4px_4px_0px_#1a1a1a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border-2 border-black rounded-xl bg-[#e1d5f5] flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_#1a1a1a]">
              <Zap className="text-black" size={20} />
            </div>
            <h2 className="text-xl font-bold text-black font-display uppercase tracking-wider">Photon Energy</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Wavelength (nm)</label>
              <input type="number" value={wavelength} onChange={(e) => setWavelength(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <button onClick={calculatePhotonEnergy} className="w-full py-3 border-2 border-black bg-[#ffb703] text-black font-bold rounded-xl shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a] transition-all cursor-pointer">Calculate Energy</button>
            {energy !== null && (
              <div className="mt-4 p-4 bg-[#c9f2c9] border-2 border-black rounded-xl text-center shadow-[2.5px_2.5px_0px_#1a1a1a] animate-none">
                <span className="text-xs text-black font-bold uppercase tracking-widest block mb-1">Energy (Joules)</span>
                <span className="text-lg font-display font-bold text-black">{energy.toExponential(4)} J</span>
              </div>
            )}
          </div>
        </div>

        {/* SAV Ratio Calculator */}
        <div className="glass-card p-6 bg-white shadow-[4px_4px_0px_#1a1a1a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border-2 border-black rounded-xl bg-[#c9f2c9] flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_#1a1a1a]">
              <Grid className="text-black" size={20} />
            </div>
            <h2 className="text-xl font-bold text-black font-display uppercase tracking-wider">Nano SA/V Ratio</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Radius (nm)</label>
              <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <button onClick={calculateSAV} className="w-full py-3 border-2 border-black bg-[#ffb703] text-black font-bold rounded-xl shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a] transition-all cursor-pointer">Calculate Ratio</button>
            {savRatio !== null && (
              <div className="mt-4 p-4 bg-[#c9f2c9] border-2 border-black rounded-xl text-center shadow-[2.5px_2.5px_0px_#1a1a1a] animate-none">
                <span className="text-xs text-black font-bold uppercase tracking-widest block mb-1">SA/V Ratio (nm⁻¹)</span>
                <span className="text-2xl font-display font-bold text-black">{savRatio.toFixed(4)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Atom Economy Calculator */}
        <div className="glass-card p-6 bg-white shadow-[4px_4px_0px_#1a1a1a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border-2 border-black rounded-xl bg-[#ffb085] flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_#1a1a1a]">
              <Percent className="text-black" size={20} />
            </div>
            <h2 className="text-xl font-bold text-black font-display uppercase tracking-wider">Atom Economy</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Mass of Product</label>
              <input type="number" value={productMass} onChange={(e) => setProductMass(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Mass of Reactants</label>
              <input type="number" value={reactantMass} onChange={(e) => setReactantMass(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl p-3 font-semibold text-black focus:outline-none shadow-[2px_2px_0px_#1a1a1a] transition-all" />
            </div>
            <button onClick={calculateAtomEconomy} className="w-full py-3 border-2 border-black bg-[#ffb703] text-black font-bold rounded-xl shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a] transition-all cursor-pointer">Calculate Economy</button>
            {atomEconomy !== null && (
              <div className="mt-4 p-4 bg-[#c9f2c9] border-2 border-black rounded-xl text-center shadow-[2.5px_2.5px_0px_#1a1a1a] animate-none">
                <span className="text-xs text-black font-bold uppercase tracking-widest block mb-1">Economy (%)</span>
                <span className="text-2xl font-display font-bold text-black">{atomEconomy.toFixed(2)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

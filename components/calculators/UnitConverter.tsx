import React, { useState } from 'react';

const UnitConverter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'temp' | 'weight'>('temp');
  
  const [celsius, setCelsius] = useState<string>('');
  const [fahrenheit, setFahrenheit] = useState<string>('');

  const [kg, setKg] = useState<string>('');
  const [lbs, setLbs] = useState<string>('');

  const handleC = (val: string) => {
    setCelsius(val);
    if (val === '') { setFahrenheit(''); return; }
    const c = parseFloat(val);
    if (!isNaN(c)) setFahrenheit(((c * 9/5) + 32).toFixed(1));
  };

  const handleF = (val: string) => {
    setFahrenheit(val);
    if (val === '') { setCelsius(''); return; }
    const f = parseFloat(val);
    if (!isNaN(f)) setCelsius(((f - 32) * 5/9).toFixed(1));
  };

  const handleKg = (val: string) => {
    setKg(val);
    if (val === '') { setLbs(''); return; }
    const k = parseFloat(val);
    if (!isNaN(k)) setLbs((k * 2.20462).toFixed(2));
  };

  const handleLbs = (val: string) => {
    setLbs(val);
    if (val === '') { setKg(''); return; }
    const l = parseFloat(val);
    if (!isNaN(l)) setKg((l / 2.20462).toFixed(2));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
        Conversor de Unidades
      </h3>

      <div className="flex border-b border-slate-200 mb-6">
        <button 
            className={`flex-1 pb-2 font-medium text-sm transition ${activeTab === 'temp' ? 'text-medical-600 border-b-2 border-medical-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('temp')}
        >
            Temperatura (C/F)
        </button>
        <button 
            className={`flex-1 pb-2 font-medium text-sm transition ${activeTab === 'weight' ? 'text-medical-600 border-b-2 border-medical-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('weight')}
        >
            Peso (Kg/Lbs)
        </button>
      </div>

      {activeTab === 'temp' && (
        <div className="space-y-6 animate-fade-in">
           <div className="flex items-center gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Celsius (°C)</label>
                    <input type="number" value={celsius} onChange={(e) => handleC(e.target.value)} className="w-full p-3 text-lg bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-300" placeholder="0" />
                </div>
                <div className="text-slate-300 font-bold">=</div>
                <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fahrenheit (°F)</label>
                    <input type="number" value={fahrenheit} onChange={(e) => handleF(e.target.value)} className="w-full p-3 text-lg bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-300" placeholder="32" />
                </div>
           </div>
           <p className="text-xs text-slate-400 text-center">Fórmula: (0 °C × 9/5) + 32 = 32 °F</p>
        </div>
      )}

      {activeTab === 'weight' && (
        <div className="space-y-6 animate-fade-in">
           <div className="flex items-center gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Quilogramas (kg)</label>
                    <input type="number" value={kg} onChange={(e) => handleKg(e.target.value)} className="w-full p-3 text-lg bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-300" placeholder="70" />
                </div>
                <div className="text-slate-300 font-bold">=</div>
                <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Libras (lbs)</label>
                    <input type="number" value={lbs} onChange={(e) => handleLbs(e.target.value)} className="w-full p-3 text-lg bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-300" placeholder="154" />
                </div>
           </div>
           <p className="text-xs text-slate-400 text-center">Fator: 1 kg ≈ 2.20462 lbs</p>
        </div>
      )}

    </div>
  );
};

export default UnitConverter;
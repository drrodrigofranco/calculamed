import React, { useState } from 'react';

const GlucoseConverter: React.FC = () => {
  const [mg, setMg] = useState<string>('');
  const [mmol, setMmol] = useState<string>('');

  const handleMgChange = (val: string) => {
    setMg(val);
    if (val === '') {
        setMmol('');
        return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
        // Fator: divide por 18
        setMmol((num / 18).toFixed(2));
    }
  };

  const handleMmolChange = (val: string) => {
    setMmol(val);
    if (val === '') {
        setMg('');
        return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
        // Fator: multiplica por 18
        setMg((num * 18).toFixed(0));
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Conversor de Glicose
      </h3>

      <div className="space-y-6">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <label className="block text-sm font-bold text-slate-700 mb-2">mg/dL (Brasil/EUA)</label>
            <input
                type="number"
                value={mg}
                onChange={(e) => handleMgChange(e.target.value)}
                className="w-full p-4 text-3xl font-bold text-center bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-300 shadow-sm"
                placeholder="0"
            />
        </div>

        <div className="flex justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <label className="block text-sm font-bold text-slate-700 mb-2">mmol/L (Internacional)</label>
            <input
                type="number"
                value={mmol}
                onChange={(e) => handleMmolChange(e.target.value)}
                className="w-full p-4 text-3xl font-bold text-center bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-300 shadow-sm"
                placeholder="0.0"
            />
        </div>

        <p className="text-xs text-center text-slate-500 bg-slate-100 p-2 rounded">
            Fator de conversão: <strong>1 mmol/L = 18 mg/dL</strong>
        </p>
      </div>
    </div>
  );
};

export default GlucoseConverter;
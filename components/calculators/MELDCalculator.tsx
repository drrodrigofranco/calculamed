import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const MELDCalculator: React.FC = () => {
  const [bilirubin, setBilirubin] = useState('');
  const [inr, setInr] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [dialysis, setDialysis] = useState(false);
  
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    let bili = parseFloat(bilirubin);
    let i = parseFloat(inr);
    let creat = parseFloat(creatinine);

    if (isNaN(bili) || isNaN(i) || isNaN(creat)) return;

    if (bili < 1) bili = 1;
    if (i < 1) i = 1;
    if (creat < 1) creat = 1;
    
    if (creat > 4 || dialysis) creat = 4.0;

    const score = Math.round((0.378 * Math.log(bili) + 1.120 * Math.log(i) + 0.957 * Math.log(creat) + 0.643) * 10);

    let mortality = '';
    if (score <= 9) mortality = 'Mortalidade em 3 meses: 1.9%';
    else if (score <= 19) mortality = 'Mortalidade em 3 meses: 6.0%';
    else if (score <= 29) mortality = 'Mortalidade em 3 meses: 19.6%';
    else if (score <= 39) mortality = 'Mortalidade em 3 meses: 52.6%';
    else mortality = 'Mortalidade em 3 meses: 71.3%';

    setResult({
      value: score,
      classification: 'Pontos',
      notes: mortality
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        MELD Score (Fígado)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Bilirubina Total (mg/dL)</label>
          <input
            type="number"
            value={bilirubin}
            onChange={(e) => setBilirubin(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 1.2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">INR</label>
          <input
            type="number"
            value={inr}
            onChange={(e) => setInr(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 1.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Creatinina (mg/dL)</label>
          <input
            type="number"
            value={creatinine}
            onChange={(e) => setCreatinine(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 0.9"
          />
        </div>

        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition">
            <input 
                type="checkbox" 
                className="w-4 h-4 text-medical-600 rounded focus:ring-medical-500" 
                checked={dialysis}
                onChange={(e) => setDialysis(e.target.checked)}
            />
            <span className="text-sm text-slate-700 font-medium">Paciente em Diálise (≥ 2x na última semana)</span>
        </label>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular MELD
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Resultado</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
          </div>
          <p className="mt-2 font-medium text-lg text-medical-700">
            {result.notes}
          </p>
          <p className="text-xs text-slate-400 mt-2">Valores de laboratório &lt; 1.0 são arredondados para 1.0 conforme regra oficial.</p>
        </div>
      )}
    </div>
  );
};

export default MELDCalculator;
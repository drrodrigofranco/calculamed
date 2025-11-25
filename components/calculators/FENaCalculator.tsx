import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const FENaCalculator: React.FC = () => {
  const [uNa, setUNa] = useState<string>('');
  const [pNa, setPNa] = useState<string>('');
  const [uCr, setUCr] = useState<string>('');
  const [pCr, setPCr] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const una = parseFloat(uNa);
    const pna = parseFloat(pNa);
    const ucr = parseFloat(uCr);
    const pcr = parseFloat(pCr);
    if (isNaN(una) || isNaN(pna) || isNaN(ucr) || isNaN(pcr)) return;

    const fena = ((una * pcr) / (pna * ucr)) * 100;
    const classification = fena < 1 ? 'Pré-Renal' : fena > 2 ? 'Renal/Pós-Renal' : 'Indeterminado';
    const notes = fena < 1 ? 'Azotemia pré-renal' : 'NTA ou obstrução';
    setResult({ value: fena.toFixed(2), classification, notes });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">FENa</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Fração de Excreção de Sódio</p>
      <div className="space-y-4">
        <input type="number" value={uNa} onChange={(e) => setUNa(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Na Urinário (mEq/L)" />
        <input type="number" value={pNa} onChange={(e) => setPNa(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Na Plasmático (mEq/L)" />
        <input type="number" value={uCr} onChange={(e) => setUCr(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Cr Urinária (mg/dL)" />
        <input type="number" value={pCr} onChange={(e) => setPCr(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Cr Plasmática (mg/dL)" />
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular FENa
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}%</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default FENaCalculator;
import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const BallardCalculator: React.FC = () => {
  const [score, setScore] = useState<string>('0');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const s = parseInt(score);
    const weeks = 20 + (s * 2);
    const classification = s < 0 ? 'Extremamente Prematuro' : s < 10 ? 'Prematuro' : s < 20 ? 'Pré-termo Tardio' : 'A Termo';
    setResult({ value: weeks, classification, notes: `Escore Ballard: ${s}` });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Ballard Score</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Idade Gestacional do Recém-Nascido</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Escore Total (soma de maturidade neuromuscular + física)
          </label>
          <input type="number" value={score} onChange={(e) => setScore(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
            placeholder="Ex: 15" />
        </div>
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular Idade Gestacional
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} semanas</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default BallardCalculator;
import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const LBMCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h)) return;

    const lbm = gender === 'male' ?
      (0.407 * w) + (0.267 * h) - 19.2 :
      (0.252 * w) + (0.473 * h) - 48.3;
    
    const fatMass = w - lbm;
    const bodyFat = (fatMass / w) * 100;
    const classification = bodyFat < 15 ? 'Baixo' : bodyFat < 25 ? 'Normal' : 'Alto';
    setResult({ value: lbm.toFixed(1), classification, notes: `Gordura: ${bodyFat.toFixed(1)}%` });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Massa Magra (LBM)</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Índice de Massa Magra</p>
      <div className="space-y-4">
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
        </select>
        <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Peso (kg)" />
        <input type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Altura (cm)" />
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular Massa Magra
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} kg</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">% Gordura: {result.classification}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default LBMCalculator;
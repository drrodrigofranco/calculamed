import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const VO2MaxCalculator: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [hr, setHr] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const h = parseFloat(hr);
    if (isNaN(a) || isNaN(h)) return;

    const vo2max = gender === 'male' ? 
      15.3 * (220 - a) / h : 
      14.7 * (220 - a) / h;
    
    const classification = vo2max > 50 ? 'Excelente' : vo2max > 40 ? 'Bom' : vo2max > 30 ? 'Regular' : 'Fraco';
    setResult({ value: vo2max.toFixed(1), classification, notes: 'VO2 Max estimado' });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">VO2 Max Estimado</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Capacidade Aeróbica</p>
      <div className="space-y-4">
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
        </select>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Idade (anos)" />
        <input type="number" value={hr} onChange={(e) => setHr(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="FC em Repouso (bpm)" />
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular VO2 Max
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} mL/kg/min</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
        </div>
      )}
    </div>
  );
};

export default VO2MaxCalculator;
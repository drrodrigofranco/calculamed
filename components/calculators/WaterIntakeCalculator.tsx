import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const WaterIntakeCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateWater = () => {
    const w = parseFloat(weight);

    if (isNaN(w) || w <= 0) return;

    const ml = w * 35;
    const liters = ml / 1000;

    setResult({
      value: liters.toFixed(2),
      classification: `${Math.round(ml)} ml/dia`,
      notes: "Baseado na recomendação geral de 35ml/kg. Pode variar com nível de atividade e condições de saúde."
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
        Ingestão Diária de Água
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Peso (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition placeholder-slate-400"
            placeholder="Ex: 70"
          />
        </div>

        <button
          onClick={calculateWater}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Ingestão
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
          <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Água Recomendada</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</span>
            <span className="text-slate-500 dark:text-slate-400">Litros/dia</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default WaterIntakeCalculator;
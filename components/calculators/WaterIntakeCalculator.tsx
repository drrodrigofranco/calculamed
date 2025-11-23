import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const WaterIntakeCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateWater = () => {
    const w = parseFloat(weight);

    if (isNaN(w) || w <= 0) return;

    // Standard recommendation: 35ml per kg of body weight
    const ml = w * 35;
    const liters = ml / 1000;

    setResult({
      value: liters.toFixed(2),
      classification: `${Math.round(ml)} ml/dia`,
      notes: "Baseado na recomendação geral de 35ml/kg. Pode variar com nível de atividade e condições de saúde."
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Ingestão Diária de Água
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Peso Corporal (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
            placeholder="Ex: 70"
          />
        </div>

        <button
          onClick={calculateWater}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Meta
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Meta Diária</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">Litros</span>
          </div>
          <p className="mt-2 font-medium text-blue-600">
            {result.classification}
          </p>
          <p className="text-xs text-slate-400 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default WaterIntakeCalculator;
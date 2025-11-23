import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const PediatricFluidCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateFluid = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return;
    
    let dailyVol = 0;

    if (w <= 10) {
      dailyVol = w * 100;
    } else if (w <= 20) {
      dailyVol = 1000 + (w - 10) * 50;
    } else {
      dailyVol = 1500 + (w - 20) * 20;
    }

    const hourlyRate = dailyVol / 24;

    setResult({
      value: Math.round(dailyVol),
      classification: `${Math.round(hourlyRate)} ml/hora`,
      notes: "Regra de Holliday-Segar (Manutenção)"
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Hidratação Pediátrica (Holliday-Segar)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Peso da Criança (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 12.5"
          />
        </div>

        <button
          onClick={calculateFluid}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Volume
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Volume Diário Total</p>
          <div className="flex items-baseline gap-2 mt-1 mb-3">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">ml/24h</span>
          </div>
          
          <p className="text-sm text-slate-500 uppercase tracking-wide">Vazão de Infusão</p>
          <p className="mt-1 font-medium text-lg text-medical-700">
            {result.classification}
          </p>
          <p className="text-xs text-slate-400 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PediatricFluidCalculator;
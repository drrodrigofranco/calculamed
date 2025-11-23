import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const CorrectedCalciumCalculator: React.FC = () => {
  const [calcium, setCalcium] = useState<string>('');
  const [albumin, setAlbumin] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const ca = parseFloat(calcium);
    const alb = parseFloat(albumin);

    if (isNaN(ca) || isNaN(alb)) return;

    const corrected = ca + 0.8 * (4.0 - alb);

    setResult({
      value: corrected.toFixed(2),
      classification: 'mg/dL',
      notes: "Fórmula válida para hipoalbuminemia. Não usar se albumina normal ou hiperalbuminemia."
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Cálcio Corrigido (Pela Albumina)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Cálcio Total Sérico (mg/dL)</label>
          <input
            type="number"
            value={calcium}
            onChange={(e) => setCalcium(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 8.5"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Albumina Sérica (g/dL)</label>
          <input
            type="number"
            value={albumin}
            onChange={(e) => setAlbumin(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 2.5"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Cálcio Real
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Cálcio Corrigido</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">{result.classification}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default CorrectedCalciumCalculator;
import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const SodiumCorrectionCalculator: React.FC = () => {
  const [sodium, setSodium] = useState<string>('');
  const [glucose, setGlucose] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const na = parseFloat(sodium);
    const gluc = parseFloat(glucose);

    if (isNaN(na) || isNaN(gluc)) return;

    const correctedNa = na + 0.016 * (gluc - 100);

    setResult({
      value: correctedNa.toFixed(1),
      classification: 'mEq/L',
      notes: "Correção: +1.6 mEq/L no sódio para cada 100mg/dL de glicose acima de 100."
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Sódio Corrigido (Hiperglicemia)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sódio Medido (mEq/L)</label>
          <input
            type="number"
            value={sodium}
            onChange={(e) => setSodium(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 130"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Glicose (mg/dL)</label>
          <input
            type="number"
            value={glucose}
            onChange={(e) => setGlucose(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 500"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Sódio Real
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Sódio Corrigido</p>
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

export default SodiumCorrectionCalculator;
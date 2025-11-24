import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const MAPCalculator: React.FC = () => {
  const [sbp, setSbp] = useState<string>('');
  const [dbp, setDbp] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateMAP = () => {
    const s = parseFloat(sbp);
    const d = parseFloat(dbp);

    if (isNaN(s) || isNaN(d)) return;

    const map = (s + (2 * d)) / 3;

    let note = '';
    if (map < 65) note = 'Risco de hipoperfusão';
    else if (map > 110) note = 'Elevada (possível hipertensão)';
    else note = 'Faixa de perfusão normal';

    setResult({
      value: Math.round(map),
      classification: 'mmHg',
      notes: note
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
        Pressão Arterial Média (PAM)
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sistólica (PAS)</label>
            <input
                type="number"
                value={sbp}
                onChange={(e) => setSbp(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                placeholder="Ex: 120"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Diastólica (PAD)</label>
            <input
                type="number"
                value={dbp}
                onChange={(e) => setDbp(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                placeholder="Ex: 80"
            />
            </div>
        </div>

        <button
          onClick={calculateMAP}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular PAM
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
          <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</span>
            <span className="text-slate-500 dark:text-slate-400">{result.classification}</span>
          </div>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">
            {result.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default MAPCalculator;
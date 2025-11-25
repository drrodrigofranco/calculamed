import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const SAAGCalculator: React.FC = () => {
  const [serumAlbumin, setSerumAlbumin] = useState<string>('');
  const [ascitesAlbumin, setAscitesAlbumin] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const serum = parseFloat(serumAlbumin);
    const ascites = parseFloat(ascitesAlbumin);
    if (isNaN(serum) || isNaN(ascites)) return;

    const saag = serum - ascites;
    const classification = saag >= 1.1 ? 'SAAG Alto' : 'SAAG Baixo';
    const notes = saag >= 1.1 ? 'Hipertensão portal (cirrose, ICC)' : 'Outras causas (TB, neoplasia, pancreatite)';
    setResult({ value: saag.toFixed(2), classification, notes });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">SAAG (GASA)</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Gradiente Albumina Soro-Ascite</p>
      <div className="space-y-4">
        <input type="number" step="0.1" value={serumAlbumin} onChange={(e) => setSerumAlbumin(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Albumina Sérica (g/dL)" />
        <input type="number" step="0.1" value={ascitesAlbumin} onChange={(e) => setAscitesAlbumin(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Albumina Ascite (g/dL)" />
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular SAAG
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} g/dL</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default SAAGCalculator;
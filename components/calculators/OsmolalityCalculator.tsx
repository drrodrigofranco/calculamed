import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const OsmolalityCalculator: React.FC = () => {
  const [sodium, setSodium] = useState<string>('');
  const [glucose, setGlucose] = useState<string>('');
  const [bun, setBun] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const na = parseFloat(sodium);
    const gluc = parseFloat(glucose);
    const urea = parseFloat(bun);
    if (isNaN(na) || isNaN(gluc) || isNaN(urea)) return;

    const osm = (2 * na) + (gluc / 18) + (urea / 2.8);
    const classification = osm < 275 ? 'Hipoosmolar' : osm > 295 ? 'Hiperosmolar' : 'Normal';
    setResult({ value: osm.toFixed(1), classification, notes: 'Osmolalidade sérica calculada' });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Osmolalidade Sérica</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Cálculo estimado</p>
      <div className="space-y-4">
        <input type="number" value={sodium} onChange={(e) => setSodium(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Sódio (mEq/L)" />
        <input type="number" value={glucose} onChange={(e) => setGlucose(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Glicose (mg/dL)" />
        <input type="number" value={bun} onChange={(e) => setBun(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Ureia (mg/dL)" />
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular Osmolalidade
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} mOsm/kg</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
        </div>
      )}
    </div>
  );
};

export default OsmolalityCalculator;
import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const HELLPCalculator: React.FC = () => {
  const [hemolysis, setHemolysis] = useState<boolean>(false);
  const [liver, setLiver] = useState<boolean>(false);
  const [platelets, setPlatelets] = useState<string>('0');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const plt = parseInt(platelets);
    const hasSyndrome = hemolysis && liver && plt > 0;
    const classification = hasSyndrome ? (plt === 3 ? 'HELLP Completa (Classe 1)' : plt === 2 ? 'HELLP Classe 2' : 'HELLP Classe 3') : 'Não preenche critérios';
    setResult({ value: hasSyndrome ? 1 : 0, classification, notes: hasSyndrome ? 'Considerar parto urgente' : 'Reavaliar' });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">HELLP Syndrome</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Critérios Diagnósticos</p>
      <div className="space-y-3">
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={hemolysis} onChange={(e) => setHemolysis(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Hemólise (LDH >600 ou bilirrubina >1.2)</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={liver} onChange={(e) => setLiver(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Enzimas Hepáticas Elevadas (AST/ALT >70)</span>
          </label>
        </div>
        <select value={platelets} onChange={(e) => setPlatelets(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="0">Plaquetas Normais</option>
          <option value="1">Plaquetas <100k (Classe 3)</option>
          <option value="2">Plaquetas <50k (Classe 2)</option>
          <option value="3">Plaquetas <50k + DHL>1400 (Classe 1)</option>
        </select>
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">Avaliar HELLP</button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.classification}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default HELLPCalculator;
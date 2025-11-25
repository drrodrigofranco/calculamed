import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const OttawaAnkleCalculator: React.FC = () => {
  const [malleolarPain, setMalleolarPain] = useState<boolean>(false);
  const [midFootPain, setMidFootPain] = useState<boolean>(false);
  const [malleolarTenderness, setMalleolarTenderness] = useState<boolean>(false);
  const [navicularTenderness, setNavicularTenderness] = useState<boolean>(false);
  const [baseTenderness, setBaseTenderness] = useState<boolean>(false);
  const [unableToWalk, setUnableToWalk] = useState<boolean>(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const needsXray = (malleolarPain && (malleolarTenderness || unableToWalk)) || 
                      (midFootPain && (navicularTenderness || baseTenderness || unableToWalk));
    const classification = needsXray ? 'RX Indicado' : 'RX Não Necessário';
    const notes = needsXray ? 'Realizar radiografia de tornozelo/pé' : 'Fratura improvável - tratamento conservador';
    setResult({ value: needsXray ? 1 : 0, classification, notes });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Ottawa Ankle Rules</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Indicação de RX em trauma de tornozelo/pé</p>
      <div className="space-y-3">
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={malleolarPain} onChange={(e) => setMalleolarPain(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Dor na região maleolar</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={midFootPain} onChange={(e) => setMidFootPain(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Dor no médio-pé</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={malleolarTenderness} onChange={(e) => setMalleolarTenderness(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Sensibilidade óssea em maléolo</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={navicularTenderness} onChange={(e) => setNavicularTenderness(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Sensibilidade em navicular</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={baseTenderness} onChange={(e) => setBaseTenderness(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Sensibilidade na base do 5º metatarso</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={unableToWalk} onChange={(e) => setUnableToWalk(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Incapaz de dar 4 passos</span>
          </label>
        </div>
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Avaliar Necessidade de RX
        </button>
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

export default OttawaAnkleCalculator;
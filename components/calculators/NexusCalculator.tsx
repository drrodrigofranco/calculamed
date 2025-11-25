import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const NexusCalculator: React.FC = () => {
  const [criteria, setCriteria] = useState({
    midlineTenderness: false,
    alteredConsciousness: false,
    intoxication: false,
    neurologicDeficit: false,
    distractingInjury: false
  });
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const hasAnyCriteria = Object.values(criteria).some(v => v);
    const classification = hasAnyCriteria ? 'RX Indicado' : 'RX Não Necessário';
    const notes = hasAnyCriteria ? 'Realizar radiografia de coluna cervical' : 'Lesão cervical improvável';
    setResult({ value: hasAnyCriteria ? 1 : 0, classification, notes });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">NEXUS Criteria</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Indicação de RX em trauma cervical</p>
      <div className="space-y-3">
        {[
          ['midlineTenderness', 'Sensibilidade na linha média cervical'],
          ['alteredConsciousness', 'Consciência alterada'],
          ['intoxication', 'Intoxicação'],
          ['neurologicDeficit', 'Déficit neurológico focal'],
          ['distractingInjury', 'Lesão distrativa']
        ].map(([key, label]) => (
          <div key={key} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={criteria[key as keyof typeof criteria]} 
                onChange={(e) => setCriteria({...criteria, [key]: e.target.checked})} 
                className="w-5 h-5 text-medical-600 rounded" />
              <span className="font-medium text-slate-800 dark:text-white">{label}</span>
            </label>
          </div>
        ))}
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Avaliar NEXUS
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

export default NexusCalculator;
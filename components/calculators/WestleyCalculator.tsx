import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const WestleyCalculator: React.FC = () => {
  const [stridor, setStridor] = useState<string>('0');
  const [retraction, setRetraction] = useState<string>('0');
  const [airEntry, setAirEntry] = useState<string>('0');
  const [cyanosis, setCyanosis] = useState<string>('0');
  const [consciousness, setConsciousness] = useState<string>('0');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const score = parseInt(stridor) + parseInt(retraction) + parseInt(airEntry) + parseInt(cyanosis) + parseInt(consciousness);
    const classification = score <= 2 ? 'Leve' : score <= 7 ? 'Moderado' : 'Grave';
    const notes = score <= 2 ? 'Tratamento ambulatorial' : score <= 7 ? 'Observação/internação' : 'UTI - considerar intubação';
    setResult({ value: score, classification, notes });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Westley Croup Score</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Gravidade da Laringotraqueobronquite</p>
      <div className="space-y-4">
        <select value={stridor} onChange={(e) => setStridor(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="0">Estridor: Ausente</option>
          <option value="1">Estridor: Com agitação</option>
          <option value="2">Estridor: Em repouso</option>
        </select>
        <select value={retraction} onChange={(e) => setRetraction(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="0">Retração: Ausente</option>
          <option value="1">Retração: Leve</option>
          <option value="2">Retração: Moderada</option>
          <option value="3">Retração: Grave</option>
        </select>
        <select value={airEntry} onChange={(e) => setAirEntry(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="0">Entrada de Ar: Normal</option>
          <option value="1">Entrada de Ar: Diminuída</option>
          <option value="2">Entrada de Ar: Muito diminuída</option>
        </select>
        <select value={cyanosis} onChange={(e) => setCyanosis(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="0">Cianose: Ausente</option>
          <option value="4">Cianose: Com agitação</option>
          <option value="5">Cianose: Em repouso</option>
        </select>
        <select value={consciousness} onChange={(e) => setConsciousness(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="0">Consciência: Normal</option>
          <option value="5">Consciência: Alterada</option>
        </select>
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular Westley Score
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} pontos</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default WestleyCalculator;
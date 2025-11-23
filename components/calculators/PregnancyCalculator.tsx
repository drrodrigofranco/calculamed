import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const PregnancyCalculator: React.FC = () => {
  const [lmp, setLmp] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateDates = () => {
    if (!lmp) return;

    const lmpDate = new Date(lmp);
    const today = new Date();

    if (isNaN(lmpDate.getTime())) return;

    const edd = new Date(lmpDate);
    edd.setDate(lmpDate.getDate() + 280);

    const diffTime = Math.abs(today.getTime() - lmpDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    setResult({
      value: edd.toLocaleDateString('pt-BR'),
      classification: `${weeks} semanas e ${days} dias`,
      notes: "Baseado na Regra de Naegele (DUM)"
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Idade Gestacional & DPP
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Data da Última Menstruação (DUM)</label>
          <input
            type="date"
            value={lmp}
            onChange={(e) => setLmp(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
          />
        </div>

        <button
          onClick={calculateDates}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Data Provável do Parto</p>
          <div className="flex items-baseline gap-2 mt-1 mb-3">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
          </div>
          
          <p className="text-sm text-slate-500 uppercase tracking-wide">Idade Gestacional Atual</p>
          <p className="mt-1 font-medium text-lg text-slate-800">
            {result.classification}
          </p>
          <p className="text-xs text-slate-400 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PregnancyCalculator;
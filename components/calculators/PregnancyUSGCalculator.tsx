import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const PregnancyUSGCalculator: React.FC = () => {
  const [usgDate, setUsgDate] = useState<string>('');
  const [weeks, setWeeks] = useState<string>('');
  const [days, setDays] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    if (!usgDate || !weeks) return;

    const examDate = new Date(usgDate);
    const today = new Date();
    
    if (isNaN(examDate.getTime())) return;

    // Time difference between exam date and today in days
    const diffTime = today.getTime() - examDate.getTime();
    const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (daysPassed < 0) {
        // Future date selected
        return; 
    }

    // Initial Gestational Age in days
    const w = parseFloat(weeks);
    const d = parseFloat(days || '0');
    
    const initialDays = (w * 7) + d;
    const currentTotalDays = initialDays + daysPassed;

    const currentWeeks = Math.floor(currentTotalDays / 7);
    const currentDays = currentTotalDays % 7;

    // Estimated Due Date (40 weeks = 280 days total gestation)
    // Days remaining = 280 - currentTotalDays
    const daysRemaining = 280 - currentTotalDays;
    const edd = new Date();
    edd.setDate(today.getDate() + daysRemaining);

    setResult({
      value: `${currentWeeks} semanas e ${currentDays} dias`,
      classification: `DPP Estimada: ${edd.toLocaleDateString('pt-BR')}`,
      notes: `Baseado no USG de ${examDate.toLocaleDateString('pt-BR')}`
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Idade Gestacional pelo Ultrassom (USG)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Data do Exame (USG)</label>
          <input
            type="date"
            value={usgDate}
            onChange={(e) => setUsgDate(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
          />
        </div>

        <label className="block text-sm font-medium text-slate-700">Idade Gestacional no Exame</label>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <div className="relative">
                    <input
                        type="number"
                        value={weeks}
                        onChange={(e) => setWeeks(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                        placeholder="Sem"
                    />
                    <span className="absolute right-3 top-3 text-sm text-slate-400">Semanas</span>
                </div>
            </div>
            <div>
                 <div className="relative">
                    <input
                        type="number"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                        placeholder="Dias"
                        max="6"
                    />
                    <span className="absolute right-3 top-3 text-sm text-slate-400">Dias</span>
                </div>
            </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular IG Atual
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Idade Gestacional Hoje</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{result.value}</span>
          </div>
          <p className="mt-2 font-medium text-medical-700">
            {result.classification}
          </p>
          <p className="text-xs text-slate-400 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PregnancyUSGCalculator;
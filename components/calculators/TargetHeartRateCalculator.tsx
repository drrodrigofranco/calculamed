import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const TargetHeartRateCalculator: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [restingHr, setRestingHr] = useState<string>('');
  const [intensity, setIntensity] = useState<string>('70');
  const [method, setMethod] = useState<'standard' | 'karvonen'>('standard');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const rest = parseFloat(restingHr);
    const int = parseFloat(intensity) / 100;

    if (isNaN(a)) return;

    // Max HR = 220 - Age
    const maxHr = 220 - a;
    let target = 0;

    if (method === 'karvonen') {
        if (isNaN(rest)) return;
        // Karvonen: ((Max - Rest) * Intensity) + Rest
        target = ((maxHr - rest) * int) + rest;
    } else {
        // Standard: Max * Intensity
        target = maxHr * int;
    }

    setResult({
      value: Math.round(target),
      classification: 'bpm',
      notes: `FC Máxima Estimada: ${maxHr} bpm`
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Zona Alvo de Treinamento
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Método de Cálculo</label>
          <div className="flex gap-4">
            <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition ${method === 'standard' ? 'bg-medical-50 border-medical-500 text-medical-700' : 'border-slate-300 hover:bg-slate-50'}`}>
              <input type="radio" name="method" className="hidden" checked={method === 'standard'} onChange={() => setMethod('standard')} />
              Padrão (220-Idade)
            </label>
            <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition ${method === 'karvonen' ? 'bg-medical-50 border-medical-500 text-medical-700' : 'border-slate-300 hover:bg-slate-50'}`}>
              <input type="radio" name="method" className="hidden" checked={method === 'karvonen'} onChange={() => setMethod('karvonen')} />
              Karvonen (Mais preciso)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Idade</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                    placeholder="Ex: 30"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Intensidade (%)</label>
                <input
                    type="number"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                    placeholder="Ex: 70"
                />
            </div>
        </div>

        {method === 'karvonen' && (
             <div className="animate-fade-in">
                <label className="block text-sm font-medium text-slate-700 mb-1">FC de Repouso (bpm)</label>
                <input
                    type="number"
                    value={restingHr}
                    onChange={(e) => setRestingHr(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                    placeholder="Ex: 60"
                />
            </div>
        )}

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Frequência Alvo
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Frequência Alvo</p>
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

export default TargetHeartRateCalculator;
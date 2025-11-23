import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const DosageCalculator: React.FC = () => {
  const [prescribed, setPrescribed] = useState<string>('');
  const [available, setAvailable] = useState<string>('');
  const [volume, setVolume] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const p = parseFloat(prescribed);
    const a = parseFloat(available);
    const v = parseFloat(volume);

    if (isNaN(p) || isNaN(a) || isNaN(v) || a === 0) return;

    const ml = (p * v) / a;

    setResult({
      value: ml.toFixed(2),
      classification: 'ml',
      notes: `Administrar ${ml.toFixed(2)} ml para obter ${p} da medicação.`
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Cálculo de Dosagem (Regra de Três)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Prescrição Médica (mg/g/mcg)</label>
          <input
            type="number"
            value={prescribed}
            onChange={(e) => setPrescribed(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 500"
          />
          <span className="text-xs text-slate-400">Quanto o médico pediu? (Use a mesma unidade do frasco)</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Apresentação do Frasco/Ampola (mg/g/mcg)</label>
          <input
            type="number"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 1000"
          />
          <span className="text-xs text-slate-400">Quanto tem no frasco?</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Volume do Diluente (ml)</label>
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 10"
          />
          <span className="text-xs text-slate-400">Em quantos ml está diluído?</span>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Volume a Aspirar
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Volume a Aspirar</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">ml</span>
          </div>
          <p className="text-sm text-slate-600 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default DosageCalculator;
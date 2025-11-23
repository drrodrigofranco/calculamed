import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const ANCCalculator: React.FC = () => {
  const [wbc, setWbc] = useState<string>('');
  const [segs, setSegs] = useState<string>('');
  const [bands, setBands] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const whiteCells = parseFloat(wbc);
    const s = parseFloat(segs);
    const b = parseFloat(bands);

    if (isNaN(whiteCells) || isNaN(s) || isNaN(b)) return;

    // Formula: WBC * ((Segs + Bands) / 100)
    const neutrophilsPercent = (s + b) / 100;
    const anc = whiteCells * neutrophilsPercent;

    let risk = '';
    // Neutropenia grading (Common Terminology Criteria for Adverse Events)
    if (anc >= 1500) risk = 'Normal / Baixo Risco';
    else if (anc >= 1000) risk = 'Neutropenia Leve (Grau 1)';
    else if (anc >= 500) risk = 'Neutropenia Moderada (Grau 2-3)';
    else risk = 'Neutropenia Grave (Grau 4) - Risco alto de infecção';

    setResult({
      value: Math.round(anc),
      classification: risk,
      notes: "Contagem Absoluta de Neutrófilos (céls/mm³)"
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Contagem Absoluta de Neutrófilos (ANC)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Leucócitos Totais (/mm³)</label>
          <input
            type="number"
            value={wbc}
            onChange={(e) => setWbc(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 4500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Segmentados (%)</label>
            <input
                type="number"
                value={segs}
                onChange={(e) => setSegs(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                placeholder="Ex: 40"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bastões (%)</label>
            <input
                type="number"
                value={bands}
                onChange={(e) => setBands(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                placeholder="Ex: 2"
            />
            </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular ANC
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Neutrófilos Totais</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">/mm³</span>
          </div>
          <p className={`mt-2 font-medium text-lg ${Number(result.value) < 500 ? 'text-red-600' : Number(result.value) < 1500 ? 'text-orange-500' : 'text-green-600'}`}>
            {result.classification}
          </p>
          <p className="text-xs text-slate-400 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default ANCCalculator;
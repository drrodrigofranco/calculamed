import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const AnionGapCalculator: React.FC = () => {
  const [na, setNa] = useState<string>('');
  const [cl, setCl] = useState<string>('');
  const [hco3, setHco3] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const sodium = parseFloat(na);
    const chloride = parseFloat(cl);
    const bicarb = parseFloat(hco3);

    if (isNaN(sodium) || isNaN(chloride) || isNaN(bicarb)) return;

    const gap = sodium - (chloride + bicarb);

    let classification = '';
    if (gap > 12) classification = 'Elevado (Acidose Metabólica)';
    else if (gap < 8) classification = 'Baixo (Raro)';
    else classification = 'Normal';

    setResult({
      value: gap.toFixed(1),
      classification: classification,
      notes: "Valor de referência usual: 8 a 12 mEq/L. Não considera Potássio."
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Anion Gap (Hiato Aniônico)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sódio (Na⁺) mEq/L</label>
          <input
            type="number"
            value={na}
            onChange={(e) => setNa(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 140"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cloro (Cl⁻)</label>
            <input
                type="number"
                value={cl}
                onChange={(e) => setCl(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                placeholder="Ex: 100"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bicarbonato (HCO₃⁻)</label>
            <input
                type="number"
                value={hco3}
                onChange={(e) => setHco3(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                placeholder="Ex: 24"
            />
            </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Gap
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Resultado</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">mEq/L</span>
          </div>
          <p className="mt-2 font-medium text-slate-700">
            {result.classification}
          </p>
          <p className="text-xs text-slate-400 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default AnionGapCalculator;
import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const PaO2FiO2Calculator: React.FC = () => {
  const [pao2, setPao2] = useState<string>('');
  const [fio2, setFio2] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const p = parseFloat(pao2);
    const f = parseFloat(fio2);

    if (isNaN(p) || isNaN(f) || f === 0) return;

    // Ratio = PaO2 / (FiO2 / 100)
    // FiO2 entered as percentage (e.g., 50 for 50%)
    
    const decimalFiO2 = f / 100;
    const ratio = p / decimalFiO2;

    let classification = '';
    // Berlin Definition for ARDS (with PEEP >= 5)
    if (ratio > 300) classification = 'Normal / Troca gasosa preservada';
    else if (ratio > 200) classification = 'SDRA Leve (200-300)';
    else if (ratio > 100) classification = 'SDRA Moderada (100-200)';
    else classification = 'SDRA Grave (< 100)';

    setResult({
      value: Math.round(ratio),
      classification: classification,
      notes: "Relação P/F (Critério de Berlim)"
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Relação P/F (PaO₂/FiO₂)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">PaO₂ (Gasometria) mmHg</label>
          <input
            type="number"
            value={pao2}
            onChange={(e) => setPao2(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 80"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">FiO₂ (%)</label>
          <input
            type="number"
            value={fio2}
            onChange={(e) => setFio2(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 40 (para 40%)"
          />
          <p className="text-xs text-slate-400 mt-1">Ar ambiente = 21%</p>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Relação
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Relação P/F</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
          </div>
          <p className={`mt-2 font-medium text-lg ${Number(result.value) < 200 ? 'text-red-600' : Number(result.value) < 300 ? 'text-orange-500' : 'text-green-600'}`}>
            {result.classification}
          </p>
          <p className="text-xs text-slate-400 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PaO2FiO2Calculator;
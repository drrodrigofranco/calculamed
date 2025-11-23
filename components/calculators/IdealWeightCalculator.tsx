import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const h = parseFloat(height);

    if (isNaN(h) || h === 0) return;

    // Devine Formula
    // Height in inches
    const heightInInches = h / 2.54;
    const feetOver5 = heightInInches - 60;

    let ibw = 0;
    if (gender === 'male') {
        ibw = 50 + (2.3 * feetOver5);
    } else {
        ibw = 45.5 + (2.3 * feetOver5);
    }

    if (ibw < 0) ibw = 0;

    setResult({
      value: ibw.toFixed(1),
      classification: 'kg',
      notes: "Fórmula de Devine. Usado para ajuste de drogas e ventilação."
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Peso Ideal (Fórmula de Devine)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Sexo Biológico</label>
          <div className="flex gap-4">
            <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition ${gender === 'male' ? 'bg-medical-50 border-medical-500 text-medical-700' : 'border-slate-300 hover:bg-slate-50'}`}>
              <input type="radio" name="gender" className="hidden" checked={gender === 'male'} onChange={() => setGender('male')} />
              Masculino
            </label>
            <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition ${gender === 'female' ? 'bg-medical-50 border-medical-500 text-medical-700' : 'border-slate-300 hover:bg-slate-50'}`}>
              <input type="radio" name="gender" className="hidden" checked={gender === 'female'} onChange={() => setGender('female')} />
              Feminino
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Altura (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 175"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Peso Ideal
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Peso Corporal Ideal Estimado</p>
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

export default IdealWeightCalculator;
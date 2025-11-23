import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const CockcroftGaultCalculator: React.FC = () => {
  const [creatinine, setCreatinine] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const cr = parseFloat(creatinine);
    const a = parseFloat(age);
    const w = parseFloat(weight);

    if (isNaN(cr) || isNaN(a) || isNaN(w) || cr === 0) return;

    // Cockcroft-Gault Formula
    // Male: ((140 - Age) * Weight) / (72 * Cr)
    // Female: Result * 0.85
    
    let clcr = ((140 - a) * w) / (72 * cr);
    if (gender === 'female') {
        clcr = clcr * 0.85;
    }

    let stage = '';
    if (clcr > 90) stage = 'Função Renal Normal';
    else if (clcr >= 60) stage = 'Disfunção Leve';
    else if (clcr >= 30) stage = 'Disfunção Moderada';
    else if (clcr >= 15) stage = 'Disfunção Grave';
    else stage = 'Falência Renal';

    setResult({
      value: clcr.toFixed(1),
      classification: stage,
      notes: "Cockcroft-Gault (Ideal para ajuste de dose de drogas)."
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Clearance de Creatinina (Cockcroft-Gault)
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
          <label className="block text-sm font-medium text-slate-700 mb-1">Idade (anos)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 65"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Peso (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Creatinina Sérica (mg/dL)</label>
          <input
            type="number"
            value={creatinine}
            onChange={(e) => setCreatinine(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 1.2"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Clearance
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Clearance Estimado</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">ml/min</span>
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

export default CockcroftGaultCalculator;
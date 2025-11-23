import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const BMRCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateBMR = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (isNaN(w) || isNaN(h) || isNaN(a)) return;

    let bmr = 0;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
    } else {
        bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    }

    setResult({
      value: Math.round(bmr),
      classification: "kcal/dia",
      notes: "Taxa Metabólica Basal (Harris-Benedict)"
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Taxa Metabólica Basal
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

        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Peso (kg)</label>
            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                placeholder="Ex: 75"
            />
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
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Idade (anos)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 30"
          />
        </div>

        <button
          onClick={calculateBMR}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Calorias
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Gasto Calórico Basal</p>
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

export default BMRCalculator;
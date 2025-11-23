import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Convert cm to m

    if (isNaN(w) || isNaN(h) || h === 0) return;

    const bmi = w / (h * h);
    let classification = '';
    let color = 'text-gray-700';

    if (bmi < 18.5) { classification = 'Abaixo do peso'; color = 'text-yellow-600'; }
    else if (bmi < 24.9) { classification = 'Peso normal'; color = 'text-green-600'; }
    else if (bmi < 29.9) { classification = 'Sobrepeso'; color = 'text-orange-500'; }
    else if (bmi < 34.9) { classification = 'Obesidade Grau I'; color = 'text-red-500'; }
    else if (bmi < 39.9) { classification = 'Obesidade Grau II'; color = 'text-red-600'; }
    else { classification = 'Obesidade Grau III'; color = 'text-red-700'; }

    setResult({
      value: bmi.toFixed(2),
      classification,
      notes: color
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Índice de Massa Corporal (IMC)
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Peso (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
            placeholder="Ex: 75"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Altura (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
            placeholder="Ex: 175"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 animate-fade-in">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Resultado</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">kg/m²</span>
          </div>
          <p className={`mt-2 font-medium ${result.notes}`}>
            {result.classification}
          </p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
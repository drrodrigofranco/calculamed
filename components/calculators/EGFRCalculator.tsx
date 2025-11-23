import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const EGFRCalculator: React.FC = () => {
  const [creatinine, setCreatinine] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateEGFR = () => {
    const scr = parseFloat(creatinine);
    const ageVal = parseFloat(age);

    if (isNaN(scr) || isNaN(ageVal)) return;

    let k = 0.9;
    let alpha = -0.411;
    let genderFactor = 1;

    if (gender === 'female') {
      k = 0.7;
      alpha = -0.329;
      genderFactor = 1.018;
    }
    
    // CKD-EPI 2021 Race-Free
    if (gender === 'female') {
        k = 0.7;
        alpha = -0.241;
        genderFactor = 1.012;
    } else {
        k = 0.9;
        alpha = -0.302;
        genderFactor = 1;
    }

    const ratio = scr / k;
    const gfr = 142 * Math.pow(Math.min(ratio, 1), alpha) * 
                Math.pow(Math.max(ratio, 1), -1.200) * 
                Math.pow(0.9938, ageVal) * 
                genderFactor;

    let stage = '';
    if (gfr >= 90) stage = 'Estágio 1 (Normal)';
    else if (gfr >= 60) stage = 'Estágio 2 (Leve)';
    else if (gfr >= 45) stage = 'Estágio 3a (Leve a Moderado)';
    else if (gfr >= 30) stage = 'Estágio 3b (Moderado a Grave)';
    else if (gfr >= 15) stage = 'Estágio 4 (Grave)';
    else stage = 'Estágio 5 (Falência Renal)';

    setResult({
      value: gfr.toFixed(1),
      classification: stage,
      notes: "CKD-EPI 2021 (Sem fator racial)"
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Taxa de Filtração Glomerular (CKD-EPI 2021)
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Creatinina (mg/dL)</label>
            <input
                type="number"
                value={creatinine}
                onChange={(e) => setCreatinine(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                placeholder="Ex: 0.9"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Idade</label>
            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                placeholder="Ex: 45"
            />
            </div>
        </div>

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

        <button
          onClick={calculateEGFR}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular TFG
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Resultado Estimado</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">mL/min/1.73m²</span>
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

export default EGFRCalculator;
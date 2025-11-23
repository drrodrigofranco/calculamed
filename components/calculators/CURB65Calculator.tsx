import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const CURB65Calculator: React.FC = () => {
  const [confusion, setConfusion] = useState<boolean>(false);
  const [urea, setUrea] = useState<boolean>(false);
  const [respRate, setRespRate] = useState<boolean>(false);
  const [bp, setBp] = useState<boolean>(false);
  const [age, setAge] = useState<boolean>(false);
  
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    let score = 0;
    if (confusion) score++;
    if (urea) score++;
    if (respRate) score++;
    if (bp) score++;
    if (age) score++;

    let risk = '';
    let conduct = '';

    if (score <= 1) {
        risk = 'Baixo Risco (Mortalidade < 3%)';
        conduct = 'Considerar tratamento ambulatorial.';
    } else if (score === 2) {
        risk = 'Risco Moderado (Mortalidade ~9%)';
        conduct = 'Considerar internação (enfermaria).';
    } else {
        risk = 'Alto Risco (Mortalidade 15-40%)';
        conduct = 'Internação urgente. Considerar UTI (score 4-5).';
    }

    setResult({
      value: score,
      classification: risk,
      notes: conduct
    });
  };

  const Checkbox = ({ label, subLabel, checked, onChange }: { label: string, subLabel?: string, checked: boolean, onChange: (v: boolean) => void }) => (
    <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition">
      <input 
        type="checkbox" 
        className="mt-1 w-4 h-4 text-medical-600 rounded focus:ring-medical-500" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div>
          <span className="text-sm font-bold text-slate-800 block">{label}</span>
          {subLabel && <span className="text-xs text-slate-500">{subLabel}</span>}
      </div>
    </label>
  );

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        CURB-65 (Pneumonia)
      </h3>

      <div className="space-y-2 mb-6">
         <Checkbox 
            label="Confusão Mental" 
            subLabel="Novo início ou desorientação"
            checked={confusion} onChange={setConfusion} 
         />
         <Checkbox 
            label="Ureia > 50 mg/dL" 
            subLabel="(ou BUN > 19 mg/dL ou Ureia > 7 mmol/L)"
            checked={urea} onChange={setUrea} 
         />
         <Checkbox 
            label="Frequência Respiratória ≥ 30 rpm" 
            checked={respRate} onChange={setRespRate} 
         />
         <Checkbox 
            label="Pressão Arterial Baixa" 
            subLabel="PAS < 90 mmHg ou PAD ≤ 60 mmHg"
            checked={bp} onChange={setBp} 
         />
         <Checkbox 
            label="Idade ≥ 65 anos" 
            checked={age} onChange={setAge} 
         />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
      >
        Calcular Gravidade
      </button>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Pontuação</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">/ 5</span>
          </div>
          <p className={`mt-2 font-medium text-lg ${Number(result.value) >= 3 ? 'text-red-600' : Number(result.value) === 2 ? 'text-orange-600' : 'text-green-600'}`}>
            {result.classification}
          </p>
          <p className="text-sm text-slate-600 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default CURB65Calculator;
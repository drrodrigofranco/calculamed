import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const CHA2DS2VAScCalculator: React.FC = () => {
  const [chf, setChf] = useState(false);
  const [htn, setHtn] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [stroke, setStroke] = useState(false);
  const [vasc, setVasc] = useState(false);
  const [age6574, setAge6574] = useState(false);
  const [age75, setAge75] = useState(false);
  const [female, setFemale] = useState(false);
  
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    let score = 0;
    if (chf) score += 1;
    if (htn) score += 1;
    if (diabetes) score += 1;
    if (stroke) score += 2;
    if (vasc) score += 1;
    if (age75) score += 2;
    else if (age6574) score += 1; 
    if (female) score += 1;

    let risk = '';
    let recommendation = '';

    if (score === 0) {
        risk = 'Baixo Risco';
        recommendation = 'Nenhuma terapia antitrombótica recomendada.';
    } else if (score === 1) {
        risk = 'Risco Moderado';
        recommendation = 'Considerar anticoagulação oral (ou antiplaquetário) baseado na preferência e risco de sangramento.';
    } else {
        risk = 'Alto Risco';
        recommendation = 'Anticoagulação oral recomendada (DOACs preferíveis a Warfarina).';
    }

    setResult({
      value: score,
      classification: risk,
      notes: recommendation
    });
  };

  const handleAgeChange = (val: 'none' | '65-74' | '>75') => {
      setAge6574(val === '65-74');
      setAge75(val === '>75');
  };

  const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) => (
    <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition">
      <input 
        type="checkbox" 
        className="mt-1 w-4 h-4 text-medical-600 rounded focus:ring-medical-500" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm text-slate-700 font-medium">{label}</span>
    </label>
  );

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        CHA₂DS₂-VASc (Fibrilação Atrial)
      </h3>

      <div className="space-y-3 mb-6">
         <Checkbox label="Insuficiência Cardíaca Congestiva / Disfunção VE" checked={chf} onChange={setChf} />
         <Checkbox label="Hipertensão Arterial" checked={htn} onChange={setHtn} />
         <Checkbox label="Diabetes Mellitus" checked={diabetes} onChange={setDiabetes} />
         <Checkbox label="AVC prévio / AIT / Tromboembolismo (+2 pts)" checked={stroke} onChange={setStroke} />
         <Checkbox label="Doença Vascular (IAM prévio, DAOP, Placa aórtica)" checked={vasc} onChange={setVasc} />
         <Checkbox label="Sexo Feminino" checked={female} onChange={setFemale} />
         
         <div className="p-3 border rounded-lg">
             <label className="block text-sm font-bold text-slate-700 mb-2">Idade</label>
             <div className="flex flex-col gap-2">
                 <label className="flex items-center gap-2 cursor-pointer">
                     <input type="radio" name="age" checked={!age6574 && !age75} onChange={() => handleAgeChange('none')} className="text-medical-600 focus:ring-medical-500" />
                     <span className="text-sm text-slate-600">&lt; 65 anos</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                     <input type="radio" name="age" checked={age6574} onChange={() => handleAgeChange('65-74')} className="text-medical-600 focus:ring-medical-500" />
                     <span className="text-sm text-slate-600">65 - 74 anos (+1 pt)</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                     <input type="radio" name="age" checked={age75} onChange={() => handleAgeChange('>75')} className="text-medical-600 focus:ring-medical-500" />
                     <span className="text-sm text-slate-600">≥ 75 anos (+2 pts)</span>
                 </label>
             </div>
         </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
      >
        Calcular Risco de AVC
      </button>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Pontuação</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">pontos</span>
          </div>
          <p className="mt-2 font-medium text-lg text-medical-700">
            {result.classification}
          </p>
          <p className="text-sm text-slate-600 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default CHA2DS2VAScCalculator;
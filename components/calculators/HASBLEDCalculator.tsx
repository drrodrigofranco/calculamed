import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const HASBLEDCalculator: React.FC = () => {
  const [htn, setHtn] = useState(false);
  const [renal, setRenal] = useState(false);
  const [liver, setLiver] = useState(false);
  const [stroke, setStroke] = useState(false);
  const [bleeding, setBleeding] = useState(false);
  const [labileInr, setLabileInr] = useState(false);
  const [elderly, setElderly] = useState(false);
  const [drugs, setDrugs] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    let score = 0;
    if (htn) score++;
    if (renal) score++;
    if (liver) score++;
    if (stroke) score++;
    if (bleeding) score++;
    if (labileInr) score++;
    if (elderly) score++;
    if (drugs) score++;
    if (alcohol) score++;

    let risk = '';
    
    if (score >= 3) {
        risk = 'Alto Risco de Sangramento';
    } else {
        risk = 'Baixo/Moderado Risco';
    }

    setResult({
      value: score,
      classification: risk,
      notes: "HAS-BLED: Avaliação de risco de sangramento maior em anticoagulação."
    });
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
        HAS-BLED (Risco de Sangramento)
      </h3>

      <div className="space-y-2 mb-6">
         <Checkbox label="Hipertensão (PAS > 160)" checked={htn} onChange={setHtn} />
         <Checkbox label="Função Renal Anormal (Diálise, Tx, Cr > 2.26)" checked={renal} onChange={setRenal} />
         <Checkbox label="Função Hepática Anormal (Cirrose, Bilirrubina > 2x, AST/ALT > 3x)" checked={liver} onChange={setLiver} />
         <Checkbox label="Histórico de AVC" checked={stroke} onChange={setStroke} />
         <Checkbox label="Sangramento Prévio ou Predisposição" checked={bleeding} onChange={setBleeding} />
         <Checkbox label="INR Instável (Time in Range < 60%)" checked={labileInr} onChange={setLabileInr} />
         <Checkbox label="Idade > 65 anos" checked={elderly} onChange={setElderly} />
         <Checkbox label="Drogas (Antiplaquetários / AINEs)" checked={drugs} onChange={setDrugs} />
         <Checkbox label="Álcool (> 8 doses/semana)" checked={alcohol} onChange={setAlcohol} />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
      >
        Calcular Escore
      </button>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Pontuação</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">/ 9</span>
          </div>
          <p className={`mt-2 font-medium text-lg ${Number(result.value) >= 3 ? 'text-red-600' : 'text-green-600'}`}>
            {result.classification}
          </p>
          <p className="text-sm text-slate-600 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default HASBLEDCalculator;
import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const BurnAreaCalculator: React.FC = () => {
  const [head, setHead] = useState(false);
  const [armL, setArmL] = useState(false);
  const [armR, setArmR] = useState(false);
  const [torsoF, setTorsoF] = useState(false);
  const [back, setBack] = useState(false);
  const [legL, setLegL] = useState(false);
  const [legR, setLegR] = useState(false);
  const [genitals, setGenitals] = useState(false);
  
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    let score = 0;
    // Rule of Nines (Adults)
    if (head) score += 9;
    if (armL) score += 9;
    if (armR) score += 9;
    if (torsoF) score += 18;
    if (back) score += 18;
    if (legL) score += 18;
    if (legR) score += 18;
    if (genitals) score += 1;

    let risk = '';
    if (score < 10) risk = 'Queimadura Pequena';
    else if (score < 25) risk = 'Queimadura Moderada';
    else risk = 'Grande Queimado (>25% SCQ)';

    setResult({
      value: score,
      classification: risk,
      notes: "Regra dos 9 de Wallace (Adultos)"
    });
  };

  const Checkbox = ({ label, pct, checked, onChange }: { label: string, pct: number, checked: boolean, onChange: (v: boolean) => void }) => (
    <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition">
      <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-medical-600 rounded focus:ring-medical-500" 
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="text-sm text-slate-700 font-medium">{label}</span>
      </div>
      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">{pct}%</span>
    </label>
  );

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Superfície Corporal Queimada (SCQ)
      </h3>

      <div className="space-y-2 mb-6">
         <Checkbox label="Cabeça e Pescoço" pct={9} checked={head} onChange={setHead} />
         <Checkbox label="Braço Esquerdo (Total)" pct={9} checked={armL} onChange={setArmL} />
         <Checkbox label="Braço Direito (Total)" pct={9} checked={armR} onChange={setArmR} />
         <Checkbox label="Tronco Anterior (Peito/Abdome)" pct={18} checked={torsoF} onChange={setTorsoF} />
         <Checkbox label="Dorso (Costas)" pct={18} checked={back} onChange={setBack} />
         <Checkbox label="Perna Esquerda (Total)" pct={18} checked={legL} onChange={setLegL} />
         <Checkbox label="Perna Direita (Total)" pct={18} checked={legR} onChange={setLegR} />
         <Checkbox label="Genitais" pct={1} checked={genitals} onChange={setGenitals} />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
      >
        Calcular Porcentagem
      </button>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Área Total Queimada</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">% SCQ</span>
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

export default BurnAreaCalculator;
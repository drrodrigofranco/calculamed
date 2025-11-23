import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const AlvaradoCalculator: React.FC = () => {
  const [migration, setMigration] = useState(false);
  const [anorexia, setAnorexia] = useState(false);
  const [nausea, setNausea] = useState(false);
  const [tenderness, setTenderness] = useState(false);
  const [rebound, setRebound] = useState(false);
  const [fever, setFever] = useState(false);
  const [leukocytosis, setLeukocytosis] = useState(false);
  const [shift, setShift] = useState(false);
  
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    let score = 0;
    if (migration) score += 1;
    if (anorexia) score += 1;
    if (nausea) score += 1;
    if (tenderness) score += 2; 
    if (rebound) score += 1; 
    if (fever) score += 1; 
    if (leukocytosis) score += 2; 
    if (shift) score += 1; 

    let interpretation = '';
    if (score <= 4) interpretation = 'Baixa probabilidade de Apendicite';
    else if (score <= 6) interpretation = 'Possível Apendicite (Observação/Exame de Imagem)';
    else interpretation = 'Provável Apendicite (Cirurgia indicada)';

    setResult({
      value: score,
      classification: interpretation,
      notes: "Escore de Alvarado (MANTRELS)"
    });
  };

  const Checkbox = ({ label, points, checked, onChange }: { label: string, points: number, checked: boolean, onChange: (v: boolean) => void }) => (
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
      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">+{points}</span>
    </label>
  );

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Escore de Alvarado (Apendicite)
      </h3>

      <div className="space-y-2 mb-6">
         <Checkbox label="Dor migratória para Fossa Ilíaca Direita" points={1} checked={migration} onChange={setMigration} />
         <Checkbox label="Anorexia (perda de apetite)" points={1} checked={anorexia} onChange={setAnorexia} />
         <Checkbox label="Náusea ou Vômito" points={1} checked={nausea} onChange={setNausea} />
         <Checkbox label="Dor à palpação na FID" points={2} checked={tenderness} onChange={setTenderness} />
         <Checkbox label="Descompressão brusca dolorosa (Blumberg)" points={1} checked={rebound} onChange={setRebound} />
         <Checkbox label="Febre (> 37.3°C)" points={1} checked={fever} onChange={setFever} />
         <Checkbox label="Leucocitose (> 10.000)" points={2} checked={leukocytosis} onChange={setLeukocytosis} />
         <Checkbox label="Desvio à esquerda (Neutrofilia)" points={1} checked={shift} onChange={setShift} />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
      >
        Calcular Escore
      </button>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Pontuação Total</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">/ 10</span>
          </div>
          <p className={`mt-2 font-medium text-lg ${Number(result.value) >= 7 ? 'text-red-600' : Number(result.value) >= 5 ? 'text-orange-600' : 'text-green-600'}`}>
            {result.classification}
          </p>
          <p className="text-sm text-slate-600 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default AlvaradoCalculator;
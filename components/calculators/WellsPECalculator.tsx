import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const WellsPECalculator: React.FC = () => {
  const [clinicalSigns, setClinicalSigns] = useState<boolean>(false);
  const [peLikely, setPeLikely] = useState<boolean>(false);
  const [hr, setHr] = useState<boolean>(false);
  const [immobilization, setImmobilization] = useState<boolean>(false);
  const [prevDVT, setPrevDVT] = useState<boolean>(false);
  const [hemoptysis, setHemoptysis] = useState<boolean>(false);
  const [malignancy, setMalignancy] = useState<boolean>(false);
  
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    let score = 0;
    if (clinicalSigns) score += 3.0;
    if (peLikely) score += 3.0;
    if (hr) score += 1.5;
    if (immobilization) score += 1.5;
    if (prevDVT) score += 1.5;
    if (hemoptysis) score += 1.0;
    if (malignancy) score += 1.0;

    let risk = '';
    let conduct = '';

    // 3-tier model
    if (score <= 1) {
        risk = 'Baixo Risco';
        conduct = 'Considerar D-Dímero para exclusão.';
    } else if (score <= 6) {
        risk = 'Risco Moderado';
        conduct = 'D-Dímero de alta sensibilidade recomendado.';
    } else {
        risk = 'Alto Risco';
        conduct = 'Angio-TC de Tórax recomendada (não aguardar D-Dímero).';
    }

    setResult({
      value: score,
      classification: risk,
      notes: conduct
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
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Score de Wells (Embolia Pulmonar)
      </h3>

      <div className="space-y-2 mb-6">
         <Checkbox 
            label="Sinais clínicos de TVP (edema, dor à palpação)" 
            checked={clinicalSigns} onChange={setClinicalSigns} 
         />
         <Checkbox 
            label="TEP é o diagnóstico mais provável (ou tão provável quanto outro)" 
            checked={peLikely} onChange={setPeLikely} 
         />
         <Checkbox 
            label="Frequência Cardíaca > 100 bpm" 
            checked={hr} onChange={setHr} 
         />
         <Checkbox 
            label="Imobilização (>3 dias) ou Cirurgia (últimas 4 semanas)" 
            checked={immobilization} onChange={setImmobilization} 
         />
         <Checkbox 
            label="Histórico prévio de TVP ou TEP" 
            checked={prevDVT} onChange={setPrevDVT} 
         />
         <Checkbox 
            label="Hemoptise (tosse com sangue)" 
            checked={hemoptysis} onChange={setHemoptysis} 
         />
         <Checkbox 
            label="Malignidade (Câncer ativo ou tratado nos últimos 6 meses)" 
            checked={malignancy} onChange={setMalignancy} 
         />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
      >
        Calcular Risco
      </button>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Pontuação</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">pontos</span>
          </div>
          <p className={`mt-2 font-medium text-lg ${Number(result.value) > 6 ? 'text-red-600' : Number(result.value) > 1 ? 'text-orange-600' : 'text-green-600'}`}>
            {result.classification}
          </p>
          <p className="text-sm text-slate-600 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default WellsPECalculator;
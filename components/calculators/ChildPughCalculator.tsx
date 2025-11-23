import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const ChildPughCalculator: React.FC = () => {
  const [bilirubin, setBilirubin] = useState<number>(1);
  const [albumin, setAlbumin] = useState<number>(1);
  const [inr, setInr] = useState<number>(1);
  const [ascites, setAscites] = useState<number>(1);
  const [enceph, setEnceph] = useState<number>(1);
  
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const score = bilirubin + albumin + inr + ascites + enceph;

    let cls = '';
    let survival = '';
    
    if (score <= 6) {
        cls = 'Classe A (Cirrose Compensada)';
        survival = 'Sobrevida em 1 ano: 100% | 2 anos: 85%';
    } else if (score <= 9) {
        cls = 'Classe B (Comprometimento Funcional Significativo)';
        survival = 'Sobrevida em 1 ano: 80% | 2 anos: 60%';
    } else {
        cls = 'Classe C (Cirrose Descompensada)';
        survival = 'Sobrevida em 1 ano: 45% | 2 anos: 35%';
    }

    setResult({
      value: score,
      classification: cls,
      notes: survival
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Escore de Child-Pugh (Cirrose)
      </h3>

      <div className="space-y-6">
        
        {/* Bilirubina */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">Bilirubina Total (mg/dL)</label>
          <select 
            value={bilirubin} 
            onChange={(e) => setBilirubin(parseInt(e.target.value))}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
          >
            <option value={1}>&lt; 2.0 mg/dL (+1 ponto)</option>
            <option value={2}>2.0 - 3.0 mg/dL (+2 pontos)</option>
            <option value={3}>&gt; 3.0 mg/dL (+3 pontos)</option>
          </select>
        </div>

        {/* Albumina */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">Albumina (g/dL)</label>
          <select 
            value={albumin} 
            onChange={(e) => setAlbumin(parseInt(e.target.value))}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
          >
            <option value={1}>&gt; 3.5 g/dL (+1 ponto)</option>
            <option value={2}>2.8 - 3.5 g/dL (+2 pontos)</option>
            <option value={3}>&lt; 2.8 g/dL (+3 pontos)</option>
          </select>
        </div>

        {/* INR */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">INR (Tempo de Protrombina)</label>
          <select 
            value={inr} 
            onChange={(e) => setInr(parseInt(e.target.value))}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
          >
            <option value={1}>&lt; 1.7 (+1 ponto)</option>
            <option value={2}>1.7 - 2.3 (+2 pontos)</option>
            <option value={3}>&gt; 2.3 (+3 pontos)</option>
          </select>
        </div>

        {/* Ascite */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">Ascite</label>
          <select 
            value={ascites} 
            onChange={(e) => setAscites(parseInt(e.target.value))}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
          >
            <option value={1}>Ausente (+1 ponto)</option>
            <option value={2}>Leve / Controlada (+2 pontos)</option>
            <option value={3}>Moderada / Tensa (+3 pontos)</option>
          </select>
        </div>

        {/* Encefalopatia */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">Encefalopatia Hepática</label>
          <select 
            value={enceph} 
            onChange={(e) => setEnceph(parseInt(e.target.value))}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
          >
            <option value={1}>Ausente (+1 ponto)</option>
            <option value={2}>Grau 1-2 (Leve) (+2 pontos)</option>
            <option value={3}>Grau 3-4 (Grave) (+3 pontos)</option>
          </select>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Classificação
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Pontuação</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">pontos</span>
          </div>
          <p className="mt-2 font-medium text-lg text-slate-800">
            {result.classification}
          </p>
          <p className="text-xs text-slate-500 mt-2 italic">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default ChildPughCalculator;
import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const GlasgowCalculator: React.FC = () => {
  const [eye, setEye] = useState<number>(4);
  const [verbal, setVerbal] = useState<number>(5);
  const [motor, setMotor] = useState<number>(6);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateGCS = () => {
    const total = eye + verbal + motor;

    let classification = '';
    if (total >= 13) classification = 'Trauma Leve';
    else if (total >= 9) classification = 'Trauma Moderado';
    else classification = 'Trauma Grave (Considerar Intubação)';

    setResult({
      value: total,
      classification,
      notes: `Ocular: ${eye}, Verbal: ${verbal}, Motor: ${motor}`
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Escala de Coma de Glasgow
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">Abertura Ocular</label>
          <select 
            value={eye} 
            onChange={(e) => setEye(parseInt(e.target.value))}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
          >
            <option value={4}>4 - Espontânea</option>
            <option value={3}>3 - Ao comando verbal</option>
            <option value={2}>2 - À dor/pressão</option>
            <option value={1}>1 - Ausente</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">Resposta Verbal</label>
          <select 
            value={verbal} 
            onChange={(e) => setVerbal(parseInt(e.target.value))}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
          >
            <option value={5}>5 - Orientado</option>
            <option value={4}>4 - Confuso</option>
            <option value={3}>3 - Palavras inapropriadas</option>
            <option value={2}>2 - Sons incomprensíveis</option>
            <option value={1}>1 - Ausente</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">Resposta Motora</label>
          <select 
            value={motor} 
            onChange={(e) => setMotor(parseInt(e.target.value))}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
          >
            <option value={6}>6 - Obedece comandos</option>
            <option value={5}>5 - Localiza dor</option>
            <option value={4}>4 - Flexão normal (retirada)</option>
            <option value={3}>3 - Flexão anormal (decorticação)</option>
            <option value={2}>2 - Extensão (descerebração)</option>
            <option value={1}>1 - Ausente</option>
          </select>
        </div>

        <button
          onClick={calculateGCS}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Pontuação
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Pontuação Total</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">/ 15</span>
          </div>
          <p className={`mt-2 font-medium ${parseInt(result.value.toString()) <= 8 ? 'text-red-600' : 'text-slate-700'}`}>
            {result.classification}
          </p>
          <p className="text-xs text-slate-400 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default GlasgowCalculator;
import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const PedGlasgowCalculator: React.FC = () => {
  const [eyes, setEyes] = useState<string>('4');
  const [verbal, setVerbal] = useState<string>('5');
  const [motor, setMotor] = useState<string>('6');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const score = parseInt(eyes) + parseInt(verbal) + parseInt(motor);
    const classification = score <= 8 ? 'Grave' : score <= 12 ? 'Moderado' : 'Leve';
    setResult({ value: score, classification, notes: 'Escala de Glasgow Pediátrica' });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Glasgow Pediátrico</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Avaliação de consciência em crianças</p>
      <div className="space-y-4">
        <select value={eyes} onChange={(e) => setEyes(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="4">Olhos: Espontânea</option>
          <option value="3">Olhos: Ao comando</option>
          <option value="2">Olhos: À dor</option>
          <option value="1">Olhos: Nenhuma</option>
        </select>
        <select value={verbal} onChange={(e) => setVerbal(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="5">Verbal: Balbucia/sorri</option>
          <option value="4">Verbal: Choro consolável</option>
          <option value="3">Verbal: Choro à dor</option>
          <option value="2">Verbal: Gemido à dor</option>
          <option value="1">Verbal: Nenhuma</option>
        </select>
        <select value={motor} onChange={(e) => setMotor(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="6">Motor: Movimentos normais</option>
          <option value="5">Motor: Localiza dor</option>
          <option value="4">Motor: Retira à dor</option>
          <option value="3">Motor: Flexão anormal</option>
          <option value="2">Motor: Extensão</option>
          <option value="1">Motor: Nenhuma</option>
        </select>
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">Calcular</button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}/15</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
        </div>
      )}
    </div>
  );
};

export default PedGlasgowCalculator;
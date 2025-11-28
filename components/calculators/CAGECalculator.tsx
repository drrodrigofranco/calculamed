import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const CAGECalculator: React.FC = () => {
  const [answers, setAnswers] = useState([false, false, false, false]);
  
  const questions = [
    "C - Alguma vez sentiu que deveria diminuir a bebida?",
    "A - As pessoas já o irritaram criticando sua bebida?",
    "G - Já se sentiu culpado pela maneira que bebe?",
    "E - Já bebeu pela manhã para diminuir o nervosismo (Eye-opener)?"
  ];

  const toggle = (i: number) => {
    const newA = [...answers];
    newA[i] = !newA[i];
    setAnswers(newA);
  };

  const score = answers.filter(Boolean).length;

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-4 dark:text-white">CAGE (Rastreio Alcoolismo)</h2>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <label key={i} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer dark:border-slate-600">
            <input type="checkbox" checked={answers[i]} onChange={() => toggle(i)} className="w-5 h-5" />
            <span className="dark:text-slate-200">{q}</span>
          </label>
        ))}
      </div>
      <div className={`mt-6 p-4 rounded-lg ${score >= 2 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
        <p className="font-bold">Resultado: {score} / 4</p>
        <p>{score >= 2 ? "Positivo para abuso de álcool (Sensibilidade > 70%)" : "Baixa probabilidade"}</p>
      </div>
    </div>
  );
};
export default CAGECalculator;
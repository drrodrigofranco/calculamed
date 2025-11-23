import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const QUESTIONS = [
    "Pouco interesse ou prazer em fazer as coisas?",
    "Sentindo-se deprimido(a), deprimido(a) ou sem esperança?",
    "Dificuldade para adormecer ou permanecer dormindo, ou dormindo demais?",
    "Sentindo-se cansado(a) ou com pouca energia?",
    "Apetite fraco ou comendo demais?",
    "Sentindo-se mal consigo mesmo(a) — ou que você é um fracasso ou decepcionou a si mesmo(a) ou sua família?",
    "Dificuldade em concentrar-se nas coisas, como ler o jornal ou assistir televisão?",
    "Movendo-se ou falando tão devagar que outras pessoas poderiam ter notado? Ou o oposto — estar tão inquieto(a) ou agitado(a) que você tem se movido muito mais do que o normal?",
    "Pensamentos de que seria melhor se estivesse morto(a) ou de se machucar de alguma forma?"
];

const PHQ9Calculator: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(9).fill(0));
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const handleAnswer = (index: number, val: number) => {
      const newAnswers = [...answers];
      newAnswers[index] = val;
      setAnswers(newAnswers);
  };

  const calculate = () => {
    const score = answers.reduce((a, b) => a + b, 0);

    let severity = '';
    if (score <= 4) severity = 'Nenhuma Depressão';
    else if (score <= 9) severity = 'Depressão Leve';
    else if (score <= 14) severity = 'Depressão Moderada';
    else if (score <= 19) severity = 'Depressão Moderadamente Grave';
    else severity = 'Depressão Grave';

    let note = "Monitoramento recomendado.";
    if (score >= 10) note = "Considerar psicoterapia e/ou farmacoterapia.";

    setResult({
      value: score,
      classification: severity,
      notes: note
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-2 flex items-center gap-2">
        PHQ-9 (Rastreio de Depressão)
      </h3>
      <p className="text-sm text-slate-500 mb-6">Nas últimas 2 semanas, com que frequência você foi incomodado por algum dos seguintes problemas?</p>

      <div className="space-y-6">
         {QUESTIONS.map((q, idx) => (
             <div key={idx} className="pb-4 border-b border-slate-100 last:border-0">
                 <p className="text-sm font-bold text-slate-800 mb-3">{idx + 1}. {q}</p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                        {val: 0, label: 'Nenhuma vez'},
                        {val: 1, label: 'Vários dias'},
                        {val: 2, label: 'Mais da metade'},
                        {val: 3, label: 'Quase todos dias'}
                    ].map((opt) => (
                        <button
                            key={opt.val}
                            onClick={() => handleAnswer(idx, opt.val)}
                            className={`text-xs p-2 rounded border transition ${answers[idx] === opt.val ? 'bg-medical-50 border-medical-500 text-medical-700 font-bold' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                 </div>
             </div>
         ))}
      </div>

      <button
        onClick={calculate}
        className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md mt-6"
      >
        Calcular Escore
      </button>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Pontuação</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">/ 27</span>
          </div>
          <p className={`mt-2 font-medium text-lg ${Number(result.value) >= 10 ? 'text-red-600' : 'text-slate-700'}`}>
            {result.classification}
          </p>
          <p className="text-sm text-slate-600 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PHQ9Calculator;
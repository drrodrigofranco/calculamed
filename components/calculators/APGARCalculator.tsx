import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const APGARCalculator: React.FC = () => {
  const [appearance, setAppearance] = useState<number>(0);
  const [pulse, setPulse] = useState<number>(0);
  const [grimace, setGrimace] = useState<number>(0);
  const [activity, setActivity] = useState<number>(0);
  const [respiration, setRespiration] = useState<number>(0);
  
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const score = appearance + pulse + grimace + activity + respiration;

    let interpretation = '';
    let color = '';

    if (score >= 7) {
        interpretation = 'Boa Vitalidade (Adaptação favorável)';
        color = 'text-green-600';
    } else if (score >= 4) {
        interpretation = 'Asfixia Moderada (Necessita manobras)';
        color = 'text-orange-500';
    } else {
        interpretation = 'Asfixia Grave (Reanimação imediata)';
        color = 'text-red-600';
    }

    setResult({
      value: score,
      classification: interpretation,
      notes: color
    });
  };

  const Criterion = ({ label, options, value, onChange }: { label: string, options: {val: number, text: string}[], value: number, onChange: (v: number) => void }) => (
    <div className="mb-4 pb-4 border-b border-slate-100 last:border-0">
        <label className="block text-sm font-bold text-slate-800 mb-2">{label}</label>
        <div className="flex flex-col gap-2">
            {options.map((opt) => (
                <label key={opt.val} className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${value === opt.val ? 'bg-medical-50 border-medical-500 ring-1 ring-medical-500' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input 
                        type="radio" 
                        name={label} 
                        checked={value === opt.val} 
                        onChange={() => onChange(opt.val)}
                        className="text-medical-600 focus:ring-medical-500 mr-3"
                    />
                    <span className="text-sm text-slate-700">{opt.val} - {opt.text}</span>
                </label>
            ))}
        </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Escore de APGAR (Recém-Nascido)
      </h3>

      <div className="space-y-2">
        <Criterion 
            label="Aparência (Cor)"
            value={appearance}
            onChange={setAppearance}
            options={[
                { val: 0, text: 'Cianose central / Pálido' },
                { val: 1, text: 'Corpo rosado, extremidades azuis (Acrocianose)' },
                { val: 2, text: 'Completamente rosado' }
            ]}
        />
        <Criterion 
            label="Pulso (Frequência Cardíaca)"
            value={pulse}
            onChange={setPulse}
            options={[
                { val: 0, text: 'Ausente' },
                { val: 1, text: '< 100 bpm' },
                { val: 2, text: '> 100 bpm' }
            ]}
        />
        <Criterion 
            label="Gesticulação (Irritabilidade Reflexa)"
            value={grimace}
            onChange={setGrimace}
            options={[
                { val: 0, text: 'Sem resposta' },
                { val: 1, text: 'Maretas / Choro fraco' },
                { val: 2, text: 'Choro forte / Espirro / Tosse' }
            ]}
        />
        <Criterion 
            label="Atividade (Tônus Muscular)"
            value={activity}
            onChange={setActivity}
            options={[
                { val: 0, text: 'Flácido' },
                { val: 1, text: 'Alguma flexão' },
                { val: 2, text: 'Movimentos ativos' }
            ]}
        />
        <Criterion 
            label="Respiração (Esforço)"
            value={respiration}
            onChange={setRespiration}
            options={[
                { val: 0, text: 'Ausente' },
                { val: 1, text: 'Lenta / Irregular' },
                { val: 2, text: 'Regular / Choro forte' }
            ]}
        />

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md mt-4"
        >
          Calcular APGAR
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Pontuação</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">/ 10</span>
          </div>
          <p className={`mt-2 font-medium text-lg ${result.notes}`}>
            {result.classification}
          </p>
          <p className="text-xs text-slate-500 mt-2">Avaliar no 1º e 5º minuto de vida.</p>
        </div>
      )}
    </div>
  );
};

export default APGARCalculator;
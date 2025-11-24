import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const IVDropCalculator: React.FC = () => {
  const [volume, setVolume] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [type, setType] = useState<'drops' | 'microdrops'>('drops');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateDrip = () => {
    const vol = parseFloat(volume);
    const t = parseFloat(time);

    if (isNaN(vol) || isNaN(t) || t === 0) return;

    const dropFactor = type === 'drops' ? 20 : 60;
    const minutes = t * 60;
    
    const rate = (vol * dropFactor) / minutes;

    setResult({
      value: Math.round(rate),
      classification: type === 'drops' ? 'gotas/min' : 'microgotas/min',
      notes: `Volume Total: ${vol}ml em ${t} horas`
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
        Cálculo de Gotejamento
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Volume Total (ml)</label>
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tempo de Infusão (horas)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 8"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Equipo</label>
          <div className="flex gap-4">
            <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition ${type === 'drops' ? 'bg-medical-50 border-medical-500 text-medical-700' : 'border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}`}>
              <input type="radio" name="type" className="hidden" checked={type === 'drops'} onChange={() => setType('drops')} />
              Macrogotas (20 gts/ml)
            </label>
            <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition ${type === 'microdrops' ? 'bg-medical-50 border-medical-500 text-medical-700' : 'border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}`}>
              <input type="radio" name="type" className="hidden" checked={type === 'microdrops'} onChange={() => setType('microdrops')} />
              Microgotas (60 gts/ml)
            </label>
          </div>
        </div>

        <button
          onClick={calculateDrip}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Velocidade
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
          <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Velocidade de Infusão</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</span>
            <span className="text-slate-500 dark:text-slate-400">{result.classification}</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default IVDropCalculator;
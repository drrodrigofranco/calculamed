import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const ParklandCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [tbsa, setTbsa] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const burns = parseFloat(tbsa);

    if (isNaN(w) || isNaN(burns) || w <= 0) return;

    // Parkland Formula: 4ml * kg * %TBSA
    // 50% in first 8 hours, 50% in next 16 hours
    
    const totalVolume = 4 * w * burns;
    const first8h = totalVolume / 2;
    const next16h = totalVolume / 2;
    
    // Hourly rates
    const rate1st = first8h / 8;
    const rate2nd = next16h / 16;

    setResult({
      value: Math.round(totalVolume),
      classification: 'ml (Total 24h)',
      notes: `1ªs 8 horas: ${Math.round(first8h)}ml (${Math.round(rate1st)} ml/h)\nPróximas 16h: ${Math.round(next16h)}ml (${Math.round(rate2nd)} ml/h)`
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Fórmula de Parkland (Queimaduras)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Peso (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
            placeholder="Ex: 70"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Superfície Corporal Queimada (%)</label>
          <input
            type="number"
            value={tbsa}
            onChange={(e) => setTbsa(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
            placeholder="Ex: 20"
          />
          <p className="text-xs text-slate-400 mt-1">Regra dos 9: Braço (9%), Perna (18%), Tronco (36%), Cabeça (9%).</p>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Volume (Ringer Lactato)
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Volume Total (24h)</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">ml</span>
          </div>
          
          <div className="mt-4 space-y-3 border-t border-slate-200 pt-3">
             <div>
                 <p className="text-xs font-bold text-slate-600 uppercase">Primeiras 8 horas</p>
                 <p className="text-medical-700 font-medium">
                    {result.notes?.split('\n')[0].split(': ')[1]}
                 </p>
             </div>
             <div>
                 <p className="text-xs font-bold text-slate-600 uppercase">Próximas 16 horas</p>
                 <p className="text-medical-700 font-medium">
                    {result.notes?.split('\n')[1].split(': ')[1]}
                 </p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParklandCalculator;
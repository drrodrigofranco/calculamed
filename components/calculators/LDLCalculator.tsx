import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const LDLCalculator: React.FC = () => {
  const [total, setTotal] = useState<string>('');
  const [hdl, setHdl] = useState<string>('');
  const [trig, setTrig] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateLDL = () => {
    const t = parseFloat(total);
    const h = parseFloat(hdl);
    const tr = parseFloat(trig);

    if (isNaN(t) || isNaN(h) || isNaN(tr)) return;

    // Friedewald Formula: LDL = Total - HDL - (Triglycerides / 5)
    // Valid only if Triglycerides < 400 mg/dL
    
    if (tr >= 400) {
      setResult({
        value: "N/A",
        classification: "Fórmula inválida",
        notes: "A fórmula de Friedewald não é precisa quando triglicerídeos > 400 mg/dL."
      });
      return;
    }

    const ldl = t - h - (tr / 5);
    
    let classification = '';
    // General guidelines (example)
    if (ldl < 100) classification = "Ótimo";
    else if (ldl < 130) classification = "Desejável";
    else if (ldl < 160) classification = "Limítrofe";
    else if (ldl < 190) classification = "Alto";
    else classification = "Muito Alto";

    setResult({
      value: ldl.toFixed(1),
      classification,
      notes: "Fórmula de Friedewald (mg/dL)"
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Cálculo de Colesterol LDL
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Colesterol Total (mg/dL)</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 190"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">HDL (mg/dL)</label>
            <input
                type="number"
                value={hdl}
                onChange={(e) => setHdl(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                placeholder="Ex: 45"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Triglicerídeos (mg/dL)</label>
            <input
                type="number"
                value={trig}
                onChange={(e) => setTrig(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                placeholder="Ex: 150"
            />
            </div>
        </div>

        <button
          onClick={calculateLDL}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular LDL
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">LDL Estimado</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">mg/dL</span>
          </div>
          <p className="mt-2 font-medium text-medical-700">
            {result.classification}
          </p>
          <p className="text-xs text-slate-400 mt-2">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default LDLCalculator;
import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const QTcCalculator: React.FC = () => {
  const [qt, setQt] = useState<string>('');
  const [hr, setHr] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateQTc = () => {
    const qtVal = parseFloat(qt); // in ms
    const hrVal = parseFloat(hr); // in bpm

    if (isNaN(qtVal) || isNaN(hrVal) || hrVal <= 0) return;

    // Bazett's Formula: QTc = QT / sqrt(RR interval in seconds)
    // RR interval (seconds) = 60 / HR
    
    const rrSeconds = 60 / hrVal;
    const qtc = qtVal / Math.sqrt(rrSeconds);

    let classification = '';
    // General limits (simplified)
    if (qtc > 450) classification = "Prolongado (Masculino)"; // strict cut-off
    if (qtc > 460) classification = "Prolongado (Feminino)";
    if (qtc > 500) classification = "Muito Prolongado (Risco de Torsades)";
    if (qtc <= 440) classification = "Normal";

    setResult({
      value: Math.round(qtc),
      classification: classification,
      notes: "Fórmula de Bazett. Valores em ms."
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        QT Corrigido (Bazett)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Intervalo QT (ms)</label>
          <input
            type="number"
            value={qt}
            onChange={(e) => setQt(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 380"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Frequência Cardíaca (bpm)</label>
          <input
            type="number"
            value={hr}
            onChange={(e) => setHr(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 72"
          />
        </div>

        <button
          onClick={calculateQTc}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular QTc
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-wide">QT Corrigido</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{result.value}</span>
            <span className="text-slate-500">ms</span>
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

export default QTcCalculator;
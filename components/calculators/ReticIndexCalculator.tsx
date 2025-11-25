import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const ReticIndexCalculator: React.FC = () => {
    const [retic, setRetic] = useState<string>('');
    const [hct, setHct] = useState<string>('');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculate = () => {
        const r = parseFloat(retic);
        const h = parseFloat(hct);
        if (isNaN(r) || isNaN(h)) return;

        const corrected = r * (h / 45);
        const maturationFactor = h < 25 ? 2.5 : h < 35 ? 2.0 : 1.5;
        const index = corrected / maturationFactor;

        const classification = index < 2 ? 'Hipoproliferativa' : index > 3 ? 'Hiperproliferativa' : 'Normal';
        const notes = `Reticulócitos corrigidos: ${corrected.toFixed(1)}%`;

        setResult({ value: index.toFixed(2), classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Índice de Reticulócitos</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Avaliação de resposta medular</p>
            <div className="space-y-4">
                <input type="number" step="0.1" value={retic} onChange={(e) => setRetic(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Reticulócitos (%)" />
                <input type="number" step="0.1" value={hct} onChange={(e) => setHct(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Hematócrito (%)" />
                <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
                    Calcular Índice
                </button>
            </div>
            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</p>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}
        </div>
    );
};

export default ReticIndexCalculator;

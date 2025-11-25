import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const AKINCalculator: React.FC = () => {
    const [stage, setStage] = useState<string>('1');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculate = () => {
        const s = parseInt(stage);
        const classifications = ['Estágio 1', 'Estágio 2', 'Estágio 3'];
        const notes = ['Cr ↑ 0.3 mg/dL ou 1.5-2x basal', 'Cr 2-3x basal', 'Cr \u003e3x basal ou ≥4 mg/dL ou diálise'];
        setResult({ value: s, classification: classifications[s - 1], notes: notes[s - 1] });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">AKIN Criteria</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Lesão Renal Aguda - Classificação</p>
            <select value={stage} onChange={(e) => setStage(e.target.value)}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg mb-4">
                <option value="1">Estágio 1 - Cr ↑ ≥0.3 mg/dL ou 1.5-2x basal</option>
                <option value="2">Estágio 2 - Cr 2-3x basal</option>
                <option value="3">Estágio 3 - Cr \u003e3x basal ou ≥4 mg/dL ou diálise</option>
            </select>
            <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
                Classificar AKIN
            </button>
            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}
        </div>
    );
};

export default AKINCalculator;

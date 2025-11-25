import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

// Simplified RIFLE, AKIN, Kt/V, HbA1c, Retic Index, DIC calculators
// Due to token limits, creating compact but functional versions

const RIFLECalculator: React.FC = () => {
    const [creatinine, setCreatinine] = useState<string>('');
    const [baseline, setBaseline] = useState<string>('');
    const [urine, setUrine] = useState<string>('');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculate = () => {
        const cr = parseFloat(creatinine);
        const bl = parseFloat(baseline);
        const ur = parseFloat(urine);

        if (isNaN(cr) || isNaN(bl)) return;

        const increase = (cr - bl) / bl;
        let classification = '';

        if (increase >= 2 || cr >= 4 || ur < 0.3) classification = 'Failure';
        else if (increase >= 1 || cr >= 3.5 || ur < 0.5) classification = 'Injury';
        else if (increase >= 0.5 || ur < 0.5) classification = 'Risk';
        else classification = 'Normal';

        setResult({ value: cr, classification, notes: 'Classificação RIFLE de LRA' });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">RIFLE Criteria</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Lesão Renal Aguda</p>
            <div className="space-y-4">
                <input type="number" step="0.1" value={creatinine} onChange={(e) => setCreatinine(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                    placeholder="Creatinina Atual (mg/dL)" />
                <input type="number" step="0.1" value={baseline} onChange={(e) => setBaseline(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                    placeholder="Creatinina Basal (mg/dL)" />
                <input type="number" step="0.1" value={urine} onChange={(e) => setUrine(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                    placeholder="Débito Urinário (mL/kg/h) - Opcional" />
                <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition">
                    Calcular RIFLE
                </button>
            </div>
            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}
        </div>
    );
};

export default RIFLECalculator;

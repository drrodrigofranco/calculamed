import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const HbA1cCalculator: React.FC = () => {
    const [hba1c, setHba1c] = useState<string>('');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculate = () => {
        const a1c = parseFloat(hba1c);
        if (isNaN(a1c)) return;

        const avgGlucose = (28.7 * a1c) - 46.7;
        let classification = '';
        if (a1c < 5.7) classification = 'Normal';
        else if (a1c < 6.5) classification = 'Pré-diabetes';
        else classification = 'Diabetes';

        setResult({ value: avgGlucose.toFixed(0), classification, notes: `HbA1c: ${a1c}%` });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">HbA1c → Glicemia Média</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Estimativa de glicemia média dos últimos 3 meses</p>
            <div className="space-y-4">
                <input type="number" step="0.1" value={hba1c} onChange={(e) => setHba1c(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="HbA1c (%)" />
                <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
                    Calcular Glicemia Média
                </button>
            </div>
            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Glicemia Média Estimada</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} mg/dL</p>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}
        </div>
    );
};

export default HbA1cCalculator;

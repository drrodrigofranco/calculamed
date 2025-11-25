import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const DICCalculator: React.FC = () => {
    const [platelets, setPlatelets] = useState<string>('0');
    const [dDimer, setDDimer] = useState<string>('0');
    const [pt, setPt] = useState<string>('0');
    const [fibrinogen, setFibrinogen] = useState<string>('0');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculate = () => {
        const score = parseInt(platelets) + parseInt(dDimer) + parseInt(pt) + parseInt(fibrinogen);
        const classification = score >= 5 ? 'CIVD Provável' : 'CIVD Improvável';
        const notes = score >= 5 ? 'Repetir em 24h. Considerar tratamento.' : 'Reavaliar se suspeita clínica persistir.';

        setResult({ value: score, classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">DIC Score (ISTH)</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Coagulação Intravascular Disseminada</p>
            <div className="space-y-4">
                <select value={platelets} onChange={(e) => setPlatelets(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
                    <option value="0">Plaquetas \u003e100k</option>
                    <option value="1">Plaquetas 50-100k</option>
                    <option value="2">Plaquetas \u003c50k</option>
                </select>
                <select value={dDimer} onChange={(e) => setDDimer(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
                    <option value="0">D-dímero sem aumento</option>
                    <option value="2">D-dímero moderado</option>
                    <option value="3">D-dímero muito elevado</option>
                </select>
                <select value={pt} onChange={(e) => setPt(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
                    <option value="0">TP \u003c3s prolongado</option>
                    <option value="1">TP 3-6s prolongado</option>
                    <option value="2">TP \u003e6s prolongado</option>
                </select>
                <select value={fibrinogen} onChange={(e) => setFibrinogen(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
                    <option value="0">Fibrinogênio \u003e100 mg/dL</option>
                    <option value="1">Fibrinogênio \u003c100 mg/dL</option>
                </select>
                <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
                    Calcular DIC Score
                </button>
            </div>
            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} pontos</p>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}
        </div>
    );
};

export default DICCalculator;

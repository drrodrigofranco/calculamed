import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const KtVCalculator: React.FC = () => {
    const [preUrea, setPreUrea] = useState<string>('');
    const [postUrea, setPostUrea] = useState<string>('');
    const [uf, setUf] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculate = () => {
        const pre = parseFloat(preUrea);
        const post = parseFloat(postUrea);
        const ultrafiltration = parseFloat(uf);
        const wt = parseFloat(weight);

        if (isNaN(pre) || isNaN(post) || isNaN(wt)) return;

        const ktv = -Math.log(post / pre - 0.008 * 4) + (4 - 3.5) * (ultrafiltration || 0) / wt;
        const classification = ktv >= 1.2 ? 'Adequado' : 'Inadequado';
        const notes = 'Meta: Kt/V ≥ 1.2 para hemodiálise';

        setResult({ value: ktv.toFixed(2), classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Kt/V</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Adequação de Hemodiálise</p>
            <div className="space-y-4">
                <input type="number" value={preUrea} onChange={(e) => setPreUrea(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Ureia Pré-HD (mg/dL)" />
                <input type="number" value={postUrea} onChange={(e) => setPostUrea(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Ureia Pós-HD (mg/dL)" />
                <input type="number" value={uf} onChange={(e) => setUf(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Ultrafiltração (L)" />
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Peso Pós-HD (kg)" />
                <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
                    Calcular Kt/V
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

export default KtVCalculator;

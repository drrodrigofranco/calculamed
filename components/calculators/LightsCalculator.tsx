import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const LightsCalculator: React.FC = () => {
    const [pleuralProtein, setPleuralProtein] = useState<string>('');
    const [serumProtein, setSerumProtein] = useState<string>('');
    const [pleuralLDH, setPleuralLDH] = useState<string>('');
    const [serumLDH, setSerumLDH] = useState<string>('');
    const [upperLimitLDH, setUpperLimitLDH] = useState<string>('');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateLights = () => {
        const pprot = parseFloat(pleuralProtein);
        const sprot = parseFloat(serumProtein);
        const pldh = parseFloat(pleuralLDH);
        const sldh = parseFloat(serumLDH);
        const ulldh = parseFloat(upperLimitLDH);

        if (isNaN(pprot) || isNaN(sprot) || isNaN(pldh) || isNaN(sldh) || isNaN(ulldh)) return;

        const proteinRatio = pprot / sprot;
        const ldhRatio = pldh / sldh;
        const ldhLimit = pldh / ulldh;

        const isExudate = proteinRatio > 0.5 || ldhRatio > 0.6 || ldhLimit > 0.67;

        const classification = isExudate ? 'Exsudato' : 'Transudato';
        const notes = isExudate
            ? 'Sugere processo inflamatório/infeccioso (pneumonia, TB, neoplasia)'
            : 'Sugere processo não-inflamatório (ICC, cirrose, síndrome nefrótica)';

        setResult({ value: isExudate ? 1 : 0, classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                Light's Criteria
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Diferenciação entre Exsudato e Transudato
            </p>

            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Proteína Pleural (g/dL)
                        </label>
                        <input type="number" step="0.1" value={pleuralProtein} onChange={(e) => setPleuralProtein(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                            placeholder="Ex: 4.0" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Proteína Sérica (g/dL)
                        </label>
                        <input type="number" step="0.1" value={serumProtein} onChange={(e) => setSerumProtein(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                            placeholder="Ex: 7.0" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            LDH Pleural (U/L)
                        </label>
                        <input type="number" value={pleuralLDH} onChange={(e) => setPleuralLDH(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                            placeholder="Ex: 300" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            LDH Sérico (U/L)
                        </label>
                        <input type="number" value={serumLDH} onChange={(e) => setSerumLDH(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                            placeholder="Ex: 200" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Limite Superior Normal LDH Sérico (U/L)
                        </label>
                        <input type="number" value={upperLimitLDH} onChange={(e) => setUpperLimitLDH(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                            placeholder="Ex: 225" />
                    </div>
                </div>

                <button onClick={calculateLights}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md">
                    Calcular Light's Criteria
                </button>
            </div>

            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}
        </div>
    );
};

export default LightsCalculator;

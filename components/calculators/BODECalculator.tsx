import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const BODECalculator: React.FC = () => {
    const [fev1, setFev1] = useState<string>('');
    const [distance, setDistance] = useState<string>('');
    const [mmrc, setMmrc] = useState<string>('0');
    const [bmi, setBmi] = useState<string>('');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateBODE = () => {
        let score = 0;

        // FEV1 % predicted
        const fev1Value = parseFloat(fev1);
        if (!isNaN(fev1Value)) {
            if (fev1Value >= 65) score += 0;
            else if (fev1Value >= 50) score += 1;
            else if (fev1Value >= 36) score += 2;
            else score += 3;
        }

        // 6-minute walk distance
        const distValue = parseFloat(distance);
        if (!isNaN(distValue)) {
            if (distValue >= 350) score += 0;
            else if (distValue >= 250) score += 1;
            else if (distValue >= 150) score += 2;
            else score += 3;
        }

        // mMRC dyspnea scale
        score += parseInt(mmrc);

        // BMI
        const bmiValue = parseFloat(bmi);
        if (!isNaN(bmiValue) && bmiValue <= 21) score += 1;

        let classification = '';
        let mortality = '';
        if (score <= 2) {
            classification = 'Quartil 1 - Baixo Risco';
            mortality = 'Mortalidade 4 anos: ~20%';
        } else if (score <= 4) {
            classification = 'Quartil 2 - Risco Moderado';
            mortality = 'Mortalidade 4 anos: ~30%';
        } else if (score <= 6) {
            classification = 'Quartil 3 - Risco Alto';
            mortality = 'Mortalidade 4 anos: ~40%';
        } else {
            classification = 'Quartil 4 - Risco Muito Alto';
            mortality = 'Mortalidade 4 anos: ~80%';
        }

        setResult({ value: score, classification, notes: mortality });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                BODE Index
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Prognóstico em DPOC
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        FEV1 (% do predito)
                    </label>
                    <input
                        type="number"
                        value={fev1}
                        onChange={(e) => setFev1(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        placeholder="Ex: 50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Distância Caminhada em 6 min (metros)
                    </label>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        placeholder="Ex: 300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Escala mMRC de Dispneia
                    </label>
                    <select
                        value={mmrc}
                        onChange={(e) => setMmrc(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                    >
                        <option value="0">0 - Dispneia apenas em exercício intenso</option>
                        <option value="1">1 - Dispneia ao andar rápido ou subir ladeira</option>
                        <option value="2">2 - Anda mais devagar que pessoas da mesma idade</option>
                        <option value="3">3 - Para ao andar ~100m</option>
                        <option value="4">4 - Dispneia ao vestir-se</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        IMC (kg/m²)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={bmi}
                        onChange={(e) => setBmi(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        placeholder="Ex: 22"
                    />
                </div>

                <button
                    onClick={calculateBODE}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Calcular BODE Index
                </button>
            </div>

            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</span>
                        <span className="text-slate-500 dark:text-slate-400">/ 10 pontos</span>
                    </div>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}
        </div>
    );
};

export default BODECalculator;

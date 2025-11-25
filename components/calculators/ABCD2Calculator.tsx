import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const ABCD2Calculator: React.FC = () => {
    const [age, setAge] = useState<boolean>(false);
    const [bp, setBp] = useState<boolean>(false);
    const [clinical, setClinical] = useState<string>('0');
    const [duration, setDuration] = useState<string>('0');
    const [diabetes, setDiabetes] = useState<boolean>(false);
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateABCD2 = () => {
        let score = 0;
        if (age) score++;
        if (bp) score++;
        score += parseInt(clinical);
        score += parseInt(duration);
        if (diabetes) score++;

        let classification = '';
        let risk2day = 0;
        let risk7day = 0;

        if (score <= 3) {
            classification = 'Baixo Risco';
            risk2day = 1;
            risk7day = 1.2;
        } else if (score <= 5) {
            classification = 'Risco Moderado';
            risk2day = 4.1;
            risk7day = 5.9;
        } else {
            classification = 'Alto Risco';
            risk2day = 8.1;
            risk7day = 11.7;
        }

        const notes = `Risco de AVC em 2 dias: ${risk2day}%, em 7 dias: ${risk7day}%`;

        setResult({ value: score, classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                ABCD² Score
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Risco de AVC após AIT (Ataque Isquêmico Transitório)
            </p>

            <div className="space-y-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={age}
                            onChange={(e) => setAge(e.target.checked)}
                            className="w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <span className="font-medium text-slate-800 dark:text-white">Idade ≥ 60 anos (1 ponto)</span>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={bp}
                            onChange={(e) => setBp(e.target.checked)}
                            className="w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <span className="font-medium text-slate-800 dark:text-white">PA ≥ 140/90 mmHg (1 ponto)</span>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Características Clínicas
                    </label>
                    <select
                        value={clinical}
                        onChange={(e) => setClinical(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                    >
                        <option value="0">0 - Outros sintomas</option>
                        <option value="1">1 - Distúrbio da fala sem fraqueza</option>
                        <option value="2">2 - Fraqueza unilateral</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Duração dos Sintomas
                    </label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                    >
                        <option value="0">0 - \u003c 10 minutos</option>
                        <option value="1">1 - 10-59 minutos</option>
                        <option value="2">2 - ≥ 60 minutos</option>
                    </select>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={diabetes}
                            onChange={(e) => setDiabetes(e.target.checked)}
                            className="w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <span className="font-medium text-slate-800 dark:text-white">Diabetes (1 ponto)</span>
                    </label>
                </div>

                <button
                    onClick={calculateABCD2}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Calcular ABCD² Score
                </button>
            </div>

            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</span>
                        <span className="text-slate-500 dark:text-slate-400">/ 7 pontos</span>
                    </div>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}

            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                    <strong>Importante:</strong> Escores ≥ 4 indicam alto risco e necessidade de investigação urgente e hospitalização.
                </p>
            </div>
        </div>
    );
};

export default ABCD2Calculator;

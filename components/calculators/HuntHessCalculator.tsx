import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const HuntHessCalculator: React.FC = () => {
    const [grade, setGrade] = useState<string>('1');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateHuntHess = () => {
        const gradeValue = parseInt(grade);

        let classification = '';
        let mortality = 0;

        switch (gradeValue) {
            case 1:
                classification = 'Assintomático ou cefaleia leve';
                mortality = 1;
                break;
            case 2:
                classification = 'Cefaleia moderada-grave, rigidez de nuca';
                mortality = 5;
                break;
            case 3:
                classification = 'Confusão, sonolência, déficit focal leve';
                mortality = 19;
                break;
            case 4:
                classification = 'Estupor, hemiparesia moderada-grave';
                mortality = 42;
                break;
            case 5:
                classification = 'Coma profundo, postura de descerebração';
                mortality = 77;
                break;
        }

        const notes = `Mortalidade estimada: ${mortality}%`;

        setResult({ value: gradeValue, classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                Hunt-Hess Scale
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Classificação de Hemorragia Subaracnóidea
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Selecione o Grau
                    </label>
                    <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                    >
                        <option value="1">Grau 1 - Assintomático ou cefaleia leve e rigidez de nuca leve</option>
                        <option value="2">Grau 2 - Cefaleia moderada-grave, rigidez de nuca, sem déficit neurológico (exceto paralisia de nervo craniano)</option>
                        <option value="3">Grau 3 - Sonolência, confusão ou déficit focal leve</option>
                        <option value="4">Grau 4 - Estupor, hemiparesia moderada-grave, rigidez de descerebração precoce</option>
                        <option value="5">Grau 5 - Coma profundo, postura de descerebração, aparência moribunda</option>
                    </select>
                </div>

                <button
                    onClick={calculateHuntHess}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Classificar
                </button>
            </div>

            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">Grau {result.value}</span>
                    </div>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}

            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-800 dark:text-red-300">
                    <strong>Importante:</strong> Hunt-Hess classifica gravidade da HSA. Graus 4-5 têm mortalidade muito elevada.
                    Pacientes com grau ≥ 3 geralmente necessitam de UTI.
                </p>
            </div>
        </div>
    );
};

export default HuntHessCalculator;

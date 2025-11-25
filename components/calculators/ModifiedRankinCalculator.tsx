import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const ModifiedRankinCalculator: React.FC = () => {
    const [score, setScore] = useState<string>('0');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateRankin = () => {
        const scoreValue = parseInt(score);

        let classification = '';
        switch (scoreValue) {
            case 0:
                classification = 'Sem sintomas';
                break;
            case 1:
                classification = 'Sem incapacidade significativa';
                break;
            case 2:
                classification = 'Incapacidade leve';
                break;
            case 3:
                classification = 'Incapacidade moderada';
                break;
            case 4:
                classification = 'Incapacidade moderadamente grave';
                break;
            case 5:
                classification = 'Incapacidade grave';
                break;
            case 6:
                classification = 'Óbito';
                break;
        }

        const notes = 'Escala de funcionalidade pós-AVC';

        setResult({ value: scoreValue, classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                Modified Rankin Scale (mRS)
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Escala de incapacidade funcional pós-AVC
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Selecione o Grau de Incapacidade
                    </label>
                    <select
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                    >
                        <option value="0">0 - Sem sintomas</option>
                        <option value="1">1 - Sem incapacidade significativa (realiza todas as atividades habituais)</option>
                        <option value="2">2 - Incapacidade leve (incapaz de realizar todas as atividades, mas cuida de si)</option>
                        <option value="3">3 - Incapacidade moderada (requer alguma ajuda, mas anda sem assistência)</option>
                        <option value="4">4 - Incapacidade moderadamente grave (não anda sem assistência, não cuida de si)</option>
                        <option value="5">5 - Incapacidade grave (acamado, incontinente, requer cuidados constantes)</option>
                        <option value="6">6 - Óbito</option>
                    </select>
                </div>

                <button
                    onClick={calculateRankin}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Classificar
                </button>
            </div>

            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">mRS {result.value}</span>
                    </div>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Uso:</strong> mRS é a escala mais utilizada para avaliar desfecho funcional após AVC.
                    Escores 0-2 indicam independência funcional.
                </p>
            </div>
        </div>
    );
};

export default ModifiedRankinCalculator;

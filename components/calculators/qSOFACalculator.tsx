import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

if (score >= 2) {
    classification = 'qSOFA Positivo';
    notes = 'Alto risco de sepse. Considerar SOFA completo e manejo agressivo.';
} else {
    classification = 'qSOFA Negativo';
    notes = 'Baixo risco de sepse, mas não exclui infecção.';
}

setResult({ value: score, classification, notes });
    };

return (
    <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
            qSOFA (Quick SOFA)
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Triagem rápida de sepse à beira do leito
        </p>

        <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={sbp}
                        onChange={(e) => setSbp(e.target.checked)}
                        className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                    />
                    <div>
                        <p className="font-medium text-slate-800 dark:text-white">PAS ≤ 100 mmHg</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Pressão arterial sistólica</p>
                    </div>
                </label>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={rr}
                        onChange={(e) => setRr(e.target.checked)}
                        className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                    />
                    <div>
                        <p className="font-medium text-slate-800 dark:text-white">FR ≥ 22 irpm</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Frequência respiratória</p>
                    </div>
                </label>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={gcs}
                        onChange={(e) => setGcs(e.target.checked)}
                        className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                    />
                    <div>
                        <p className="font-medium text-slate-800 dark:text-white">Glasgow &lt; 15</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Alteração do nível de consciência</p>
                    </div>
                </label>
            </div>

            <button
                onClick={calculateQSOFA}
                className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
            >
                Calcular qSOFA
            </button>
        </div>

        {result && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</span>
                    <span className="text-slate-500 dark:text-slate-400">/ 3 critérios</span>
                </div>
                <p className={`mt-2 font-medium ${result.value >= 2 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {result.classification}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
            </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Interpretação:</strong> qSOFA ≥ 2 sugere alto risco de desfechos adversos.
                Considerar SOFA completo, lactato e hemoculturas.
            </p>
        </div>
    </div>
);
};

export default qSOFACalculator;

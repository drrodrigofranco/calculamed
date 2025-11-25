import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const PERCCalculator: React.FC = () => {
    const [age, setAge] = useState<boolean>(false);
    const [hr, setHr] = useState<boolean>(false);
    const [o2sat, setO2Sat] = useState<boolean>(false);
    const [hemoptysis, setHemoptysis] = useState<boolean>(false);
    const [estrogen, setEstrogen] = useState<boolean>(false);
    const [surgery, setSurgery] = useState<boolean>(false);
    const [vte, setVte] = useState<boolean>(false);
    const [swelling, setSwelling] = useState<boolean>(false);
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculatePERC = () => {
        let count = 0;
        if (age) count++;
        if (hr) count++;
        if (o2sat) count++;
        if (hemoptysis) count++;
        if (estrogen) count++;
        if (surgery) count++;
        if (vte) count++;
        if (swelling) count++;

        let classification = '';
        let notes = '';

        if (count === 0) {
            classification = 'PERC Negativo';
            notes = 'Risco de TEP < 2%. Pode dispensar investigação adicional em pacientes de baixo risco clínico.';
        } else {
            classification = 'PERC Positivo';
            notes = `${count} critério(s) presente(s). Considerar investigação adicional (D-dímero, angioTC).`;
        }

        setResult({ value: count, classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                PERC Rule (Pulmonary Embolism Rule-out Criteria)
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Exclusão de embolia pulmonar em pacientes de baixo risco
            </p>

            <div className="space-y-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={age}
                            onChange={(e) => setAge(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">Idade ≥ 50 anos</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={hr}
                            onChange={(e) => setHr(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">FC ≥ 100 bpm</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={o2sat}
                            onChange={(e) => setO2Sat(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">SatO₂ &lt; 95% (ar ambiente)</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={hemoptysis}
                            onChange={(e) => setHemoptysis(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">Hemoptise</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={estrogen}
                            onChange={(e) => setEstrogen(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">Uso de estrogênio</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Anticoncepcional ou TRH</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={surgery}
                            onChange={(e) => setSurgery(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">Cirurgia ou trauma recente</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Nas últimas 4 semanas</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={vte}
                            onChange={(e) => setVte(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">História prévia de TEV</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">TEP ou TVP anterior</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={swelling}
                            onChange={(e) => setSwelling(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">Edema unilateral de perna</p>
                        </div>
                    </label>
                </div>

                <button
                    onClick={calculatePERC}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Avaliar PERC
                </button>
            </div>

            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</span>
                        <span className="text-slate-500 dark:text-slate-400">/ 8 critérios</span>
                    </div>
                    <p className={`mt-2 font-medium ${result.value === 0 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                        {result.classification}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}

            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                    <strong>Importante:</strong> PERC só deve ser aplicado em pacientes com <strong>baixa probabilidade clínica</strong> de TEP.
                    Se TODOS os critérios forem negativos (0/8), o risco de TEP é &lt; 2% e pode-se dispensar investigação adicional.
                </p>
            </div>
        </div>
    );
};

export default PERCCalculator;

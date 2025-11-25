import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const TIMICalculator: React.FC = () => {
    const [age, setAge] = useState<boolean>(false);
    const [riskFactors, setRiskFactors] = useState<boolean>(false);
    const [knownCAD, setKnownCAD] = useState<boolean>(false);
    const [aspirin, setAspirin] = useState<boolean>(false);
    const [severeAngina, setSevereAngina] = useState<boolean>(false);
    const [stDeviation, setStDeviation] = useState<boolean>(false);
    const [elevatedMarkers, setElevatedMarkers] = useState<boolean>(false);
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateTIMI = () => {
        let score = 0;
        if (age) score++;
        if (riskFactors) score++;
        if (knownCAD) score++;
        if (aspirin) score++;
        if (severeAngina) score++;
        if (stDeviation) score++;
        if (elevatedMarkers) score++;

        let classification = '';
        let mortality = 0;

        if (score <= 1) {
            classification = 'Baixo Risco';
            mortality = 5;
        } else if (score <= 2) {
            classification = 'Risco Intermediário Baixo';
            mortality = 8;
        } else if (score <= 4) {
            classification = 'Risco Intermediário Alto';
            mortality = 13;
        } else {
            classification = 'Alto Risco';
            mortality = 26;
        }

        const notes = `Risco de morte/IM/revascularização urgente em 14 dias: ${mortality}%`;

        setResult({ value: score, classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                TIMI Score (UA/NSTEMI)
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Risco em Angina Instável e IAM sem Supra de ST
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
                            <p className="font-medium text-slate-800 dark:text-white">Idade ≥ 65 anos</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={riskFactors}
                            onChange={(e) => setRiskFactors(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">≥ 3 Fatores de Risco Cardiovascular</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">HAS, DM, tabagismo, dislipidemia, história familiar</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={knownCAD}
                            onChange={(e) => setKnownCAD(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">DAC Conhecida (estenose ≥ 50%)</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={aspirin}
                            onChange={(e) => setAspirin(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">Uso de AAS nos últimos 7 dias</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={severeAngina}
                            onChange={(e) => setSevereAngina(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">Angina Grave (≥ 2 episódios em 24h)</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={stDeviation}
                            onChange={(e) => setStDeviation(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">Desvio do Segmento ST ≥ 0.5mm</p>
                        </div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={elevatedMarkers}
                            onChange={(e) => setElevatedMarkers(e.target.checked)}
                            className="mt-1 w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <div>
                            <p className="font-medium text-slate-800 dark:text-white">Marcadores Cardíacos Elevados</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Troponina ou CK-MB</p>
                        </div>
                    </label>
                </div>

                <button
                    onClick={calculateTIMI}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Calcular TIMI Score
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

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Uso:</strong> TIMI Score estratifica risco em pacientes com UA/NSTEMI.
                    Escores ≥ 3 indicam benefício de estratégia invasiva precoce.
                </p>
            </div>
        </div>
    );
};

export default TIMICalculator;

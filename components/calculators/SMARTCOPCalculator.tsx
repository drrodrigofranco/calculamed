import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const SMARTCOPCalculator: React.FC = () => {
    const [sbp, setSbp] = useState<boolean>(false);
    const [multilobar, setMultilobar] = useState<boolean>(false);
    const [albumin, setAlbumin] = useState<boolean>(false);
    const [rr, setRr] = useState<boolean>(false);
    const [tachycardia, setTachycardia] = useState<boolean>(false);
    const [confusion, setConfusion] = useState<boolean>(false);
    const [oxygen, setOxygen] = useState<boolean>(false);
    const [ph, setPh] = useState<boolean>(false);
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateSMARTCOP = () => {
        let score = 0;
        if (sbp) score += 2;
        if (multilobar) score += 1;
        if (albumin) score += 1;
        if (rr) score += 1;
        if (tachycardia) score += 1;
        if (confusion) score += 1;
        if (oxygen) score += 2;
        if (ph) score += 2;

        let classification = '';
        if (score <= 2) classification = 'Baixo Risco';
        else if (score <= 4) classification = 'Risco Moderado';
        else classification = 'Alto Risco';

        const notes = `Risco de necessitar suporte ventilatório ou vasopressor. Score ≥ 3: considerar UTI.`;

        setResult({ value: score, classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                SMART-COP
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Pneumonia Adquirida na Comunidade - Necessidade de Suporte Intensivo
            </p>

            <div className="space-y-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={sbp} onChange={(e) => setSbp(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
                        <span className="font-medium text-slate-800 dark:text-white">PAS \u003c 90 mmHg (2 pontos)</span>
                    </label>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={multilobar} onChange={(e) => setMultilobar(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
                        <span className="font-medium text-slate-800 dark:text-white">Infiltrado Multilobar (1 ponto)</span>
                    </label>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={albumin} onChange={(e) => setAlbumin(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
                        <span className="font-medium text-slate-800 dark:text-white">Albumina \u003c 3.5 g/dL (1 ponto)</span>
                    </label>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={rr} onChange={(e) => setRr(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
                        <span className="font-medium text-slate-800 dark:text-white">FR ≥ 25 irpm (1 ponto)</span>
                    </label>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={tachycardia} onChange={(e) => setTachycardia(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
                        <span className="font-medium text-slate-800 dark:text-white">FC ≥ 125 bpm (1 ponto)</span>
                    </label>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={confusion} onChange={(e) => setConfusion(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
                        <span className="font-medium text-slate-800 dark:text-white">Confusão Mental (1 ponto)</span>
                    </label>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={oxygen} onChange={(e) => setOxygen(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
                        <span className="font-medium text-slate-800 dark:text-white">PaO2 \u003c 70 mmHg ou SatO2 ≤ 93% (2 pontos)</span>
                    </label>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={ph} onChange={(e) => setPh(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
                        <span className="font-medium text-slate-800 dark:text-white">pH \u003c 7.35 (2 pontos)</span>
                    </label>
                </div>

                <button onClick={calculateSMARTCOP} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md">
                    Calcular SMART-COP
                </button>
            </div>

            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</span>
                        <span className="text-slate-500 dark:text-slate-400">/ 11 pontos</span>
                    </div>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}
        </div>
    );
};

export default SMARTCOPCalculator;

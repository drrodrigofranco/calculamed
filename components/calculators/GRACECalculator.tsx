import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const GRACECalculator: React.FC = () => {
    const [age, setAge] = useState<string>('');
    const [hr, setHr] = useState<string>('');
    const [sbp, setSbp] = useState<string>('');
    const [creatinine, setCreatinine] = useState<string>('');
    const [killipClass, setKillipClass] = useState<string>('1');
    const [cardiacArrest, setCardiacArrest] = useState<boolean>(false);
    const [stElevation, setStElevation] = useState<boolean>(false);
    const [elevatedMarkers, setElevatedMarkers] = useState<boolean>(false);
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateGRACE = () => {
        let score = 0;

        // Age
        const ageValue = parseFloat(age);
        if (!isNaN(ageValue)) {
            if (ageValue < 30) score += 0;
            else if (ageValue <= 39) score += 8;
            else if (ageValue <= 49) score += 25;
            else if (ageValue <= 59) score += 41;
            else if (ageValue <= 69) score += 58;
            else if (ageValue <= 79) score += 75;
            else score += 91;
        }

        // Heart Rate
        const hrValue = parseFloat(hr);
        if (!isNaN(hrValue)) {
            if (hrValue < 50) score += 0;
            else if (hrValue <= 69) score += 3;
            else if (hrValue <= 89) score += 9;
            else if (hrValue <= 109) score += 15;
            else if (hrValue <= 149) score += 24;
            else if (hrValue <= 199) score += 38;
            else score += 46;
        }

        // SBP
        const sbpValue = parseFloat(sbp);
        if (!isNaN(sbpValue)) {
            if (sbpValue < 80) score += 58;
            else if (sbpValue <= 99) score += 53;
            else if (sbpValue <= 119) score += 43;
            else if (sbpValue <= 139) score += 34;
            else if (sbpValue <= 159) score += 24;
            else if (sbpValue <= 199) score += 10;
            else score += 0;
        }

        // Creatinine
        const creatValue = parseFloat(creatinine);
        if (!isNaN(creatValue)) {
            if (creatValue < 0.4) score += 1;
            else if (creatValue <= 0.79) score += 4;
            else if (creatValue <= 1.19) score += 7;
            else if (creatValue <= 1.59) score += 10;
            else if (creatValue <= 1.99) score += 13;
            else if (creatValue <= 3.99) score += 21;
            else score += 28;
        }

        // Killip Class
        const killip = parseInt(killipClass);
        if (killip === 2) score += 20;
        else if (killip === 3) score += 39;
        else if (killip === 4) score += 59;

        // Cardiac Arrest
        if (cardiacArrest) score += 39;

        // ST Elevation
        if (stElevation) score += 28;

        // Elevated Markers
        if (elevatedMarkers) score += 14;

        // Calculate mortality risk
        let mortality6mo = 0;
        if (score <= 108) mortality6mo = 1;
        else if (score <= 140) mortality6mo = 3;
        else mortality6mo = 8;

        let classification = '';
        if (score <= 108) classification = 'Baixo Risco';
        else if (score <= 140) classification = 'Risco Intermediário';
        else classification = 'Alto Risco';

        const notes = `Mortalidade em 6 meses: ${mortality6mo}%`;

        setResult({ value: score, classification, notes });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                GRACE Score
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Risco de morte em Síndrome Coronariana Aguda
            </p>

            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Idade (anos)
                        </label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 65"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            FC (bpm)
                        </label>
                        <input
                            type="number"
                            value={hr}
                            onChange={(e) => setHr(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 80"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            PAS (mmHg)
                        </label>
                        <input
                            type="number"
                            value={sbp}
                            onChange={(e) => setSbp(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 120"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Creatinina (mg/dL)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={creatinine}
                            onChange={(e) => setCreatinine(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 1.0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Classe Killip
                        </label>
                        <select
                            value={killipClass}
                            onChange={(e) => setKillipClass(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                        >
                            <option value="1">I - Sem IC</option>
                            <option value="2">II - Estertores/B3</option>
                            <option value="3">III - Edema Pulmonar</option>
                            <option value="4">IV - Choque Cardiogênico</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={cardiacArrest}
                                onChange={(e) => setCardiacArrest(e.target.checked)}
                                className="w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                            />
                            <span className="font-medium text-slate-800 dark:text-white">Parada Cardíaca na Admissão</span>
                        </label>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={stElevation}
                                onChange={(e) => setStElevation(e.target.checked)}
                                className="w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                            />
                            <span className="font-medium text-slate-800 dark:text-white">Elevação do Segmento ST</span>
                        </label>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={elevatedMarkers}
                                onChange={(e) => setElevatedMarkers(e.target.checked)}
                                className="w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                            />
                            <span className="font-medium text-slate-800 dark:text-white">Marcadores Cardíacos Elevados</span>
                        </label>
                    </div>
                </div>

                <button
                    onClick={calculateGRACE}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Calcular GRACE Score
                </button>
            </div>

            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</span>
                        <span className="text-slate-500 dark:text-slate-400">pontos</span>
                    </div>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Uso:</strong> GRACE Score prediz mortalidade e eventos cardiovasculares em pacientes com SCA.
                    Útil para estratificação de risco e decisão terapêutica.
                </p>
            </div>
        </div>
    );
};

export default GRACECalculator;

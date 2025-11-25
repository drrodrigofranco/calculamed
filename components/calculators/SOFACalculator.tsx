import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const SOFACalculator: React.FC = () => {
    const [pao2fio2, setPao2Fio2] = useState<string>('');
    const [platelets, setPlatelets] = useState<string>('');
    const [bilirubin, setBilirubin] = useState<string>('');
    const [map, setMap] = useState<string>('');
    const [gcs, setGcs] = useState<string>('15');
    const [creatinine, setCreatinine] = useState<string>('');
    const [urine, setUrine] = useState<string>('');
    const [dopamine, setDopamine] = useState<boolean>(false);
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateSOFA = () => {
        let score = 0;

        // Respiração (PaO2/FiO2)
        const pf = parseFloat(pao2fio2);
        if (!isNaN(pf)) {
            if (pf < 100) score += 4;
            else if (pf < 200) score += 3;
            else if (pf < 300) score += 2;
            else if (pf < 400) score += 1;
        }

        // Coagulação (Plaquetas)
        const plt = parseFloat(platelets);
        if (!isNaN(plt)) {
            if (plt < 20) score += 4;
            else if (plt < 50) score += 3;
            else if (plt < 100) score += 2;
            else if (plt < 150) score += 1;
        }

        // Fígado (Bilirrubina)
        const bili = parseFloat(bilirubin);
        if (!isNaN(bili)) {
            if (bili >= 12) score += 4;
            else if (bili >= 6) score += 3;
            else if (bili >= 2) score += 2;
            else if (bili >= 1.2) score += 1;
        }

        // Cardiovascular (PAM ou vasopressores)
        const mapValue = parseFloat(map);
        if (dopamine) {
            score += 4; // Simplified - any vasopressor = 4
        } else if (!isNaN(mapValue)) {
            if (mapValue < 70) score += 1;
        }

        // SNC (Glasgow)
        const gcsValue = parseFloat(gcs);
        if (!isNaN(gcsValue)) {
            if (gcsValue < 6) score += 4;
            else if (gcsValue < 10) score += 3;
            else if (gcsValue < 13) score += 2;
            else if (gcsValue < 15) score += 1;
        }

        // Renal (Creatinina ou Diurese)
        const creat = parseFloat(creatinine);
        const urineValue = parseFloat(urine);
        if (!isNaN(urineValue) && urineValue < 200) {
            score += 4;
        } else if (!isNaN(urineValue) && urineValue < 500) {
            score += 3;
        } else if (!isNaN(creat)) {
            if (creat >= 5) score += 4;
            else if (creat >= 3.5) score += 3;
            else if (creat >= 2) score += 2;
            else if (creat >= 1.2) score += 1;
        }

        let classification = '';
        let notes = '';
        if (score < 2) {
            classification = 'Baixo risco';
            notes = 'Mortalidade < 10%';
        } else if (score <= 5) {
            classification = 'Risco moderado';
            notes = 'Mortalidade 15-20%';
        } else if (score <= 9) {
            classification = 'Alto risco';
            notes = 'Mortalidade 40-50%';
        } else {
            classification = 'Risco muito alto';
            notes = 'Mortalidade > 80%';
        }

        setResult({ value: score, classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                SOFA Score (Sequential Organ Failure Assessment)
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Avaliação de disfunção orgânica em sepse e UTI
            </p>

            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            PaO₂/FiO₂ (mmHg)
                        </label>
                        <input
                            type="number"
                            value={pao2fio2}
                            onChange={(e) => setPao2Fio2(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 250"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Plaquetas (×10³/μL)
                        </label>
                        <input
                            type="number"
                            value={platelets}
                            onChange={(e) => setPlatelets(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 120"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Bilirrubina (mg/dL)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={bilirubin}
                            onChange={(e) => setBilirubin(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 1.5"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            PAM (mmHg)
                        </label>
                        <input
                            type="number"
                            value={map}
                            onChange={(e) => setMap(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 65"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Glasgow (3-15)
                        </label>
                        <input
                            type="number"
                            value={gcs}
                            onChange={(e) => setGcs(e.target.value)}
                            min="3"
                            max="15"
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 13"
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
                            placeholder="Ex: 1.8"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Diurese (mL/dia)
                        </label>
                        <input
                            type="number"
                            value={urine}
                            onChange={(e) => setUrine(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 800"
                        />
                    </div>

                    <div className="flex items-center pt-6">
                        <input
                            type="checkbox"
                            checked={dopamine}
                            onChange={(e) => setDopamine(e.target.checked)}
                            className="w-4 h-4 text-medical-600 rounded focus:ring-medical-500"
                        />
                        <label className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                            Uso de vasopressores
                        </label>
                    </div>
                </div>

                <button
                    onClick={calculateSOFA}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Calcular SOFA
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
        </div>
    );
};

export default SOFACalculator;

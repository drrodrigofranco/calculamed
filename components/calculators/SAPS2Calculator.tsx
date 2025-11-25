import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const SAPS2Calculator: React.FC = () => {
    const [age, setAge] = useState<string>('');
    const [hr, setHr] = useState<string>('');
    const [sbp, setSbp] = useState<string>('');
    const [temp, setTemp] = useState<string>('');
    const [pao2fio2, setPao2Fio2] = useState<string>('');
    const [urine, setUrine] = useState<string>('');
    const [urea, setUrea] = useState<string>('');
    const [wbc, setWbc] = useState<string>('');
    const [potassium, setPotassium] = useState<string>('');
    const [sodium, setSodium] = useState<string>('');
    const [hco3, setHco3] = useState<string>('');
    const [bilirubin, setBilirubin] = useState<string>('');
    const [gcs, setGcs] = useState<string>('15');
    const [admissionType, setAdmissionType] = useState<string>('scheduled');
    const [chronicDisease, setChronicDisease] = useState<string>('none');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateSAPS2 = () => {
        let score = 0;

        // Age
        const ageValue = parseFloat(age);
        if (!isNaN(ageValue)) {
            if (ageValue >= 80) score += 18;
            else if (ageValue >= 75) score += 16;
            else if (ageValue >= 70) score += 15;
            else if (ageValue >= 60) score += 12;
            else if (ageValue >= 40) score += 7;
        }

        // Heart Rate
        const hrValue = parseFloat(hr);
        if (!isNaN(hrValue)) {
            if (hrValue >= 160) score += 7;
            else if (hrValue >= 120) score += 4;
            else if (hrValue < 40) score += 11;
            else if (hrValue < 70) score += 2;
        }

        // SBP
        const sbpValue = parseFloat(sbp);
        if (!isNaN(sbpValue)) {
            if (sbpValue >= 200) score += 2;
            else if (sbpValue < 70) score += 13;
            else if (sbpValue < 100) score += 5;
        }

        // Temperature
        const tempValue = parseFloat(temp);
        if (!isNaN(tempValue)) {
            if (tempValue >= 39) score += 3;
            else if (tempValue < 39 && tempValue >= 0) score += 0;
        }

        // PaO2/FiO2
        const pfValue = parseFloat(pao2fio2);
        if (!isNaN(pfValue)) {
            if (pfValue < 100) score += 11;
            else if (pfValue < 200) score += 9;
            else if (pfValue >= 200) score += 6;
        }

        // Urine output
        const urineValue = parseFloat(urine);
        if (!isNaN(urineValue)) {
            if (urineValue < 500) score += 11;
            else if (urineValue < 1000) score += 4;
        }

        // Urea
        const ureaValue = parseFloat(urea);
        if (!isNaN(ureaValue)) {
            if (ureaValue >= 30) score += 10;
            else if (ureaValue >= 10) score += 6;
        }

        // WBC
        const wbcValue = parseFloat(wbc);
        if (!isNaN(wbcValue)) {
            if (wbcValue >= 20) score += 12;
            else if (wbcValue < 1) score += 12;
        }

        // Potassium
        const kValue = parseFloat(potassium);
        if (!isNaN(kValue)) {
            if (kValue >= 5) score += 3;
            else if (kValue < 3) score += 3;
        }

        // Sodium
        const naValue = parseFloat(sodium);
        if (!isNaN(naValue)) {
            if (naValue >= 145) score += 1;
            else if (naValue < 125) score += 5;
        }

        // HCO3
        const hco3Value = parseFloat(hco3);
        if (!isNaN(hco3Value)) {
            if (hco3Value < 15) score += 6;
            else if (hco3Value < 20) score += 3;
        }

        // Bilirubin
        const biliValue = parseFloat(bilirubin);
        if (!isNaN(biliValue)) {
            if (biliValue >= 6) score += 9;
            else if (biliValue >= 4) score += 4;
        }

        // Glasgow
        const gcsValue = parseFloat(gcs);
        if (!isNaN(gcsValue)) {
            if (gcsValue < 6) score += 26;
            else if (gcsValue < 9) score += 13;
            else if (gcsValue < 11) score += 7;
            else if (gcsValue < 14) score += 5;
        }

        // Admission type
        if (admissionType === 'unscheduled_surgical') score += 8;
        else if (admissionType === 'medical') score += 6;

        // Chronic disease
        if (chronicDisease === 'aids') score += 17;
        else if (chronicDisease === 'hematologic_cancer') score += 10;
        else if (chronicDisease === 'metastatic_cancer') score += 9;

        // Calculate mortality
        const logit = -7.7631 + 0.0737 * score + 0.9971 * Math.log(score + 1);
        const mortality = (Math.exp(logit) / (1 + Math.exp(logit)) * 100).toFixed(1);

        const classification = score < 30 ? 'Baixo risco' : score < 50 ? 'Risco moderado' : 'Alto risco';
        const notes = `Mortalidade estimada: ${mortality}%`;

        setResult({ value: score, classification, notes });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                SAPS II (Simplified Acute Physiology Score)
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Predição de mortalidade em UTI (primeiras 24h)
            </p>

            <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
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
                            placeholder="Ex: 90"
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
                            Temperatura (°C)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={temp}
                            onChange={(e) => setTemp(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 37.5"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            PaO₂/FiO₂
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
                            Diurese (mL/24h)
                        </label>
                        <input
                            type="number"
                            value={urine}
                            onChange={(e) => setUrine(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 1500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Ureia (mmol/L)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={urea}
                            onChange={(e) => setUrea(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 8"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Leucócitos (×10³/μL)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={wbc}
                            onChange={(e) => setWbc(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 10"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Potássio (mEq/L)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={potassium}
                            onChange={(e) => setPotassium(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 4.0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Sódio (mEq/L)
                        </label>
                        <input
                            type="number"
                            value={sodium}
                            onChange={(e) => setSodium(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 140"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            HCO₃ (mEq/L)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={hco3}
                            onChange={(e) => setHco3(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 24"
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
                            placeholder="Ex: 1.0"
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
                            placeholder="Ex: 15"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Tipo de Admissão
                        </label>
                        <select
                            value={admissionType}
                            onChange={(e) => setAdmissionType(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                        >
                            <option value="scheduled">Cirurgia Eletiva</option>
                            <option value="medical">Clínico</option>
                            <option value="unscheduled_surgical">Cirurgia de Urgência</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Doença Crônica
                        </label>
                        <select
                            value={chronicDisease}
                            onChange={(e) => setChronicDisease(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                        >
                            <option value="none">Nenhuma</option>
                            <option value="aids">AIDS</option>
                            <option value="hematologic_cancer">Câncer Hematológico</option>
                            <option value="metastatic_cancer">Câncer Metastático</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={calculateSAPS2}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Calcular SAPS II
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

export default SAPS2Calculator;

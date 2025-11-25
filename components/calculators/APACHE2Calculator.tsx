import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const APACHE2Calculator: React.FC = () => {
    const [age, setAge] = useState<string>('');
    const [temp, setTemp] = useState<string>('');
    const [map, setMap] = useState<string>('');
    const [hr, setHr] = useState<string>('');
    const [rr, setRr] = useState<string>('');
    const [pao2, setPao2] = useState<string>('');
    const [fio2, setFio2] = useState<string>('21');
    const [ph, setPh] = useState<string>('');
    const [sodium, setSodium] = useState<string>('');
    const [potassium, setPotassium] = useState<string>('');
    const [creatinine, setCreatinine] = useState<string>('');
    const [hematocrit, setHematocrit] = useState<string>('');
    const [wbc, setWbc] = useState<string>('');
    const [gcs, setGcs] = useState<string>('15');
    const [chronicHealth, setChronicHealth] = useState<number>(0);
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateAPACHE2 = () => {
        let score = 0;

        // Age points
        const ageValue = parseFloat(age);
        if (!isNaN(ageValue)) {
            if (ageValue >= 75) score += 6;
            else if (ageValue >= 65) score += 5;
            else if (ageValue >= 55) score += 3;
            else if (ageValue >= 45) score += 2;
        }

        // Temperature
        const tempValue = parseFloat(temp);
        if (!isNaN(tempValue)) {
            if (tempValue >= 41) score += 4;
            else if (tempValue >= 39) score += 3;
            else if (tempValue >= 38.5 || tempValue < 34) score += 1;
            else if (tempValue < 30) score += 4;
            else if (tempValue < 32) score += 3;
            else if (tempValue < 34) score += 2;
        }

        // MAP
        const mapValue = parseFloat(map);
        if (!isNaN(mapValue)) {
            if (mapValue >= 160) score += 4;
            else if (mapValue >= 130) score += 3;
            else if (mapValue >= 110) score += 2;
            else if (mapValue < 50) score += 4;
            else if (mapValue < 70) score += 2;
        }

        // Heart Rate
        const hrValue = parseFloat(hr);
        if (!isNaN(hrValue)) {
            if (hrValue >= 180) score += 4;
            else if (hrValue >= 140) score += 3;
            else if (hrValue >= 110) score += 2;
            else if (hrValue < 40) score += 4;
            else if (hrValue < 55) score += 2;
        }

        // Respiratory Rate
        const rrValue = parseFloat(rr);
        if (!isNaN(rrValue)) {
            if (rrValue >= 50) score += 4;
            else if (rrValue >= 35) score += 3;
            else if (rrValue >= 25) score += 1;
            else if (rrValue < 6) score += 4;
            else if (rrValue < 10) score += 2;
            else if (rrValue < 12) score += 1;
        }

        // Oxygenation (simplified)
        const pao2Value = parseFloat(pao2);
        const fio2Value = parseFloat(fio2);
        if (!isNaN(pao2Value) && !isNaN(fio2Value)) {
            if (fio2Value >= 50) {
                // Use A-a gradient (simplified)
                if (pao2Value < 55) score += 4;
                else if (pao2Value < 60) score += 3;
                else if (pao2Value < 70) score += 1;
            } else {
                if (pao2Value < 55) score += 4;
                else if (pao2Value < 61) score += 3;
                else if (pao2Value < 71) score += 1;
            }
        }

        // pH
        const phValue = parseFloat(ph);
        if (!isNaN(phValue)) {
            if (phValue >= 7.7) score += 4;
            else if (phValue >= 7.6) score += 3;
            else if (phValue >= 7.5) score += 1;
            else if (phValue < 7.15) score += 4;
            else if (phValue < 7.25) score += 3;
            else if (phValue < 7.33) score += 2;
        }

        // Sodium
        const naValue = parseFloat(sodium);
        if (!isNaN(naValue)) {
            if (naValue >= 180) score += 4;
            else if (naValue >= 160) score += 3;
            else if (naValue >= 155) score += 2;
            else if (naValue >= 150) score += 1;
            else if (naValue < 111) score += 4;
            else if (naValue < 120) score += 3;
            else if (naValue < 130) score += 2;
        }

        // Potassium
        const kValue = parseFloat(potassium);
        if (!isNaN(kValue)) {
            if (kValue >= 7) score += 4;
            else if (kValue >= 6) score += 3;
            else if (kValue >= 5.5) score += 1;
            else if (kValue < 2.5) score += 4;
            else if (kValue < 3) score += 2;
            else if (kValue < 3.5) score += 1;
        }

        // Creatinine (simplified - without ARF)
        const creatValue = parseFloat(creatinine);
        if (!isNaN(creatValue)) {
            if (creatValue >= 3.5) score += 4;
            else if (creatValue >= 2) score += 3;
            else if (creatValue >= 1.5) score += 2;
        }

        // Hematocrit
        const hctValue = parseFloat(hematocrit);
        if (!isNaN(hctValue)) {
            if (hctValue >= 60) score += 4;
            else if (hctValue >= 50) score += 2;
            else if (hctValue >= 46) score += 1;
            else if (hctValue < 20) score += 4;
            else if (hctValue < 30) score += 2;
        }

        // WBC
        const wbcValue = parseFloat(wbc);
        if (!isNaN(wbcValue)) {
            if (wbcValue >= 40) score += 4;
            else if (wbcValue >= 20) score += 2;
            else if (wbcValue >= 15) score += 1;
            else if (wbcValue < 1) score += 4;
            else if (wbcValue < 3) score += 2;
        }

        // Glasgow
        const gcsValue = parseFloat(gcs);
        if (!isNaN(gcsValue)) {
            score += 15 - gcsValue;
        }

        // Chronic health points
        score += chronicHealth;

        // Mortality estimation (simplified)
        let mortality = 0;
        if (score < 10) mortality = 4;
        else if (score < 15) mortality = 8;
        else if (score < 20) mortality = 15;
        else if (score < 25) mortality = 25;
        else if (score < 30) mortality = 40;
        else if (score < 35) mortality = 55;
        else mortality = 75;

        const classification = score < 15 ? 'Baixo risco' : score < 25 ? 'Risco moderado' : 'Alto risco';
        const notes = `Mortalidade estimada: ${mortality}%`;

        setResult({ value: score, classification, notes });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                APACHE II Score
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Acute Physiology and Chronic Health Evaluation - Mortalidade em UTI
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
                            PAM (mmHg)
                        </label>
                        <input
                            type="number"
                            value={map}
                            onChange={(e) => setMap(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 75"
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
                            FR (irpm)
                        </label>
                        <input
                            type="number"
                            value={rr}
                            onChange={(e) => setRr(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 18"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            PaO₂ (mmHg)
                        </label>
                        <input
                            type="number"
                            value={pao2}
                            onChange={(e) => setPao2(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 85"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            FiO₂ (%)
                        </label>
                        <input
                            type="number"
                            value={fio2}
                            onChange={(e) => setFio2(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 21"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            pH Arterial
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={ph}
                            onChange={(e) => setPh(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 7.40"
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
                            Creatinina (mg/dL)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={creatinine}
                            onChange={(e) => setCreatinine(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 1.2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Hematócrito (%)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={hematocrit}
                            onChange={(e) => setHematocrit(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 40"
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

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Doença Crônica
                    </label>
                    <select
                        value={chronicHealth}
                        onChange={(e) => setChronicHealth(parseInt(e.target.value))}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                    >
                        <option value="0">Sem doença crônica</option>
                        <option value="2">Cirurgia eletiva + doença crônica</option>
                        <option value="5">Cirurgia emergência ou clínico + doença crônica</option>
                    </select>
                </div>

                <button
                    onClick={calculateAPACHE2}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Calcular APACHE II
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

export default APACHE2Calculator;

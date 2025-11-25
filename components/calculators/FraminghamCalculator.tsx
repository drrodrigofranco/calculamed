import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const FraminghamCalculator: React.FC = () => {
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>('male');
    const [totalChol, setTotalChol] = useState<string>('');
    const [hdl, setHdl] = useState<string>('');
    const [sbp, setSbp] = useState<string>('');
    const [treatment, setTreatment] = useState<boolean>(false);
    const [smoker, setSmoker] = useState<boolean>(false);
    const [diabetic, setDiabetic] = useState<boolean>(false);
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateFramingham = () => {
        const ageValue = parseFloat(age);
        const cholValue = parseFloat(totalChol);
        const hdlValue = parseFloat(hdl);
        const sbpValue = parseFloat(sbp);

        if (isNaN(ageValue) || isNaN(cholValue) || isNaN(hdlValue) || isNaN(sbpValue)) return;

        let points = 0;

        // Age points (simplified for male)
        if (gender === 'male') {
            if (ageValue >= 70) points += 11;
            else if (ageValue >= 60) points += 10;
            else if (ageValue >= 50) points += 8;
            else if (ageValue >= 40) points += 5;
            else points += 3;
        } else {
            if (ageValue >= 70) points += 14;
            else if (ageValue >= 60) points += 12;
            else if (ageValue >= 50) points += 9;
            else if (ageValue >= 40) points += 6;
            else points += 3;
        }

        // Total Cholesterol
        if (cholValue >= 280) points += 3;
        else if (cholValue >= 240) points += 2;
        else if (cholValue >= 200) points += 1;

        // HDL
        if (hdlValue < 35) points += 2;
        else if (hdlValue < 45) points += 1;
        else if (hdlValue >= 60) points -= 1;

        // Blood Pressure
        if (treatment) {
            if (sbpValue >= 160) points += 3;
            else if (sbpValue >= 140) points += 2;
            else if (sbpValue >= 130) points += 1;
        } else {
            if (sbpValue >= 160) points += 2;
            else if (sbpValue >= 140) points += 1;
        }

        // Diabetes
        if (diabetic) points += 2;

        // Smoker
        if (smoker) points += 2;

        // Calculate 10-year risk (simplified)
        let risk = 0;
        if (points < 0) risk = 1;
        else if (points <= 4) risk = 2;
        else if (points <= 6) risk = 4;
        else if (points <= 8) risk = 8;
        else if (points <= 10) risk = 11;
        else if (points <= 12) risk = 17;
        else if (points <= 14) risk = 25;
        else risk = 30;

        let classification = '';
        if (risk < 10) classification = 'Baixo Risco';
        else if (risk < 20) classification = 'Risco Intermediário';
        else classification = 'Alto Risco';

        const notes = `Risco cardiovascular em 10 anos: ${risk}%`;

        setResult({ value: risk, classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                Framingham Risk Score
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Risco cardiovascular em 10 anos
            </p>

            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Sexo
                        </label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                        >
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Idade (anos)
                        </label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 55"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Colesterol Total (mg/dL)
                        </label>
                        <input
                            type="number"
                            value={totalChol}
                            onChange={(e) => setTotalChol(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            HDL (mg/dL)
                        </label>
                        <input
                            type="number"
                            value={hdl}
                            onChange={(e) => setHdl(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                            placeholder="Ex: 50"
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
                            placeholder="Ex: 130"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={treatment}
                                onChange={(e) => setTreatment(e.target.checked)}
                                className="w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                            />
                            <span className="font-medium text-slate-800 dark:text-white">Em tratamento para hipertensão</span>
                        </label>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={smoker}
                                onChange={(e) => setSmoker(e.target.checked)}
                                className="w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                            />
                            <span className="font-medium text-slate-800 dark:text-white">Tabagista</span>
                        </label>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={diabetic}
                                onChange={(e) => setDiabetic(e.target.checked)}
                                className="w-5 h-5 text-medical-600 rounded focus:ring-medical-500"
                            />
                            <span className="font-medium text-slate-800 dark:text-white">Diabetes</span>
                        </label>
                    </div>
                </div>

                <button
                    onClick={calculateFramingham}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Calcular Risco
                </button>
            </div>

            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}%</span>
                    </div>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}

            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                    <strong>Importante:</strong> Este é um cálculo simplificado. Para cálculo preciso, use a calculadora oficial do Framingham Heart Study.
                    Risco ≥ 20% indica prevenção secundária.
                </p>
            </div>
        </div>
    );
};

export default FraminghamCalculator;

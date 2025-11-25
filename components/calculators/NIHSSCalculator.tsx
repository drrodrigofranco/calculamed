import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const NIHSSCalculator: React.FC = () => {
    const [loc, setLoc] = useState<string>('0');
    const [locQuestions, setLocQuestions] = useState<string>('0');
    const [locCommands, setLocCommands] = useState<string>('0');
    const [gaze, setGaze] = useState<string>('0');
    const [visual, setVisual] = useState<string>('0');
    const [facialPalsy, setFacialPalsy] = useState<string>('0');
    const [motorArmLeft, setMotorArmLeft] = useState<string>('0');
    const [motorArmRight, setMotorArmRight] = useState<string>('0');
    const [motorLegLeft, setMotorLegLeft] = useState<string>('0');
    const [motorLegRight, setMotorLegRight] = useState<string>('0');
    const [limbAtaxia, setLimbAtaxia] = useState<string>('0');
    const [sensory, setSensory] = useState<string>('0');
    const [language, setLanguage] = useState<string>('0');
    const [dysarthria, setDysarthria] = useState<string>('0');
    const [extinction, setExtinction] = useState<string>('0');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateNIHSS = () => {
        const score =
            parseInt(loc) +
            parseInt(locQuestions) +
            parseInt(locCommands) +
            parseInt(gaze) +
            parseInt(visual) +
            parseInt(facialPalsy) +
            parseInt(motorArmLeft) +
            parseInt(motorArmRight) +
            parseInt(motorLegLeft) +
            parseInt(motorLegRight) +
            parseInt(limbAtaxia) +
            parseInt(sensory) +
            parseInt(language) +
            parseInt(dysarthria) +
            parseInt(extinction);

        let classification = '';
        if (score === 0) classification = 'Sem AVC';
        else if (score <= 4) classification = 'AVC Leve';
        else if (score <= 15) classification = 'AVC Moderado';
        else if (score <= 20) classification = 'AVC Moderado-Grave';
        else classification = 'AVC Grave';

        const notes = 'Escala validada para avaliação de gravidade do AVC isquêmico';

        setResult({ value: score, classification, notes });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                NIHSS (NIH Stroke Scale)
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Escala de AVC do National Institutes of Health
            </p>

            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            1a. Nível de Consciência
                        </label>
                        <select
                            value={loc}
                            onChange={(e) => setLoc(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Alerta</option>
                            <option value="1">1 - Sonolento</option>
                            <option value="2">2 - Estupor</option>
                            <option value="3">3 - Coma</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            1b. Perguntas
                        </label>
                        <select
                            value={locQuestions}
                            onChange={(e) => setLocQuestions(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Ambas corretas</option>
                            <option value="1">1 - Uma correta</option>
                            <option value="2">2 - Nenhuma correta</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            1c. Comandos
                        </label>
                        <select
                            value={locCommands}
                            onChange={(e) => setLocCommands(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Ambos corretos</option>
                            <option value="1">1 - Um correto</option>
                            <option value="2">2 - Nenhum correto</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            2. Olhar Conjugado
                        </label>
                        <select
                            value={gaze}
                            onChange={(e) => setGaze(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Normal</option>
                            <option value="1">1 - Paralisia parcial</option>
                            <option value="2">2 - Desvio forçado</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            3. Campos Visuais
                        </label>
                        <select
                            value={visual}
                            onChange={(e) => setVisual(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Normal</option>
                            <option value="1">1 - Hemianopsia parcial</option>
                            <option value="2">2 - Hemianopsia completa</option>
                            <option value="3">3 - Cegueira bilateral</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            4. Paralisia Facial
                        </label>
                        <select
                            value={facialPalsy}
                            onChange={(e) => setFacialPalsy(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Normal</option>
                            <option value="1">1 - Leve</option>
                            <option value="2">2 - Parcial</option>
                            <option value="3">3 - Completa</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            5a. Motor Braço Esquerdo
                        </label>
                        <select
                            value={motorArmLeft}
                            onChange={(e) => setMotorArmLeft(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Normal</option>
                            <option value="1">1 - Queda lenta</option>
                            <option value="2">2 - Esforço contra gravidade</option>
                            <option value="3">3 - Sem esforço</option>
                            <option value="4">4 - Sem movimento</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            5b. Motor Braço Direito
                        </label>
                        <select
                            value={motorArmRight}
                            onChange={(e) => setMotorArmRight(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Normal</option>
                            <option value="1">1 - Queda lenta</option>
                            <option value="2">2 - Esforço contra gravidade</option>
                            <option value="3">3 - Sem esforço</option>
                            <option value="4">4 - Sem movimento</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            6a. Motor Perna Esquerda
                        </label>
                        <select
                            value={motorLegLeft}
                            onChange={(e) => setMotorLegLeft(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Normal</option>
                            <option value="1">1 - Queda lenta</option>
                            <option value="2">2 - Esforço contra gravidade</option>
                            <option value="3">3 - Sem esforço</option>
                            <option value="4">4 - Sem movimento</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            6b. Motor Perna Direita
                        </label>
                        <select
                            value={motorLegRight}
                            onChange={(e) => setMotorLegRight(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Normal</option>
                            <option value="1">1 - Queda lenta</option>
                            <option value="2">2 - Esforço contra gravidade</option>
                            <option value="3">3 - Sem esforço</option>
                            <option value="4">4 - Sem movimento</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            7. Ataxia de Membros
                        </label>
                        <select
                            value={limbAtaxia}
                            onChange={(e) => setLimbAtaxia(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Ausente</option>
                            <option value="1">1 - Em um membro</option>
                            <option value="2">2 - Em dois membros</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            8. Sensibilidade
                        </label>
                        <select
                            value={sensory}
                            onChange={(e) => setSensory(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Normal</option>
                            <option value="1">1 - Perda leve-moderada</option>
                            <option value="2">2 - Perda grave</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            9. Linguagem
                        </label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Normal</option>
                            <option value="1">1 - Afasia leve-moderada</option>
                            <option value="2">2 - Afasia grave</option>
                            <option value="3">3 - Mudo/afasia global</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            10. Disartria
                        </label>
                        <select
                            value={dysarthria}
                            onChange={(e) => setDysarthria(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Normal</option>
                            <option value="1">1 - Leve-moderada</option>
                            <option value="2">2 - Grave/anártrico</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            11. Extinção/Desatenção
                        </label>
                        <select
                            value={extinction}
                            onChange={(e) => setExtinction(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition"
                        >
                            <option value="0">0 - Normal</option>
                            <option value="1">1 - Desatenção em uma modalidade</option>
                            <option value="2">2 - Hemi-desatenção grave</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={calculateNIHSS}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Calcular NIHSS
                </button>
            </div>

            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resultado</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</span>
                        <span className="text-slate-500 dark:text-slate-400">/ 42 pontos</span>
                    </div>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Uso:</strong> NIHSS é a escala padrão para avaliação de gravidade do AVC isquêmico.
                    Escores ≤ 5 indicam AVC leve, \u003e 20 indica AVC grave.
                </p>
            </div>
        </div>
    );
};

export default NIHSSCalculator;

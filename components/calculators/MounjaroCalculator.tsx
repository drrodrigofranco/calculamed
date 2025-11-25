import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const MounjaroCalculator: React.FC = () => {
    const [penDose, setPenDose] = useState<string>('10');
    const [desiredDose, setDesiredDose] = useState<string>('2.5');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculate = () => {
        const pen = parseFloat(penDose);
        const desired = parseFloat(desiredDose);

        if (pen <= 0 || desired <= 0) {
            alert('Por favor, insira valores válidos');
            return;
        }

        if (desired > pen) {
            alert('A dose desejada não pode ser maior que a dose da caneta');
            return;
        }

        // Mounjaro vem com 0.5ml por caneta
        const totalVolume = 0.5; // ml
        const volumeToInject = (desired / pen) * totalVolume;

        setResult({
            value: volumeToInject,
            classification: `${volumeToInject.toFixed(3)} ml`,
            notes: `Para obter ${desired}mg de uma caneta de ${pen}mg, aplicar ${volumeToInject.toFixed(3)} ml (${volumeToInject.toFixed(2)} ml)`
        });
    };

    const commonDoses = [
        { pen: 15, desired: 2.5 },
        { pen: 15, desired: 5 },
        { pen: 15, desired: 7.5 },
        { pen: 12.5, desired: 2.5 },
        { pen: 10, desired: 2.5 },
        { pen: 10, desired: 5 },
        { pen: 7.5, desired: 2.5 },
        { pen: 5, desired: 2.5 },
    ];

    const handleQuickCalc = (pen: number, desired: number) => {
        setPenDose(pen.toString());
        setDesiredDose(desired.toString());
        const totalVolume = 0.5;
        const volumeToInject = (desired / pen) * totalVolume;
        setResult({
            value: volumeToInject,
            classification: `${volumeToInject.toFixed(3)} ml`,
            notes: `Para obter ${desired}mg de uma caneta de ${pen}mg, aplicar ${volumeToInject.toFixed(3)} ml (${volumeToInject.toFixed(2)} ml)`
        });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Fracionamento Mounjaro</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Calcule o volume necessário para fracionar a dose da caneta Mounjaro (0,5ml por caneta)
            </p>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Dose da Caneta (mg)
                        </label>
                        <input
                            type="number"
                            value={penDose}
                            onChange={(e) => setPenDose(e.target.value)}
                            className="w-full p-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                            placeholder="Ex: 10"
                            step="0.1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Dose Desejada (mg)
                        </label>
                        <input
                            type="number"
                            value={desiredDose}
                            onChange={(e) => setDesiredDose(e.target.value)}
                            className="w-full p-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                            placeholder="Ex: 2.5"
                            step="0.1"
                        />
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Calcular Volume
                </button>
            </div>

            {result && (
                <div className="mt-6 p-5 bg-gradient-to-br from-medical-50 to-blue-50 dark:from-medical-900/20 dark:to-blue-900/20 rounded-lg border-2 border-medical-200 dark:border-medical-700">
                    <div className="text-center mb-3">
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Volume a Aplicar:</p>
                        <p className="text-4xl font-bold text-medical-600 dark:text-medical-400">
                            {(result.value as number).toFixed(2)} ml
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            ({(result.value as number).toFixed(3)} ml exato)
                        </p>
                    </div>
                    <div className="pt-3 border-t border-medical-200 dark:border-medical-700">
                        <p className="text-sm text-slate-700 dark:text-slate-200 text-center">
                            {result.notes}
                        </p>
                    </div>
                </div>
            )}

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    📋 Doses Comuns (clique para calcular):
                </h4>
                <div className="grid grid-cols-2 gap-2">
                    {commonDoses.map((dose, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleQuickCalc(dose.pen, dose.desired)}
                            className="p-3 bg-slate-50 dark:bg-slate-700 hover:bg-medical-50 dark:hover:bg-medical-900/30 border border-slate-200 dark:border-slate-600 rounded-lg text-sm transition"
                        >
                            <span className="font-medium text-slate-800 dark:text-white">
                                {dose.pen}mg → {dose.desired}mg
                            </span>
                            <br />
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {((dose.desired / dose.pen) * 0.5).toFixed(2)} ml
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    <strong>⚠️ Atenção:</strong> Esta calculadora é apenas uma ferramenta de apoio.
                    O fracionamento de doses deve ser feito apenas sob orientação médica.
                    Cada caneta Mounjaro contém 0,5ml de volume total.
                </p>
            </div>
        </div>
    );
};

export default MounjaroCalculator;

import React, { useState } from 'react';
import { RulerIcon } from 'lucide-react';

const GrowthZScoreCalculator: React.FC = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('male');

    const calculateIMC = () => {
        const w = parseFloat(weight);
        const h = parseFloat(height) / 100; // cm to m
        if (!w || !h) return null;
        return w / (h * h);
    };

    const imc = calculateIMC();

    return (
        <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <RulerIcon className="w-8 h-8 text-orange-500" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Curvas de Crescimento</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Sexo</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setGender('male')}
                            className={`flex-1 p-3 rounded-lg font-bold ${gender === 'male' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}
                        >
                            Masculino
                        </button>
                        <button
                            onClick={() => setGender('female')}
                            className={`flex-1 p-3 rounded-lg font-bold ${gender === 'female' ? 'bg-pink-600 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}
                        >
                            Feminino
                        </button>
                    </div>
                </div>

                <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    placeholder="Idade (meses)"
                    className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
                />

                <input
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    placeholder="Peso (kg)"
                    className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
                />

                <input
                    type="number"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    placeholder="Altura (cm)"
                    className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
                />

                {imc && (
                    <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <p className="text-sm text-orange-800 dark:text-orange-200">IMC Calculado:</p>
                        <p className="text-3xl font-bold text-orange-600">{imc.toFixed(1)}</p>
                        <p className="text-xs text-orange-600 mt-2">
                            Cálculo de Z-Score completo em desenvolvimento.
                            Consulte as curvas da OMS para interpretação.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GrowthZScoreCalculator;
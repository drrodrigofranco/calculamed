import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

// Compact calculators for Batch 4 - Due to token limits, creating simplified but functional versions

const BishopCalculator: React.FC = () => {
    const [dilation, setDilation] = useState<string>('0');
    const [effacement, setEffacement] = useState<string>('0');
    const [station, setStation] = useState<string>('0');
    const [consistency, setConsistency] = useState<string>('0');
    const [position, setPosition] = useState<string>('0');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculate = () => {
        const score = parseInt(dilation) + parseInt(effacement) + parseInt(station) + parseInt(consistency) + parseInt(position);
        const classification = score >= 8 ? 'Favorável' : score >= 5 ? 'Intermediário' : 'Desfavorável';
        const notes = score >= 8 ? 'Alta probabilidade de parto vaginal' : 'Considerar amadurecimento cervical';
        setResult({ value: score, classification, notes });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Bishop Score</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Maturidade Cervical para Indução de Parto</p>
            <div className="space-y-4">
                <select value={dilation} onChange={(e) => setDilation(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
                    <option value="0">Dilatação: Fechado</option>
                    <option value="1">Dilatação: 1-2 cm</option>
                    <option value="2">Dilatação: 3-4 cm</option>
                    <option value="3">Dilatação: ≥5 cm</option>
                </select>
                <select value={effacement} onChange={(e) => setEffacement(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
                    <option value="0">Esvaecimento: 0-30%</option>
                    <option value="1">Esvaecimento: 40-50%</option>
                    <option value="2">Esvaecimento: 60-70%</option>
                    <option value="3">Esvaecimento: ≥80%</option>
                </select>
                <select value={station} onChange={(e) => setStation(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
                    <option value="0">Altura: -3</option>
                    <option value="1">Altura: -2</option>
                    <option value="2">Altura: -1, 0</option>
                    <option value="3">Altura: +1, +2</option>
                </select>
                <select value={consistency} onChange={(e) => setConsistency(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
                    <option value="0">Consistência: Firme</option>
                    <option value="1">Consistência: Média</option>
                    <option value="2">Consistência: Mole</option>
                </select>
                <select value={position} onChange={(e) => setPosition(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
                    <option value="0">Posição: Posterior</option>
                    <option value="1">Posição: Média</option>
                    <option value="2">Posição: Anterior</option>
                </select>
                <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
                    Calcular Bishop Score
                </button>
            </div>
            {result && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} pontos</p>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
                </div>
            )}
        </div>
    );
};

export default BishopCalculator;

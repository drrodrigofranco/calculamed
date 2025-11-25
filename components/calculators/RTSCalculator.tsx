import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const RTSCalculator: React.FC = () => {
    const [gcs, setGcs] = useState<string>('15');
    const [sbp, setSbp] = useState<string>('');
    const [rr, setRr] = useState<string>('');
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateRTS = () => {
        const gcsValue = parseFloat(gcs);
        const sbpValue = parseFloat(sbp);
        const rrValue = parseFloat(rr);

        if (isNaN(gcsValue) || isNaN(sbpValue) || isNaN(rrValue)) return;

        // GCS coded value
        let gcsCode = 0;
        if (gcsValue >= 13) gcsCode = 4;
        else if (gcsValue >= 9) gcsCode = 3;
        else if (gcsValue >= 6) gcsCode = 2;
        else if (gcsValue >= 4) gcsCode = 1;

        // SBP coded value
        let sbpCode = 0;
        if (sbpValue > 89) sbpCode = 4;
        else if (sbpValue >= 76) sbpCode = 3;
        else if (sbpValue >= 50) sbpCode = 2;
        else if (sbpValue >= 1) sbpCode = 1;

        // RR coded value
        let rrCode = 0;
        if (rrValue >= 10 && rrValue <= 29) rrCode = 4;
        else if (rrValue > 29) rrCode = 3;
        else if (rrValue >= 6) rrCode = 2;
        else if (rrValue >= 1) rrCode = 1;

        // RTS = 0.9368 × GCS + 0.7326 × SBP + 0.2908 × RR
        const rts = (0.9368 * gcsCode + 0.7326 * sbpCode + 0.2908 * rrCode).toFixed(2);
        const rtsValue = parseFloat(rts);

        let classification = '';
        let notes = '';
        let survival = 0;

        if (rtsValue >= 7) {
            classification = 'Trauma Leve';
            survival = 97;
            notes = `Sobrevida estimada: ${survival}%`;
        } else if (rtsValue >= 5) {
            classification = 'Trauma Moderado';
            survival = 87;
            notes = `Sobrevida estimada: ${survival}%`;
        } else if (rtsValue >= 3) {
            classification = 'Trauma Grave';
            survival = 60;
            notes = `Sobrevida estimada: ${survival}%`;
        } else {
            classification = 'Trauma Crítico';
            survival = 27;
            notes = `Sobrevida estimada: ${survival}%`;
        }

        setResult({ value: rtsValue, classification, notes });
    };

    return (
        <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                RTS (Revised Trauma Score)
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Avaliação de gravidade e prognóstico em trauma
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Escala de Glasgow (3-15)
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
                        Pressão Arterial Sistólica (mmHg)
                    </label>
                    <input
                        type="number"
                        value={sbp}
                        onChange={(e) => setSbp(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                        placeholder="Ex: 110"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Frequência Respiratória (irpm)
                    </label>
                    <input
                        type="number"
                        value={rr}
                        onChange={(e) => setRr(e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition"
                        placeholder="Ex: 18"
                    />
                </div>

                <button
                    onClick={calculateRTS}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Calcular RTS
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
                    <strong>Uso:</strong> RTS é usado para triagem pré-hospitalar e predição de sobrevida.
                    Valores menores indicam maior gravidade.
                </p>
            </div>
        </div>
    );
};

export default RTSCalculator;

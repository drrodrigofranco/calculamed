import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

type Medication = 'dipirona' | 'paracetamol' | 'acebrofilina' | 'bromoprida';

interface MedConfig {
    name: string;
    concentration: string; // e.g., "500mg/ml", "200mg/ml"
    dosageMgPerKg: number | string; // Max mg/kg per dose or range
    dropsPerMl: number; // drops/ml
    unit: string; // mg, mcg, etc.
    minDose?: number; // Optional min dose per administration
    maxDose?: number; // Optional max dose per administration
}

const MEDICATIONS: Record<Medication, MedConfig> = {
    dipirona: {
        name: 'Dipirona Sódica',
        concentration: '500mg/ml (20 gotas/ml)',
        dosageMgPerKg: 10, // 10mg/kg/dose
        dropsPerMl: 20,
        unit: 'mg',
        minDose: 10, // min dose per kg
        maxDose: 15, // max dose per kg
    },
    paracetamol: {
        name: 'Paracetamol',
        concentration: '200mg/ml (20 gotas/ml)',
        dosageMgPerKg: 10, // 10mg/kg/dose
        dropsPerMl: 20,
        unit: 'mg',
        minDose: 10,
        maxDose: 15,
    },
    acebrofilina: {
        name: 'Acebrofilina Xarope',
        concentration: '25mg/5ml',
        dosageMgPerKg: "0.25ml/kg", // Special case, directly ml/kg/dose
        dropsPerMl: 0, // Not applicable for xarope
        unit: 'ml',
        minDose: 0.25, // min ml/kg
        maxDose: 0.25, // max ml/kg
    },
    bromoprida: {
        name: 'Bromoprida Gotas',
        concentration: '4mg/ml (24 gotas/ml)',
        dosageMgPerKg: 0.5, // 0.5mg/kg/day divided (example: 0.125mg/kg/dose QID)
        dropsPerMl: 24,
        unit: 'mg/dia',
        minDose: 0.5, // total mg/kg/day
        maxDose: 1.0, // total mg/kg/day
    }
};

const PediatricDosageCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [selectedMed, setSelectedMed] = useState<Medication | ''>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0 || !selectedMed) {
        setResult(null);
        return;
    }

    const medConfig = MEDICATIONS[selectedMed];
    let doseValue = 0;
    let mlPerDose = 0;
    let dropsPerDose = 0;
    let notes = '';

    const drugMassPerMl = parseFloat(medConfig.concentration.split('mg/ml')[0]); // e.g., 500 from "500mg/ml"
    
    if (selectedMed === 'acebrofilina') {
        mlPerDose = w * 0.25; // Directly ml/kg/dose
        notes = "Dose em xarope (25mg/5ml). Administrar a cada 12 horas.";
        doseValue = mlPerDose;
        setResult({
            value: mlPerDose.toFixed(2),
            classification: 'ml/dose',
            notes: notes
        });
        return;
    } else if (selectedMed === 'bromoprida') {
        // Bromoprida: 0.5 a 1 mg/kg/DIA dividido. Usamos 0.5mg/kg/dia como base para exemplo.
        // Se a dose diária é 0.5mg/kg/dia e a concentração é 4mg/ml (24 gotas/ml)
        const totalMgDay = w * 0.5; // Example: 0.5 mg/kg/dia
        const totalMlDay = totalMgDay / drugMassPerMl; // Total ml/dia
        const totalDropsDay = totalMlDay * medConfig.dropsPerMl; // Total gotas/dia

        const dropsPerDoseQID = totalDropsDay / 4; // Usual: 4x ao dia

        notes = `Dose total diária: ${totalMgDay.toFixed(1)} mg. Dividir a cada 6-8 horas.
                 Aproximadamente ${Math.round(dropsPerDoseQID)} gotas por dose.`;

        setResult({
            value: totalMlDay.toFixed(2),
            classification: 'ml/dia (total)',
            notes: notes
        });
        return;

    } else { // Dipirona & Paracetamol
        const mgPerDose = w * (medConfig.dosageMgPerKg as number);
        mlPerDose = mgPerDose / drugMassPerMl;
        dropsPerDose = mlPerDose * medConfig.dropsPerMl;
        doseValue = mgPerDose;

        notes = `Administrar a cada 6-8 horas. 1 gota/kg é uma boa regra geral.`;

        setResult({
            value: mlPerDose.toFixed(2),
            classification: `${doseValue.toFixed(1)} mg/dose`,
            notes: `${Math.round(dropsPerDose)} gotas (${mlPerDose.toFixed(2)} ml) por dose. ${notes}`
        });
        return;
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
        Doses Pediátricas (Medicação Oral)
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Peso da Criança (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
            placeholder="Ex: 10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Medicação</label>
          <select
            value={selectedMed}
            onChange={(e) => setSelectedMed(e.target.value as Medication)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
          >
            <option value="">Selecione</option>
            {Object.entries(MEDICATIONS).map(([key, med]) => (
                <option key={key} value={key}>{med.name} ({med.concentration})</option>
            ))}
          </select>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Calcular Dose
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 animate-fade-in">
          <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Dose Recomendada</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}</span>
            <span className="text-slate-500 dark:text-slate-400">{result.classification}</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 mt-2 whitespace-pre-wrap">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PediatricDosageCalculator;
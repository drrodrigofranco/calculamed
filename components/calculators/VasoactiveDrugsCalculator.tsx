import React, { useState } from 'react';

type CalcType = 'mcg_kg_min' | 'mcg_min' | 'ui_min' | 'mcg_kg_h' | 'mg_kg_h' | 'mg_kg_min' | 'ug_kg_min_cis';

interface DrugConfig {
  id: string;
  name: string;
  concentrationDesc: string;
  // Concentration params
  totalDrugMass: number; // in mg (or UI for vasopressin)
  totalVol: number; // in ml
  isUI?: boolean; // true if mass is in UI
  
  calcType: CalcType;
  minDose: string;
  maxDose: string;
  unitLabel: string;
}

interface DrugGroup {
  name: string;
  drugs: DrugConfig[];
}

const DATA: DrugGroup[] = [
  {
    name: 'Drogas Vasoativas',
    drugs: [
      { 
        id: 'nora4', name: 'Noradrenalina 4 amp', 
        concentrationDesc: '4 amp (4mg/4ml) + 234 ml SG5%', 
        totalDrugMass: 16, totalVol: 250, calcType: 'mcg_kg_min', minDose: '0,05', maxDose: '2', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'nora5', name: 'Noradrenalina 5 amp', 
        concentrationDesc: '5 amp (4mg/4ml) + 180 ml SG5%', 
        totalDrugMass: 20, totalVol: 200, calcType: 'mcg_kg_min', minDose: '0,05', maxDose: '2', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'nora8', name: 'Noradrenalina 8 amp', 
        concentrationDesc: '8 amp (4mg/4ml) + 180 ml SG5% (dose dobrada)', 
        totalDrugMass: 32, totalVol: 212, calcType: 'mcg_kg_min', minDose: '0,05', maxDose: '2', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'nora10', name: 'Noradrenalina 10 amp', 
        concentrationDesc: '10 amp (4mg/4ml) + 160 ml SG5% (dose dobrada)', 
        totalDrugMass: 40, totalVol: 200, calcType: 'mcg_kg_min', minDose: '0,05', maxDose: '2', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'nora2', name: 'Noradrenalina 2 amp', 
        concentrationDesc: '2 amp (4mg/4ml) + 92 ml SG5%', 
        totalDrugMass: 8, totalVol: 100, calcType: 'mcg_kg_min', minDose: '0,05', maxDose: '2', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'vaso', name: 'Vasopressina 1 amp', 
        concentrationDesc: '1 amp (20 UI/2ml) + 98 ml SF0,9%', 
        totalDrugMass: 20, totalVol: 100, isUI: true, calcType: 'ui_min', minDose: '0,01', maxDose: '0,04', unitLabel: 'UI/min'
      },
      { 
        id: 'adrena', name: 'Adrenalina 12 amp', 
        concentrationDesc: '12 amp (1mg/ml) + 188 ml SG5%', 
        totalDrugMass: 12, totalVol: 200, calcType: 'mcg_kg_min', minDose: '0,1', maxDose: '2,0', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'dopa', name: 'Dopamina 5 amp', 
        concentrationDesc: '5 amp (50mg/10ml) + 200 ml SG5%', 
        totalDrugMass: 250, totalVol: 250, calcType: 'mcg_kg_min', minDose: '5', maxDose: '20', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'dobuta1', name: 'Dobutamina 1 amp', 
        concentrationDesc: '1 amp (250mg/20ml) + 230 ml SG5%', 
        totalDrugMass: 250, totalVol: 250, calcType: 'mcg_kg_min', minDose: '5', maxDose: '20', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'dobuta2', name: 'Dobutamina 2 amp', 
        concentrationDesc: '2 amp (250mg/20ml) + 210 ml SG5%', 
        totalDrugMass: 500, totalVol: 250, calcType: 'mcg_kg_min', minDose: '5', maxDose: '20', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'dobuta3', name: 'Dobutamina 3 amp', 
        concentrationDesc: '3 amp (250mg/20ml) Pura', 
        totalDrugMass: 750, totalVol: 60, calcType: 'mcg_kg_min', minDose: '5', maxDose: '20', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'milrinone', name: 'Milrinone 1 amp', 
        concentrationDesc: '1 amp (20mg/20ml) + 80 ml SG5%', 
        totalDrugMass: 20, totalVol: 100, calcType: 'mcg_kg_min', minDose: '0,375', maxDose: '0,750', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'levosimendan', name: 'Levosimendan 1 amp', 
        concentrationDesc: '1 amp (12,5mg/5ml)+ 245 ml SG5%', 
        totalDrugMass: 12.5, totalVol: 250, calcType: 'mcg_kg_min', minDose: '0,1', maxDose: '0,2', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'tridil', name: 'Nitroglicerina 1 amp', 
        concentrationDesc: '1 amp (50mg/10ml) + 240 ml SG5%', 
        totalDrugMass: 50, totalVol: 250, calcType: 'mcg_min', minDose: '5', maxDose: '200', unitLabel: 'mcg/min'
      },
      { 
        id: 'nipride', name: 'Nitroprussiato 1 amp', 
        concentrationDesc: '1 amp (50mg/2ml) + 248 ml SG5%', 
        totalDrugMass: 50, totalVol: 250, calcType: 'mcg_kg_min', minDose: '0,5', maxDose: '10', unitLabel: 'mcg/kg/min'
      },
    ]
  },
  {
    name: 'Sedativos',
    drugs: [
      { 
        id: 'fenta', name: 'Fentanil 4 amp', 
        concentrationDesc: '4 amp (10ml) + 160 ml SF0,9%', 
        totalDrugMass: 2, totalVol: 200, calcType: 'mcg_kg_h', minDose: '0,3', maxDose: '3,0', unitLabel: 'µg/kg/h'
      },
      { 
        id: 'mida', name: 'Midazolam 4 amp', 
        concentrationDesc: '4 amp (50mg) + 160 ml SF0,9%', 
        totalDrugMass: 200, totalVol: 200, calcType: 'mcg_kg_min', minDose: '0,25', maxDose: '5,00', unitLabel: 'mcg/kg/min'
      },
      { 
        id: 'propofol', name: 'Propofol 5 amp', 
        concentrationDesc: '5 amp (200mg/20ml) puro sem diluir', 
        totalDrugMass: 1000, totalVol: 100, calcType: 'mg_kg_h', minDose: '0,5', maxDose: '5,00', unitLabel: 'mg/kg/h'
      },
      { 
        id: 'cetamina', name: 'Cetamina 1 ampola', 
        concentrationDesc: '1 amp (500mg/10ml) + 240 mL SF 0,9%', 
        totalDrugMass: 500, totalVol: 250, calcType: 'mg_kg_h', minDose: '0,5', maxDose: '1', unitLabel: 'mg/kg/h'
      },
      { 
        id: 'precedex', name: 'Dexmedetomidina', 
        concentrationDesc: '2 mL (200µg) + 48 mL SF 0,9%', 
        totalDrugMass: 0.2, totalVol: 50, calcType: 'mcg_kg_h', minDose: '0,2', maxDose: '1,5', unitLabel: 'µg/kg/h'
      },
    ]
  },
  {
    name: 'Bloqueadores Neuromusculares',
    drugs: [
      { 
        id: 'atracurio', name: 'Atracúrio', 
        concentrationDesc: '10 ml (100mg) + 90 mL (SF 0,9% ou SG 5%)', 
        totalDrugMass: 100, totalVol: 100, calcType: 'ug_kg_min_cis', minDose: '5', maxDose: '10', unitLabel: 'µ/kg/min'
      },
      { 
        id: 'cisatracurio', name: 'Cisatracúrio', 
        concentrationDesc: '50 mL (100mg) + 50 mL SF 0,9%', 
        totalDrugMass: 100, totalVol: 100, calcType: 'ug_kg_min_cis', minDose: '1', maxDose: '3', unitLabel: 'µ/kg/min'
      },
      { 
        id: 'rocuronio', name: 'Rocurônio', 
        concentrationDesc: '10 mL (100mg) + 90 mL SF 0,9%', 
        totalDrugMass: 100, totalVol: 100, calcType: 'mg_kg_h', minDose: '0,3', maxDose: '0,6', unitLabel: 'mg/kg/h'
      },
      { 
        id: 'pancuronio', name: 'Pancurônio', 
        concentrationDesc: '20 mL (40mg) + 80 mL SF 0,9%', 
        totalDrugMass: 40, totalVol: 100, calcType: 'mg_kg_h', minDose: '0,02', maxDose: '0,07', unitLabel: 'mg/kg/h'
      },
    ]
  }
];

const VasoactiveDrugsCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [rates, setRates] = useState<Record<string, string>>({}); // Map drugId -> rate

  const handleRateChange = (drugId: string, val: string) => {
    setRates(prev => ({ ...prev, [drugId]: val }));
  };

  const calculateDose = (drug: DrugConfig): string => {
    const w = parseFloat(weight);
    const r = parseFloat(rates[drug.id]);

    // Handle invalid inputs gracefully
    if (!r || isNaN(r)) return '0,00';

    // Calculate Concentration
    // baseUnit per ml (mg/ml or UI/ml)
    const conc = drug.totalDrugMass / drug.totalVol;

    let res = 0;

    // Formulas
    switch (drug.calcType) {
        case 'mcg_kg_min':
            if (!w || w <= 0) return '0,00';
            // (ml/h * mg/ml * 1000) / (kg * 60)
            res = (r * conc * 1000) / (w * 60);
            break;
        case 'mcg_min':
            // (ml/h * mg/ml * 1000) / 60
            res = (r * conc * 1000) / 60;
            break;
        case 'ui_min':
            // (ml/h * UI/ml) / 60
            res = (r * conc) / 60;
            break;
        case 'mcg_kg_h':
            if (!w || w <= 0) return '0,00';
            // (ml/h * mg/ml * 1000) / kg
            res = (r * conc * 1000) / w;
            break;
        case 'mg_kg_h':
            if (!w || w <= 0) return '0,00';
            // (ml/h * mg/ml) / kg
            res = (r * conc) / w;
            break;
        case 'ug_kg_min_cis':
             if (!w || w <= 0) return '0,00';
             // Same as mcg_kg_min but labeled µ/kg/min
             res = (r * conc * 1000) / (w * 60);
             break;
        default:
            return '0,00';
    }

    // Format: if < 0.1 show 3 decimals, else 2
    if (res < 0.01 && res > 0) return res.toFixed(3).replace('.', ',');
    return res.toFixed(2).replace('.', ',');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Calculadora Emergência e UTI
      </h3>

      {/* Step 1 */}
      <div className="mb-8">
          <h4 className="text-lg font-bold text-slate-800 mb-3">
              Passo 1) Coloque o peso do paciente
          </h4>
          <div className="flex items-center gap-3">
              <label className="font-bold text-slate-700 whitespace-nowrap">Peso em KG:</label>
              <div className="relative w-32">
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-2 pr-8 border border-slate-300 rounded shadow-sm focus:ring-2 focus:ring-medical-500 outline-none"
                    placeholder="0,00"
                />
                <span className="absolute right-2 top-2 text-xs text-slate-500">kg</span>
              </div>
          </div>
      </div>

      {/* Step 2 */}
      <div>
          <h4 className="text-lg font-bold text-slate-800 mb-4">
              Passo 2) Escolha o agente de acordo com a diluição e coloque a vazão.
          </h4>

          <div className="space-y-8">
            {DATA.map((group) => (
                <div key={group.name}>
                    <h5 className="text-xl font-bold text-slate-700 mb-3 border-b border-slate-200 pb-1">
                        {group.name}
                    </h5>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-3 border-b border-slate-200 font-bold text-slate-700">Medicação</th>
                                    <th className="p-3 border-b border-slate-200 font-bold text-slate-700 w-32">Vazão Atual</th>
                                    <th className="p-3 border-b border-slate-200 font-bold text-slate-700 text-right whitespace-nowrap">Dose Atual</th>
                                    <th className="p-3 border-b border-slate-200 font-bold text-slate-700 text-right">Dose Mínima a Máxima</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {group.drugs.map((drug) => (
                                    <tr key={drug.id} className="hover:bg-slate-50 transition">
                                        <td className="p-3">
                                            <div className="font-medium text-slate-900">{drug.name}</div>
                                            <div className="text-slate-500 text-xs">{drug.concentrationDesc}</div>
                                        </td>
                                        <td className="p-3">
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={rates[drug.id] || ''}
                                                    onChange={(e) => handleRateChange(drug.id, e.target.value)}
                                                    className="w-full p-2 border border-slate-300 rounded text-center focus:ring-1 focus:ring-medical-500 outline-none"
                                                    placeholder="0,00"
                                                />
                                                <span className="absolute right-2 top-2.5 text-[10px] text-slate-400 pointer-events-none">ml/h</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-right">
                                            <div className="font-bold text-medical-700 text-base">
                                                {calculateDose(drug)}
                                            </div>
                                        </td>
                                        <td className="p-3 text-right text-slate-500 text-xs whitespace-nowrap">
                                            {drug.minDose}-{drug.maxDose} {drug.unitLabel}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default VasoactiveDrugsCalculator;
#!/usr/bin/env python3
"""
Generate final Batch 4 calculators
"""

calculators = {
    'NexusCalculator': '''import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const NexusCalculator: React.FC = () => {
  const [criteria, setCriteria] = useState({
    midlineTenderness: false,
    alteredConsciousness: false,
    intoxication: false,
    neurologicDeficit: false,
    distractingInjury: false
  });
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const hasAnyCriteria = Object.values(criteria).some(v => v);
    const classification = hasAnyCriteria ? 'RX Indicado' : 'RX Não Necessário';
    const notes = hasAnyCriteria ? 'Realizar radiografia de coluna cervical' : 'Lesão cervical improvável';
    setResult({ value: hasAnyCriteria ? 1 : 0, classification, notes });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">NEXUS Criteria</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Indicação de RX em trauma cervical</p>
      <div className="space-y-3">
        {[
          ['midlineTenderness', 'Sensibilidade na linha média cervical'],
          ['alteredConsciousness', 'Consciência alterada'],
          ['intoxication', 'Intoxicação'],
          ['neurologicDeficit', 'Déficit neurológico focal'],
          ['distractingInjury', 'Lesão distrativa']
        ].map(([key, label]) => (
          <div key={key} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={criteria[key as keyof typeof criteria]} 
                onChange={(e) => setCriteria({...criteria, [key]: e.target.checked})} 
                className="w-5 h-5 text-medical-600 rounded" />
              <span className="font-medium text-slate-800 dark:text-white">{label}</span>
            </label>
          </div>
        ))}
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Avaliar NEXUS
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.classification}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default NexusCalculator;''',

    'OsmolalityCalculator': '''import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const OsmolalityCalculator: React.FC = () => {
  const [sodium, setSodium] = useState<string>('');
  const [glucose, setGlucose] = useState<string>('');
  const [bun, setBun] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const na = parseFloat(sodium);
    const gluc = parseFloat(glucose);
    const urea = parseFloat(bun);
    if (isNaN(na) || isNaN(gluc) || isNaN(urea)) return;

    const osm = (2 * na) + (gluc / 18) + (urea / 2.8);
    const classification = osm < 275 ? 'Hipoosmolar' : osm > 295 ? 'Hiperosmolar' : 'Normal';
    setResult({ value: osm.toFixed(1), classification, notes: 'Osmolalidade sérica calculada' });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Osmolalidade Sérica</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Cálculo estimado</p>
      <div className="space-y-4">
        <input type="number" value={sodium} onChange={(e) => setSodium(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Sódio (mEq/L)" />
        <input type="number" value={glucose} onChange={(e) => setGlucose(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Glicose (mg/dL)" />
        <input type="number" value={bun} onChange={(e) => setBun(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Ureia (mg/dL)" />
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular Osmolalidade
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} mOsm/kg</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
        </div>
      )}
    </div>
  );
};

export default OsmolalityCalculator;''',

    'SAAGCalculator': '''import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const SAAGCalculator: React.FC = () => {
  const [serumAlbumin, setSerumAlbumin] = useState<string>('');
  const [ascitesAlbumin, setAscitesAlbumin] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const serum = parseFloat(serumAlbumin);
    const ascites = parseFloat(ascitesAlbumin);
    if (isNaN(serum) || isNaN(ascites)) return;

    const saag = serum - ascites;
    const classification = saag >= 1.1 ? 'SAAG Alto' : 'SAAG Baixo';
    const notes = saag >= 1.1 ? 'Hipertensão portal (cirrose, ICC)' : 'Outras causas (TB, neoplasia, pancreatite)';
    setResult({ value: saag.toFixed(2), classification, notes });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">SAAG (GASA)</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Gradiente Albumina Soro-Ascite</p>
      <div className="space-y-4">
        <input type="number" step="0.1" value={serumAlbumin} onChange={(e) => setSerumAlbumin(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Albumina Sérica (g/dL)" />
        <input type="number" step="0.1" value={ascitesAlbumin} onChange={(e) => setAscitesAlbumin(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Albumina Ascite (g/dL)" />
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular SAAG
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} g/dL</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default SAAGCalculator;''',

    'FENaCalculator': '''import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const FENaCalculator: React.FC = () => {
  const [uNa, setUNa] = useState<string>('');
  const [pNa, setPNa] = useState<string>('');
  const [uCr, setUCr] = useState<string>('');
  const [pCr, setPCr] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const una = parseFloat(uNa);
    const pna = parseFloat(pNa);
    const ucr = parseFloat(uCr);
    const pcr = parseFloat(pCr);
    if (isNaN(una) || isNaN(pna) || isNaN(ucr) || isNaN(pcr)) return;

    const fena = ((una * pcr) / (pna * ucr)) * 100;
    const classification = fena < 1 ? 'Pré-Renal' : fena > 2 ? 'Renal/Pós-Renal' : 'Indeterminado';
    const notes = fena < 1 ? 'Azotemia pré-renal' : 'NTA ou obstrução';
    setResult({ value: fena.toFixed(2), classification, notes });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">FENa</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Fração de Excreção de Sódio</p>
      <div className="space-y-4">
        <input type="number" value={uNa} onChange={(e) => setUNa(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Na Urinário (mEq/L)" />
        <input type="number" value={pNa} onChange={(e) => setPNa(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Na Plasmático (mEq/L)" />
        <input type="number" value={uCr} onChange={(e) => setUCr(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Cr Urinária (mg/dL)" />
        <input type="number" value={pCr} onChange={(e) => setPCr(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Cr Plasmática (mg/dL)" />
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular FENa
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value}%</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default FENaCalculator;''',

    'VO2MaxCalculator': '''import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const VO2MaxCalculator: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [hr, setHr] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const h = parseFloat(hr);
    if (isNaN(a) || isNaN(h)) return;

    const vo2max = gender === 'male' ? 
      15.3 * (220 - a) / h : 
      14.7 * (220 - a) / h;
    
    const classification = vo2max > 50 ? 'Excelente' : vo2max > 40 ? 'Bom' : vo2max > 30 ? 'Regular' : 'Fraco';
    setResult({ value: vo2max.toFixed(1), classification, notes: 'VO2 Max estimado' });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">VO2 Max Estimado</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Capacidade Aeróbica</p>
      <div className="space-y-4">
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
        </select>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Idade (anos)" />
        <input type="number" value={hr} onChange={(e) => setHr(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="FC em Repouso (bpm)" />
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular VO2 Max
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} mL/kg/min</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
        </div>
      )}
    </div>
  );
};

export default VO2MaxCalculator;''',

    'LBMCalculator': '''import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const LBMCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h)) return;

    const lbm = gender === 'male' ?
      (0.407 * w) + (0.267 * h) - 19.2 :
      (0.252 * w) + (0.473 * h) - 48.3;
    
    const fatMass = w - lbm;
    const bodyFat = (fatMass / w) * 100;
    const classification = bodyFat < 15 ? 'Baixo' : bodyFat < 25 ? 'Normal' : 'Alto';
    setResult({ value: lbm.toFixed(1), classification, notes: `Gordura: ${bodyFat.toFixed(1)}%` });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Massa Magra (LBM)</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Índice de Massa Magra</p>
      <div className="space-y-4">
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
        </select>
        <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Peso (kg)" />
        <input type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)}
          className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg" placeholder="Altura (cm)" />
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular Massa Magra
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} kg</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">% Gordura: {result.classification}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default LBMCalculator;''',
}

# Write calculators
for name, code in calculators.items():
    with open(f'components/calculators/{name}.tsx', 'w', encoding='utf-8') as f:
        f.write(code)
    print(f"✅ Created {name}.tsx")

print(f"\n✅ Created {len(calculators)} calculators (Part 2/2)")
print(f"\n🎉 All Batch 4 calculators created!")

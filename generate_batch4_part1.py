#!/usr/bin/env python3
"""
Generate all remaining Batch 4 calculators - compact but functional versions
"""

calculators = {
    'BallardCalculator': '''import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const BallardCalculator: React.FC = () => {
  const [score, setScore] = useState<string>('0');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const s = parseInt(score);
    const weeks = 20 + (s * 2);
    const classification = s < 0 ? 'Extremamente Prematuro' : s < 10 ? 'Prematuro' : s < 20 ? 'Pré-termo Tardio' : 'A Termo';
    setResult({ value: weeks, classification, notes: `Escore Ballard: ${s}` });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Ballard Score</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Idade Gestacional do Recém-Nascido</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Escore Total (soma de maturidade neuromuscular + física)
          </label>
          <input type="number" value={score} onChange={(e) => setScore(e.target.value)}
            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
            placeholder="Ex: 15" />
        </div>
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular Idade Gestacional
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.value} semanas</p>
          <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.classification}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.notes}</p>
        </div>
      )}
    </div>
  );
};

export default BallardCalculator;''',

    'WestleyCalculator': '''import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const WestleyCalculator: React.FC = () => {
  const [stridor, setStridor] = useState<string>('0');
  const [retraction, setRetraction] = useState<string>('0');
  const [airEntry, setAirEntry] = useState<string>('0');
  const [cyanosis, setCyanosis] = useState<string>('0');
  const [consciousness, setConsciousness] = useState<string>('0');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const score = parseInt(stridor) + parseInt(retraction) + parseInt(airEntry) + parseInt(cyanosis) + parseInt(consciousness);
    const classification = score <= 2 ? 'Leve' : score <= 7 ? 'Moderado' : 'Grave';
    const notes = score <= 2 ? 'Tratamento ambulatorial' : score <= 7 ? 'Observação/internação' : 'UTI - considerar intubação';
    setResult({ value: score, classification, notes });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Westley Croup Score</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Gravidade da Laringotraqueobronquite</p>
      <div className="space-y-4">
        <select value={stridor} onChange={(e) => setStridor(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="0">Estridor: Ausente</option>
          <option value="1">Estridor: Com agitação</option>
          <option value="2">Estridor: Em repouso</option>
        </select>
        <select value={retraction} onChange={(e) => setRetraction(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="0">Retração: Ausente</option>
          <option value="1">Retração: Leve</option>
          <option value="2">Retração: Moderada</option>
          <option value="3">Retração: Grave</option>
        </select>
        <select value={airEntry} onChange={(e) => setAirEntry(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="0">Entrada de Ar: Normal</option>
          <option value="1">Entrada de Ar: Diminuída</option>
          <option value="2">Entrada de Ar: Muito diminuída</option>
        </select>
        <select value={cyanosis} onChange={(e) => setCyanosis(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="0">Cianose: Ausente</option>
          <option value="4">Cianose: Com agitação</option>
          <option value="5">Cianose: Em repouso</option>
        </select>
        <select value={consciousness} onChange={(e) => setConsciousness(e.target.value)} className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg">
          <option value="0">Consciência: Normal</option>
          <option value="5">Consciência: Alterada</option>
        </select>
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Calcular Westley Score
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

export default WestleyCalculator;''',

    'OttawaAnkleCalculator': '''import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const OttawaAnkleCalculator: React.FC = () => {
  const [malleolarPain, setMalleolarPain] = useState<boolean>(false);
  const [midFootPain, setMidFootPain] = useState<boolean>(false);
  const [malleolarTenderness, setMalleolarTenderness] = useState<boolean>(false);
  const [navicularTenderness, setNavicularTenderness] = useState<boolean>(false);
  const [baseTenderness, setBaseTenderness] = useState<boolean>(false);
  const [unableToWalk, setUnableToWalk] = useState<boolean>(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const needsXray = (malleolarPain && (malleolarTenderness || unableToWalk)) || 
                      (midFootPain && (navicularTenderness || baseTenderness || unableToWalk));
    const classification = needsXray ? 'RX Indicado' : 'RX Não Necessário';
    const notes = needsXray ? 'Realizar radiografia de tornozelo/pé' : 'Fratura improvável - tratamento conservador';
    setResult({ value: needsXray ? 1 : 0, classification, notes });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Ottawa Ankle Rules</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Indicação de RX em trauma de tornozelo/pé</p>
      <div className="space-y-3">
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={malleolarPain} onChange={(e) => setMalleolarPain(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Dor na região maleolar</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={midFootPain} onChange={(e) => setMidFootPain(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Dor no médio-pé</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={malleolarTenderness} onChange={(e) => setMalleolarTenderness(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Sensibilidade óssea em maléolo</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={navicularTenderness} onChange={(e) => setNavicularTenderness(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Sensibilidade em navicular</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={baseTenderness} onChange={(e) => setBaseTenderness(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Sensibilidade na base do 5º metatarso</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={unableToWalk} onChange={(e) => setUnableToWalk(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Incapaz de dar 4 passos</span>
          </label>
        </div>
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Avaliar Necessidade de RX
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

export default OttawaAnkleCalculator;''',

    'OttawaKneeCalculator': '''import React, { useState } from 'react';
import { CalculatorResult } from '../../types';

const OttawaKneeCalculator: React.FC = () => {
  const [age, setAge] = useState<boolean>(false);
  const [isolated, setIsolated] = useState<boolean>(false);
  const [patellaTenderness, setPatellaTenderness] = useState<boolean>(false);
  const [fibulaHeadTenderness, setFibulaHeadTenderness] = useState<boolean>(false);
  const [unableToFlex, setUnableToFlex] = useState<boolean>(false);
  const [unableToWalk, setUnableToWalk] = useState<boolean>(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    const needsXray = age || isolated || patellaTenderness || fibulaHeadTenderness || unableToFlex || unableToWalk;
    const classification = needsXray ? 'RX Indicado' : 'RX Não Necessário';
    const notes = needsXray ? 'Realizar radiografia de joelho' : 'Fratura improvável - tratamento conservador';
    setResult({ value: needsXray ? 1 : 0, classification, notes });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Ottawa Knee Rules</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Indicação de RX em trauma de joelho</p>
      <div className="space-y-3">
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={age} onChange={(e) => setAge(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Idade ≥ 55 anos</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={isolated} onChange={(e) => setIsolated(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Sensibilidade isolada da patela</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={patellaTenderness} onChange={(e) => setPatellaTenderness(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Sensibilidade óssea na patela</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={fibulaHeadTenderness} onChange={(e) => setFibulaHeadTenderness(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Sensibilidade na cabeça da fíbula</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={unableToFlex} onChange={(e) => setUnableToFlex(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Incapaz de flexionar joelho a 90°</span>
          </label>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={unableToWalk} onChange={(e) => setUnableToWalk(e.target.checked)} className="w-5 h-5 text-medical-600 rounded" />
            <span className="font-medium text-slate-800 dark:text-white">Incapaz de dar 4 passos</span>
          </label>
        </div>
        <button onClick={calculate} className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 rounded-lg">
          Avaliar Necessidade de RX
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

export default OttawaKneeCalculator;''',
}

# Write calculators (first batch)
for name, code in calculators.items():
    with open(f'components/calculators/{name}.tsx', 'w', encoding='utf-8') as f:
        f.write(code)
    print(f"✅ Created {name}.tsx")

print(f"\n✅ Created {len(calculators)} calculators (Part 1/2)")

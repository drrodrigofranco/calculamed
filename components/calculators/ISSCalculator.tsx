import React, { useState } from 'react';
import { ArrowLeft, Activity } from 'lucide-react';
import { AppView } from '../../types';

interface ISSCalculatorProps {
  onNavigate: (view: AppView) => void;
}

const ISSCalculator: React.FC<ISSCalculatorProps> = ({ onNavigate }) => {
  const [head, setHead] = useState<number>(0);
  const [face, setFace] = useState<number>(0);
  const [chest, setChest] = useState<number>(0);
  const [abdomen, setAbdomen] = useState<number>(0);
  const [extremities, setExtremities] = useState<number>(0);
  const [external, setExternal] = useState<number>(0);

  const calculateISS = () => {
    const scores = [head, face, chest, abdomen, extremities, external];
    
    // Check for AIS 6 (unsurvivable injury)
    if (scores.some(s => s === 6)) {
      return {
        iss: 75,
        severity: 'Crítico (Não Sobrevivível)',
        mortality: '> 90%',
        color: 'text-black'
      };
    }

    // Get three highest scores
    const sortedScores = [...scores].sort((a, b) => b - a);
    const top3 = sortedScores.slice(0, 3);
    
    // ISS = sum of squares of top 3
    const iss = top3.reduce((sum, score) => sum + (score * score), 0);

    let severity = '';
    let mortality = '';
    let color = '';

    if (iss < 9) {
      severity = 'Leve';
      mortality = '< 1%';
      color = 'text-green-600';
    } else if (iss < 16) {
      severity = 'Moderado';
      mortality = '1-5%';
      color = 'text-yellow-600';
    } else if (iss < 25) {
      severity = 'Grave';
      mortality = '5-15%';
      color = 'text-orange-600';
    } else {
      severity = 'Crítico';
      mortality = '> 15%';
      color = 'text-red-600';
    }

    return { iss, severity, mortality, color };
  };

  const result = calculateISS();

  const aisOptions = [
    { value: 0, label: '0 - Sem lesão' },
    { value: 1, label: '1 - Leve' },
    { value: 2, label: '2 - Moderada' },
    { value: 3, label: '3 - Grave' },
    { value: 4, label: '4 - Muito grave' },
    { value: 5, label: '5 - Crítica' },
    { value: 6, label: '6 - Não sobrevivível' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="mb-6 flex items-center gap-2 text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ISS</h1>
              <p className="text-sm text-gray-600">Injury Severity Score</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Selecione o maior escore AIS (Abbreviated Injury Scale) para cada região do corpo:
          </p>

          {/* Body Regions */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cabeça/Pescoço
              </label>
              <select
                value={head}
                onChange={(e) => setHead(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Face
              </label>
              <select
                value={face}
                onChange={(e) => setFace(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tórax
              </label>
              <select
                value={chest}
                onChange={(e) => setChest(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Abdome
              </label>
              <select
                value={abdomen}
                onChange={(e) => setAbdomen(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Extremidades/Pelve
              </label>
              <select
                value={extremities}
                onChange={(e) => setExtremities(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Externo
              </label>
              <select
                value={external}
                onChange={(e) => setExternal(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-orange-600 mb-2">
                {result.iss}
              </div>
              <div className="text-sm text-gray-600">ISS</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Gravidade:</span>
                <span className={`font-bold ${result.color}`}>
                  {result.severity}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Mortalidade estimada:</span>
                <span className="font-bold text-gray-800">{result.mortality}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-gray-600">
              <strong>Nota:</strong> ISS é calculado somando os quadrados dos 3 maiores escores AIS
              de diferentes regiões do corpo. Qualquer escore AIS de 6 resulta automaticamente em ISS = 75.
              ISS {'≥ 16'} define politrauma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ISSCalculator;
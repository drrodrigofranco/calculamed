import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { AppView } from '../../types';

interface HEARTCalculatorProps {
  onNavigate: (view: AppView) => void;
}

const HEARTCalculator: React.FC<HEARTCalculatorProps> = ({ onNavigate }) => {
  const [history, setHistory] = useState<number>(0);
  const [ecg, setEcg] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [riskFactors, setRiskFactors] = useState<number>(0);
  const [troponin, setTroponin] = useState<number>(0);

  const calculateHEART = () => {
    const total = history + ecg + age + riskFactors + troponin;
    
    let risk = '';
    let mace = '';
    let recommendation = '';
    
    if (total <= 3) {
      risk = 'Baixo Risco';
      mace = '1.7%';
      recommendation = 'Considerar alta com seguimento ambulatorial';
    } else if (total <= 6) {
      risk = 'Risco Moderado';
      mace = '16.6%';
      recommendation = 'Observação e investigação adicional';
    } else {
      risk = 'Alto Risco';
      mace = '50.1%';
      recommendation = 'Internação e tratamento agressivo';
    }
    
    return { total, risk, mace, recommendation };
  };

  const result = calculateHEART();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="mb-6 flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Heart className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">HEART Score</h1>
              <p className="text-sm text-gray-600">Risco de Síndrome Coronariana Aguda</p>
            </div>
          </div>

          {/* History */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              História (History)
            </label>
            <select
              value={history}
              onChange={(e) => setHistory(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
            >
              <option value={0}>Levemente suspeita (0 pts)</option>
              <option value={1}>Moderadamente suspeita (1 pt)</option>
              <option value={2}>Altamente suspeita (2 pts)</option>
            </select>
          </div>

          {/* ECG */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ECG
            </label>
            <select
              value={ecg}
              onChange={(e) => setEcg(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
            >
              <option value={0}>Normal (0 pts)</option>
              <option value={1}>Alterações inespecíficas (1 pt)</option>
              <option value={2}>Alterações significativas (2 pts)</option>
            </select>
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Idade
            </label>
            <select
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
            >
              <option value={0}>{'< 45 anos (0 pts)'}</option>
              <option value={1}>45-64 anos (1 pt)</option>
              <option value={2}>{'≥ 65 anos (2 pts)'}</option>
            </select>
          </div>

          {/* Risk Factors */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fatores de Risco
            </label>
            <select
              value={riskFactors}
              onChange={(e) => setRiskFactors(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
            >
              <option value={0}>Nenhum fator (0 pts)</option>
              <option value={1}>1-2 fatores (1 pt)</option>
              <option value={2}>≥ 3 fatores ou história de DAC (2 pts)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Fatores: HAS, DM, tabagismo, dislipidemia, obesidade, história familiar
            </p>
          </div>

          {/* Troponin */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Troponina
            </label>
            <select
              value={troponin}
              onChange={(e) => setTroponin(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
            >
              <option value={0}>Normal (0 pts)</option>
              <option value={1}>1-3x limite superior (1 pt)</option>
              <option value={2}>{'>3x limite superior (2 pts)'}</option>
            </select>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-red-600 mb-2">
                {result.total}
              </div>
              <div className="text-sm text-gray-600">pontos</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Classificação:</span>
                <span className={`font-bold ${
                  result.total <= 3 ? 'text-green-600' :
                  result.total <= 6 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {result.risk}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">MACE em 6 semanas:</span>
                <span className="font-bold text-gray-800">{result.mace}</span>
              </div>

              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-1">Recomendação:</p>
                <p className="text-sm text-gray-600">{result.recommendation}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-gray-600">
              <strong>Nota:</strong> MACE = Major Adverse Cardiac Events (morte, IAM, revascularização).
              O HEART Score auxilia na estratificação de risco em pacientes com dor torácica no departamento de emergência.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HEARTCalculator;
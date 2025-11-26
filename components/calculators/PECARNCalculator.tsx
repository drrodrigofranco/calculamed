import React, { useState } from 'react';
import { ArrowLeft, Baby } from 'lucide-react';
import { AppView } from '../../types';

interface PECARNCalculatorProps {
  onNavigate: (view: AppView) => void;
}

const PECARNCalculator: React.FC<PECARNCalculatorProps> = ({ onNavigate }) => {
  const [ageGroup, setAgeGroup] = useState<'under2' | 'over2'>('over2');
  
  // For children < 2 years
  const [gcsUnder2, setGcsUnder2] = useState<boolean>(false);
  const [alteredMental, setAlteredMental] = useState<boolean>(false);
  const [skullFracture, setSkullFracture] = useState<boolean>(false);
  const [locOver5s, setLocOver5s] = useState<boolean>(false);
  const [notActingNormal, setNotActingNormal] = useState<boolean>(false);
  const [severeMechanism, setSevereMechanism] = useState<boolean>(false);

  // For children ≥ 2 years
  const [gcsOver2, setGcsOver2] = useState<boolean>(false);
  const [alteredMentalOver2, setAlteredMentalOver2] = useState<boolean>(false);
  const [basilarFracture, setBasilarFracture] = useState<boolean>(false);
  const [locAny, setLocAny] = useState<boolean>(false);
  const [vomiting, setVomiting] = useState<boolean>(false);
  const [severeMechanismOver2, setSevereMechanismOver2] = useState<boolean>(false);
  const [severeHeadache, setSevereHeadache] = useState<boolean>(false);

  const calculatePECARN = () => {
    if (ageGroup === 'under2') {
      // High risk criteria
      if (gcsUnder2 || alteredMental || skullFracture) {
        return {
          risk: 'Alto Risco',
          recommendation: 'TC de crânio indicada',
          ciTBI: '> 4%',
          color: 'text-red-600'
        };
      }
      
      // Intermediate risk
      if (locOver5s || notActingNormal || severeMechanism) {
        return {
          risk: 'Risco Intermediário',
          recommendation: 'Considerar TC vs observação',
          ciTBI: '0.9%',
          color: 'text-yellow-600'
        };
      }
      
      // Low risk
      return {
        risk: 'Risco Muito Baixo',
        recommendation: 'TC não indicada',
        ciTBI: '< 0.02%',
        color: 'text-green-600'
      };
    } else {
      // ≥ 2 years
      // High risk
      if (gcsOver2 || alteredMentalOver2 || basilarFracture) {
        return {
          risk: 'Alto Risco',
          recommendation: 'TC de crânio indicada',
          ciTBI: '> 4%',
          color: 'text-red-600'
        };
      }
      
      // Intermediate risk
      if (locAny || vomiting || severeMechanismOver2 || severeHeadache) {
        return {
          risk: 'Risco Intermediário',
          recommendation: 'Considerar TC vs observação',
          ciTBI: '0.9%',
          color: 'text-yellow-600'
        };
      }
      
      // Low risk
      return {
        risk: 'Risco Muito Baixo',
        recommendation: 'TC não indicada',
        ciTBI: '< 0.05%',
        color: 'text-green-600'
      };
    }
  };

  const result = calculatePECARN();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Baby className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">PECARN</h1>
              <p className="text-sm text-gray-600">Trauma Craniano Pediátrico</p>
            </div>
          </div>

          {/* Age Group Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Faixa Etária
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setAgeGroup('under2')}
                className={`p-3 rounded-xl font-semibold transition-all ${
                  ageGroup === 'under2'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {'< 2 anos'}
              </button>
              <button
                onClick={() => setAgeGroup('over2')}
                className={`p-3 rounded-xl font-semibold transition-all ${
                  ageGroup === 'over2'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {'≥ 2 anos'}
              </button>
            </div>
          </div>

          {/* Criteria for < 2 years */}
          {ageGroup === 'under2' && (
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-sm font-semibold text-red-800 mb-3">Critérios de Alto Risco:</p>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={gcsUnder2}
                    onChange={(e) => setGcsUnder2(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">GCS {'< 15'}</span>
                </label>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={alteredMental}
                    onChange={(e) => setAlteredMental(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Estado mental alterado</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={skullFracture}
                    onChange={(e) => setSkullFracture(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Fratura de crânio palpável</span>
                </label>
              </div>

              <div className="p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm font-semibold text-yellow-800 mb-3">Critérios de Risco Intermediário:</p>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={locOver5s}
                    onChange={(e) => setLocOver5s(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Perda de consciência {'> 5s'}</span>
                </label>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={notActingNormal}
                    onChange={(e) => setNotActingNormal(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Não agindo normalmente (segundo pais)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={severeMechanism}
                    onChange={(e) => setSevereMechanism(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Mecanismo grave</span>
                </label>
              </div>
            </div>
          )}

          {/* Criteria for ≥ 2 years */}
          {ageGroup === 'over2' && (
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-sm font-semibold text-red-800 mb-3">Critérios de Alto Risco:</p>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={gcsOver2}
                    onChange={(e) => setGcsOver2(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">GCS {'< 15'}</span>
                </label>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={alteredMentalOver2}
                    onChange={(e) => setAlteredMentalOver2(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Estado mental alterado</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={basilarFracture}
                    onChange={(e) => setBasilarFracture(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Sinais de fratura de base de crânio</span>
                </label>
              </div>

              <div className="p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm font-semibold text-yellow-800 mb-3">Critérios de Risco Intermediário:</p>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={locAny}
                    onChange={(e) => setLocAny(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Qualquer perda de consciência</span>
                </label>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={vomiting}
                    onChange={(e) => setVomiting(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Vômitos</span>
                </label>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={severeMechanismOver2}
                    onChange={(e) => setSevereMechanismOver2(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Mecanismo grave</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={severeHeadache}
                    onChange={(e) => setSevereHeadache(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Cefaleia grave</span>
                </label>
              </div>
            </div>
          )}

          {/* Result */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Risco:</span>
                <span className={`font-bold ${result.color}`}>
                  {result.risk}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">ciTBI:</span>
                <span className="font-bold text-gray-800">{result.ciTBI}</span>
              </div>

              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-1">Recomendação:</p>
                <p className="text-sm text-gray-600">{result.recommendation}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-gray-600">
              <strong>Nota:</strong> ciTBI = clinically important traumatic brain injury.
              Mecanismo grave inclui: acidente automobilístico com ejeção, morte de passageiro,
              capotamento; pedestre/ciclista sem capacete atropelado; queda {'> 0.9m (< 2 anos)'} ou {'> 1.5m (≥ 2 anos)'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PECARNCalculator;
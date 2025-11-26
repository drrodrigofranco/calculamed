import React, { useState } from 'react';
import { ArrowLeft, Bone } from 'lucide-react';
import { AppView } from '../../types';

interface CanadianCSpineCalculatorProps {
  onNavigate: (view: AppView) => void;
}

const CanadianCSpineCalculator: React.FC<CanadianCSpineCalculatorProps> = ({ onNavigate }) => {
  // High-risk factors
  const [age65, setAge65] = useState<boolean>(false);
  const [dangerousMechanism, setDangerousMechanism] = useState<boolean>(false);
  const [extremityParesthesias, setExtremityParesthesias] = useState<boolean>(false);

  // Low-risk factors
  const [simpleRearEnd, setSimpleRearEnd] = useState<boolean>(false);
  const [sitting, setSitting] = useState<boolean>(false);
  const [ambulatory, setAmbulatory] = useState<boolean>(false);
  const [delayedOnset, setDelayedOnset] = useState<boolean>(false);
  const [noMidlineTenderness, setNoMidlineTenderness] = useState<boolean>(false);

  // Ability to rotate
  const [canRotate, setCanRotate] = useState<boolean | null>(null);

  const calculateCSpine = () => {
    // Step 1: Any high-risk factor?
    if (age65 || dangerousMechanism || extremityParesthesias) {
      return {
        result: 'Radiografia INDICADA',
        reason: 'Presença de fator de alto risco',
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    }

    // Step 2: Any low-risk factor allowing assessment?
    const hasLowRiskFactor = simpleRearEnd || sitting || ambulatory || delayedOnset || noMidlineTenderness;
    
    if (!hasLowRiskFactor) {
      return {
        result: 'Radiografia INDICADA',
        reason: 'Ausência de fatores de baixo risco',
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    }

    // Step 3: Can rotate neck 45° left and right?
    if (canRotate === null) {
      return {
        result: 'Avaliar rotação cervical',
        reason: 'Paciente pode rotacionar ativamente o pescoço 45° para cada lado?',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      };
    }

    if (!canRotate) {
      return {
        result: 'Radiografia INDICADA',
        reason: 'Incapaz de rotacionar pescoço 45°',
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    }

    return {
      result: 'Radiografia NÃO INDICADA',
      reason: 'Baixo risco de lesão cervical',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    };
  };

  const result = calculateCSpine();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Bone className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Canadian C-Spine Rule</h1>
              <p className="text-sm text-gray-600">Necessidade de Radiografia Cervical</p>
            </div>
          </div>

          {/* High-Risk Factors */}
          <div className="mb-6 p-4 bg-red-50 rounded-xl">
            <p className="text-sm font-semibold text-red-800 mb-3">
              1. Fatores de ALTO RISCO (qualquer um indica radiografia):
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={age65}
                  onChange={(e) => setAge65(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Idade ≥ 65 anos</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={dangerousMechanism}
                  onChange={(e) => setDangerousMechanism(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Mecanismo perigoso</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={extremityParesthesias}
                  onChange={(e) => setExtremityParesthesias(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Parestesias em extremidades</span>
              </label>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Mecanismo perigoso: queda ≥ 1m ou 5 degraus, carga axial, acidente de alta velocidade,
              capotamento, ejeção, acidente com bicicleta
            </p>
          </div>

          {/* Low-Risk Factors */}
          <div className="mb-6 p-4 bg-green-50 rounded-xl">
            <p className="text-sm font-semibold text-green-800 mb-3">
              2. Fatores de BAIXO RISCO (permitem avaliação da amplitude de movimento):
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={simpleRearEnd}
                  onChange={(e) => setSimpleRearEnd(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Colisão traseira simples</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={sitting}
                  onChange={(e) => setSitting(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Sentado no departamento de emergência</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={ambulatory}
                  onChange={(e) => setAmbulatory(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Deambulou a qualquer momento</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={delayedOnset}
                  onChange={(e) => setDelayedOnset(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Início tardio da dor cervical</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={noMidlineTenderness}
                  onChange={(e) => setNoMidlineTenderness(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Ausência de dor à palpação da linha média</span>
              </label>
            </div>
          </div>

          {/* Rotation Assessment */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm font-semibold text-blue-800 mb-3">
              3. Capaz de rotacionar ativamente o pescoço 45° para esquerda E direita?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCanRotate(true)}
                className={`p-3 rounded-xl font-semibold transition-all ${
                  canRotate === true
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sim
              </button>
              <button
                onClick={() => setCanRotate(false)}
                className={`p-3 rounded-xl font-semibold transition-all ${
                  canRotate === false
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Não
              </button>
            </div>
          </div>

          {/* Result */}
          <div className={`${result.bgColor} rounded-xl p-6`}>
            <div className="text-center mb-4">
              <div className={`text-2xl font-bold ${result.color} mb-2`}>
                {result.result}
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-1">Justificativa:</p>
              <p className="text-sm text-gray-600">{result.reason}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
            <p className="text-xs text-gray-600">
              <strong>Critérios de Exclusão:</strong> Idade {'< 16 anos'}, trauma penetrante,
              instabilidade hemodinâmica, GCS {'< 15'}, lesão vertebral conhecida, paralisia aguda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanadianCSpineCalculator;
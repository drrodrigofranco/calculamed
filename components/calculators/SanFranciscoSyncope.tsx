import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { AppView } from '../../types';

interface SanFranciscoSyncopeProps {
  onNavigate: (view: AppView) => void;
}

const SanFranciscoSyncope: React.FC<SanFranciscoSyncopeProps> = ({ onNavigate }) => {
  const [chf, setChf] = useState<boolean>(false);
  const [hematocrit, setHematocrit] = useState<boolean>(false);
  const [ecgAbnormal, setEcgAbnormal] = useState<boolean>(false);
  const [sob, setSob] = useState<boolean>(false);
  const [sbp, setSbp] = useState<boolean>(false);

  const calculateSyncope = () => {
    const isHighRisk = chf || hematocrit || ecgAbnormal || sob || sbp;

    if (isHighRisk) {
      return {
        risk: 'ALTO RISCO',
        recommendation: 'Admissão hospitalar indicada',
        adverseEvent: '5-7%',
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    }

    return {
      risk: 'BAIXO RISCO',
      recommendation: 'Considerar alta com seguimento ambulatorial',
      adverseEvent: '< 1%',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    };
  };

  const result = calculateSyncope();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Heart className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">San Francisco Syncope Rule</h1>
              <p className="text-sm text-gray-600">Estratificação de Risco em Síncope</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Marque os critérios presentes (mnemônico: <strong>CHESS</strong>):
          </p>

          {/* Criteria */}
          <div className="space-y-3 mb-6">
            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={chf}
                onChange={(e) => setChf(e.target.checked)}
                className="w-5 h-5 mt-0.5"
              />
              <div>
                <span className="text-sm font-semibold text-gray-800">
                  C - CHF (Insuficiência Cardíaca Congestiva)
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  História de insuficiência cardíaca congestiva
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={hematocrit}
                onChange={(e) => setHematocrit(e.target.checked)}
                className="w-5 h-5 mt-0.5"
              />
              <div>
                <span className="text-sm font-semibold text-gray-800">
                  H - Hematócrito {'< 30%'}
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Hematócrito abaixo de 30% na admissão
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={ecgAbnormal}
                onChange={(e) => setEcgAbnormal(e.target.checked)}
                className="w-5 h-5 mt-0.5"
              />
              <div>
                <span className="text-sm font-semibold text-gray-800">
                  E - ECG Anormal
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Qualquer alteração no ECG (exceto sinusal)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={sob}
                onChange={(e) => setSob(e.target.checked)}
                className="w-5 h-5 mt-0.5"
              />
              <div>
                <span className="text-sm font-semibold text-gray-800">
                  S - Shortness of breath (Dispneia)
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Queixa de falta de ar
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={sbp}
                onChange={(e) => setSbp(e.target.checked)}
                className="w-5 h-5 mt-0.5"
              />
              <div>
                <span className="text-sm font-semibold text-gray-800">
                  S - Systolic BP {'< 90 mmHg'}
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Pressão arterial sistólica abaixo de 90 mmHg no triagem
                </p>
              </div>
            </label>
          </div>

          {/* Result */}
          <div className={`${result.bgColor} rounded-xl p-6`}>
            <div className="text-center mb-4">
              <div className={`text-2xl font-bold ${result.color} mb-2`}>
                {result.risk}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Evento adverso em 7 dias:</span>
                <span className="font-bold text-gray-800">{result.adverseEvent}</span>
              </div>

              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-1">Recomendação:</p>
                <p className="text-sm text-gray-600">{result.recommendation}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Eventos adversos graves incluem:</strong> morte, IAM, arritmia,
              embolia pulmonar, AVC, hemorragia subaracnóidea, hemorragia significativa,
              ou qualquer condição que resulte em retorno ao ED e hospitalização em 7 dias.
            </p>
            <p className="text-xs text-gray-600">
              <strong>Nota:</strong> Sensibilidade de 98% para eventos adversos graves em 7 dias.
              Qualquer critério positivo = alto risco.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanFranciscoSyncope;
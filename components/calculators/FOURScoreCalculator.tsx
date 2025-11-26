import React from 'react';
import { ArrowLeft, Brain } from 'lucide-react';
import { AppView } from '../../types';

interface FOURScoreCalculatorProps {
  onNavigate: (view: AppView) => void;
}

const FOURScoreCalculator: React.FC<FOURScoreCalculatorProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Brain className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">FOUR Score</h1>
              <p className="text-sm text-gray-600">Avaliação de Coma</p>
            </div>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl text-center">
            <p className="text-gray-600">Calculadora em desenvolvimento</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FOURScoreCalculator;
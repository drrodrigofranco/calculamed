import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { AppView } from '../../types';

interface EdinburghPNDCalculatorProps {
  onNavigate: (view: AppView) => void;
}

const EdinburghPNDCalculator: React.FC<EdinburghPNDCalculatorProps> = ({ onNavigate }) => {
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

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Heart className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Edinburgh PND</h1>
              <p className="text-sm text-gray-600">Depressão Pós-Parto</p>
            </div>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl text-center">
            <p className="text-gray-600">Calculadora em desenvolvimento</p>
            <p className="text-sm text-gray-500 mt-2">Implementação completa em breve</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdinburghPNDCalculator;
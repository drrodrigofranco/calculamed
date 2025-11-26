import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { AppView } from '../../types';

interface TIMISTEMICalculatorProps {
  onNavigate: (view: AppView) => void;
}

const TIMISTEMICalculator: React.FC<TIMISTEMICalculatorProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="mb-6 flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">TIMI STEMI</h1>
              <p className="text-sm text-gray-600">Mortalidade no IAM</p>
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

export default TIMISTEMICalculator;
import React from 'react';
import { AppleIcon } from './icons';

const NutritionManager: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <AppleIcon className="w-8 h-8 text-medical-600" />
                    Nutrition Calc
                </h2>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-medical-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AppleIcon className="w-8 h-8 text-medical-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Módulo de Nutrição Avançada</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                    Aguardando ferramentas específicas de cálculo nutricional. 
                    Este ambiente está pronto para expansão.
                </p>
            </div>
        </div>
    );
};

export default NutritionManager;
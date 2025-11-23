import React, { useState } from 'react';
import { AppleIcon, ScaleIcon, DumbbellIcon, ChevronLeftIcon, FlameIcon, DropIcon } from './icons';

type Goal = 'loss' | 'gain' | null;

interface MacroResult {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water: number;
}

const NutritionManager: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [goal, setGoal] = useState<Goal>(null);
  const [macros, setMacros] = useState<MacroResult | null>(null);

  const calculateInitialData = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    // Calc BMI
    const heightInMeters = h / 100;
    const bmiValue = w / (heightInMeters * heightInMeters);
    setBmi(bmiValue);
    setGoal(null); // Reset goal if recalculated
    setMacros(null);
  };

  const selectGoal = (selectedGoal: Goal) => {
    const w = parseFloat(weight);
    if (isNaN(w)) return;

    setGoal(selectedGoal);

    // Estimativa Simplificada de Gasto Energético (Rule of Thumb)
    // Manutenção média ~30kcal/kg
    let targetCalories = 0;
    let protein = 0;
    let fats = 0;
    let carbs = 0;

    if (selectedGoal === 'loss') {
        // Déficit Calórico
        // Meta: ~20-25 kcal/kg
        targetCalories = w * 24; 
        
        // Macros Perda de Peso (Proteína Alta para segurar massa)
        protein = w * 2.0; // 2g/kg
        fats = w * 0.8;    // 0.8g/kg
    } else {
        // Superávit Calórico
        // Meta: ~30-35 kcal/kg
        targetCalories = w * 34;

        // Macros Hipertrofia
        protein = w * 2.2; // 2.2g/kg
        fats = w * 1.0;    // 1g/kg
    }

    // Carbs fill the rest of calories
    // 1g Prot = 4kcal, 1g Fat = 9kcal, 1g Carb = 4kcal
    const caloriesFromProtAndFat = (protein * 4) + (fats * 9);
    const remainingCalories = targetCalories - caloriesFromProtAndFat;
    carbs = remainingCalories / 4;

    // Water: 35ml to 50ml per kg
    const water = (w * 40) / 1000;

    setMacros({
        calories: Math.round(targetCalories),
        protein: Math.round(protein),
        fats: Math.round(fats),
        carbs: Math.round(carbs),
        water: parseFloat(water.toFixed(1))
    });
  };

  const getBMIClassification = (val: number) => {
      // Escala OMS (WHO)
      if (val < 18.5) return { label: 'Abaixo do Peso', color: 'text-yellow-600', bg: 'bg-yellow-100' };
      if (val < 25) return { label: 'Peso Normal', color: 'text-green-600', bg: 'bg-green-100' };
      if (val < 30) return { label: 'Sobrepeso', color: 'text-orange-500', bg: 'bg-orange-100' };
      if (val < 35) return { label: 'Obesidade Grau I', color: 'text-red-500', bg: 'bg-red-100' };
      if (val < 40) return { label: 'Obesidade Grau II', color: 'text-red-600', bg: 'bg-red-200' };
      return { label: 'Obesidade Grau III', color: 'text-red-700', bg: 'bg-red-300' };
  };

  return (
    <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <AppleIcon className="w-8 h-8 text-medical-600" />
                Nutrition Calc
            </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
            {/* Left Column: Inputs */}
            <div className="md:col-span-5 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Seus Dados</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Peso (kg)</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                                placeholder="Ex: 75"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Altura (cm)</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400"
                                placeholder="Ex: 175"
                            />
                        </div>
                        <button 
                            onClick={calculateInitialData}
                            className="w-full bg-medical-600 hover:bg-medical-700 text-white font-bold py-3 rounded-lg transition"
                        >
                            Calcular
                        </button>
                    </div>
                </div>

                {bmi !== null && (
                    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg animate-fade-in">
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Seu IMC Atual</p>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold">{bmi.toFixed(1)}</span>
                            <span className="text-sm mb-1 text-slate-400">kg/m²</span>
                        </div>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getBMIClassification(bmi).bg} ${getBMIClassification(bmi).color}`}>
                            {getBMIClassification(bmi).label}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column: Goals & Results */}
            <div className="md:col-span-7">
                {!bmi ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-8">
                        <ScaleIcon className="w-12 h-12 mb-3 opacity-50" />
                        <p>Preencha seus dados ao lado para começar.</p>
                    </div>
                ) : (
                    <div className="space-y-6 animate-fade-in">
                        {/* Goal Selector */}
                        <div>
                            <h3 className="font-bold text-slate-800 mb-3">Qual é o seu objetivo?</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => selectGoal('loss')}
                                    className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-2 ${goal === 'loss' ? 'border-medical-600 bg-medical-50 text-medical-800' : 'border-slate-200 bg-white text-slate-600 hover:border-medical-300'}`}
                                >
                                    <FlameIcon className="w-6 h-6" />
                                    <span className="font-bold">Perda de Peso</span>
                                </button>
                                <button
                                    onClick={() => selectGoal('gain')}
                                    className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-2 ${goal === 'gain' ? 'border-medical-600 bg-medical-50 text-medical-800' : 'border-slate-200 bg-white text-slate-600 hover:border-medical-300'}`}
                                >
                                    <DumbbellIcon className="w-6 h-6" />
                                    <span className="font-bold">Ganhar Massa</span>
                                </button>
                            </div>
                        </div>

                        {/* Results */}
                        {macros && (
                            <div className="space-y-6">
                                {/* Macro Cards */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                                        <p className="text-xs text-blue-600 font-bold uppercase">Calorias</p>
                                        <p className="text-xl font-bold text-blue-900">{macros.calories}</p>
                                        <p className="text-[10px] text-blue-400">kcal/dia</p>
                                    </div>
                                    <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                                        <p className="text-xs text-red-600 font-bold uppercase">Proteínas</p>
                                        <p className="text-xl font-bold text-red-900">{macros.protein}g</p>
                                        <p className="text-[10px] text-red-400">{goal === 'gain' ? '2.2g/kg' : '2.0g/kg'}</p>
                                    </div>
                                    <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                                        <p className="text-xs text-orange-600 font-bold uppercase">Carboidratos</p>
                                        <p className="text-xl font-bold text-orange-900">{macros.carbs}g</p>
                                        <p className="text-[10px] text-orange-400">Energia</p>
                                    </div>
                                    <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                                        <p className="text-xs text-yellow-600 font-bold uppercase">Gorduras</p>
                                        <p className="text-xl font-bold text-yellow-900">{macros.fats}g</p>
                                        <p className="text-[10px] text-yellow-400">{goal === 'gain' ? '1.0g/kg' : '0.8g/kg'}</p>
                                    </div>
                                </div>

                                {/* Water Recommendation */}
                                <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100 flex items-center gap-4">
                                    <div className="bg-cyan-100 p-2 rounded-full">
                                        <DropIcon className="w-5 h-5 text-cyan-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-cyan-900">Hidratação Recomendada</p>
                                        <p className="text-sm text-cyan-700">Beba aproximadamente <strong>{macros.water} Litros</strong> de água por dia.</p>
                                    </div>
                                </div>

                                {/* Food Recommendations */}
                                <div className="bg-white p-5 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <AppleIcon className="w-5 h-5 text-medical-600" />
                                        Sugestão de Distribuição (Fontes)
                                    </h4>
                                    
                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <p className="font-bold text-red-700 mb-1">Proteínas ({Math.round(macros.protein / 4)}g por refeição em 4 refs)</p>
                                            <ul className="list-disc pl-5 text-slate-600 space-y-1">
                                                <li>Filé de Frango (100g = 30g proteína)</li>
                                                <li>Ovos Cozidos (1 unid = 6g proteína)</li>
                                                <li>Carne Patinho Moído (100g = 32g proteína)</li>
                                                <li>Whey Protein (1 scoop = 24g proteína)</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <p className="font-bold text-orange-700 mb-1">Carboidratos (Energia)</p>
                                            <ul className="list-disc pl-5 text-slate-600 space-y-1">
                                                <li>Arroz Branco/Integral (100g cozido = 28g carbo)</li>
                                                <li>Batata Doce (100g = 20g carbo)</li>
                                                <li>Aveia (30g = 17g carbo)</li>
                                                <li>Banana Prata (1 unid = 15g carbo)</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <p className="font-bold text-yellow-700 mb-1">Gorduras Boas</p>
                                            <ul className="list-disc pl-5 text-slate-600 space-y-1">
                                                <li>Azeite de Oliva (1 col. sopa = 12g gordura)</li>
                                                <li>Abacate (100g = 15g gordura)</li>
                                                <li>Castanhas/Nozes (30g = 15g gordura)</li>
                                                <li>Pasta de Amendoim</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default NutritionManager;
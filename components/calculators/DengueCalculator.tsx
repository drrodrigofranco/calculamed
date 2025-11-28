import React, { useState } from 'react';
import { ArrowLeft, Droplet, AlertTriangle } from 'lucide-react';
import { AppView } from '../../types';

interface DengueCalculatorProps { onNavigate: (view: AppView) => void; }

const DengueCalculator: React.FC<DengueCalculatorProps> = ({ onNavigate }) => {
  const [weight, setWeight] = useState<string>('');
  const [group, setGroup] = useState<string>('A');

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w) return null;

    if (group === 'A') {
      const total = w * 60;
      return { total, oral: total, iv: 0, msg: "Hidratação oral: 1/3 SRO + 2/3 líquidos caseiros." };
    }
    if (group === 'B') {
      const total = w * 80;
      return { total, oral: total, iv: 0, msg: "Hidratação oral supervisionada. 1/3 do total em 4h." };
    }
    if (group === 'C') {
      const phase1 = w * 10; // 10ml/kg/h
      return { total: 0, oral: 0, iv: phase1, msg: "Fase de Expansão: Soro Fisiológico ou Ringer Lactato em 1 hora." };
    }
    if (group === 'D') {
      const phase1 = w * 20; // 20ml/kg em 20min
      return { total: 0, oral: 0, iv: phase1, msg: "CHOQUE: Expansão rápida em 20 min. Repetir até 3x se necessário." };
    }
    return null;
  };

  const res = calculate();

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Droplet className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Hidratação Dengue</h2>
      </div>
      
      <div className="space-y-4">
        <input 
          type="number" 
          value={weight} 
          onChange={e => setWeight(e.target.value)} 
          placeholder="Peso (kg)" 
          className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
        />
        
        <div className="grid grid-cols-2 gap-2">
          {['A', 'B', 'C', 'D'].map(g => (
            <button 
              key={g}
              onClick={() => setGroup(g)}
              className={`p-3 rounded-lg font-bold ${group === g ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'}`}
            >
              Grupo {g}
            </button>
          ))}
        </div>

        {res && (
          <div className={`p-4 rounded-lg ${group === 'C' || group === 'D' ? 'bg-red-100 text-red-900' : 'bg-blue-50 text-blue-900'}`}>
            {res.oral > 0 && <p className="text-2xl font-bold">{Math.round(res.oral)} mL/dia</p>}
            {res.iv > 0 && <p className="text-2xl font-bold">{Math.round(res.iv)} mL (Imediato)</p>}
            <p className="mt-2 text-sm">{res.msg}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default DengueCalculator;
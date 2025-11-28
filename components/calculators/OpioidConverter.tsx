import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const factors: Record<string, number> = {
  'morfina_oral': 1,
  'morfina_iv': 3,
  'codeina': 0.15,
  'tramadol': 0.1,
  'oxicodona': 1.5,
  'metadona': 4 // Simplificado, metadona é complexa
};

const OpioidConverter: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('morfina_oral');
  const [to, setTo] = useState('morfina_iv');

  const result = parseFloat(amount) * (factors[from] || 0) / (factors[to] || 1);

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Conversor de Opioides</h2>
      <div className="flex items-center gap-2 mb-4">
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="border p-2 rounded w-24" placeholder="Dose" />
        <select value={from} onChange={e => setFrom(e.target.value)} className="border p-2 rounded">
            <option value="morfina_oral">Morfina VO</option>
            <option value="morfina_iv">Morfina IV</option>
            <option value="tramadol">Tramadol</option>
            <option value="codeina">Codeína</option>
        </select>
      </div>
      <div className="flex justify-center my-2"><ArrowRight /></div>
      <div className="flex items-center gap-2 mb-6">
         <div className="text-2xl font-bold text-blue-600">{isNaN(result) ? 0 : result.toFixed(1)}</div>
         <select value={to} onChange={e => setTo(e.target.value)} className="border p-2 rounded">
            <option value="morfina_oral">Morfina VO</option>
            <option value="morfina_iv">Morfina IV</option>
            <option value="tramadol">Tramadol</option>
         </select>
      </div>
      <p className="text-xs text-red-500">Atenção: Cálculo de equianalgesia teórica. Reduzir 25-50% por segurança na troca (tolerância cruzada incompleta).</p>
    </div>
  );
};
export default OpioidConverter;
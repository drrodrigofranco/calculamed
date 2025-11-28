import React, { useState } from 'react';
const TargetHeightCalculator: React.FC = () => {
    const [father, setFather] = useState('');
    const [mother, setMother] = useState('');
    const [gender, setGender] = useState('male');

    const calc = () => {
        const f = parseFloat(father);
        const m = parseFloat(mother);
        if(!f || !m) return 0;
        return gender === 'male' ? (f + m + 13)/2 : (f + m - 13)/2;
    };
    
    const res = calc();

    return (
        <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Estatura Alvo</h2>
            <div className="space-y-3">
                <select value={gender} onChange={e=>setGender(e.target.value)} className="w-full p-2 border rounded">
                    <option value="male">Menino</option>
                    <option value="female">Menina</option>
                </select>
                <input type="number" value={father} onChange={e=>setFather(e.target.value)} placeholder="Altura Pai (cm)" className="w-full p-2 border rounded" />
                <input type="number" value={mother} onChange={e=>setMother(e.target.value)} placeholder="Altura Mãe (cm)" className="w-full p-2 border rounded" />
                
                {res > 0 && (
                    <div className="mt-4 p-4 bg-green-50 rounded text-center">
                        <p className="font-bold text-2xl text-green-700">{res.toFixed(0)} cm</p>
                        <p className="text-xs text-green-600">Faixa alvo: {(res-5).toFixed(0)} a {(res+5).toFixed(0)} cm</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default TargetHeightCalculator;
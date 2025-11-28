import React, { useState } from 'react';
const InsulinSlidingScale: React.FC = () => {
    const [gl, setGl] = useState('');
    const [target, setTarget] = useState('140');
    const [sf, setSf] = useState('50'); // Fator de sensibilidade

    const dose = Math.max(0, (parseFloat(gl) - parseFloat(target)) / parseFloat(sf));

    return (
        <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Correção de Insulina</h2>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm">Glicemia Atual</label>
                    <input type="number" value={gl} onChange={e=>setGl(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-sm">Meta</label>
                        <input type="number" value={target} onChange={e=>setTarget(e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm">Fator Sensib.</label>
                        <input type="number" value={sf} onChange={e=>setSf(e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                </div>
                <div className="bg-blue-50 p-4 rounded text-center">
                    <p className="text-sm text-blue-800">Aplicar de Insulina Rápida:</p>
                    <p className="text-3xl font-bold text-blue-600">{dose ? Math.round(dose) : 0} UI</p>
                </div>
            </div>
        </div>
    );
};
export default InsulinSlidingScale;
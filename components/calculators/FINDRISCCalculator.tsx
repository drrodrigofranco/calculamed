import React, { useState } from 'react';
import { AppView } from '../../types';

const FINDRISCCalculator: React.FC = () => {
  const [score, setScore] = useState(0);
  // Simplificação para brevidade - Idealmente seria um form completo
  return (
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold">FINDRISC</h3>
      <p>Calculadora de risco de Diabetes em desenvolvimento.</p>
    </div>
  );
};
export default FINDRISCCalculator;
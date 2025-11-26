#!/usr/bin/env python3
"""
Generate Batch 5 Calculators - Emergency/Trauma (Priority)
- HEART Score
- PECARN
- Canadian C-Spine Rule
- ISS (Injury Severity Score)
- San Francisco Syncope Rule
"""

import os

# Batch 5 Calculator Definitions
BATCH_5_CALCULATORS = {
    'HEART': {
        'name': 'HEARTCalculator',
        'title': 'HEART Score',
        'description': 'Risco de Síndrome Coronariana Aguda',
        'component': '''import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { AppView } from '../../types';

interface HEARTCalculatorProps {
  onNavigate: (view: AppView) => void;
}

const HEARTCalculator: React.FC<HEARTCalculatorProps> = ({ onNavigate }) => {
  const [history, setHistory] = useState<number>(0);
  const [ecg, setEcg] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [riskFactors, setRiskFactors] = useState<number>(0);
  const [troponin, setTroponin] = useState<number>(0);

  const calculateHEART = () => {
    const total = history + ecg + age + riskFactors + troponin;
    
    let risk = '';
    let mace = '';
    let recommendation = '';
    
    if (total <= 3) {
      risk = 'Baixo Risco';
      mace = '1.7%';
      recommendation = 'Considerar alta com seguimento ambulatorial';
    } else if (total <= 6) {
      risk = 'Risco Moderado';
      mace = '16.6%';
      recommendation = 'Observação e investigação adicional';
    } else {
      risk = 'Alto Risco';
      mace = '50.1%';
      recommendation = 'Internação e tratamento agressivo';
    }
    
    return { total, risk, mace, recommendation };
  };

  const result = calculateHEART();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="mb-6 flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Heart className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">HEART Score</h1>
              <p className="text-sm text-gray-600">Risco de Síndrome Coronariana Aguda</p>
            </div>
          </div>

          {/* History */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              História (History)
            </label>
            <select
              value={history}
              onChange={(e) => setHistory(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
            >
              <option value={0}>Levemente suspeita (0 pts)</option>
              <option value={1}>Moderadamente suspeita (1 pt)</option>
              <option value={2}>Altamente suspeita (2 pts)</option>
            </select>
          </div>

          {/* ECG */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ECG
            </label>
            <select
              value={ecg}
              onChange={(e) => setEcg(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
            >
              <option value={0}>Normal (0 pts)</option>
              <option value={1}>Alterações inespecíficas (1 pt)</option>
              <option value={2}>Alterações significativas (2 pts)</option>
            </select>
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Idade
            </label>
            <select
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
            >
              <option value={0}>{'< 45 anos (0 pts)'}</option>
              <option value={1}>45-64 anos (1 pt)</option>
              <option value={2}>{'≥ 65 anos (2 pts)'}</option>
            </select>
          </div>

          {/* Risk Factors */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fatores de Risco
            </label>
            <select
              value={riskFactors}
              onChange={(e) => setRiskFactors(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
            >
              <option value={0}>Nenhum fator (0 pts)</option>
              <option value={1}>1-2 fatores (1 pt)</option>
              <option value={2}>≥ 3 fatores ou história de DAC (2 pts)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Fatores: HAS, DM, tabagismo, dislipidemia, obesidade, história familiar
            </p>
          </div>

          {/* Troponin */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Troponina
            </label>
            <select
              value={troponin}
              onChange={(e) => setTroponin(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
            >
              <option value={0}>Normal (0 pts)</option>
              <option value={1}>1-3x limite superior (1 pt)</option>
              <option value={2}>{'>3x limite superior (2 pts)'}</option>
            </select>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-red-600 mb-2">
                {result.total}
              </div>
              <div className="text-sm text-gray-600">pontos</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Classificação:</span>
                <span className={`font-bold ${
                  result.total <= 3 ? 'text-green-600' :
                  result.total <= 6 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {result.risk}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">MACE em 6 semanas:</span>
                <span className="font-bold text-gray-800">{result.mace}</span>
              </div>

              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-1">Recomendação:</p>
                <p className="text-sm text-gray-600">{result.recommendation}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-gray-600">
              <strong>Nota:</strong> MACE = Major Adverse Cardiac Events (morte, IAM, revascularização).
              O HEART Score auxilia na estratificação de risco em pacientes com dor torácica no departamento de emergência.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HEARTCalculator;'''
    },
    
    'PECARN': {
        'name': 'PECARNCalculator',
        'title': 'PECARN',
        'description': 'Trauma Craniano Pediátrico',
        'component': '''import React, { useState } from 'react';
import { ArrowLeft, Baby } from 'lucide-react';
import { AppView } from '../../types';

interface PECARNCalculatorProps {
  onNavigate: (view: AppView) => void;
}

const PECARNCalculator: React.FC<PECARNCalculatorProps> = ({ onNavigate }) => {
  const [ageGroup, setAgeGroup] = useState<'under2' | 'over2'>('over2');
  
  // For children < 2 years
  const [gcsUnder2, setGcsUnder2] = useState<boolean>(false);
  const [alteredMental, setAlteredMental] = useState<boolean>(false);
  const [skullFracture, setSkullFracture] = useState<boolean>(false);
  const [locOver5s, setLocOver5s] = useState<boolean>(false);
  const [notActingNormal, setNotActingNormal] = useState<boolean>(false);
  const [severeMechanism, setSevereMechanism] = useState<boolean>(false);

  // For children ≥ 2 years
  const [gcsOver2, setGcsOver2] = useState<boolean>(false);
  const [alteredMentalOver2, setAlteredMentalOver2] = useState<boolean>(false);
  const [basilarFracture, setBasilarFracture] = useState<boolean>(false);
  const [locAny, setLocAny] = useState<boolean>(false);
  const [vomiting, setVomiting] = useState<boolean>(false);
  const [severeMechanismOver2, setSevereMechanismOver2] = useState<boolean>(false);
  const [severeHeadache, setSevereHeadache] = useState<boolean>(false);

  const calculatePECARN = () => {
    if (ageGroup === 'under2') {
      // High risk criteria
      if (gcsUnder2 || alteredMental || skullFracture) {
        return {
          risk: 'Alto Risco',
          recommendation: 'TC de crânio indicada',
          ciTBI: '> 4%',
          color: 'text-red-600'
        };
      }
      
      // Intermediate risk
      if (locOver5s || notActingNormal || severeMechanism) {
        return {
          risk: 'Risco Intermediário',
          recommendation: 'Considerar TC vs observação',
          ciTBI: '0.9%',
          color: 'text-yellow-600'
        };
      }
      
      // Low risk
      return {
        risk: 'Risco Muito Baixo',
        recommendation: 'TC não indicada',
        ciTBI: '< 0.02%',
        color: 'text-green-600'
      };
    } else {
      // ≥ 2 years
      // High risk
      if (gcsOver2 || alteredMentalOver2 || basilarFracture) {
        return {
          risk: 'Alto Risco',
          recommendation: 'TC de crânio indicada',
          ciTBI: '> 4%',
          color: 'text-red-600'
        };
      }
      
      // Intermediate risk
      if (locAny || vomiting || severeMechanismOver2 || severeHeadache) {
        return {
          risk: 'Risco Intermediário',
          recommendation: 'Considerar TC vs observação',
          ciTBI: '0.9%',
          color: 'text-yellow-600'
        };
      }
      
      // Low risk
      return {
        risk: 'Risco Muito Baixo',
        recommendation: 'TC não indicada',
        ciTBI: '< 0.05%',
        color: 'text-green-600'
      };
    }
  };

  const result = calculatePECARN();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Baby className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">PECARN</h1>
              <p className="text-sm text-gray-600">Trauma Craniano Pediátrico</p>
            </div>
          </div>

          {/* Age Group Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Faixa Etária
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setAgeGroup('under2')}
                className={`p-3 rounded-xl font-semibold transition-all ${
                  ageGroup === 'under2'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {'< 2 anos'}
              </button>
              <button
                onClick={() => setAgeGroup('over2')}
                className={`p-3 rounded-xl font-semibold transition-all ${
                  ageGroup === 'over2'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {'≥ 2 anos'}
              </button>
            </div>
          </div>

          {/* Criteria for < 2 years */}
          {ageGroup === 'under2' && (
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-sm font-semibold text-red-800 mb-3">Critérios de Alto Risco:</p>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={gcsUnder2}
                    onChange={(e) => setGcsUnder2(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">GCS {'< 15'}</span>
                </label>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={alteredMental}
                    onChange={(e) => setAlteredMental(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Estado mental alterado</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={skullFracture}
                    onChange={(e) => setSkullFracture(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Fratura de crânio palpável</span>
                </label>
              </div>

              <div className="p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm font-semibold text-yellow-800 mb-3">Critérios de Risco Intermediário:</p>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={locOver5s}
                    onChange={(e) => setLocOver5s(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Perda de consciência {'> 5s'}</span>
                </label>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={notActingNormal}
                    onChange={(e) => setNotActingNormal(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Não agindo normalmente (segundo pais)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={severeMechanism}
                    onChange={(e) => setSevereMechanism(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Mecanismo grave</span>
                </label>
              </div>
            </div>
          )}

          {/* Criteria for ≥ 2 years */}
          {ageGroup === 'over2' && (
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-sm font-semibold text-red-800 mb-3">Critérios de Alto Risco:</p>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={gcsOver2}
                    onChange={(e) => setGcsOver2(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">GCS {'< 15'}</span>
                </label>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={alteredMentalOver2}
                    onChange={(e) => setAlteredMentalOver2(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Estado mental alterado</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={basilarFracture}
                    onChange={(e) => setBasilarFracture(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Sinais de fratura de base de crânio</span>
                </label>
              </div>

              <div className="p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm font-semibold text-yellow-800 mb-3">Critérios de Risco Intermediário:</p>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={locAny}
                    onChange={(e) => setLocAny(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Qualquer perda de consciência</span>
                </label>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={vomiting}
                    onChange={(e) => setVomiting(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Vômitos</span>
                </label>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={severeMechanismOver2}
                    onChange={(e) => setSevereMechanismOver2(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Mecanismo grave</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={severeHeadache}
                    onChange={(e) => setSevereHeadache(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">Cefaleia grave</span>
                </label>
              </div>
            </div>
          )}

          {/* Result */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Risco:</span>
                <span className={`font-bold ${result.color}`}>
                  {result.risk}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">ciTBI:</span>
                <span className="font-bold text-gray-800">{result.ciTBI}</span>
              </div>

              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-1">Recomendação:</p>
                <p className="text-sm text-gray-600">{result.recommendation}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-gray-600">
              <strong>Nota:</strong> ciTBI = clinically important traumatic brain injury.
              Mecanismo grave inclui: acidente automobilístico com ejeção, morte de passageiro,
              capotamento; pedestre/ciclista sem capacete atropelado; queda {'> 0.9m (< 2 anos)'} ou {'> 1.5m (≥ 2 anos)'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PECARNCalculator;'''
    },

    'CANADIAN_CSPINE': {
        'name': 'CanadianCSpineCalculator',
        'title': 'Canadian C-Spine Rule',
        'description': 'Necessidade de RX Cervical',
        'component': '''import React, { useState } from 'react';
import { ArrowLeft, Bone } from 'lucide-react';
import { AppView } from '../../types';

interface CanadianCSpineCalculatorProps {
  onNavigate: (view: AppView) => void;
}

const CanadianCSpineCalculator: React.FC<CanadianCSpineCalculatorProps> = ({ onNavigate }) => {
  // High-risk factors
  const [age65, setAge65] = useState<boolean>(false);
  const [dangerousMechanism, setDangerousMechanism] = useState<boolean>(false);
  const [extremityParesthesias, setExtremityParesthesias] = useState<boolean>(false);

  // Low-risk factors
  const [simpleRearEnd, setSimpleRearEnd] = useState<boolean>(false);
  const [sitting, setSitting] = useState<boolean>(false);
  const [ambulatory, setAmbulatory] = useState<boolean>(false);
  const [delayedOnset, setDelayedOnset] = useState<boolean>(false);
  const [noMidlineTenderness, setNoMidlineTenderness] = useState<boolean>(false);

  // Ability to rotate
  const [canRotate, setCanRotate] = useState<boolean | null>(null);

  const calculateCSpine = () => {
    // Step 1: Any high-risk factor?
    if (age65 || dangerousMechanism || extremityParesthesias) {
      return {
        result: 'Radiografia INDICADA',
        reason: 'Presença de fator de alto risco',
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    }

    // Step 2: Any low-risk factor allowing assessment?
    const hasLowRiskFactor = simpleRearEnd || sitting || ambulatory || delayedOnset || noMidlineTenderness;
    
    if (!hasLowRiskFactor) {
      return {
        result: 'Radiografia INDICADA',
        reason: 'Ausência de fatores de baixo risco',
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    }

    // Step 3: Can rotate neck 45° left and right?
    if (canRotate === null) {
      return {
        result: 'Avaliar rotação cervical',
        reason: 'Paciente pode rotacionar ativamente o pescoço 45° para cada lado?',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      };
    }

    if (!canRotate) {
      return {
        result: 'Radiografia INDICADA',
        reason: 'Incapaz de rotacionar pescoço 45°',
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    }

    return {
      result: 'Radiografia NÃO INDICADA',
      reason: 'Baixo risco de lesão cervical',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    };
  };

  const result = calculateCSpine();

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

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Bone className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Canadian C-Spine Rule</h1>
              <p className="text-sm text-gray-600">Necessidade de Radiografia Cervical</p>
            </div>
          </div>

          {/* High-Risk Factors */}
          <div className="mb-6 p-4 bg-red-50 rounded-xl">
            <p className="text-sm font-semibold text-red-800 mb-3">
              1. Fatores de ALTO RISCO (qualquer um indica radiografia):
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={age65}
                  onChange={(e) => setAge65(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Idade ≥ 65 anos</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={dangerousMechanism}
                  onChange={(e) => setDangerousMechanism(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Mecanismo perigoso</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={extremityParesthesias}
                  onChange={(e) => setExtremityParesthesias(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Parestesias em extremidades</span>
              </label>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Mecanismo perigoso: queda ≥ 1m ou 5 degraus, carga axial, acidente de alta velocidade,
              capotamento, ejeção, acidente com bicicleta
            </p>
          </div>

          {/* Low-Risk Factors */}
          <div className="mb-6 p-4 bg-green-50 rounded-xl">
            <p className="text-sm font-semibold text-green-800 mb-3">
              2. Fatores de BAIXO RISCO (permitem avaliação da amplitude de movimento):
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={simpleRearEnd}
                  onChange={(e) => setSimpleRearEnd(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Colisão traseira simples</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={sitting}
                  onChange={(e) => setSitting(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Sentado no departamento de emergência</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={ambulatory}
                  onChange={(e) => setAmbulatory(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Deambulou a qualquer momento</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={delayedOnset}
                  onChange={(e) => setDelayedOnset(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Início tardio da dor cervical</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={noMidlineTenderness}
                  onChange={(e) => setNoMidlineTenderness(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Ausência de dor à palpação da linha média</span>
              </label>
            </div>
          </div>

          {/* Rotation Assessment */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm font-semibold text-blue-800 mb-3">
              3. Capaz de rotacionar ativamente o pescoço 45° para esquerda E direita?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCanRotate(true)}
                className={`p-3 rounded-xl font-semibold transition-all ${
                  canRotate === true
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sim
              </button>
              <button
                onClick={() => setCanRotate(false)}
                className={`p-3 rounded-xl font-semibold transition-all ${
                  canRotate === false
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Não
              </button>
            </div>
          </div>

          {/* Result */}
          <div className={`${result.bgColor} rounded-xl p-6`}>
            <div className="text-center mb-4">
              <div className={`text-2xl font-bold ${result.color} mb-2`}>
                {result.result}
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-1">Justificativa:</p>
              <p className="text-sm text-gray-600">{result.reason}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
            <p className="text-xs text-gray-600">
              <strong>Critérios de Exclusão:</strong> Idade {'< 16 anos'}, trauma penetrante,
              instabilidade hemodinâmica, GCS {'< 15'}, lesão vertebral conhecida, paralisia aguda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanadianCSpineCalculator;'''
    },

    'ISS': {
        'name': 'ISSCalculator',
        'title': 'ISS',
        'description': 'Injury Severity Score',
        'component': '''import React, { useState } from 'react';
import { ArrowLeft, Activity } from 'lucide-react';
import { AppView } from '../../types';

interface ISSCalculatorProps {
  onNavigate: (view: AppView) => void;
}

const ISSCalculator: React.FC<ISSCalculatorProps> = ({ onNavigate }) => {
  const [head, setHead] = useState<number>(0);
  const [face, setFace] = useState<number>(0);
  const [chest, setChest] = useState<number>(0);
  const [abdomen, setAbdomen] = useState<number>(0);
  const [extremities, setExtremities] = useState<number>(0);
  const [external, setExternal] = useState<number>(0);

  const calculateISS = () => {
    const scores = [head, face, chest, abdomen, extremities, external];
    
    // Check for AIS 6 (unsurvivable injury)
    if (scores.some(s => s === 6)) {
      return {
        iss: 75,
        severity: 'Crítico (Não Sobrevivível)',
        mortality: '> 90%',
        color: 'text-black'
      };
    }

    // Get three highest scores
    const sortedScores = [...scores].sort((a, b) => b - a);
    const top3 = sortedScores.slice(0, 3);
    
    // ISS = sum of squares of top 3
    const iss = top3.reduce((sum, score) => sum + (score * score), 0);

    let severity = '';
    let mortality = '';
    let color = '';

    if (iss < 9) {
      severity = 'Leve';
      mortality = '< 1%';
      color = 'text-green-600';
    } else if (iss < 16) {
      severity = 'Moderado';
      mortality = '1-5%';
      color = 'text-yellow-600';
    } else if (iss < 25) {
      severity = 'Grave';
      mortality = '5-15%';
      color = 'text-orange-600';
    } else {
      severity = 'Crítico';
      mortality = '> 15%';
      color = 'text-red-600';
    }

    return { iss, severity, mortality, color };
  };

  const result = calculateISS();

  const aisOptions = [
    { value: 0, label: '0 - Sem lesão' },
    { value: 1, label: '1 - Leve' },
    { value: 2, label: '2 - Moderada' },
    { value: 3, label: '3 - Grave' },
    { value: 4, label: '4 - Muito grave' },
    { value: 5, label: '5 - Crítica' },
    { value: 6, label: '6 - Não sobrevivível' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="mb-6 flex items-center gap-2 text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ISS</h1>
              <p className="text-sm text-gray-600">Injury Severity Score</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Selecione o maior escore AIS (Abbreviated Injury Scale) para cada região do corpo:
          </p>

          {/* Body Regions */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cabeça/Pescoço
              </label>
              <select
                value={head}
                onChange={(e) => setHead(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Face
              </label>
              <select
                value={face}
                onChange={(e) => setFace(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tórax
              </label>
              <select
                value={chest}
                onChange={(e) => setChest(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Abdome
              </label>
              <select
                value={abdomen}
                onChange={(e) => setAbdomen(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Extremidades/Pelve
              </label>
              <select
                value={extremities}
                onChange={(e) => setExtremities(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Externo
              </label>
              <select
                value={external}
                onChange={(e) => setExternal(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                {aisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-orange-600 mb-2">
                {result.iss}
              </div>
              <div className="text-sm text-gray-600">ISS</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Gravidade:</span>
                <span className={`font-bold ${result.color}`}>
                  {result.severity}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Mortalidade estimada:</span>
                <span className="font-bold text-gray-800">{result.mortality}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-gray-600">
              <strong>Nota:</strong> ISS é calculado somando os quadrados dos 3 maiores escores AIS
              de diferentes regiões do corpo. Qualquer escore AIS de 6 resulta automaticamente em ISS = 75.
              ISS {'≥ 16'} define politrauma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ISSCalculator;'''
    },

    'SF_SYNCOPE': {
        'name': 'SanFranciscoSyncope',
        'title': 'San Francisco Syncope Rule',
        'description': 'Risco em Síncope',
        'component': '''import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { AppView } from '../../types';

interface SanFranciscoSyncopeProps {
  onNavigate: (view: AppView) => void;
}

const SanFranciscoSyncope: React.FC<SanFranciscoSyncopeProps> = ({ onNavigate }) => {
  const [chf, setChf] = useState<boolean>(false);
  const [hematocrit, setHematocrit] = useState<boolean>(false);
  const [ecgAbnormal, setEcgAbnormal] = useState<boolean>(false);
  const [sob, setSob] = useState<boolean>(false);
  const [sbp, setSbp] = useState<boolean>(false);

  const calculateSyncope = () => {
    const isHighRisk = chf || hematocrit || ecgAbnormal || sob || sbp;

    if (isHighRisk) {
      return {
        risk: 'ALTO RISCO',
        recommendation: 'Admissão hospitalar indicada',
        adverseEvent: '5-7%',
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    }

    return {
      risk: 'BAIXO RISCO',
      recommendation: 'Considerar alta com seguimento ambulatorial',
      adverseEvent: '< 1%',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    };
  };

  const result = calculateSyncope();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Heart className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">San Francisco Syncope Rule</h1>
              <p className="text-sm text-gray-600">Estratificação de Risco em Síncope</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Marque os critérios presentes (mnemônico: <strong>CHESS</strong>):
          </p>

          {/* Criteria */}
          <div className="space-y-3 mb-6">
            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={chf}
                onChange={(e) => setChf(e.target.checked)}
                className="w-5 h-5 mt-0.5"
              />
              <div>
                <span className="text-sm font-semibold text-gray-800">
                  C - CHF (Insuficiência Cardíaca Congestiva)
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  História de insuficiência cardíaca congestiva
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={hematocrit}
                onChange={(e) => setHematocrit(e.target.checked)}
                className="w-5 h-5 mt-0.5"
              />
              <div>
                <span className="text-sm font-semibold text-gray-800">
                  H - Hematócrito {'< 30%'}
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Hematócrito abaixo de 30% na admissão
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={ecgAbnormal}
                onChange={(e) => setEcgAbnormal(e.target.checked)}
                className="w-5 h-5 mt-0.5"
              />
              <div>
                <span className="text-sm font-semibold text-gray-800">
                  E - ECG Anormal
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Qualquer alteração no ECG (exceto sinusal)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={sob}
                onChange={(e) => setSob(e.target.checked)}
                className="w-5 h-5 mt-0.5"
              />
              <div>
                <span className="text-sm font-semibold text-gray-800">
                  S - Shortness of breath (Dispneia)
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Queixa de falta de ar
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={sbp}
                onChange={(e) => setSbp(e.target.checked)}
                className="w-5 h-5 mt-0.5"
              />
              <div>
                <span className="text-sm font-semibold text-gray-800">
                  S - Systolic BP {'< 90 mmHg'}
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Pressão arterial sistólica abaixo de 90 mmHg no triagem
                </p>
              </div>
            </label>
          </div>

          {/* Result */}
          <div className={`${result.bgColor} rounded-xl p-6`}>
            <div className="text-center mb-4">
              <div className={`text-2xl font-bold ${result.color} mb-2`}>
                {result.risk}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Evento adverso em 7 dias:</span>
                <span className="font-bold text-gray-800">{result.adverseEvent}</span>
              </div>

              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-1">Recomendação:</p>
                <p className="text-sm text-gray-600">{result.recommendation}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Eventos adversos graves incluem:</strong> morte, IAM, arritmia,
              embolia pulmonar, AVC, hemorragia subaracnóidea, hemorragia significativa,
              ou qualquer condição que resulte em retorno ao ED e hospitalização em 7 dias.
            </p>
            <p className="text-xs text-gray-600">
              <strong>Nota:</strong> Sensibilidade de 98% para eventos adversos graves em 7 dias.
              Qualquer critério positivo = alto risco.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanFranciscoSyncope;'''
    }
}


def generate_batch5():
    """Generate all Batch 5 calculator files"""
    
    output_dir = 'components/calculators'
    os.makedirs(output_dir, exist_ok=True)
    
    print("🚀 Generating Batch 5 Calculators...")
    print("=" * 60)
    
    for calc_id, calc_data in BATCH_5_CALCULATORS.items():
        filename = f"{calc_data['name']}.tsx"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(calc_data['component'])
        
        print(f"✅ Created: {filename}")
        print(f"   Title: {calc_data['title']}")
        print(f"   Description: {calc_data['description']}")
        print()
    
    print("=" * 60)
    print(f"✅ SUCCESS! Generated {len(BATCH_5_CALCULATORS)} calculators")
    print()
    print("📋 Next steps:")
    print("1. Run update_types_batch5.py to add enums to types.ts")
    print("2. Run integrate_batch5.py to update App.tsx")
    print("3. Test all calculators")
    
    return True


if __name__ == '__main__':
    generate_batch5()

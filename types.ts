import React from 'react';

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CATEGORY_VIEW = 'CATEGORY_VIEW',
  // Nursing / General
  CALC_BMI = 'CALC_BMI',
  CALC_IDEAL_WEIGHT = 'CALC_IDEAL_WEIGHT',
  CALC_BSA = 'CALC_BSA',
  CALC_IV = 'CALC_IV',
  CALC_WATER = 'CALC_WATER',
  CALC_CONVERTER = 'CALC_CONVERTER',
  // Nephrology
  CALC_EGFR = 'CALC_EGFR',
  // Obstetrics
  CALC_PREGNANCY = 'CALC_PREGNANCY',
  // Cardiology
  CALC_LDL = 'CALC_LDL',
  CALC_MAP = 'CALC_MAP',
  CALC_QTC = 'CALC_QTC',
  // Neurology / Emergency
  CALC_GLASGOW = 'CALC_GLASGOW',
  CALC_ANION_GAP = 'CALC_ANION_GAP',
  CALC_PARKLAND = 'CALC_PARKLAND',
  CALC_VASOACTIVE = 'CALC_VASOACTIVE',
  // Pediatrics
  CALC_PED_FLUIDS = 'CALC_PED_FLUIDS',
  // Nutrition
  CALC_BMR = 'CALC_BMR',
  // Endocrinology
  CALC_CORR_CALCIUM = 'CALC_CORR_CALCIUM',
  CALC_GLUCOSE = 'CALC_GLUCOSE',
  CALC_SODIUM_CORR = 'CALC_SODIUM_CORR',
  // Gastro
  CALC_CHILD_PUGH = 'CALC_CHILD_PUGH',
  // Pneumology
  CALC_WELLS_PE = 'CALC_WELLS_PE',
  CALC_CURB65 = 'CALC_CURB65'
}

export interface NewsItem {
  title: string;
  category: string;
  summary: string;
  impact: string;
}

export interface CalculatorResult {
  value: number | string;
  classification?: string;
  notes?: string;
}

export type SpecialtyId = 'cardio' | 'nephro' | 'obs' | 'peds' | 'neuro' | 'nutrition' | 'nursing' | 'endo' | 'gastro' | 'pneumo' | 'emergency';

export interface CalculatorDef {
  id: AppView;
  name: string;
  description: string;
}

export interface SpecialtyDef {
  id: SpecialtyId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  calculators: CalculatorDef[];
}
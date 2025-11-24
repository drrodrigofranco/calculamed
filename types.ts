import React from 'react';

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CATEGORY_VIEW = 'CATEGORY_VIEW',
  PRO_LOGIN = 'PRO_LOGIN',
  NUTRITION_PRO = 'NUTRITION_PRO', 
  NEWS = 'NEWS',
  PATIENTS_LIST = 'PATIENTS_LIST',
  // Nursing / General
  CALC_BMI = 'CALC_BMI',
  CALC_IDEAL_WEIGHT = 'CALC_IDEAL_WEIGHT',
  CALC_BSA = 'CALC_BSA',
  CALC_IV = 'CALC_IV',
  CALC_WATER = 'CALC_WATER',
  CALC_CONVERTER = 'CALC_CONVERTER',
  CALC_DOSAGE = 'CALC_DOSAGE',
  // Nephrology
  CALC_EGFR = 'CALC_EGFR',
  CALC_COCKCROFT = 'CALC_COCKCROFT',
  // Obstetrics
  CALC_PREGNANCY = 'CALC_PREGNANCY',
  CALC_PREGNANCY_USG = 'CALC_PREGNANCY_USG',
  CALC_APGAR = 'CALC_APGAR',
  // Cardiology
  CALC_LDL = 'CALC_LDL',
  CALC_MAP = 'CALC_MAP',
  CALC_QTC = 'CALC_QTC',
  CALC_CHA2DS2_VASC = 'CALC_CHA2DS2_VASC',
  CALC_HAS_BLED = 'CALC_HAS_BLED',
  // Neurology / Emergency
  CALC_GLASGOW = 'CALC_GLASGOW',
  CALC_ANION_GAP = 'CALC_ANION_GAP',
  CALC_PARKLAND = 'CALC_PARC_PARKLANDLAND',
  CALC_BURN_AREA = 'CALC_BURN_AREA',
  CALC_VASOACTIVE = 'CALC_VASOACTIVE',
  CALC_SODIUM_CORR = 'CALC_SODIUM_CORR',
  // Pediatrics
  CALC_PED_FLUIDS = 'CALC_PED_FLUIDS',
  CALC_PEDIATRIC_DOSAGE = 'CALC_PEDIATRIC_DOSAGE',
  // Nutrition
  CALC_BMR = 'CALC_BMR',
  CALC_PROTEIN = 'CALC_PROTEIN',
  CALC_HR_TARGET = 'CALC_HR_TARGET',
  // Endocrinology
  CALC_CORR_CALCIUM = 'CALC_CORR_CALCIUM',
  CALC_GLUCOSE = 'CALC_GLUCOSE',
  // Gastro
  CALC_CHILD_PUGH = 'CALC_CHILD_PUGH',
  CALC_MELD = 'CALC_MELD',
  // Pneumology
  CALC_WELLS_PE = 'CALC_WELLS_PE',
  CALC_CURB65 = 'CALC_CURB65',
  CALC_PAO2_FIO2 = 'CALC_PAO2_FIO2',
  // Surgery
  CALC_ALVARADO = 'CALC_ALVARADO',
  // Hematology
  CALC_ANC = 'CALC_ANC',
  // Psychiatry
  CALC_PHQ9 = 'CALC_PHQ9'
}

export interface CalculatorResult {
  value: number | string;
  classification?: string;
  notes?: string;
}

export type SpecialtyId = 
  'cardio' | 'nutrition' | 'endo' | 'nephro' | 'obs' | 'peds' | 
  'emergency' | 'pneumo' | 'gastro' | 'hema' | 'neuro' | 'surgery' | 
  'nursing' | 'dental' | 'psych' | 'geriatrics' | 'ortho';

export interface CalculatorDef {
  id: AppView;
  name: string;
  description: string;
  isPro?: boolean; 
}

export interface SpecialtyDef {
  id: SpecialtyId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  calculators: CalculatorDef[];
}

export interface NewsItem {
  title: string;
  category: string;
  summary: string;
  impact: string;
}

export interface ClinicalNote {
  id: string;
  date: string; // ISO string
  content: string;
}

export interface Patient {
  id: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  contact?: string;
  gender?: string;
  notes: ClinicalNote[];
  createdAt: string;
}

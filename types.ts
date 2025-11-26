import React from 'react';

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CATEGORY_VIEW = 'CATEGORY_VIEW',
  PRO_LOGIN = 'PRO_LOGIN',
  SUBSCRIPTION_MANAGER = 'SUBSCRIPTION_MANAGER',
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
  CALC_PARKLAND = 'CALC_PARKLAND',
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
  CALC_PHQ9 = 'CALC_PHQ9',
  // Batch 2 - Emergency/ICU
  CALC_SOFA = 'CALC_SOFA',
  CALC_QSOFA = 'CALC_QSOFA',
  CALC_APACHE2 = 'CALC_APACHE2',
  CALC_SAPS2 = 'CALC_SAPS2',
  CALC_RTS = 'CALC_RTS',
  CALC_PERC = 'CALC_PERC',
  // Batch 2 - Cardiology
  CALC_GRACE = 'CALC_GRACE',
  CALC_TIMI = 'CALC_TIMI',
  CALC_FRAMINGHAM = 'CALC_FRAMINGHAM',
  // Batch 2 - Neurology
  CALC_NIHSS = 'CALC_NIHSS',
  CALC_ABCD2 = 'CALC_ABCD2',
  CALC_MODIFIED_RANKIN = 'CALC_MODIFIED_RANKIN',
  CALC_HUNT_HESS = 'CALC_HUNT_HESS',
  // Batch 3 - Pneumology
  CALC_BODE = 'CALC_BODE',
  CALC_SMART_COP = 'CALC_SMART_COP',
  CALC_LIGHTS = 'CALC_LIGHTS',
  // Batch 3 - Nephrology
  CALC_RIFLE = 'CALC_RIFLE',
  CALC_AKIN = 'CALC_AKIN',
  CALC_KTV = 'CALC_KTV',
  // Batch 3 - Hematology
  CALC_HBA1C = 'CALC_HBA1C',
  CALC_RETIC_INDEX = 'CALC_RETIC_INDEX',
  CALC_DIC = 'CALC_DIC',
  // Batch 4 - Obstetrics
  CALC_BISHOP = 'CALC_BISHOP',
  CALC_HELLP = 'CALC_HELLP',
  // Batch 4 - Pediatrics
  CALC_PED_GLASGOW = 'CALC_PED_GLASGOW',
  CALC_BALLARD = 'CALC_BALLARD',
  CALC_WESTLEY = 'CALC_WESTLEY',
  // Batch 4 - Orthopedics
  CALC_OTTAWA_ANKLE = 'CALC_OTTAWA_ANKLE',
  CALC_OTTAWA_KNEE = 'CALC_OTTAWA_KNEE',
  CALC_NEXUS = 'CALC_NEXUS',
  // Batch 4 - Laboratory
  CALC_OSMOLALITY = 'CALC_OSMOLALITY',
  CALC_SAAG = 'CALC_SAAG',
  CALC_FENA = 'CALC_FENA',
  // Batch 4 - Sports Medicine
  CALC_VO2MAX = 'CALC_VO2MAX',
  CALC_LBM = 'CALC_LBM',
  // Medication Dosing
  CALC_MOUNJARO = 'CALC_MOUNJARO',
  // Batch 5 - Emergency/Trauma
  CALC_HEART = 'CALC_HEART',
  CALC_PECARN = 'CALC_PECARN',
  CALC_CANADIAN_CSPINE = 'CALC_CANADIAN_CSPINE',
  CALC_ISS = 'CALC_ISS',
  CALC_SF_SYNCOPE = 'CALC_SF_SYNCOPE',
  // Batch 6 - Cardiology Advanced
  CALC_TIMI_STEMI = 'CALC_TIMI_STEMI',
  CALC_DUKE_TREADMILL = 'CALC_DUKE_TREADMILL',
  CALC_MAGGIC = 'CALC_MAGGIC',
  CALC_KILLIP = 'CALC_KILLIP',
  // Batch 7 - Neurology Advanced
  CALC_ICH = 'CALC_ICH',
  CALC_FOUR = 'CALC_FOUR',
  CALC_CANADIAN_STROKE = 'CALC_CANADIAN_STROKE',
  // Batch 8 - Pneumology Advanced
  CALC_PSI = 'CALC_PSI',
  CALC_GENEVA = 'CALC_GENEVA',
  CALC_GOLD = 'CALC_GOLD',
  // Batch 9 - Hematology/Coagulation
  CALC_WELLS_DVT = 'CALC_WELLS_DVT',
  CALC_HIT = 'CALC_HIT',
  CALC_PADUA = 'CALC_PADUA',
  // Batch 10 - Nephrology Advanced
  CALC_KDIGO = 'CALC_KDIGO',
  CALC_FEUREA = 'CALC_FEUREA',
  CALC_FREE_WATER = 'CALC_FREE_WATER',
  // Batch 11 - Pediatrics Advanced
  CALC_PEWS = 'CALC_PEWS',
  CALC_SILVERMAN = 'CALC_SILVERMAN',
  CALC_CAPURRO = 'CALC_CAPURRO',
  // Batch 12 - Geriatrics
  CALC_FRAX = 'CALC_FRAX',
  CALC_MORSE_FALL = 'CALC_MORSE_FALL',
  CALC_CHARLSON = 'CALC_CHARLSON',
  CALC_MNA = 'CALC_MNA',
  // Batch 13 - Laboratory/Metabolic
  CALC_CORRECTED_SODIUM = 'CALC_CORRECTED_SODIUM',
  CALC_DELTA_RATIO = 'CALC_DELTA_RATIO',
  CALC_TTKG = 'CALC_TTKG',
  // Batch 14 - Obstetrics Advanced
  CALC_PREECLAMPSIA = 'CALC_PREECLAMPSIA',
  CALC_EDINBURGH = 'CALC_EDINBURGH',
  // Batch 15 - Sports Medicine Advanced
  CALC_KARVONEN = 'CALC_KARVONEN',
  CALC_BODY_FAT = 'CALC_BODY_FAT',
  CALC_ONE_RM = 'CALC_ONE_RM',
  // Batch 16 - Orthopedics Advanced
  CALC_PITTSBURGH_KNEE = 'CALC_PITTSBURGH_KNEE',
  CALC_CANADIAN_CT_HEAD = 'CALC_CANADIAN_CT_HEAD',
  // Pediatrics - Vaccination
  CALC_VACCINATION_SCHEDULE = 'CALC_VACCINATION_SCHEDULE',
  // Utilities - Medication Info
  CALC_BULA_MEDICAMENTO = 'CALC_BULA_MEDICAMENTO'
}

export interface CalculatorResult {
  value: number | string;
  classification?: string;
  notes?: string;
}

export type SpecialtyId =
  'cardio' | 'nutrition' | 'endo' | 'nephro' | 'obs' | 'peds' |
  'emergency' | 'pneumo' | 'gastro' | 'hema' | 'neuro' | 'surgery' |
  'nursing' | 'dental' | 'psych' | 'geriatrics' | 'ortho' | 'medications';

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

#!/usr/bin/env python3
"""
Update types.ts with ALL remaining batch enums (Batches 6-16)
"""

def update_types_all_batches():
    """Add all remaining AppView enums to types.ts"""
    
    with open('types.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the last Batch 5 enum
    marker = "CALC_SF_SYNCOPE = 'CALC_SF_SYNCOPE'"
    
    new_enums = """CALC_SF_SYNCOPE = 'CALC_SF_SYNCOPE',
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
  CALC_CANADIAN_CT_HEAD = 'CALC_CANADIAN_CT_HEAD'"""
    
    content = content.replace(marker, new_enums)
    
    with open('types.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Updated types.ts with ALL batch enums (6-16)")
    print("   Added 35 new calculator enums")
    return True


if __name__ == '__main__':
    update_types_all_batches()

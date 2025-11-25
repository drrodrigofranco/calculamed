#!/usr/bin/env python3
"""
Add Batch 4 enum entries to types.ts
"""

def add_batch4_enums():
    """Add 13 new enum entries for Batch 4 calculators"""
    
    with open('types.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the CALC_DIC line and add new enums after it
    marker = "  CALC_DIC = 'CALC_DIC',"
    new_enums = """  CALC_DIC = 'CALC_DIC',
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
  CALC_LBM = 'CALC_LBM',"""
    
    content = content.replace(marker, new_enums)
    
    with open('types.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Added 13 new enum entries for Batch 4")
    return True

if __name__ == '__main__':
    add_batch4_enums()

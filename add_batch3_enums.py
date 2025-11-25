#!/usr/bin/env python3
"""
Add Batch 3 enum entries to types.ts
"""

def add_batch3_enums():
    """Add 9 new enum entries for Batch 3 calculators"""
    
    with open('types.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the CALC_HUNT_HESS line and add new enums after it
    marker = "  CALC_HUNT_HESS = 'CALC_HUNT_HESS',"
    new_enums = """  CALC_HUNT_HESS = 'CALC_HUNT_HESS',
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
  CALC_DIC = 'CALC_DIC',"""
    
    content = content.replace(marker, new_enums)
    
    with open('types.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Added 9 new enum entries for Batch 3")
    return True

if __name__ == '__main__':
    add_batch3_enums()

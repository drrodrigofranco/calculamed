#!/usr/bin/env python3
"""
Add Batch 2 enum entries to types.ts
"""

def add_batch2_enums():
    """Add 7 new enum entries for Batch 2 calculators"""
    
    with open('types.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the CALC_PERC line and add new enums after it
    marker = "  CALC_PERC = 'CALC_PERC',"
    new_enums = """  CALC_PERC = 'CALC_PERC',
  // Batch 2 - Cardiology
  CALC_GRACE = 'CALC_GRACE',
  CALC_TIMI = 'CALC_TIMI',
  CALC_FRAMINGHAM = 'CALC_FRAMINGHAM',
  // Batch 2 - Neurology
  CALC_NIHSS = 'CALC_NIHSS',
  CALC_ABCD2 = 'CALC_ABCD2',
  CALC_MODIFIED_RANKIN = 'CALC_MODIFIED_RANKIN',
  CALC_HUNT_HESS = 'CALC_HUNT_HESS',"""
    
    content = content.replace(marker, new_enums)
    
    with open('types.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Added 7 new enum entries for Batch 2")
    return True

if __name__ == '__main__':
    add_batch2_enums()

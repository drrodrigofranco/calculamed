#!/usr/bin/env python3
"""
Update types.ts with Batch 5 enums
"""

def update_types_batch5():
    """Add Batch 5 AppView enums to types.ts"""
    
    with open('types.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the last calculator enum (CALC_MOUNJARO)
    marker = "CALC_MOUNJARO = 'CALC_MOUNJARO'"
    
    new_enums = """CALC_MOUNJARO = 'CALC_MOUNJARO',
  // Batch 5 - Emergency/Trauma
  CALC_HEART = 'CALC_HEART',
  CALC_PECARN = 'CALC_PECARN',
  CALC_CANADIAN_CSPINE = 'CALC_CANADIAN_CSPINE',
  CALC_ISS = 'CALC_ISS',
  CALC_SF_SYNCOPE = 'CALC_SF_SYNCOPE'"""
    
    content = content.replace(marker, new_enums)
    
    with open('types.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Updated types.ts with Batch 5 enums")
    return True


if __name__ == '__main__':
    update_types_batch5()

#!/usr/bin/env python3
"""
Script to add Batch 1 calculator imports and routes to App.tsx
"""

def add_batch1_imports():
    """Add imports for the 6 new Batch 1 calculators"""
    
    # Read the file
    with open('App.tsx', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Find the line with PediatricDosageCalculator import
    insert_index = None
    for i, line in enumerate(lines):
        if 'import PediatricDosageCalculator' in line:
            insert_index = i + 1
            break
    
    if insert_index is None:
        print("ERROR: Could not find PediatricDosageCalculator import")
        return False
    
    # New imports to add
    new_imports = [
        "import SOFACalculator from './components/calculators/SOFACalculator';\r\n",
        "import qSOFACalculator from './components/calculators/qSOFACalculator';\r\n",
        "import APACHE2Calculator from './components/calculators/APACHE2Calculator';\r\n",
        "import SAPS2Calculator from './components/calculators/SAPS2Calculator';\r\n",
        "import RTSCalculator from './components/calculators/RTSCalculator';\r\n",
        "import PERCCalculator from './components/calculators/PERCCalculator';\r\n",
    ]
    
    # Insert the new imports
    for imp in reversed(new_imports):
        lines.insert(insert_index, imp)
    
    # Write back
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print("✅ Added 6 new calculator imports")
    return True


def add_batch1_routes():
    """Add route cases for the 6 new calculators"""
    
    # Read the file
    with open('App.tsx', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Find the line with "case AppView.CALC_PHQ9"
    insert_index = None
    for i, line in enumerate(lines):
        if 'case AppView.CALC_PHQ9:' in line:
            # Insert after the next line (which should be "return <PHQ9Calculator />")
            insert_index = i + 2
            break
    
    if insert_index is None:
        print("ERROR: Could not find CALC_PHQ9 case")
        return False
    
    # New routes to add
    new_routes = [
        "\r\n",
        "            case AppView.CALC_SOFA: return <SOFACalculator />;\r\n",
        "            case AppView.CALC_QSOFA: return <qSOFACalculator />;\r\n",
        "            case AppView.CALC_APACHE2: return <APACHE2Calculator />;\r\n",
        "            case AppView.CALC_SAPS2: return <SAPS2Calculator />;\r\n",
        "            case AppView.CALC_RTS: return <RTSCalculator />;\r\n",
        "            case AppView.CALC_PERC: return <PERCCalculator />;\r\n",
    ]
    
    # Insert the new routes
    for route in reversed(new_routes):
        lines.insert(insert_index, route)
    
    # Write back
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print("✅ Added 6 new calculator routes")
    return True


def add_calculators_to_emergency_specialty():
    """Add the 6 new calculators to the Emergency specialty"""
    
    # Read the file
    with open('App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the emergency specialty section
    emergency_start = content.find("id: 'emergency',")
    if emergency_start == -1:
        print("ERROR: Could not find emergency specialty")
        return False
    
    # Find the calculators array within emergency
    calc_array_start = content.find("calculators: [", emergency_start)
    # Find the closing bracket for this calculators array
    # We need to find the line with CALC_VASOACTIVE and add after it
    vasoactive_line = content.find("CALC_VASOACTIVE", calc_array_start)
    # Find the end of that line
    line_end = content.find("],", vasoactive_line)
    
    if line_end == -1:
        print("ERROR: Could not find end of VASOACTIVE line")
        return False
    
    # New calculators to add (before the closing ])
    new_calcs = """
            { id: AppView.CALC_SOFA, name: 'SOFA Score', description: 'Disfunção Orgânica', isPro: true },
            { id: AppView.CALC_QSOFA, name: 'qSOFA', description: 'Triagem Rápida Sepse' },
            { id: AppView.CALC_APACHE2, name: 'APACHE II', description: 'Mortalidade em UTI', isPro: true },
            { id: AppView.CALC_SAPS2, name: 'SAPS II', description: 'Predição Mortalidade', isPro: true },
            { id: AppView.CALC_RTS, name: 'Trauma Score', description: 'Gravidade Trauma' },
            { id: AppView.CALC_PERC, name: 'PERC Rule', description: 'Exclusão TEP' },
"""
    
    # Insert before the closing ]
    content = content[:line_end] + "," + new_calcs + "        " + content[line_end:]
    
    # Write back
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Added 6 new calculators to Emergency specialty")
    return True


if __name__ == '__main__':
    print("🚀 Integrating Batch 1 calculators into App.tsx...")
    print()
    
    if add_batch1_imports():
        if add_batch1_routes():
            if add_calculators_to_emergency_specialty():
                print()
                print("✅ SUCCESS! All Batch 1 calculators integrated.")
                print("   - 6 imports added")
                print("   - 6 routes added")
                print("   - 6 calculators added to Emergency specialty")
            else:
                print("❌ Failed to add calculators to specialty")
        else:
            print("❌ Failed to add routes")
    else:
        print("❌ Failed to add imports")

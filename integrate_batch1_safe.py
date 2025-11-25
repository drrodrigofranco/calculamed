#!/usr/bin/env python3
"""
Safer script to integrate Batch 1 calculators into App.tsx
This version makes minimal, targeted changes
"""

def integrate_batch1():
    """Integrate all Batch 1 components into App.tsx"""
    
    with open('App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Step 1: Add imports after PediatricDosageCalculator
    import_marker = "import PediatricDosageCalculator from './components/calculators/PediatricDosageCalculator';"
    new_imports = """import PediatricDosageCalculator from './components/calculators/PediatricDosageCalculator';
import SOFACalculator from './components/calculators/SOFACalculator';
import qSOFACalculator from './components/calculators/qSOFACalculator';
import APACHE2Calculator from './components/calculators/APACHE2Calculator';
import SAPS2Calculator from './components/calculators/SAPS2Calculator';
import RTSCalculator from './components/calculators/RTSCalculator';
import PERCCalculator from './components/calculators/PERCCalculator';"""
    
    content = content.replace(import_marker, new_imports)
    
    # Step 2: Add routes after PHQ9Calculator
    route_marker = "case AppView.CALC_PHQ9: return <PHQ9Calculator />;"
    new_routes = """case AppView.CALC_PHQ9: return <PHQ9Calculator />;
            case AppView.CALC_SOFA: return <SOFACalculator />;
            case AppView.CALC_QSOFA: return <qSOFACalculator />;
            case AppView.CALC_APACHE2: return <APACHE2Calculator />;
            case AppView.CALC_SAPS2: return <SAPS2Calculator />;
            case AppView.CALC_RTS: return <RTSCalculator />;
            case AppView.CALC_PERC: return <PERCCalculator />;"""
    
    content = content.replace(route_marker, new_routes)
    
    # Step 3: Add calculators to emergency specialty
    emergency_marker = "{ id: AppView.CALC_VASOACTIVE, name: 'Drogas Vasoativas', description: 'Noradrenalina, Sedação, etc', isPro: true },"
    new_calcs = """{ id: AppView.CALC_VASOACTIVE, name: 'Drogas Vasoativas', description: 'Noradrenalina, Sedação, etc', isPro: true },
            { id: AppView.CALC_SOFA, name: 'SOFA Score', description: 'Disfunção Orgânica', isPro: true },
            { id: AppView.CALC_QSOFA, name: 'qSOFA', description: 'Triagem Rápida Sepse' },
            { id: AppView.CALC_APACHE2, name: 'APACHE II', description: 'Mortalidade em UTI', isPro: true },
            { id: AppView.CALC_SAPS2, name: 'SAPS II', description: 'Predição Mortalidade', isPro: true },
            { id: AppView.CALC_RTS, name: 'Trauma Score', description: 'Gravidade Trauma' },
            { id: AppView.CALC_PERC, name: 'PERC Rule', description: 'Exclusão TEP' },"""
    
    content = content.replace(emergency_marker, new_calcs)
    
    # Write back
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ SUCCESS! Batch 1 calculators integrated:")
    print("   - 6 imports added")
    print("   - 6 routes added")
    print("   - 6 calculators added to Emergency specialty")
    return True

if __name__ == '__main__':
    print("🚀 Integrating Batch 1 calculators...")
    integrate_batch1()

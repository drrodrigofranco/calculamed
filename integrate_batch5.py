#!/usr/bin/env python3
"""
Integrate Batch 5 calculators into App.tsx
"""

def integrate_batch5():
    """Integrate all 5 Batch 5 components into App.tsx"""
    
    with open('App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Step 1: Add imports after MounjaroCalculator
    import_marker = "import MounjaroCalculator from './components/calculators/MounjaroCalculator';"
    new_imports = """import MounjaroCalculator from './components/calculators/MounjaroCalculator';
import HEARTCalculator from './components/calculators/HEARTCalculator';
import PECARNCalculator from './components/calculators/PECARNCalculator';
import CanadianCSpineCalculator from './components/calculators/CanadianCSpineCalculator';
import ISSCalculator from './components/calculators/ISSCalculator';
import SanFranciscoSyncope from './components/calculators/SanFranciscoSyncope';"""
    
    content = content.replace(import_marker, new_imports)
    
    # Step 2: Add routes after CALC_MOUNJARO
    route_marker = "case AppView.CALC_MOUNJARO: return <MounjaroCalculator"
    # Find the complete line
    import re
    route_pattern = r"case AppView\.CALC_MOUNJARO: return <MounjaroCalculator[^;]+;"
    
    new_routes = """case AppView.CALC_MOUNJARO: return <MounjaroCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_HEART: return <HEARTCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_PECARN: return <PECARNCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_CANADIAN_CSPINE: return <CanadianCSpineCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_ISS: return <ISSCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_SF_SYNCOPE: return <SanFranciscoSyncope onNavigate={setCurrentView} />;"""
    
    # Replace using regex to handle the full line
    content = re.sub(route_pattern, new_routes, content)
    
    # Step 3: Add calculators to emergency specialty
    # Find emergency specialty section
    emergency_marker = "{ id: AppView.CALC_VASOACTIVE, name: 'Drogas Vasoativas', description: 'Cálculo de Doses' },"
    new_emergency = """{ id: AppView.CALC_VASOACTIVE, name: 'Drogas Vasoativas', description: 'Cálculo de Doses' },
            { id: AppView.CALC_HEART, name: 'HEART Score', description: 'Risco de SCA', isPro: true },
            { id: AppView.CALC_PECARN, name: 'PECARN', description: 'TCE Pediátrico', isPro: true },
            { id: AppView.CALC_CANADIAN_CSPINE, name: 'Canadian C-Spine', description: 'RX Cervical', isPro: true },
            { id: AppView.CALC_ISS, name: 'ISS', description: 'Gravidade do Trauma', isPro: true },
            { id: AppView.CALC_SF_SYNCOPE, name: 'SF Syncope Rule', description: 'Risco em Síncope', isPro: true },"""
    
    content = content.replace(emergency_marker, new_emergency)
    
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ SUCCESS! Batch 5 calculators integrated:")
    print("   - 5 imports added")
    print("   - 5 routes added")
    print("   - 5 calculators added to Emergency specialty")
    return True


if __name__ == '__main__':
    print("🚀 Integrating Batch 5 calculators...")
    integrate_batch5()

#!/usr/bin/env python3
"""
Integrate Batch 2 calculators into App.tsx
"""

def integrate_batch2():
    """Integrate all Batch 2 components into App.tsx"""
    
    with open('App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Step 1: Add imports after PERCCalculator
    import_marker = "import PERCCalculator from './components/calculators/PERCCalculator';"
    new_imports = """import PERCCalculator from './components/calculators/PERCCalculator';
import GRACECalculator from './components/calculators/GRACECalculator';
import TIMICalculator from './components/calculators/TIMICalculator';
import FraminghamCalculator from './components/calculators/FraminghamCalculator';
import NIHSSCalculator from './components/calculators/NIHSSCalculator';
import ABCD2Calculator from './components/calculators/ABCD2Calculator';
import ModifiedRankinCalculator from './components/calculators/ModifiedRankinCalculator';
import HuntHessCalculator from './components/calculators/HuntHessCalculator';"""
    
    content = content.replace(import_marker, new_imports)
    
    # Step 2: Add routes after CALC_PERC
    route_marker = "case AppView.CALC_PERC: return <PERCCalculator />;"
    new_routes = """case AppView.CALC_PERC: return <PERCCalculator />;
            case AppView.CALC_GRACE: return <GRACECalculator />;
            case AppView.CALC_TIMI: return <TIMICalculator />;
            case AppView.CALC_FRAMINGHAM: return <FraminghamCalculator />;
            case AppView.CALC_NIHSS: return <NIHSSCalculator />;
            case AppView.CALC_ABCD2: return <ABCD2Calculator />;
            case AppView.CALC_MODIFIED_RANKIN: return <ModifiedRankinCalculator />;
            case AppView.CALC_HUNT_HESS: return <HuntHessCalculator />;"""
    
    content = content.replace(route_marker, new_routes)
    
    # Step 3: Add calculators to cardio specialty
    cardio_marker = "{ id: AppView.CALC_QTC, name: 'QT Corrigido', description: 'Fórmula de Bazett' },"
    new_cardio = """{ id: AppView.CALC_QTC, name: 'QT Corrigido', description: 'Fórmula de Bazett' },
            { id: AppView.CALC_GRACE, name: 'GRACE Score', description: 'Risco em SCA', isPro: true },
            { id: AppView.CALC_TIMI, name: 'TIMI Score', description: 'UA/NSTEMI', isPro: true },
            { id: AppView.CALC_FRAMINGHAM, name: 'Framingham', description: 'Risco Cardiovascular 10 anos', isPro: true },"""
    
    content = content.replace(cardio_marker, new_cardio)
    
    # Step 4: Add calculators to neuro specialty
    neuro_marker = "{ id: AppView.CALC_PHQ9, name: 'PHQ-9', description: 'Rastreio de Depressão' },"
    new_neuro = """{ id: AppView.CALC_PHQ9, name: 'PHQ-9', description: 'Rastreio de Depressão' },
            { id: AppView.CALC_NIHSS, name: 'NIHSS', description: 'Gravidade do AVC', isPro: true },
            { id: AppView.CALC_ABCD2, name: 'ABCD² Score', description: 'Risco AVC pós-AIT' },
            { id: AppView.CALC_MODIFIED_RANKIN, name: 'Modified Rankin', description: 'Funcionalidade pós-AVC' },
            { id: AppView.CALC_HUNT_HESS, name: 'Hunt-Hess', description: 'HSA' },"""
    
    content = content.replace(neuro_marker, new_neuro)
    
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ SUCCESS! Batch 2 calculators integrated:")
    print("   - 7 imports added")
    print("   - 7 routes added")
    print("   - 3 calculators added to Cardiology specialty")
    print("   - 4 calculators added to Neurology specialty")
    return True

if __name__ == '__main__':
    print("🚀 Integrating Batch 2 calculators...")
    integrate_batch2()

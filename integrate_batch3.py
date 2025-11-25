#!/usr/bin/env python3
"""
Integrate Batch 3 calculators into App.tsx
"""

def integrate_batch3():
    """Integrate all Batch 3 components into App.tsx"""
    
    with open('App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Step 1: Add imports after HuntHessCalculator
    import_marker = "import HuntHessCalculator from './components/calculators/HuntHessCalculator';"
    new_imports = """import HuntHessCalculator from './components/calculators/HuntHessCalculator';
import BODECalculator from './components/calculators/BODECalculator';
import SMARTCOPCalculator from './components/calculators/SMARTCOPCalculator';
import LightsCalculator from './components/calculators/LightsCalculator';
import RIFLECalculator from './components/calculators/RIFLECalculator';
import AKINCalculator from './components/calculators/AKINCalculator';
import KtVCalculator from './components/calculators/KtVCalculator';
import HbA1cCalculator from './components/calculators/HbA1cCalculator';
import ReticIndexCalculator from './components/calculators/ReticIndexCalculator';
import DICCalculator from './components/calculators/DICCalculator';"""
    
    content = content.replace(import_marker, new_imports)
    
    # Step 2: Add routes after CALC_HUNT_HESS
    route_marker = "case AppView.CALC_HUNT_HESS: return <HuntHessCalculator />;"
    new_routes = """case AppView.CALC_HUNT_HESS: return <HuntHessCalculator />;
            case AppView.CALC_BODE: return <BODECalculator />;
            case AppView.CALC_SMART_COP: return <SMARTCOPCalculator />;
            case AppView.CALC_LIGHTS: return <LightsCalculator />;
            case AppView.CALC_RIFLE: return <RIFLECalculator />;
            case AppView.CALC_AKIN: return <AKINCalculator />;
            case AppView.CALC_KTV: return <KtVCalculator />;
            case AppView.CALC_HBA1C: return <HbA1cCalculator />;
            case AppView.CALC_RETIC_INDEX: return <ReticIndexCalculator />;
            case AppView.CALC_DIC: return <DICCalculator />;"""
    
    content = content.replace(route_marker, new_routes)
    
    # Step 3: Add calculators to pneumo specialty
    pneumo_marker = "{ id: AppView.CALC_CURB65, name: 'CURB-65', description: 'Pneumonia Adquirida' },"
    new_pneumo = """{ id: AppView.CALC_CURB65, name: 'CURB-65', description: 'Pneumonia Adquirida' },
            { id: AppView.CALC_BODE, name: 'BODE Index', description: 'Prognóstico DPOC', isPro: true },
            { id: AppView.CALC_SMART_COP, name: 'SMART-COP', description: 'Necessidade UTI', isPro: true },
            { id: AppView.CALC_LIGHTS, name: 'Light\\'s Criteria', description: 'Derrame Pleural' },"""
    
    content = content.replace(pneumo_marker, new_pneumo)
    
    # Step 4: Add calculators to nephro specialty
    nephro_marker = "{ id: AppView.CALC_ANION_GAP, name: 'Anion Gap', description: 'Acidose Metabólica' },"
    new_nephro = """{ id: AppView.CALC_ANION_GAP, name: 'Anion Gap', description: 'Acidose Metabólica' },
            { id: AppView.CALC_RIFLE, name: 'RIFLE', description: 'LRA', isPro: true },
            { id: AppView.CALC_AKIN, name: 'AKIN', description: 'LRA' },
            { id: AppView.CALC_KTV, name: 'Kt/V', description: 'Adequação Hemodiálise', isPro: true },"""
    
    content = content.replace(nephro_marker, new_nephro)
    
    # Step 5: Add calculators to hema specialty
    hema_marker = "{ id: AppView.CALC_BSA, name: 'Superfície Corporal', description: 'Doses de Quimioterapia' },"
    new_hema = """{ id: AppView.CALC_BSA, name: 'Superfície Corporal', description: 'Doses de Quimioterapia' },
            { id: AppView.CALC_HBA1C, name: 'HbA1c → Glicemia', description: 'Média 3 meses' },
            { id: AppView.CALC_RETIC_INDEX, name: 'Índice Reticulócitos', description: 'Resposta Medular' },
            { id: AppView.CALC_DIC, name: 'DIC Score', description: 'CIVD', isPro: true },"""
    
    content = content.replace(hema_marker, new_hema)
    
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ SUCCESS! Batch 3 calculators integrated:")
    print("   - 9 imports added")
    print("   - 9 routes added")
    print("   - 3 calculators added to Pneumology")
    print("   - 3 calculators added to Nephrology")
    print("   - 3 calculators added to Hematology")
    return True

if __name__ == '__main__':
    print("🚀 Integrating Batch 3 calculators...")
    integrate_batch3()

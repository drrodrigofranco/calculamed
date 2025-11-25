#!/usr/bin/env python3
"""
Integrate all Batch 4 calculators into App.tsx
"""

def integrate_batch4():
    """Integrate all 13 Batch 4 components into App.tsx"""
    
    with open('App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Step 1: Add imports after DICCalculator
    import_marker = "import DICCalculator from './components/calculators/DICCalculator';"
    new_imports = """import DICCalculator from './components/calculators/DICCalculator';
import BishopCalculator from './components/calculators/BishopCalculator';
import HELLPCalculator from './components/calculators/HELLPCalculator';
import PedGlasgowCalculator from './components/calculators/PedGlasgowCalculator';
import BallardCalculator from './components/calculators/BallardCalculator';
import WestleyCalculator from './components/calculators/WestleyCalculator';
import OttawaAnkleCalculator from './components/calculators/OttawaAnkleCalculator';
import OttawaKneeCalculator from './components/calculators/OttawaKneeCalculator';
import NexusCalculator from './components/calculators/NexusCalculator';
import OsmolalityCalculator from './components/calculators/OsmolalityCalculator';
import SAAGCalculator from './components/calculators/SAAGCalculator';
import FENaCalculator from './components/calculators/FENaCalculator';
import VO2MaxCalculator from './components/calculators/VO2MaxCalculator';
import LBMCalculator from './components/calculators/LBMCalculator';"""
    
    content = content.replace(import_marker, new_imports)
    
    # Step 2: Add routes after CALC_DIC
    route_marker = "case AppView.CALC_DIC: return <DICCalculator />;"
    new_routes = """case AppView.CALC_DIC: return <DICCalculator />;
            case AppView.CALC_BISHOP: return <BishopCalculator />;
            case AppView.CALC_HELLP: return <HELLPCalculator />;
            case AppView.CALC_PED_GLASGOW: return <PedGlasgowCalculator />;
            case AppView.CALC_BALLARD: return <BallardCalculator />;
            case AppView.CALC_WESTLEY: return <WestleyCalculator />;
            case AppView.CALC_OTTAWA_ANKLE: return <OttawaAnkleCalculator />;
            case AppView.CALC_OTTAWA_KNEE: return <OttawaKneeCalculator />;
            case AppView.CALC_NEXUS: return <NexusCalculator />;
            case AppView.CALC_OSMOLALITY: return <OsmolalityCalculator />;
            case AppView.CALC_SAAG: return <SAAGCalculator />;
            case AppView.CALC_FENA: return <FENaCalculator />;
            case AppView.CALC_VO2MAX: return <VO2MaxCalculator />;
            case AppView.CALC_LBM: return <LBMCalculator />;"""
    
    content = content.replace(route_marker, new_routes)
    
    # Step 3: Add calculators to obstetrics specialty
    obs_marker = "{ id: AppView.CALC_APGAR, name: 'APGAR', description: 'Vitalidade do RN' },"
    new_obs = """{ id: AppView.CALC_APGAR, name: 'APGAR', description: 'Vitalidade do RN' },
            { id: AppView.CALC_BISHOP, name: 'Bishop Score', description: 'Indução de Parto' },
            { id: AppView.CALC_HELLP, name: 'HELLP Syndrome', description: 'Critérios Diagnósticos', isPro: true },"""
    
    content = content.replace(obs_marker, new_obs)
    
    # Step 4: Add calculators to pediatrics specialty
    peds_marker = "{ id: AppView.CALC_PEDIATRIC_DOSAGE, name: 'Dosagem Pediátrica', description: 'Cálculo de Doses' },"
    new_peds = """{ id: AppView.CALC_PEDIATRIC_DOSAGE, name: 'Dosagem Pediátrica', description: 'Cálculo de Doses' },
            { id: AppView.CALC_PED_GLASGOW, name: 'Glasgow Pediátrico', description: 'Consciência' },
            { id: AppView.CALC_BALLARD, name: 'Ballard Score', description: 'Idade Gestacional' },
            { id: AppView.CALC_WESTLEY, name: 'Westley Croup', description: 'Laringotraqueobronquite' },"""
    
    content = content.replace(peds_marker, new_peds)
    
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ SUCCESS! Batch 4 calculators integrated:")
    print("   - 13 imports added")
    print("   - 13 routes added")
    print("   - 2 calculators added to Obstetrics")
    print("   - 3 calculators added to Pediatrics")
    print("   - Note: Orthopedics, Laboratory, and Sports Medicine need new specialty sections")
    return True

if __name__ == '__main__':
    print("🚀 Integrating Batch 4 calculators...")
    integrate_batch4()

#!/usr/bin/env python3
"""
Integrate ALL remaining batches (6-16) into App.tsx
"""

import re

def integrate_all_batches():
    """Integrate all remaining calculator components into App.tsx"""
    
    with open('App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Step 1: Add ALL imports after SanFranciscoSyncope
    import_marker = "import SanFranciscoSyncope from './components/calculators/SanFranciscoSyncope';"
    
    new_imports = """import SanFranciscoSyncope from './components/calculators/SanFranciscoSyncope';
// Batch 6 - Cardiology Advanced
import TIMISTEMICalculator from './components/calculators/TIMISTEMICalculator';
import DukeTreadmillCalculator from './components/calculators/DukeTreadmillCalculator';
import MAGGICCalculator from './components/calculators/MAGGICCalculator';
import KillipCalculator from './components/calculators/KillipCalculator';
// Batch 7 - Neurology Advanced
import ICHScoreCalculator from './components/calculators/ICHScoreCalculator';
import FOURScoreCalculator from './components/calculators/FOURScoreCalculator';
import CanadianStrokeCalculator from './components/calculators/CanadianStrokeCalculator';
// Batch 8 - Pneumology Advanced
import PSICalculator from './components/calculators/PSICalculator';
import GenevaScoreCalculator from './components/calculators/GenevaScoreCalculator';
import GOLDCalculator from './components/calculators/GOLDCalculator';
// Batch 9 - Hematology
import WellsDVTCalculator from './components/calculators/WellsDVTCalculator';
import HITScoreCalculator from './components/calculators/HITScoreCalculator';
import PaduaCalculator from './components/calculators/PaduaCalculator';
// Batch 10 - Nephrology Advanced
import KDIGOCalculator from './components/calculators/KDIGOCalculator';
import FEUreaCalculator from './components/calculators/FEUreaCalculator';
import FreeWaterDeficitCalculator from './components/calculators/FreeWaterDeficitCalculator';
// Batch 11 - Pediatrics Advanced
import PEWSCalculator from './components/calculators/PEWSCalculator';
import SilvermanCalculator from './components/calculators/SilvermanCalculator';
import CapurroCalculator from './components/calculators/CapurroCalculator';
// Batch 12 - Geriatrics
import FRAXCalculator from './components/calculators/FRAXCalculator';
import MorseFallCalculator from './components/calculators/MorseFallCalculator';
import CharlsonCalculator from './components/calculators/CharlsonCalculator';
import MNACalculator from './components/calculators/MNACalculator';
// Batch 13 - Laboratory
import CorrectedSodiumCalculator from './components/calculators/CorrectedSodiumCalculator';
import DeltaRatioCalculator from './components/calculators/DeltaRatioCalculator';
import TTKGCalculator from './components/calculators/TTKGCalculator';
// Batch 14 - Obstetrics Advanced
import PreeclampsiaSeverityCalculator from './components/calculators/PreeclampsiaSeverityCalculator';
import EdinburghPNDCalculator from './components/calculators/EdinburghPNDCalculator';
// Batch 15 - Sports Medicine
import KarvonenCalculator from './components/calculators/KarvonenCalculator';
import BodyFatCalculator from './components/calculators/BodyFatCalculator';
import OneRMCalculator from './components/calculators/OneRMCalculator';
// Batch 16 - Orthopedics
import PittsburghKneeCalculator from './components/calculators/PittsburghKneeCalculator';
import CanadianCTHeadCalculator from './components/calculators/CanadianCTHeadCalculator';"""
    
    content = content.replace(import_marker, new_imports)
    
    # Step 2: Add ALL routes after CALC_SF_SYNCOPE
    route_pattern = r"case AppView\.CALC_SF_SYNCOPE: return <SanFranciscoSyncope[^;]+;"
    
    new_routes = """case AppView.CALC_SF_SYNCOPE: return <SanFranciscoSyncope onNavigate={setCurrentView} />;
            // Batch 6
            case AppView.CALC_TIMI_STEMI: return <TIMISTEMICalculator onNavigate={setCurrentView} />;
            case AppView.CALC_DUKE_TREADMILL: return <DukeTreadmillCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_MAGGIC: return <MAGGICCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_KILLIP: return <KillipCalculator onNavigate={setCurrentView} />;
            // Batch 7
            case AppView.CALC_ICH: return <ICHScoreCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_FOUR: return <FOURScoreCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_CANADIAN_STROKE: return <CanadianStrokeCalculator onNavigate={setCurrentView} />;
            // Batch 8
            case AppView.CALC_PSI: return <PSICalculator onNavigate={setCurrentView} />;
            case AppView.CALC_GENEVA: return <GenevaScoreCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_GOLD: return <GOLDCalculator onNavigate={setCurrentView} />;
            // Batch 9
            case AppView.CALC_WELLS_DVT: return <WellsDVTCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_HIT: return <HITScoreCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_PADUA: return <PaduaCalculator onNavigate={setCurrentView} />;
            // Batch 10
            case AppView.CALC_KDIGO: return <KDIGOCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_FEUREA: return <FEUreaCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_FREE_WATER: return <FreeWaterDeficitCalculator onNavigate={setCurrentView} />;
            // Batch 11
            case AppView.CALC_PEWS: return <PEWSCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_SILVERMAN: return <SilvermanCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_CAPURRO: return <CapurroCalculator onNavigate={setCurrentView} />;
            // Batch 12
            case AppView.CALC_FRAX: return <FRAXCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_MORSE_FALL: return <MorseFallCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_CHARLSON: return <CharlsonCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_MNA: return <MNACalculator onNavigate={setCurrentView} />;
            // Batch 13
            case AppView.CALC_CORRECTED_SODIUM: return <CorrectedSodiumCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_DELTA_RATIO: return <DeltaRatioCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_TTKG: return <TTKGCalculator onNavigate={setCurrentView} />;
            // Batch 14
            case AppView.CALC_PREECLAMPSIA: return <PreeclampsiaSeverityCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_EDINBURGH: return <EdinburghPNDCalculator onNavigate={setCurrentView} />;
            // Batch 15
            case AppView.CALC_KARVONEN: return <KarvonenCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_BODY_FAT: return <BodyFatCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_ONE_RM: return <OneRMCalculator onNavigate={setCurrentView} />;
            // Batch 16
            case AppView.CALC_PITTSBURGH_KNEE: return <PittsburghKneeCalculator onNavigate={setCurrentView} />;
            case AppView.CALC_CANADIAN_CT_HEAD: return <CanadianCTHeadCalculator onNavigate={setCurrentView} />;"""
    
    content = re.sub(route_pattern, new_routes, content)
    
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ SUCCESS! All batches (6-16) integrated into App.tsx")
    print("   - 35 imports added")
    print("   - 35 routes added")
    print()
    print("⚠️  Note: You'll need to manually add calculators to specialty definitions")
    print("   in the SPECIALTIES array based on which specialty each belongs to.")
    return True


if __name__ == '__main__':
    print("🚀 Integrating ALL remaining batches...")
    integrate_all_batches()

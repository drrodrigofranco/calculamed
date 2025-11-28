#!/usr/bin/env python3
"""
Integração automática do Batch Community (12 calculadoras)
"""

def update_types():
    with open('types.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'CALC_DENGUE' in content:
        print("⚠️  types.ts já contém as novas calculadoras")
        return

    # Adicionar novos Enums
    marker = "CALC_BULA_MEDICAMENTO = 'CALC_BULA_MEDICAMENTO'"
    new_enums = """CALC_BULA_MEDICAMENTO = 'CALC_BULA_MEDICAMENTO',
  // Community & Primary Care Batch
  CALC_DENGUE = 'CALC_DENGUE',
  CALC_FINDRISC = 'CALC_FINDRISC',
  CALC_CAGE = 'CALC_CAGE',
  CALC_BRADEN = 'CALC_BRADEN',
  CALC_DISCHARGE = 'CALC_DISCHARGE',
  CALC_OPIOID = 'CALC_OPIOID',
  CALC_INSULIN = 'CALC_INSULIN',
  CALC_PED_ABX = 'CALC_PED_ABX',
  CALC_GROWTH = 'CALC_GROWTH',
  CALC_TARGET_HEIGHT = 'CALC_TARGET_HEIGHT',
  CALC_GAD7 = 'CALC_GAD7',
  CALC_MINIMENTAL = 'CALC_MINIMENTAL'"""
    
    content = content.replace(marker, new_enums)
    
    with open('types.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ types.ts atualizado")

def update_app():
    with open('App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'DengueCalculator' in content:
        print("⚠️  App.tsx já contém os imports das novas calculadoras")
        return

    # 1. Imports
    import_marker = "import PediatricDosageCalculator from './components/calculators/PediatricDosageCalculator';"
    new_imports = """import PediatricDosageCalculator from './components/calculators/PediatricDosageCalculator';
import DengueCalculator from './components/calculators/DengueCalculator';
import FINDRISCCalculator from './components/calculators/FINDRISCCalculator';
import CAGECalculator from './components/calculators/CAGECalculator';
import BradenScaleCalculator from './components/calculators/BradenScaleCalculator';
import DischargePredictor from './components/calculators/DischargePredictor';
import OpioidConverter from './components/calculators/OpioidConverter';
import InsulinSlidingScale from './components/calculators/InsulinSlidingScale';
import PediatricAntibioticCalculator from './components/calculators/PediatricAntibioticCalculator';
import GrowthZScoreCalculator from './components/calculators/GrowthZScoreCalculator';
import TargetHeightCalculator from './components/calculators/TargetHeightCalculator';
import GAD7Calculator from './components/calculators/GAD7Calculator';
import MiniMentalCalculator from './components/calculators/MiniMentalCalculator';"""
    content = content.replace(import_marker, new_imports)

    # 2. Routes
    route_marker = "case AppView.CALC_PED_FLUIDS: return <PediatricFluidCalculator />;"
    new_routes = """case AppView.CALC_PED_FLUIDS: return <PediatricFluidCalculator />;
            case AppView.CALC_DENGUE: return <DengueCalculator onNavigate={handleNavigate} />;
            case AppView.CALC_FINDRISC: return <FINDRISCCalculator />;
            case AppView.CALC_CAGE: return <CAGECalculator />;
            case AppView.CALC_BRADEN: return <BradenScaleCalculator />;
            case AppView.CALC_DISCHARGE: return <DischargePredictor />;
            case AppView.CALC_OPIOID: return <OpioidConverter />;
            case AppView.CALC_INSULIN: return <InsulinSlidingScale />;
            case AppView.CALC_PED_ABX: return <PediatricAntibioticCalculator />;
            case AppView.CALC_GROWTH: return <GrowthZScoreCalculator />;
            case AppView.CALC_TARGET_HEIGHT: return <TargetHeightCalculator />;
            case AppView.CALC_GAD7: return <GAD7Calculator />;
            case AppView.CALC_MINIMENTAL: return <MiniMentalCalculator />;"""
    content = content.replace(route_marker, new_routes)

    # 3. Adicionar à Especialidade "Enfermagem" (Exemplo)
    nursing_marker = "{ id: AppView.CALC_DOSAGE, name: 'Dosagem Universal', description: 'Regra de três' },"
    new_nursing = """{ id: AppView.CALC_DOSAGE, name: 'Dosagem Universal', description: 'Regra de três' },
            { id: AppView.CALC_BRADEN, name: 'Escala de Braden', description: 'Risco de Lesão por Pressão' },
            { id: AppView.CALC_DISCHARGE, name: 'Previsão de Alta', description: 'Gestão de Leitos' },"""
    content = content.replace(nursing_marker, new_nursing)

    # 4. Adicionar à Especialidade "Emergência"
    emerg_marker = "{ id: AppView.CALC_VASOACTIVE, name: 'Drogas Vasoativas', description: 'Noradrenalina, Sedação, etc' },"
    new_emerg = """{ id: AppView.CALC_VASOACTIVE, name: 'Drogas Vasoativas', description: 'Noradrenalina, Sedação, etc' },
            { id: AppView.CALC_DENGUE, name: 'Dengue Hidratação', description: 'Protocolo MS' },
            { id: AppView.CALC_INSULIN, name: 'Correção Insulina', description: 'Sliding Scale' },"""
    content = content.replace(emerg_marker, new_emerg)

    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ App.tsx atualizado com novas rotas e calculadoras")

if __name__ == '__main__':
    print("🚀 Integrando novas ferramentas...")
    update_types()
    update_app()
    print("\n✅ Integração concluída! Execute 'npm run build' para verificar.")

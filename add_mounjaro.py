#!/usr/bin/env python3
"""
Adicionar calculadora Mounjaro ao App.tsx
"""

with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Adicionar import
import_line = "import MounjaroCalculator from './components/calculators/MounjaroCalculator';\n"
# Encontrar onde adicionar (após os outros imports de calculadoras)
import_position = content.find("import LBMCalculator from './components/calculators/LBMCalculator';")
if import_position != -1:
    # Encontrar o final da linha
    end_of_line = content.find('\n', import_position) + 1
    content = content[:end_of_line] + import_line + content[end_of_line:]

# 2. Adicionar à especialidade de Enfermagem
old_nursing = """        calculators: [
            { id: AppView.CALC_IV, name: 'Cálculo de Gotejamento', description: 'Gotas/min' },
            { id: AppView.CALC_DOSAGE, name: 'Dosagem Universal', description: 'Regra de três' },
        ]"""

new_nursing = """        calculators: [
            { id: AppView.CALC_IV, name: 'Cálculo de Gotejamento', description: 'Gotas/min' },
            { id: AppView.CALC_DOSAGE, name: 'Dosagem Universal', description: 'Regra de três' },
            { id: AppView.CALC_MOUNJARO, name: 'Fracionamento Mounjaro', description: 'Calcular dose fracionada' },
        ]"""

content = content.replace(old_nursing, new_nursing)

# 3. Adicionar case no renderContent
old_case = """            case AppView.CALC_LBM: return <LBMCalculator />;

            case AppView.DASHBOARD:"""

new_case = """            case AppView.CALC_LBM: return <LBMCalculator />;
            case AppView.CALC_MOUNJARO: return <MounjaroCalculator />;

            case AppView.DASHBOARD:"""

content = content.replace(old_case, new_case)

# Salvar
with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Calculadora Mounjaro adicionada com sucesso!")
print("   - Import adicionado")
print("   - Adicionada à especialidade de Enfermagem")
print("   - Case adicionado no renderContent")

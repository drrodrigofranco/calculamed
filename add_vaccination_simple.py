#!/usr/bin/env python3
"""
Script simples e seguro para adicionar a calculadora de vacinação
"""

print("🔧 Adicionando Calculadora de Vacinação ao App.tsx...")
print()

# 1. Adicionar import
with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Verificar se o import já existe
if 'VaccinationScheduleCalculator' not in content:
    # Adicionar import após MounjaroCalculator
    content = content.replace(
        "import MounjaroCalculator from './components/calculators/MounjaroCalculator';",
        "import MounjaroCalculator from './components/calculators/MounjaroCalculator';\nimport VaccinationScheduleCalculator from './components/calculators/VaccinationScheduleCalculator';"
    )
    print("✅ Import adicionado")
else:
    print("✅ Import já existe")

# 2. Adicionar à lista de calculadoras de Pediatria
if 'CALC_VACCINATION_SCHEDULE' not in content:
    # Procurar pela seção de pediatria e adicionar a calculadora
    pediatrics_section = "{ id: AppView.CALC_PEDIATRIC_DOSAGE, name: 'Doses Pediátricas', description: 'Dipirona, Paracetamol, etc.' },"
    
    if pediatrics_section in content:
        new_line = pediatrics_section + "\n            { id: AppView.CALC_VACCINATION_SCHEDULE, name: 'Calendário Vacinal', description: 'Vacinas por Idade' },"
        content = content.replace(pediatrics_section, new_line)
        print("✅ Calculadora adicionada à lista de Pediatria")
    else:
        print("⚠️ Não foi possível encontrar a seção de Pediatria")
else:
    print("✅ Calculadora já está na lista")

# 3. Adicionar rota
if 'case AppView.CALC_VACCINATION_SCHEDULE:' not in content:
    # Procurar por uma rota existente para adicionar depois
    route_marker = "case AppView.CALC_MOUNJARO: return <MounjaroCalculator />"
    
    if route_marker in content:
        new_route = route_marker + ";\n            case AppView.CALC_VACCINATION_SCHEDULE: return <VaccinationScheduleCalculator />"
        content = content.replace(route_marker, new_route)
        print("✅ Rota adicionada")
    else:
        print("⚠️ Não foi possível adicionar a rota automaticamente")
else:
    print("✅ Rota já existe")

# Salvar arquivo
with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print()
print("="*60)
print("✅ CONCLUÍDO!")
print("="*60)
print("\n💉 Calculadora de Vacinação integrada com sucesso!")
print("   Acesse em: Pediatria > Calendário Vacinal")

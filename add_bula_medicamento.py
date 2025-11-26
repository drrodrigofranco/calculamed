#!/usr/bin/env python3
"""
Adicionar Bula de Medicamentos ao App.tsx
"""

print("🔧 Adicionando Bula de Medicamentos ao App.tsx...")
print()

with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Adicionar import
if 'BulaMedicamento' not in content:
    content = content.replace(
        "import VaccinationScheduleCalculator from './components/calculators/VaccinationScheduleCalculator';",
        "import VaccinationScheduleCalculator from './components/calculators/VaccinationScheduleCalculator';\nimport BulaMedicamento from './components/calculators/BulaMedicamento';"
    )
    print("✅ Import adicionado")
else:
    print("✅ Import já existe")

# 2. Adicionar à seção "Odontologia e Outros" (utilities)
if 'CALC_BULA_MEDICAMENTO' not in content:
    # Procurar pela seção dental/outros
    dental_section = "{ id: AppView.CALC_CONVERTER, name: 'Conversor de Unidades', description: 'Geral' },"
    
    if dental_section in content:
        new_line = dental_section + "\n            { id: AppView.CALC_BULA_MEDICAMENTO, name: 'Bulas de Medicamentos', description: 'Consulta ANVISA' },"
        content = content.replace(dental_section, new_line)
        print("✅ Bula adicionada à seção de Utilidades")
    else:
        print("⚠️ Não foi possível encontrar a seção")
else:
    print("✅ Bula já está na lista")

# 3. Adicionar rota
if 'case AppView.CALC_BULA_MEDICAMENTO:' not in content:
    route_marker = "case AppView.CALC_VACCINATION_SCHEDULE: return <VaccinationScheduleCalculator />"
    
    if route_marker in content:
        new_route = route_marker + ";\n            case AppView.CALC_BULA_MEDICAMENTO: return <BulaMedicamento />"
        content = content.replace(route_marker, new_route)
        print("✅ Rota adicionada")
    else:
        print("⚠️ Não foi possível adicionar a rota")
else:
    print("✅ Rota já existe")

with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print()
print("="*60)
print("✅ CONCLUÍDO!")
print("="*60)
print("\n💊 Busca de Bulas integrada com sucesso!")
print("   Acesse em: Odontologia e Outros > Bulas de Medicamentos")
print("\n📋 Funcionalidades:")
print("   • Busca na API oficial da ANVISA")
print("   • Resultados em tempo real")
print("   • Link direto para bula completa")
print("   • Medicamentos populares pré-configurados")

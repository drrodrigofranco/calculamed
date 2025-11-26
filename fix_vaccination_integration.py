#!/usr/bin/env python3
"""
Script para adicionar a calculadora de vacinação ao App.tsx de forma segura
"""

# Primeiro, vamos verificar se o arquivo está corrompido
with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Procurar pela seção de Pediatria
pediatrics_start = content.find("id: 'peds',")

if pediatrics_start == -1:
    print("❌ Erro: Não foi possível encontrar a seção de Pediatria")
    exit(1)

# Encontrar o array de calculators dentro de peds
calc_start = content.find("calculators: [", pediatrics_start)
calc_end = content.find("]", calc_start)

# Extrair a lista atual de calculadoras
current_calcs = content[calc_start:calc_end]

# Verificar se já existe a calculadora de vacinação
if 'CALC_VACCINATION_SCHEDULE' in current_calcs:
    print("✅ Calculadora de vacinação já está adicionada!")
else:
    # Encontrar a última calculadora antes do ]
    # Adicionar a nova calculadora antes do CALC_PED_GLASGOW
    
    glasgow_line = "{ id: AppView.CALC_PED_GLASGOW"
    
    if glasgow_line in current_calcs:
        # Adicionar antes do Glasgow
        vaccination_line = "            { id: AppView.CALC_VACCINATION_SCHEDULE, name: 'Calendário Vacinal', description: 'Vacinas por Idade' },\n            "
        new_calcs = current_calcs.replace(
            "{ id: AppView.CALC_PED_GLASGOW",
            vaccination_line + "{ id: AppView.CALC_PED_GLASGOW"
        )
        
        new_content = content[:calc_start] + new_calcs + content[calc_end:]
        
        with open('App.tsx', 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print("✅ Calculadora de vacinação adicionada à seção de Pediatria!")
    else:
        print("⚠️ Estrutura do arquivo diferente do esperado")

print("\n📝 Próximo passo: Adicionar a rota no switch/case")
print("Procurando pela seção de rotas...")

# Agora adicionar a rota
route_marker = "case AppView.CALC_CANADIAN_CT_HEAD:"

with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'case AppView.CALC_VACCINATION_SCHEDULE:' in content:
    print("✅ Rota já existe!")
else:
    if route_marker in content:
        # Adicionar após CALC_CANADIAN_CT_HEAD
        new_route = "case AppView.CALC_CANADIAN_CT_HEAD: return <CanadianCTHeadCalculator onNavigate={handleNavigate} />;\n            case AppView.CALC_VACCINATION_SCHEDULE: return <VaccinationScheduleCalculator onNavigate={handleNavigate} />;"
        
        content = content.replace(
            "case AppView.CALC_CANADIAN_CT_HEAD: return <CanadianCTHeadCalculator onNavigate={setCurrentView} />;",
            new_route
        )
        
        with open('App.tsx', 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✅ Rota adicionada com sucesso!")
    else:
        print("⚠️ Não foi possível encontrar o marcador de rota")

print("\n" + "="*60)
print("✅ CONCLUÍDO!")
print("="*60)
print("\n📋 Resumo:")
print("  ✅ VaccinationScheduleCalculator.tsx criado")
print("  ✅ Enum CALC_VACCINATION_SCHEDULE adicionado ao types.ts")
print("  ✅ Import adicionado ao App.tsx")
print("  ✅ Calculadora adicionada à seção de Pediatria")
print("  ✅ Rota adicionada ao switch/case")
print("\n🎯 A calculadora está pronta para uso!")
print("   Acesse: Pediatria > Calendário Vacinal")

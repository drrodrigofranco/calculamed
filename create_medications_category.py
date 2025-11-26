#!/usr/bin/env python3
"""
Criar categoria Medicações e reorganizar calculadoras
"""

print("🔧 Criando categoria 'Medicações' no App.tsx...")
print()

with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remover Bula de Medicamentos da seção "Odontologia e Outros"
print("📝 Removendo Bula de Medicamentos da seção 'Odontologia e Outros'...")
content = content.replace(
    "            { id: AppView.CALC_CONVERTER, name: 'Conversor de Unidades', description: 'Geral' },\n            { id: AppView.CALC_BULA_MEDICAMENTO, name: 'Bulas de Medicamentos', description: 'Consulta ANVISA' },",
    "            { id: AppView.CALC_CONVERTER, name: 'Conversor de Unidades', description: 'Geral' },"
)

# 2. Remover Doses Pediátricas da seção Pediatria
print("📝 Removendo Doses Pediátricas da seção 'Pediatria'...")
content = content.replace(
    "            { id: AppView.CALC_PEDIATRIC_DOSAGE, name: 'Doses Pediátricas', description: 'Dipirona, Paracetamol, etc.' },\n            { id: AppView.CALC_VACCINATION_SCHEDULE, name: 'Calendário Vacinal', description: 'Vacinas por Idade' },",
    "            { id: AppView.CALC_VACCINATION_SCHEDULE, name: 'Calendário Vacinal', description: 'Vacinas por Idade' },"
)

# 3. Adicionar nova categoria "Medicações" após "Odontologia e Outros"
print("✨ Criando nova categoria 'Medicações'...")

nova_categoria = """    },
    {
        id: 'medications',
        name: 'Medicações',
        icon: FlaskIcon,
        color: 'bg-purple-600',
        calculators: [
            { id: AppView.CALC_BULA_MEDICAMENTO, name: 'Bulas de Medicamentos', description: 'Consulta ANVISA' },
            { id: AppView.CALC_PEDIATRIC_DOSAGE, name: 'Doses Pediátricas', description: 'Dipirona, Paracetamol, etc.' },
            { id: AppView.CALC_DOSAGE, name: 'Dosagem Universal', description: 'Regra de três' },
        ]
    },
];"""

# Encontrar o final do array SPECIALTIES
old_end = """    },
];"""

if old_end in content:
    content = content.replace(old_end, nova_categoria)
    print("✅ Categoria 'Medicações' criada com sucesso!")
else:
    print("⚠️ Não foi possível adicionar a categoria")

# 4. Remover Dosagem Universal da seção "Enfermagem e Geriatria"
print("📝 Removendo Dosagem Universal da seção 'Enfermagem e Geriatria'...")
content = content.replace(
    "            { id: AppView.CALC_IV, name: 'Cálculo de Gotejamento', description: 'Gotas/min' },\n            { id: AppView.CALC_DOSAGE, name: 'Dosagem Universal', description: 'Regra de três' },",
    "            { id: AppView.CALC_IV, name: 'Cálculo de Gotejamento', description: 'Gotas/min' },"
)

# Salvar
with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print()
print("="*60)
print("✅ CONCLUÍDO!")
print("="*60)
print("\n💊 Nova categoria 'Medicações' criada!")
print("\n📋 Calculadoras incluídas:")
print("   1. Bulas de Medicamentos (Consulta ANVISA)")
print("   2. Doses Pediátricas (Dipirona, Paracetamol, etc.)")
print("   3. Dosagem Universal (Regra de três)")
print("\n🎨 Cor: Roxo (bg-purple-600)")
print("🔍 Ícone: FlaskIcon")

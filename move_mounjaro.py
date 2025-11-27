#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mover Mounjaro para categoria Medicações
"""

print("🔧 Movendo Mounjaro para Medicações...")

# Ler com encoding correto
with open('App.tsx', 'r', encoding='utf-16-le') as f:
    content = f.read()

# 1. Remover Mounjaro da categoria Nursing
print("📝 Removendo Mounjaro de Enfermagem...")
content = content.replace(
    "            { id: AppView.CALC_IV, name: 'Cálculo de Gotejamento', description: 'Gotas/min' },\n            { id: AppView.CALC_MOUNJARO, name: 'Fracionamento Mounjaro', description: 'Calcular dose fracionada' },",
    "            { id: AppView.CALC_IV, name: 'Cálculo de Gotejamento', description: 'Gotas/min' },"
)

# 2. Adicionar Mounjaro na categoria Medications
print("✨ Adicionando Mounjaro em Medicações...")
content = content.replace(
    "            { id: AppView.CALC_DOSAGE, name: 'Dosagem Universal', description: 'Regra de três' },\n        ]",
    "            { id: AppView.CALC_DOSAGE, name: 'Dosagem Universal', description: 'Regra de três' },\n            { id: AppView.CALC_MOUNJARO, name: 'Fracionamento Mounjaro', description: 'Calcular dose fracionada' },\n        ]"
)

# Salvar com encoding correto
with open('App.tsx', 'w', encoding='utf-16-le') as f:
    f.write(content)

print("✅ Mounjaro movido com sucesso!")

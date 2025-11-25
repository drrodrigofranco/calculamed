#!/usr/bin/env python3
"""
Add Batch 4 calculators to Obstetrics and Pediatrics specialties
"""

with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add BISHOP and HELLP to Obstetrics
old_obs = """        calculators: [
            { id: AppView.CALC_PREGNANCY, name: 'Idade Gestacional (DUM)', description: 'Data da Última Menstruação' },
            { id: AppView.CALC_PREGNANCY_USG, name: 'IG pelo Ultrassom', description: 'Correção pela USG', isPro: true },
        ]
    },
    {
        id: 'peds',"""

new_obs = """        calculators: [
            { id: AppView.CALC_PREGNANCY, name: 'Idade Gestacional (DUM)', description: 'Data da Última Menstruação' },
            { id: AppView.CALC_PREGNANCY_USG, name: 'IG pelo Ultrassom', description: 'Correção pela USG', isPro: true },
            { id: AppView.CALC_BISHOP, name: 'Bishop Score', description: 'Indução de Parto', isPro: true },
            { id: AppView.CALC_HELLP, name: 'HELLP Syndrome', description: 'Classificação', isPro: true },
        ]
    },
    {
        id: 'peds',"""

content = content.replace(old_obs, new_obs)

# 2. Add PED_GLASGOW, BALLARD, WESTLEY to Pediatrics
old_peds = """        calculators: [
            { id: AppView.CALC_PED_FLUIDS, name: 'Manutenção de Fluidos', description: 'Holliday-Segar' },
            { id: AppView.CALC_APGAR, name: 'Escore de APGAR', description: 'Recém-Nascido' },
            { id: AppView.CALC_PEDIATRIC_DOSAGE, name: 'Doses Pediátricas', description: 'Dipirona, Paracetamol, etc.' },
        ]
    },
    {
        id: 'emergency',"""

new_peds = """        calculators: [
            { id: AppView.CALC_PED_FLUIDS, name: 'Manutenção de Fluidos', description: 'Holliday-Segar' },
            { id: AppView.CALC_APGAR, name: 'Escore de APGAR', description: 'Recém-Nascido' },
            { id: AppView.CALC_PEDIATRIC_DOSAGE, name: 'Doses Pediátricas', description: 'Dipirona, Paracetamol, etc.' },
            { id: AppView.CALC_PED_GLASGOW, name: 'Glasgow Pediátrico', description: 'Consciência < 2 anos', isPro: true },
            { id: AppView.CALC_BALLARD, name: 'Ballard Score', description: 'Idade Gestacional RN' },
            { id: AppView.CALC_WESTLEY, name: 'Westley Croup', description: 'Gravidade Laringotraqueobronquite' },
        ]
    },
    {
        id: 'emergency',"""

content = content.replace(old_peds, new_peds)

with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Added Batch 4 calculators to specialties:")
print("   - Obstetrics: BISHOP, HELLP")
print("   - Pediatrics: PED_GLASGOW, BALLARD, WESTLEY")

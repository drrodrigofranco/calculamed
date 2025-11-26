#!/usr/bin/env python3
"""
Adicionar calculadora Mounjaro ao App.tsx de forma robusta
"""
import re

with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Adicionar import após PediatricDosageCalculator
import_pattern = r"(import PediatricDosageCalculator from './components/calculators/PediatricDosageCalculator';)"
import_replacement = r"\1\nimport MounjaroCalculator from './components/calculators/MounjaroCalculator';"
content = re.sub(import_pattern, import_replacement, content)

# 2. Adicionar case antes do DASHBOARD
case_pattern = r"(case AppView\.CALC_PHQ9: return <PHQ9Calculator />;)\s+(case AppView\.DASHBOARD:)"
case_replacement = r"\1\n            case AppView.CALC_MOUNJARO: return <MounjaroCalculator />;\n\n            \2"
content = re.sub(case_pattern, case_replacement, content)

with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ MounjaroCalculator integrado com sucesso!")
print("   - Import adicionado após PediatricDosageCalculator")
print("   - Case adicionado no renderContent antes do DASHBOARD")

#!/usr/bin/env python3
"""
Adicionar 'medications' ao SpecialtyId em types.ts
"""

print("🔧 Atualizando types.ts...")

with open('types.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Adicionar 'medications' ao tipo SpecialtyId
old_type = """export type SpecialtyId = 
  | 'nursing' 
  | 'cardio' 
  | 'nutrition' 
  | 'endo' 
  | 'nephro' 
  | 'obs' 
  | 'peds' 
  | 'emergency' 
  | 'pneumo' 
  | 'gastro' 
  | 'hema' 
  | 'neuro' 
  | 'surgery' 
  | 'dental';"""

new_type = """export type SpecialtyId = 
  | 'nursing' 
  | 'cardio' 
  | 'nutrition' 
  | 'endo' 
  | 'nephro' 
  | 'obs' 
  | 'peds' 
  | 'emergency' 
  | 'pneumo' 
  | 'gastro' 
  | 'hema' 
  | 'neuro' 
  | 'surgery' 
  | 'dental'
  | 'medications';"""

if old_type in content:
    content = content.replace(old_type, new_type)
    print("✅ 'medications' adicionado ao SpecialtyId")
else:
    print("⚠️ Não foi possível encontrar o tipo SpecialtyId")

with open('types.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ types.ts atualizado!")

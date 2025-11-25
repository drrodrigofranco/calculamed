#!/usr/bin/env python3
"""
Move Enfermagem para o topo da lista de especialidades
"""

with open('App.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Encontrar e extrair o bloco de Enfermagem
nursing_start = None
nursing_end = None
for i, line in enumerate(lines):
    if "id: 'nursing'," in line:
        nursing_start = i - 1  # Pegar a linha do {
        # Encontrar o final do bloco
        brace_count = 0
        for j in range(i - 1, len(lines)):
            if '{' in lines[j]:
                brace_count += lines[j].count('{')
            if '}' in lines[j]:
                brace_count -= lines[j].count('}')
            if brace_count == 0 and j > i:
                nursing_end = j + 1
                break
        break

if nursing_start and nursing_end:
    # Extrair o bloco de enfermagem
    nursing_block = lines[nursing_start:nursing_end]
    
    # Remover o bloco da posição original
    del lines[nursing_start:nursing_end]
    
    # Encontrar onde inserir (logo após "const SPECIALTIES: SpecialtyDef[] = [")
    for i, line in enumerate(lines):
        if 'const SPECIALTIES: SpecialtyDef[] = [' in line:
            # Inserir logo após esta linha
            lines[i+1:i+1] = nursing_block
            break
    
    # Salvar
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print("✅ Enfermagem movida para o topo da lista!")
else:
    print("❌ Não foi possível encontrar o bloco de Enfermagem")

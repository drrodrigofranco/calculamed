#!/usr/bin/env python3
"""
Corrigir cor do texto no input do BulaMedicamento
"""

print("🔧 Corrigindo BulaMedicamento.tsx...")

with open('components/calculators/BulaMedicamento.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Corrigir cor do texto do input
old_class = 'className="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"'
new_class = 'className="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-gray-900 placeholder-gray-400"'

if old_class in content:
    content = content.replace(old_class, new_class)
    print("✅ Cor do texto corrigida (agora preto)")
else:
    print("⚠️ Não encontrou a classe do input")

# 2. Melhorar mensagem de erro
old_error = "setError('Erro ao buscar medicamento. Tente novamente.');"
new_error = "setError('Não foi possível conectar à API da ANVISA. Tente novamente ou use os medicamentos populares abaixo.');"

if old_error in content:
    content = content.replace(old_error, new_error)
    print("✅ Mensagem de erro melhorada")
else:
    print("⚠️ Não encontrou a mensagem de erro")

with open('components/calculators/BulaMedicamento.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ Correções aplicadas!")
print("\n📝 Mudanças:")
print("  • Texto do input agora é preto (text-gray-900)")
print("  • Placeholder cinza claro (placeholder-gray-400)")
print("  • Mensagem de erro mais clara")

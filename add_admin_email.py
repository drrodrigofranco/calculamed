#!/usr/bin/env python3
"""
Adicionar kessysof@gmail.com à lista de admin bypass
"""

with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Substituir a linha do ADMIN_EMAILS
old_line = "                const ADMIN_EMAILS = ['rodrigo@ajudamediko.com.br'];"
new_line = "                const ADMIN_EMAILS = ['rodrigo@ajudamediko.com.br', 'kessysof@gmail.com'];"

content = content.replace(old_line, new_line)

with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Email kessysof@gmail.com adicionado à lista de admin bypass!")

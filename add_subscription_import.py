import re

# Ler o arquivo
with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Adicionar o import do SubscriptionManager após PatientManager
old_import = "import PatientManager from './components/PatientManager';"
new_import = "import PatientManager from './components/PatientManager';\nimport SubscriptionManager from './components/SubscriptionManager';"

new_content = content.replace(old_import, new_import)

# Salvar
with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Import adicionado com sucesso!")

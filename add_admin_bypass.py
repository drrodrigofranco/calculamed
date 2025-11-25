import re

# Ler o arquivo
with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Código para adicionar
admin_bypass_code = """                // ADMIN BYPASS: Email com acesso PRO gratuito
                const ADMIN_EMAILS = ['rodrigo@ajudamediko.com.br'];
                
                if (currentUser.email && ADMIN_EMAILS.includes(currentUser.email)) {
                    setIsPro(true);
                    setLoadingPro(false);
                }

"""

# Encontrar o local correto e inserir
pattern = r'(            if \(currentUser\) \{\r?\n)(                const q = query\()'
replacement = r'\1' + admin_bypass_code + r'\2'

new_content = re.sub(pattern, replacement, content)

# Salvar o arquivo
with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Admin Bypass adicionado com sucesso!")

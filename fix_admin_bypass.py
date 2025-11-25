import re

# Ler o arquivo
with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Código antigo que queremos substituir
old_code = """            if (currentUser) {
                // ADMIN BYPASS: Email com acesso PRO gratuito
                const ADMIN_EMAILS = ['rodrigo@ajudamediko.com.br'];
                
                if (currentUser.email && ADMIN_EMAILS.includes(currentUser.email)) {
                    setIsPro(true);
                    setLoadingPro(false);
                }

                const q = query(
                    collection(db, 'customers', currentUser.uid, 'subscriptions'),
                    where('status', 'in', ['active', 'trialing'])
                );

                const unsubscribeSubs = onSnapshot(q, (snapshot) => {
                    setIsPro(!snapshot.empty);
                    setLoadingPro(false);
                });"""

# Novo código com a correção
new_code = """            if (currentUser) {
                // ADMIN BYPASS: Email com acesso PRO gratuito
                const ADMIN_EMAILS = ['rodrigo@ajudamediko.com.br'];
                const isAdmin = currentUser.email && ADMIN_EMAILS.includes(currentUser.email);
                
                if (isAdmin) {
                    setIsPro(true);
                    setLoadingPro(false);
                }

                const q = query(
                    collection(db, 'customers', currentUser.uid, 'subscriptions'),
                    where('status', 'in', ['active', 'trialing'])
                );

                const unsubscribeSubs = onSnapshot(q, (snapshot) => {
                    // Só atualiza isPro se não for admin
                    if (!isAdmin) {
                        setIsPro(!snapshot.empty);
                        setLoadingPro(false);
                    }
                });"""

# Substituir
new_content = content.replace(old_code, new_code)

# Verificar se a substituição foi feita
if new_content == content:
    print("❌ ERRO: Código não encontrado para substituir!")
    print("Procurando por variações...")
else:
    # Salvar o arquivo
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("✅ Admin Bypass corrigido com sucesso!")
    print("Agora o status PRO não será sobrescrito pela verificação de assinatura.")

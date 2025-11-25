# ✅ Solução: Adicionar Domínio Autorizado

## 🎯 Problema Identificado

**Erro:** `auth/unauthorized-domain`  
**Causa:** O domínio `calculamed.com` não está na lista de domínios autorizados do Firebase.

## 🔧 Solução (2 minutos)

### Passo 1: Adicionar o Domínio

1. **Você já está na página correta!** (Authentication → Settings → Authorized domains)
2. Clique no botão **"Adicionar domínio"** (canto superior direito)
3. Digite: `calculamed.com`
4. Clique em **Adicionar**

### Passo 2: Adicionar Subdomínios (se necessário)

Se você usa subdomínios (ex: `www.calculamed.com`, `app.calculamed.com`), adicione também:
- `www.calculamed.com`
- Qualquer outro subdomínio que você usa

### Passo 3: Testar

1. Recarregue a página do Calculamed: `Ctrl + Shift + R`
2. Clique em **"Continuar com o Google"**
3. Deve funcionar agora! ✅

## 📋 Lista de Domínios Recomendados

Certifique-se de ter TODOS estes domínios autorizados:

- ✅ `localhost` (já está)
- ✅ `ajuda-saude-e0fd7.firebaseapp.com` (já está)
- ✅ `ajuda-saude-e0fd7.web.app` (já está)
- ✅ `calculamed.vercel.app` (já está)
- ⚠️ **`calculamed.com`** ← **ADICIONAR ESTE!**
- ⚠️ **`www.calculamed.com`** ← **ADICIONAR ESTE!** (se usar www)

## 🚨 Importante

> [!WARNING]
> Após adicionar o domínio, pode levar **alguns segundos** para propagar. Se não funcionar imediatamente, aguarde 30 segundos e tente novamente.

## ✅ Verificação Final

Após adicionar `calculamed.com`:
1. O domínio deve aparecer na lista com tipo "Custom"
2. Recarregue a aplicação
3. Tente fazer login com Google
4. Deve abrir o popup do Google normalmente

---

**Status:** Aguardando você adicionar o domínio no Firebase Console

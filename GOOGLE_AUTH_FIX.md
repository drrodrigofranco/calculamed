# 🔧 Guia de Correção: Erro ao Conectar com Google

## ⚠️ Problema
Ao clicar em "Continuar com o Google", aparece o erro: **"Erro ao conectar com Google"**

## 🔍 Diagnóstico

### 1. Verificar Configuração no Firebase Console

Acesse: [Firebase Console](https://console.firebase.google.com/project/ajuda-saude-e0fd7/authentication/providers)

**Passos:**
1. Vá para **Authentication** → **Sign-in method**
2. Procure por **Google** na lista de provedores
3. Verifique se está **ATIVADO** (enabled)

> [!IMPORTANT]
> Se o Google Sign-In não estiver ativado, este é o problema!

### 2. Ativar Google Sign-In

Se o Google não estiver ativado:

1. Clique em **Google** na lista de provedores
2. Clique no botão **Enable** (Ativar)
3. Preencha:
   - **Nome público do projeto**: `Ajuda Saúde` ou `CalculaMed`
   - **E-mail de suporte**: seu e-mail
4. Clique em **Salvar**

### 3. Verificar Domínios Autorizados

Ainda em **Authentication** → **Settings** → **Authorized domains**

**Certifique-se que estes domínios estão na lista:**
- `localhost`
- `ajuda-saude-e0fd7.firebaseapp.com`
- Seu domínio de produção (se houver)

> [!TIP]
> O `localhost` já deve estar autorizado por padrão, mas verifique!

## 🛠️ Soluções Alternativas

### Solução 1: Usar Redirect ao invés de Popup

Se o problema persistir, podemos mudar de popup para redirect:

```typescript
// Em Auth.tsx, linha 19
// ANTES:
await signInWithPopup(auth, googleProvider);

// DEPOIS:
await signInWithRedirect(auth, googleProvider);
```

### Solução 2: Verificar Bloqueio de Popup

1. Abra o DevTools (F12)
2. Vá para a aba **Console**
3. Tente fazer login novamente
4. Procure por mensagens de erro específicas

Erros comuns:
- `auth/popup-blocked` → Navegador bloqueou o popup
- `auth/configuration-not-found` → Google Sign-In não configurado
- `auth/unauthorized-domain` → Domínio não autorizado

## ✅ Teste Final

Após ativar o Google Sign-In:

1. Recarregue a página: `Ctrl + Shift + R` (hard reload)
2. Clique em **"Continuar com o Google"**
3. Deve abrir um popup do Google
4. Selecione sua conta Google
5. Autorize o acesso

## 📋 Checklist de Verificação

- [ ] Google Sign-In está **ATIVADO** no Firebase Console
- [ ] `localhost` está nos domínios autorizados
- [ ] Popup não está sendo bloqueado pelo navegador
- [ ] Console do navegador não mostra erros de CORS
- [ ] Configuração do Firebase está correta (apiKey, authDomain, etc.)

## 🆘 Ainda com Problemas?

Se o erro persistir, me envie:
1. Print da tela de **Authentication → Sign-in method**
2. Mensagem de erro completa do Console (F12)
3. Código de erro específico (ex: `auth/popup-blocked`)

---

**Projeto:** Calculamed / Ajuda Saúde  
**Firebase Project ID:** ajuda-saude-e0fd7  
**Auth Domain:** ajuda-saude-e0fd7.firebaseapp.com

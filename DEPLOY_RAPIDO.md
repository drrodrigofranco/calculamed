# ⚡ DEPLOY RÁPIDO - 10 MINUTOS

## 📋 PLANO DE AÇÃO (em ordem)

---

## ✅ PASSO 1: Revogue GitHub Token (2 min)

**URL**: https://github.com/settings/tokens

1. Procure por qualquer token antigo
2. Clique em **"Delete"**
3. Confirme

✅ **Feito!**

---

## ✅ PASSO 2: Configure GitHub Secrets (3 min)

**URL**: https://github.com/drrodrigofranco/calculamed/settings/secrets/actions

**Clique em "New repository secret" e adicione 3:**

### Secret 1:
```
Name:   VPS_HOST
Secret: [IP_DO_VPS]
```
Clique em "Add secret"

### Secret 2:
```
Name:   VPS_USER
Secret: [USUARIO_SSH]
```
Clique em "Add secret"

### Secret 3:
```
Name:   VPS_PASSWORD
Secret: [SUA_SENHA_SSH_DO_ROOT]
```
Clique em "Add secret"

✅ **Feito!**

---

## ✅ PASSO 3: Deploy no VPS (5 min)

### Conecte ao VPS:
```bash
ssh [USUARIO_SSH]@[IP_DO_VPS]
# Digite sua senha SSH quando solicitado
```

### Copie e cole este comando:
```bash
cd /home/claudeprojetos/crmclinica && \
git fetch origin && \
git checkout claude/crm-login-page-Fiyx2 && \
npm install && \
npm run build && \
cp -r dist/* public/ && \
echo "✅ DEPLOY CONCLUÍDO!" && \
ls -lh public/ | head -5
```

### OU execute o script:
```bash
cd /home/claudeprojetos/crmclinica
git fetch origin
git checkout claude/crm-login-page-Fiyx2
bash deploy.sh
```

✅ **Feito!**

---

## ✅ PASSO 4: Verifique (1 min)

### No navegador:
```
https://crm.calculamed.com
```

Se vir a tela de LOGIN → ✅ **SUCESSO!**

---

## 🔐 PASSO 5: Mude Senha SSH (depois)

```bash
ssh [USUARIO_SSH]@[IP_DO_VPS]
passwd root
# Digite nova senha (não compartilhe com ninguém!)
```

---

## 📊 CHECKLIST FINAL

- [ ] Token GitHub deletado
- [ ] 3 Secrets configurados no GitHub
- [ ] Deploy executado no VPS (comando ou script)
- [ ] CRM funcionando em crm.calculamed.com
- [ ] Senha SSH alterada

---

## 🚀 Pronto!

Seu CRM está funcionando em:
```
https://crm.calculamed.com
```

**Login de teste:**
```
Email: demo@test.com
Senha: 123456
```

---

## 📞 Se algo der errado:

1. Verifique se os Secrets estão configurados corretamente
2. Execute o comando de deploy manualmente
3. Verifique logs em: https://github.com/drrodrigofranco/calculamed/actions

---

**Tempo total: ~10 minutos**
**Dificuldade: ⭐ Muito fácil**
**Status: ✅ Pronto para usar**

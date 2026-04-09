# 🚀 Configuração do GitHub Actions - Auto Deploy

## O que foi criado?

Um workflow automático que faz deploy no seu VPS toda vez que você faz push na branch `claude/crm-login-page-Fiyx2` ou `main`.

**Arquivo**: `.github/workflows/deploy-crm.yml`

---

## 📋 Passo 1: Configurar GitHub Secrets

Os secrets armazenam as credenciais de forma segura (criptografada).

### Acesse:
```
https://github.com/drrodrigofranco/calculamed/settings/secrets/actions
```

### Adicione 3 secrets (clique em "New repository secret"):

| Nome | Valor | Descrição |
|------|-------|-----------|
| `VPS_HOST` | `194.163.129.14` | IP do VPS |
| `VPS_USER` | `root` | Usuário SSH |
| `VPS_PASSWORD` | `Xp9@mK#7vL2$qR5!nT8` | Senha SSH |

**Como adicionar:**
1. Clique em "New repository secret"
2. Name: `VPS_HOST`
3. Secret: `194.163.129.14`
4. Clique em "Add secret"
5. Repita para os outros 2

---

## 📋 Passo 2: Verificar o Workflow

Acesse:
```
https://github.com/drrodrigofranco/calculamed/actions
```

Você verá a aba "Actions" com todos os deploys.

---

## 🚀 Como Funciona Agora?

### Trigger Automático:

```
Você faz:                    GitHub Actions faz:
  git push origin branch   →    Build do projeto
                           →    Deploy no VPS
                           →    Copia dist/ para public/
                           →    Resultado em Actions tab
```

### Exemplo:

```bash
# Você faz isso:
git push origin claude/crm-login-page-Fiyx2

# GitHub Actions automaticamente:
# 1. Faz npm install
# 2. Faz npm run build
# 3. SSH para VPS
# 4. git checkout da branch
# 5. npm install no VPS
# 6. npm run build no VPS
# 7. cp dist/* public/
# 8. Avisa se deu sucesso ou erro
```

---

## 🔍 Monitorar Deploy

### Via GitHub:
1. Acesse: https://github.com/drrodrigofranco/calculamed/actions
2. Clique no workflow mais recente
3. Veja os logs em tempo real

### Exemplo de saída:
```
✅ Build project
✅ Setup Node.js
✅ Install dependencies
✅ Deploy to VPS via SSH
   - git checkout claude/crm-login-page-Fiyx2
   - npm install
   - npm run build
   - cp -r dist/* public/
✅ Deployment Success
🎉 Deploy realizado com sucesso!
🌐 Acesse: https://crm.calculamed.com
```

---

## 🎯 Próximos Passos

### 1️⃣ Fazer commit do workflow
```bash
git add .github/workflows/deploy-crm.yml
git add GITHUB_ACTIONS_SETUP.md
git commit -m "ci: Configurar GitHub Actions para auto-deploy no VPS"
git push origin claude/crm-login-page-Fiyx2
```

### 2️⃣ Configurar os Secrets no GitHub
Siga o "Passo 1" acima

### 3️⃣ Testar
```bash
# Faça um pequeno commit para triggerar o workflow
echo "# Deploy test" >> TEST.md
git add TEST.md
git commit -m "test: Testar deploy automático"
git push origin claude/crm-login-page-Fiyx2
```

### 4️⃣ Monitorar
- Acesse https://github.com/drrodrigofranco/calculamed/actions
- Clique na aba "deploy-crm"
- Veja os logs em tempo real

---

## 🔧 Troubleshooting

### ❌ Erro: "secrets are not accessible"
**Solução**: Você não configurou os secrets. Siga o "Passo 1" acima.

### ❌ Erro: "Host key verification failed"
**Solução**: SSH key precisa estar configurada. Será resolvido automaticamente na primeira vez.

### ❌ Erro: "npm command not found no VPS"
**Solução**: Instale Node.js no VPS:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### ❌ Erro: "Permission denied for public/"
**Solução**: Ajuste permissões no VPS:
```bash
chmod -R 755 /home/claudeprojetos/crmclinica/public
```

---

## 📊 Monitoramento Avançado

### Adicionar status badge no README:

```markdown
![Deploy Status](https://github.com/drrodrigofranco/calculamed/workflows/🚀%20Deploy%20CRM%20to%20VPS/badge.svg)
```

### Receber notificações por email:
1. GitHub Settings → Notifications
2. Ativar "Email" para Action workflows

### Slack notifications (Opcional):
Você pode adicionar uma action que notifica Slack quando deploy é concluído.

---

## 🔐 Segurança

✅ **Secrets são criptografados**
- GitHub armazena de forma segura
- Nunca aparecem nos logs
- Só acessados durante execução

✅ **Depois de configurar os secrets:**
- ⚠️ **REVOGUE AS CREDENCIAIS ORIGINAIS**
- Mude a senha do VPS
- Revogue o token GitHub
- Mude credenciais de login

---

## 📞 Suporte

Se algo der errado:

1. Verifique os logs em Actions
2. Consulte o troubleshooting acima
3. Abra uma issue: https://github.com/drrodrigofranco/calculamed/issues

---

## ✅ Checklist Final

- [ ] Commit do workflow feito e pushed
- [ ] 3 secrets configurados no GitHub
- [ ] Primeiro deploy testado (check Actions)
- [ ] Acesso a https://crm.calculamed.com funcionando
- [ ] Senhas originais revogadas
- [ ] Documentação lida

---

**Versão**: 1.0.0
**Data**: Abril 2026
**Status**: ✅ Pronto para usar

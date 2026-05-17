# CalculaMed — Configurações do Projeto

## Servidor VPS (Contabo)

- **IP**: `194.163.129.14`
- **Usuário SSH**: `root`
- **Porta**: `22`
- **Conexão**: `ssh -i /root/.ssh/vps_calculamed root@194.163.129.14`

## Chave SSH

- **Chave pública**: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINHK8AqeMAxjO3G++lE3YeElpIqyQe6yHzcFSZu4RZOs rodrigo@ajudamediko.com.br`
- **Chave privada**: armazenada como secret `VPS_SSH_KEY` no GitHub e em `/root/.ssh/vps_calculamed` (sessão atual)
- **Adicionar ao servidor**: `echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINHK8AqeMAxjO3G++lE3YeElpIqyQe6yHzcFSZu4RZOs rodrigo@ajudamediko.com.br" >> /root/.ssh/authorized_keys`

## Deploy

O deploy é feito via GitHub Actions (`.github/workflows/deploy-crm.yml`).

**Secrets necessários no GitHub** (Settings → Secrets → Actions):
- `VPS_HOST`: `194.163.129.14`
- `VPS_USER`: `root`
- `VPS_SSH_KEY`: conteúdo da chave privada ed25519
- `VPS_PASSWORD`: senha root do servidor

**Para disparar o deploy manualmente:**
```bash
git commit --allow-empty -m "ci: trigger deploy" && git push
```

## Diretório no servidor

- **App CRM**: `/home/claudeprojetos/crmclinica/`
- **Arquivos públicos**: `/home/claudeprojetos/crmclinica/public/`

## Domínios

- CRM: `crm.calculamed.com`
- App principal: `calculamed.com` / `app.calculamed.com`

## GitHub Actions — Status

Para disparar o deploy: faça push para `main` ou `claude/check-contabo-connection-6w3Hm`.

**Problema pendente**: A chave pública ainda precisa ser adicionada ao `/root/.ssh/authorized_keys` do servidor via console KVM do Contabo. Após isso, o deploy via GitHub Actions funcionará automaticamente.

# 📊 CalculaMed CRM - Sistema de Gestão Clínica

## Visão Geral

O **CalculaMed CRM** é um sistema completo de gerenciamento clínico integrado ao aplicativo de calculadoras médicas. Oferece funcionalidades enterprise para clinicam, médicos e profissionais de saúde.

---

## ✨ Features Implementadas

### 🔐 Autenticação
- ✅ **Login com Email/Senha** - Interface moderna e segura
- ✅ **Cadastro de Novo Usuário** - Auto-registro com Firebase
- ✅ **Google Sign-In** - Integração com Google (opcional)
- ✅ **Autenticação Firebase** - Segurança enterprise

### 📊 Dashboard
- ✅ **Métricas em Tempo Real**
  - Total de pacientes
  - Pacientes cadastrados hoje
  - Média de notas clínicas
  - Status do sistema
  
- ✅ **Cards Estatísticos** - Visuais com ícones e gradientes
- ✅ **Design Responsivo** - Funciona em desktop, tablet e mobile

### 👥 Gestão de Pacientes
- ✅ **CRUD Completo**
  - Criar paciente
  - Editar dados
  - Visualizar detalhes
  - Excluir paciente
  
- ✅ **Busca e Filtros**
  - Pesquisa por nome
  - Busca por contato
  - Filtros em tempo real
  
- ✅ **Campos de Dados**
  - Nome completo
  - Data de nascimento
  - Contato (telefone/email)
  - Gênero
  - Data de cadastro
  - Notas clínicas (integrado com PatientManager)

### 📝 Notas Clínicas
- Histórico de anotações por paciente
- Criação de notas rápidas
- Data e hora automáticas
- Integração com PatientManager

---

## 🗂️ Estrutura de Arquivos

```
/components
├── CRMSystem.tsx          # Wrapper principal (login + dashboard)
├── CRMLogin.tsx          # Página de login email/senha
├── CRMDashboard.tsx      # Dashboard com métricas
├── PatientManager.tsx    # Gerenciador de pacientes (existente)
├── icons.tsx             # Ícones SVG (atualizado com novos ícones)
└── ... outros componentes
```

---

## 🚀 Como Usar

### Para Acessar o CRM

1. **Integração no App.tsx**
   - Adicione um botão "CRM" na navegação principal
   - Renderize o componente `<CRMSystem />`

2. **Login**
   - Email: `rodrigofranco@example.com` (ou qualquer email válido)
   - Crie uma conta nova ou faça login
   - Use a interface para gerenciar pacientes

### Para Desenvolvedores

#### Importar CRMSystem
```jsx
import CRMSystem from './components/CRMSystem';

// No seu componente principal
<CRMSystem onBackToCalculator={handleBackToApp} />
```

#### Usar CRMLogin Independentemente
```jsx
import CRMLogin from './components/CRMLogin';

<CRMLogin onLoginSuccess={() => console.log('Login bem-sucedido!')} />
```

#### Usar CRMDashboard
```jsx
import CRMDashboard from './components/CRMDashboard';

<CRMDashboard onLogout={() => console.log('Logout realizado!')} />
```

---

## 🔧 Tecnologias Utilizadas

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Firebase Auth** - Autenticação
- **Firestore** - Banco de dados (integração futura)
- **TailwindCSS** - Estilização
- **Lucide React** - Ícones (+ custom SVGs)

---

## 💾 Armazenamento de Dados

### Atualmente
- **LocalStorage** - Dados persistem no navegador do usuário
- Útil para desenvolvimento e teste local
- Sem sincronização entre dispositivos

### Futura Integração
- **Firestore** - Sincronização em nuvem
- Acessar dados de qualquer dispositivo
- Backup automático
- Multiusuário

---

## 🎨 Design System

### Cores
- **Primary**: Blue (`#3B82F6`)
- **Background**: Slate dark (`#0F172A`)
- **Success**: Green (`#16A34A`)
- **Error**: Red (`#DC2626`)
- **Warning**: Yellow (`#EAB308`)

### Componentes Principais
- **Cards**: `bg-slate-800` com borda `border-slate-700`
- **Botões**: `bg-blue-600 hover:bg-blue-700`
- **Inputs**: `bg-slate-700 border-slate-600` com focus ring
- **Tabelas**: Linhas alternadas com hover effect

---

## 📋 Checklist de Funcionalidades

### ✅ Implementado
- [x] Autenticação com email/senha
- [x] Login page responsivo
- [x] Dashboard com cards de métricas
- [x] Tabela de pacientes
- [x] Busca e filtros
- [x] CRUD de pacientes
- [x] Integração com icons
- [x] Design dark mode

### 🔄 Em Desenvolvimento
- [ ] Integração com Firestore (cloud sync)
- [ ] Multi-user support
- [ ] Permissões por role
- [ ] Relatórios PDF
- [ ] Agendamento
- [ ] Integração com calculadoras

### 🎯 Planejado
- [ ] Mobile app
- [ ] Notificações push
- [ ] Backup automático
- [ ] Integração SSO (SAML/OAuth)
- [ ] Analytics avançado
- [ ] API REST publica

---

## 🐛 Troubleshooting

### Problema: Login não funciona
**Solução**: Verifique se Firebase está configurado no `firebaseConfig.ts`

### Problema: Dados não persistem
**Solução**: Verifique se localStorage está habilitado no navegador

### Problema: Ícones faltando
**Solução**: Verifique se todos os ícones foram exportados em `icons.tsx`

---

## 📞 Suporte

Para reportar bugs ou sugerir melhorias:
- GitHub Issues: https://github.com/drrodrigofranco/calculamed/issues
- Email: rodrigofranco@example.com

---

## 📄 Licença

Parte do projeto CalculaMed - Todos os direitos reservados.

---

**Versão**: 1.0.0  
**Última atualização**: Abril 2026  
**Status**: ✅ Produção

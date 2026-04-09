# 🚀 Setup do CRM - Guia de Implementação

## 1️⃣ Integração no App.tsx

Para adicionar o CRM ao seu aplicativo principal, siga estes passos:

### Importar o componente

```typescript
import CRMSystem from './components/CRMSystem';
```

### Adicionar ao estado da aplicação

No seu `App.tsx`, adicione um novo estado para controlar qual view está ativa:

```typescript
const [currentView, setCurrentView] = useState<'calculator' | 'crm'>('calculator');
```

### Renderizar condicional

```typescript
if (currentView === 'crm') {
  return <CRMSystem onBackToCalculator={() => setCurrentView('calculator')} />;
}

// ... resto do código do dashboard de calculadoras
```

### Adicionar botão de navegação

No menu principal ou header, adicione um botão para entrar no CRM:

```jsx
<button
  onClick={() => setCurrentView('crm')}
  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
>
  <BarChart3Icon className="w-5 h-5" />
  CRM
</button>
```

---

## 2️⃣ Configurações de Deploy

### Para seu servidor em `crm.calculamed.com`

#### Nginx Configuration

```nginx
server {
    listen 443 ssl;
    server_name crm.calculamed.com;

    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Variáveis de Ambiente (.env.local)

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Opcional: Para Google Sign-In
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 3️⃣ Credenciais de Teste

Use estas credenciais para testar o CRM:

**Email:** `demo@test.com`  
**Senha:** `123456`

Ou crie uma nova conta através da interface de signup.

---

## 4️⃣ Fluxo de Uso

### Primeiro Acesso

```
1. Clicar em "CRM" no menu principal
2. Página de login é exibida
3. Opções:
   - Fazer login (se já tem conta)
   - Criar conta nova (signup)
   - Login com Google (opcional)
```

### Dashboard

```
1. Após login: Dashboard com 4 cards (métricas)
2. Menu para "Novo Paciente"
3. Busca/filtro de pacientes
4. Tabela com todos os pacientes
```

### Gerenciar Pacientes

```
1. Clicar "Novo Paciente"
2. Preencher: Nome, Data Nascimento, Contato
3. Clicar "Adicionar"
4. Paciente aparece na tabela
5. Pode excluir se necessário
```

---

## 5️⃣ Estrutura de Dados (Firestore - Futura)

### Collection: `users`
```
{
  uid: "user-id",
  email: "user@email.com",
  createdAt: "2026-04-09T10:00:00Z",
  role: "clinician" | "admin" | "patient"
}
```

### Collection: `users/{uid}/patients`
```
{
  id: "patient-id",
  name: "João Silva",
  birthDate: "1990-01-15",
  contact: "11999999999",
  gender: "M" | "F" | "Other",
  notes: [
    {
      id: "note-id",
      date: "2026-04-09T10:00:00Z",
      content: "Paciente com queixa de febre..."
    }
  ],
  createdAt: "2026-04-08T10:00:00Z"
}
```

---

## 6️⃣ Features Planejadas para v2.0

- [ ] **Integração Firestore** - Sync cloud
- [ ] **Multi-user** - Equipes de clínicos
- [ ] **Permissões** - RBAC (roles)
- [ ] **Agendamento** - Calendar view
- [ ] **Relatórios** - PDF/Excel export
- [ ] **Integração Calculadoras** - Usar calculators dentro do CRM
- [ ] **Prescrições** - Criar receitas digitais
- [ ] **Histórico Clínico** - Timeline visual
- [ ] **Notificações** - Email/SMS para pacientes
- [ ] **Analytics** - Dashboard administrativo
- [ ] **Mobile App** - React Native
- [ ] **API REST** - Para integrações

---

## 7️⃣ Troubleshooting

### Problema: Página em branco após login
**Solução:** Verifique o console (F12) para ver se há erros de Firebase

### Problema: Dados não salvam
**Solução:** Verifique se localStorage está habilitado (Devtools > Application > Local Storage)

### Problema: Erro de CORS
**Solução:** Se usar API remota, configure headers apropriados no servidor

### Problema: Firebase config não carrega
**Solução:** Verifique `.env.local` e reinicie o dev server (`npm run dev`)

---

## 8️⃣ Performance & Otimizações

### Atual
- LocalStorage: Rápido mas limitado a ~5MB
- Sem sincronização entre abas

### Recomendações
- Adicione lazy loading para tabelas grandes
- Use React Query/SWR para Firestore
- Implemente virtual scrolling para >1000 pacientes
- Cache com IndexedDB para offline support

---

## 9️⃣ Segurança

### Checklist
- [x] Senha com visibility toggle
- [x] Validação de email
- [x] Firebase Auth (enterprise)
- [ ] 2FA (Two Factor Authentication)
- [ ] Rate limiting em login
- [ ] Audit log de ações
- [ ] Criptografia de dados sensíveis
- [ ] HIPAA compliance (se necessário)

### Recomendações
```javascript
// Adicione rate limiting
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const ATTEMPT_TIMEOUT = 15 * 60 * 1000; // 15 min

// Implemente audit logging
const logAction = (action, details) => {
  firebase.firestore()
    .collection('audit_logs')
    .add({
      action,
      details,
      userId: auth.currentUser?.uid,
      timestamp: new Date()
    });
};
```

---

## 🔟 Links Úteis

- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Tailwind CSS](https://tailwindcss.com/)
- [React 18 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📞 Suporte

Para problemas ou dúvidas:
- GitHub: https://github.com/drrodrigofranco/calculamed/issues
- Email: rodrigofranco@example.com

---

**Versão:** 1.0.0  
**Data:** Abril 2026  
**Status:** ✅ Ready to Deploy

import re

# Ler o arquivo
with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Adicionar o case SUBSCRIPTION_MANAGER no renderContent
old_case = """            case AppView.PRO_LOGIN: return <Auth onLogin={handleLoginSuccess} />;
            case AppView.NUTRITION_PRO: return <NutritionManager />;"""

new_case = """            case AppView.PRO_LOGIN: return <Auth onLogin={handleLoginSuccess} />;
            case AppView.SUBSCRIPTION_MANAGER: 
                return user ? <SubscriptionManager user={user} onBack={() => handleNavigate(AppView.DASHBOARD)} /> : null;
            case AppView.NUTRITION_PRO: return <NutritionManager />;"""

content = content.replace(old_case, new_case)

# 2. Substituir o botão "Gerenciar Assinatura" para usar a nova view
old_button = """                                {isPro ? (
                                    <button
                                        onClick={handleManageSubscription}
                                        className="text-xs bg-slate-700 hover:bg-slate-600 text-white py-1.5 rounded transition text-center"
                                    >
                                        Gerenciar Assinatura
                                    </button>
                                ) : ("""

new_button = """                                {isPro ? (
                                    <button
                                        onClick={() => handleNavigate(AppView.SUBSCRIPTION_MANAGER)}
                                        className="text-xs bg-slate-700 hover:bg-slate-600 text-white py-1.5 rounded transition text-center"
                                    >
                                        Gerenciar Assinatura
                                    </button>
                                ) : ("""

content = content.replace(old_button, new_button)

# Salvar
with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Alterações aplicadas com sucesso!")
print("   - Adicionado case SUBSCRIPTION_MANAGER no renderContent")
print("   - Botão 'Gerenciar Assinatura' agora navega para a página de gerenciamento")

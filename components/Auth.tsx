import React, { useState } from 'react';
import { CrownIcon, GoogleIcon } from './icons';
import { auth, googleProvider, db } from '../services/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
      setIsLoading(true);
      setError('');
      try {
          await signInWithPopup(auth, googleProvider);
          onLogin();
      } catch (err: any) { // Keep any for Firebase error object
          console.error("Erro ao conectar com Google:", err); // Conditional log
          let msg = "Erro ao conectar com Google.";
          if (err.code === 'auth/popup-closed-by-user') msg = "Login cancelado.";
          if (err.code === 'auth/configuration-not-found') msg = "Erro de configuração no Firebase.";
          setError(msg);
      } finally {
          setIsLoading(false);
      }
  };

  const createCheckoutSession = async () => {
      if (!auth.currentUser) {
          await handleGoogleLogin();
          return;
      }

      setIsLoading(true);
      setError('');
      
      try {
          const docRef = await addDoc(
              collection(db, "customers", auth.currentUser.uid, "checkout_sessions"), 
              {
                  price: "price_1SWlbpHVvxsNIRgOVxDIL6bW", // ✅ SEU PRICE ID CORRETO
                  success_url: window.location.origin,
                  cancel_url: window.location.origin,
                  allow_promotion_codes: true,
                  locale: 'pt-BR',
              }
          );

          const timeoutId = setTimeout(() => {
              setError("Tempo esgotado. Verifique se a extensão Stripe está ativa no Firebase.");
              setIsLoading(false);
          }, 30000);

          const unsubscribe = onSnapshot(docRef, (snap) => {
              const data = snap.data();
              
              if (!data) return;

              const { error: stripeError, url } = data;
              
              if (stripeError) {
                  clearTimeout(timeoutId);
                  console.error("Erro Stripe:", stripeError); // Conditional log
                  setError(`Erro no pagamento: ${stripeError.message || 'Tente novamente'}`);
                  setIsLoading(false);
                  unsubscribe();
              }
              
              if (url) {
                  clearTimeout(timeoutId);
                  window.location.assign(url);
              }
          });

      } catch (e: any) { // Keep any for generic catch
          console.error("Erro ao criar checkout:", e); // Conditional log
          setError(`Erro ao iniciar pagamento: ${e.message || 'Tente novamente mais tarde'}`);
          setIsLoading(false);
      }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("No momento, apenas o login com Google está ativado para segurança.");
  };

  return (
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CrownIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Área Premium Ajuda Saúde</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
                Desbloqueie acesso ilimitado às calculadoras mais avançadas e complexas do mercado.
                Ferramentas essenciais para UTI, Oncologia e Hepatologia.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CrownIcon className="w-5 h-5 text-yellow-400" />
                    Plano Profissional
                </h3>
                
                <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span className="text-slate-300">Acesso total a +40 calculadoras</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span className="text-slate-300">Ferramentas avançadas (Drogas Vasoativas, MELD)</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span className="text-slate-300">Login seguro com Google</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span className="text-slate-300">Suporte prioritário</span>
                    </li>
                </ul>

                <div className="pt-6 border-t border-slate-700">
                    <p className="text-sm text-slate-400 mb-1">A partir de</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">R$ 9,90</span>
                        <span className="text-slate-400">/mês</span>
                    </div>
                    <button 
                        onClick={createCheckoutSession} 
                        disabled={isLoading}
                        className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processando...
                            </>
                        ) : (
                            'Assinar Agora'
                        )}
                    </button>
                    <p className="text-xs text-center text-slate-500 mt-3">Cancelamento grátis a qualquer momento.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Já é assinante?</h3>
                
                <button 
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white font-semibold py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition mb-6 shadow-sm relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                         <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-700">
                             <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                         </div>
                    ) : (
                         <GoogleIcon className="w-5 h-5" />
                    )}
                    Continuar com o Google
                </button>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-slate-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">ou entre com e-mail</span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-4 border border-red-200 dark:border-red-800">
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailLogin} className="space-y-4 opacity-50 pointer-events-none">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">E-mail</label>
                        <input 
                            type="email" 
                            disabled
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg outline-none"
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Senha</label>
                        <input 
                            type="password" 
                            disabled
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <button type="submit" disabled className="w-full bg-slate-200 text-slate-500 font-bold py-3 rounded-lg transition shadow-md cursor-not-allowed">
                        Entrar
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <span className="text-xs text-slate-400">Login por e-mail desativado temporariamente.</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Auth;
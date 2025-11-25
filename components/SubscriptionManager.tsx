import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../services/firebaseConfig';
import { CrownIcon, ChevronLeftIcon } from './Icons';

interface SubscriptionManagerProps {
    user: User;
    onBack: () => void;
}

interface Subscription {
    id: string;
    status: string;
    current_period_end: { seconds: number };
    current_period_start: { seconds: number };
    cancel_at_period_end: boolean;
    items: Array<{
        price: {
            product: string;
            unit_amount: number;
            currency: string;
            interval: string;
        };
    }>;
}

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({ user, onBack }) => {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const q = query(
            collection(db, 'customers', user.uid, 'subscriptions'),
            where('status', 'in', ['active', 'trialing', 'past_due'])
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const subData = snapshot.docs[0].data() as Subscription;
                setSubscription({ ...subData, id: snapshot.docs[0].id });
            } else {
                setSubscription(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user.uid]);

    const handleManageSubscription = async () => {
        setActionLoading(true);
        try {
            const functionRef = httpsCallable(functions, 'ext-firestore-stripe-payments-createPortalLink');
            const { data } = await functionRef({ returnUrl: window.location.origin });
            const url = (data as { url: string }).url;
            window.location.assign(url);
        } catch (e) {
            console.error("Erro ao abrir portal", e);
            alert("Erro ao abrir portal de assinatura. Tente novamente.");
            setActionLoading(false);
        }
    };

    const formatDate = (seconds: number) => {
        return new Date(seconds * 1000).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatPrice = (amount: number, currency: string) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency.toUpperCase()
        }).format(amount / 100);
    };

    if (loading) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-6 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-medical-600 dark:hover:text-medical-400" onClick={onBack}>
                    <ChevronLeftIcon className="w-5 h-5" />
                    <span>Voltar</span>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-6 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-medical-600 dark:hover:text-medical-400" onClick={onBack}>
                <ChevronLeftIcon className="w-5 h-5" />
                <span>Voltar</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Gerenciar Assinatura</h2>

            {subscription ? (
                <div className="space-y-6">
                    {/* Status Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <CrownIcon className="w-6 h-6 text-yellow-500" />
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">Plano Profissional</h3>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Status: <span className={`font-semibold ${subscription.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {subscription.status === 'active' ? 'Ativa' : subscription.status === 'trialing' ? 'Período de teste' : 'Pendente'}
                                    </span>
                                </p>
                            </div>
                            {subscription.items && subscription.items[0] && (
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-slate-800 dark:text-white">
                                        {formatPrice(subscription.items[0].price.unit_amount, subscription.items[0].price.currency)}
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        por {subscription.items[0].price.interval === 'month' ? 'mês' : 'ano'}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Início do período:</span>
                                <span className="font-medium text-slate-800 dark:text-white">
                                    {formatDate(subscription.current_period_start.seconds)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Próxima cobrança:</span>
                                <span className="font-medium text-slate-800 dark:text-white">
                                    {formatDate(subscription.current_period_end.seconds)}
                                </span>
                            </div>
                            {subscription.cancel_at_period_end && (
                                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                        ⚠️ Sua assinatura será cancelada em {formatDate(subscription.current_period_end.seconds)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Manage Button */}
                    <button
                        onClick={handleManageSubscription}
                        disabled={actionLoading}
                        className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {actionLoading ? 'Abrindo portal...' : 'Gerenciar no Stripe'}
                    </button>

                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-2">O que você pode fazer:</h4>
                        <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            <li>✓ Atualizar método de pagamento</li>
                            <li>✓ Ver histórico de faturas</li>
                            <li>✓ Cancelar assinatura</li>
                            <li>✓ Baixar recibos</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center">
                    <CrownIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Nenhuma assinatura ativa</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Você não possui uma assinatura PRO ativa no momento.
                    </p>
                    <button
                        onClick={onBack}
                        className="bg-medical-600 hover:bg-medical-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                    >
                        Assinar Agora
                    </button>
                </div>
            )}
        </div>
    );
};

export default SubscriptionManager;

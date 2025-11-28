import React, { useState, useEffect } from 'react';
import { AppView, SpecialtyDef, SpecialtyId, CalculatorDef, NewsItem } from './types';
import BMICalculator from './components/calculators/BMICalculator';
import EGFRCalculator from './components/calculators/EGFRCalculator';
import CockcroftGaultCalculator from './components/calculators/CockcroftGaultCalculator';
import IVDropCalculator from './components/calculators/IVDropCalculator';
import PregnancyCalculator from './components/calculators/PregnancyCalculator';
import PregnancyUSGCalculator from './components/calculators/PregnancyUSGCalculator';
import LDLCalculator from './components/calculators/LDLCalculator';
import MAPCalculator from './components/calculators/MAPCalculator';
import WaterIntakeCalculator from './components/calculators/WaterIntakeCalculator';
import QTcCalculator from './components/calculators/QTcCalculator';
import GlasgowCalculator from './components/calculators/GlasgowCalculator';
import PediatricFluidCalculator from './components/calculators/PediatricFluidCalculator';
import BMRCalculator from './components/calculators/BMRCalculator';
import IdealWeightCalculator from './components/calculators/IdealWeightCalculator';
import BSACalculator from './components/calculators/BSACalculator';
import AnionGapCalculator from './components/calculators/AnionGapCalculator';
import CorrectedCalciumCalculator from './components/calculators/CorrectedCalciumCalculator';
import GlucoseConverter from './components/calculators/GlucoseConverter';
import ChildPughCalculator from './components/calculators/ChildPughCalculator';
import UnitConverter from './components/calculators/UnitConverter';
import SodiumCorrectionCalculator from './components/calculators/SodiumCorrectionCalculator';
import ParklandCalculator from './components/calculators/ParklandCalculator';
import BurnAreaCalculator from './components/calculators/BurnAreaCalculator';
import WellsPECalculator from './components/calculators/WellsPECalculator';
import CURB65Calculator from './components/calculators/CURB65Calculator';
import PaO2FiO2Calculator from './components/calculators/PaO2FiO2Calculator';
import VasoactiveDrugsCalculator from './components/calculators/VasoactiveDrugsCalculator';
import CHA2DS2VAScCalculator from './components/calculators/CHA2DS2VAScCalculator';
import HASBLEDCalculator from './components/calculators/HASBLEDCalculator';
import MELDCalculator from './components/calculators/MELDCalculator';
import AlvaradoCalculator from './components/calculators/AlvaradoCalculator';
import DosageCalculator from './components/calculators/DosageCalculator';
import APGARCalculator from './components/calculators/APGARCalculator';
import ANCCalculator from './components/calculators/ANCCalculator';
import PHQ9Calculator from './components/calculators/PHQ9Calculator';
import ProteinCalculator from './components/calculators/ProteinCalculator';
import TargetHeartRateCalculator from './components/calculators/TargetHeartRateCalculator';
import PediatricDosageCalculator from './components/calculators/PediatricDosageCalculator';
import VaccinationScheduleCalculator from './components/calculators/VaccinationScheduleCalculator';
import BulaMedicamento from './components/calculators/BulaMedicamento';
import MounjaroCalculator from './components/calculators/MounjaroCalculator';

import AdSpace from './components/AdSpace';
import Auth from './components/Auth';
import NutritionManager from './components/NutritionManager';
import NewsFeed from './components/NewsFeed';
import PatientManager from './components/PatientManager';

import { PrivacyPolicy, TermsOfUse, AboutUs } from './components/LegalDocs';
import { auth, db, functions } from './services/firebaseConfig';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, query, where, onSnapshot, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

import {
    CalculatorIcon,
    KidneyIcon,
    ChevronLeftIcon,
    BabyIcon,
    HeartPulseIcon,
    ScaleIcon,
    ChildIcon,
    LightningIcon,
    FlaskIcon,
    LiverIcon,
    SearchIcon,
    XIcon,
    LungsIcon,
    AjudaSaudeLogo,
    SirenIcon,
    BrainIcon,
    ScalpelIcon,
    BloodIcon,
    ElderIcon,
    ToothIcon,
    LockIcon,
    CrownIcon,
    AppleIcon,
    ActivityIcon,
    StarIcon,
    SunIcon,
    MoonIcon,
    UserIcon,
    UsersIcon
} from './components/icons';

enum LegalView {
    PRIVACY = 'PRIVACY',
    TERMS = 'TERMS',
    ABOUT = 'ABOUT'
}

type ExtendedView = AppView | LegalView;

const SPECIALTIES: SpecialtyDef[] = [
    {
        id: 'medications',
        name: 'Medicamentos e Farmácia',
        icon: FlaskIcon,
        color: 'bg-purple-600',
        calculators: [
            { id: AppView.CALC_BULA_MEDICAMENTO, name: 'Bulas de Medicamentos', description: 'Busca Local Offline' },
            { id: AppView.CALC_MOUNJARO, name: 'Fracionamento Mounjaro', description: 'Cálculo de volume para doses' },
            { id: AppView.CALC_PEDIATRIC_DOSAGE, name: 'Doses Pediátricas', description: 'Dipirona, Paracetamol, etc.' },
            { id: AppView.CALC_DOSAGE, name: 'Dosagem Universal', description: 'Regra de três' },
        ]
    },
    {
        id: 'cardio',
        name: 'Cardiologia e Vascular',
        icon: HeartPulseIcon,
        color: 'bg-rose-500',
        calculators: [
            { id: AppView.CALC_CHA2DS2_VASC, name: 'CHA₂DS₂-VASc', description: 'Risco AVC em FA' },
            { id: AppView.CALC_HAS_BLED, name: 'HAS-BLED', description: 'Risco de Sangramento', isPro: true },
            { id: AppView.CALC_MAP, name: 'Pressão Média (PAM)', description: 'Avaliação hemodinâmica' },
            { id: AppView.CALC_QTC, name: 'QT Corrigido', description: 'Fórmula de Bazett' },
        ]
    },
    {
        id: 'nutrition',
        name: 'Nutrição e Metabolismo',
        icon: ScaleIcon,
        color: 'bg-lime-600',
        calculators: [
            { id: AppView.CALC_BMI, name: 'IMC', description: '├ìndice de Massa Corporal' },
            { id: AppView.CALC_BMR, name: 'Taxa Metabólica', description: 'Harris-Benedict' },
            { id: AppView.CALC_PROTEIN, name: 'Ingestão de Proteína', description: 'Meta para Hipertrofia' },
            { id: AppView.CALC_HR_TARGET, name: 'Zona Alvo (FC)', description: 'Fórmula de Karvonen' },
            { id: AppView.CALC_IDEAL_WEIGHT, name: 'Peso Ideal', description: 'Fórmula de Devine' },
            { id: AppView.CALC_WATER, name: 'Hidratação Diária', description: 'Meta de água por peso' },
        ]
    },
    {
        id: 'endo',
        name: 'Endocrinologia',
        icon: FlaskIcon,
        color: 'bg-indigo-500',
        calculators: [
            { id: AppView.CALC_SODIUM_CORR, name: 'Correção Sódio', description: 'Na Hiperglicemia' },
            { id: AppView.CALC_LDL, name: 'LDL Calculado', description: 'Fórmula de Friedewald' },
            { id: AppView.CALC_GLUCOSE, name: 'Conversão Glicose', description: 'mg/dL → mmol/L' },
        ]
    },
    {
        id: 'nephro',
        name: 'Nefrologia e Urologia',
        icon: KidneyIcon,
        color: 'bg-blue-500',
        calculators: [
            { id: AppView.CALC_COCKCROFT, name: 'Clearance Creatinina', description: 'Cockcroft-Gault' },
            { id: AppView.CALC_EGFR, name: 'TFG (CKD-EPI)', description: 'Fórmula Atual (2021)' },
            { id: AppView.CALC_ANION_GAP, name: 'Anion Gap', description: 'Acidose Metabólica' },
        ]
    },
    {
        id: 'obs',
        name: 'Obstetrícia e Gineco',
        icon: BabyIcon,
        color: 'bg-pink-500',
        calculators: [
            { id: AppView.CALC_PREGNANCY, name: 'Idade Gestacional (DUM)', description: 'Data da ├Ültima Menstruação' },
            { id: AppView.CALC_PREGNANCY_USG, name: 'IG pelo Ultrassom', description: 'Correção pela USG', isPro: true },
        ]
    },
    {
        id: 'peds',
        name: 'Pediatria',
        icon: ChildIcon,
        color: 'bg-orange-500',
        calculators: [
            { id: AppView.CALC_PED_FLUIDS, name: 'Manutenção de Fluidos', description: 'Holliday-Segar' },
            { id: AppView.CALC_APGAR, name: 'Escore de APGAR', description: 'Recém-Nascido' },
            { id: AppView.CALC_PEDIATRIC_DOSAGE, name: 'Doses Pediátricas', description: 'Dipirona, Paracetamol, etc.' },
            { id: AppView.CALC_VACCINATION, name: 'Calendário Vacinal', description: 'PNI 2024' },
        ]
    },
    {
        id: 'emergency',
        name: 'Emergência, Trauma e UTI',
        icon: SirenIcon,
        color: 'bg-red-600',
        calculators: [
            { id: AppView.CALC_GLASGOW, name: 'Escala de Glasgow', description: 'Coma e Consciência' },
            { id: AppView.CALC_BURN_AREA, name: 'SCQ (Regra dos 9)', description: '├ürea Queimada', isPro: true },
            { id: AppView.CALC_PARKLAND, name: 'Fórmula de Parkland', description: 'Hidratação Queimados' },
            { id: AppView.CALC_WELLS_PE, name: 'Escore de Wells', description: 'Risco de TEP' },
            { id: AppView.CALC_VASOACTIVE, name: 'Drogas Vasoativas', description: 'Noradrenalina, Sedação, etc', isPro: true },
        ]
    },
    {
        id: 'pneumo',
        name: 'Ventilação e Pneumo',
        icon: LungsIcon,
        color: 'bg-sky-500',
        calculators: [
            { id: AppView.CALC_PAO2_FIO2, name: 'Relação P/F', description: 'Critério de Berlim (SDRA)' },
            { id: AppView.CALC_CURB65, name: 'CURB-65', description: 'Pneumonia Adquirida' },
        ]
    },
    {
        id: 'gastro',
        name: 'Gastro e Hepatologia',
        icon: LiverIcon,
        color: 'bg-amber-600',
        calculators: [
            { id: AppView.CALC_CHILD_PUGH, name: 'Escore Child-Pugh', description: 'Cirrose Hepática' },
            { id: AppView.CALC_MELD, name: 'MELD Score', description: 'Transplante Hepático', isPro: true },
        ]
    },
    {
        id: 'hema',
        name: 'Hematologia e Onco',
        icon: BloodIcon,
        color: 'bg-rose-700',
        calculators: [
            { id: AppView.CALC_CORR_CALCIUM, name: 'Cálcio Corrigido', description: 'Pela Albumina' },
            { id: AppView.CALC_ANC, name: 'Neutrófilos Absolutos', description: 'Risco Infeccioso', isPro: true },
            { id: AppView.CALC_BSA, name: 'Superfície Corporal', description: 'Doses de Quimioterapia' },
        ]
    },
    {
        id: 'neuro',
        name: 'Neurologia e Psiquiatria',
        icon: BrainIcon,
        color: 'bg-violet-600',
        calculators: [
            { id: AppView.CALC_GLASGOW, name: 'Escala de Glasgow', description: 'Nível de Consciência' },
            { id: AppView.CALC_PHQ9, name: 'PHQ-9', description: 'Rastreio de Depressão' },
        ]
    },
    {
        id: 'surgery',
        name: 'Cirurgia e Anestesia',
        icon: ScalpelIcon,
        color: 'bg-teal-600',
        calculators: [
            { id: AppView.CALC_ALVARADO, name: 'Escore de Alvarado', description: 'Apendicite Aguda' },
        ]
    },
    {
        id: 'nursing',
        name: 'Enfermagem e Geriatria',
        icon: ElderIcon,
        color: 'bg-emerald-600',
        calculators: [
            { id: AppView.CALC_IV, name: 'Cálculo de Gotejamento', description: 'Gotas/min' },
            { id: AppView.CALC_DOSAGE, name: 'Dosagem Universal', description: 'Regra de três' },
        ]
    },
    {
        id: 'dental',
        name: 'Odontologia e Outros',
        icon: ToothIcon,
        color: 'bg-slate-500',
        calculators: [
            { id: AppView.CALC_CONVERTER, name: 'Conversor de Unidades', description: 'Geral' },
        ]
    },
];

interface DashboardProps {
    onSelectSpecialty: (id: SpecialtyId) => void;
    onNavigate: (view: ExtendedView) => void;
    favorites: string[];
    onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectSpecialty, onNavigate, favorites, onToggleFavorite }) => {

    const favoriteCalculators = SPECIALTIES.flatMap(s => s.calculators.map(c => ({ ...c, specialtyName: s.name })))
        .filter(c => favorites.includes(c.id));

    return (
        <div className="pb-10">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Bem-vindo ao Ajuda Saúde</h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
                    Acesse rapidamente as ferramentas essenciais para sua prática clínica.
                    Organizadas por especialidade para facilitar o seu plantão.
                </p>
            </div>

            {favoriteCalculators.length > 0 && (
                <div className="mb-10 animate-fade-in">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <StarIcon className="w-5 h-5 text-yellow-500" filled />
                        Suas Ferramentas Favoritas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favoriteCalculators.map(calc => (
                            <div
                                key={calc.id}
                                onClick={() => onNavigate(calc.id)}
                                className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-medical-300 dark:hover:border-medical-500 hover:shadow-md transition flex justify-between items-start group"
                            >
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">{calc.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{calc.specialtyName}</p>
                                </div>
                                <button
                                    onClick={(e) => onToggleFavorite(calc.id, e)}
                                    className="text-yellow-400 hover:scale-110 transition"
                                >
                                    <StarIcon className="w-5 h-5" filled />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Especialidades</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SPECIALTIES.map((spec) => {
                    const IconComponent = spec.icon;

                    return (
                        <div
                            key={spec.id}
                            onClick={() => onSelectSpecialty(spec.id)}
                            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md hover:border-medical-200 dark:hover:border-medical-500 transition group flex flex-col h-full relative"
                        >
                            <div className={`w-12 h-12 ${spec.color} rounded-xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <IconComponent className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{spec.name}</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">{spec.calculators.length} Calculadoras</p>
                            <div className="mt-auto flex -space-x-2 overflow-hidden mb-3">
                                {spec.calculators.slice(0, 3).map((_calc, i) => ( // Use _calc to avoid unused variable warning
                                    <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] text-slate-400 dark:text-slate-300 font-bold">
                                        <LightningIcon className="w-3 h-3" />
                                    </div>
                                ))}
                                {spec.calculators.length > 3 && (
                                    <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                                        +
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center text-medical-600 dark:text-medical-400 font-medium text-xs">
                                Explorar <ChevronLeftIcon className="rotate-180 w-3 h-3 ml-1" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                <h3>Calculadoras Médicas Profissionais</h3>
                <p>
                    O <strong>Ajuda Saúde</strong> é uma referência gratuita para profissionais de saúde, oferecendo acesso rápido a fórmulas complexas e escores clínicos.
                    Nossa plataforma garante precisão em cálculos fundamentais para UTI, Emergência, Pediatria e diversas especialidades.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-white">Ferramentas de Destaque</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li><strong>Drogas Vasoativas:</strong> Cálculo preciso de vazão e dose para Noradrenalina e outros.</li>
                            <li><strong>Nefrologia:</strong> Estimativa de TFG (CKD-EPI) e ajustes renais.</li>
                            <li><strong>Emergência:</strong> Escala de Glasgow, Parkland para queimados e Anion Gap.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-white">Por que usar?</h4>
                        <p className="text-sm">
                            Economize tempo durante o atendimento com uma interface limpa, livre de distrações e otimizada para dispositivos móveis.
                            Todas as fórmulas são revisadas com base nas diretrizes médicas mais recentes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface CategoryViewProps {
    specialtyId: SpecialtyId;
    onSelectCalc: (view: ExtendedView) => void;
    isPro: boolean;
    favorites: string[];
    onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ specialtyId, onSelectCalc, isPro, favorites, onToggleFavorite }) => {
    const specialty = SPECIALTIES.find(s => s.id === specialtyId);

    if (!specialty) return <div>Especialidade não encontrada</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 ${specialty.color} rounded-2xl flex items-center justify-center shadow-md`}>
                    <specialty.icon className="w-10 h-10 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{specialty.name}</h2>
                    <p className="text-slate-500 dark:text-slate-300">Selecione uma ferramenta abaixo</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialty.calculators.map((calc) => {
                    const locked = calc.isPro && !isPro;
                    const isFav = favorites.includes(calc.id);
                    return (
                        <div
                            key={calc.id}
                            onClick={() => onSelectCalc(calc.id)}
                            className={`bg-white dark:bg-slate-800 p-5 rounded-lg border shadow-sm transition flex items-center justify-between group cursor-pointer ${locked ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/20' : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-medical-300 dark:hover:border-medical-500'}`}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className={`font-bold ${locked ? 'text-slate-600 dark:text-slate-300' : 'text-slate-800 dark:text-white'}`}>{calc.name}</h3>
                                    {calc.isPro && (
                                        <div className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-yellow-200 dark:border-yellow-700 flex items-center gap-1">
                                            <CrownIcon className="w-3 h-3" /> PRO
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{calc.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => onToggleFavorite(calc.id, e)}
                                    className={`p-2 rounded-full transition hover:bg-slate-100 dark:hover:bg-slate-700 ${isFav ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-400'}`}
                                    title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                >
                                    <StarIcon className="w-5 h-5" filled={isFav} />
                                </button>
                                <div className={`p-2 rounded-full transition ${locked ? 'bg-slate-100 dark:bg-slate-700' : 'bg-slate-50 dark:bg-slate-700 group-hover:bg-medical-50 dark:group-hover:bg-medical-900'}`}>
                                    {locked ? (
                                        <LockIcon className="w-5 h-5 text-slate-400" />
                                    ) : (
                                        <ChevronLeftIcon className="w-5 h-5 text-slate-400 group-hover:text-medical-600 dark:group-hover:text-medical-400 rotate-180 transition" />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>
                    As calculadoras de <strong>{specialty.name}</strong> são ferramentas de apoio ├á decisão clínica.
                    Certifique-se de validar os dados de entrada antes de aplicar os resultados no cuidado ao paciente.
                </p>
            </div>
        </div>
    );
}

const App: React.FC = () => {
    const [view, setView] = useState<ExtendedView>(AppView.DASHBOARD);
    const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<SpecialtyId | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    const [isPro, setIsPro] = useState(false);
    const [loadingPro, setLoadingPro] = useState(true);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                return storedTheme as 'light' | 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const q = query(
                    collection(db, 'customers', currentUser.uid, 'subscriptions'),
                    where('status', 'in', ['active', 'trialing'])
                );

                const unsubscribeSubs = onSnapshot(q, (snapshot) => {
                    setIsPro(!snapshot.empty);
                    setLoadingPro(false);
                });

                try {
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists() && userDocSnap.data()?.favorites) {
                        setFavorites(userDocSnap.data()?.favorites);
                    }
                } catch (e) {
                    console.error("Erro ao carregar favoritos", e);
                }

                return () => unsubscribeSubs();
            } else {
                setIsPro(false);
                setFavorites([]);
                setLoadingPro(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLoginSuccess = () => {
        setView(AppView.DASHBOARD);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setView(AppView.DASHBOARD);
        } catch (error) {
            console.error("Erro ao sair", error);
        }
    }

    const handleManageSubscription = async () => {
        try {
            const functionRef = httpsCallable(functions, 'ext-firestore-stripe-payments-createPortalLink');
            const { data } = await functionRef({ returnUrl: window.location.origin });
            const url = (data as { url: string }).url; // Explicitly cast to ensure 'url' property
            window.location.assign(url);
        } catch (e) {
            console.error("Erro ao abrir portal", e);
            alert("Erro ao abrir portal de assinatura. Tente novamente.");
        }
    };

    const handleToggleFavorite = async (calcId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) {
            handleNavigate(AppView.PRO_LOGIN);
            return;
        }

        const isFav = favorites.includes(calcId);
        const newFavorites = isFav
            ? favorites.filter(id => id !== calcId)
            : [...favorites, calcId];

        setFavorites(newFavorites);

        try {
            const userDocRef = doc(db, 'users', user.uid);
            if (isFav) {
                await updateDoc(userDocRef, { favorites: arrayRemove(calcId) });
            } else {
                await setDoc(userDocRef, { favorites: arrayUnion(calcId) }, { merge: true });
            }
        } catch (error) {
            console.error("Erro ao salvar favorito", error);
            setFavorites(favorites); // Revert on error
        }
    };

    const handleNavigate = (targetView: ExtendedView) => {
        if (Object.values(AppView).includes(targetView as AppView)) {
            const targetCalc = SPECIALTIES.flatMap(s => s.calculators).find(c => c.id === targetView);
            if (targetCalc?.isPro && !isPro && !user) {
                setView(AppView.PRO_LOGIN);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            } else if (targetCalc?.isPro && !isPro && user) {
                alert("Esta calculadora é exclusiva para assinantes PRO.");
                return;
            }
        }

        setView(targetView);
        setSearchQuery('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSelectSpecialty = (id: SpecialtyId) => {
        setSelectedSpecialtyId(id);
        setView(AppView.CATEGORY_VIEW);
        setSearchQuery('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        if (view === AppView.NUTRITION_PRO || view === AppView.NEWS || view === AppView.PATIENTS_LIST) {
            setView(AppView.DASHBOARD);
        } else if (view === AppView.CATEGORY_VIEW) {
            setView(AppView.DASHBOARD);
            setSelectedSpecialtyId(null);
        } else if (view !== AppView.DASHBOARD) {
            if (selectedSpecialtyId && Object.values(AppView).includes(view as AppView)) {
                setView(AppView.CATEGORY_VIEW);
            } else {
                setView(AppView.DASHBOARD);
                setSelectedSpecialtyId(null);
            }
        }
    };

    const filteredCalculators = searchQuery
        ? SPECIALTIES.flatMap(s => s.calculators.map(c => ({ ...c, specialtyName: s.name })))
            .filter(c =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.specialtyName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        : [];

    const renderContent = () => {
        switch (view) {
            case AppView.CATEGORY_VIEW:
                return selectedSpecialtyId ? (
                    <CategoryView
                        specialtyId={selectedSpecialtyId}
                        onSelectCalc={handleNavigate}
                        isPro={isPro}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ) : <Dashboard onSelectSpecialty={handleSelectSpecialty} onNavigate={handleNavigate} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;

            case AppView.PRO_LOGIN: return <Auth onLogin={handleLoginSuccess} />;
            case AppView.NUTRITION_PRO: return <NutritionManager />;
            // case AppView.NEWS: return <NewsFeed />; // Desabilitado para evitar erros/seguir pedidos anteriores
            // case AppView.PATIENTS_LIST: return <PatientManager onBack={() => handleNavigate(AppView.DASHBOARD)} />; // Desabilitado

            case LegalView.PRIVACY: return <PrivacyPolicy />;
            case LegalView.TERMS: return <TermsOfUse />;
            case LegalView.ABOUT: return <AboutUs />;

            case AppView.CALC_BMI: return <BMICalculator />;
            case AppView.CALC_EGFR: return <EGFRCalculator />;
            case AppView.CALC_COCKCROFT: return <CockcroftGaultCalculator />;
            case AppView.CALC_IV: return <IVDropCalculator />;
            case AppView.CALC_PREGNANCY: return <PregnancyCalculator />;
            case AppView.CALC_PREGNANCY_USG: return <PregnancyUSGCalculator />;
            case AppView.CALC_LDL: return <LDLCalculator />;
            case AppView.CALC_MAP: return <MAPCalculator />;
            case AppView.CALC_WATER: return <WaterIntakeCalculator />;
            case AppView.CALC_QTC: return <QTcCalculator />;
            case AppView.CALC_GLASGOW: return <GlasgowCalculator />;
            case AppView.CALC_PED_FLUIDS: return <PediatricFluidCalculator />;
            case AppView.CALC_PEDIATRIC_DOSAGE: return <PediatricDosageCalculator />;
            case AppView.CALC_BMR: return <BMRCalculator />;
            case AppView.CALC_PROTEIN: return <ProteinCalculator />;
            case AppView.CALC_HR_TARGET: return <TargetHeartRateCalculator />;
            case AppView.CALC_IDEAL_WEIGHT: return <IdealWeightCalculator />;
            case AppView.CALC_BSA: return <BSACalculator />;
            case AppView.CALC_ANION_GAP: return <AnionGapCalculator />;
            case AppView.CALC_CORR_CALCIUM: return <CorrectedCalciumCalculator />;
            case AppView.CALC_GLUCOSE: return <GlucoseConverter />;
            case AppView.CALC_CHILD_PUGH: return <ChildPughCalculator />;
            case AppView.CALC_CONVERTER: return <UnitConverter />;
            case AppView.CALC_SODIUM_CORR: return <SodiumCorrectionCalculator />;
            case AppView.CALC_PARKLAND: return <ParklandCalculator />;
            case AppView.CALC_BURN_AREA: return <BurnAreaCalculator />;
            case AppView.CALC_WELLS_PE: return <WellsPECalculator />;
            case AppView.CALC_CURB65: return <CURB65Calculator />;
            case AppView.CALC_PAO2_FIO2: return <PaO2FiO2Calculator />;
            case AppView.CALC_VASOACTIVE: return <VasoactiveDrugsCalculator />;
            case AppView.CALC_CHA2DS2_VASC: return <CHA2DS2VAScCalculator />;
            case AppView.CALC_HAS_BLED: return <HASBLEDCalculator />;
            case AppView.CALC_MELD: return <MELDCalculator />;
            case AppView.CALC_ALVARADO: return <AlvaradoCalculator />;
            case AppView.CALC_BULA_MEDICAMENTO: return <BulaMedicamento onNavigate={handleNavigate} />;
            case AppView.CALC_MOUNJARO: return <MounjaroCalculator />;
            case AppView.CALC_PEDIATRIC_DOSAGE: return <PediatricDosageCalculator />;
            case AppView.CALC_VACCINATION: return <VaccinationScheduleCalculator onNavigate={handleNavigate} />;
            case AppView.CALC_DOSAGE: return <DosageCalculator />;
            case AppView.CALC_APGAR: return <APGARCalculator />;
            case AppView.CALC_ANC: return <ANCCalculator />;
            case AppView.CALC_PHQ9: return <PHQ9Calculator />;

            case AppView.DASHBOARD:
            default:
                return <Dashboard onSelectSpecialty={handleSelectSpecialty} onNavigate={handleNavigate} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
        }
    };

    const getHeaderTitle = () => {
        if (view === AppView.DASHBOARD) return 'Início';
        if (view === AppView.PRO_LOGIN) return 'Assinatura';
        if (view === AppView.NUTRITION_PRO) return 'Nutrition Calc';
        if (view === AppView.NEWS) return 'Notícias Médicas';
        if (view === AppView.PATIENTS_LIST) return 'Meus Pacientes';
        if (Object.values(LegalView).includes(view as LegalView)) return 'Institucional';
        if (view === AppView.CATEGORY_VIEW && selectedSpecialtyId) {
            return SPECIALTIES.find(s => s.id === selectedSpecialtyId)?.name || 'Categoria';
        }
        const currentCalc = SPECIALTIES.flatMap(s => s.calculators).find(c => c.id === view);
        return currentCalc?.name || 'Calculadora';
    };

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={`min-h-screen flex flex-col md:flex-row ${theme === 'dark' ? 'dark' : ''}`}>
            <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col z-30 shadow-lg md:shadow-none">
                <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate(AppView.DASHBOARD)}>
                        <AjudaSaudeLogo className="w-9 h-9" />
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight leading-none">
                                Ajuda<span className="text-medical-500">Saúde</span>
                            </h1>
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block mt-1">Calculadoras da Saúde</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-slate-800 border-b border-slate-700">
                    {loadingPro ? (
                        <div className="flex items-center justify-center py-2">
                            <div className="w-5 h-5 border-2 border-medical-200 border-t-medical-600 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        user ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-slate-500" />
                                    ) : (
                                        <div className="bg-slate-600 p-1 rounded-full">
                                            <UserIcon className="w-4 h-4 text-slate-300" />
                                        </div>
                                    )}
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-bold text-white truncate w-32">{user.displayName || 'Usuário'}</p>
                                        <p className={`text-[10px] ${isPro ? 'text-green-400 font-bold' : 'text-slate-400'}`}>
                                            {isPro ? 'Assinante PRO' : 'Plano Grátis'}
                                        </p>
                                    </div>
                                </div>

                                {isPro ? (
                                    <button
                                        onClick={handleManageSubscription}
                                        className="text-xs bg-slate-700 hover:bg-slate-600 text-white py-1.5 rounded transition text-center"
                                    >
                                        Gerenciar Assinatura
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleNavigate(AppView.PRO_LOGIN)}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-slate-900 font-bold py-2 rounded text-sm transition"
                                    >
                                        <CrownIcon className="w-4 h-4" />
                                        Virar PRO
                                    </button>
                                )}

                                <button onClick={handleLogout} className="text-xs text-slate-400 hover:text-white underline text-left">Sair</button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleNavigate(AppView.PRO_LOGIN)}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-slate-900 font-bold py-2 rounded text-sm transition"
                            >
                                <CrownIcon className="w-4 h-4" />
                                Seja Pro
                            </button>
                        )
                    )}
                </div>

                <nav className="p-4 space-y-2 flex-grow overflow-y-auto">
                    <button
                        onClick={() => { setView(AppView.DASHBOARD); setSelectedSpecialtyId(null); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${view === AppView.DASHBOARD && !selectedSpecialtyId ? 'bg-medical-600 text-white shadow-lg shadow-medical-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <div className="w-5 h-5"><CalculatorIcon /></div>
                        <span className="font-medium">Início</span>
                    </button>

                    {/* <button
            onClick={() => handleNavigate(AppView.NEWS)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${view === AppView.NEWS ? 'bg-medical-600 text-white shadow-lg shadow-medical-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <div className="w-5 h-5"><ActivityIcon /></div>
            <span className="font-medium">Notícias Médicas</span>
          </button> */}

                    {/* <button
            onClick={() => handleNavigate(AppView.PATIENTS_LIST)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${view === AppView.PATIENTS_LIST ? 'bg-medical-600 text-white shadow-lg shadow-medical-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <div className="w-5 h-5"><UsersIcon /></div>
            <span className="font-medium">Meus Pacientes</span>
          </button> */}

                    <button
                        onClick={() => { handleNavigate(AppView.NUTRITION_PRO); setSelectedSpecialtyId(null); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${view === AppView.NUTRITION_PRO ? 'bg-medical-600 text-white shadow-lg shadow-medical-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <div className="w-5 h-5"><AppleIcon /></div>
                        <span className="font-medium">Nutrition Calc</span>
                    </button>

                    <div className="pt-4 pb-2">
                        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Especialidades</p>
                    </div>
                    {SPECIALTIES.map(spec => (
                        <button
                            key={spec.id}
                            onClick={() => handleSelectSpecialty(spec.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm ${selectedSpecialtyId === spec.id ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                        >
                            <spec.icon className="w-4 h-4" />
                            <span>{spec.name}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 h-screen overflow-y-auto relative flex flex-col bg-slate-50 dark:bg-slate-800">
                <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 md:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        {view !== AppView.DASHBOARD && (
                            <button onClick={handleBack} className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
                                <ChevronLeftIcon className="text-slate-600 dark:text-slate-300" />
                            </button>
                        )}
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-white hidden md:block">
                            {getHeaderTitle()}
                        </h2>

                        {view === AppView.DASHBOARD && (
                            <div className="md:hidden flex items-center gap-2">
                                <AjudaSaudeLogo className="w-6 h-6" />
                                <span className="font-bold text-slate-800 dark:text-white">Ajuda Saúde</span>
                            </div>
                        )}

                        <div className="relative max-w-md w-full ml-2 md:ml-8">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-full leading-5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-medical-500 focus:border-medical-500 sm:text-sm transition"
                                    placeholder="Buscar calculadora..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    >
                                        <XIcon className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                                    </button>
                                )}
                            </div>

                            {searchQuery && (
                                <div className="absolute mt-1 w-full bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 max-h-96 overflow-y-auto">
                                    {filteredCalculators.length > 0 ? (
                                        <ul>
                                            {filteredCalculators.map((calc, idx) => (
                                                <li
                                                    key={`${calc.id}-${idx}`}
                                                    onClick={() => handleNavigate(calc.id)}
                                                    className="px-4 py-3 hover:bg-medical-50 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0 flex items-center justify-between"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-slate-800 dark:text-white">{calc.name}</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">{calc.description} • {calc.specialtyName}</span>
                                                    </div>
                                                    {calc.isPro && !isPro && <LockIcon className="w-4 h-4 text-slate-400" />}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">
                                            Nenhuma calculadora encontrada.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="flex items-center gap-2 pl-4">
                        {isPro && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-bold border border-yellow-200 dark:border-yellow-700 flex items-center gap-1">
                                <CrownIcon className="w-3 h-3" /> PRO
                            </span>
                        )}
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse hidden sm:block"></span>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:block">Online</span>

                        <button
                            onClick={toggleTheme}
                            className="ml-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                        >
                            {theme === 'dark' ? (
                                <SunIcon className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <MoonIcon className="w-5 h-5 text-slate-600" />
                            )}
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex flex-col xl:flex-row">

                    <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
                        <AdSpace format="horizontal" className="mb-6" />

                        {view !== AppView.DASHBOARD && view !== AppView.PRO_LOGIN && view !== AppView.NUTRITION_PRO && view !== AppView.NEWS && view !== AppView.PATIENTS_LIST && (
                            <button
                                onClick={handleBack}
                                className="mb-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-medical-600 dark:hover:text-medical-400 transition group"
                            >
                                <ChevronLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Voltar
                            </button>
                        )}

                        {renderContent()}

                        <AdSpace format="horizontal" className="mt-8" />
                        <div className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500 max-w-2xl mx-auto">
                            Aviso Legal: As informações contidas neste aplicativo servem apenas como auxílio e não substituem o julgamento clínico profissional.
                            Confirme sempre os resultados com outras fontes.
                        </div>
                    </div>

                    <div className="hidden xl:block w-80 p-6 border-l border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">Patrocinado</h4>
                        <AdSpace format="vertical" />
                        <div className="mt-6 text-xs text-slate-400 dark:text-slate-500">
                            <p>O Ajuda Saúde é mantido através de publicidade para garantir o acesso gratuito a todos os profissionais.</p>
                        </div>
                    </div>
                </div>

                <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 py-8 px-4 mt-auto">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <AjudaSaudeLogo className="w-6 h-6 grayscale opacity-50" />
                            <span className="text-slate-500 dark:text-slate-400 font-semibold">Ajuda Saúde</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                            <button onClick={() => handleNavigate(LegalView.ABOUT)} className="hover:text-medical-600 dark:hover:text-medical-400">Sobre</button>
                            <button onClick={() => handleNavigate(LegalView.PRIVACY)} className="hover:text-medical-600 dark:hover:text-medical-400">Política de Privacidade</button>
                            <button onClick={() => handleNavigate(LegalView.TERMS)} className="hover:text-medical-600 dark:hover:text-medical-400">Termos de Uso</button>
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">
                            © {new Date().getFullYear()} Ajuda Saúde. Todos os direitos reservados.
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default App;

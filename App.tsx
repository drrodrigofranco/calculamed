
import React, { useState } from 'react';
import { AppView, SpecialtyDef, SpecialtyId } from './types';
import BMICalculator from './components/calculators/BMICalculator';
import EGFRCalculator from './components/calculators/EGFRCalculator';
import IVDropCalculator from './components/calculators/IVDropCalculator';
import PregnancyCalculator from './components/calculators/PregnancyCalculator';
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
import WellsPECalculator from './components/calculators/WellsPECalculator';
import CURB65Calculator from './components/calculators/CURB65Calculator';
import VasoactiveDrugsCalculator from './components/calculators/VasoactiveDrugsCalculator';
import AdSpace from './components/AdSpace';
import { PrivacyPolicy, TermsOfUse, AboutUs } from './components/LegalDocs';
import { 
  CalculatorIcon, 
  DropIcon, 
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
  CalculamedLogo,
  SirenIcon,
  BrainIcon
} from './components/icons';

// --- Extended View Enum for Legal Pages ---
enum LegalView {
    PRIVACY = 'PRIVACY',
    TERMS = 'TERMS',
    ABOUT = 'ABOUT'
}

type ExtendedView = AppView | LegalView;

// --- Configuration Data ---

const SPECIALTIES: SpecialtyDef[] = [
  {
    id: 'nursing',
    name: 'Enfermagem & Geral',
    icon: DropIcon,
    color: 'bg-emerald-500',
    calculators: [
        { id: AppView.CALC_BMI, name: 'IMC', description: 'Índice de Massa Corporal' },
        { id: AppView.CALC_IV, name: 'Gotejamento', description: 'Velocidade de infusão IV' },
        { id: AppView.CALC_WATER, name: 'Hidratação Diária', description: 'Meta de água por peso' },
        { id: AppView.CALC_IDEAL_WEIGHT, name: 'Peso Ideal', description: 'Fórmula de Devine' },
        { id: AppView.CALC_BSA, name: 'Superfície Corporal', description: 'Fórmula de Mosteller' },
        { id: AppView.CALC_CONVERTER, name: 'Conversor de Unidades', description: 'Temp (C/F) e Peso (Kg/Lbs)' },
    ]
  },
  {
    id: 'emergency',
    name: 'Emergência & UTI',
    icon: SirenIcon,
    color: 'bg-red-600',
    calculators: [
        { id: AppView.CALC_VASOACTIVE, name: 'Drogas Vasoativas', description: 'Noradrenalina, Dobuta, etc' },
        { id: AppView.CALC_PARKLAND, name: 'Fórmula de Parkland', description: 'Hidratação em Queimados' },
        { id: AppView.CALC_MAP, name: 'Pressão Média (PAM)', description: 'Monitorização Trauma/Choque' },
        { id: AppView.CALC_ANION_GAP, name: 'Anion Gap', description: 'Investigação de acidose' },
    ]
  },
  {
    id: 'neuro',
    name: 'Neurologia',
    icon: BrainIcon,
    color: 'bg-violet-600',
    calculators: [
        { id: AppView.CALC_GLASGOW, name: 'Escala de Glasgow', description: 'Nível de consciência' },
    ]
  },
  {
    id: 'cardio',
    name: 'Cardiologia',
    icon: HeartPulseIcon,
    color: 'bg-rose-500',
    calculators: [
        { id: AppView.CALC_LDL, name: 'LDL (Friedewald)', description: 'Cálculo de Colesterol LDL' },
        { id: AppView.CALC_MAP, name: 'Pressão Média (PAM)', description: 'Avaliação hemodinâmica' },
        { id: AppView.CALC_QTC, name: 'QT Corrigido', description: 'Fórmula de Bazett' },
    ]
  },
  {
    id: 'pneumo',
    name: 'Pneumologia',
    icon: LungsIcon,
    color: 'bg-sky-500',
    calculators: [
        { id: AppView.CALC_WELLS_PE, name: 'Score de Wells (TEP)', description: 'Risco de Embolia Pulmonar' },
        { id: AppView.CALC_CURB65, name: 'CURB-65', description: 'Gravidade Pneumonia' },
    ]
  },
  {
    id: 'endo',
    name: 'Endocrinologia',
    icon: FlaskIcon,
    color: 'bg-indigo-500',
    calculators: [
        { id: AppView.CALC_GLUCOSE, name: 'Conversão Glicose', description: 'mg/dL ↔ mmol/L' },
        { id: AppView.CALC_CORR_CALCIUM, name: 'Cálcio Corrigido', description: 'Ajuste pela Albumina' },
        { id: AppView.CALC_SODIUM_CORR, name: 'Sódio Corrigido', description: 'Hiperglicemia grave' },
        { id: AppView.CALC_BMI, name: 'IMC', description: 'Classificação de peso' },
    ]
  },
  {
    id: 'nephro',
    name: 'Nefrologia',
    icon: KidneyIcon,
    color: 'bg-blue-500',
    calculators: [
        { id: AppView.CALC_EGFR, name: 'TFG (CKD-EPI)', description: 'Função Renal Estimada' },
        { id: AppView.CALC_BSA, name: 'Superfície Corporal', description: 'Ajuste de dose/diálise' },
        { id: AppView.CALC_ANION_GAP, name: 'Anion Gap', description: 'Acidose Metabólica' },
    ]
  },
  {
    id: 'gastro',
    name: 'Gastroenterologia',
    icon: LiverIcon,
    color: 'bg-amber-600',
    calculators: [
        { id: AppView.CALC_CHILD_PUGH, name: 'Child-Pugh', description: 'Prognóstico na Cirrose' },
    ]
  },
  {
    id: 'peds',
    name: 'Pediatria',
    icon: ChildIcon,
    color: 'bg-orange-500',
    calculators: [
        { id: AppView.CALC_PED_FLUIDS, name: 'Holliday-Segar', description: 'Fluidos de manutenção' },
        { id: AppView.CALC_BMI, name: 'IMC', description: 'Índice de Massa Corporal' },
    ]
  },
  {
    id: 'obs',
    name: 'Obstetrícia',
    icon: BabyIcon,
    color: 'bg-pink-500',
    calculators: [
        { id: AppView.CALC_PREGNANCY, name: 'Idade Gestacional', description: 'DPP e IG via DUM' },
    ]
  },
  {
    id: 'nutrition',
    name: 'Nutrição',
    icon: ScaleIcon,
    color: 'bg-lime-600',
    calculators: [
        { id: AppView.CALC_BMR, name: 'Taxa Metabólica', description: 'Harris-Benedict' },
        { id: AppView.CALC_IDEAL_WEIGHT, name: 'Peso Ideal', description: 'Meta ponderal' },
        { id: AppView.CALC_WATER, name: 'Hidratação', description: 'Meta hídrica' },
    ]
  },
];

const App: React.FC = () => {
  const [view, setView] = useState<ExtendedView>(AppView.DASHBOARD);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<SpecialtyId | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleNavigate = (targetView: ExtendedView) => {
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
    if (view === AppView.CATEGORY_VIEW) {
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

  // Search Logic
  const filteredCalculators = searchQuery 
    ? SPECIALTIES.flatMap(s => s.calculators.map(c => ({...c, specialtyName: s.name})))
        .filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            c.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];

  const renderContent = () => {
    switch (view) {
      case AppView.CATEGORY_VIEW:
        return selectedSpecialtyId ? (
            <CategoryView 
                specialtyId={selectedSpecialtyId} 
                onSelectCalc={handleNavigate} 
            />
        ) : <Dashboard onSelectSpecialty={handleSelectSpecialty} onNavigate={handleNavigate} />;
      
      // Legal Pages
      case LegalView.PRIVACY: return <PrivacyPolicy />;
      case LegalView.TERMS: return <TermsOfUse />;
      case LegalView.ABOUT: return <AboutUs />;

      // Calculators
      case AppView.CALC_BMI: return <BMICalculator />;
      case AppView.CALC_EGFR: return <EGFRCalculator />;
      case AppView.CALC_IV: return <IVDropCalculator />;
      case AppView.CALC_PREGNANCY: return <PregnancyCalculator />;
      case AppView.CALC_LDL: return <LDLCalculator />;
      case AppView.CALC_MAP: return <MAPCalculator />;
      case AppView.CALC_WATER: return <WaterIntakeCalculator />;
      case AppView.CALC_QTC: return <QTcCalculator />;
      case AppView.CALC_GLASGOW: return <GlasgowCalculator />;
      case AppView.CALC_PED_FLUIDS: return <PediatricFluidCalculator />;
      case AppView.CALC_BMR: return <BMRCalculator />;
      case AppView.CALC_IDEAL_WEIGHT: return <IdealWeightCalculator />;
      case AppView.CALC_BSA: return <BSACalculator />;
      case AppView.CALC_ANION_GAP: return <AnionGapCalculator />;
      case AppView.CALC_CORR_CALCIUM: return <CorrectedCalciumCalculator />;
      case AppView.CALC_GLUCOSE: return <GlucoseConverter />;
      case AppView.CALC_CHILD_PUGH: return <ChildPughCalculator />;
      case AppView.CALC_CONVERTER: return <UnitConverter />;
      case AppView.CALC_SODIUM_CORR: return <SodiumCorrectionCalculator />;
      case AppView.CALC_PARKLAND: return <ParklandCalculator />;
      case AppView.CALC_WELLS_PE: return <WellsPECalculator />;
      case AppView.CALC_CURB65: return <CURB65Calculator />;
      case AppView.CALC_VASOACTIVE: return <VasoactiveDrugsCalculator />;
      
      case AppView.DASHBOARD:
      default:
        return <Dashboard onSelectSpecialty={handleSelectSpecialty} onNavigate={handleNavigate} />;
    }
  };

  const getHeaderTitle = () => {
    if (view === AppView.DASHBOARD) return 'Início';
    if (Object.values(LegalView).includes(view as LegalView)) return 'Institucional';
    if (view === AppView.CATEGORY_VIEW && selectedSpecialtyId) {
        return SPECIALTIES.find(s => s.id === selectedSpecialtyId)?.name || 'Categoria';
    }
    return 'Calculadora';
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col z-30">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate(AppView.DASHBOARD)}>
            <CalculamedLogo className="w-8 h-8" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Calcula<span className="text-medical-500">med</span>
            </h1>
          </div>
        </div>
        <nav className="p-4 space-y-2 flex-grow overflow-y-auto">
          <button
            onClick={() => { setView(AppView.DASHBOARD); setSelectedSpecialtyId(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${view === AppView.DASHBOARD && !selectedSpecialtyId ? 'bg-medical-600 text-white shadow-lg shadow-medical-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <div className="w-5 h-5"><CalculatorIcon /></div>
            <span className="font-medium">Início</span>
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

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-4 md:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4 flex-1">
             {view !== AppView.DASHBOARD && (
                 <button onClick={handleBack} className="md:hidden p-2 hover:bg-slate-100 rounded-full">
                     <ChevronLeftIcon className="text-slate-600" />
                 </button>
             )}
             <h2 className="text-lg font-semibold text-slate-800 hidden md:block">
                {getHeaderTitle()}
             </h2>
             
             {/* Mobile Logo */}
             {view === AppView.DASHBOARD && (
               <div className="md:hidden flex items-center gap-2">
                  <CalculamedLogo className="w-6 h-6" />
                  <span className="font-bold text-slate-800">Calculamed</span>
               </div>
             )}

             {/* Search Bar */}
             <div className="relative max-w-md w-full ml-2 md:ml-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-full leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-medical-500 focus:border-medical-500 sm:text-sm transition"
                        placeholder="Buscar calculadora..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                         <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                         >
                            <XIcon className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                        </button>
                    )}
                </div>

                {/* Search Results */}
                {searchQuery && (
                    <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl border border-slate-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
                        {filteredCalculators.length > 0 ? (
                            <ul>
                                {filteredCalculators.map((calc, idx) => (
                                    <li 
                                        key={`${calc.id}-${idx}`}
                                        onClick={() => handleNavigate(calc.id)}
                                        className="px-4 py-3 hover:bg-medical-50 cursor-pointer border-b border-slate-100 last:border-0 flex flex-col"
                                    >
                                        <span className="font-medium text-slate-800">{calc.name}</span>
                                        <span className="text-xs text-slate-500">{calc.description} • {calc.specialtyName}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-slate-500 text-sm">
                                Nenhuma calculadora encontrada.
                            </div>
                        )}
                    </div>
                )}
             </div>
           </div>

           <div className="flex items-center gap-2 pl-4">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse hidden sm:block"></span>
               <span className="text-xs font-medium text-slate-500 hidden sm:block">Online</span>
           </div>
        </header>

        {/* Content Container with Sidebar for Ads */}
        <div className="flex-1 flex flex-col xl:flex-row">
            
            {/* Center Column */}
            <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
                <AdSpace format="horizontal" className="mb-6" />

                {view !== AppView.DASHBOARD && (
                    <button 
                        onClick={handleBack}
                        className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-medical-600 transition group"
                    >
                        <ChevronLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar
                    </button>
                )}
                
                {renderContent()}

                <AdSpace format="horizontal" className="mt-8" />
            </div>

            {/* Right Ad Sidebar (Desktop Only) */}
            <div className="hidden xl:block w-80 p-6 border-l border-slate-200 bg-white">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">Patrocinado</h4>
                <AdSpace format="vertical" />
                <div className="mt-6 text-xs text-slate-400">
                    <p>O Calculamed é mantido através de publicidade para garantir o acesso gratuito a todos os profissionais.</p>
                </div>
            </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-8 px-4 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                     <CalculamedLogo className="w-6 h-6 grayscale opacity-50" />
                     <span className="text-slate-500 font-semibold">Calculamed</span>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                    <button onClick={() => handleNavigate(LegalView.ABOUT)} className="hover:text-medical-600">Sobre</button>
                    <button onClick={() => handleNavigate(LegalView.PRIVACY)} className="hover:text-medical-600">Política de Privacidade</button>
                    <button onClick={() => handleNavigate(LegalView.TERMS)} className="hover:text-medical-600">Termos de Uso</button>
                </div>
                <div className="text-xs text-slate-400">
                    © {new Date().getFullYear()} Calculamed. Todos os direitos reservados.
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
};

// Dashboard (Specialty Grid)
const Dashboard: React.FC<{ onSelectSpecialty: (id: SpecialtyId) => void, onNavigate: (view: ExtendedView) => void }> = ({ onSelectSpecialty, onNavigate }) => {
  return (
    <div className="pb-10">
      <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Bem-vindo ao Calculamed</h2>
          <p className="text-slate-600 max-w-2xl">
              Acesse rapidamente as ferramentas essenciais para sua prática clínica. 
              Organizadas por especialidade para facilitar o seu plantão.
          </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Specialty Cards */}
        {SPECIALTIES.map((spec) => (
            <div 
                key={spec.id}
                onClick={() => onSelectSpecialty(spec.id)}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-medical-200 transition group flex flex-col h-full"
            >
                <div className={`w-12 h-12 ${spec.color} rounded-xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <spec.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">{spec.name}</h4>
                <p className="text-slate-500 text-xs mb-4">{spec.calculators.length} Calculadoras</p>
                <div className="mt-auto flex -space-x-2 overflow-hidden mb-3">
                    {/* Visual indicators for calculators inside */}
                    {spec.calculators.slice(0, 3).map((_, i) => (
                        <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-bold">
                           <LightningIcon className="w-3 h-3" />
                        </div>
                    ))}
                    {spec.calculators.length > 3 && (
                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                            +
                        </div>
                    )}
                </div>
                <div className="flex items-center text-medical-600 font-medium text-xs">
                    Explorar <ChevronLeftIcon className="rotate-180 w-3 h-3 ml-1" />
                </div>
            </div>
        ))}
      </div>

      {/* SEO Content Section for AdSense Approval */}
      <div className="mt-12 pt-8 border-t border-slate-200 prose prose-slate max-w-none text-slate-600">
          <h3>Calculadoras Médicas Profissionais</h3>
          <p>
              O <strong>Calculamed</strong> é uma referência gratuita para profissionais de saúde, oferecendo acesso rápido a fórmulas complexas e escores clínicos. 
              Nossa plataforma garante precisão em cálculos fundamentais para UTI, Emergência, Pediatria e diversas especialidades.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                  <h4 className="font-bold text-slate-800">Ferramentas de Destaque</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>Drogas Vasoativas:</strong> Cálculo preciso de vazão e dose para Noradrenalina e outros.</li>
                      <li><strong>Nefrologia:</strong> Estimativa de TFG (CKD-EPI) e ajustes renais.</li>
                      <li><strong>Emergência:</strong> Escala de Glasgow, Parkland para queimados e Anion Gap.</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-slate-800">Por que usar?</h4>
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

// Category View (List Calculators within a Specialty)
const CategoryView: React.FC<{ specialtyId: SpecialtyId, onSelectCalc: (view: ExtendedView) => void }> = ({ specialtyId, onSelectCalc }) => {
    const specialty = SPECIALTIES.find(s => s.id === specialtyId);

    if (!specialty) return <div>Especialidade não encontrada</div>;

    return (
        <div className="max-w-4xl mx-auto">
             <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 ${specialty.color} rounded-2xl flex items-center justify-center shadow-md`}>
                    <specialty.icon className="w-10 h-10 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">{specialty.name}</h2>
                    <p className="text-slate-500">Selecione uma ferramenta abaixo</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialty.calculators.map((calc) => (
                    <div 
                        key={calc.id}
                        onClick={() => onSelectCalc(calc.id)}
                        className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-medical-300 cursor-pointer transition flex items-center justify-between group"
                    >
                        <div>
                            <h3 className="font-bold text-slate-800">{calc.name}</h3>
                            <p className="text-sm text-slate-500 mt-1">{calc.description}</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-full group-hover:bg-medical-50 transition">
                            <ChevronLeftIcon className="w-5 h-5 text-slate-400 group-hover:text-medical-600 rotate-180 transition" />
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Contextual Text for Category SEO */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-sm text-slate-500">
                <p>
                    As calculadoras de <strong>{specialty.name}</strong> são ferramentas de apoio à decisão clínica. 
                    Certifique-se de validar os dados de entrada antes de aplicar os resultados no cuidado ao paciente.
                </p>
            </div>
        </div>
    );
}

export default App;
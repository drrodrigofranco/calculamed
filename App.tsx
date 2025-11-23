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
import NewsFeed from './components/NewsFeed';
import { 
  ActivityIcon, 
  CalculatorIcon, 
  NewsIcon, 
  DropIcon, 
  KidneyIcon, 
  ChevronLeftIcon,
  BabyIcon,
  HeartPulseIcon,
  GlassWaterIcon,
  BrainIcon,
  ScaleIcon,
  ChildIcon,
  LightningIcon,
  FlaskIcon,
  RulerIcon,
  LiverIcon,
  RefreshCwIcon,
  GithubIcon,
  SearchIcon,
  XIcon
} from './components/icons';

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
    id: 'endo',
    name: 'Endocrinologia',
    icon: FlaskIcon,
    color: 'bg-indigo-500',
    calculators: [
        { id: AppView.CALC_GLUCOSE, name: 'Conversão Glicose', description: 'mg/dL ↔ mmol/L' },
        { id: AppView.CALC_CORR_CALCIUM, name: 'Cálcio Corrigido', description: 'Ajuste pela Albumina' },
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
    id: 'neuro',
    name: 'Neuro & Emergência',
    icon: BrainIcon,
    color: 'bg-violet-600',
    calculators: [
        { id: AppView.CALC_GLASGOW, name: 'Escala de Glasgow', description: 'Nível de consciência' },
        { id: AppView.CALC_MAP, name: 'Pressão Média (PAM)', description: 'Monitorização Trauma/Neuro' },
        { id: AppView.CALC_ANION_GAP, name: 'Anion Gap', description: 'Investigação de acidose' },
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
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<SpecialtyId | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleNavigate = (targetView: AppView) => {
    setView(targetView);
    setSearchQuery(''); // Clear search on navigation
  };

  const handleSelectSpecialty = (id: SpecialtyId) => {
    setSelectedSpecialtyId(id);
    setView(AppView.CATEGORY_VIEW);
    setSearchQuery('');
  };

  const handleBack = () => {
    if (view === AppView.CATEGORY_VIEW) {
      setView(AppView.DASHBOARD);
      setSelectedSpecialtyId(null);
    } else if (view !== AppView.DASHBOARD) {
        // If coming from a calculator, go back to category if selected, otherwise dashboard
        if (selectedSpecialtyId) {
            setView(AppView.CATEGORY_VIEW);
        } else {
            setView(AppView.DASHBOARD);
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
      case AppView.NEWS:
        return <NewsFeed />;
      case AppView.CATEGORY_VIEW:
        return selectedSpecialtyId ? (
            <CategoryView 
                specialtyId={selectedSpecialtyId} 
                onSelectCalc={handleNavigate} 
            />
        ) : <Dashboard onSelectSpecialty={handleSelectSpecialty} onNavigate={handleNavigate} />;
      
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
      
      case AppView.DASHBOARD:
      default:
        return <Dashboard onSelectSpecialty={handleSelectSpecialty} onNavigate={handleNavigate} />;
    }
  };

  const getHeaderTitle = () => {
    if (view === AppView.DASHBOARD) return 'Especialidades';
    if (view === AppView.NEWS) return 'Notícias';
    if (view === AppView.CATEGORY_VIEW && selectedSpecialtyId) {
        return SPECIALTIES.find(s => s.id === selectedSpecialtyId)?.name || 'Categoria';
    }
    return 'Calculadora';
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-medical-500">Medi</span>Calc
          </h1>
        </div>
        <nav className="p-4 space-y-2 flex-grow">
          <button
            onClick={() => { setView(AppView.DASHBOARD); setSelectedSpecialtyId(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${view === AppView.DASHBOARD && !selectedSpecialtyId ? 'bg-medical-600 text-white shadow-lg shadow-medical-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <div className="w-5 h-5"><CalculatorIcon /></div>
            <span className="font-medium">Início</span>
          </button>

           <button
            onClick={() => { setView(AppView.NEWS); setSelectedSpecialtyId(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${view === AppView.NEWS ? 'bg-medical-600 text-white shadow-lg shadow-medical-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <div className="w-5 h-5"><NewsIcon /></div>
            <span className="font-medium">Notícias (IA)</span>
          </button>
        </nav>
        
        <div className="p-6 space-y-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-400 hover:text-white transition p-2 rounded-lg hover:bg-slate-800"
            >
              <GithubIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Projeto no GitHub</span>
            </a>

            <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-2">Versão Profissional</p>
                <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-medical-500 w-full"></div>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50 h-screen overflow-y-auto relative">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
           <div className="flex items-center gap-4 flex-1">
             {view !== AppView.DASHBOARD && (
                 <button onClick={handleBack} className="md:hidden p-2 hover:bg-slate-100 rounded-full">
                     <ChevronLeftIcon className="text-slate-600" />
                 </button>
             )}
             <h2 className="text-lg font-semibold text-slate-800 hidden md:block">
                {getHeaderTitle()}
             </h2>

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

                {/* Search Results Dropdown */}
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
               <span className="text-xs font-medium text-slate-500 hidden sm:block">Pro</span>
           </div>
        </header>

        <div className="p-4 md:p-8">
            {view !== AppView.DASHBOARD && view !== AppView.NEWS && (
                <button 
                    onClick={handleBack}
                    className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-medical-600 transition group"
                >
                    <ChevronLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Voltar
                </button>
            )}
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Dashboard (Specialty Grid)
const Dashboard: React.FC<{ onSelectSpecialty: (id: SpecialtyId) => void, onNavigate: (view: AppView) => void }> = ({ onSelectSpecialty, onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* News Teaser Card */}
        <div 
            onClick={() => onNavigate(AppView.NEWS)}
            className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 bg-gradient-to-r from-medical-600 to-medical-800 rounded-2xl p-8 text-white cursor-pointer shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 relative overflow-hidden group"
        >
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <ActivityIcon className="text-white" />
                    </span>
                    <span className="font-semibold tracking-wide text-medical-100">MEDICINA BASEADA EM EVIDÊNCIA</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">Atualizações Clínicas</h3>
                <p className="text-medical-100 max-w-xl">
                    Utilize nossa IA para resumir diretrizes recentes e manter-se atualizado.
                </p>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
        </div>

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
    </div>
  );
};

// Category View (List Calculators within a Specialty)
const CategoryView: React.FC<{ specialtyId: SpecialtyId, onSelectCalc: (view: AppView) => void }> = ({ specialtyId, onSelectCalc }) => {
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
        </div>
    );
}

export default App;
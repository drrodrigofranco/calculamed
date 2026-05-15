import React, { useState, useEffect } from 'react';
import { Patient } from '../types';
import {
  BarChart3Icon,
  UsersIcon,
  UserPlusIcon,
  CalendarIcon,
  TrendingUpIcon,
  ClockIcon,
  FileTextIcon,
  SearchIcon,
  TrashIcon,
  CheckCircleIcon,
  ScanIcon
} from './icons';
import UltrasoundAnalyzer from './UltrasoundAnalyzer';

type DashboardView = 'main' | 'ultrasound';

interface CRMDashboardProps {
  onLogout: () => void;
}

const CRMDashboard: React.FC<CRMDashboardProps> = ({ onLogout }) => {
  const [view, setView] = useState<DashboardView>('main');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', birthDate: '', contact: '' });

  // Load patients from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('as_patients');
    if (stored) {
      try {
        setPatients(JSON.parse(stored));
      } catch (e) {
        console.error('Erro ao carregar pacientes', e);
      }
    }
  }, []);

  // Save patients to localStorage
  useEffect(() => {
    localStorage.setItem('as_patients', JSON.stringify(patients));
  }, [patients]);

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newPatient: Patient = {
      id: crypto.randomUUID(),
      name: formData.name,
      birthDate: formData.birthDate,
      contact: formData.contact,
      gender: 'Unspecified',
      notes: [],
      createdAt: new Date().toISOString()
    };

    setPatients(prev => [newPatient, ...prev]);
    setFormData({ name: '', birthDate: '', contact: '' });
    setShowAddForm(false);
  };

  const handleDeletePatient = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      setPatients(prev => prev.filter(p => p.id !== id));
    }
  };

  const totalPatients = patients.length;
  const todayPatients = patients.filter(p => {
    const createdDate = new Date(p.createdAt).toDateString();
    return createdDate === new Date().toDateString();
  }).length;
  const avgNotesPerPatient = patients.length > 0
    ? (patients.reduce((sum, p) => sum + p.notes.length, 0) / patients.length).toFixed(1)
    : '0';

  if (view === 'ultrasound') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 border-b border-slate-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3Icon className="w-6 h-6 text-blue-400" />
              CalculaMed CRM
            </h1>
            <div className="flex items-center gap-3">
              <nav className="flex gap-1">
                <button
                  onClick={() => setView('main')}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition"
                >
                  Dashboard
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-cyan-600 text-white"
                >
                  <span className="flex items-center gap-1.5">
                    <ScanIcon className="w-4 h-4" />
                    Ultrassom IA
                  </span>
                </button>
              </nav>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <UltrasoundAnalyzer onBack={() => setView('main')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart3Icon className="w-7 h-7 text-blue-400" />
                CalculaMed CRM
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">Dashboard de Gestão Clínica</p>
            </div>
            <div className="flex items-center gap-3">
              <nav className="flex gap-1">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setView('ultrasound')}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition flex items-center gap-1.5"
                >
                  <ScanIcon className="w-4 h-4" />
                  Ultrassom IA
                </button>
              </nav>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Patients */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg hover:border-blue-500 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total de Pacientes</p>
                <p className="text-3xl font-bold text-white mt-2">{totalPatients}</p>
              </div>
              <UsersIcon className="w-12 h-12 text-blue-400 opacity-20" />
            </div>
            <p className="text-slate-500 text-xs mt-3 flex items-center gap-1">
              <TrendingUpIcon className="w-4 h-4" />
              {todayPatients} novos hoje
            </p>
          </div>

          {/* Today's Appointments */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg hover:border-green-500 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Cadastrados Hoje</p>
                <p className="text-3xl font-bold text-white mt-2">{todayPatients}</p>
              </div>
              <CalendarIcon className="w-12 h-12 text-green-400 opacity-20" />
            </div>
            <p className="text-slate-500 text-xs mt-3 flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Average Notes */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg hover:border-yellow-500 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Média de Notas</p>
                <p className="text-3xl font-bold text-white mt-2">{avgNotesPerPatient}</p>
              </div>
              <FileTextIcon className="w-12 h-12 text-yellow-400 opacity-20" />
            </div>
            <p className="text-slate-500 text-xs mt-3">Por paciente em média</p>
          </div>

          {/* Active Status */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg hover:border-purple-500 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Sistema Status</p>
                <p className="text-3xl font-bold text-white mt-2">✓ Ativo</p>
              </div>
              <CheckCircleIcon className="w-12 h-12 text-purple-400 opacity-20" />
            </div>
            <p className="text-slate-500 text-xs mt-3 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Online
            </p>
          </div>
        </div>

        {/* Patients Section */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-slate-750 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-blue-400" />
              Gestão de Pacientes
            </h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition flex items-center gap-2"
            >
              <UserPlusIcon className="w-5 h-5" />
              Novo Paciente
            </button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <div className="bg-slate-750 border-b border-slate-700 px-6 py-4">
              <form onSubmit={handleAddPatient} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Contato (telefone/email)"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    Adicionar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search Bar */}
          <div className="bg-slate-750 border-b border-slate-700 px-6 py-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou contato..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Patients Table */}
          <div className="overflow-x-auto">
            {filteredPatients.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <UsersIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">
                  {patients.length === 0
                    ? 'Nenhum paciente cadastrado. Adicione um novo!'
                    : 'Nenhum paciente encontrado nessa busca.'}
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-750 border-b border-slate-700 text-left text-sm font-semibold text-slate-300">
                    <th className="px-6 py-3">Nome</th>
                    <th className="px-6 py-3">Data de Nascimento</th>
                    <th className="px-6 py-3">Contato</th>
                    <th className="px-6 py-3">Notas</th>
                    <th className="px-6 py-3">Cadastro</th>
                    <th className="px-6 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-slate-700 hover:bg-slate-750 transition"
                    >
                      <td className="px-6 py-4 font-medium text-white">{patient.name}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {patient.birthDate
                          ? new Date(patient.birthDate).toLocaleDateString('pt-BR')
                          : '-'}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{patient.contact || '-'}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full">
                          {patient.notes.length} notas
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {new Date(patient.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeletePatient(patient.id)}
                          className="bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg px-3 py-1 transition text-sm flex items-center gap-1"
                        >
                          <TrashIcon className="w-4 h-4" />
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-750 border-t border-slate-700 px-6 py-4 text-sm text-slate-400">
            Exibindo {filteredPatients.length} de {patients.length} pacientes
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMDashboard;

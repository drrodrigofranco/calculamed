import React, { useState, useEffect } from 'react';
import { Patient, ClinicalNote } from '../types';
import { 
    UsersIcon, 
    UserPlusIcon, 
    TrashIcon, 
    FileTextIcon, 
    SearchIcon, 
    ChevronLeftIcon 
} from './icons';

interface PatientManagerProps {
    onBack: () => void;
}

const PatientManager: React.FC<PatientManagerProps> = ({ onBack }) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const stored = localStorage.getItem('as_patients');
        if (stored) {
            try {
                setPatients(JSON.parse(stored));
            } catch (e) {
                console.error("Erro ao carregar pacientes", e);
            }
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem('as_patients', JSON.stringify(patients));
    }, [patients]);

    const handleAddPatient = (name: string, dob: string, contact: string) => {
        const newPatient: Patient = {
            id: crypto.randomUUID(),
            name,
            birthDate: dob,
            contact,
            gender: 'Unspecified',
            notes: [],
            createdAt: new Date().toISOString()
        };
        setPatients(prev => [newPatient, ...prev]);
        setShowAddForm(false);
    };

    const handleDeletePatient = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Tem certeza que deseja excluir este paciente e todo o histórico?")) {
            setPatients(prev => prev.filter(p => p.id !== id));
            if (selectedPatientId === id) setSelectedPatientId(null);
        }
    };

    const handleAddNote = (patientId: string, content: string) => {
        const note: ClinicalNote = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            content
        };
        
        setPatients(prev => prev.map(p => {
            if (p.id === patientId) {
                return { ...p, notes: [note, ...p.notes] };
            }
            return p;
        }));
    };

    const selectedPatient = patients.find(p => p.id === selectedPatientId);

    if (selectedPatientId && selectedPatient) {
        return (
            <PatientDetailView 
                patient={selectedPatient} 
                onBack={() => setSelectedPatientId(null)}
                onAddNote={handleAddNote}
            />
        );
    }

    const filteredPatients = patients.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <UsersIcon className="w-8 h-8 text-medical-600" />
                    Meus Pacientes
                </h2>
                <button 
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-medical-600 hover:bg-medical-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition"
                >
                    <UserPlusIcon className="w-4 h-4" />
                    {showAddForm ? 'Cancelar' : 'Novo Paciente'}
                </button>
            </div>

            {/* Add Patient Form */}
            {showAddForm && (
                <div className="bg-white p-6 rounded-xl border border-medical-200 shadow-sm mb-6 animate-fade-in">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Cadastro de Paciente</h3>
                    <AddPatientForm onSubmit={handleAddPatient} />
                </div>
            )}

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 transition"
                    placeholder="Buscar por nome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Patient List */}
            {patients.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                    <UsersIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">Nenhum paciente cadastrado.</p>
                    <p className="text-sm text-slate-400 mt-1">Seus dados ficam salvos apenas neste dispositivo.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredPatients.map(patient => (
                        <div 
                            key={patient.id}
                            onClick={() => setSelectedPatientId(patient.id)}
                            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-medical-300 hover:shadow-md transition cursor-pointer flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-medical-50 text-medical-600 flex items-center justify-center font-bold text-lg">
                                    {patient.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{patient.name}</h4>
                                    <p className="text-sm text-slate-500">
                                        {calculateAge(patient.birthDate)} anos • Última evolução: {patient.notes.length > 0 ? new Date(patient.notes[0].date).toLocaleDateString() : 'Nenhuma'}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={(e) => handleDeletePatient(patient.id, e)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                title="Excluir Paciente"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const PatientDetailView: React.FC<{ patient: Patient, onBack: () => void, onAddNote: (id: string, content: string) => void }> = ({ patient, onBack, onAddNote }) => {
    const [noteContent, setNoteContent] = useState('');

    const handleSubmitNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (!noteContent.trim()) return;
        onAddNote(patient.id, noteContent);
        setNoteContent('');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-medical-600 mb-6 transition"
            >
                <ChevronLeftIcon className="w-4 h-4" />
                Voltar para lista
            </button>

            {/* Patient Header */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-1">{patient.name}</h2>
                        <div className="flex items-center gap-4 text-slate-600 text-sm">
                            <span>{calculateAge(patient.birthDate)} anos ({new Date(patient.birthDate).toLocaleDateString()})</span>
                            {patient.contact && <span>• {patient.contact}</span>}
                        </div>
                    </div>
                    <div className="bg-medical-50 px-3 py-1 rounded text-xs font-bold text-medical-700 uppercase">
                        Prontuário Local
                    </div>
                </div>
            </div>

            {/* Clinical Notes Section */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Add Note Column */}
                <div className="md:col-span-1">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-24">
                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <FileTextIcon className="w-4 h-4 text-medical-600" />
                            Nova Evolução
                        </h4>
                        <form onSubmit={handleSubmitNote}>
                            <textarea
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none placeholder-slate-400 min-h-[150px] text-sm mb-3"
                                placeholder="Descreva a evolução clínica..."
                            ></textarea>
                            <button 
                                type="submit"
                                disabled={!noteContent.trim()}
                                className="w-full bg-medical-600 hover:bg-medical-700 disabled:bg-slate-300 text-white font-semibold py-2 rounded-lg transition"
                            >
                                Salvar Nota
                            </button>
                        </form>
                    </div>
                </div>

                {/* History Column */}
                <div className="md:col-span-2">
                    <h4 className="font-bold text-slate-800 mb-4">Histórico Clínico</h4>
                    {patient.notes.length === 0 ? (
                        <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
                            Nenhuma anotação registrada ainda.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {patient.notes.map(note => (
                                <div key={note.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
                                        <span className="text-sm font-bold text-medical-700">
                                            {new Date(note.date).toLocaleDateString()} às {new Date(note.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </span>
                                    </div>
                                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                                        {note.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AddPatientForm: React.FC<{ onSubmit: (name: string, dob: string, contact: string) => void }> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && dob) {
            onSubmit(name, dob, contact);
            setName('');
            setDob('');
            setContact('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 bg-white text-slate-900 border border-slate-300 rounded focus:ring-2 focus:ring-medical-500 outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data de Nascimento</label>
                <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-2 bg-white text-slate-900 border border-slate-300 rounded focus:ring-2 focus:ring-medical-500 outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contato (Opcional)</label>
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full p-2 bg-white text-slate-900 border border-slate-300 rounded focus:ring-2 focus:ring-medical-500 outline-none"
                    placeholder="(00) 00000-0000"
                />
            </div>
            <div className="md:col-span-3 flex justify-end">
                <button 
                    type="submit" 
                    className="bg-medical-600 hover:bg-medical-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                    Salvar Paciente
                </button>
            </div>
        </form>
    );
};

const calculateAge = (dob: string) => {
    const diff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default PatientManager;
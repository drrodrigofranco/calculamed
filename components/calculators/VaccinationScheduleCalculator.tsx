import React, { useState } from 'react';
import { ArrowLeft, Syringe, Calendar, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { AppView } from '../../types';

interface VaccinationScheduleCalculatorProps {
    onNavigate: (view: AppView) => void;
}

interface Vaccine {
    name: string;
    ageMonths: number;
    ageDisplay: string;
    doses?: string;
    details?: string;
}

const VaccinationScheduleCalculator: React.FC<VaccinationScheduleCalculatorProps> = ({ onNavigate }) => {
    const [birthDate, setBirthDate] = useState<string>('');

    // Calendário Vacinal Brasileiro (PNI)
    const vaccineSchedule: Vaccine[] = [
        // Ao nascer
        { name: 'BCG', ageMonths: 0, ageDisplay: 'Ao nascer', doses: 'Dose única', details: 'Previne formas graves de tuberculose' },
        { name: 'Hepatite B', ageMonths: 0, ageDisplay: 'Ao nascer', doses: '1ª dose', details: 'Nas primeiras 12-24 horas de vida' },

        // 2 meses
        { name: 'Pentavalente', ageMonths: 2, ageDisplay: '2 meses', doses: '1ª dose', details: 'DTP + Hib + Hepatite B' },
        { name: 'VIP (Poliomielite)', ageMonths: 2, ageDisplay: '2 meses', doses: '1ª dose', details: 'Vacina inativada' },
        { name: 'Pneumocócica 10', ageMonths: 2, ageDisplay: '2 meses', doses: '1ª dose', details: 'Previne pneumonia e meningite' },
        { name: 'Rotavírus', ageMonths: 2, ageDisplay: '2 meses', doses: '1ª dose', details: 'Previne diarreia por rotavírus' },

        // 3 meses
        { name: 'Meningocócica C', ageMonths: 3, ageDisplay: '3 meses', doses: '1ª dose', details: 'Previne meningite C' },

        // 4 meses
        { name: 'Pentavalente', ageMonths: 4, ageDisplay: '4 meses', doses: '2ª dose', details: 'DTP + Hib + Hepatite B' },
        { name: 'VIP (Poliomielite)', ageMonths: 4, ageDisplay: '4 meses', doses: '2ª dose', details: 'Vacina inativada' },
        { name: 'Pneumocócica 10', ageMonths: 4, ageDisplay: '4 meses', doses: '2ª dose', details: 'Previne pneumonia e meningite' },
        { name: 'Rotavírus', ageMonths: 4, ageDisplay: '4 meses', doses: '2ª dose', details: 'Previne diarreia por rotavírus' },

        // 5 meses
        { name: 'Meningocócica C', ageMonths: 5, ageDisplay: '5 meses', doses: '2ª dose', details: 'Previne meningite C' },

        // 6 meses
        { name: 'Pentavalente', ageMonths: 6, ageDisplay: '6 meses', doses: '3ª dose', details: 'DTP + Hib + Hepatite B' },
        { name: 'VIP (Poliomielite)', ageMonths: 6, ageDisplay: '6 meses', doses: '3ª dose', details: 'Vacina inativada' },

        // 9 meses
        { name: 'Febre Amarela', ageMonths: 9, ageDisplay: '9 meses', doses: 'Dose única', details: 'Áreas endêmicas ou viajantes' },

        // 12 meses
        { name: 'Tríplice Viral', ageMonths: 12, ageDisplay: '12 meses', doses: '1ª dose', details: 'Sarampo, caxumba e rubéola' },
        { name: 'Pneumocócica 10', ageMonths: 12, ageDisplay: '12 meses', doses: 'Reforço', details: 'Dose de reforço' },
        { name: 'Meningocócica C', ageMonths: 12, ageDisplay: '12 meses', doses: 'Reforço', details: 'Dose de reforço' },

        // 15 meses
        { name: 'DTP', ageMonths: 15, ageDisplay: '15 meses', doses: '1º reforço', details: 'Difteria, tétano e coqueluche' },
        { name: 'VOP (Poliomielite)', ageMonths: 15, ageDisplay: '15 meses', doses: '1º reforço', details: 'Vacina oral (gotinha)' },
        { name: 'Hepatite A', ageMonths: 15, ageDisplay: '15 meses', doses: 'Dose única', details: 'Previne hepatite A' },
        { name: 'Tetra Viral', ageMonths: 15, ageDisplay: '15 meses', doses: 'Dose única', details: 'Sarampo, caxumba, rubéola e varicela' },

        // 4 anos
        { name: 'DTP', ageMonths: 48, ageDisplay: '4 anos', doses: '2º reforço', details: 'Difteria, tétano e coqueluche' },
        { name: 'VOP (Poliomielite)', ageMonths: 48, ageDisplay: '4 anos', doses: '2º reforço', details: 'Vacina oral (gotinha)' },
        { name: 'Varicela', ageMonths: 48, ageDisplay: '4 anos', doses: 'Reforço', details: 'Se não tomou Tetra Viral' },

        // 9 anos (meninas)
        { name: 'HPV', ageMonths: 108, ageDisplay: '9 anos', doses: '2 doses', details: 'Meninas e meninos (0 e 6 meses)' },

        // 10 anos
        { name: 'Febre Amarela', ageMonths: 120, ageDisplay: '10 anos', doses: 'Reforço', details: 'Dose de reforço (se necessário)' },

        // 11-14 anos
        { name: 'Meningocócica ACWY', ageMonths: 132, ageDisplay: '11 anos', doses: 'Dose única', details: 'Adolescentes' },
        { name: 'dT (adulto)', ageMonths: 132, ageDisplay: '11 anos', doses: 'Reforço', details: 'A cada 10 anos após' },
    ];

    const calculateAge = (birth: string) => {
        if (!birth) return null;

        const birthDate = new Date(birth);
        const today = new Date();

        const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 +
            (today.getMonth() - birthDate.getMonth());

        const years = Math.floor(ageInMonths / 12);
        const months = ageInMonths % 12;

        return { ageInMonths, years, months };
    };

    const getVaccineStatus = (vaccineAgeMonths: number, currentAgeMonths: number) => {
        const windowMonths = 1; // Janela de 1 mês

        if (currentAgeMonths >= vaccineAgeMonths + windowMonths) {
            return 'completed'; // Já deveria ter tomado
        } else if (currentAgeMonths >= vaccineAgeMonths - windowMonths) {
            return 'due'; // Está no período
        } else {
            return 'upcoming'; // Ainda vai tomar
        }
    };

    const age = birthDate ? calculateAge(birthDate) : null;

    const groupedVaccines = age ? vaccineSchedule.reduce((acc, vaccine) => {
        const status = getVaccineStatus(vaccine.ageMonths, age.ageInMonths);
        if (!acc[status]) acc[status] = [];
        acc[status].push(vaccine);
        return acc;
    }, {} as Record<string, Vaccine[]>) : {};

    const completedCount = groupedVaccines.completed?.length || 0;
    const dueCount = groupedVaccines.due?.length || 0;
    const upcomingCount = groupedVaccines.upcoming?.length || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => onNavigate(AppView.DASHBOARD)}
                    className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                    <ArrowLeft size={20} />
                    Voltar
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Syringe className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Calendário Vacinal</h1>
                            <p className="text-sm text-gray-600">Acompanhamento de Vacinação Infantil</p>
                        </div>
                    </div>

                    {/* Input de Data de Nascimento */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Data de Nascimento da Criança
                        </label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Idade Atual */}
                    {age && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="text-blue-600" size={20} />
                                <span className="font-semibold text-gray-700">Idade Atual:</span>
                            </div>
                            <p className="text-2xl font-bold text-blue-600">
                                {age.years > 0 && `${age.years} ano${age.years > 1 ? 's' : ''}`}
                                {age.years > 0 && age.months > 0 && ' e '}
                                {age.months > 0 && `${age.months} mês${age.months > 1 ? 'es' : ''}`}
                                {age.years === 0 && age.months === 0 && 'Recém-nascido'}
                            </p>
                        </div>
                    )}

                    {/* Resumo */}
                    {age && (
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-green-50 rounded-xl text-center">
                                <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
                                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                                <div className="text-xs text-gray-600">Já deveria ter</div>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-xl text-center">
                                <Clock className="text-yellow-600 mx-auto mb-2" size={24} />
                                <div className="text-2xl font-bold text-yellow-600">{dueCount}</div>
                                <div className="text-xs text-gray-600">Período atual</div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl text-center">
                                <AlertCircle className="text-blue-600 mx-auto mb-2" size={24} />
                                <div className="text-2xl font-bold text-blue-600">{upcomingCount}</div>
                                <div className="text-xs text-gray-600">Próximas</div>
                            </div>
                        </div>
                    )}

                    {/* Lista de Vacinas */}
                    {age && (
                        <div className="space-y-6">
                            {/* Vacinas que já deveria ter tomado */}
                            {groupedVaccines.completed && groupedVaccines.completed.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                                        <CheckCircle className="text-green-600" size={20} />
                                        Vacinas que já deveria ter tomado
                                    </h3>
                                    <div className="space-y-2">
                                        {groupedVaccines.completed.map((vaccine, idx) => (
                                            <div key={idx} className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800">{vaccine.name}</h4>
                                                        <p className="text-sm text-gray-600">{vaccine.doses}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{vaccine.details}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-semibold text-green-600">{vaccine.ageDisplay}</div>
                                                        <div className="text-xs text-gray-500">
                                                            {vaccine.ageMonths === 0 ? 'Ao nascer' : `${vaccine.ageMonths} meses`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Vacinas do período atual */}
                            {groupedVaccines.due && groupedVaccines.due.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                                        <Clock className="text-yellow-600" size={20} />
                                        Vacinas do período atual (agende agora!)
                                    </h3>
                                    <div className="space-y-2">
                                        {groupedVaccines.due.map((vaccine, idx) => (
                                            <div key={idx} className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg animate-pulse">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800">{vaccine.name}</h4>
                                                        <p className="text-sm text-gray-600">{vaccine.doses}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{vaccine.details}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-semibold text-yellow-600">{vaccine.ageDisplay}</div>
                                                        <div className="text-xs text-gray-500">
                                                            {vaccine.ageMonths === 0 ? 'Ao nascer' : `${vaccine.ageMonths} meses`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Próximas vacinas */}
                            {groupedVaccines.upcoming && groupedVaccines.upcoming.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                                        <AlertCircle className="text-blue-600" size={20} />
                                        Próximas vacinas
                                    </h3>
                                    <div className="space-y-2">
                                        {groupedVaccines.upcoming.slice(0, 5).map((vaccine, idx) => (
                                            <div key={idx} className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800">{vaccine.name}</h4>
                                                        <p className="text-sm text-gray-600">{vaccine.doses}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{vaccine.details}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-semibold text-blue-600">{vaccine.ageDisplay}</div>
                                                        <div className="text-xs text-gray-500">
                                                            {vaccine.ageMonths === 0 ? 'Ao nascer' : `${vaccine.ageMonths} meses`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {groupedVaccines.upcoming.length > 5 && (
                                            <p className="text-sm text-gray-500 text-center">
                                                + {groupedVaccines.upcoming.length - 5} vacinas futuras
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mensagem inicial */}
                    {!birthDate && (
                        <div className="text-center py-12">
                            <Syringe className="text-gray-300 mx-auto mb-4" size={64} />
                            <p className="text-gray-500">
                                Insira a data de nascimento da criança para ver o calendário vacinal completo
                            </p>
                        </div>
                    )}

                    {/* Notas importantes */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                        <p className="text-xs text-gray-600">
                            <strong>Nota:</strong> Este calendário segue o Programa Nacional de Imunizações (PNI) do Ministério da Saúde.
                            Algumas vacinas podem ter indicações especiais ou estar disponíveis apenas em clínicas privadas.
                            Sempre consulte o pediatra para orientações personalizadas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VaccinationScheduleCalculator;

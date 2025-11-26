import React, { useState } from 'react';
import { ArrowLeft, Search, FileText, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { AppView } from '../../types';

interface BulaMedicamentoProps {
    onNavigate: (view: AppView) => void;
}

interface Medicamento {
    numProcesso: string;
    nomeProduto: string;
    nomeEmpresa: string;
    principioAtivo: string;
    categoria: string;
    dataVencimento: string;
}

const BulaMedicamento: React.FC<BulaMedicamentoProps> = ({ onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [selectedMed, setSelectedMed] = useState<Medicamento | null>(null);
    const [error, setError] = useState('');

    // API da ANVISA - Consulta Pública de Medicamentos
    const buscarMedicamento = async () => {
        if (!searchTerm.trim()) {
            setError('Digite o nome do medicamento');
            return;
        }

        setLoading(true);
        setError('');
        setMedicamentos([]);
        setSelectedMed(null);

        try {
            // API da ANVISA - Consulta de Medicamentos
            const response = await fetch(
                `https://consultas.anvisa.gov.br/api/consulta/medicamentos?filter[nomeProduto]=${encodeURIComponent(searchTerm)}&count=10`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Erro ao buscar medicamento');
            }

            const data = await response.json();

            if (data.content && data.content.length > 0) {
                setMedicamentos(data.content);
            } else {
                setError('Nenhum medicamento encontrado');
            }
        } catch (err) {
            console.error('Erro:', err);
            setError('Não foi possível conectar à API da ANVISA. Tente novamente ou use os medicamentos populares abaixo.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            buscarMedicamento();
        }
    };

    const abrirBulaAnvisa = (numProcesso: string) => {
        // Link direto para a bula na ANVISA
        window.open(
            `https://consultas.anvisa.gov.br/#/medicamentos/25351/?substancia=${numProcesso}`,
            '_blank'
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => onNavigate(AppView.DASHBOARD)}
                    className="mb-6 flex items-center gap-2 text-green-600 hover:text-green-700"
                >
                    <ArrowLeft size={20} />
                    Voltar
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                            <FileText className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Bulas de Medicamentos</h1>
                            <p className="text-sm text-gray-600">Consulta oficial ANVISA</p>
                        </div>
                    </div>

                    {/* Campo de Busca */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nome do Medicamento
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ex: Dipirona, Paracetamol, Ibuprofeno..."
                                    className="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-gray-900 placeholder-gray-400"
                                />
                                <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            </div>
                            <button
                                onClick={buscarMedicamento}
                                disabled={loading}
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Buscando...
                                    </>
                                ) : (
                                    <>
                                        <Search size={20} />
                                        Buscar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Erro */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
                            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-semibold text-red-800">Erro</p>
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Resultados */}
                    {medicamentos.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">
                                Resultados encontrados ({medicamentos.length})
                            </h3>
                            {medicamentos.map((med, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 rounded-lg hover:shadow-md transition cursor-pointer"
                                    onClick={() => setSelectedMed(med)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 text-lg">{med.nomeProduto}</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                <strong>Princípio Ativo:</strong> {med.principioAtivo || 'Não informado'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Fabricante:</strong> {med.nomeEmpresa}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Processo: {med.numProcesso}
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                abrirBulaAnvisa(med.numProcesso);
                                            }}
                                            className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2 text-sm"
                                        >
                                            <ExternalLink size={16} />
                                            Ver Bula
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Detalhes do Medicamento Selecionado */}
                    {selectedMed && (
                        <div className="mt-6 p-6 bg-white border-2 border-green-200 rounded-xl">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Detalhes do Medicamento</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Nome do Produto</p>
                                    <p className="font-semibold text-gray-800">{selectedMed.nomeProduto}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Princípio Ativo</p>
                                    <p className="font-semibold text-gray-800">{selectedMed.principioAtivo || 'Não informado'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Fabricante</p>
                                    <p className="font-semibold text-gray-800">{selectedMed.nomeEmpresa}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Categoria</p>
                                    <p className="font-semibold text-gray-800">{selectedMed.categoria || 'Não informado'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Número do Processo</p>
                                    <p className="font-semibold text-gray-800">{selectedMed.numProcesso}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Validade do Registro</p>
                                    <p className="font-semibold text-gray-800">
                                        {selectedMed.dataVencimento ? new Date(selectedMed.dataVencimento).toLocaleDateString('pt-BR') : 'Não informado'}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => abrirBulaAnvisa(selectedMed.numProcesso)}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition flex items-center justify-center gap-2"
                                >
                                    <ExternalLink size={20} />
                                    Ver Bula Completa na ANVISA
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Informações */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                        <p className="text-xs text-gray-600">
                            <strong>Fonte:</strong> Dados oficiais da ANVISA (Agência Nacional de Vigilância Sanitária).
                            As bulas são documentos oficiais aprovados pela ANVISA.
                        </p>
                    </div>
                </div>

                {/* Medicamentos Populares */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Medicamentos Populares</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['Dipirona', 'Paracetamol', 'Ibuprofeno', 'Amoxicilina', 'Omeprazol', 'Losartana', 'Metformina', 'Atorvastatina'].map((med) => (
                            <button
                                key={med}
                                onClick={() => {
                                    setSearchTerm(med);
                                    setTimeout(() => buscarMedicamento(), 100);
                                }}
                                className="p-3 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg text-sm font-medium text-gray-700 hover:text-green-700 transition"
                            >
                                {med}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulaMedicamento;

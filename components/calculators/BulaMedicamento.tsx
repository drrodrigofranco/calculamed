import React, { useState } from 'react';
import { ArrowLeft, Search, FileText, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { AppView } from '../../types';
import medicationsDB from '../../data/medications_db.json';

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

    // Busca Local no JSON (Offline)
    const buscarMedicamento = async () => {
        if (!searchTerm.trim()) {
            setError('Digite o nome do medicamento');
            return;
        }

        setLoading(true);
        setError('');
        setMedicamentos([]);
        setSelectedMed(null);

        // Simula um pequeno delay para feedback visual (opcional, mas bom para UX)
        setTimeout(() => {
            try {
                const termo = searchTerm.toLowerCase();
                const resultados = medicationsDB.filter((med: any) =>
                    med.nomeProduto.toLowerCase().includes(termo) ||
                    med.principioAtivo.toLowerCase().includes(termo)
                ).slice(0, 50); // Limita a 50 resultados

                if (resultados.length > 0) {
                    setMedicamentos(resultados as Medicamento[]);
                } else {
                    setError('Nenhum medicamento encontrado na base local.');
                }
            } catch (err) {
                console.error('Erro na busca local:', err);
                setError('Erro ao buscar medicamento.');
            } finally {
                setLoading(false);
            }
        }, 300);
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
                            <p className="text-sm text-gray-600">Consulta Offline (Base Local)</p>
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

                    {/* Erro e Fallback */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-2 mb-4 justify-center">
                                <AlertCircle className="text-red-500" size={20} />
                                <p className="text-red-600 font-medium">{error}</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-gray-600 text-sm text-center mb-1">
                                    Não encontrou na base local? Tente estas alternativas online:
                                </p>

                                <a
                                    href={`https://www.google.com/search?q=filetype:pdf+bula+${encodeURIComponent(searchTerm)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                                    </svg>
                                    Pesquisar PDF no Google
                                </a>

                                <a
                                    href={`https://consultaremedios.com.br/busca?termo=${encodeURIComponent(searchTerm)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-blue-50 border border-blue-200 text-blue-700 py-3 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Ver no Consulta Remédios
                                </a>
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
                            <strong>Fonte:</strong> Base de dados local (offline) derivada dos Dados Abertos da ANVISA.
                            Atualizado periodicamente.
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

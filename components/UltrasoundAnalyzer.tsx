import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  ScanIcon,
  UploadIcon,
  FileTextIcon,
  ActivityIcon,
  ChevronLeftIcon,
  RefreshCwIcon
} from './icons';

interface AnalysisResult {
  regiao: string;
  qualidade_imagem: string;
  achados: string[];
  impressao: string;
  recomendacoes: string[];
}

interface UltrasoundAnalyzerProps {
  onBack: () => void;
}

const PROMPT = `Você é um assistente de análise de imagens médicas com especialização em ultrassonografia, auxiliando o Dr. Rodrigo Franco.
Analise esta imagem de ultrassom e forneça um laudo estruturado em português brasileiro.

Responda SOMENTE em JSON válido com esta estrutura exata:
{
  "regiao": "região anatômica identificada (ex: abdome superior, tireoide, rins, pelve, etc.)",
  "qualidade_imagem": "Boa / Regular / Limitada — breve justificativa",
  "achados": ["achado 1", "achado 2"],
  "impressao": "impressão diagnóstica geral em 1 a 3 frases",
  "recomendacoes": ["recomendação 1", "recomendação 2"]
}

Se a imagem não for um ultrassom, coloque "Imagem não reconhecida como ultrassom" no campo regiao e explique nos achados.`;

const UltrasoundAnalyzer: React.FC<UltrasoundAnalyzerProps> = ({ onBack }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string>('image/jpeg');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Selecione um arquivo de imagem válido (PNG, JPG, WEBP).');
      return;
    }
    setResult(null);
    setError('');
    setImageMime(file.type);
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const analyzeImage = async () => {
    if (!imageSrc) return;
    setIsAnalyzing(true);
    setError('');

    try {
      const base64Data = imageSrc.split(',')[1];
      const apiKey = (process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY) as string;

      if (!apiKey) {
        throw new Error('Chave da API não configurada. Defina API_KEY ou VITE_GEMINI_API_KEY.');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent([
        { inlineData: { mimeType: imageMime, data: base64Data } },
        PROMPT
      ]);

      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Resposta inesperada da IA');

      setResult(JSON.parse(jsonMatch[0]) as AnalysisResult);
    } catch (err: any) {
      console.error('Erro na análise:', err);
      setError(err.message || 'Erro ao analisar a imagem. Verifique se a chave da API Gemini está configurada.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImageSrc(null);
    setResult(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
          title="Voltar"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ScanIcon className="w-6 h-6 text-cyan-400" />
            Analisador de Ultrassonografia do Dr Rodrigo Franco
            <span className="text-xs font-normal bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">
              v3.0
            </span>
          </h2>
          <p className="text-slate-400 text-sm">
            Assistente de interpretação com IA — suporte à decisão clínica
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — Upload */}
        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => !imageSrc && fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl transition min-h-[260px] flex items-center justify-center
              ${isDragging
                ? 'border-cyan-400 bg-cyan-500/10'
                : 'border-slate-600 hover:border-cyan-600 bg-slate-800/50 hover:bg-slate-800'}
              ${!imageSrc ? 'cursor-pointer' : ''}`}
          >
            {imageSrc ? (
              <div className="w-full p-3">
                <img
                  src={imageSrc}
                  alt="Ultrassom carregado"
                  className="max-h-64 mx-auto rounded-lg object-contain"
                />
                <p className="text-slate-500 text-xs text-center mt-2">
                  Clique em "Nova imagem" para trocar
                </p>
              </div>
            ) : (
              <div className="text-center p-8">
                <UploadIcon className="w-14 h-14 text-slate-600 mx-auto mb-3" />
                <p className="text-white font-semibold mb-1">Arraste a imagem aqui</p>
                <p className="text-slate-400 text-sm mb-3">ou clique para selecionar</p>
                <p className="text-slate-500 text-xs">PNG, JPG, WEBP • Máx. 10 MB</p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            {imageSrc ? (
              <>
                <button
                  onClick={reset}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <RefreshCwIcon className="w-4 h-4" />
                  Nova imagem
                </button>
                <button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="flex-[2] bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analisando...
                    </>
                  ) : (
                    <>
                      <ActivityIcon className="w-5 h-5" />
                      Analisar com IA
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2"
              >
                <UploadIcon className="w-5 h-5" />
                Selecionar imagem
              </button>
            )}
          </div>
        </div>

        {/* Right — Result */}
        <div>
          {!result && !isAnalyzing && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 min-h-[300px] flex items-center justify-center">
              <div className="text-center p-8">
                <FileTextIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 font-medium">Laudo aparecerá aqui</p>
                <p className="text-slate-500 text-sm mt-1">
                  Carregue uma imagem e clique em Analisar
                </p>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 min-h-[300px] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="animate-pulse w-16 h-16 bg-cyan-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <ScanIcon className="w-8 h-8 text-cyan-400" />
                </div>
                <p className="text-white font-semibold">Processando imagem...</p>
                <p className="text-slate-400 text-sm mt-1">A IA está interpretando o ultrassom</p>
              </div>
            </div>
          )}

          {result && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-900/40 to-slate-800 px-5 py-4 border-b border-slate-700 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <FileTextIcon className="w-4 h-4 text-cyan-400" />
                    Laudo de Análise
                  </h3>
                  <p className="text-cyan-300/70 text-xs mt-0.5">{result.regiao}</p>
                </div>
                <span className="text-xs text-slate-500">
                  {new Date().toLocaleDateString('pt-BR')}{' '}
                  {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="p-5 space-y-5">
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
                    Qualidade da Imagem
                  </p>
                  <p className="text-slate-200 text-sm">{result.qualidade_imagem}</p>
                </div>

                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                    Achados
                  </p>
                  <ul className="space-y-1.5">
                    {result.achados.map((achado, i) => (
                      <li key={i} className="text-slate-200 text-sm flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5 shrink-0">•</span>
                        {achado}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                    Impressão Diagnóstica
                  </p>
                  <p className="text-slate-200 text-sm bg-slate-700/60 rounded-lg p-3 leading-relaxed">
                    {result.impressao}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                    Recomendações
                  </p>
                  <ul className="space-y-1.5">
                    {result.recomendacoes.map((rec, i) => (
                      <li key={i} className="text-slate-200 text-sm flex items-start gap-2">
                        <span className="text-green-400 mt-0.5 shrink-0">→</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                  <p className="text-amber-300 text-xs leading-relaxed">
                    ⚠️ Laudo gerado por IA como suporte à decisão clínica. Não substitui
                    avaliação de médico especialista. Revise os achados com um radiologista
                    ou ultrassonografista habilitado antes de qualquer conduta.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UltrasoundAnalyzer;

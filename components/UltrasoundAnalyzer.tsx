import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  ScanIcon,
  UploadIcon,
  FileTextIcon,
  ActivityIcon,
  ChevronLeftIcon,
  RefreshCwIcon,
  EyeIcon,
  EyeOffIcon
} from './icons';

// ─── Types ────────────────────────────────────────────────────────────────────

type AIProvider = 'gemini' | 'gpt' | 'claude' | 'grok';

interface ProviderDef {
  id: AIProvider;
  label: string;
  model: string;
  keyPlaceholder: string;
  accentClass: string;
  activeClass: string;
  dotColor: string;
}

interface AnalysisResult {
  regiao: string;
  qualidade_imagem: string;
  achados: string[];
  impressao: string;
  recomendacoes: string[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PROVIDERS: ProviderDef[] = [
  {
    id: 'gemini',
    label: 'Gemini',
    model: 'gemini-1.5-flash',
    keyPlaceholder: 'AIza...',
    accentClass: 'text-blue-400',
    activeClass: 'bg-blue-600 text-white border-blue-600',
    dotColor: 'bg-blue-400',
  },
  {
    id: 'gpt',
    label: 'GPT-4o',
    model: 'gpt-4o',
    keyPlaceholder: 'sk-...',
    accentClass: 'text-green-400',
    activeClass: 'bg-green-600 text-white border-green-600',
    dotColor: 'bg-green-400',
  },
  {
    id: 'claude',
    label: 'Claude',
    model: 'claude-opus-4-7',
    keyPlaceholder: 'sk-ant-...',
    accentClass: 'text-orange-400',
    activeClass: 'bg-orange-600 text-white border-orange-600',
    dotColor: 'bg-orange-400',
  },
  {
    id: 'grok',
    label: 'Grok',
    model: 'grok-2-vision-1212',
    keyPlaceholder: 'xai-...',
    accentClass: 'text-purple-400',
    activeClass: 'bg-purple-600 text-white border-purple-600',
    dotColor: 'bg-purple-400',
  },
];

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

Se a imagem não for um ultrassom, coloque "Imagem não reconhecida como ultrassom" no campo regiao.`;

function storageKey(provider: AIProvider) {
  return `us_apikey_${provider}`;
}

function extractJson(text: string): AnalysisResult {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Resposta inesperada da IA — JSON não encontrado');
  return JSON.parse(match[0]) as AnalysisResult;
}

// ─── API callers ──────────────────────────────────────────────────────────────

async function analyzeWithGemini(base64: string, mime: string, apiKey: string): Promise<AnalysisResult> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const res = await model.generateContent([
    { inlineData: { mimeType: mime, data: base64 } },
    PROMPT,
  ]);
  return extractJson(res.response.text());
}

async function analyzeWithGPT(base64: string, mime: string, apiKey: string): Promise<AnalysisResult> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mime};base64,${base64}` } },
          { type: 'text', text: PROMPT },
        ],
      }],
      max_tokens: 1024,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.error?.message || `Erro OpenAI: ${res.status}`);
  }
  const data = await res.json();
  return extractJson(data.choices[0].message.content);
}

async function analyzeWithClaude(base64: string, mime: string, apiKey: string): Promise<AnalysisResult> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-7',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mime, data: base64 } },
          { type: 'text', text: PROMPT },
        ],
      }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.error?.message || `Erro Anthropic: ${res.status}`);
  }
  const data = await res.json();
  return extractJson(data.content[0].text);
}

async function analyzeWithGrok(base64: string, mime: string, apiKey: string): Promise<AnalysisResult> {
  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'grok-2-vision-1212',
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mime};base64,${base64}` } },
          { type: 'text', text: PROMPT },
        ],
      }],
      max_tokens: 1024,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.error?.message || `Erro xAI: ${res.status}`);
  }
  const data = await res.json();
  return extractJson(data.choices[0].message.content);
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  onBack: () => void;
}

const UltrasoundAnalyzer: React.FC<Props> = ({ onBack }) => {
  const [provider, setProvider] = useState<AIProvider>('gemini');
  const [apiKeys, setApiKeys] = useState<Record<AIProvider, string>>({
    gemini: '', gpt: '', claude: '', grok: '',
  });
  const [showKey, setShowKey] = useState(false);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState('image/jpeg');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentProvider = PROVIDERS.find(p => p.id === provider)!;

  // Load saved keys from localStorage on mount
  useEffect(() => {
    const loaded: Record<AIProvider, string> = { gemini: '', gpt: '', claude: '', grok: '' };
    for (const p of PROVIDERS) {
      loaded[p.id] = localStorage.getItem(storageKey(p.id)) || '';
    }
    setApiKeys(loaded);
  }, []);

  const handleKeyChange = (value: string) => {
    const updated = { ...apiKeys, [provider]: value };
    setApiKeys(updated);
    localStorage.setItem(storageKey(provider), value);
  };

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
    const key = apiKeys[provider].trim();
    if (!key) {
      setError(`Insira a chave da API do ${currentProvider.label} antes de analisar.`);
      return;
    }
    setIsAnalyzing(true);
    setError('');
    const base64 = imageSrc.split(',')[1];
    try {
      let res: AnalysisResult;
      if (provider === 'gemini') res = await analyzeWithGemini(base64, imageMime, key);
      else if (provider === 'gpt') res = await analyzeWithGPT(base64, imageMime, key);
      else if (provider === 'claude') res = await analyzeWithClaude(base64, imageMime, key);
      else res = await analyzeWithGrok(base64, imageMime, key);
      setResult(res);
    } catch (err: any) {
      console.error('Erro na análise:', err);
      setError(err.message || 'Erro ao analisar. Verifique a chave da API e tente novamente.');
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

      {/* Provider selector + API key */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
          Selecionar IA
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {PROVIDERS.map(p => (
            <button
              key={p.id}
              onClick={() => { setProvider(p.id); setResult(null); setError(''); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition flex items-center gap-2
                ${provider === p.id
                  ? p.activeClass
                  : 'border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white'}`}
            >
              <span className={`w-2 h-2 rounded-full ${p.dotColor}`} />
              {p.label}
            </button>
          ))}
        </div>

        {/* API key input for current provider */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKeys[provider]}
              onChange={e => handleKeyChange(e.target.value)}
              placeholder={`Chave API ${currentProvider.label} — ${currentProvider.keyPlaceholder}`}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 pl-3 pr-10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowKey(s => !s)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
            >
              {showKey ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
            </button>
          </div>
          <span className="text-slate-500 text-xs whitespace-nowrap">
            Salvo localmente
          </span>
        </div>
        <p className="text-slate-600 text-xs mt-1.5">
          Modelo: {currentProvider.model} • A chave é salva só neste navegador
        </p>
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
              ${isDragging ? 'border-cyan-400 bg-cyan-500/10' : 'border-slate-600 hover:border-cyan-600 bg-slate-800/50 hover:bg-slate-800'}
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
                      Analisar com {currentProvider.label}
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
                <p className="text-white font-semibold">Processando com {currentProvider.label}...</p>
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
                <div className="text-right">
                  <span className={`text-xs font-semibold ${currentProvider.accentClass}`}>
                    via {currentProvider.label}
                  </span>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {new Date().toLocaleDateString('pt-BR')}{' '}
                    {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
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
                    {result.achados.map((a, i) => (
                      <li key={i} className="text-slate-200 text-sm flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5 shrink-0">•</span>
                        {a}
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
                    {result.recomendacoes.map((r, i) => (
                      <li key={i} className="text-slate-200 text-sm flex items-start gap-2">
                        <span className="text-green-400 mt-0.5 shrink-0">→</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                  <p className="text-amber-300 text-xs leading-relaxed">
                    ⚠️ Laudo gerado por IA como suporte à decisão clínica. Não substitui avaliação
                    de médico especialista. Revise os achados com um radiologista ou ultrassonografista
                    habilitado antes de qualquer conduta.
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

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NewsItem } from '../types';

const getAI = () => {
  const apiKey = (process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY) as string;
  return new GoogleGenerativeAI(apiKey || '');
};

export const fetchMedicalNews = async (): Promise<NewsItem[]> => {
  try {
    const ai = getAI();
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(
      "Gere 5 resumos informativos sobre tópicos recentes e relevantes na medicina, focados em clínica geral, cardiologia ou saúde pública. O tom deve ser profissional e técnico. Retorne SOMENTE um array JSON com os campos: title, category, summary, impact. Sem texto fora do JSON."
    );

    const text = result.response.text();
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("No JSON array in response");

    return JSON.parse(match[0]) as NewsItem[];
  } catch (error) {
    console.error("Error fetching news from Gemini:", error);
    return getMockNews();
  }
};

const getMockNews = (): NewsItem[] => [
  {
    title: "Novas Diretrizes para Hipertensão Arterial",
    category: "Cardiologia",
    summary: "As sociedades de cardiologia atualizaram os alvos pressóricos para pacientes diabéticos, sugerindo um controle mais rigoroso.",
    impact: "Revisão necessária de protocolos ambulatoriais."
  },
  {
    title: "Avanços na Imunoterapia",
    category: "Oncologia",
    summary: "Estudo recente demonstra eficácia aumentada de inibidores de checkpoint em estágios iniciais de câncer pulmonar.",
    impact: "Potencial mudança no tratamento adjuvante."
  },
  {
    title: "Protocolo Atualizado para Sepse",
    category: "Emergência",
    summary: "A Surviving Sepsis Campaign publicou novas recomendações sobre ressuscitação hídrica e uso precoce de antibióticos.",
    impact: "Implementação imediata em unidades de emergência recomendada."
  },
  {
    title: "Diabetes Tipo 2 em Crianças",
    category: "Pediatria",
    summary: "Aumento significativo de casos de diabetes tipo 2 em população pediátrica relacionado à obesidade infantil.",
    impact: "Necessidade de programas preventivos escolares."
  },
  {
    title: "Telemedicina no Pós-Pandemia",
    category: "Saúde Pública",
    summary: "Estudo demonstra manutenção de 40% das consultas em formato remoto após fim da emergência sanitária.",
    impact: "Consolidação da telemedicina como modalidade permanente."
  }
];

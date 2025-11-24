import { GoogleGenerativeAI } from "@google/generative-ai";
import { NewsItem } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

export const fetchMedicalNews = async (): Promise<NewsItem[]> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return getMockNews();
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array" as const,
          items: {
            type: "object" as const,
            properties: {
              title: { type: "string" as const },
              category: { type: "string" as const },
              summary: { type: "string" as const },
              impact: { type: "string" as const }
            },
            required: ["title", "category", "summary", "impact"]
          }
        }
      }
    });

    const prompt = `Gere 5 resumos informativos sobre tópicos recentes e relevantes na medicina, focados em clínica geral, cardiologia ou saúde pública. O tom deve ser profissional e técnico. Retorne em formato JSON com os campos: title, category, summary, impact.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    if (!text) throw new Error("No data returned");
    
    return JSON.parse(text) as NewsItem[];
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

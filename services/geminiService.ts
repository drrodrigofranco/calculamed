import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem } from '../types';

const apiKey = process.env.API_KEY || '';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey });

export const fetchMedicalNews = async (): Promise<NewsItem[]> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return getMockNews();
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Gere 5 resumos informativos sobre tópicos recentes e relevantes na medicina, focados em clínica geral, cardiologia ou saúde pública. O tom deve ser profissional e técnico.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Título da notícia" },
              category: { type: Type.STRING, description: "Categoria médica (ex: Cardiologia, Pediatria)" },
              summary: { type: Type.STRING, description: "Resumo de 2 a 3 frases do conteúdo" },
              impact: { type: Type.STRING, description: "Breve explicação do impacto clínico" }
            },
            required: ["title", "category", "summary", "impact"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No data returned");
    
    return JSON.parse(jsonText) as NewsItem[];
  } catch (error) {
    console.error("Error fetching news from Gemini:", error);
    return getMockNews();
  }
};

// Fallback data in case API fails or key is missing
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
  }
];
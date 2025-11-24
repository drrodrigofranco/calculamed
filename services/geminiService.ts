// @google/genai coding guideline: Always use `import {GoogleGenAI} from "@google/genai";`.
import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem } from '../types';

// @google/genai coding guideline: The API key must be obtained exclusively from the environment variable `process.env.API_KEY`.
// @google/genai coding guideline: Do not generate any UI elements (input fields, forms, prompts, configuration sections) or code snippets for entering or managing the API key.
// Fix: Removed direct API key import from import.meta.env as per guidelines, now uses process.env.API_KEY directly.
// Fix: Removed `apiKey` variable declaration.

// @google/genai coding guideline: Always use `const ai = new GoogleGenAI({apiKey: process.env.API_KEY});`.
// Fix: Initialized GoogleGenAI with the correct named parameter and environment variable.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

export const fetchMedicalNews = async (): Promise<NewsItem[]> => {
  // @google/genai coding guideline: The API key is assumed to be pre-configured, valid, and accessible.
  // Fix: Removed API key check and direct return of mock data, as per guidelines.
  // The API client initialization is expected to handle the API key availability.

  try {
    const response = await ai.models.generateContent({
      // @google/genai coding guideline: Do not use deprecated models like `gemini-1.5-flash`.
      // Fix: Changed deprecated model to 'gemini-2.5-flash' for basic text tasks.
      model: "gemini-2.5-flash", 
      contents: [{
        parts: [{
          text: "Gere 5 resumos informativos sobre tópicos recentes e relevantes na medicina, focados em clínica geral, cardiologia ou saúde pública. O tom deve ser profissional e técnico. Retorne em formato JSON com os campos: title, category, summary, impact."
        }]
      }],
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

    // @google/genai coding guideline: Extracting Text Output from GenerateContentResponse using .text property.
    // Fix: Using response.text to get the string output directly.
    const jsonText = response.text;
    if (!jsonText) throw new Error("No data returned");
    
    return JSON.parse(jsonText) as NewsItem[];
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
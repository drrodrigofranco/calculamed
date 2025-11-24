// @google/genai coding guideline: Always use `import {GoogleGenAI} from "@google/genai";`.
import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem } from '../types';

// @google/genai coding guideline: The API key must be obtained exclusively from the environment variable `process.env.API_KEY`.
// @google/genai coding guideline: Do not generate any UI elements (input fields, forms, prompts, configuration sections) or code snippets for entering or managing the API key.
const apiKey = process.env.API_KEY;

// @google/genai coding guideline: Always use `const ai = new GoogleGenAI({apiKey: process.env.API_KEY});`.
const ai = new GoogleGenAI({apiKey: apiKey || ''});

export const fetchMedicalNews = async (): Promise<NewsItem[]> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return getMockNews();
  }

  try {
    // @google/genai coding guideline: When using generate content for text answers, do not define the model first and call generate content later. You must use `ai.models.generateContent` to query GenAI with both the model name and prompt.
    // @google/genai coding guideline: If the user does not specify any model, select 'gemini-2.5-flash' for Basic Text Tasks.
    // @google/genai coding guideline: Do not use `SchemaType`, it is not available from `@google/genai`. Use `Type` enum instead.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Updated from gemini-1.5-flash to gemini-2.5-flash as per guidelines
      contents: "Gere 5 resumos informativos sobre tópicos recentes e relevantes na medicina, focados em clínica geral, cardiologia ou saúde pública. O tone deve ser profissional e técnico. Formato JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY, // Corrected from "array" to Type.ARRAY
          items: {
            type: Type.OBJECT, // Corrected from "object" to Type.OBJECT
            properties: {
              title: { type: Type.STRING, description: "Título da notícia" }, // Corrected from "string" to Type.STRING
              category: { type: Type.STRING, description: "Categoria médica (ex: Cardiologia, Pediatria)" }, // Corrected from "string" to Type.STRING
              summary: { type: Type.STRING, description: "Resumo de 2 a 3 frases do conteúdo" }, // Corrected from "string" to Type.STRING
              impact: { type: Type.STRING, description: "Breve explicação do impacto clínico" } // Corrected from "string" to Type.STRING
            },
            required: ["title", "category", "summary", "impact"]
          }
        }
      }
    });

    // @google/genai coding guideline: The `GenerateContentResponse` object features a `text` property (not a method, so do not call `text()`) that directly returns the string output.
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
import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => {
  // Attempt to get from Vite env, fallback to process.env if available
  return import.meta.env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.API_KEY : null) || '';
};

const SYSTEM_INSTRUCTION = `
You are the JMRH Academic Assistant, a sophisticated AI integrated into the Journal of Multidisciplinary Research Horizon portal.

Your core task is to provide objective, scholarly, and technical syntheses of research papers.

Rules for "Scholar Insight":
1. Always provide exactly 2 sentences.
2. Use professional, academic, and technical language suitable for peer-review contexts.
3. Focus on the core methodology, findings, and multidisciplinary significance.
4. Avoid marketing language or subjective praise.

Journal Context:
- Publisher: JMRH Publications, Gudalur, The Nilgiris, Tamil Nadu, India.
- Frequency: Monthly, Starting: 2025, Language: English.
- Ethics: UGC & COPE compliant.

Be precise, intellectual, and helpful.
`;

// Initialize lazily to prevent top-level crashes
let aiInstance: GoogleGenerativeAI | null = null;

const getAi = () => {
  if (aiInstance) return aiInstance;
  const key = getApiKey();
  if (!key) {
    console.warn("JMRH: Gemini API Key is missing. Assistant features will be running in fallback mode.");
    return null;
  }
  try {
    aiInstance = new GoogleGenerativeAI(key);
    return aiInstance;
  } catch (e) {
    console.error("JMRH: Failed to initialize GoogleGenerativeAI:", e);
    return null;
  }
};

export async function askAssistant(prompt: string) {
  const ai = getAi();
  if (!ai) {
    return "Scholarly insight is temporarily unavailable as the assistant is currently offline. Please contact the editorial office for technical support.";
  }

  try {
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our scholarly analysis service is currently experiencing high load. Please try again shortly.";
  }
}

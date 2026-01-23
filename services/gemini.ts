
import { GoogleGenAI } from "@google/genai";

// Strictly follow initialization guidelines for GoogleGenAI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

export async function askAssistant(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // Lower temperature for more consistent scholarly output
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}

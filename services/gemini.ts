
import { GoogleGenAI } from "@google/genai";

// Strictly follow initialization guidelines for GoogleGenAI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the JMRH Academic Assistant. Help researchers with questions about the Journal of Multidisciplinary Research Horizon (JMRH).
Facts:
- Publisher: JMRH Publications, Gudalur, The Nilgiris, Tamil Nadu, India.
- Frequency: Monthly, Starting: 2025, Language: English.
- Editor-in-Chief: Dr. Karthick B (editor.jmrh@gmail.com).
- Submission Email: submit.jmrh@gmail.com
- Reviewer Correspondence: review.jmrh@gmail.com
- Publication Fee: ₹650 (INR).
- Plagiarism Limit: Strictly < 10% (UGC & COPE compliant).
- Format: Word (.doc/.docx), Times New Roman, 12pt, double-spaced, APA style.
- Review Process: Double-blind peer review (3-4 weeks).

Be professional and academic. Direct specific queries to editor.jmrh@gmail.com.
`;

export async function askAssistant(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am having trouble connecting to my knowledge base right now. Please check our guidelines page or contact the editorial team at editor.jmrh@gmail.com.";
  }
}

import { GoogleGenAI } from "@google/genai";

export async function checkExplicitContent(message: string, name: string): Promise<boolean> {
  if (!process.env.GEMINI_API_KEY) {
    return false; // Fail open if no API key
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `You are a strict content moderator for a professional portfolio website's contact form.
Analyze the following submission.
Determine if the message or name contains explicit, toxic, offensive, highly inappropriate, or blatant spam/scam content.
Return ONLY a valid JSON object with a single boolean field "isExplicit". Set it to true if it violates professional standards or contains explicit/toxic content, false if it is safe/normal.

Name: "${name}"
Message: "${message}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    if (response.text) {
      const jsonStr = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(jsonStr);
      return result.isExplicit === true;
    }
  } catch (error) {
    console.error("Content moderation failed:", error);
  }
  
  return false;
}

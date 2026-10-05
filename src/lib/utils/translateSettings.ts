import { GoogleGenAI } from "@google/genai";

function isLocalizedString(obj: any): obj is { id: string; en?: string } {
  if (!obj || typeof obj !== "object") return false;
  const keys = Object.keys(obj);
  // It should have 'id' and optionally 'en', and nothing else.
  // Wait, sometimes form data might have other keys? No, LocalizedString schema only has id and en.
  if (keys.length === 0 || keys.length > 2) return false;
  if (!keys.includes("id")) return false;
  if (!keys.every(k => k === "id" || k === "en")) return false;
  return typeof obj.id === "string";
}

type TranslateJob = { path: string[]; textToTranslate: string };

function setByPath(obj: any, path: string[], value: any) {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    current = current[path[i]];
  }
  current[path[path.length - 1]] = value;
}

export async function autoTranslateSettings(newData: any, currentData: any): Promise<any> {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not found. Skipping auto-translation.");
    return newData;
  }

  // Deep clone to avoid mutating the original input immediately
  const resultData = JSON.parse(JSON.stringify(newData));
  const jobs: TranslateJob[] = [];

  function traverse(newObj: any, currentObj: any, path: string[]) {
    if (isLocalizedString(newObj)) {
      const currentStr = isLocalizedString(currentObj) ? currentObj : null;
      // We translate if 'en' is empty, OR if 'id' changed from what it was previously
      const idText = newObj.id.trim();
      const needsTranslation =
        idText && (!newObj.en || (currentStr && idText !== currentStr.id?.trim()));

      if (needsTranslation) {
        jobs.push({ path: [...path, "en"], textToTranslate: idText });
      }
    } else if (Array.isArray(newObj)) {
      const currentArr = Array.isArray(currentObj) ? currentObj : [];
      newObj.forEach((item, index) => {
        // For arrays, if it's a new item (no currentArr[index]), we pass null
        traverse(item, currentArr[index], [...path, String(index)]);
      });
    } else if (newObj && typeof newObj === "object") {
      const currentObjSafe = currentObj && typeof currentObj === "object" ? currentObj : {};
      for (const key of Object.keys(newObj)) {
        traverse(newObj[key], currentObjSafe[key], [...path, key]);
      }
    }
  }

  traverse(resultData, currentData, []);

  if (jobs.length === 0) {
    return resultData; // Nothing to translate
  }

  console.log(`Auto-translating ${jobs.length} fields...`);
  
  const inputObj: Record<string, string> = {};
  jobs.forEach((job, index) => {
    inputObj[index] = job.textToTranslate;
  });

  const prompt = `Translate the following Indonesian texts to professional English.
Return ONLY a valid JSON object where the keys are the exact same numbers provided, and the values are the translated English strings. 
Do not wrap in markdown blocks, just return raw JSON.

Input:
${JSON.stringify(inputObj, null, 2)}`;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;
    if (responseText) {
      const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const translations = JSON.parse(jsonStr);

      jobs.forEach((job, index) => {
        if (translations[index]) {
          setByPath(resultData, job.path, translations[index]);
        }
      });
      console.log("Auto-translation complete!");
    }
  } catch (error) {
    console.error("Auto-translation failed:", error);
    // If it fails, we still return the original (untranslated) data so the save doesn't fail completely.
  }

  return resultData;
}

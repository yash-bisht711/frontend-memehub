import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;


export async function generateCaptions(promptText, count = 3) {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: `Suggest ${count} super-short and one-word, funny meme captions or hash-tags for: "${promptText}". Return hash-tags as a list.`
              }
            ]
          }
        ]
      }
    );

    const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return raw===""?"No caption generated.":raw.split("\n").map((line) => line.replace(/^\d+\.\s*/, "").trim()).filter((line) => line);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return ["Error generating captions."];
  }
}

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the client
// Note: In a real production env, ensure the API key is restricted.
// We use the process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "Cosmic Assistant" for Ankur Tripathi Astrology.
Your persona is calm, wise, reassuring, non-judgmental, and spiritually grounded.
You assist users in understanding the services offered by Astrologer Ankur Tripathi.

Brand Details:
- Name: Ankur Tripathi Astrology
- Astrologer: Ankur Tripathi (10+ years experience, Modern + Vedic Approach)
- Tagline: Clarity. Alignment. Destiny.
- Key Services: Birth Chart Analysis, Matchmaking, Vastu, Numerology, Career Guidance.
- Consultation Methods: Phone, WhatsApp, Video Call, In-Person, AstroSage App.

Guidelines:
- Keep answers concise (under 100 words) unless asked for details.
- Tone: Gentle, empathetic, professional. Avoid scare tactics or superstition.
- If a user asks to book, guide them to the "Booking" page.
- Do not provide specific astrological predictions (e.g., "When will I get married?"). Instead, say "To get a personalized accurate prediction based on your Kundali, please book a consultation with Ankur Tripathi."
`;

let chatSession: Chat | null = null;

export const initChatSession = () => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<string>> => {
  if (!chatSession) {
    initChatSession();
  }
  
  if (!chatSession) {
    throw new Error("Failed to initialize chat session");
  }

  try {
    const resultStream = await chatSession.sendMessageStream({ message });
    
    return {
      [Symbol.asyncIterator]: async function* () {
        for await (const chunk of resultStream) {
           // Explicit cast as per instructions regarding streaming chunks
           const c = chunk as GenerateContentResponse;
           if (c.text) {
             yield c.text;
           }
        }
      }
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
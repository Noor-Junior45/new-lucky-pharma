import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

// Initialize safely - if API key is missing, it will throw only when called, not on app load
const getAIClient = () => {
    let apiKey = '';
    try {
        // Safe access to process.env for browser environments
        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
            apiKey = process.env.API_KEY;
        }
    } catch (e) {
        console.warn("Could not access process.env");
    }

    if (!apiKey) {
        console.warn("API Key is missing.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

const SYSTEM_INSTRUCTION = `You are a friendly AI Pharmacist assistant for 'New Lucky Pharma', a trusted medical store in Hanwara, Jharkhand.

RULES:
1. If the user starts with a simple greeting (e.g., "Hi", "Hello", "How are you?"), reply briefly with a friendly, single-sentence greeting and ask how you can help (e.g., "Hello! How can I assist you with your health questions today?").
2. MEDICAL/PRODUCT QUERIES:
   - Provide wellness tips and healthy living advice proactively.
   - Format your response strictly in a NUMBERED LIST (1., 2., 3.).
   - Each point must be on a new line.
   - Keep answers concise (max 5-10 lines total).
   - Ensure the format is clean and suitable for screenshots.
   - Do not write long paragraphs.
3. MANDATORY DISCLAIMER: End every medical response with exactly: "Please consult a doctor for serious advice."
4. LOCATION: If asked, say: "We are located on Main Road, Hanwara (814154), open 7 days a week."

Example Format:
1. [Medicine Name/Tip]
2. [Usage/Benefit]
3. [When to take]
4. [Important Warning]
Please consult a doctor for serious advice.`;

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
    try {
        const ai = getAIClient();
        if (!ai) return "I am currently offline. Please check back later.";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });

        const text = response.text;
        return text || "I didn't quite catch that. Could you rephrase?";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I'm having trouble connecting to the server. Please consult a pharmacist in person.";
    }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
    try {
        const ai = getAIClient();
        if (!ai) return [];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a list of 4 popular pharmaceutical products available in India related to '${query}'.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.INTEGER },
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            imageKeyword: { type: Type.STRING, description: "A single keyword to search for an image, e.g., 'pill', 'syrup', 'bottle'" }
                        },
                        required: ["id", "name", "description", "imageKeyword"]
                    }
                }
            }
        });

        const rawData = response.text;
        if (!rawData) return [];

        const parsedData = JSON.parse(rawData);
        
        // Transform the AI response to match our Product type, adding placeholder images
        return parsedData.map((item: any, index: number) => ({
            id: Date.now() + index, // Unique ID
            name: item.name,
            description: item.description,
            // Use a reliable placeholder service with the name or keyword
            image: `https://placehold.co/600x400/e2e8f0/1e293b?text=${encodeURIComponent(item.name)}`,
            delay: `reveal-delay-${(index * 100) % 400}`
        }));

    } catch (error) {
        console.error("Gemini Search Error:", error);
        return [];
    }
};
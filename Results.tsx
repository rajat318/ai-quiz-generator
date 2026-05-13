import { GoogleGenAI, Type } from "@google/genai";
import { Question, QuizConfig } from "../types";

// Note: GEMINI_API_KEY is injected at runtime by the platform
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const quizSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Provide options for MCQs. If True/False, provide ['True', 'False']. For others, leave empty array."
          },
          correctAnswer: { type: Type.STRING },
          explanation: { type: Type.STRING },
          difficulty: { type: Type.STRING },
          topic: { type: Type.STRING },
          type: { type: Type.STRING }
        },
        required: ["question", "correctAnswer", "explanation", "difficulty", "topic", "type"]
      }
    }
  },
  required: ["questions"]
};

export async function generateAIQuiz(config: QuizConfig): Promise<Question[]> {
  const prompt = `
    Generate a professional quiz with exactly ${config.count} questions.
    Subject: ${config.subject}
    Topic/Context: ${config.topic}
    Difficulty: ${config.difficulty}
    Language: ${config.language}
    Exam Type: ${config.examType}
    Question Distribution: ${JSON.stringify(config.typeRatio)}

    Rules:
    1. For MCQ: Exactly 4 options.
    2. For True/False: Options must be ["True", "False"].
    3. For Fill in the blanks: Provide the correct answer in correctAnswer.
    4. Provide detailed explanations for every answer.
    5. Ensure conceptual and high-order thinking (HOTS) questions are included.
    6. No duplicates.
    7. Context material (if provided): ${config.contextText?.substring(0, 5000) || "None"}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview", // Complex reasoning for study tools
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
      }
    });

    const data = JSON.parse(response.text);
    return data.questions.map((q: any, index: number) => ({
      ...q,
      id: `q-${Date.now()}-${index}`
    }));
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
}

export async function askStudyAssistant(message: string, context?: string) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `You are EduQuiz AI Assistant. Help students with doubts, summarize topics, and give study tips. 
      If context is provided, answer based on it. Context: ${context || "None"}`
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
}

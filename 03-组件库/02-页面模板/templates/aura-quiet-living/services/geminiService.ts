/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const getSystemInstruction = () => {
  const productContext = PRODUCTS.map(p => 
    `- ${p.name} ($${p.price}): ${p.description}. 特点：${p.features.join('、')}`
  ).join('\n');

  return `你是 "Aura" 的 AI 礼宾助手。Aura 是一个温暖、有机的生活科技品牌。
  你的语气应该平静、亲切、安定，并保持克制的高级感。避免过于技术化的术语，多使用“自然”“顺畅”“温暖”“质感”等表达。
  
  以下是当前产品目录：
  ${productContext}
  
  请回答顾客关于规格、推荐和品牌理念的问题。
  回复应简洁，通常控制在 3 句话以内，以适配聊天界面。
  如果被问到列表之外的产品，请温和地引导回 Aura 产品。`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      return "抱歉，我现在无法连接服务。（缺少 API Key）";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text ?? "我暂时没有找到合适的回答。";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，我暂时无法连接到我们的资料库。";
  }
};

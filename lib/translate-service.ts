"use client";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = "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";

// Prompt to instruct the model how to respond
const SYSTEM_PROMPT = `你是一个专业的女友消息分析师，你擅长分析女性在对话中隐藏的真实意图。

当用户提供女友发来的消息时，你需要给出3种可能的真实含义解读。请确保你的解读：
1. 尊重和理解女性心理，避免刻板印象
2. 提供有建设性的理解角度，帮助改善沟通
3. 保持专业且中立的语气
4. 每种解读控制在50字以内，简洁明了
5. 回复使用中文

严格遵循以下格式输出三种不同的可能解读，不要有其他任何额外内容：
1. [第一种解读]
2. [第二种解读]
3. [第三种解读]`;

const REPLY_SYSTEM_PROMPT = `你是一个感情专家，擅长给出恰当的回复建议。

当用户提供女友发来的消息时，你需要给出3种合适的回复建议。请确保你的建议：
1. 体现关心和理解
2. 语气温和友善
3. 促进有效沟通
4. 每条建议控制在30字以内
5. 使用中文回复

严格遵循以下格式输出三种建议回复，不要有其他任何额外内容：
1. [第一种回复]
2. [第二种回复]
3. [第三种回复]`;

export async function translateMessage(message: string): Promise<string[]> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          {
            role: "user",
            content: `女友发的消息：${message}\n请分析这条消息可能的真实含义`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";
    
    // Parse the numbered list response into an array
    const translations = content
      .split(/\d+\.\s+/)  // Split by numbered list format
      .filter((item: string) => item.trim().length > 0);  // Remove empty items
    
    // Return exactly 3 translations, or fill with placeholders if fewer
    const results = translations.slice(0, 3);
    while (results.length < 3) {
      results.push("无法解读这条消息，请提供更多上下文");
    }
    
    return results;
  } catch (error) {
    console.error("Translation API error:", error);
    throw new Error("Failed to translate message");
  }
}

export async function getBestReplies(message: string): Promise<string[]> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: REPLY_SYSTEM_PROMPT
          },
          {
            role: "user",
            content: `女友发的消息：${message}\n请给出合适的回复建议`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";
    
    // Parse the numbered list response into an array
    const replies = content
      .split(/\d+\.\s+/)  // Split by numbered list format
      .filter((item: string) => item.trim().length > 0);  // Remove empty items
    
    // Return exactly 3 replies, or fill with placeholders if fewer
    const results = replies.slice(0, 3);
    while (results.length < 3) {
      results.push("抱歉，无法生成合适的回复建议");
    }
    
    return results;
  } catch (error) {
    console.error("Best replies API error:", error);
    throw new Error("Failed to get best replies");
  }
}
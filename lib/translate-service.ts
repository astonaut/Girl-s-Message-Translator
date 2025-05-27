const API_URL = "https://openrouter.ai/api/v1/chat/completions";

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
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        type: "translate"
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Translation API error:", error);
    throw new Error("Failed to translate message");
  }
}

export async function getBestReplies(message: string): Promise<string[]> {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        type: "reply"
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Best replies API error:", error);
    throw new Error("Failed to get best replies");
  }
}
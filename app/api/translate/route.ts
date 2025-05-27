import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_API_KEY;

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

export async function POST(request: NextRequest) {
  try {
    console.log("API_KEY exists:", !!API_KEY);
    if (!API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const { message, type } = await request.json();

    if (!message || !type) {
      return NextResponse.json(
        { error: "Message and type are required" },
        { status: 400 }
      );
    }

    const systemPrompt = type === "translate" ? SYSTEM_PROMPT : REPLY_SYSTEM_PROMPT;
    const userPrompt = type === "translate" 
      ? `女友发的消息：${message}\n请分析这条消息可能的真实含义`
      : `女友发的消息：${message}\n请给出合适的回复建议`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API request failed with status ${response.status}:`, errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";
    
    // Parse the numbered list response into an array
    const results = content
      .split(/\d+\.\s+/)
      .filter((item: string) => item.trim().length > 0)
      .slice(0, 3);
    
    // Fill with placeholders if fewer than 3 results
    while (results.length < 3) {
      const placeholder = type === "translate" 
        ? "无法解读这条消息，请提供更多上下文"
        : "抱歉，无法生成合适的回复建议";
      results.push(placeholder);
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 
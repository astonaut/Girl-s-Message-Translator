"use client";

import { useState } from "react";
import { ClipboardCopy, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { getBestReplies } from "@/lib/translate-service";

interface TranslationResultsProps {
  message: string;
  translations: string[];
}

export default function TranslationResults({ message, translations }: TranslationResultsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [bestReplies, setBestReplies] = useState<string[]>([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      toast({
        title: "已复制",
        description: "翻译结果已复制到剪贴板",
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    });
  };

  const handleGetBestReplies = async () => {
    setIsLoadingReplies(true);
    try {
      const replies = await getBestReplies(message);
      setBestReplies(replies);
    } catch (error) {
      toast({
        title: "获取回复失败",
        description: "无法生成回复建议，请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsLoadingReplies(false);
    }
  };

  return (
    <div className="mt-8 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">可能的含义</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">共 {translations.length} 种解读</div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0 mt-1">
            <span className="text-gray-600 dark:text-gray-300 text-sm">她</span>
          </div>
          <div className="max-w-[85%]">
            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg rounded-tl-none border border-gray-200 dark:border-gray-600">
              <p className="text-gray-800 dark:text-gray-200">{message}</p>
            </div>
          </div>
        </div>

        {translations.map((translation, index) => (
          <div className="flex items-start gap-3" key={index}>
            <div className="w-8 h-8 rounded-full bg-[#07C160] flex items-center justify-center shrink-0 mt-1">
              <span className="text-white text-sm">译</span>
            </div>
            <div className="max-w-[85%] w-full">
              <div className="bg-[#95ec9c] dark:bg-[#095c2d] p-3 rounded-lg rounded-tl-none">
                <div className="flex justify-between items-start gap-4">
                  <p className="text-gray-800 dark:text-white flex-1">{translation}</p>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 rounded-full"
                    onClick={() => copyToClipboard(translation, index)}
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-[#07C160]" />
                    ) : (
                      <ClipboardCopy className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!bestReplies.length && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleGetBestReplies}
              disabled={isLoadingReplies}
              className="bg-[#07C160] hover:bg-[#06b356] text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {isLoadingReplies ? "生成回复中..." : "获取最佳回复"}
            </Button>
          </div>
        )}

        {bestReplies.length > 0 && (
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">建议回复</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">选择一个合适的回复</div>
            </div>
            {bestReplies.map((reply, index) => (
              <div className="flex items-start gap-3" key={`reply-${index}`}>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm">回</span>
                </div>
                <div className="max-w-[85%] w-full">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg rounded-tl-none">
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-gray-800 dark:text-white flex-1">{reply}</p>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => copyToClipboard(reply, index + translations.length)}
                      >
                        {copiedIndex === index + translations.length ? (
                          <Check className="h-4 w-4 text-blue-500" />
                        ) : (
                          <ClipboardCopy className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
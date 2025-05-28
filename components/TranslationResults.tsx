"use client";

import { useState } from "react";
import { ClipboardCopy, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        description: "内容已复制到剪贴板",
        className: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
      });
      
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
    <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
      {/* 原始消息 */}
      <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-slate-600 to-slate-400 rounded-full mr-3 sm:mr-4"></div>
          <h3 className="text-lg sm:text-xl font-light text-slate-800 dark:text-slate-200 tracking-wide">
            原始消息
          </h3>
        </div>
        
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center shrink-0">
            <span className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-light">她</span>
          </div>
          <div className="flex-1">
            <div className="bg-white dark:bg-slate-700 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-600 shadow-sm">
              <p className="text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-light">{message}</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI解读结果 */}
      <div className="bg-white/95 dark:bg-slate-800/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
          <div className="flex items-center">
            <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-slate-600 to-slate-400 rounded-full mr-3 sm:mr-4"></div>
            <h3 className="text-lg sm:text-xl font-light text-slate-800 dark:text-slate-200 tracking-wide">
              AI解读结果
            </h3>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light self-start sm:self-auto">
            {translations.length} 种解读
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {translations.map((translation, index) => (
            <div 
              className="flex items-start gap-4 sm:gap-6" 
              key={index}
            >
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-slate-700 dark:bg-slate-600 flex items-center justify-center shrink-0">
                <span className="text-white text-xs sm:text-sm font-light">AI</span>
              </div>
              <div className="flex-1">
                <div className="bg-slate-50 dark:bg-slate-700/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-600 transition-all duration-300 hover:shadow-md">
                  <div className="flex justify-between items-start gap-3 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2 sm:mb-3">
                        <span className="text-xs font-light text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-600 px-2 sm:px-3 py-1 rounded-full">
                          解读 {index + 1}
                        </span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-light">{translation}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-full bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 transition-all duration-200 shrink-0"
                      onClick={() => copyToClipboard(translation, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                      ) : (
                        <ClipboardCopy className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600 dark:text-slate-300" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!bestReplies.length && (
        <div className="flex justify-center">
          <Button
            onClick={handleGetBestReplies}
            disabled={isLoadingReplies}
            size="lg"
            className="bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white transition-all duration-300 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-3 font-light tracking-wide shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            <MessageCircle className="h-4 w-4 mr-2 sm:mr-3" />
            {isLoadingReplies ? "生成回复中..." : "获取最佳回复"}
          </Button>
        </div>
      )}

      {bestReplies.length > 0 && (
        <div className="bg-white/95 dark:bg-slate-800/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
            <div className="flex items-center">
              <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-slate-600 to-slate-400 rounded-full mr-3 sm:mr-4"></div>
              <h3 className="text-lg sm:text-xl font-light text-slate-800 dark:text-slate-200 tracking-wide">
                建议回复
              </h3>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light self-start sm:self-auto">
              选择合适的回复
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {bestReplies.map((reply, index) => (
              <div 
                className="flex items-start gap-4 sm:gap-6" 
                key={`reply-${index}`}
              >
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs sm:text-sm font-light">你</span>
                </div>
                <div className="flex-1">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-200 dark:border-blue-700 transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start gap-3 sm:gap-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2 sm:mb-3">
                          <span className="text-xs font-light text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 px-2 sm:px-3 py-1 rounded-full">
                            回复 {index + 1}
                          </span>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-light">{reply}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-full bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 transition-all duration-200 shrink-0"
                        onClick={() => copyToClipboard(reply, index + translations.length)}
                      >
                        {copiedIndex === index + translations.length ? (
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                        ) : (
                          <ClipboardCopy className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Send, RotateCw, ClipboardCopy, Clock } from "lucide-react";
import { translateMessage } from "@/lib/translate-service";
import { Translation, saveTranslation, getRecentTranslations } from "@/lib/storage-service";
import TranslationResults from "@/components/TranslationResults";
import HistoryDrawer from "@/components/HistoryDrawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function TranslationForm() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translations, setTranslations] = useState<string[]>([]);
  const [recentTranslations, setRecentTranslations] = useState<Translation[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { toast } = useToast();

  // Load recent translations from localStorage
  useEffect(() => {
    setRecentTranslations(getRecentTranslations());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "请输入消息",
        description: "请输入女友发给你的消息内容",
        variant: "destructive",
      });
      return;
    }

    if (message.trim().length < 2) {
      toast({
        title: "消息太短",
        description: "请输入至少2个字符的消息",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTranslations([]);

    try {
      const results = await translateMessage(message);
      
      if (!results || results.length === 0) {
        throw new Error("未获取到解读结果");
      }
      
      setTranslations(results);
      
      // Save to localStorage
      saveTranslation({
        message,
        translations: results,
        timestamp: new Date().toISOString(),
      });
      
      // Update recent translations
      setRecentTranslations(getRecentTranslations());
      
      toast({
        title: "解读完成",
        description: `成功生成 ${results.length} 种解读`,
        className: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
      });
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        title: "解读失败",
        description: error instanceof Error ? error.message : "无法获取解读结果，请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryItemClick = (item: Translation) => {
    setMessage(item.message);
    setTranslations(item.translations);
    setIsHistoryOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        <div className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            placeholder="请输入她的消息..."
            className="min-h-[140px] sm:min-h-[160px] p-4 sm:p-6 resize-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-1 focus:ring-slate-400 dark:focus:ring-slate-500 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl sm:rounded-2xl text-base sm:text-lg transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500 font-light leading-relaxed"
            disabled={isLoading}
          />
          {message.length > 0 && (
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center gap-2">
              <div className="text-xs text-slate-400 bg-slate-50 dark:bg-slate-700 px-2 sm:px-3 py-1 rounded-full font-light">
                {message.length} 字
              </div>
              <div className="text-xs text-slate-400 bg-slate-50 dark:bg-slate-700 px-2 py-1 rounded-full font-light hidden sm:block">
                Ctrl+Enter 提交
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 font-light tracking-wide"
            onClick={() => setIsHistoryOpen(true)}
          >
            <Clock className="h-4 w-4 mr-2 sm:mr-3" />
            历史记录
          </Button>

          <Button
            type="submit"
            size="lg"
            className="bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white transition-all duration-300 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-3 font-light tracking-wide shadow-lg hover:shadow-xl"
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? (
              <>
                <RotateCw className="mr-2 sm:mr-3 h-4 w-4 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Send className="mr-2 sm:mr-3 h-4 w-4" />
                开始解读
              </>
            )}
          </Button>
        </div>
      </form>

      {translations.length > 0 && (
        <TranslationResults 
          message={message} 
          translations={translations} 
        />
      )}

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        translations={recentTranslations}
        onItemClick={handleHistoryItemClick}
      />
    </div>
  );
}
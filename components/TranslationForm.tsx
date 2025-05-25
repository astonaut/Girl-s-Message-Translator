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

    setIsLoading(true);
    setTranslations([]);

    try {
      const results = await translateMessage(message);
      setTranslations(results);
      
      // Save to localStorage
      saveTranslation({
        message,
        translations: results,
        timestamp: new Date().toISOString(),
      });
      
      // Update recent translations
      setRecentTranslations(getRecentTranslations());
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        title: "翻译失败",
        description: "无法获取翻译结果，请稍后再试",
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="请输入她发给你的消息..."
            className="min-h-[120px] p-4 resize-none bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-[#07C160] focus:ring-[#07C160] placeholder-gray-400"
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-gray-500 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsHistoryOpen(true)}
          >
            <Clock className="h-4 w-4 mr-2" />
            历史记录
          </Button>

          <Button
            type="submit"
            className="bg-[#07C160] hover:bg-[#06b356] text-white"
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                翻译中...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                开始翻译
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
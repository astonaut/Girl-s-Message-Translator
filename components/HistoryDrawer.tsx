"use client";

import { useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X, Trash2 } from "lucide-react";
import { Translation, clearTranslations } from "@/lib/storage-service";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  translations: Translation[];
  onItemClick: (translation: Translation) => void;
}

export default function HistoryDrawer({ 
  isOpen, 
  onClose, 
  translations, 
  onItemClick 
}: HistoryDrawerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  const handleClearHistory = () => {
    clearTranslations();
    toast({
      title: "历史记录已清空",
      description: "所有历史翻译记录已被删除",
    });
    onClose();
  };

  const formatTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { 
        addSuffix: true,
        locale: zhCN
      });
    } catch (e) {
      return "未知时间";
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-medium">历史记录</SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {translations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <span className="text-gray-400 dark:text-gray-500 text-xl">📝</span>
                </div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  暂无历史记录
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-xs">
                  翻译的消息将会保存在这里，方便你随时查看
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {translations.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => onItemClick(item)}
                  >
                    <p className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1 mb-1">
                      {item.message}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-2">
                      {item.translations[0]}
                    </p>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {formatTime(item.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {translations.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                variant="outline" 
                className="w-full text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                onClick={handleClearHistory}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                清空历史记录
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
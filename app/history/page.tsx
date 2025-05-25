"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Translation, getRecentTranslations, clearTranslations } from "@/lib/storage-service";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";

export default function HistoryPage() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Set page title
    document.title = "历史记录 | 女友消息翻译";
    
    // Load translations from localStorage
    setTranslations(getRecentTranslations());
  }, []);

  const handleClearHistory = () => {
    clearTranslations();
    setTranslations([]);
    toast({
      title: "历史记录已清空",
      description: "所有历史翻译记录已被删除",
    });
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
    <main className="flex min-h-screen flex-col bg-[#EDEDED] dark:bg-gray-900">
      <header className="w-full bg-[#07C160] dark:bg-[#1AAD19] py-4 px-6 flex items-center shadow-sm">
        <div className="max-w-3xl w-full mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-white hover:text-white/90">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-white ml-4">历史记录</h1>
          </div>
          
          {translations.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  清空
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确定要清空历史记录吗？</AlertDialogTitle>
                  <AlertDialogDescription>
                    此操作将删除所有历史翻译记录，且无法恢复。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearHistory}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    确定删除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </header>

      <ScrollArea className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
        {translations.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
              <span className="text-gray-400 dark:text-gray-500 text-xl">📝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              暂无历史记录
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-6">
              翻译的消息将会保存在这里，方便你随时查看
            </p>
            <Button asChild>
              <Link href="/" className="bg-[#07C160] hover:bg-[#06b356] text-white">
                返回首页
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {translations.map((item, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
              >
                <div className="mb-3">
                  <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {formatTime(item.timestamp)}
                  </div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {item.message}
                  </h3>
                </div>

                <div className="pl-4 border-l-2 border-[#07C160] space-y-2">
                  {item.translations.map((translation, tIndex) => (
                    <p 
                      key={tIndex} 
                      className="text-gray-600 dark:text-gray-300 text-sm"
                    >
                      {tIndex + 1}. {translation}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <footer className="w-full bg-white dark:bg-gray-800 py-4 px-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 女友消息翻译 | 帮你理解她的真心话</p>
          <p className="mt-1">
            <Link href="/" className="text-[#07C160] hover:underline">
              返回首页
            </Link>{" "}
            •{" "}
            <Link href="/about" className="text-[#07C160] hover:underline">
              关于我们
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
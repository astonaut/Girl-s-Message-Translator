"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import TranslationForm from "@/components/TranslationForm";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Home() {
  // Set page title
  useEffect(() => {
    document.title = "女友消息翻译 | 了解她的真实意图";
  }, []);

  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center bg-[#EDEDED] dark:bg-gray-900">
        <header className="w-full bg-[#07C160] dark:bg-[#1AAD19] py-4 px-6 flex items-center justify-center shadow-sm">
          <div className="max-w-3xl w-full flex items-center">
            <MessageSquare className="text-white mr-2 h-6 w-6" />
            <h1 className="text-xl font-bold text-white">女友消息翻译</h1>
          </div>
        </header>

        <div className="flex-1 w-full max-w-3xl px-4 py-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">了解她的真实意图</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              输入女友发给你的消息，我们将分析并翻译出她可能想表达的真实意图。
            </p>
            <TranslationForm />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">使用提示</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>输入完整的消息以获得更准确的翻译</li>
              <li>提供上下文可以帮助更好地理解含义</li>
              <li>记住，这只是参考，沟通才是解决问题的最佳方式</li>
            </ul>
          </div>
        </div>

        <footer className="w-full bg-white dark:bg-gray-800 py-4 px-6 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-3xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2025 女友消息翻译 | 帮你理解她的真心话</p>
            <p className="mt-1">
              <Link href="/history" className="text-[#07C160] hover:underline">
                历史记录
              </Link>{" "}
              •{" "}
              <Link href="/about" className="text-[#07C160] hover:underline">
                关于我们
              </Link>
            </p>
          </div>
        </footer>
      </main>
    </ThemeProvider>
  );
}
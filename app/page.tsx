"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import TranslationForm from "@/components/TranslationForm";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Home() {
  // Set page title and meta
  useEffect(() => {
    document.title = "女友消息翻译器 - AI帮你理解她的真实意图";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '使用AI技术解读女友消息的真实含义，提供智能回复建议，让你更好地理解她的心思。');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = '使用AI技术解读女友消息的真实含义，提供智能回复建议，让你更好地理解她的心思。';
      document.head.appendChild(meta);
    }

    // Add keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', '女友消息翻译,AI解读,情侣沟通,消息分析,智能回复');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = '女友消息翻译,AI解读,情侣沟通,消息分析,智能回复';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900">
        <header className="w-full bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 dark:from-slate-700 dark:via-gray-700 dark:to-zinc-700 py-8 px-6 flex items-center justify-center shadow-2xl backdrop-blur-md border-b border-white/10">
          <div className="max-w-3xl w-full flex items-center justify-center">
                          <div className="flex items-center space-x-4">
                <div className="relative">
                  <MessageSquare className="text-white h-7 w-7" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full"></div>
                </div>
                <h1 className="text-2xl font-light text-white tracking-wide">
                  女友消息翻译器
                </h1>
              </div>
          </div>
        </header>

        <div className="flex-1 w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* 简洁的介绍区域 */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 opacity-80">
              💬
            </div>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed px-4">
              理解她话语背后的真实意图
            </p>
          </div>

          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 sm:p-10 mb-8 sm:mb-12 transition-all duration-500 hover:shadow-3xl">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-slate-600 to-slate-400 rounded-full mr-3 sm:mr-4"></div>
              <h2 className="text-xl sm:text-2xl font-light text-slate-800 dark:text-slate-200 tracking-wide">
                消息解读
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed font-light">
              输入她的消息，AI将为你解读其中的深层含义
            </p>
            <TranslationForm />
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/30 dark:border-slate-700/30 p-6 sm:p-10 transition-all duration-500">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-slate-500 to-slate-300 rounded-full mr-3 sm:mr-4"></div>
              <h2 className="text-xl sm:text-2xl font-light text-slate-800 dark:text-slate-200 tracking-wide">
                使用建议
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-white/60 dark:bg-slate-700/30 rounded-xl sm:rounded-2xl border border-slate-200/50 dark:border-slate-600/30">
                <div className="w-1 h-5 sm:h-6 bg-slate-400 rounded-full mt-1"></div>
                <p className="text-slate-700 dark:text-slate-300 font-light leading-relaxed text-sm sm:text-base">输入完整的消息以获得更准确的解读</p>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-white/60 dark:bg-slate-700/30 rounded-xl sm:rounded-2xl border border-slate-200/50 dark:border-slate-600/30">
                <div className="w-1 h-5 sm:h-6 bg-slate-400 rounded-full mt-1"></div>
                <p className="text-slate-700 dark:text-slate-300 font-light leading-relaxed text-sm sm:text-base">提供对话背景有助于更好地理解语境</p>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-white/60 dark:bg-slate-700/30 rounded-xl sm:rounded-2xl border border-slate-200/50 dark:border-slate-600/30">
                <div className="w-1 h-5 sm:h-6 bg-slate-400 rounded-full mt-1"></div>
                <p className="text-slate-700 dark:text-slate-300 font-light leading-relaxed text-sm sm:text-base">AI解读仅供参考，真诚沟通是最佳选择</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl py-8 px-6 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-slate-500 dark:text-slate-400 font-light text-sm tracking-wide">© 2025 女友消息翻译器</p>
            <div className="mt-6 flex justify-center space-x-8">
              <Link 
                href="/history" 
                className="inline-flex items-center px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 font-light tracking-wide"
              >
                历史记录
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 font-light tracking-wide"
              >
                关于我们
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </ThemeProvider>
  );
}
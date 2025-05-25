"use client";

import Link from "next/link";
import { ArrowLeft, Heart, MessageSquare, Clock, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#EDEDED] dark:bg-gray-900">
      <header className="w-full bg-[#07C160] dark:bg-[#1AAD19] py-4 px-6 flex items-center shadow-sm">
        <div className="max-w-3xl w-full mx-auto flex items-center">
          <Link href="/" className="text-white hover:text-white/90">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-white ml-4">关于我们</h1>
        </div>
      </header>

      <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-20 h-20 bg-[#07C160] rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">女友消息翻译</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
              用AI帮你解读女友话中的深层含义
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-[#07C160]" />
                我们的初衷
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                「女友消息翻译」旨在帮助改善情侣之间的沟通。有时候，我们可能会误解对方的意思，这个工具希望通过提供不同的解读视角，帮助你更好地理解女友的真实想法，从而促进更健康的关系发展。
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[#07C160]" />
                使用提示
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-[#07C160] text-white flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <p>提供完整的消息内容，包括上下文背景</p>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-[#07C160] text-white flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <p>结合你对女友的了解来判断哪种解读更准确</p>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-[#07C160] text-white flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <p>将翻译结果作为参考，直接沟通永远是最好的方式</p>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200 flex items-center">
                <Copy className="h-5 w-5 mr-2 text-[#07C160]" />
                免责声明
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                本工具基于AI模型提供的解读仅供参考，不代表女友的真实想法。我们鼓励用户通过坦诚的沟通来解决误解，而不是过度依赖技术工具。最终，相互理解和尊重是维系健康关系的关键。
              </p>
            </section>
          </div>
        </div>
      </div>

      <footer className="w-full bg-white dark:bg-gray-800 py-4 px-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 女友消息翻译 | 帮你理解她的真心话</p>
          <p className="mt-1">
            <Link href="/" className="text-[#07C160] hover:underline">
              返回首页
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
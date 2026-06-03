'use client'

import { ThemeToggle } from './ThemeToggle'
import { Database } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-light dark:bg-primary-dark rounded-lg">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                数据采集技术实战项目
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                课程作业
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

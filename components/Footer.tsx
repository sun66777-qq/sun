import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-20 py-8 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>MIT License</span>
            <span>|</span>
            <span className="flex items-center gap-1">
              李猫 <Heart className="w-3 h-3 text-red-500" /> 数据采集技术课程
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2024 数据采集技术实战项目. 仅供参考学习使用.
          </p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useState } from 'react'
import { CodeBlock } from './CodeBlock'
import { ChevronDown, ChevronUp, Tag } from 'lucide-react'

type Difficulty = '初级' | '中级' | '高级'

interface ProjectCardProps {
  title: string
  industry: string
  techStack: string[]
  difficulty: Difficulty
  description: string
  codeSnippet: string
  codeLanguage: string
  antiCrawlerStrategy: string[]
}

const difficultyColors = {
  '初级': {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800'
  },
  '中级': {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800'
  },
  '高级': {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800'
  }
}

export function ProjectCard({
  title,
  industry,
  techStack,
  difficulty,
  description,
  codeSnippet,
  codeLanguage,
  antiCrawlerStrategy
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showCode, setShowCode] = useState(false)

  const colors = difficultyColors[difficulty]

  return (
    <article
      className={`
        relative bg-white dark:bg-slate-800 rounded-xl border transition-all duration-300
        ${isHovered 
          ? 'shadow-xl shadow-gray-900/10 dark:shadow-black/30 -translate-y-2 border-gray-200 dark:border-gray-700' 
          : 'shadow-md shadow-gray-900/5 dark:shadow-black/10 border-gray-100 dark:border-gray-800'
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5 sm:p-6">
        {/* 头部：行业 + 难度标签 */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                           bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400
                           border border-blue-100 dark:border-blue-800">
            <Tag className="w-3 h-3" />
            {industry}
          </span>
          <span className={`
            inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
            ${colors.bg} ${colors.text} ${colors.border} border
          `}>
            {difficulty}
          </span>
        </div>

        {/* 标题 */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
          {title}
        </h3>

        {/* 技术栈 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs font-medium
                         bg-gray-100 dark:bg-gray-700
                         text-gray-600 dark:text-gray-300
                         border border-gray-200 dark:border-gray-600">
              {tech}
            </span>
          ))}
        </div>

        {/* 功能描述 */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          {description}
        </p>

        {/* 反爬策略说明 */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            反爬策略
          </h4>
          <ul className="flex flex-wrap gap-1.5">
            {antiCrawlerStrategy.map((strategy, idx) => (
              <li
                key={idx}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs
                           bg-purple-50 dark:bg-purple-900/20
                           text-purple-600 dark:text-purple-400
                           border border-purple-100 dark:border-purple-800">
                {strategy}
              </li>
            ))}
          </ul>
        </div>

        {/* 代码展示切换 */}
        <button
          onClick={() => setShowCode(!showCode)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                     bg-gray-50 dark:bg-slate-700
                     hover:bg-gray-100 dark:hover:bg-slate-600
                     text-sm font-medium text-gray-700 dark:text-gray-300
                     transition-colors duration-200 border border-gray-200 dark:border-gray-600"
        >
          {showCode ? (
            <>
              <ChevronUp className="w-4 h-4" />
              收起代码
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              查看代码
            </>
          )}
        </button>

        {/* 代码块 */}
        {showCode && (
          <div className="mt-4 -mx-5 sm:mx-0 animate-in slide-in-from-top-2 duration-300">
            <CodeBlock code={codeSnippet} language={codeLanguage} />
          </div>
        )}
      </div>
    </article>
  )
}

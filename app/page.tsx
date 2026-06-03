import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import { GraduationCap, Code2, BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              <span className="text-sm font-medium text-blue-500 dark:text-blue-400 uppercase tracking-wider">
                数据采集技术课程
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              10个行业级数据采集实战项目
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              本课程作业展示了真实行业级数据采集案例，涵盖金融、医疗、电商、房地产等多个领域。
              每个项目包含完整可运行的代码，涵盖反爬策略、数据处理、存储方案等核心技术点。
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Code2 className="w-5 h-5" />
                <span>真实可运行代码</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <BookOpen className="w-5 h-5" />
                <span>完整的反爬策略</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-8 bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center p-4">
              <div className="text-3xl sm:text-4xl font-bold text-blue-500 mb-1">10</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">实战项目</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl sm:text-4xl font-bold text-green-500 mb-1">5+</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">涵盖行业</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-1">3</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">难度等级</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl sm:text-4xl font-bold text-purple-500 mb-1">10+</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">技术栈</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              industry={project.industry}
              techStack={project.techStack}
              difficulty={project.difficulty}
              description={project.description}
              codeSnippet={project.codeSnippet}
              codeLanguage={project.codeLanguage}
              antiCrawlerStrategy={project.antiCrawlerStrategy}
            />
          ))}
        </div>
      </main>
      
      <Footer />
      
      {/* Deployment Info */}
      <section className="py-8 bg-slate-900 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              部署命令
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 mb-2">安装依赖</p>
                <code className="block bg-slate-900 rounded-lg p-3 text-sm text-green-400 font-mono">
                  npm install
                </code>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">开发模式</p>
                <code className="block bg-slate-900 rounded-lg p-3 text-sm text-green-400 font-mono">
                  npm run dev
                </code>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">构建生产版本</p>
                <code className="block bg-slate-900 rounded-lg p-3 text-sm text-green-400 font-mono">
                  npm run build
                </code>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Vercel 部署</p>
                <code className="block bg-slate-900 rounded-lg p-3 text-sm text-green-400 font-mono">
                  npx vercel --prod
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

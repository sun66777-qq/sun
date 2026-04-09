import { Link } from "react-router-dom";

// 课程数据
const courses = [
  {
    id: "python-basic",
    name: "Python基础",
    description: "学习Python编程语言的基础知识，包括语法、数据类型、控制流等。"
  },
  {
    id: "data-analysis",
    name: "数据分析技术",
    description: "学习数据分析的基本方法和工具，包括数据清洗、数据可视化等。"
  },
  {
    id: "data-collection",
    name: "数据采集与处理",
    description: "学习数据采集的方法和工具，包括网络爬虫、数据存储等。"
  },
  {
    id: "supply-chain",
    name: "供应链数据分析",
    description: "学习供应链管理中的数据分析方法和应用。"
  },
  {
    id: "database",
    name: "数据库原理与应用",
    description: "学习数据库的基本原理和应用，包括SQL语句、数据库设计等。"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">狸猫的个人页面</div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">首页</Link>
          </div>
        </div>
      </nav>

      {/* 个人信息 */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">狸猫</h1>
          <p className="text-xl mb-2">广东科学技术职业学院</p>
          <p className="text-lg">商学院 · 商务数据分析与应用专业</p>
        </div>
      </section>

      {/* 课程列表 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">我的课程</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link 
                key={course.id} 
                to={`/courses/${course.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
                <p className="text-gray-600">{course.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2026 狸猫的个人页面</p>
        </div>
      </footer>
    </div>
  );
}
import { Link } from "react-router-dom";

// 课程数据
const courses = [
  {
    id: "python-basic",
    name: "Python基础",
    description: "学习Python编程语言的基础知识，包括语法、数据类型、控制流等。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20programming%20language%20code%20on%20screen%2C%20modern%20technology%2C%20blue%20theme&image_size=landscape_16_9"
  },
  {
    id: "data-analysis",
    name: "数据分析技术",
    description: "学习数据分析的基本方法和工具，包括数据清洗、数据可视化、统计分析等。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20analysis%20dashboard%20with%20charts%20and%20graphs%2C%20modern%20business%20intelligence%2C%20blue%20theme&image_size=landscape_16_9"
  },
  {
    id: "data-collection",
    name: "数据采集与处理",
    description: "学习数据采集的方法和工具，包括网络爬虫、数据存储等。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=web%20scraping%20data%20collection%20process%2C%20modern%20technology%2C%20blue%20theme&image_size=landscape_16_9"
  },
  {
    id: "supply-chain",
    name: "供应链数据分析",
    description: "学习供应链管理中的数据分析方法和应用。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=supply%20chain%20management%20data%20analysis%2C%20logistics%20network%2C%20blue%20theme&image_size=landscape_16_9"
  },
  {
    id: "database",
    name: "数据库原理与应用",
    description: "学习数据库的基本原理和应用，包括SQL语句、数据库设计等。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=database%20management%20system%2C%20data%20storage%20structure%2C%20blue%20theme&image_size=landscape_16_9"
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
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* 课程图片 */}
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                {/* 课程信息 */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>
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
import { useParams, Link } from "react-router-dom";

// 课程数据
const courses = [
  {
    id: "python-basic",
    name: "Python基础",
    description: "学习Python编程语言的基础知识，包括语法、数据类型、控制流等。",
    content: "本课程主要介绍Python的基础语法、变量、数据类型、运算符、控制流语句（条件语句、循环语句）、函数定义与调用、模块导入等内容。通过本课程的学习，学生将掌握Python编程的基本技能，为后续的数据分析学习打下基础。"
  },
  {
    id: "data-analysis",
    name: "数据分析技术",
    description: "学习数据分析的基本方法和工具，包括数据清洗、数据可视化等。",
    content: "本课程主要介绍数据分析的基本概念、数据清洗与预处理、数据可视化技术、描述性统计分析、推断性统计分析等内容。学生将学习使用Python的数据分析库（如Pandas、NumPy、Matplotlib等）进行数据处理和分析，培养数据思维和分析能力。"
  },
  {
    id: "data-collection",
    name: "数据采集与处理",
    description: "学习数据采集的方法和工具，包括网络爬虫、数据存储等。",
    content: "本课程主要介绍数据采集的基本方法，包括网络爬虫技术、API接口调用、数据存储与管理等内容。学生将学习使用Python的爬虫库（如Requests、BeautifulSoup、Scrapy等）进行数据采集，以及数据的清洗、转换和存储技术，为数据分析提供高质量的数据来源。"
  },
  {
    id: "supply-chain",
    name: "供应链数据分析",
    description: "学习供应链管理中的数据分析方法和应用。",
    content: "本课程主要介绍供应链管理的基本概念、供应链数据分析的方法和工具、供应链绩效评估指标、供应链优化策略等内容。学生将学习如何运用数据分析技术解决供应链管理中的实际问题，提高供应链的效率和效益。"
  },
  {
    id: "database",
    name: "数据库原理与应用",
    description: "学习数据库的基本原理和应用，包括SQL语句、数据库设计等。",
    content: "本课程主要介绍数据库的基本概念、关系型数据库原理、SQL语句的使用、数据库设计与规范化、数据库管理与维护等内容。学生将学习如何设计和管理数据库，以及如何使用SQL语句进行数据查询和操作，为数据分析和应用提供数据存储和管理支持。"
  }
];

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">课程不存在</h2>
          <p className="text-gray-600 mb-6">您访问的课程不存在，请返回首页查看可用课程。</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.name}</h1>
        <p className="text-gray-600 mb-6">{course.description}</p>
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">课程内容</h2>
          <p className="text-gray-700 leading-relaxed">{course.content}</p>
        </div>
      </div>
    </div>
  );
}
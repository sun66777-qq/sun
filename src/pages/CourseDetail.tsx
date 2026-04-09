import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

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
    description: "学习数据分析的基本方法和工具，包括数据清洗、数据可视化、统计分析等。",
    content: "# 数据分析技术课程大纲\n\n## 课程基本信息\n- **课程名称**：数据分析技术\n- **课程类型**：专业核心课\n- **适用专业**：商务数据分析与应用\n- **学期**：高职大二第二学期\n- **先修课程**：Python基础、数据采集与处理、商务数据分析与应用基础\n\n## 课程目标\n1. 掌握数据分析的基本概念和方法\n2. 熟练使用Python数据分析库进行数据处理和分析\n3. 具备数据清洗、数据可视化和统计分析的能力\n4. 培养数据思维和解决实际问题的能力\n5. 能够应用数据分析技术解决商务领域的实际问题\n\n## 课程大纲\n\n### 第一章 数据分析概述\n1.1 数据分析的概念和重要性\n1.2 数据分析的流程和方法\n1.3 数据分析的应用领域\n1.4 数据分析工具介绍\n\n### 第二章 数据清洗与预处理\n2.1 数据质量评估\n2.2 缺失值处理\n2.3 异常值检测与处理\n2.4 数据标准化与归一化\n2.5 特征工程基础\n\n### 第三章 数据可视化技术\n3.1 数据可视化的原则和方法\n3.2 Matplotlib库的使用\n3.3 Seaborn库的使用\n3.4 交互式数据可视化\n3.5 可视化案例分析\n\n### 第四章 描述性统计分析\n4.1 统计描述的基本概念\n4.2 集中趋势分析\n4.3 离散程度分析\n4.4 分布形态分析\n4.5 相关分析\n\n### 第五章 推断性统计分析\n5.1 假设检验的基本原理\n5.2 t检验\n5.3 方差分析\n5.4 卡方检验\n5.5 非参数检验\n\n### 第六章 预测分析基础\n6.1 预测分析的基本概念\n6.2 线性回归分析\n6.3 逻辑回归分析\n6.4 时间序列分析\n6.5 预测模型评估\n\n### 第七章 商务数据分析案例\n7.1 销售数据分析\n7.2 客户行为分析\n7.3 市场趋势分析\n7.4 供应链数据分析\n7.5 综合案例实战\n\n## 教学方法\n1. **理论讲解**：讲解数据分析的基本概念和方法\n2. **实践操作**：通过案例练习掌握数据分析工具的使用\n3. **项目实践**：完成实际商务数据分析项目\n4. **小组讨论**：讨论数据分析方法和结果\n5. **案例分析**：分析真实商务数据分析案例\n\n## 评估方式\n1. **平时成绩**：30%（包括作业、课堂参与、实践练习）\n2. **实验成绩**：30%（包括实验报告、数据分析实践）\n3. **期末考试**：40%（包括理论考试和实践操作）\n\n## 参考资料\n1. 《Python数据分析与挖掘实战》，张良均，机械工业出版社\n2. 《利用Python进行数据分析》，Wes McKinney，人民邮电出版社\n3. 《数据可视化实战》，陈旸，电子工业出版社\n4. 《商务数据分析》，王汉生，北京大学出版社\n\n## 学习建议\n1. 复习Python基础和数据采集相关知识\n2. 多动手实践，完成课后练习和案例分析\n3. 关注数据分析领域的最新发展和应用\n4. 积极参与小组讨论和项目实践\n5. 培养数据思维，学会从数据中发现问题和解决问题"
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
          <div className="text-gray-700 leading-relaxed">
            <ReactMarkdown>
              {course.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
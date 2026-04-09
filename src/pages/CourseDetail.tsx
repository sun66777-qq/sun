import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

// 课程数据
const courses = [
  {
    id: "python-basic",
    name: "Python基础",
    description: "学习Python编程语言的基础知识，包括语法、数据类型、控制流等。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20programming%20language%20code%20on%20screen%2C%20modern%20technology%2C%20blue%20theme&image_size=landscape_16_9",
    content: "# Python基础课程大纲\n\n## 课程基本信息\n- **课程名称**：Python基础\n- **课程类型**：专业基础课\n- **适用专业**：商务数据分析与应用\n- **学期**：高职大一第二学期\n\n## 课程目标\n1. 掌握Python的基本语法和编程思想\n2. 熟悉Python的数据类型和控制流\n3. 能够编写简单的Python程序\n4. 为后续的数据分析课程打下基础\n\n## 课程内容\n### 第一章 Python概述\n- Python的特点和应用领域\n- Python的安装和环境配置\n- 第一个Python程序\n\n### 第二章 基本数据类型\n- 数值类型（整数、浮点数、复数）\n- 字符串类型\n- 布尔类型\n- 列表、元组、字典、集合\n\n### 第三章 控制流\n- 条件语句（if-elif-else）\n- 循环语句（for、while）\n- 循环控制（break、continue、pass）\n\n### 第四章 函数\n- 函数的定义和调用\n- 函数参数（位置参数、默认参数、可变参数）\n- 函数返回值\n- 局部变量和全局变量\n\n### 第五章 模块和包\n- 模块的导入和使用\n- 标准库的使用\n- 第三方库的安装和使用\n\n## 教学方法\n- 理论讲解与实践操作相结合\n- 案例驱动的教学方法\n- 小组合作完成项目\n\n## 评估方式\n- 平时作业：30%\n- 实验报告：30%\n- 期末考试：40%"
  },
  {
    id: "data-analysis",
    name: "数据分析技术",
    description: "学习数据分析的基本方法和工具，包括数据清洗、数据可视化、统计分析等。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20analysis%20dashboard%20with%20charts%20and%20graphs%2C%20modern%20business%20intelligence%2C%20blue%20theme&image_size=landscape_16_9",
    content: "# 数据分析技术课程大纲\n\n## 📋 课程基本信息\n- **课程名称**：数据分析技术\n- **课程类型**：专业核心课\n- **适用专业**：商务数据分析与应用\n- **学期**：高职大二第二学期\n- **先修课程**：Python基础、数据采集与处理、商务数据分析与应用基础\n\n## 🎯 课程目标\n1. 掌握数据分析的基本概念和方法\n2. 熟练使用Python数据分析库进行数据处理和分析\n3. 具备数据清洗、数据可视化和统计分析的能力\n4. 培养数据思维和解决实际问题的能力\n5. 能够应用数据分析技术解决商务领域的实际问题\n\n## 📚 课程大纲\n\n### 第一章 数据分析概述\n- 1.1 数据分析的概念和重要性\n- 1.2 数据分析的流程和方法\n- 1.3 数据分析的应用领域\n- 1.4 数据分析工具介绍\n\n### 第二章 数据清洗与预处理\n- 2.1 数据质量评估\n- 2.2 缺失值处理\n- 2.3 异常值检测与处理\n- 2.4 数据标准化与归一化\n- 2.5 特征工程基础\n\n### 第三章 数据可视化技术\n- 3.1 数据可视化的原则和方法\n- 3.2 Matplotlib库的使用\n- 3.3 Seaborn库的使用\n- 3.4 交互式数据可视化\n- 3.5 可视化案例分析\n\n### 第四章 描述性统计分析\n- 4.1 统计描述的基本概念\n- 4.2 集中趋势分析\n- 4.3 离散程度分析\n- 4.4 分布形态分析\n- 4.5 相关分析\n\n### 第五章 推断性统计分析\n- 5.1 假设检验的基本原理\n- 5.2 t检验\n- 5.3 方差分析\n- 5.4 卡方检验\n- 5.5 非参数检验\n\n### 第六章 预测分析基础\n- 6.1 预测分析的基本概念\n- 6.2 线性回归分析\n- 6.3 逻辑回归分析\n- 6.4 时间序列分析\n- 6.5 预测模型评估\n\n### 第七章 商务数据分析案例\n- 7.1 销售数据分析\n- 7.2 客户行为分析\n- 7.3 市场趋势分析\n- 7.4 供应链数据分析\n- 7.5 综合案例实战\n\n## 👨‍🏫 教学方法\n1. **理论讲解**：讲解数据分析的基本概念和方法\n2. **实践操作**：通过案例练习掌握数据分析工具的使用\n3. **项目实践**：完成实际商务数据分析项目\n4. **小组讨论**：讨论数据分析方法和结果\n5. **案例分析**：分析真实商务数据分析案例\n\n## 📊 评估方式\n1. **平时成绩**：30%（包括作业、课堂参与、实践练习）\n2. **实验成绩**：30%（包括实验报告、数据分析实践）\n3. **期末考试**：40%（包括理论考试和实践操作）\n\n## 📚 参考资料\n1. 《Python数据分析与挖掘实战》，张良均，机械工业出版社\n2. 《利用Python进行数据分析》，Wes McKinney，人民邮电出版社\n3. 《数据可视化实战》，陈旸，电子工业出版社\n4. 《商务数据分析》，王汉生，北京大学出版社\n\n## 💡 学习建议\n1. 复习Python基础和数据采集相关知识\n2. 多动手实践，完成课后练习和案例分析\n3. 关注数据分析领域的最新发展和应用\n4. 积极参与小组讨论和项目实践\n5. 培养数据思维，学会从数据中发现问题和解决问题"
  },
  {
    id: "data-collection",
    name: "数据采集与处理",
    description: "学习数据采集的方法和工具，包括网络爬虫、数据存储等。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=web%20scraping%20data%20collection%20process%2C%20modern%20technology%2C%20blue%20theme&image_size=landscape_16_9",
    content: "# 数据采集与处理课程大纲\n\n## 课程基本信息\n- **课程名称**：数据采集与处理\n- **课程类型**：专业基础课\n- **适用专业**：商务数据分析与应用\n- **学期**：高职大二第一学期\n- **先修课程**：Python基础\n\n## 课程目标\n1. 掌握数据采集的基本方法和工具\n2. 能够使用Python编写网络爬虫\n3. 掌握数据清洗和预处理技术\n4. 了解数据存储和管理方法\n\n## 课程内容\n### 第一章 数据采集概述\n- 数据采集的概念和重要性\n- 数据采集的方法和工具\n- 数据采集的伦理和法律问题\n\n### 第二章 网络爬虫基础\n- HTTP协议基础\n- Requests库的使用\n- BeautifulSoup库的使用\n- XPath和CSS选择器\n\n### 第三章 高级爬虫技术\n- Scrapy框架的使用\n- 反爬虫策略应对\n- 分布式爬虫\n- 爬虫性能优化\n\n### 第四章 API数据采集\n- RESTful API基础\n- API认证和授权\n- API数据获取和处理\n- 常见API接口使用\n\n### 第五章 数据存储\n- 文件存储（CSV、JSON、Excel）\n- 数据库存储（SQLite、MySQL）\n- NoSQL数据库（MongoDB）\n- 数据备份和恢复\n\n## 教学方法\n- 理论讲解与实践操作相结合\n- 项目驱动的教学方法\n- 小组合作完成爬虫项目\n\n## 评估方式\n- 平时作业：30%\n- 实验报告：30%\n- 期末考试：40%"
  },
  {
    id: "supply-chain",
    name: "供应链数据分析",
    description: "学习供应链管理中的数据分析方法和应用。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=supply%20chain%20management%20data%20analysis%2C%20logistics%20network%2C%20blue%20theme&image_size=landscape_16_9",
    content: "# 供应链数据分析课程大纲\n\n## 课程基本信息\n- **课程名称**：供应链数据分析\n- **课程类型**：专业核心课\n- **适用专业**：商务数据分析与应用\n- **学期**：高职大二第二学期\n- **先修课程**：Python基础、数据分析技术\n\n## 课程目标\n1. 掌握供应链管理的基本概念和原理\n2. 了解供应链数据分析的方法和工具\n3. 能够应用数据分析技术解决供应链管理问题\n4. 提高供应链的效率和效益\n\n## 课程内容\n### 第一章 供应链管理概述\n- 供应链管理的概念和重要性\n- 供应链的结构和流程\n- 供应链管理的挑战和机遇\n\n### 第二章 供应链数据\n- 供应链数据的类型和来源\n- 供应链数据的质量和管理\n- 供应链数据的集成和共享\n\n### 第三章 供应链绩效分析\n- 供应链绩效指标体系\n- 供应链绩效评估方法\n- 供应链绩效分析案例\n\n### 第四章 供应链优化\n- 库存优化分析\n- 物流网络优化\n- 供应商选择和评估\n- 供应链风险分析\n\n### 第五章 供应链数据分析工具\n- Excel在供应链分析中的应用\n- Python在供应链分析中的应用\n- 专业供应链分析软件\n\n## 教学方法\n- 理论讲解与案例分析相结合\n- 实践操作和项目实践\n- 小组讨论和角色扮演\n\n## 评估方式\n- 平时作业：30%\n- 实验报告：30%\n- 期末考试：40%"
  },
  {
    id: "database",
    name: "数据库原理与应用",
    description: "学习数据库的基本原理和应用，包括SQL语句、数据库设计等。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=database%20management%20system%2C%20data%20storage%20structure%2C%20blue%20theme&image_size=landscape_16_9",
    content: "# 数据库原理与应用课程大纲\n\n## 课程基本信息\n- **课程名称**：数据库原理与应用\n- **课程类型**：专业基础课\n- **适用专业**：商务数据分析与应用\n- **学期**：高职大一第二学期\n- **先修课程**：计算机基础\n\n## 课程目标\n1. 掌握数据库的基本概念和原理\n2. 熟悉关系型数据库的设计和管理\n3. 能够使用SQL语句进行数据操作\n4. 了解数据库在数据分析中的应用\n\n## 课程内容\n### 第一章 数据库概述\n- 数据库的基本概念\n- 数据库管理系统\n- 数据库的发展历程\n- 数据库的应用领域\n\n### 第二章 关系数据库基础\n- 关系模型\n- 关系代数\n- 关系数据库设计\n- 数据库规范化\n\n### 第三章 SQL语言\n- SQL的基本概念\n- 数据定义语言（DDL）\n- 数据操纵语言（DML）\n- 数据查询语言（DQL）\n- 数据控制语言（DCL）\n\n### 第四章 数据库设计\n- 需求分析\n- 概念结构设计\n- 逻辑结构设计\n- 物理结构设计\n- 数据库实施和维护\n\n### 第五章 数据库应用开发\n- 数据库连接技术\n- 数据库应用程序开发\n- 数据库安全性\n- 数据库性能优化\n\n## 教学方法\n- 理论讲解与实践操作相结合\n- 案例驱动的教学方法\n- 小组合作完成数据库设计项目\n\n## 评估方式\n- 平时作业：30%\n- 实验报告：30%\n- 期末考试：40%"
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
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* 课程图片 */}
        <div className="w-full h-64 overflow-hidden">
          <img 
            src={course.image} 
            alt={course.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        {/* 课程信息 */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.name}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>
          <div className="border-t border-gray-200 pt-6">
            <div className="text-gray-700 leading-relaxed">
              <ReactMarkdown>
                {course.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
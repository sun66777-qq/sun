import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

// 课程数据
const courses = [
  {
    id: "python-basic",
    name: "Python基础",
    description: "学习Python编程语言的基础知识，包括语法、数据类型、控制流等。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20programming%20language%20code%20on%20screen%2C%20modern%20technology%2C%20blue%20theme&image_size=landscape_16_9",
    content: "# Python基础课程大纲\n\n## 📋 课程基本信息\n- **课程名称**：Python基础\n- **课程类型**：专业基础课\n- **适用专业**：商务数据分析与应用\n- **学期**：高职大一第二学期\n\n## 🎯 课程目标\n1. 掌握Python的基本语法和编程思想\n2. 熟悉Python的数据类型和控制流\n3. 能够编写简单的Python程序\n4. 为后续的数据分析课程打下基础\n\n## 📚 课程内容\n\n### 第一章 Python概述\n- 1.1 Python的特点和应用领域\n- 1.2 Python的安装和环境配置\n- 1.3 第一个Python程序\n\n### 第二章 基本数据类型\n- 2.1 数值类型（整数、浮点数、复数）\n- 2.2 字符串类型\n- 2.3 布尔类型\n- 2.4 列表、元组、字典、集合\n\n### 第三章 控制流\n- 3.1 条件语句（if-elif-else）\n- 3.2 循环语句（for、while）\n- 3.3 循环控制（break、continue、pass）\n\n### 第四章 函数\n- 4.1 函数的定义和调用\n- 4.2 函数参数（位置参数、默认参数、可变参数）\n- 4.3 函数返回值\n- 4.4 局部变量和全局变量\n\n### 第五章 模块和包\n- 5.1 模块的导入和使用\n- 5.2 标准库的使用\n- 5.3 第三方库的安装和使用\n\n## 👨‍🏫 教学方法\n1. **理论讲解**：讲解Python的基本概念和语法\n2. **实践操作**：通过编程练习掌握Python编程技能\n3. **项目实践**：完成小型Python项目\n4. **小组合作**：小组协作解决编程问题\n\n## 📊 评估方式\n1. **平时作业**：30%（包括编程练习、课堂参与）\n2. **实验报告**：30%（包括实验记录、代码分析）\n3. **期末考试**：40%（包括理论考试和编程实践）\n\n## 📚 参考资料\n1. 《Python编程：从入门到实践》，Eric Matthes，人民邮电出版社\n2. 《Python基础教程》，Magnus Lie Hetland，人民邮电出版社\n3. 《流畅的Python》，Luciano Ramalho，人民邮电出版社\n\n## 💡 学习建议\n1. 多动手编写代码，实践是最好的学习方式\n2. 阅读Python官方文档，了解标准库的使用\n3. 参与Python社区，向他人学习\n4. 尝试解决实际问题，提高编程能力\n5. 建立良好的编程习惯，注重代码风格和可读性" 
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
    content: "# 数据采集与处理课程大纲\n\n## 📋 课程基本信息\n- **课程名称**：数据采集与处理\n- **课程类型**：专业基础课\n- **适用专业**：商务数据分析与应用\n- **学期**：高职大二第一学期\n- **先修课程**：Python基础\n\n## 🎯 课程目标\n1. 掌握数据采集的基本方法和工具\n2. 能够使用Python编写网络爬虫\n3. 掌握数据清洗和预处理技术\n4. 了解数据存储和管理方法\n5. 培养数据获取和处理的能力\n\n## 📚 课程内容\n\n### 第一章 数据采集概述\n- 1.1 数据采集的概念和重要性\n- 1.2 数据采集的方法和工具\n- 1.3 数据采集的伦理和法律问题\n- 1.4 数据采集的流程和规划\n\n### 第二章 网络爬虫基础\n- 2.1 HTTP协议基础\n- 2.2 Requests库的使用\n- 2.3 BeautifulSoup库的使用\n- 2.4 XPath和CSS选择器\n- 2.5 爬虫的基本结构\n\n### 第三章 高级爬虫技术\n- 3.1 Scrapy框架的使用\n- 3.2 反爬虫策略应对\n- 3.3 分布式爬虫\n- 3.4 爬虫性能优化\n- 3.5 爬虫部署和监控\n\n### 第四章 API数据采集\n- 4.1 RESTful API基础\n- 4.2 API认证和授权\n- 4.3 API数据获取和处理\n- 4.4 常见API接口使用\n- 4.5 API速率限制和处理\n\n### 第五章 数据存储\n- 5.1 文件存储（CSV、JSON、Excel）\n- 5.2 数据库存储（SQLite、MySQL）\n- 5.3 NoSQL数据库（MongoDB）\n- 5.4 数据备份和恢复\n- 5.5 数据存储最佳实践\n\n## 👨‍🏫 教学方法\n1. **理论讲解**：讲解数据采集的基本概念和方法\n2. **实践操作**：通过案例练习掌握爬虫开发技能\n3. **项目实践**：完成实际数据采集项目\n4. **小组合作**：小组协作开发爬虫系统\n5. **案例分析**：分析真实数据采集案例\n\n## 📊 评估方式\n1. **平时作业**：30%（包括编程练习、课堂参与）\n2. **实验报告**：30%（包括实验记录、爬虫项目）\n3. **期末考试**：40%（包括理论考试和实践操作）\n\n## 📚 参考资料\n1. 《Python网络爬虫权威指南》，Ryan Mitchell，人民邮电出版社\n2. 《Scrapy网络爬虫实战》，刘硕，人民邮电出版社\n3. 《数据采集与预处理》，王斌会，暨南大学出版社\n4. 《Web数据挖掘》，Bing Liu，清华大学出版社\n\n## 💡 学习建议\n1. 熟悉Python编程基础，特别是网络编程和文件操作\n2. 学习HTML、CSS和JavaScript基础，了解网页结构\n3. 多动手实践，开发各种类型的爬虫\n4. 关注数据采集的伦理和法律问题\n5. 学习数据存储和管理技术，为数据分析做准备" 
  },
  {
    id: "supply-chain",
    name: "供应链数据分析",
    description: "学习供应链管理中的数据分析方法和应用。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=supply%20chain%20management%20data%20analysis%2C%20logistics%20network%2C%20blue%20theme&image_size=landscape_16_9",
    content: "# 供应链数据分析课程大纲\n\n## 📋 课程基本信息\n- **课程名称**：供应链数据分析\n- **课程类型**：专业核心课\n- **适用专业**：商务数据分析与应用\n- **学期**：高职大二第二学期\n- **先修课程**：Python基础、数据分析技术\n\n## 🎯 课程目标\n1. 掌握供应链管理的基本概念和原理\n2. 了解供应链数据分析的方法和工具\n3. 能够应用数据分析技术解决供应链管理问题\n4. 提高供应链的效率和效益\n5. 培养供应链数据思维和分析能力\n\n## 📚 课程内容\n\n### 第一章 供应链管理概述\n- 1.1 供应链管理的概念和重要性\n- 1.2 供应链的结构和流程\n- 1.3 供应链管理的挑战和机遇\n- 1.4 供应链管理的发展趋势\n\n### 第二章 供应链数据\n- 2.1 供应链数据的类型和来源\n- 2.2 供应链数据的质量和管理\n- 2.3 供应链数据的集成和共享\n- 2.4 供应链大数据的特点和挑战\n\n### 第三章 供应链绩效分析\n- 3.1 供应链绩效指标体系\n- 3.2 供应链绩效评估方法\n- 3.3 供应链绩效分析案例\n- 3.4 绩效分析结果的应用\n\n### 第四章 供应链优化\n- 4.1 库存优化分析\n- 4.2 物流网络优化\n- 4.3 供应商选择和评估\n- 4.4 供应链风险分析\n- 4.5 供应链优化案例\n\n### 第五章 供应链数据分析工具\n- 5.1 Excel在供应链分析中的应用\n- 5.2 Python在供应链分析中的应用\n- 5.3 专业供应链分析软件\n- 5.4 供应链可视化工具\n\n## 👨‍🏫 教学方法\n1. **理论讲解**：讲解供应链管理和数据分析的基本概念\n2. **案例分析**：分析真实供应链数据分析案例\n3. **实践操作**：通过软件工具进行供应链分析\n4. **项目实践**：完成供应链数据分析项目\n5. **小组讨论**：讨论供应链管理问题和解决方案\n\n## 📊 评估方式\n1. **平时作业**：30%（包括案例分析、课堂参与）\n2. **实验报告**：30%（包括软件操作、分析报告）\n3. **期末考试**：40%（包括理论考试和实践操作）\n\n## 📚 参考资料\n1. 《供应链管理》，苏尼尔·乔普拉，中国人民大学出版社\n2. 《供应链数据分析》，蔡建湖，机械工业出版社\n3. 《物流与供应链管理》，马丁·克里斯托弗，电子工业出版社\n4. 《供应链优化与分析》，David Simchi-Levi，清华大学出版社\n\n## 💡 学习建议\n1. 了解供应链管理的基本概念和流程\n2. 掌握数据分析的基本方法和工具\n3. 关注供应链管理的最新发展和趋势\n4. 多分析真实供应链案例，积累实践经验\n5. 培养系统思维，从整体角度分析供应链问题" 
  },
  {
    id: "database",
    name: "数据库原理与应用",
    description: "学习数据库的基本原理和应用，包括SQL语句、数据库设计等。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=database%20management%20system%2C%20data%20storage%20structure%2C%20blue%20theme&image_size=landscape_16_9",
    content: "# 数据库原理与应用课程大纲\n\n## 📋 课程基本信息\n- **课程名称**：数据库原理与应用\n- **课程类型**：专业基础课\n- **适用专业**：商务数据分析与应用\n- **学期**：高职大一第二学期\n- **先修课程**：计算机基础\n\n## 🎯 课程目标\n1. 掌握数据库的基本概念和原理\n2. 熟悉关系型数据库的设计和管理\n3. 能够使用SQL语句进行数据操作\n4. 了解数据库在数据分析中的应用\n5. 培养数据库设计和管理的能力\n\n## 📚 课程内容\n\n### 第一章 数据库概述\n- 1.1 数据库的基本概念\n- 1.2 数据库管理系统\n- 1.3 数据库的发展历程\n- 1.4 数据库的应用领域\n- 1.5 数据库系统的组成\n\n### 第二章 关系数据库基础\n- 2.1 关系模型\n- 2.2 关系代数\n- 2.3 关系数据库设计\n- 2.4 数据库规范化\n- 2.5 关系完整性约束\n\n### 第三章 SQL语言\n- 3.1 SQL的基本概念\n- 3.2 数据定义语言（DDL）\n- 3.3 数据操纵语言（DML）\n- 3.4 数据查询语言（DQL）\n- 3.5 数据控制语言（DCL）\n- 3.6 高级SQL查询\n\n### 第四章 数据库设计\n- 4.1 需求分析\n- 4.2 概念结构设计\n- 4.3 逻辑结构设计\n- 4.4 物理结构设计\n- 4.5 数据库实施和维护\n- 4.6 数据库设计案例\n\n### 第五章 数据库应用开发\n- 5.1 数据库连接技术\n- 5.2 数据库应用程序开发\n- 5.3 数据库安全性\n- 5.4 数据库性能优化\n- 5.5 数据库备份和恢复\n\n## 👨‍🏫 教学方法\n1. **理论讲解**：讲解数据库的基本概念和原理\n2. **实践操作**：通过SQL语句练习掌握数据库操作\n3. **项目实践**：完成数据库设计和开发项目\n4. **小组合作**：小组协作完成数据库设计任务\n5. **案例分析**：分析真实数据库应用案例\n\n## 📊 评估方式\n1. **平时作业**：30%（包括SQL练习、课堂参与）\n2. **实验报告**：30%（包括实验记录、数据库设计）\n3. **期末考试**：40%（包括理论考试和实践操作）\n\n## 📚 参考资料\n1. 《数据库系统概论》，王珊，高等教育出版社\n2. 《SQL必知必会》，Alan Beaulieu，人民邮电出版社\n3. 《数据库设计与开发》，周立柱，清华大学出版社\n4. 《MySQL必知必会》，Alan Beaulieu，人民邮电出版社\n\n## 💡 学习建议\n1. 理解数据库的基本概念和原理\n2. 多练习SQL语句，掌握数据库操作技能\n3. 学习数据库设计的方法和技巧\n4. 关注数据库技术的最新发展\n5. 结合实际应用，提高数据库应用能力" 
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
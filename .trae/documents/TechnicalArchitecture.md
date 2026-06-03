# 数据采集技术实战项目 | 技术架构文档

## 1. 架构设计

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│  ┌─────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │ Header  │  │ ProjectGrid  │  │    Footer      │  │
│  │ +Theme  │  │ (10 Cards)   │  │                │  │
│  └─────────┘  └──────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │   Static Data   │
                   │  (projects.ts)  │
                   └─────────────────┘
```

## 2. 技术栈详情

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js | 14.x (App Router) |
| 语言 | TypeScript | 5.x |
| 样式 | Tailwind CSS | 3.x |
| 代码高亮 | Prism.js | 1.29.x |
| 图标 | Lucide React | 0.400.x |
| 主题切换 | next-themes | 0.3.x |

## 3. 组件定义

### 3.1 Header 组件
- 显示课程名称
- ThemeToggle 按钮（太阳/月亮图标）
- 固定顶部，高度64px

### 3.2 ProjectCard 组件
Props:
```typescript
interface ProjectCardProps {
  title: string;          // 项目名称
  industry: string;       // 行业名称
  techStack: string[];    // 技术栈数组
  difficulty: '初级' | '中级' | '高级';
  description: string;     // 功能描述
  codeSnippet: string;    // 代码片段
}
```

状态：
- `isHovered`: boolean - 控制悬停效果
- `isCopied`: boolean - 控制复制成功提示

### 3.3 CodeBlock 组件
- 语法高亮显示
- 一键复制按钮
- 显示语言标签

### 3.4 Footer 组件
- MIT License 声明
- 作者：李猫
- 数据采集技术课程

## 4. 响应式设计

| 断点 | 宽度 | 列数 | gap |
|------|------|------|-----|
| lg | ≥1024px | 4 | 24px |
| md | 768px-1023px | 3 | 20px |
| sm | <768px | 1 | 16px |

## 5. 主题系统

使用 CSS Variables 实现：

```css
/* 浅色主题 */
--bg-primary: #F8FAFC;
--bg-card: #FFFFFF;
--text-primary: #1E293B;
--text-secondary: #64748B;
--accent: #3B82F6;

/* 深色主题 */
--bg-primary: #0F172A;
--bg-card: #1E293B;
--text-primary: #F1F5F9;
--text-secondary: #94A3B8;
--accent: #60A5FA;
```

## 6. 项目数据模型

```typescript
interface Project {
  id: number;
  title: string;
  industry: string;
  techStack: string[];
  difficulty: '初级' | '中级' | '高级';
  description: string;
  codeSnippet: string;
  antiCrawlerStrategy: string[];  // 反爬策略说明
}
```

## 7. 部署命令

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# Vercel 部署
npx vercel --prod
```

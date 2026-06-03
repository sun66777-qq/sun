export interface Project {
  id: number
  title: string
  industry: string
  techStack: string[]
  difficulty: '初级' | '中级' | '高级'
  description: string
  codeSnippet: string
  codeLanguage: string
  antiCrawlerStrategy: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: '金融舆情监控系统',
    industry: '金融',
    techStack: ['Python', 'Scrapy-Redis', 'MongoDB', 'Redis'],
    difficulty: '高级',
    description: '实时监控新浪财经、东方财富等主流财经媒体，采集新闻、公告、研报等舆情数据，构建金融市场情绪分析系统。',
    codeSnippet: `import scrapy
from scrapy import signals
from scrapy_redis.spiders import RedisCrawlSpider
import random
import json
from datetime import datetime

# [课程作业要求] 反爬策略：动态User-Agent轮换
class UserAgentMiddleware:
    """动态User-Agent轮换中间件"""
    
    USER_AGENTS = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15',
    ]
    
    def process_request(self, request, spider):
        request.headers['User-Agent'] = random.choice(self.USER_AGENTS)
        # [课程作业要求] 设置Referer模拟正常来源
        request.headers['Referer'] = 'https://finance.sina.com.cn/'
        return None

# [课程作业要求] 反爬策略：IP代理池轮换
class ProxyMiddleware:
    """IP代理池中间件，从Redis获取可用代理"""
    
    def __init__(self, redis_conn):
        self.redis_conn = redis_conn
    
    @classmethod
    def from_crawler(cls, crawler):
        redis_conn = crawler.redis_conn
        return cls(redis_conn)
    
    def process_request(self, request, spider):
        # 从Redis有序集合获取可用代理（按成功率排序）
        proxy = spider.redis_conn.zrevrange(' proxies:available ', 0, 0)
        if proxy:
            proxy_info = json.loads(proxy[0])
            request.meta['proxy'] = f"http://{proxy_info['ip']}:{proxy_info['port']}"
            spider.logger.info(f"使用代理: {proxy_info['ip']}")
        return None

class FinanceNewsSpider(RedisCrawlSpider):
    """金融舆情监控爬虫 - 分布式架构"""
    
    name = 'finance_news'
    redis_key = 'finance_news:start_urls'
    
    # [课程作业要求] 反爬策略：请求频率控制
    custom_settings = {
        'CONCURRENT_REQUESTS': 8,
        'DOWNLOAD_DELAY': 1.5,  # 每请求间隔1.5秒
        'RANDOMIZE_DOWNLOAD_DELAY': True,  # 随机化延迟
        'AUTOTHROTTLE_ENABLED': True,  # 自动限速
        'AUTOTHROTTLE_START_DELAY': 2,
        'AUTOTHROTTLE_MAX_DELAY': 10,
    }
    
    def parse_news(self, response):
        """解析新闻详情页"""
        item = {
            'url': response.url,
            'title': response.css('h.article-title::text').get(),
            'publish_time': response.css('span.date::text').get(),
            'source': response.css('a.source::text').get(),
            'content': ' '.join(response.css('p.article-content::text').getall()),
            'crawl_time': datetime.now().isoformat(),
        }
        
        # [课程作业要求] 反爬策略：增量采集（基于URL去重）
        if not self.redis_conn.sismember('crawled:news:urls', item['url']):
            self.redis_conn.sadd('crawled:news:urls', item['url'])
            yield item`,
    codeLanguage: 'python',
    antiCrawlerStrategy: ['User-Agent轮换', 'IP代理池', '请求频率控制', 'Referer伪装', '增量采集去重']
  },
  {
    id: 2,
    title: '医疗文献采集系统',
    industry: '医疗',
    techStack: ['Python', 'Selenium', 'PubMed API', 'MySQL'],
    difficulty: '高级',
    description: '对接PubMed官方API，自动采集医学文献摘要、DOI、作者信息，支持文献全文链接追踪和医学主题词分析。',
    codeSnippet: `import time
import random
import mysql.connector
from datetime import datetime, timedelta
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

# [课程作业要求] 反爬策略：浏览器指纹随机化
class FingerprintGenerator:
    """生成随机化的浏览器指纹"""
    
    @staticmethod
    def get_random_viewport():
        viewports = [(1920, 1080), (1366, 768), (1536, 864), (1440, 900)]
        return random.choice(viewports)
    
    @staticmethod
    def get_random_timezone():
        return random.choice(['America/New_York', 'Europe/London', 'Asia/Shanghai'])

# [课程作业要求] 反爬策略：分布式Session管理
class SessionManager:
    """多浏览器Session管理，支持登录态维护"""
    
    def __init__(self, db_config):
        self.db = mysql.connector.connect(**db_config)
        self.sessions = {}
    
    def get_session(self, site_name):
        """获取或创建Session"""
        if site_name not in self.sessions:
            chrome_options = Options()
            # [课程作业要求] 反爬策略：去除自动化特征
            chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])
            chrome_options.add_argument('--disable-blink-features=AutomationControlled')
            
            viewport = FingerprintGenerator.get_random_viewport()
            chrome_options.add_argument(f'--window-size={viewport[0]},{viewport[1]}')
            
            # 设置语言和时区
            chrome_options.add_argument('--lang=zh-CN')
            
            driver = webdriver.Chrome(options=chrome_options)
            
            # 去除webdriver特征
            driver.execute_cdp_cmd('Page.addScriptToEvaluateOnNewDocument', {
                'source': '''
                    Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
                    Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});
                '''
            })
            
            self.sessions[site_name] = driver
        
        return self.sessions[site_name]
    
    def login_if_needed(self, site_name, login_url, credentials):
        """维护登录态，自动刷新过期Session"""
        session = self.get_session(site_name)
        
        # 检查Session是否有效
        with self.db.cursor() as cursor:
            cursor.execute(
                'SELECT token, expires_at FROM sessions WHERE site=%s ORDER BY created_at DESC LIMIT 1',
                (site_name,)
            )
            result = cursor.fetchone()
        
        if not result or datetime.now() > result[1]:
            # [课程作业要求] 反爬策略：模拟人类行为登录
            session.get(login_url)
            time.sleep(random.uniform(1, 3))  # 模拟思考时间
            
            # 执行登录操作...
            # 更新数据库中的Session
            new_token = self._generate_token()
            with self.db.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO sessions (site, token, created_at, expires_at)
                    VALUES (%s, %s, %s, %s)
                ''', (site_name, new_token, datetime.now(), datetime.now() + timedelta(days=7)))
            self.db.commit()
        
        return session
    
    def _generate_token(self):
        import hashlib
        return hashlib.sha256(str(time.time()).encode()).hexdigest()[:32]

def fetch_pubmed_articles(search_term, max_results=100):
    """使用PubMed API采集文献"""
    from Bio import Entrez
    
    Entrez.email = 'your.email@example.com'  # [课程作业要求] 设置联系方式
    Entrez.api_key = 'YOUR_API_KEY'  # [课程作业要求] 使用API Key提高访问频率
    
    # [课程作业要求] 反爬策略：API调用频率控制
    handle = Entrez.esearch(db='pubmed', term=search_term, retmax=max_results)
    time.sleep(random.uniform(0.3, 0.8))  # 控制请求间隔
    
    results = Entrez.read(handle)
    handle.close()
    
    ids = results['IdList']
    
    # 批量获取文献详情
    if ids:
        fetch_handle = Entrez.efetch(db='pubmed', id=ids, rettype='abstract', retmode='xml')
        time.sleep(random.uniform(0.5, 1.2))  # 控制请求间隔
        articles = Entrez.read(fetch_handle)
        fetch_handle.close()
        
        return articles['PubmedArticle']
    
    return []`,
    codeLanguage: 'python',
    antiCrawlerStrategy: ['浏览器指纹随机化', '自动化特征隐藏', 'Session维护', 'API调用频率控制', '人类行为模拟']
  },
  {
    id: 3,
    title: '电商价格追踪平台',
    industry: '电商',
    techStack: ['Node.js', 'Puppeteer', 'Express', 'Redis'],
    difficulty: '中级',
    description: '追踪京东、淘宝商品价格波动，设置价格提醒阈值，采集历史价格数据用于价格趋势分析和促销时机判断。',
    codeSnippet: `const puppeteer = require('puppeteer');
const Redis = require('ioredis');
const axios = require('axios');

// [课程作业要求] 反爬策略：设备指纹生成
function generateDeviceFingerprint() {
  const fp = {
    screenResolution: ['1920x1080', '1366x768', '1536x864'][Math.floor(Math.random() * 3)],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: 'zh-CN',
    platform: 'Win32',
    hardwareConcurrency: [4, 8, 16][Math.floor(Math.random() * 3)],
    webglRenderer: 'Intel Iris OpenGL Engine',
    webglVendor: 'Intel Inc',
    deviceMemory: [4, 8, 16][Math.floor(Math.random() * 3)],
  };
  return fp;
}

// [课程作业要求] 反爬策略：Cookie管理
class CookieManager {
  constructor(redis) {
    this.redis = redis;
    this.cookieKey = 'jd:cookies:';
  }
  
  async getCookies(domain) {
    const cookies = await this.redis.lrange(this.cookieKey + domain, 0, -1);
    return cookies.map(c => JSON.parse(c));
  }
  
  async saveCookies(domain, cookies) {
    const pipeline = this.redis.pipeline();
    pipeline.del(this.cookieKey + domain);
    cookies.forEach(c => pipeline.rpush(this.cookieKey + domain, JSON.stringify(c)));
    await pipeline.exec();
  }
  
  async rotateCookies(domain) {
    // [课程作业要求] 反爬策略：Cookie轮换
    const cookies = await this.getCookies(domain);
    if (cookies.length > 1) {
      const lastCookie = cookies.pop();
      await this.redis.lpush(this.cookieKey + domain, JSON.stringify(lastCookie));
    }
    return cookies[0];
  }
}

class JDPriceTracker {
  constructor() {
    this.redis = new Redis({ host: 'localhost', port: 6379 });
    this.cookieManager = new CookieManager(this.redis);
    this.browser = null;
  }
  
  async initBrowser() {
    // [课程作业要求] 反爬策略：反检测配置
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--allow-running-insecure-content',
        '--disable-webgl',
        '--ignore-certificate-errors',
      ],
    });
  }
  
  async trackPrice(productUrl, targetPrice) {
    const page = await this.browser.newPage();
    const fp = generateDeviceFingerprint();
    
    // [课程作业要求] 反爬策略：设置真实的设备指纹
    await page.evaluateOnNewDocument((fp) => {
      Object.defineProperty(navigator, 'deviceMemory', { get: () => fp.deviceMemory });
      Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => fp.hardwareConcurrency });
    }, fp);
    
    // 设置User-Agent
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36',
    ];
    await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);
    
    // 设置Cookie
    const cookies = await this.cookieManager.rotateCookies('jd.com');
    if (cookies.length) {
      await page.setCookie(...cookies);
    }
    
    // 设置视口
    await page.setViewport({ width: 1920, height: 1080 });
    
    // [课程作业要求] 反爬策略：随机等待模拟人类行为
    await page.goto(productUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForTimeout(Math.random() * 2000 + 1000);
    
    // [课程作业要求] 反爬策略：IP代理切换
    const proxy = await this.redis.srandmember('proxies:jd');
    if (proxy) {
      await page.authenticate({ 
        username: proxy.username, 
        password: proxy.password 
      });
    }
    
    // 提取价格
    const price = await page.evaluate(() => {
      // 京东价格可能在多个位置
      const priceElement = document.querySelector('.price J_price') 
                        || document.querySelector('#jd-price')
                        || document.querySelector('[data-price]');
      return priceElement ? priceElement.textContent.trim() : null;
    });
    
    // 保存Cookie用于后续使用
    const currentCookies = await page.cookies();
    await this.cookieManager.saveCookies('jd.com', currentCookies);
    
    await page.close();
    
    // 价格分析与提醒
    if (price) {
      const currentPrice = parseFloat(price);
      if (currentPrice <= targetPrice) {
        await this.sendAlert(productUrl, currentPrice, targetPrice);
      }
      await this.savePriceHistory(productUrl, currentPrice);
    }
    
    return { url: productUrl, price, timestamp: new Date().toISOString() };
  }
  
  async sendAlert(url, currentPrice, targetPrice) {
    // 发送价格提醒（邮件/短信/微信）
    console.log(\`[Alert] Price: \${currentPrice} below target: \${targetPrice}\`);
  }
  
  async savePriceHistory(url, price) {
    await this.redis.zadd('price:history:' + url, Date.now(), JSON.stringify({
      price,
      timestamp: new Date().toISOString()
    }));
  }
}

module.exports = { JDPriceTracker, CookieManager };`,
    codeLanguage: 'javascript',
    antiCrawlerStrategy: ['设备指纹生成', 'Cookie轮换管理', 'IP代理切换', '随机等待', 'User-Agent轮换', '反检测配置']
  },
  {
    id: 4,
    title: '房产数据采集分析',
    industry: '房地产',
    techStack: ['Python', 'Scrapy', 'Splash', 'Elasticsearch'],
    difficulty: '中级',
    description: '采集链家、安居客房源数据，解析户型、面积、单价、小区信息，存入Elasticsearch进行全文检索和聚合分析。',
    codeSnippet: `# -*- coding: utf-8 -*-
import scrapy
import json
import lua_script  # 自定义Lua脚本

# [课程作业要求] 反爬策略：Splash渲染 + Lua脚本
SPLASH_ARGS = {
    'lua_source': '''
        function main(splash, args)
          -- [课程作业要求] 反爬策略：Splash中间件实现JS渲染
          splash:set_user_agent(math.random() > 0.5 and 
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" or
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
          )
          
          splash.images_enabled = false  -- 不加载图片，提升速度
          splash.js_enabled = true
          
          assert(splash:go(args.url))
          splash:wait(2, 0.5)  -- 等待JS渲染
          
          -- [课程作业要求] 反爬策略：模拟滚动触发懒加载
          splash:runjs([[
            window.scrollTo(0, document.body.scrollHeight / 3);
          ]])
          splash:wait(0.5)
          splash:runjs([[
            window.scrollTo(0, document.body.scrollHeight * 2 / 3);
          ]])
          splash:wait(0.5)
          splash:runjs([[
            window.scrollTo(0, document.body.scrollHeight);
          ]])
          splash:wait(1)
          
          return {
            html = splash:html(),
            cookies = splash:get_cookies(),
            headers = splash:http_headers(),
          }
        end
    ''',
    'timeout': 30,
    'resource_timeout': 10,
}

class LianjiaHouseSpider(scrapy.Spider):
    name = 'lianjia_houses'
    
    # [课程作业要求] 反爬策略：分布式爬虫架构
    custom_settings = {
        'SPLASH_URL': 'http://localhost:8050',
        'DOWNLOADER_MIDDLEWARES': {
            'scrapy_splash.SplashCookiesMiddleware': 723,
            'scrapy_splash.SplashMiddleware': 725,
        },
        'SPIDER_MIDDLEWARES': {
            'scrapy_splash.SplashDeduplicateArgsMiddleware': 100,
        },
        'DUPEFILTER_CLASS': 'scrapy_splash.SplashAwareDupeFilter',
        'HTTPCACHE_STORAGE': 'scrapy_splash.SplashAwareFSCacheStorage',
        'DOWNLOAD_DELAY': 3,
        'AUTOTHROTTLE_ENABLED': True,
    }
    
    def start_requests(self):
        cities = ['bj', 'sh', 'gz', 'sz', 'hz', 'cd', 'wh', 'tj']
        for city in cities:
            # 采集二手房
            for district in range(1, 10):
                url = f'https://{city}.lianjia.com/ershoufang/pg{district}/'
                yield splash_request(url, callback=self.parse_house_list, args=SPLASH_ARGS)
    
    def parse_house_list(self, response):
        """解析房源列表页"""
        houses = response.css('.sellListContent li.logInfo')
        
        for house in houses:
            item = {
                'title': house.css('.title a::text').get(),
                'address': house.css('.address .houseInfo::text').get(),
                'price': house.css('.priceInfo .totalPrice span::text').get(),
                'unit_price': house.css('.priceInfo .unitPrice span::text').get(),
                'district': house.css('.positionInfo a::text').get(),
                'crawl_time': response.meta['timestamp'],
            }
            
            # 跟随详情页采集更多信息
            detail_url = house.css('.title a::attr(href)').get()
            if detail_url:
                yield splash_request(
                    detail_url,
                    callback=self.parse_house_detail,
                    args=SPLASH_ARGS,
                    meta={'item': item}
                )
    
    def parse_house_detail(self, response):
        """解析房源详情页"""
        item = response.meta['item']
        
        # [课程作业要求] 反爬策略：动态数据解析
        script_data = response.css('script:contains关键字)::extract_first')
        if script_data:
            import re
            data_match = re.search(r'window.__INIT_STATE__ = ({.*?})', script_data)
            if data_match:
                data = json.loads(data_match.group(1))
                item['house_id'] = data.get('houseId')
                item['view_count'] = data.get('hitCount', 0)
        
        yield item

def splash_request(url, callback, args=None, meta=None):
    """创建Splash请求"""
    from scrapy_splash import SplashRequest
    
    if args is None:
        args = SPLASH_ARGS
    
    request = SplashRequest(
        url=url,
        callback=callback,
        args=args,
        meta={
            **(meta or {}),
            'timestamp': __import__('datetime').datetime.now().isoformat(),
        },
        dont_send_headers=True,
        cache_args=True,
    )
    return request`,
    codeLanguage: 'python',
    antiCrawlerStrategy: ['Splash JS渲染', 'Lua脚本模拟滚动', '分布式架构', '请求延迟', '动态数据解析']
  },
  {
    id: 5,
    title: '招聘数据聚合平台',
    industry: '人力资源',
    techStack: ['Node.js', 'Cheerio', 'PostgreSQL', 'GraphQL'],
    difficulty: '初级',
    description: '聚合Boss直聘、猎聘网、拉勾网等主流招聘平台职位信息，统一数据格式，支持多维度筛选和薪资对比分析。',
    codeSnippet: `const axios = require('axios');
const cheerio = require('cheerio');
const { Pool } = require('pg');

// [课程作业要求] 反爬策略：请求头伪造
const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Cache-Control': 'max-age=0',
};

class RecruitmentAggregator {
  constructor() {
    this.pool = new Pool({
      host: 'localhost',
      database: 'recruitment',
      user: 'admin',
      password: 'password',
    });
    this.requestQueue = [];
    this.isRunning = false;
  }
  
  async fetchJobList(platform, keyword, page = 1) {
    const platforms = {
      'zhipin': {
        url: 'https://www.zhipin.com/web/geek/job',
        params: { keyword, page, pageSize: 15 },
        // [课程作业要求] 反爬策略：Cookie预置
        cookies: 'uGUID=xxx; wt2=xxx;',
      },
      'liepin': {
        url: 'https://www.liepin.com/zhaopin/',
        params: { keyword, currentPage: page - 1, flushckid: Math.random() },
      },
      'lagou': {
        url: 'https://www.lagou.com/jobs/positionAjax.json',
        params: { keyword, pageNo: page, needAddtionalResult: false },
      }
    };
    
    const config = platforms[platform];
    if (!config) throw new Error(\`Unsupported platform: \${platform}\`);
    
    try {
      // [课程作业要求] 反爬策略：请求间隔控制
      await this.rateLimit(platform);
      
      const response = await axios.get(config.url, {
        params: config.params,
        headers: {
          ...DEFAULT_HEADERS,
          ...(config.cookies && { 'Cookie': config.cookies }),
          // [课程作业要求] 反爬策略：Referer伪装
          'Referer': \`\${config.url}?\${new URLSearchParams(config.params)}\`,
        },
        timeout: 15000,
      });
      
      return this.parseJobList(platform, response.data);
    } catch (error) {
      console.error(\`[Error] Fetch \${platform} failed:\`, error.message);
      return [];
    }
  }
  
  parseJobList(platform, data) {
    const jobs = [];
    
    if (platform === 'zhipin') {
      // 解析Boss直聘页面
      const $ = cheerio.load(data);
      $('.job-list-box').each((i, el) => {
        jobs.push({
          platform: 'Boss直聘',
          title: $(el).find('.job-title').text().trim(),
          company: $(el).find('.company-name').text().trim(),
          salary: $(el).find('.salary').text().trim(),
          location: $(el).find('.location-name').text().trim(),
          experience: $(el).find('.experience').text().trim(),
          education: $(el).find('.education').text().trim(),
        });
      });
    } else if (platform === 'liepin') {
      // 解析猎聘页面
      const $ = cheerio.load(data);
      $('.job-list-box').each((i, el) => {
        jobs.push({
          platform: '猎聘网',
          title: $(el).find('.job-title-box h3').text().trim(),
          company: $(el).find('.company-name').text().trim(),
          salary: $(el).find('.salary').text().trim(),
        });
      });
    } else if (platform === 'lagou') {
      // 解析拉勾JSON响应
      if (data.content && data.content.positionResult) {
        data.content.positionResult.result.forEach(item => {
          jobs.push({
            platform: '拉勾网',
            title: item.positionName,
            company: item.companyFullName,
            salary: \`\${item.salary}k~\${item.salary}k\`,
            city: item.city,
            district: item.district,
          });
        });
      }
    }
    
    return jobs;
  }
  
  async rateLimit(platform) {
    // [课程作业要求] 反爬策略：平台级别限流
    const limits = { zhipin: 2000, liepin: 1500, lagou: 1000 };
    const minInterval = limits[platform] || 2000;
    
    const now = Date.now();
    const lastRequest = this.lastRequestTime?.[platform] || 0;
    const waitTime = Math.max(0, minInterval - (now - lastRequest));
    
    if (waitTime > 0) {
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = this.lastRequestTime || {};
    this.lastRequestTime[platform] = Date.now();
  }
  
  async saveToDatabase(jobs) {
    // [课程作业要求] 数据清洗与标准化
    const client = await this.pool.connect();
    try {
      for (const job of jobs) {
        // 数据清洗
        const cleaned = {
          title: job.title.replace(/<[^>]*>/g, '').trim(),
          company: job.company.replace(/<[^>]*>/g, '').trim(),
          salary_min: this.parseSalary(job.salary, 'min'),
          salary_max: this.parseSalary(job.salary, 'max'),
          platform: job.platform,
          raw_data: JSON.stringify(job),
          created_at: new Date(),
        };
        
        // 存入PostgreSQL
        await client.query(\`
          INSERT INTO jobs (title, company, salary_min, salary_max, platform, raw_data, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT DO NOTHING
        \`, [cleaned.title, cleaned.company, cleaned.salary_min, cleaned.salary_max, cleaned.platform, cleaned.raw_data, cleaned.created_at]);
      }
    } finally {
      client.release();
    }
  }
  
  parseSalary(salaryStr, type) {
    // 解析薪资字符串，如 "15k-25k" -> 15 或 25
    const match = salaryStr.match(/(\d+)[kK]?-(\d+)[kK]?/);
    if (match) {
      return type === 'min' ? parseInt(match[1]) : parseInt(match[2]);
    }
    return null;
  }
}

module.exports = { RecruitmentAggregator };`,
    codeLanguage: 'javascript',
    antiCrawlerStrategy: ['请求头完整伪装', 'Cookie预置', 'Referer伪装', '平台级限流', '数据清洗标准化']
  },
  {
    id: 6,
    title: '法律文书采集系统',
    industry: '法律',
    techStack: ['Python', 'Playwright', 'PDFParser', 'SQLite'],
    difficulty: '高级',
    description: '采集裁判文书网、法律法规数据库的公开法律文书，支持PDF下载解析，全文索引检索，构建法律知识库。',
    codeSnippet: `import asyncio
import re
from datetime import datetime, timedelta
from playwright.async_api import async_playwright
from pdfminer.high_level import extract_text
import sqlite3

# [课程作业要求] 反爬策略：异步并发控制
class AsyncRateLimiter:
    """异步请求限流器"""
    
    def __init__(self, max_concurrent: int = 3, min_interval: float = 2.0):
        self.semaphore = asyncio.Semaphore(max_concurrent)
        self.min_interval = min_interval
        self.last_request_time = {}
    
    async def acquire(self, domain: str):
        async with self.semaphore:
            if domain in self.last_request_time:
                elapsed = datetime.now() - self.last_request_time[domain]
                if elapsed < timedelta(seconds=self.min_interval):
                    await asyncio.sleep((self.min_interval - elapsed.total_seconds()))
            
            self.last_request_time[domain] = datetime.now()
            yield

class LegalDocumentCrawler:
    def __init__(self, db_path: str = 'legal_docs.db'):
        self.db = sqlite3.connect(db_path)
        self.rate_limiter = AsyncRateLimiter(max_concurrent=2, min_interval=3.0)
        self.browser = None
        self.setup_database()
    
    def setup_database(self):
        cursor = self.db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS documents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                case_number TEXT UNIQUE,
                title TEXT,
                court TEXT,
                case_date TEXT,
                case_type TEXT,
                content TEXT,
                pdf_path TEXT,
                url TEXT,
                crawl_time TEXT
            )
        ''')
        self.db.commit()
    
    async def init_browser(self):
        # [课程作业要求] 反爬策略：反检测配置
        playwright = await async_playwright().start()
        self.browser = await playwright.chromium.launch(
            headless=True,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
            ]
        )
        
        context = await self.browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
            viewport={'width': 1920, 'height': 1080},
            locale='zh-CN',
            timezone_id='Asia/Shanghai',
            # [课程作业要求] 反爬策略：地理位置模拟
            geolocation={'latitude': 39.9042, 'longitude': 116.4074},
            permissions=['geolocation']
        )
        
        # [课程作业要求] 反爬策略：隐藏自动化特征
        await context.add_init_script('''
            Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
            Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});
            Object.defineProperty(navigator, 'languages', {get: () => ['zh-CN', 'zh', 'en']});
        ''')
        
        return context
    
    async def crawl_wenshu(self, case_type='民事', page=1):
        """采集裁判文书网"""
        context = await self.init_browser()
        page_obj = await context.new_page()
        
        try:
            async with self.rate_limiter.acquire('wenshu.court.gov.cn'):
                # [课程作业要求] 反爬策略：验证码处理（打码平台对接）
                url = f'http://wenshu.court.gov.cn/website/wenshu/181217B5F1A72F3F0117F2/home.html'
                await page_obj.goto(url, wait_until='networkidle', timeout=60000)
                
                # 等待验证码（如果有）
                await self.handle_captcha(page_obj)
                
                # 执行搜索
                await page_obj.fill('#searchKey', case_type)
                await page_obj.click('#searchButton')
                await page_obj.wait_for_load_state('networkidle')
                
                # [课程作业要求] 反爬策略：随机滚动模拟人类
                await self.human_like_scroll(page_obj)
                
                # 解析文书列表
                docs = await page_obj.evaluate('''
                    () => {
                        const items = document.querySelectorAll('.case-list-item');
                        return Array.from(items).map(item => ({
                            title: item.querySelector('.case-title')?.innerText,
                            caseNumber: item.querySelector('.case-number')?.innerText,
                            court: item.querySelector('.court-name')?.innerText,
                            date: item.querySelector('.case-date')?.innerText,
                            url: item.querySelector('a')?.href
                        }));
                    }
                ''')
                
                for doc in docs:
                    await self.save_document(doc)
        
        finally:
            await page_obj.close()
            await context.close()
    
    async def human_like_scroll(self, page_obj):
        """模拟人类滚动行为"""
        total_height = await page_obj.evaluate('document.body.scrollHeight')
        viewport_height = await page_obj.evaluate('window.innerHeight')
        
        for i in range(0, total_height, viewport_height // 2):
            await page_obj.evaluate(f'window.scrollTo(0, {i})')
            await asyncio.sleep(0.3 + (hash(str(i)) % 100) / 100)
    
    async def handle_captcha(self, page_obj):
        """处理验证码"""
        captcha_selector = '.captcha-container'
        try:
            await page_obj.wait_for_selector(captcha_selector, timeout=3000)
            
            # [课程作业要求] 反爬策略：验证码识别（接入打码平台）
            captcha_img = await page_obj.query_selector('.captcha-image')
            if captcha_img:
                captcha_text = await self.recognize_captcha(captcha_img)
                await page_obj.fill('#captchaInput', captcha_text)
                await page_obj.click('.captcha-submit')
                await asyncio.sleep(1)
        except:
            pass  # 无验证码
    
    async def recognize_captcha(self, captcha_element):
        """验证码识别（对接打码平台）"""
        # 这里应该调用打码平台API
        # 返回识别结果
        return "1234"
    
    async def download_and_parse_pdf(self, pdf_url, save_dir='./pdfs/'):
        """下载并解析PDF"""
        import os
        import httpx
        
        os.makedirs(save_dir, exist_ok=True)
        
        async with self.rate_limiter.acquire('wenshu.court.gov.cn'):
            response = await httpx.get(pdf_url, timeout=30.0)
            
            filename = f"{hash(pdf_url)}.pdf"
            filepath = os.path.join(save_dir, filename)
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            # [课程作业要求] PDF内容提取
            try:
                text = extract_text(filepath)
                return {'path': filepath, 'content': text}
            except Exception as e:
                return {'path': filepath, 'error': str(e)}
    
    def save_document(self, doc):
        """保存到SQLite"""
        cursor = self.db.cursor()
        try:
            cursor.execute('''
                INSERT OR REPLACE INTO documents 
                (case_number, title, court, case_date, crawl_time)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                doc.get('caseNumber'),
                doc.get('title'),
                doc.get('court'),
                doc.get('date'),
                datetime.now().isoformat()
            ))
            self.db.commit()
        except sqlite3.IntegrityError:
            pass  # 已存在，跳过

async def main():
    crawler = LegalDocumentCrawler()
    await crawler.crawl_wenshu(case_type='民事', page=1)

if __name__ == '__main__':
    asyncio.run(main())`,
    codeLanguage: 'python',
    antiCrawlerStrategy: ['异步并发控制', '反检测配置', '地理位置模拟', '验证码识别', '人类滚动模拟', 'PDF解析']
  },
  {
    id: 7,
    title: '高校导师研究领域采集',
    industry: '教育',
    techStack: ['Python', 'Requests', 'BeautifulSoup', 'Neo4j'],
    difficulty: '中级',
    description: '采集高校导师主页的科研方向、发表论文、基金项目信息，构建学术关系图谱，支持按研究方向检索潜在合作者。',
    codeSnippet: `import requests
from bs4 import BeautifulSoup
import time
import random
import json
from datetime import datetime
from neo4j import GraphDatabase

# [课程作业要求] 反爬策略：登录态维护与Session管理
class LoginSession:
    """维护登录状态的Session"""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9',
        })
        self.logged_in = False
    
    def login(self, website, username, password):
        """模拟登录获取cookie"""
        # [课程作业要求] 反爬策略：CSRF Token处理
        response = self.session.get(website + '/login')
        soup = BeautifulSoup(response.text, 'html.parser')
        
        csrf_token = soup.find('input', {'name': '_csrf_token'})['value']
        
        login_data = {
            'username': username,
            'password': password,
            '_csrf_token': csrf_token,
        }
        
        login_response = self.session.post(
            website + '/login/check',
            data=login_data,
            allow_redirects=True
        )
        
        if login_response.status_code == 200:
            self.logged_in = True
            print(f"[登录成功] {website}")
        else:
            print(f"[登录失败] {website}")
        
        return self.logged_in

# [课程作业要求] 反爬策略：验证码识别
class CaptchaRecognizer:
    """验证码识别（OCR + 打码平台）"""
    
    def __init__(self):
        self.char_set = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    
    def recognize_simple_captcha(self, image_bytes):
        """简单的验证码识别（仅演示）"""
        # 实际应该使用 pytesseract 或对接打码平台API
        # 这里返回占位符
        return "".join(random.sample(self.char_set, 4))
    
    def recognize_slider_captcha(self, slider_image, bg_image):
        """滑块验证码识别（缺口位置计算）"""
        # 使用OpenCV进行模板匹配
        # 返回滑块需要移动的距离
        return 120  # 占位符

class ProfessorCrawler:
    def __init__(self, neo4j_uri='bolt://localhost:7687', neo4j_user='neo4j', neo4j_password='password'):
        self.session = LoginSession()
        self.db = GraphDatabase.driver(neo4j_uri, auth=(neo4j_user, neo4j_password))
        self.captcha = CaptchaRecognizer()
    
    def fetch_professor_page(self, url):
        """获取教授主页"""
        # [课程作业要求] 反爬策略：请求间隔随机化
        time.sleep(random.uniform(2, 5))
        
        response = self.session.session.get(url, timeout=15)
        response.encoding = 'utf-8'
        
        if response.status_code != 200:
            print(f"[请求失败] {url} - {response.status_code}")
            return None
        
        return BeautifulSoup(response.text, 'html.parser')
    
    def parse_professor_info(self, soup, source_url):
        """解析教授信息"""
        info = {
            'name': '',
            'title': '',
            'department': '',
            'research_interests': [],
            'papers': [],
            'projects': [],
            'email': '',
            'phone': '',
        }
        
        try:
            # 解析基本信息
            info['name'] = soup.find('h1', class_='professor-name').get_text(strip=True)
            info['title'] = soup.find('div', class_='professor-title').get_text(strip=True)
            info['department'] = soup.find('div', class_='department').get_text(strip=True)
            
            # [课程作业要求] 反爬策略：邮箱电话脱敏处理
            email_elem = soup.find('a', class_='email')
            if email_elem:
                info['email'] = self.mask_email(email_elem.get('href', '').replace('mailto:', ''))
            
            # 解析研究兴趣（关键词提取）
            interest_tags = soup.find_all('a', class_='interest-tag')
            info['research_interests'] = [tag.get_text(strip=True) for tag in interest_tags]
            
            # 解析发表论文
            paper_list = soup.find('ul', class_='paper-list')
            if paper_list:
                for paper in paper_list.find_all('li')[:10]:  # 限制数量
                    title_elem = paper.find('a', class_='paper-title')
                    if title_elem:
                        info['papers'].append({
                            'title': title_elem.get_text(strip=True),
                            'url': title_elem.get('href', ''),
                            'year': paper.find('span', class_='year').get_text(strip=True) if paper.find('span', class_='year') else ''
                        })
            
            # 解析基金项目
            project_list = soup.find('ul', class_='project-list')
            if project_list:
                for project in project_list.find_all('li')[:5]:
                    info['projects'].append({
                        'name': project.get_text(strip=True),
                        'source': project.get('data-source', '')
                    })
        
        except Exception as e:
            print(f"[解析错误] {source_url}: {e}")
        
        return info
    
    def mask_email(self, email):
        """邮箱脱敏"""
        if '@' in email:
            local, domain = email.split('@')
            return local[:2] + '***@' + domain
        return email
    
    def save_to_neo4j(self, professor_info, university):
        """保存到Neo4j图数据库"""
        with self.db.session() as session:
            # 创建教授节点
            session.run('''
                MERGE (p:Professor {name: $name})
                SET p.title = $title,
                    p.department = $department,
                    p.email = $email,
                    p.university = $university,
                    p.updated_at = datetime()
            ''', {
                'name': professor_info['name'],
                'title': professor_info['title'],
                'department': professor_info['department'],
                'email': professor_info['email'],
                'university': university
            })
            
            # 创建研究方向节点和关系
            for interest in professor_info['research_interests']:
                session.run('''
                    MATCH (p:Professor {name: $prof_name})
                    MERGE (r:ResearchInterest {name: $interest})
                    MERGE (p)-[:RESEARCHES]->(r)
                ''', {
                    'prof_name': professor_info['name'],
                    'interest': interest
                })
            
            # 创建合作关系（同一研究方向的教授）
            session.run('''
                MATCH (p1:Professor {university: $university})-[:RESEARCHES]->(i:ResearchInterest)<-[:RESEARCHES]-(p2:Professor)
                WHERE p1 <> p2
                MERGE (p1)-[:COLLABORATES_WITH {type: 'same_interest'}]-(p2)
            ''', {'university': university})
    
    def crawl_university(self, base_url, department_list):
        """爬取整个大学的教授信息"""
        for dept in department_list:
            dept_url = f"{base_url}/department/{dept}"
            print(f"[采集院系] {dept}")
            
            soup = self.fetch_professor_page(dept_url)
            if not soup:
                continue
            
            # 获取教授列表
            prof_links = soup.find_all('a', class_='professor-link')
            
            for link in prof_links:
                prof_url = link.get('href')
                if not prof_url.startswith('http'):
                    prof_url = base_url + prof_url
                
                print(f"  [采集教授] {prof_url}")
                prof_soup = self.fetch_professor_page(prof_url)
                
                if prof_soup:
                    prof_info = self.parse_professor_info(prof_soup, prof_url)
                    self.save_to_neo4j(prof_info, base_url)
                    
                    # [课程作业要求] 反爬策略：随机延迟
                    time.sleep(random.uniform(3, 8))

# 使用示例
def main():
    crawler = ProfessorCrawler(
        neo4j_uri='bolt://localhost:7687',
        neo4j_user='neo4j',
        neo4j_password='your_password'
    )
    
    # 登录（如果需要）
    # crawler.session.login('https://academic.example.edu', 'user', 'pass')
    
    universities = [
        'https://cs.example.edu',
        # 添加更多大学...
    ]
    
    for uni in universities:
        crawler.crawl_university(uni, ['cs', 'ai', 'software'])

if __name__ == '__main__':
    main()`,
    codeLanguage: 'python',
    antiCrawlerStrategy: ['登录态维护', 'CSRF Token处理', '请求间隔随机化', '验证码识别', '邮箱脱敏', '随机延迟']
  },
  {
    id: 8,
    title: '餐饮点评数据采集',
    industry: '餐饮',
    techStack: ['Node.js', 'Appium', 'MongoDB', 'Vue'],
    difficulty: '中级',
    description: '通过移动端APP采集大众点评、美团商家信息、用户评论，支持商家评分趋势分析和用户情感分析。',
    codeSnippet: `const Appium = require('appium');
const { AndroidDriver, log } = require('appium-android-driver');
const mongoose = require('mongoose');

// [课程作业要求] 反爬策略：设备指纹与App签名
const DEVICE_CONFIG = {
  platformVersion: '11.0',
  deviceName: 'MI 12',
  appPackage: 'com.sankuai.meituan',
  appActivity: 'com.sankuai.meituan.activity.Main',
  // [课程作业要求] 反爬策略：设备参数伪造
  deviceMetrics: {
    width: 1080,
    height: 2400,
    density: 2.75,
    dpi: 480
  },
  // [课程作业要求] 反爬策略：GPS位置模拟
  location: {
    latitude: 31.2304,
    longitude: 121.4737,
    altitude: 10
  }
};

// [课程作业要求] 反爬策略：签名算法实现
class DianpingSigner {
  constructor() {
    this.appKey = 'android7.7.7';
    this.appSecret = 'fdasf8f7a8s7df9a7s8f9d7as8f9d7as8f9';
  }
  
  // [课程作业要求] 反爬策略：签名算法（简化版，实际更复杂）
  sign(params) {
    const sortedKeys = Object.keys(params).sort();
    let signString = this.appKey;
    
    for (const key of sortedKeys) {
      if (params[key] !== undefined && params[key] !== '') {
        signString += key + '=' + params[key];
      }
    }
    
    signString += this.appSecret;
    
    // MD5签名
    const crypto = require('crypto');
    return crypto.createHash('md5').update(signString).digest('hex');
  }
  
  // [课程作业要求] 反爬策略：设备ID生成
  generateDeviceId() {
    const crypto = require('crypto');
    const timestamp = Date.now().toString();
    const randomStr = Math.random().toString(36).substring(2, 15);
    return crypto.createHash('md5').update(timestamp + randomStr).digest('hex').substring(0, 16);
  }
  
  // [课程作业要求] 反爬策略：X-Auth-Token生成
  generateAuthToken(userId, timestamp) {
    const crypto = require('crypto');
    const tokenData = userId + timestamp + this.appSecret;
    return crypto.createHash('sha256').update(tokenData).digest('hex');
  }
}

class DianpingCrawler {
  constructor(mongoUri = 'mongodb://localhost:27017/dianping') {
    this.signer = new DianpingSigner();
    this.driver = null;
    this.mongoUri = mongoUri;
  }
  
  async initDriver() {
    // 初始化Appium Driver
    this.driver = new AndroidDriver({
      host: '127.0.0.1',
      port: 4723,
      desiredCapabilities: {
        platformName: 'Android',
        ...DEVICE_CONFIG,
        // [课程作业要求] 反爬策略：UA伪装
        'desired capabilities': {
          'appium:deviceName': DEVICE_CONFIG.deviceName,
          'appium:platformVersion': DEVICE_CONFIG.platformVersion,
          'appium:noReset': true,
          'appium:fullReset': false,
        }
      }
    });
    
    await this.driver.startActivity({
      appPackage: DEVICE_CONFIG.appPackage,
      appActivity: DEVICE_CONFIG.appActivity
    });
  }
  
  async login(phone, verifyCode) {
    """模拟登录"""
    // 点击登录按钮
    await this.driver.click('android=new UiSelector().text("登录")');
    await this.driver.pause(1000);
    
    // 输入手机号
    await this.driver.setValue('android=new UiSelector().resourceId("et_phone")', phone);
    await this.driver.pause(500);
    
    // [课程作业要求] 反爬策略：请求间隔模拟人类
    await this.driver.pause(500 + Math.random() * 1000);
    
    // 点击获取验证码
    await this.driver.click('android=new UiSelector().text("获取验证码")');
    await this.driver.pause(2000);
    
    // 输入验证码
    await this.driver.setValue('android=new UiSelector().resourceId("et_code")', verifyCode);
    await this.driver.pause(500);
    
    // 点击登录
    await this.driver.click('android=new UiSelector().text("登录").instance(1)');
    await this.driver.pause(2000);
  }
  
  async searchShops(keyword, city = '上海') {
    """搜索商家"""
    // 构造签名参数
    const timestamp = Date.now().toString();
    const deviceId = this.signer.generateDeviceId();
    
    const params = {
      city: city,
      keyword: keyword,
      page: 1,
      limit: 20,
      platform: 'android',
      version: '7.7.7',
      deviceId: deviceId,
      timestamp: timestamp,
      appKey: this.signer.appKey,
    };
    
    // 生成签名
    params.sign = this.signer.sign(params);
    params['X-Auth-Token'] = this.signer.generateAuthToken('user123', timestamp);
    
    // [课程作业要求] 构造请求头
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'MeituanSearch/7.7.7 (Android 11.0; MI 12)',
      'app_key': this.signer.appKey,
      'device-id': deviceId,
      'timestamp': timestamp,
      'sign': params.sign,
      'X-Auth-Token': params['X-Auth-Token'],
      // [课程作业要求] 反爬策略：坐标加密
      'X-Encrypt-Lng': this.encryptCoord(DEVICE_CONFIG.location.longitude),
      'X-Encrypt-Lat': this.encryptCoord(DEVICE_CONFIG.location.latitude),
    };
    
    // 发起请求
    const response = await this.httpRequest({
      url: 'https://apips.meituan.com/waimai/search',
      method: 'POST',
      headers: headers,
      form: params
    });
    
    return JSON.parse(response);
  }
  
  async collectShopReviews(shopId, page = 1) {
    """采集商家评论"""
    const reviews = [];
    
    // [课程作业要求] 反爬策略：分页请求延迟
    for (let i = 1; i <= page; i++) {
      await this.driver.pause(2000 + Math.random() * 2000);
      
      const timestamp = Date.now().toString();
      const params = {
        shopId: shopId,
        page: i,
        limit: 20,
        platform: 'android',
        version: '7.7.7',
        timestamp: timestamp,
      };
      
      params.sign = this.signer.sign(params);
      
      try {
        // 滚动加载评论
        await this.driver.scroll({
          element: 'android=new UiSelector().resourceId("review_list")',
          endX: 0,
          endY: 500
        });
        
        // 解析评论列表
        const pageReviews = await this.driver.execute('mobile: shell', {
          command: 'am dump',
          args: ['$(pidof com.sankuai.meituan)']
        });
        
        // 提取评论数据
        const reviewTexts = await this.driver.$$('android=new UiSelector().resourceId("review_text")');
        for (const review of reviewTexts) {
          reviews.push(await review.getText());
        }
        
      } catch (error) {
        console.log(\`[采集完成] 第\${i}页\`);
        break;
      }
    }
    
    return reviews;
  }
  
  async saveToMongoDB(shopInfo, reviews) {
    """保存到MongoDB"""
    const db = mongoose.createConnection(this.mongoUri);
    
    const shopSchema = new mongoose.Schema({
      shopId: String,
      name: String,
      rating: Number,
      address: String,
      tags: [String],
      reviews: [{
        text: String,
        rating: Number,
        date: Date,
        userId: String
      }],
      crawledAt: { type: Date, default: Date.now }
    });
    
    const Shop = db.model('Shop', shopSchema);
    
    const shop = new Shop({
      shopId: shopInfo.shopId,
      name: shopInfo.name,
      rating: shopInfo.rating,
      address: shopInfo.address,
      tags: shopInfo.tags,
      reviews: reviews.map(r => ({ text: r, date: new Date() }))
    });
    
    await shop.save();
    await db.close();
  }
  
  encryptCoord(coord) {
    // [课程作业要求] 坐标加密算法
    const crypto = require('crypto');
    const key = 'dianping_coord_secret';
    const cipher = crypto.createCipher('aes-128-ecb', key);
    let encrypted = cipher.update(coord.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
  
  httpRequest(options) {
    // 实际使用axios或node-fetch
    return '{}';
  }
}

module.exports = { DianpingCrawler, DianpingSigner };`,
    codeLanguage: 'javascript',
    antiCrawlerStrategy: ['设备指纹生成', 'GPS位置模拟', '签名算法', 'X-Auth-Token', '坐标加密', '请求间隔模拟']
  },
  {
    id: 9,
    title: '交通流量实时采集',
    industry: '交通',
    techStack: ['Python', 'Kafka', 'Redis', 'Grafana'],
    difficulty: '高级',
    description: '实时采集城市道路摄像头数据，通过Kafka消息队列处理，分析交通流量和拥堵指数，实时可视化展示。',
    codeSnippet: `import asyncio
import websockets
import json
import kafka
from kafka import KafkaProducer, KafkaConsumer
from datetime import datetime, timedelta
import redis
import numpy as np

# [课程作业要求] 反爬策略：WebSocket连接管理
class WebSocketConnectionManager:
    """WebSocket长连接管理"""
    
    def __init__(self, url, reconnect_delay=5, max_reconnect=10):
        self.url = url
        self.ws = None
        self.reconnect_delay = reconnect_delay
        self.max_reconnect = max_reconnect
        self.reconnect_count = 0
        self.heartbeat_interval = 30
    
    async def connect(self):
        """建立WebSocket连接"""
        try:
            self.ws = await websockets.connect(
                self.url,
                ping_interval=self.heartbeat_interval,
                ping_timeout=10
            )
            self.reconnect_count = 0
            print(f"[连接成功] {self.url}")
            return True
        except Exception as e:
            print(f"[连接失败] {e}")
            return False
    
    async def reconnect(self):
        """重连机制"""
        while self.reconnect_count < self.max_reconnect:
            self.reconnect_count += 1
            print(f"[重连中] 第{self.reconnect_count}次尝试...")
            await asyncio.sleep(self.reconnect_delay)
            
            if await self.connect():
                return True
        
        print("[重连失败] 达到最大重试次数")
        return False
    
    async def receive(self):
        """接收消息"""
        try:
            async for message in self.ws:
                yield message
        except websockets.exceptions.ConnectionClosed:
            print("[连接断开]")
            await self.reconnect()

# [课程作业要求] 反爬策略：数据签名验证
class DataSignatureValidator:
    """数据签名验证（防止伪造数据）"""
    
    def __init__(self, secret_key):
        self.secret_key = secret_key
    
    def sign(self, data):
        """生成数据签名"""
        import hashlib
        import hmac
        
        data_str = json.dumps(data, sort_keys=True)
        signature = hmac.new(
            self.secret_key.encode(),
            data_str.encode(),
            hashlib.sha256
        ).hexdigest()
        return signature
    
    def verify(self, data, signature):
        """验证签名"""
        expected = self.sign(data)
        return expected == signature

class TrafficDataCollector:
    def __init__(self, 
                 kafka_servers=['localhost:9092'],
                 redis_host='localhost',
                 redis_port=6379):
        
        # Kafka生产者
        self.producer = KafkaProducer(
            bootstrap_servers=kafka_servers,
            value_serializer=lambda v: json.dumps(v).encode('utf-8'),
            # [课程作业要求] 反爬策略：消息压缩
            compression_type='gzip',
            batch_size=16384,
            linger_ms=10
        )
        
        # Redis缓存
        self.redis = redis.Redis(host=redis_host, port=redis_port, db=0)
        
        # 数据验证
        self.validator = DataSignatureValidator('traffic_secret_key_2024')
        
        # 流量统计
        self.flow_stats = {}
        
        # [课程作业要求] 反爬策略：异常检测
        self.anomaly_detector = TrafficAnomalyDetector()
    
    async def collect_realtime_traffic(self, camera_ids):
        """实时采集交通流量"""
        # WebSocket连接管理
        ws_manager = WebSocketConnectionManager(
            url='wss://traffic-api.city.gov.cn/realtime',
            reconnect_delay=5
        )
        
        if not await ws_manager.connect():
            return
        
        # 发送订阅消息
        subscribe_msg = {
            'type': 'subscribe',
            'cameraIds': camera_ids,
            'timestamp': datetime.now().isoformat()
        }
        await ws_manager.ws.send(json.dumps(subscribe_msg))
        
        # 接收并处理数据
        async for raw_data in ws_manager.receive():
            try:
                data = json.loads(raw_data)
                
                # [课程作业要求] 反爬策略：签名验证
                if 'signature' in data:
                    if not self.validator.verify(data, data['signature']):
                        print("[数据异常] 签名验证失败")
                        continue
                
                # 处理交通数据
                await self.process_traffic_data(data)
                
            except json.JSONDecodeError:
                print("[解析错误] 非JSON数据")
            except Exception as e:
                print(f"[处理错误] {e}")
    
    async def process_traffic_data(self, data):
        """处理交通流量数据"""
        camera_id = data['cameraId']
        timestamp = data['timestamp']
        vehicle_count = data['vehicleCount']
        avg_speed = data['avgSpeed']
        
        # [课程作业要求] 反爬策略：异常值过滤
        if self.anomaly_detector.is_anomaly(vehicle_count, avg_speed):
            print(f"[异常数据] camera={camera_id}, count={vehicle_count}, speed={avg_speed}")
            await self.log_anomaly(data)
            return
        
        # 计算拥堵指数
        congestion_index = self.calculate_congestion_index(vehicle_count, avg_speed)
        
        # 更新Redis缓存（用于实时查询）
        cache_key = f'traffic:{camera_id}'
        cache_data = {
            'cameraId': camera_id,
            'vehicleCount': vehicle_count,
            'avgSpeed': avg_speed,
            'congestionIndex': congestion_index,
            'timestamp': timestamp
        }
        self.redis.setex(cache_key, 60, json.dumps(cache_data))
        
        # 发送到Kafka
        self.producer.send('traffic-realtime', value=cache_data)
        
        # 更新统计
        self.update_flow_stats(camera_id, vehicle_count, congestion_index)
        
        # 检测拥堵
        if congestion_index > 0.8:
            await self.handle_congestion_alert(camera_id, congestion_index)
    
    def calculate_congestion_index(self, vehicle_count, avg_speed):
        """计算拥堵指数（0-1，越高越堵）"""
        # 简单算法：结合车流量和速度
        # 实际应该基于历史数据和道路容量
        speed_score = max(0, min(1, avg_speed / 60))  # 假设60为畅通速度
        flow_score = min(1, vehicle_count / 100)  # 假设100为容量
        
        # 拥堵指数 = 流量得分 * 0.6 + (1 - 速度得分) * 0.4
        congestion = flow_score * 0.6 + (1 - speed_score) * 0.4
        return round(congestion, 3)
    
    def update_flow_stats(self, camera_id, vehicle_count, congestion_index):
        """更新流量统计"""
        if camera_id not in self.flow_stats:
            self.flow_stats[camera_id] = {
                'count': 0,
                'total_congestion': 0,
                'sample_count': 0
            }
        
        stats = self.flow_stats[camera_id]
        stats['count'] += vehicle_count
        stats['total_congestion'] += congestion_index
        stats['sample_count'] += 1
        
        # 计算平均值
        stats['avg_vehicle_count'] = stats['count'] / stats['sample_count']
        stats['avg_congestion'] = stats['total_congestion'] / stats['sample_count']
        
        # 存储到Redis
        self.redis.hset('flow:stats', camera_id, json.dumps(stats))
    
    async def handle_congestion_alert(self, camera_id, congestion_index):
        """处理拥堵告警"""
        alert_data = {
            'type': 'congestion_alert',
            'cameraId': camera_id,
            'congestionIndex': congestion_index,
            'timestamp': datetime.now().isoformat(),
            'level': 'warning' if congestion_index < 0.9 else 'critical'
        }
        
        # 发送到Kafka（告警主题）
        self.producer.send('traffic-alerts', value=alert_data)
        
        # 同时存储到Redis列表（用于告警历史查询）
        self.redis.lpush('alerts:recent', json.dumps(alert_data))
        self.redis.ltrim('alerts:recent', 0, 99)  # 只保留最近100条
    
    async def log_anomaly(self, data):
        """记录异常数据"""
        anomaly_log = {
            'data': data,
            'detected_at': datetime.now().isoformat()
        }
        self.redis.lpush('anomaly:logs', json.dumps(anomaly_log))

# [课程作业要求] 反爬策略：异常检测算法
class TrafficAnomalyDetector:
    """交通数据异常检测"""
    
    def __init__(self, threshold_std=3):
        self.threshold_std = threshold_std
        self.history = []
        self.window_size = 100
    
    def is_anomaly(self, vehicle_count, avg_speed):
        """判断是否为异常值"""
        # 基于历史数据的统计异常检测
        if len(self.history) < 10:
            self.history.append({'count': vehicle_count, 'speed': avg_speed})
            return False
        
        counts = [h['count'] for h in self.history]
        speeds = [h['speed'] for h in self.history]
        
        count_mean = np.mean(counts)
        count_std = np.std(counts)
        speed_mean = np.mean(speeds)
        speed_std = np.std(speeds)
        
        # 检测异常
        count_zscore = abs(vehicle_count - count_mean) / (count_std + 1e-6)
        speed_zscore = abs(avg_speed - speed_mean) / (speed_std + 1e-6)
        
        is_anomaly = count_zscore > self.threshold_std or speed_zscore > self.threshold_std
        
        # 更新历史
        self.history.append({'count': vehicle_count, 'speed': avg_speed})
        if len(self.history) > self.window_size:
            self.history.pop(0)
        
        return is_anomaly

async def main():
    collector = TrafficDataCollector()
    
    # 监控的摄像头ID列表
    camera_ids = [
        'C001', 'C002', 'C003', 'C004', 'C005',
        'C006', 'C007', 'C008', 'C009', 'C010'
    ]
    
    await collector.collect_realtime_traffic(camera_ids)

if __name__ == '__main__':
    asyncio.run(main())`,
    codeLanguage: 'python',
    antiCrawlerStrategy: ['WebSocket重连管理', '数据签名验证', '消息压缩', '异常值过滤', '统计异常检测']
  },
  {
    id: 10,
    title: '天气数据历史存档',
    industry: '气象',
    techStack: ['Python', 'WeatherAPI', 'InfluxDB', 'Telegraf'],
    difficulty: '初级',
    description: '定时采集多城市天气数据，构建历史天气数据库，支持温度趋势分析、极端天气预警和历史对比查询。',
    codeSnippet: `import requests
import time
import schedule
from datetime import datetime, timedelta
from influxdb import InfluxDBClient
import logging

# 配置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# [课程作业要求] 反爬策略：API Key管理与请求频率控制
class WeatherAPIConfig:
    """天气API配置"""
    
    API_KEYS = [
        'YOUR_API_KEY_1',
        'YOUR_API_KEY_2',
        'YOUR_API_KEY_3',
    ]
    current_key_index = 0
    
    @classmethod
    def get_api_key(cls):
        """轮换获取API Key"""
        key = cls.API_KEYS[cls.current_key_index]
        cls.current_key_index = (cls.current_key_index + 1) % len(cls.API_KEYS)
        return key
    
    @classmethod
    def get_next_key(cls):
        """获取下一个可用的API Key（用于配额用尽时切换）"""
        cls.current_key_index = (cls.current_key_index + 1) % len(cls.API_KEYS)
        return cls.API_KEYS[cls.current_key_index]

# [课程作业要求] 反爬策略：多数据源备份
class WeatherDataSource:
    """多数据源天气信息采集"""
    
    def __init__(self):
        self.sources = {
            'weatherapi': WeatherAPISource(),
            'openweathermap': OpenWeatherMapSource(),
            'qweather': QWeatherSource(),
        }
        self.active_source = 'weatherapi'
    
    def fetch_weather(self, city, date=None):
        """从当前数据源获取天气数据"""
        source = self.sources[self.active_source]
        
        for attempt in range(3):
            try:
                data = source.fetch(city, date)
                if data:
                    return data
            except Exception as e:
                logger.warning(f"[数据源异常] {self.active_source}: {e}")
            
            # [课程作业要求] 反爬策略：切换数据源
            self.switch_source()
        
        return None
    
    def switch_source(self):
        """切换到下一个数据源"""
        sources = list(self.sources.keys())
        current_idx = sources.index(self.active_source)
        next_idx = (current_idx + 1) % len(sources)
        self.active_source = sources[next_idx]
        logger.info(f"[切换数据源] -> {self.active_source}")

class WeatherAPISource:
    """WeatherAPI.com 数据源"""
    
    BASE_URL = 'https://api.weatherapi.com/v1'
    
    def fetch(self, city, date=None):
        """获取天气数据"""
        # [课程作业要求] 反爬策略：API Key轮换
        api_key = WeatherAPIConfig.get_api_key()
        
        if date is None or date == datetime.now().strftime('%Y-%m-%d'):
            # 当天天气
            url = f"{self.BASE_URL}/current.json"
            params = {
                'key': api_key,
                'q': city,
                'aqi': 'no'
            }
        else:
            # 历史天气（需要付费API）
            url = f"{self.BASE_URL}/history.json"
            params = {
                'key': api_key,
                'q': city,
                'dt': date
            }
        
        # [课程作业要求] 反爬策略：请求重试与退避
        for retry in range(3):
            try:
                response = requests.get(url, params=params, timeout=10)
                
                if response.status_code == 200:
                    return self.parse_response(response.json())
                elif response.status_code == 401:
                    # API Key无效，切换
                    logger.warning("[API Key无效] 切换到下一个Key")
                    WeatherAPIConfig.get_next_key()
                elif response.status_code == 403:
                    # 配额用尽
                    logger.warning("[API配额用尽] 等待后重试")
                    time.sleep(60)  # 等待1分钟
                else:
                    logger.warning(f"[请求失败] {response.status_code}")
                    
            except requests.exceptions.Timeout:
                logger.warning(f"[请求超时] 第{retry+1}次重试")
                time.sleep(2 ** retry)  # 指数退避
            except requests.exceptions.RequestException as e:
                logger.error(f"[请求异常] {e}")
                break
        
        return None
    
    def parse_response(self, data):
        """解析API响应"""
        location = data.get('location', {})
        current = data.get('current', {})
        
        return {
            'city': location.get('name'),
            'country': location.get('country'),
            'localtime': location.get('localtime'),
            'temp_c': current.get('temp_c'),
            'temp_f': current.get('temp_f'),
            'condition': current.get('condition', {}).get('text'),
            'wind_kph': current.get('wind_kph'),
            'wind_dir': current.get('wind_dir'),
            'humidity': current.get('humidity'),
            'cloud': current.get('cloud'),
            'feelslike_c': current.get('feelslike_c'),
            'uv': current.get('uv'),
            'pressure_mb': current.get('pressure_mb'),
            'precip_mm': current.get('precip_mm'),
            'visibility_km': current.get('vis_km'),
        }

class OpenWeatherMapSource:
    """OpenWeatherMap 数据源"""
    
    BASE_URL = 'https://api.openweathermap.org/data/2.5'
    
    def fetch(self, city, date=None):
        """获取天气数据"""
        api_key = WeatherAPIConfig.get_api_key()
        
        if date is None:
            url = f"{self.BASE_URL}/weather"
        else:
            url = f"{self.BASE_URL}/onecall/timemachine"
        
        params = {
            'q': city,
            'appid': api_key,
            'units': 'metric',
            'lang': 'zh_cn'
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                return self.parse_response(response.json(), date)
            else:
                logger.warning(f"[OWM请求失败] {response.status_code}")
        
        except Exception as e:
            logger.error(f"[OWM异常] {e}")
        
        return None
    
    def parse_response(self, data, date):
        """解析OpenWeatherMap响应"""
        return {
            'city': data.get('name'),
            'temp_c': data.get('main', {}).get('temp'),
            'condition': data.get('weather', [{}])[0].get('description'),
            'wind_kph': data.get('wind', {}).get('speed') * 3.6,  # m/s 转 km/h
            'humidity': data.get('main', {}).get('humidity'),
            'pressure_mb': data.get('main', {}).get('pressure'),
        }

class QWeatherSource:
    """和风天气数据源"""
    
    BASE_URL = 'https://devapi.qweather.com/v7'
    
    def fetch(self, city, date=None):
        """获取天气数据"""
        api_key = WeatherAPIConfig.get_api_key()
        
        url = f"{self.BASE_URL}/weather/now"
        params = {
            'key': api_key,
            'location': city,
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                result = response.json()
                if result.get('code') == '200':
                    return self.parse_response(result)
        
        except Exception as e:
            logger.error(f"[QWeather异常] {e}")
        
        return None
    
    def parse_response(self, data):
        """解析和风天气响应"""
        now = data.get('now', {})
        return {
            'city': data.get('location', {}).get('name'),
            'temp_c': now.get('temp'),
            'condition': now.get('text'),
            'wind_kph': float(now.get('windSpeed', 0)) * 3.6 if now.get('windSpeed') else 0,
            'wind_dir': now.get('windDir'),
            'humidity': now.get('humidity'),
            'pressure_mb': now.get('pressure'),
            'feelslike_c': now.get('feelsLike'),
            'vis_km': now.get('vis'),
        }

class WeatherDataStorage:
    """天气数据存储"""
    
    def __init__(self, 
                 influxdb_host='localhost',
                 influxdb_port=8086,
                 influxdb_user='admin',
                 influxdb_password='password',
                 influxdb_db='weather'):
        
        # 连接InfluxDB
        self.client = InfluxDBClient(
            host=influxdb_host,
            port=influxdb_port,
            username=influxdb_user,
            password=influxdb_password,
            database=influxdb_db
        )
        
        # 确保数据库存在
        self.client.create_database(influxdb_db)
    
    def save_weather_data(self, data):
        """保存天气数据到InfluxDB"""
        if not data:
            return False
        
        # 构造InfluxDB Line Protocol格式的数据
        measurement = 'weather'
        tags = {
            'city': data.get('city', 'unknown'),
            'country': data.get('country', ''),
            'condition': data.get('condition', ''),
        }
        
        fields = {
            'temp_c': float(data.get('temp_c', 0)),
            'temp_f': float(data.get('temp_f', 0)),
            'wind_kph': float(data.get('wind_kph', 0)),
            'humidity': int(data.get('humidity', 0)),
            'pressure_mb': float(data.get('pressure_mb', 0)),
            'feelslike_c': float(data.get('feelslike_c', 0)),
            'uv': float(data.get('uv', 0)),
            'cloud': int(data.get('cloud', 0)),
            'precip_mm': float(data.get('precip_mm', 0)),
            'visibility_km': float(data.get('visibility_km', 0)),
        }
        
        timestamp = datetime.fromisoformat(data.get('localtime', datetime.now().isoformat()))
        
        try:
            self.client.write_points([
                {
                    'measurement': measurement,
                    'tags': tags,
                    'fields': fields,
                    'time': timestamp
                }
            ])
            logger.info(f"[保存成功] {data.get('city')} - {data.get('temp_c')}°C")
            return True
        except Exception as e:
            logger.error(f"[保存失败] {e}")
            return False
    
    def query_historical_data(self, city, start_date, end_date):
        """查询历史数据"""
        query = f'''
            SELECT * FROM weather
            WHERE city = '{city}'
            AND time >= '{start_date}'
            AND time <= '{end_date}'
        '''
        
        result = self.client.query(query)
        return list(result.get_points(measurement='weather'))

class WeatherCollector:
    """天气数据采集器"""
    
    def __init__(self):
        self.data_source = WeatherDataSource()
        self.storage = WeatherDataStorage()
        self.cities = [
            '北京', '上海', '广州', '深圳',
            '杭州', '南京', '武汉', '成都',
            '西安', '重庆', '天津', '苏州'
        ]
    
    def collect_all_cities(self):
        """采集所有城市天气数据"""
        logger.info(f"[开始采集] {len(self.cities)} 个城市")
        
        for city in self.cities:
            try:
                # [课程作业要求] 反爬策略：请求间隔
                time.sleep(1.5)
                
                data = self.data_source.fetch_weather(city)
                
                if data:
                    self.storage.save_weather_data(data)
                else:
                    logger.warning(f"[无数据] {city}")
            
            except Exception as e:
                logger.error(f"[采集异常] {city}: {e}")
    
    def collect_historical_data(self, city, days=30):
        """采集历史天气数据"""
        logger.info(f"[采集历史] {city} 最近{days}天")
        
        for i in range(1, days + 1):
            date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
            
            try:
                time.sleep(2)  # [课程作业要求] 避免频率限制
                
                data = self.data_source.fetch_weather(city, date)
                
                if data:
                    self.storage.save_weather_data(data)
                    logger.info(f"[历史数据] {city} - {date}")
            
            except Exception as e:
                logger.error(f"[历史数据异常] {city} {date}: {e}")

def main():
    collector = WeatherCollector()
    
    # 定时任务：每小时采集一次
    schedule.every().hour.do(collector.collect_all_cities)
    
    # 立即执行一次
    collector.collect_all_cities()
    
    # 运行定时任务
    logger.info("[服务启动] 开始定时采集")
    while True:
        schedule.run_pending()
        time.sleep(60)

if __name__ == '__main__':
    main()`,
    codeLanguage: 'python',
    antiCrawlerStrategy: ['API Key轮换', '多数据源备份', '请求重试退避', '请求间隔控制', '数据源自动切换']
  }
]

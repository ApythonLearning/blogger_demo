'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { Github, MessageCircle, BookOpen, Mail, Moon, Sun, Languages, Copy, Search, ChevronDown, X, ChevronLeft } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface BlogPost {
  id: number
  title: { en: string; zh: string }
  tags: string[]
  date: string
  description?: string
  introduction: { en: string; zh: string }
  methodology: { en: string; zh: string }
  equations: string[]
  variables: { symbol: string; description: { en: string; zh: string } }[]
  note: { en: string; zh: string }
}

interface Project {
  id: number
  title: { en: string; zh: string }
  description: { en: string; zh: string }
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: { en: "Calculation of Mixed Gas Absorption Coefficient", zh: "混合气体吸收系数计算" },
    tags: ["Physics", "Calculation"],
    date: "Jul 01, 2024",
    introduction: {
      en: "Used to calculate the absorption coefficient and transmittance of mixed gases under different working conditions",
      zh: "用于计算不同工况下，混合气体的吸收系数和透过率"
    },
    methodology: {
      en: "The methodology involves calculating the total absorption coefficient and transmittance using the following equations:",
      zh: "方法涉及使用以下方程计算总吸收系数和透过率："
    },
    equations: [
      "\\alpha_{all} = \\sum_{i}^N \\alpha_i \\cdot \\rho_i",
      "\\rho \\text{—— Gas density (molecular/cm}^3\\text{)}",
      "\\tau = e^{-\\alpha*l}",
      "\\alpha \\text{—— Gas absorption coefficient, cm}^{-1}",
      "l \\text{—— Optical path, cm}"
    ],
    variables: [
      { symbol: "\\alpha_{all}", description: { en: "Total absorption coefficient", zh: "总吸收系数" } },
      { symbol: "\\alpha_i", description: { en: "Absorption coefficient of gas i", zh: "气体i的吸收系数" } },
      { symbol: "\\rho_i", description: { en: "Density of gas i", zh: "气体i的密度" } },
      { symbol: "\\tau", description: { en: "Transmittance", zh: "透过率" } },
      { symbol: "l", description: { en: "Optical path length", zh: "光程" } }
    ],
    note: {
      en: "Note: HAPI defaults to outputting the absorption coefficient in units of cm^2/molecule. This unit is very small and needs to be appropriately converted.",
      zh: "注：HAPI默认输出的吸收系数单位是cm^2/molecule。这个单位非常小，需要进行适当的转换。"
    }
  },
  // Add other blog posts here...
]

const projects: Project[] = [
  {
    id: 1,
    title: { en: 'Infrared simulation and measurement', zh: '红外仿真与测量' },
    description: {
      en: 'Efficient Infrared Radiation Rapid Calculation Model: This project involves the development of a sophisticated model for calculating infrared radiation. It includes temperature field calculations and radiation calculations, utilizing advanced techniques such as 3D modeling, six-degree-of-freedom trajectory modeling, spatial external heat flow calculations, and transient temperature field calculations. The radiation calculation part involves surface temperature distribution, perspective imaging models, and radiation imaging, incorporating complex concepts like BRDF (Bidirectional Reflectance Distribution Function).',
      zh: '有效红外辐射快速计算模型：该项目涉及开发一个复杂的红外辐射计算模型。它包括温度场计算和辐射计算，利用了先进的技术，如3D建模、六自由度轨迹建模、空间外热流计算和瞬态温度场计算。辐射计算部分涉及表面温度分布、透视成像模型和辐射成像，并包含了BRDF（双向反射分布函数）等复杂概念。'
    },
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    id: 2,
    title: { en: 'Computer vision', zh: '计算机视觉' },
    description: {
      en: 'Introduction to this website and how to deploy it',
      zh: '关于此网站的介绍，以及如何部署'
    },
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    id: 3,
    title: { en: 'Radiation transfer', zh: '辐射传输' },
    description: {
      en: '7 creational patterns out of 24 design patterns (Part 1)',
      zh: '24个设计模式的7个创建型（一）'
    },
    image: '/placeholder.svg?height=400&width=600'
  },
]

const allTags = ["ALL", "codesnap", "Docker", "Java", "npm", "bos", "[]", "aop", "Linux", "tech", "Physics", "Calculation"]

export default function Component() {
  const [darkMode, setDarkMode] = useState(false)
  const [isEnglish, setIsEnglish] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')
  const [hoveredContact, setHoveredContact] = useState(null)
  const timeoutRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("ALL")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null)

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleLanguage = () => setIsEnglish(!isEnglish)

  const translate = (en: string, zh: string) => isEnglish ? en : zh

  const handleContactHover = (contact) => {
    clearTimeout(timeoutRef.current);
    setHoveredContact(contact);
    timeoutRef.current = setTimeout(() => {
      setHoveredContact(null);
    }, 5000);
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const contactInfo = [
    { name: 'Email', url: 'mailto:1062998292@qq.com', display: '1062998292@qq.com' },
    { name: 'GitHub', url: 'https://github.com', display: 'github.com' },
    { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/Qianwen-Wang-15', display: 'ResearchGate.com' },
    { name: 'Bilibili', url: 'https://space.bilibili.com/129430466?spm_id_from=333.975.0.0', display: 'bilibili.com' },
  ]

  const filteredPosts = blogPosts.filter(post =>
    (selectedTag === "ALL" || post.tags.includes(selectedTag)) &&
    (translate(post.title.en, post.title.zh).toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  ).sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <header className={`sticky top-0 z-10 flex items-center justify-between p-4 ${darkMode ? 'border-gray-700 bg-gray-900/80' : 'border-gray-200 bg-white/80'} border-b transition-colors duration-300 backdrop-blur-sm`}>
        <Image src="/placeholder.svg" alt="Logo" width={40} height={40} className="rounded-lg" />
        <nav className="hidden md:flex space-x-4">
          {[
            { en: 'Home', zh: '首页', page: 'home' },
            { en: 'Blog', zh: '博客', page: 'blog' }
          ].map((item) => (
            <button
              key={item.page}
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} ${currentPage === item.page ? 'font-bold' : ''}`}
              onClick={() => {
                setCurrentPage(item.page)
                setSelectedBlogPost(null)
              }}
            >
              {translate(item.en, item.zh)}
            </button>
          ))}
        </nav>
        <div className="flex items-center">
          <button onClick={toggleLanguage} className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <Languages className="w-5 h-5" />
            <span className="sr-only">{translate('Change Language', '切换语言')}</span>
          </button>
          <button onClick={toggleDarkMode} className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="sr-only">{translate('Toggle Dark Mode', '切换暗黑模式')}</span>
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && !selectedBlogPost && (
          <>
            <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 mb-8`}>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 md:mr-8">
                  <h1 className="text-4xl font-bold mb-2">{translate('Hello! Welcome to my home page!', '你好！欢迎来到我的个人主页！')}</h1>
                  <h2 className="text-3xl font-bold mb-4">
                    {translate("I'm ", '我是 ')}<span className="text-violet-600">WQW</span>
                  </h2>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {translate(
                      'A Ph.D. Student at Southeast University, Nanjing, China.',
                      '东南大学在读博士。'
                    )}
                  </p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {translate('Specialties: infrared simulation, infrared and visible light visual detection, computer vision, artificial intelligence.', '擅长领域：红外仿真、红外和可见光视觉检测、计算机视觉、人工智能。')}
                  </p>
                  <div className="flex space-x-4">
                    <a href="https://github.com/WQW-G/WQW-G.github.io" target="_blank" rel="noopener noreferrer">
                      <Github className={`w-6 h-6 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} />
                    </a>
                    <a href="https://space.bilibili.com/129430466?spm_id_from=333.975.0.0" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className={`w-6 h-6 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} />
                    </a>
                    <button onClick={() => setCurrentPage('blog')}>
                      <BookOpen className={`w-6 h-6 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} />
                    </button>
                  </div>
                </div>
                <Image
                  src="/placeholder.svg"
                  alt={translate('Profile', '个人头像')}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
            </section>
            <section className="grid grid-cols-1 gap-8">
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-4 text-violet-600">
                  {translate('About Me', '关于我')}
                </h2>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                  <h3 className="text-xl font-bold mb-2">{translate('Who am I', '我是谁')}</h3>
                  <p className="mb-4">
                    {translate("Hello! I'm WQW. Feel free to reach out and connect!", "你好！我是WQW。欢迎随时联系我！")}
                  </p>
                  <h3 className="text-xl font-bold mb-2">{translate('What I do', '我做什么')}</h3>
                  <p className="mb-4">
                    {translate("I'm currently a PhD student.", "我目前是一名博士研究生。")}
                  </p>
                  <h3 className="text-xl font-bold mb-2">{translate('Skill Set', '技能集')}</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>{translate('Language: C++, C,   Python, Matlab', '语言：C++、C、Python、Matlab')}</li>
                    <li>{translate('DL Framework: Pytorch, tensorflow', '框架：Pytorch、Tensorflow')}</li>
                    <li>{translate('Lib: OpenCV, OpenGL, CUDA', '库  ：OpenCV、OpenGL、CUDA')}</li>
                    <li>{translate('Software: Fluent, Modtran, Solidworks, Keil', '软件：Fluent、Modtran、Solidworks、Keil')}</li>
                    <li>{translate('Ops: Ubuntu', '系统：Ubuntu')}</li>
                  </ul>
                  <h3 className="text-xl font-bold mb-2">{translate('Contact', '联系方式')}</h3>
                  <ul className="space-y-2">
                    {contactInfo.map((contact) => (
                      <li
                        key={contact.name}
                        className="relative"
                        onMouseEnter={() => handleContactHover(contact)}
                      >
                        <a
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-600 hover:text-violet-800 transition-colors duration-300"
                        >
                          {contact.display}
                        </a>
                        {hoveredContact === contact && (
                          <div className="absolute left-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded shadow-lg z-10 flex items-center space-x-2">
                            <a
                              href={contact.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                            >
                              {contact.url}
                            </a>
                            <button
                              onClick={() => copyToClipboard(contact.url)}
                              className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-4 text-violet-600">
                  {translate('Project Experience', '项目经历')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} rounded-lg shadow-lg overflow-hidden transition-colors duration-300 cursor-pointer`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <Image
                        src={project.image}
                        alt={translate(project.title.en, project.title.zh)}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold mb-2">{translate(project.title.en, project.title.zh)}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {translate(project.description.en, project.description.zh).slice(0, 100)}...
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
        {currentPage === 'blog' && !selectedBlogPost && (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">{translate('Blog', '博客')}</h1>
            <p className="text-xl mb-8">{translate('Problems encountered in the project and corresponding solutions.', '项目中遇到的问题和相应的解决方案。')}</p>

            <div className="flex justify-between items-center mb-6">
              <div className="relative flex-grow mr-4">
                <input
                  type="text"
                  placeholder="Full Text Search..."
                  className="w-full p-2 pl-10 border rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border rounded-md p-2 pr-8"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                >
                  <option value="desc">Sort by date ▼</option>
                  <option value="asc">Sort by date ▲</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm ${selectedTag === tag
                    ? "bg-violet-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedBlogPost(post)}>
                  <h2 className="text-xl font-semibold mb-2">{translate(post.title.en, post.title.zh)}</h2>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{post.date}</p>
                  {post.description && <p className="mt-2 text-gray-700">{post.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedBlogPost && (
          <div className="container mx-auto px-4 py-8">
            <button onClick={() => setSelectedBlogPost(null)} className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ChevronLeft className="w-5 h-5 mr-1" />
              {translate("Back", "返回")}
            </button>
            <article className="prose lg:prose-xl dark:prose-invert mx-auto">
              <h1 className="text-4xl font-bold mb-4">{translate(selectedBlogPost.title.en, selectedBlogPost.title.zh)}</h1>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. {translate("Introduction", "引言")}</h2>
              <p>{translate(selectedBlogPost.introduction.en, selectedBlogPost.introduction.zh)}</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. {translate("Methodology", "方法")}</h2>
              <p>{translate(selectedBlogPost.methodology.en, selectedBlogPost.methodology.zh)}</p>

              {selectedBlogPost.equations.map((eq, index) => (
                <BlockMath key={index} math={eq} />
              ))}

              <h3 className="text-xl font-semibold mt-6 mb-2">{translate("Variables", "变量")}</h3>
              <ul>
                {selectedBlogPost.variables.map((variable, index) => (
                  <li key={index} className="mb-2">
                    <InlineMath math={variable.symbol} />: {translate(variable.description.en, variable.description.zh)}
                  </li>
                ))}
              </ul>

              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mt-8">
                <p className="text-sm">{translate(selectedBlogPost.note.en, selectedBlogPost.note.zh)}</p>
              </div>
            </article>
          </div>
        )}
      </main>
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="relative">
              <Image
                src={selectedProject.image}
                alt={translate(selectedProject.title.en, selectedProject.title.zh)}
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-800 hover:bg-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">{translate(selectedProject.title.en, selectedProject.title.zh)}</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {translate(selectedProject.description.en, selectedProject.description.zh)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
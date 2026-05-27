'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { Github, MessageCircle, BookOpen, Moon, Sun, Languages, Copy, Search, ChevronDown, X, ChevronLeft, Check, ChevronRight } from 'lucide-react'
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
  images: string[]
}

interface ContactInfo {
  name: string
  url: string
  display: string
}

interface FocusItem {
  id: string
  title: { en: string; zh: string }
  detail: { en: string; zh: string }
  metric: string
  accent: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: { en: "Calculation of Mixed Gas Absorption Coefficient", zh: "混合气体吸收系数计算" },
    tags: ["infrare", "gas-absorption"],
    date: "Oct 21, 2024",
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
  {
    id: 2,
    title: { en: "Modis & Modtran", zh: "Modis & Modtran" },
    tags: ["infrare", "gas-absorption"],
    date: "Oct 22, 2024",
    introduction: {
      en: "Construction of the Earth's surface and atmosphere using Modis data",
      zh: "使用Modis数据构建地球表面和大气环境。"
    },
    methodology: {
      en: "Modis and Motran, details please refer to https://www.yuque.com/timelink/bhel1r/ll22vu94tomg9fck?singleDoc# 《Modis&Modtran》",
      zh: "Modis 和 Motran, 请参考 https://www.yuque.com/timelink/bhel1r/ll22vu94tomg9fck?singleDoc# 《Modis&Modtran》"
    },
    equations: [
    ],
    variables: [
    ],
    note: {
      en: "Note: Please see https://www.yuque.com/timelink/bhel1r/ll22vu94tomg9fck?singleDoc# 《Modis&Modtran》.",
      zh: "注：请见 https://www.yuque.com/timelink/bhel1r/ll22vu94tomg9fck?singleDoc# 《Modis&Modtran》。"
    }
  },
  {
    id: 3,
    title: {
      en: "Bubble Recognition and Tracking with Image Processing and CNN",
      zh: "基于图像处理与CNN的气泡识别跟踪"
    },
    tags: ["computer-vision", "image-processing", "CNN", "multiphase-flow"],
    date: "May 26, 2026",
    description: "YOLO v3-tiny, ITFD and IOU matching for bubble detection and tracking in a plate heat exchanger.",
    introduction: {
      en: "This note summarizes a computer-vision pipeline for recognizing and tracking bubbles in a dimple-type plate heat exchanger. The problem is challenging because dense bubbly flow contains small targets, occlusion, bubble rupture, merging and collision. A pure image-processing method is fast but fragile in dense scenes, while a detector-only CNN may miss small bubbles. The combined method uses each technique where it is strongest.",
      zh: "本文总结一种用于波纹板式换热器气泡识别与跟踪的计算机视觉流程。该问题的难点在于密集两相流中存在小目标、遮挡、气泡破裂、融合和碰撞等动态行为。单纯图像处理速度快但在密集场景下鲁棒性不足，单纯CNN检测器又容易漏检小气泡，因此采用传统视觉与深度学习互补的方案。"
    },
    methodology: {
      en: "The workflow starts from high-speed video frames. YOLO v3-tiny detects normal and abnormal bubbles and outputs bounding boxes. An improved three-frame difference method detects moving small bubbles by combining frame differencing, image enhancement, Otsu thresholding, Canny edges, median filtering and Gaussian-mixture background subtraction. IOU screening removes duplicate ITFD boxes already covered by CNN results and keeps low-overlap boxes as small-bubble supplements. Tracking is then performed by maximum-IOU matching between adjacent frames; rupture and collision events can be inferred from one-to-many and many-to-one matching relationships. Finally, pixel coordinates are converted to physical positions to calculate velocity and dimensionless parameters such as Reynolds, Weber and Froude numbers.",
      zh: "流程从高速视频帧开始。YOLO v3-tiny用于检测正常气泡和异常气泡，并输出边界框。改进三帧差分法（ITFD）结合帧差、图像增强、Otsu阈值分割、Canny边缘、median滤波和高斯混合背景建模，用于补充运动小气泡检测。随后通过IOU筛选删除已被CNN覆盖的ITFD重复框，保留低重叠框作为小目标补充。跟踪阶段在相邻帧之间采用最大IOU匹配；一对多和多对一匹配关系可用于判断破裂和碰撞事件。最后将像素坐标转换为物理坐标，计算气泡速度以及Reynolds数、Weber数和Froude数等无量纲参数。"
    },
    equations: [
      "IoU = \\frac{Area_{intersection}}{Area_{union}}",
      "P = \\frac{TP}{TP + FP}",
      "R = \\frac{TP}{TP + FN}",
      "F_1 = \\frac{2PR}{P + R}",
      "v = \\frac{\\Delta s}{\\Delta t}"
    ],
    variables: [
      { symbol: "IoU", description: { en: "Intersection-over-union score between two bounding boxes", zh: "两个边界框的交并比" } },
      { symbol: "P", description: { en: "Precision of bubble detection", zh: "气泡检测精确率" } },
      { symbol: "R", description: { en: "Recall of bubble detection", zh: "气泡检测召回率" } },
      { symbol: "F_1", description: { en: "Harmonic mean of precision and recall", zh: "精确率与召回率的调和平均" } },
      { symbol: "v", description: { en: "Bubble velocity computed from physical displacement and frame interval", zh: "由物理位移和帧间隔计算得到的气泡速度" } }
    ],
    note: {
      en: "Reference: Wang, Q., Li, X., Xu, C., Yan, T., & Li, Y. (2021). Bubble recognizing and tracking in a plate heat exchanger by using image processing and convolutional neural network. International Journal of Multiphase Flow, 138, 103593. https://doi.org/10.1016/j.ijmultiphaseflow.2021.103593.",
      zh: "参考文献：Wang, Q., Li, X., Xu, C., Yan, T., & Li, Y. (2021). Bubble recognizing and tracking in a plate heat exchanger by using image processing and convolutional neural network. International Journal of Multiphase Flow, 138, 103593. https://doi.org/10.1016/j.ijmultiphaseflow.2021.103593。"
    }
  },
  // Add other blog posts here...
]

const projects: Project[] = [
  {
    id: 1,
    title: { en: 'Infrared simulation and measurement', zh: '红外仿真与测量' },
    description: {
      en: 'Rapid computational modeling of effective infrared radiation: development of a rapid computational modeling of infrared radiation from space targets. The technical tools include: six-degree-of-freedom trajectory modeling, out-of-space heat flow calculation and transient temperature field calculation. The radiation calculation part involves perspective imaging modeling and radiation imaging, and includes BRDF (Bidirectional Reflection Distribution Function.DOI:10.1016/j.applthermaleng.2025.127595',
      zh: '有效红外辐射快速计算模型：开发空间目标红外辐射快速计算模型。技术手段包括：六自由度轨迹建模、空间外热流计算和瞬态温度场计算。辐射计算部分涉透视成像模型和辐射成像，并包含了BRDF（双向反射分布函数）。DOI:10.1016/j.applthermaleng.2025.127595'
    },
    images: ['/project-infrared-simulation.png']
  },
  {
    id: 2,
    title: { en: 'Computer vision', zh: '计算机视觉' },
    description: {
      en: 'Bubble recognition and tracking in plate heat exchangers: built a computer-vision pipeline for dense air-water bubbly flow using YOLO v3-tiny, improved three-frame difference (ITFD), IOU screening and adjacent-frame IOU matching. The method detects normal and abnormal bubbles, complements CNN misses on small moving bubbles, tracks rupture, merging and collision events, and converts image coordinates into velocity and dimensionless flow parameters such as Reynolds, Weber and Froude numbers.10.1016/j.ijmultiphaseflow.2021.103593',
      zh: '板式换热器气泡识别与跟踪：面向空气-水密集气泡流，构建了结合YOLO v3-tiny、改进三帧差分法（ITFD）、IOU筛选和相邻帧IOU匹配的计算机视觉流程。该方法可识别正常与异常气泡，补充CNN对运动小气泡的漏检，跟踪破裂、融合和碰撞等行为，并将图像坐标转换为速度、Reynolds数、Weber数和Froude数等流动参数。10.1016/j.ijmultiphaseflow.2021.103593'
    },
    images: ['/project-computer-vision.png']
  },
  {
    id: 3,
    title: { en: 'Radiative transfer', zh: '辐射传输' },
    description: {
      en: 'Atmospheric radiation transfer modeling: developed an atmospheric radiation transfer model based on the discrete ordinate method (DOM) that can simulate the infrared radiation transfer process under different atmospheric conditions. The model considers physical processes such as absorption, scattering and emission, and its accuracy and efficiency are validated by comparison with mature tools such as MODTRAN.https://www.sciencedirect.com/science/article/pii/S0022407325003553',
      zh: '大气辐射传输建模：基于离散纵标法（DOM）开发了大气辐射传输模型，能够模拟不同大气条件下的红外辐射传输过程。该模型考虑了吸收、散射和发射等物理过程，并通过与MODTRAN等成熟工具的对比验证了其准确性和效率。https://www.sciencedirect.com/science/article/pii/S0022407325003553'
    },
    images: ['/project-radiation-transfer.png']
  },
]

const allTags = ["ALL", "AI", "Docker", "C++", "npm", "Python", "[]", "Linux", "tech", "infrare", "gas-absorption", "computer-vision", "image-processing", "CNN", "multiphase-flow"]

const focusItems: FocusItem[] = [
  {
    id: "ir",
    title: { en: "Infrared Simulation", zh: "红外仿真" },
    detail: {
      en: "Fast target radiation modeling with trajectory, heat flux, temperature field and BRDF-aware imaging.",
      zh: "结合轨迹、外热流、瞬态温度场和BRDF成像的目标红外辐射快速建模。"
    },
    metric: "BRDF + thermal field",
    accent: "from-orange-400 to-red-500"
  },
  {
    id: "vision",
    title: { en: "Computer Vision", zh: "计算机视觉" },
    detail: {
      en: "Object detection and tracking pipelines for dense bubbles, small targets and dynamic flow events.",
      zh: "面向密集气泡、小目标和动态流动事件的检测与跟踪流程。"
    },
    metric: "YOLO + IOU tracking",
    accent: "from-cyan-400 to-blue-500"
  },
  {
    id: "transfer",
    title: { en: "Radiative Transfer", zh: "辐射传输" },
    detail: {
      en: "Atmospheric radiation transfer modeling with absorption, scattering, emission and MODTRAN validation.",
      zh: "考虑吸收、散射、发射并与MODTRAN验证的大气辐射传输建模。"
    },
    metric: "DOM + atmosphere",
    accent: "from-violet-400 to-fuchsia-500"
  }
]

export default function Component() {
  const [darkMode, setDarkMode] = useState(false)
  const [isEnglish, setIsEnglish] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')
  const [hoveredContact, setHoveredContact] = useState(null)
  const [copiedContact, setCopiedContact] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("ALL")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeFocusId, setActiveFocusId] = useState(focusItems[0].id)

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleLanguage = () => setIsEnglish(!isEnglish)

  const translate = (en: string, zh: string) => isEnglish ? en : zh
  const activeFocus = focusItems.find((item) => item.id === activeFocusId) ?? focusItems[0]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedContact(text)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopiedContact(null), 2000)
  }

  const contactInfo: ContactInfo[] = [
    { name: 'Email', url: 'mailto:1062998292@qq.com', display: '1062998292@qq.com' },
    { name: 'GitHub', url: 'https://github.com', display: 'github.com' },
    { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/Qianwen-Wang-15', display: 'ResearchGate.com' },
    { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=EH-ZM2YAAAAJ&hl=zh-CN', display: 'Google Scholar' },
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

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      )
    }
  }

  return (
    <div className={`relative min-h-screen overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className={`aurora-orb absolute -top-24 right-[-8rem] h-72 w-72 rounded-full blur-3xl ${darkMode ? 'bg-violet-700/20' : 'bg-violet-300/30'}`} />
        <div className={`aurora-orb absolute left-[-10rem] top-1/3 h-80 w-80 rounded-full blur-3xl [animation-delay:-4s] ${darkMode ? 'bg-cyan-700/10' : 'bg-cyan-200/35'}`} />
      </div>
      <header className={`sticky top-0 z-10 flex items-center justify-between p-4 ${darkMode ? 'border-gray-700 bg-gray-900/80' : 'border-gray-200 bg-white/80'} border-b transition-colors duration-300 backdrop-blur-sm`}>
        <Image src="/seu.svg" alt="Logo" width={40} height={40} className="float-soft rounded-lg" />
        <nav className="hidden md:flex space-x-4">
          {[
            { en: 'Home', zh: '首页', page: 'home' },
            { en: 'Blog', zh: '博客', page: 'blog' }
          ].map((item) => (
            <button
              key={item.page}
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} ${currentPage === item.page ? 'font-bold' : ''} rounded-full px-2 py-1 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-500/10`}
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
            <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} interactive-card fade-up rounded-lg shadow-lg p-8 mb-8`}>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 md:mr-8">
                  <h1 className="text-4xl font-bold mb-2">{translate('Hello! Welcome to my home page!', '你好！欢迎来到我的个人主页！')}</h1>
                  <h2 className="text-3xl font-bold mb-4">
                    {translate("I'm ", '我是 ')}<span className="text-violet-600">QIANWEN WANG</span>
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
                    <a href="https://github.com/ApythonLearning" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
                      <Github className={`w-6 h-6 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} />
                    </a>
                    <a href="https://space.bilibili.com/129430466?spm_id_from=333.975.0.0" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
                      <MessageCircle className={`w-6 h-6 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} />
                    </a>
                    <button onClick={() => setCurrentPage('blog')} className="transition-transform duration-200 hover:-translate-y-1">
                      <BookOpen className={`w-6 h-6 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} />
                    </button>
                  </div>
                </div>
                <Image
                  src="/MyPhoto.jpg"
                  alt={translate('Profile', '个人头像')}
                  width={280}
                  height={300}
                  className="float-soft rounded-full shadow-2xl ring-4 ring-violet-500/10"
                />
              </div>
            </section>
            <section className="grid grid-cols-1 gap-8">
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-4 text-violet-600">
                  {translate('About Me', '关于我')}
                </h2>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white min-h-[540px]'} interactive-card fade-up relative rounded-lg shadow-lg overflow-hidden`}>
                  {!darkMode && (
                    <>
                      <Image
                        src="/about-wallpaper.png"
                        alt={translate('Abstract light wallpaper', '浅色抽象壁纸')}
                        fill
                        sizes="(min-width: 1024px) 100vw, 100vw"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/55 lg:bg-gradient-to-r lg:from-white lg:via-white/80 lg:to-white/10" />
                    </>
                  )}
                  <div className={`${darkMode ? 'text-gray-100' : 'text-gray-900'} relative z-10 p-6 lg:max-w-2xl`}>
                    <h3 className="text-xl font-bold mb-2">{translate('Who am I', '我是谁')}</h3>
                    <p className="mb-4">
                      {translate("Hello! I'm QIANWEN WANG. Feel free to reach out and connect!", "你好！我是汪迁文。欢迎随时联系我！")}
                    </p>
                    <h3 className="text-xl font-bold mb-2">{translate('What I do', '我做什么')}</h3>
                    <p className="mb-4">
                      {translate("I'm currently a PhD  student.", "我目前是一名博士研究生。")}
                    </p>
                    <h3 className="text-xl font-bold mb-2">{translate('Skill Set', '技能集')}</h3>
                    <ul className="list-disc list-inside mb-4">
                      <li>{translate('Language: C++, C, Python, Matlab，etc.', '语言：C++、C、Python、Matlab、等')}</li>
                      <li>{translate('DL Framework: Pytorch, tensorflow，etc.', 'DL 框架：Pytorch、Tensorflow、等')}</li>
                      <li>{translate('Lib: OpenCV, OpenGL, CUDA', '库  ：OpenCV、OpenGL、CUDA')}</li>
                      <li>{translate('Software: Fluent, Modtran, Solidworks, Keil，etc.', '软件：Fluent、Modtran、Solidworks、Keil、等')}</li>
                      <li>{translate('System: Ubuntu, FreeRTOS (Embeded)', '系统：Ubuntu、FreeRTOS(嵌入式)')}</li>
                    </ul>
                    <h3 className="text-xl font-bold mb-2">{translate('Contact', '联系方式')}</h3>
                    <ul className="space-y-2">
                      {contactInfo.map((contact) => (
                        <li
                          key={contact.name}
                          className="group relative"
                          // onMouseEnter={() => handleContactHover(contact)}
                          onMouseLeave={() => setHoveredContact(null)}
                        >
                          <a
                            href={contact.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-600 hover:text-violet-800 transition-colors duration-300 group-hover:text-lg"
                          >
                            {contact.display}
                          </a>
                          <button
                            onClick={() => copyToClipboard(contact.url)}
                            className="ml-2 p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                            aria-label={`Copy ${contact.name} contact information`}
                          >
                            {copiedContact === contact.url ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          {hoveredContact === contact && (
                            <div className="absolute left-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded shadow-lg z-10 flex items-center space-x-2">
                              <a
                                // href={contact.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                              >
                                {/* {contact.url} */}
                              </a>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative z-10 mx-6 mb-6 lg:absolute lg:right-6 lg:top-6 lg:mx-0 lg:mb-0 lg:w-[23rem]">
                    <div className={`${darkMode ? 'border-gray-700 bg-gray-900/70 text-gray-100' : 'border-white/70 bg-white/55 text-gray-900'} rounded-lg border p-4 shadow-xl backdrop-blur-md`}>
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs uppercase tracking-[0.22em]`}>
                            {translate('Interactive Map', '交互地图')}
                          </p>
                          <h3 className="text-lg font-bold">{translate('Research Focus', '研究方向')}</h3>
                        </div>
                        <div className="relative h-10 w-10">
                          <span className={`pulse-ring absolute inset-0 rounded-full bg-gradient-to-br ${activeFocus.accent} opacity-40`} />
                          <span className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${activeFocus.accent}`} />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        {focusItems.map((item) => {
                          const isActive = item.id === activeFocus.id

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setActiveFocusId(item.id)}
                              onMouseEnter={() => setActiveFocusId(item.id)}
                              className={`${isActive
                                ? darkMode
                                  ? 'bg-white/12 text-white'
                                  : 'bg-white/80 text-gray-950'
                                : darkMode
                                  ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                                  : 'bg-white/35 text-gray-700 hover:bg-white/65'
                                } flex items-center justify-between rounded-md px-3 py-2 text-left transition-all duration-200 hover:-translate-y-0.5`}
                            >
                              <span className="font-medium">{translate(item.title.en, item.title.zh)}</span>
                              <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${item.accent}`} />
                            </button>
                          )
                        })}
                      </div>

                      <div className={`${darkMode ? 'border-gray-700 bg-gray-950/45' : 'border-white/70 bg-white/50'} mt-4 rounded-md border p-3`}>
                        <p className="text-sm font-semibold">{translate(activeFocus.title.en, activeFocus.title.zh)}</p>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2 text-sm leading-6`}>
                          {translate(activeFocus.detail.en, activeFocus.detail.zh)}
                        </p>
                        <div className={`${darkMode ? 'text-violet-200' : 'text-violet-700'} mt-3 inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold`}>
                          {activeFocus.metric}
                        </div>
                      </div>
                    </div>
                  </div>
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
                      className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} interactive-card rounded-lg shadow-lg overflow-hidden cursor-pointer`}
                      onClick={() => {
                        setSelectedProject(project)
                        setCurrentImageIndex(0)
                      }}
                    >
                      <Image
                        src={project.images[0]}
                        alt={translate(project.title.en, project.title.zh)}
                        width={400}
                        height={200}
                        className="image-zoom w-full h-48 object-cover"
                        unoptimized={true}
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
                <div key={post.id} className={`${darkMode ? 'border-gray-700 bg-gray-800/80 hover:bg-gray-700/80' : 'bg-white hover:bg-gray-50'} interactive-card rounded-lg border p-4 cursor-pointer`} onClick={() => setSelectedBlogPost(post)}>
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
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} scale-in rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="relative">
              <Image
                src={selectedProject.images[currentImageIndex]}
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
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full text-gray-800 hover:bg-gray-200"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full text-gray-800 hover:bg-gray-200"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {selectedProject.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                      }`}
                  />
                ))}
              </div>
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

import React from "react"
import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  ChevronDown,
  Home,
  ShoppingCart,
  Package,
  FileText,
  Database,
  Globe,
  Mail,
  Calendar,
  ImageIcon,
  Zap,
  Code,
  Layers,
  Monitor,
  PieChart,
  TrendingUp,
  Activity,
  Target,
  UserPlus,
  UserX,
  Lock,
  Key,
  Eye,
  Bell,
  MessageSquare,
  Camera,
  Headphones,
  Play,
  Bookmark,
  Tag,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Plus,
  Minus,
  Check,
  Star,
  Map,
  Truck,
  Clock,
  Timer,
  DollarSign,
  TrendingDown,
  Puzzle,
} from "lucide-react"
import Link from "../compat/link"
import { useState, useEffect } from "react"
import { cn } from "../../lib/utils"
import { navigateToPrototypeHref } from "../compat/navigation"

type MenuState = "full" | "collapsed" | "hidden"

interface SubMenuItem {
  id: string
  label: string
  href: string
  icon?: React.ComponentType<any>
  badge?: string
  isNew?: boolean
  children?: SubMenuItem[]
}

interface MenuItem {
  id: string
  label: string
  href?: string
  icon: React.ComponentType<any>
  badge?: string
  isNew?: boolean
  children?: SubMenuItem[]
}

interface MenuSection {
  id: string
  label: string
  items: MenuItem[]
}

const menuData: MenuSection[] = [
  {
    id: "overview",
    label: "概览",
    items: [
      {
        id: "dashboard",
        label: "仪表盘",
        href: "/dashboard",
        icon: Home,
        badge: "3",
        children: [
          {
            id: "analytics",
            label: "分析",
            href: "/dashboard/analytics",
            icon: BarChart2,
          },
          {
            id: "reports",
            label: "报表",
            href: "/dashboard/reports",
            icon: FileText,
            children: [
              {
                id: "sales-reports",
                label: "销售报表",
                href: "/dashboard/reports/sales",
                icon: TrendingUp,
              },
              {
                id: "user-reports",
                label: "用户报表",
                href: "/dashboard/reports/users",
                icon: Users2,
              },
              {
                id: "financial-reports",
                label: "财务报表",
                href: "/dashboard/reports/financial",
                icon: DollarSign,
              },
            ],
          },
          {
            id: "real-time",
            label: "实时数据",
            href: "/dashboard/realtime",
            icon: Activity,
            isNew: true,
          },
        ],
      },
      {
        id: "analytics",
        label: "分析",
        href: "/analytics",
        icon: BarChart2,
        children: [
          {
            id: "overview",
            label: "概览",
            href: "/analytics/overview",
            icon: PieChart,
          },
          {
            id: "performance",
            label: "表现",
            href: "/analytics/performance",
            icon: TrendingUp,
          },
          {
            id: "audience",
            label: "受众",
            href: "/analytics/audience",
            icon: Target,
          },
        ],
      },
      {
        id: "organization",
        label: "组织",
        href: "/organization",
        icon: Building2,
      },
      {
        id: "projects",
        label: "项目",
        href: "/projects",
        icon: Folder,
        badge: "12",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "电商",
    items: [
      {
        id: "products",
        label: "商品",
        href: "/products",
        icon: Package,
        children: [
          {
            id: "all-products",
            label: "全部商品",
            href: "/products/all",
            icon: Package,
          },
          {
            id: "categories",
            label: "分类",
            href: "/products/categories",
            icon: Tag,
            children: [
              {
                id: "electronics",
                label: "电子产品",
                href: "/products/categories/electronics",
                icon: Monitor,
              },
              {
                id: "clothing",
                label: "服装",
                href: "/products/categories/clothing",
                icon: ShoppingCart,
              },
              {
                id: "books",
                label: "图书",
                href: "/products/categories/books",
                icon: FileText,
              },
            ],
          },
          {
            id: "inventory",
            label: "库存",
            href: "/products/inventory",
            icon: Database,
          },
          {
            id: "reviews",
            label: "评价",
            href: "/products/reviews",
            icon: Star,
          },
        ],
      },
      {
        id: "orders",
        label: "订单",
        href: "/orders",
        icon: ShoppingCart,
        badge: "5",
        children: [
          {
            id: "all-orders",
            label: "全部订单",
            href: "/orders/all",
            icon: ShoppingCart,
          },
          {
            id: "pending",
            label: "待处理",
            href: "/orders/pending",
            icon: Clock,
            badge: "3",
          },
          {
            id: "processing",
            label: "处理中",
            href: "/orders/processing",
            icon: Timer,
          },
          {
            id: "shipped",
            label: "已发货",
            href: "/orders/shipped",
            icon: Truck,
          },
          {
            id: "delivered",
            label: "已送达",
            href: "/orders/delivered",
            icon: Check,
          },
        ],
      },
      {
        id: "customers",
        label: "客户",
        href: "/customers",
        icon: Users2,
        children: [
          {
            id: "all-customers",
            label: "全部客户",
            href: "/customers/all",
            icon: Users2,
          },
          {
            id: "segments",
            label: "客户分群",
            href: "/customers/segments",
            icon: Filter,
            children: [
              {
                id: "vip",
                label: "VIP 客户",
                href: "/customers/segments/vip",
                icon: Star,
              },
              {
                id: "new",
                label: "新客户",
                href: "/customers/segments/new",
                icon: UserPlus,
              },
              {
                id: "inactive",
                label: "不活跃",
                href: "/customers/segments/inactive",
                icon: UserX,
              },
            ],
          },
          {
            id: "reviews",
            label: "客户评价",
            href: "/customers/reviews",
            icon: MessageSquare,
          },
        ],
      },
    ],
  },
  {
    id: "finance",
    label: "财务",
    items: [
      {
        id: "transactions",
        label: "交易",
        href: "/transactions",
        icon: Wallet,
        children: [
          {
            id: "all-transactions",
            label: "全部交易",
            href: "/transactions/all",
            icon: Wallet,
          },
          {
            id: "income",
            label: "收入",
            href: "/transactions/income",
            icon: TrendingUp,
          },
          {
            id: "expenses",
            label: "支出",
            href: "/transactions/expenses",
            icon: TrendingDown,
          },
        ],
      },
      {
        id: "invoices",
        label: "发票",
        href: "/invoices",
        icon: Receipt,
        badge: "2",
      },
      {
        id: "payments",
        label: "付款",
        href: "/payments",
        icon: CreditCard,
        children: [
          {
            id: "payment-methods",
            label: "付款方式",
            href: "/payments/methods",
            icon: CreditCard,
          },
          {
            id: "payment-history",
            label: "付款记录",
            href: "/payments/history",
            icon: Clock,
          },
          {
            id: "refunds",
            label: "退款",
            href: "/payments/refunds",
            icon: Minus,
          },
        ],
      },
    ],
  },
  {
    id: "content",
    label: "内容管理",
    items: [
      {
        id: "pages",
        label: "页面",
        href: "/pages",
        icon: FileText,
        children: [
          {
            id: "all-pages",
            label: "全部页面",
            href: "/pages/all",
            icon: FileText,
          },
          {
            id: "blog",
            label: "Blog",
            href: "/pages/blog",
            icon: Edit,
            children: [
              {
                id: "posts",
              label: "文章",
                href: "/pages/blog/posts",
                icon: FileText,
              },
              {
                id: "categories",
                label: "分类",
                href: "/pages/blog/categories",
                icon: Tag,
              },
              {
                id: "tags",
                label: "标签",
                href: "/pages/blog/tags",
                icon: Bookmark,
              },
            ],
          },
          {
            id: "landing-pages",
            label: "落地页",
            href: "/pages/landing",
            icon: Globe,
          },
        ],
      },
      {
        id: "media",
        label: "媒体",
        href: "/media",
        icon: ImageIcon,
        children: [
          {
            id: "images",
            label: "图片",
            href: "/media/images",
            icon: ImageIcon,
          },
          {
            id: "videos",
            label: "视频",
            href: "/media/videos",
            icon: Play,
          },
          {
            id: "audio",
            label: "音频",
            href: "/media/audio",
            icon: Headphones,
          },
          {
            id: "documents",
            label: "文档",
            href: "/media/documents",
            icon: FileText,
          },
        ],
      },
      {
        id: "seo",
        label: "SEO",
        href: "/seo",
        icon: Search,
        isNew: true,
        children: [
          {
            id: "keywords",
            label: "关键词",
            href: "/seo/keywords",
            icon: Search,
          },
          {
            id: "meta-tags",
            label: "Meta 标签",
            href: "/seo/meta-tags",
            icon: Tag,
          },
          {
            id: "sitemap",
            label: "站点地图",
            href: "/seo/sitemap",
            icon: Map,
          },
        ],
      },
    ],
  },
  {
    id: "team",
    label: "团队与沟通",
    items: [
      {
        id: "members",
        label: "成员",
        href: "/members",
        icon: Users2,
        children: [
          {
            id: "all-members",
            label: "全部成员",
            href: "/members/all",
            icon: Users2,
          },
          {
            id: "roles",
            label: "角色",
            href: "/members/roles",
            icon: Shield,
            children: [
              {
                id: "admin",
                label: "管理员",
                href: "/members/roles/admin",
                icon: Shield,
              },
              {
                id: "editor",
                label: "编辑",
                href: "/members/roles/editor",
                icon: Edit,
              },
              {
                id: "viewer",
                label: "查看者",
                href: "/members/roles/viewer",
                icon: Eye,
              },
            ],
          },
          {
            id: "permissions",
            label: "权限",
            href: "/members/permissions",
            icon: Lock,
          },
        ],
      },
      {
        id: "chat",
        label: "聊天",
        href: "/chat",
        icon: MessagesSquare,
        badge: "12",
        children: [
          {
            id: "channels",
            label: "频道",
            href: "/chat/channels",
            icon: MessagesSquare,
          },
          {
            id: "direct-messages",
            label: "私信",
            href: "/chat/dm",
            icon: Mail,
          },
          {
            id: "notifications",
            label: "通知",
            href: "/chat/notifications",
            icon: Bell,
          },
        ],
      },
      {
        id: "meetings",
        label: "会议",
        href: "/meetings",
        icon: Video,
        children: [
          {
            id: "scheduled",
            label: "已排期",
            href: "/meetings/scheduled",
            icon: Calendar,
          },
          {
            id: "recordings",
            label: "录制",
            href: "/meetings/recordings",
            icon: Camera,
          },
          {
            id: "rooms",
            label: "会议室",
            href: "/meetings/rooms",
            icon: Monitor,
          },
        ],
      },
    ],
  },
  {
    id: "tools",
    label: "工具与实用功能",
    items: [
      {
        id: "plugins",
        label: "插件",
        href: "/plugins",
        icon: Puzzle,
        badge: "8",
        children: [
          {
            id: "installed",
            label: "已安装插件",
            href: "/plugins",
            icon: Package,
          },
          {
            id: "add-new",
            label: "新增",
            href: "/plugins",
            icon: Plus,
          },
        ],
      },
      {
        id: "api",
        label: "API",
        href: "/api",
        icon: Code,
        children: [
          {
            id: "documentation",
            label: "文档",
            href: "/api/docs",
            icon: FileText,
          },
          {
            id: "keys",
            label: "API 密钥",
            href: "/api/keys",
            icon: Key,
          },
          {
            id: "webhooks",
            label: "Webhooks",
            href: "/api/webhooks",
            icon: Zap,
          },
        ],
      },
      {
        id: "integrations",
        label: "集成",
        href: "/integrations",
        icon: Layers,
        children: [
          {
            id: "third-party",
            label: "第三方",
            href: "/integrations/third-party",
            icon: Globe,
          },
          {
            id: "plugins",
            label: "插件",
            href: "/integrations/plugins",
            icon: Plus,
          },
          {
            id: "extensions",
            label: "扩展",
            href: "/integrations/extensions",
            icon: Zap,
          },
        ],
      },
      {
        id: "backup",
        label: "备份与恢复",
        href: "/backup",
        icon: Database,
        children: [
          {
            id: "create-backup",
            label: "创建备份",
            href: "/backup/create",
            icon: Download,
          },
          {
            id: "restore",
            label: "恢复",
            href: "/backup/restore",
            icon: Upload,
          },
          {
            id: "schedule",
            label: "计划任务",
            href: "/backup/schedule",
            icon: Clock,
          },
        ],
      },
    ],
  },
]

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [menuState, setMenuState] = useState<MenuState>("full")
  const [isHovered, setIsHovered] = useState(false)
  const [previousDesktopState, setPreviousDesktopState] = useState<MenuState>("full")
  const [isMobile, setIsMobile] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // Cycle through menu states: full -> collapsed -> hidden -> full
  const toggleMenuState = () => {
    setMenuState((prev) => {
      switch (prev) {
        case "full":
          return "collapsed"
        case "collapsed":
          return "hidden"
        case "hidden":
          return "full"
        default:
          return "full"
      }
    })
  }

  // Function to set menu state from theme customizer
  const setMenuStateFromCustomizer = (state: MenuState) => {
    if (!isMobile) {
      setMenuState(state)
    }
  }

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024 // lg breakpoint
      setIsMobile(!isDesktop)

      if (!isDesktop) {
        // On mobile/tablet, save current desktop state and set to hidden
        if (menuState !== "hidden") {
          setPreviousDesktopState(menuState)
          setMenuState("hidden")
        }
      } else {
        // On desktop, restore previous state if coming from mobile
        if (menuState === "hidden" && previousDesktopState !== "hidden") {
          setMenuState(previousDesktopState)
        }
      }
    }

    // Check on mount
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [menuState, previousDesktopState])

  // Export functions to window for TopNav and ThemeCustomizer to access
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).toggleMenuState = toggleMenuState
      ;(window as any).menuState = menuState
      ;(window as any).isHovered = isHovered
      ;(window as any).isMobile = isMobile
      ;(window as any).setIsMobileMenuOpen = setIsMobileMenuOpen
      ;(window as any).isMobileMenuOpen = isMobileMenuOpen
      ;(window as any).setMenuStateFromCustomizer = setMenuStateFromCustomizer
    }
  }, [menuState, isHovered, isMobile, isMobileMenuOpen])

  function handleNavigation() {
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  function NavItem({
    item,
    level = 0,
    parentId = "",
  }: {
    item: MenuItem | SubMenuItem
    level?: number
    parentId?: string
  }) {
    const itemId = `${parentId}-${item.id}`
    const isExpanded = expandedItems.has(itemId)
    const hasChildren = item.children && item.children.length > 0
    const showText = menuState === "full" || (menuState === "collapsed" && isHovered) || (isMobile && isMobileMenuOpen)
    const showExpandIcon = hasChildren && showText

    const paddingLeft = level === 0 ? "px-3" : level === 1 ? "pl-8 pr-3" : "pl-12 pr-3"

    const Icon = item.icon
    const content = (
      <div
        className={cn(
          "flex items-center py-2 text-sm rounded-md transition-colors sidebar-menu-item hover:bg-gray-50 dark:hover:bg-[#1F1F23] relative group cursor-pointer",
          paddingLeft,
        )}
        onClick={() => {
          if (hasChildren) {
            toggleExpanded(itemId)
          } else if (item.href) {
            navigateToPrototypeHref(item.href)
            handleNavigation()
          }
        }}
        title={menuState === "collapsed" && !isHovered && !isMobile ? item.label : undefined}
      >
        {Icon && <Icon className="h-4 w-4 flex-shrink-0 sidebar-menu-icon" />}

        {showText && (
          <>
            <span className="ml-3 flex-1 transition-opacity duration-200 sidebar-menu-text">{item.label}</span>

            {/* Badges and indicators */}
            <div className="flex items-center space-x-1">
              {item.isNew && (
                <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  新
                </span>
              )}
              {item.badge && (
                <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                  {item.badge}
                </span>
              )}
              {showExpandIcon && (
                <ChevronDown
                  className={cn("h-3 w-3 transition-transform duration-200", isExpanded ? "rotate-180" : "rotate-0")}
                />
              )}
            </div>
          </>
        )}

        {/* Tooltip for collapsed state when not hovered and not mobile */}
        {menuState === "collapsed" && !isHovered && !isMobile && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {item.label}
            {item.badge && <span className="ml-1 text-blue-300">({item.badge})</span>}
          </div>
        )}
      </div>
    )

    return (
      <div>
        {item.href && !hasChildren ? <Link href={item.href}>{content}</Link> : content}
        {hasChildren && isExpanded && showText && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <NavItem key={child.id} item={child} level={level + 1} parentId={itemId} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Calculate sidebar width - expand when collapsed and hovered, or full width on mobile
  const getSidebarWidth = () => {
    if (isMobile) {
      return "w-64" // Always full width on mobile
    }
    if (menuState === "collapsed" && isHovered) {
      return "w-64" // Expand to full width when hovered
    }
    return menuState === "collapsed" ? "w-16" : "w-64"
  }

  // Show text if menu is full OR if collapsed and hovered OR on mobile
  const showText = menuState === "full" || (menuState === "collapsed" && isHovered) || (isMobile && isMobileMenuOpen)

  // On mobile, show sidebar as overlay when isMobileMenuOpen is true
  if (isMobile) {
    return (
      <>
        {/* Mobile sidebar overlay */}
        <nav
          className={`
            fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] 
            border-r border-gray-200 dark:border-[#1F1F23] 
            transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="h-16 px-3 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
              <Link
                href="https://cmsfullform.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full"
              >
                <img
                  src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                  alt="CMSFullForm"
                  width={32}
                  height={32}
                  className="flex-shrink-0"
                />
                <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                  CMSFullForm
                </span>
              </Link>
            </div>

            <div
              className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 scrollbar-none"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* IE and Edge */,
              }}
            >
              <div className="space-y-6">
                {menuData.map((section) => (
                  <div key={section.id}>
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider sidebar-section-label">
                      {section.label}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <NavItem key={item.id} item={item} parentId={section.id} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-2 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
              <div className="space-y-1">
                <NavItem item={{ id: "settings", label: "设置", href: "/settings", icon: Settings }} />
                <NavItem item={{ id: "help", label: "帮助", href: "/help", icon: HelpCircle }} />
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile overlay backdrop */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[65]" onClick={() => setIsMobileMenuOpen(false)} />
        )}
      </>
    )
  }

  // Desktop sidebar
  return (
    <nav
      className={`
        fixed inset-y-0 left-0 z-[60] bg-white dark:bg-[#0F0F12] 
        border-r border-gray-200 dark:border-[#1F1F23] transition-all duration-300 ease-in-out
        ${menuState === "hidden" ? "w-0 border-r-0" : getSidebarWidth()}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        overflow: menuState === "hidden" ? "hidden" : "visible",
      }}
    >
      {menuState !== "hidden" && (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 px-3 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
            {showText ? (
              <Link
                href="https://cmsfullform.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full"
              >
                <img
                  src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                  alt="CMSFullForm"
                  width={32}
                  height={32}
                  className="flex-shrink-0 hidden dark:block"
                />
                <img
                  src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                  alt="CMSFullForm"
                  width={32}
                  height={32}
                  className="flex-shrink-0 block dark:hidden"
                />
                <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white transition-opacity duration-200">
                  CMSFullForm
                </span>
              </Link>
            ) : (
              <div className="flex justify-center w-full">
                <img
                  src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                  alt="CMSFullForm"
                  width={32}
                  height={32}
                  className="flex-shrink-0 hidden dark:block"
                />
                <img
                  src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                  alt="CMSFullForm"
                  width={32}
                  height={32}
                  className="flex-shrink-0 block dark:hidden"
                />
              </div>
            )}
          </div>

          <div
            className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 scrollbar-none"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            <div className="space-y-6">
              {menuData.map((section) => (
                <div key={section.id}>
                  {showText && (
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider sidebar-section-label transition-opacity duration-200">
                      {section.label}
                    </div>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <NavItem key={item.id} item={item} parentId={section.id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-2 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem item={{ id: "settings", label: "设置", href: "/settings", icon: Settings }} />
              <NavItem item={{ id: "help", label: "帮助", href: "/help", icon: HelpCircle }} />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

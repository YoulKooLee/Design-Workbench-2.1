import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  Package,
  DollarSign,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
  activeModule: string;
  onModuleChange: (module: string) => void;
  onOpenRouteOptimization?: () => void;
  onOpenAnalytics?: () => void;
  onOpenAlerts?: () => void;
  onOpenGenerateReport?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: {
    text: string;
    variant: 'default' | 'destructive' | 'outline' | 'secondary';
    animate?: boolean;
  };
  notifications?: number;
  submenu?: MenuItem[];
  description?: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview and key metrics'
  },
  {
    id: 'transports',
    label: 'Trips / Transports',
    icon: Package,
    notifications: 3,
    badge: {
      text: 'Active',
      variant: 'default'
    },
    description: 'Manage transportation orders'
  },
  {
    id: 'vehicles',
    label: 'Fleet Management',
    icon: Truck,
    notifications: 2,
    badge: {
      text: '247',
      variant: 'secondary'
    },
    description: 'Vehicle fleet and maintenance'
  },
  {
    id: 'drivers',
    label: 'Drivers',
    icon: Users,
    badge: {
      text: 'On Duty',
      variant: 'outline'
    },
    description: 'Driver management and assignments'
  },
  {
    id: 'routes',
    label: 'Routes & Bookings',
    icon: Route,
    notifications: 1,
    description: 'Route optimization and customer bookings'
  },
  {
    id: 'revenue',
    label: 'Revenue & Reports',
    icon: DollarSign,
    badge: {
      text: '+12%',
      variant: 'default',
      animate: true
    },
    description: 'Financial analytics and reporting'
  },
  {
    id: 'logs',
    label: 'Activity Logs',
    icon: FileText,
    description: 'System logs and audit trail'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'System configuration and preferences'
  }
];

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick: () => void;
}

export function EnhancedSidebar({ 
  collapsed, 
  onCollapse, 
  activeModule, 
  onModuleChange,
  onOpenRouteOptimization,
  onOpenAnalytics,
  onOpenAlerts,
  onOpenGenerateReport
}: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const quickActions: QuickAction[] = [
    { 
      id: 'optimize', 
      label: 'Optimize Routes', 
      icon: Zap, 
      color: 'text-orange-500',
      onClick: () => onOpenRouteOptimization?.()
    },
    { 
      id: 'analytics', 
      label: 'View Analytics', 
      icon: TrendingUp, 
      color: 'text-blue-500',
      onClick: () => onOpenAnalytics?.()
    },
    { 
      id: 'alerts', 
      label: 'Check Alerts', 
      icon: AlertCircle, 
      color: 'text-red-500',
      onClick: () => onOpenAlerts?.()
    },
    { 
      id: 'reports', 
      label: 'Generate Report', 
      icon: CheckCircle2, 
      color: 'text-green-500',
      onClick: () => onOpenGenerateReport?.()
    }
  ];

  const MenuItem = ({ item }: { item: MenuItem }) => {
    const isActive = activeModule === item.id;
    
    const menuButton = (
      <Button
        variant={isActive ? 'default' : 'ghost'}
        className={`w-full justify-start h-11 px-3 mb-1 transition-all duration-200 ${
          isActive 
            ? 'bg-primary text-primary-foreground shadow-md' 
            : 'hover:bg-accent hover:text-accent-foreground hover:translate-x-1'
        } ${collapsed ? 'px-0 justify-center' : ''}`}
        onClick={() => onModuleChange(item.id)}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <item.icon className={`h-5 w-5 flex-shrink-0 ${collapsed ? '' : 'mr-3'}`} />
        
        {!collapsed && (
          <>
            <span className="flex-1 text-left font-medium">{item.label}</span>
            
            <div className="flex items-center gap-2">
              {item.notifications && item.notifications > 0 && (
                <Badge 
                  className={`h-5 w-5 flex items-center justify-center p-0 text-xs ${
                    item.notifications > 99 ? 'px-1' : ''
                  }`}
                  variant="destructive"
                >
                  {item.notifications > 99 ? '99+' : item.notifications}
                </Badge>
              )}
              
              {item.badge && (
                <Badge 
                  variant={item.badge.variant} 
                  className={`text-xs font-medium ${item.badge.animate ? 'animate-pulse' : ''}`}
                >
                  {item.badge.text}
                </Badge>
              )}
            </div>
          </>
        )}
      </Button>
    );

    if (collapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {menuButton}
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-popover border-border">
              <div className="flex flex-col gap-1">
                <p className="font-medium">{item.label}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                )}
                {item.notifications && item.notifications > 0 && (
                  <Badge variant="destructive" className="text-xs self-start">
                    {item.notifications} new
                  </Badge>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return menuButton;
  };

  return (
    <aside className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col ${
      collapsed ? 'w-16' : 'w-72'
    }`}>
      {/* Sidebar Header */}
      <div className={`p-4 border-b border-sidebar-border ${collapsed ? 'px-2' : ''}`}>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-sidebar-foreground">Navigation</h2>
              <p className="text-xs text-sidebar-foreground/60">Manage your operations</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onCollapse}
            className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
        
        {!collapsed && (
          <>
            <Separator className="my-4 bg-sidebar-border" />
            
            {/* Quick Actions */}
            <div className="px-2 mb-3">
              <p className="text-xs font-semibold text-sidebar-foreground/70 mb-2 uppercase tracking-wider">
                Quick Actions
              </p>
            </div>
            
            <div className="space-y-1">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-9 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
                  onClick={action.onClick}
                >
                  <action.icon className={`h-4 w-4 mr-3 ${action.color}`} />
                  {action.label}
                </Button>
              ))}
            </div>
          </>
        )}
      </nav>

      {/* Sidebar Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-sidebar-accent/50 rounded-lg p-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-sidebar-foreground">System Status</span>
            </div>
            <p className="text-xs text-sidebar-foreground/60">All systems operational</p>
            <div className="mt-2 text-xs text-sidebar-foreground/60">
              Last update: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { SearchCommand } from './navigation/SearchCommand';
import { NotificationDropdown } from './navigation/NotificationDropdown';
import { UserProfileDropdown } from './navigation/UserProfileDropdown';
import { Menu, Sun, Moon, Truck } from 'lucide-react';

interface TopNavigationProps {
  onMenuClick: () => void;
  onOpenUserProfile?: () => void;
}

export function EnhancedTopNavigation({ onMenuClick, onOpenUserProfile }: TopNavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchItemSelect = (item: any) => {
    // Handle navigation to the selected item
    console.log('Navigate to:', item);
  };

  const handleNotificationClick = (notificationId: string) => {
    // Handle notification click
    console.log('Notification clicked:', notificationId);
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onMenuClick}
          className="hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">TranSphere</h1>
            <p className="text-xs text-muted-foreground">Supply Chain Platform</p>
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <SearchCommand onItemSelect={handleSearchItemSelect} />

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Current Time */}
        <div className="hidden md:block text-sm text-muted-foreground">
          {currentTime.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })}
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={`h-8 w-8 p-0 transition-all ${theme === 'light' ? 'bg-background shadow-sm' : ''}`}
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={`h-8 w-8 p-0 transition-all ${theme === 'dark' ? 'bg-background shadow-sm' : ''}`}
          >
            <Moon className="h-4 w-4" />
          </Button>
        </div>

        {/* Notifications */}
        <NotificationDropdown onNotificationClick={handleNotificationClick} />

        {/* User Profile */}
        <UserProfileDropdown onOpenProfile={onOpenUserProfile} />
      </div>
    </header>
  );
}
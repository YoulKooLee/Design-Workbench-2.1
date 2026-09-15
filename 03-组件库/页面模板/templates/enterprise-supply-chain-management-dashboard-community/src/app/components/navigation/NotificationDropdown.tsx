import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Bell } from 'lucide-react';
import { notifications } from '../data/navigationData';
import { getNotificationIcon } from '../utils/navigationUtils';

interface NotificationDropdownProps {
  onNotificationClick?: (notificationId: string) => void;
}

export function NotificationDropdown({ onNotificationClick }: NotificationDropdownProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => n.unread).length);

  const handleNotificationClick = (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && notification.unread) {
      notification.unread = false;
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    onNotificationClick?.(notificationId);
  };

  const markAllAsRead = () => {
    notifications.forEach(n => n.unread = false);
    setUnreadCount(0);
  };

  return (
    <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs animate-pulse">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 bg-popover border-border" align="end">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs hover:bg-accent hover:text-accent-foreground"
            >
              Mark all read
            </Button>
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-border/50 hover:bg-accent/50 cursor-pointer transition-colors ${
                notification.unread ? 'bg-accent/20' : ''
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex items-start gap-3">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground text-sm">{notification.title}</h4>
                    {notification.unread && (
                      <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{notification.description}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
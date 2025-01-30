import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { getAllNotifications, markNotificationsAsRead } from "@/lib/notifications";
import type { Notification } from "@/lib/notifications";

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const notifications = await getAllNotifications();
      console.log("Fetched notifications:", notifications);
      setNotifications(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAsRead = async () => {
    try {
      // Only mark unread notifications as read
      const unreadIds = notifications
        .filter(n => !n.is_read)
        .map(n => n.notification_id);
      
      if (unreadIds.length > 0) {
        await markNotificationsAsRead(unreadIds);
        // Update local state to mark these notifications as read
        setNotifications(notifications.map(notification => 
          unreadIds.includes(notification.notification_id)
            ? { ...notification, is_read: true }
            : notification
        ));
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Set up real-time subscription for user notifications
    const channel = supabase
      .channel('user-notifications')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'user_notifications'
        }, 
        () => {
          fetchNotifications(); // Refresh notifications on any changes
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <TooltipProvider>
      <Tooltip>
        <Popover open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => {
                  if (unreadCount > 0) {
                    handleMarkAsRead();
                  }
                }}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            Notifications
          </TooltipContent>
          <PopoverContent className="w-80 p-0" align="end">
            <ScrollArea className="h-80">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Notifications</h4>
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No notifications
                  </p>
                ) : (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.notification_id}
                        className={`flex items-start gap-4 rounded-lg p-2 hover:bg-muted/50 ${
                          !notification.is_read ? 'bg-muted/30' : ''
                        }`}
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={notification.avatar_picture_link || ''} />
                          <AvatarFallback>
                            {notification.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {notification.name}
                            <span className="text-xs text-muted-foreground">
                              {" "}
                              · {notification.user_position}
                            </span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {notification.notification_message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  );
}

import { supabase } from '@/integrations/supabase/client';

export interface Notification {
  notification_id: string;
  notification_message: string;
  name: string;
  user_position: string;
  avatar_picture_link?: string;
  created_at: string;
  is_read?: boolean;
}

/**
 * Get all notifications for the current user, including read status
 */
export async function getAllNotifications(): Promise<Notification[]> {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .rpc('get_all_notifications', {
      p_user_id: user.user.id
    });

  if (error) throw error;
  return data || [];
}

/**
 * Get count of unread notifications
 */
export async function getUnreadCount(): Promise<number> {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  const { data: notifications } = await getAllNotifications();
  return notifications?.filter(n => !n.is_read).length || 0;
}

/**
 * Get all unread notifications for the current user
 */
export async function getUnreadNotifications(): Promise<Notification[]> {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .rpc('get_unread_notifications', {
      p_user_id: user.user.id
    });

  if (error) throw error;
  return data || [];
}

/**
 * Mark multiple notifications as read for the current user
 */
export async function markNotificationsAsRead(notificationIds: string[]): Promise<void> {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .rpc('mark_notifications_as_read', {
      p_user_id: user.user.id,
      p_notification_ids: notificationIds
    });

  if (error) throw error;
}

/**
 * Create a new user notification
 */
export async function createUserNotification(
  notificationId: string,
  message: string
): Promise<string> {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .rpc('create_user_notification', {
      p_notification_id: notificationId,
      p_user_id: user.user.id,
      p_notification_message: message
    });

  if (error) throw error;
  return data;
}

/**
 * Helper function to create a default notification template
 * This should be used by administrators to create notification templates
 */
export async function createDefaultNotification(
  message: string,
  name: string,
  userPosition: string,
  avatarPictureLink: string | null,
  timeAfterSignup: Date // Pass in a Date object for when the notification should be shown
): Promise<string> {
  const { data, error } = await supabase
    .from('default_notifications')
    .insert({
      notification_message: message,
      name: name,
      user_position: userPosition,
      avatar_picture_link: avatarPictureLink,
      time: timeAfterSignup.toISOString()
    })
    .select('notification_id')
    .single();

  if (error) throw error;
  return data.notification_id;
}

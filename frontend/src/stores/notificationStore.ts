import { create } from 'zustand';
import type { Notification } from '../types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'info', title: 'Welcome!', message: 'Your account is ready to use.', time: new Date().toISOString(), read: false },
  { id: '2', type: 'success', title: 'Payment received', message: '$2,450 from Alex Shatov.', time: new Date(Date.now() - 300000).toISOString(), read: false },
  { id: '3', type: 'warning', title: 'Server usage high', message: 'CPU usage exceeded 90%.', time: new Date(Date.now() - 900000).toISOString(), read: false },
  { id: '4', type: 'info', title: 'New feature', message: 'Dark mode is now available.', time: new Date(Date.now() - 3600000).toISOString(), read: true },
];

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.read).length,

  addNotification: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).slice(2),
        read: false,
      };
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      unreadCount: Math.max(0, state.unreadCount - (state.notifications.find((n) => n.id === id && !n.read) ? 1 : 0)),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: state.unreadCount - (state.notifications.find((n) => n.id === id && !n.read) ? 1 : 0),
    })),

  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));

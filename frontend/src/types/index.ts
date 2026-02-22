export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'viewer';
  location?: string;
  bio?: string;
  joinedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location: string;
  orders: number;
  spent: number;
  lastOrder: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled' | 'refunded' | 'processing';
  items: number;
  total: number;
  paymentMethod: string;
}

export interface Invoice {
  id: string;
  number: string;
  customer: string;
  date: string;
  dueDate: string;
  status: 'paid' | 'due' | 'overdue' | 'draft';
  amount: number;
}

export interface Product {
  id: string;
  name: string;
  image?: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  status: 'active' | 'draft' | 'archived';
  description?: string;
}

export interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'cancelled';
  category: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  dueDate?: string;
  tags?: string[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface CommunityUser {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  location: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  bgColor: string;
}

export interface FeedPost {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  time: string;
  liked: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  authorAvatar?: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  pinned: boolean;
}

export interface Meetup {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  image?: string;
  tags: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  salary: string;
  posted: string;
  tags: string[];
  featured: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  allDay: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'completed' | 'paused';
  type: string;
  sent: number;
  opened: number;
  clicked: number;
  conversion: number;
  startDate: string;
}

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type SortDirection = 'asc' | 'desc';

export interface TableColumn<T> {
  id: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T) => React.ReactNode;
}

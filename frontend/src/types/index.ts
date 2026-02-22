export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  location?: string;
  bio?: string;
  joinedAt?: string;
  createdAt?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location: string;
  orders: number;
  spent: number;
  lastOrder?: string;
  status: string;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: string;
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
  status: string;
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
  status: string;
  description?: string;
}

export interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: string;
  status: string;
  category: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assignee?: string;
  assignedUser?: { id: string; name: string };
  dueDate?: string;
  tags?: string[];
}

export interface Message {
  id: string;
  senderId?: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp?: string;
  createdAt?: string;
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
  type: string;
  title: string;
  message: string;
  time?: string;
  createdAt?: string;
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
  time?: string;
  createdAt?: string;
  liked?: boolean;
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
  type: string;
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
  status: string;
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

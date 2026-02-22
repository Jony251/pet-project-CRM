import type {
  Customer, Order, Invoice, Product, Transaction, Task,
  Conversation, CommunityUser, FeedPost, ForumPost,
  Meetup, Job, CalendarEvent, Campaign, Message,
} from '../../types';

export const customers: Customer[] = [
  { id: '1', name: 'Alex Shatov', email: 'alex@company.com', location: 'New York, US', orders: 24, spent: 3890, lastOrder: '2025-12-18', status: 'active' },
  { id: '2', name: 'Philip Harbach', email: 'philip@company.com', location: 'Berlin, DE', orders: 18, spent: 2767, lastOrder: '2025-12-15', status: 'active' },
  { id: '3', name: 'Mirko Fisuk', email: 'mirko@company.com', location: 'Paris, FR', orders: 9, spent: 1220, lastOrder: '2025-11-28', status: 'inactive' },
  { id: '4', name: 'Olga Semklo', email: 'olga@company.com', location: 'London, UK', orders: 32, spent: 4580, lastOrder: '2025-12-20', status: 'active' },
  { id: '5', name: 'Burak Long', email: 'burak@company.com', location: 'Istanbul, TR', orders: 5, spent: 862, lastOrder: '2025-12-01', status: 'pending' },
  { id: '6', name: 'Mary Rosales', email: 'mary@company.com', location: 'Madrid, ES', orders: 14, spent: 2340, lastOrder: '2025-12-10', status: 'active' },
  { id: '7', name: 'Rodrigo Bauer', email: 'rodrigo@company.com', location: 'São Paulo, BR', orders: 7, spent: 1128, lastOrder: '2025-11-22', status: 'inactive' },
  { id: '8', name: 'Sara Kinsella', email: 'sara@company.com', location: 'Dublin, IE', orders: 21, spent: 3190, lastOrder: '2025-12-17', status: 'active' },
  { id: '9', name: 'Yuki Tanaka', email: 'yuki@company.com', location: 'Tokyo, JP', orders: 16, spent: 2890, lastOrder: '2025-12-14', status: 'active' },
  { id: '10', name: 'Lars Eriksson', email: 'lars@company.com', location: 'Stockholm, SE', orders: 3, spent: 480, lastOrder: '2025-10-20', status: 'pending' },
];

export const orders: Order[] = [
  { id: 'ORD-001', customer: 'Alex Shatov', date: '2025-12-22', status: 'completed', items: 3, total: 489, paymentMethod: 'Visa •••• 4242' },
  { id: 'ORD-002', customer: 'Philip Harbach', date: '2025-12-21', status: 'processing', items: 1, total: 129, paymentMethod: 'PayPal' },
  { id: 'ORD-003', customer: 'Olga Semklo', date: '2025-12-21', status: 'completed', items: 5, total: 890, paymentMethod: 'Mastercard •••• 8888' },
  { id: 'ORD-004', customer: 'Mirko Fisuk', date: '2025-12-20', status: 'cancelled', items: 2, total: 245, paymentMethod: 'Visa •••• 1234' },
  { id: 'ORD-005', customer: 'Sara Kinsella', date: '2025-12-20', status: 'completed', items: 1, total: 67, paymentMethod: 'Apple Pay' },
  { id: 'ORD-006', customer: 'Burak Long', date: '2025-12-19', status: 'refunded', items: 4, total: 512, paymentMethod: 'Visa •••• 5678' },
  { id: 'ORD-007', customer: 'Mary Rosales', date: '2025-12-19', status: 'pending', items: 2, total: 198, paymentMethod: 'PayPal' },
  { id: '  ORD-008', customer: 'Yuki Tanaka', date: '2025-12-18', status: 'completed', items: 3, total: 340, paymentMethod: 'Visa •••• 9999' },
  { id: 'ORD-009', customer: 'Lars Eriksson', date: '2025-12-17', status: 'processing', items: 1, total: 89, paymentMethod: 'Mastercard •••• 3333' },
  { id: 'ORD-010', customer: 'Rodrigo Bauer', date: '2025-12-16', status: 'completed', items: 6, total: 1240, paymentMethod: 'PayPal' },
];

export const invoices: Invoice[] = [
  { id: '1', number: 'INV-0001', customer: 'Alex Shatov', date: '2025-12-01', dueDate: '2025-12-31', status: 'paid', amount: 3890 },
  { id: '2', number: 'INV-0002', customer: 'Philip Harbach', date: '2025-12-05', dueDate: '2026-01-04', status: 'due', amount: 2767 },
  { id: '3', number: 'INV-0003', customer: 'Mirko Fisuk', date: '2025-11-15', dueDate: '2025-12-15', status: 'overdue', amount: 1220 },
  { id: '4', number: 'INV-0004', customer: 'Olga Semklo', date: '2025-12-10', dueDate: '2026-01-09', status: 'paid', amount: 4580 },
  { id: '5', number: 'INV-0005', customer: 'Burak Long', date: '2025-12-12', dueDate: '2026-01-11', status: 'draft', amount: 862 },
  { id: '6', number: 'INV-0006', customer: 'Sara Kinsella', date: '2025-12-14', dueDate: '2026-01-13', status: 'due', amount: 3190 },
  { id: '7', number: 'INV-0007', customer: 'Yuki Tanaka', date: '2025-12-15', dueDate: '2026-01-14', status: 'paid', amount: 2890 },
  { id: '8', number: 'INV-0008', customer: 'Mary Rosales', date: '2025-12-16', dueDate: '2026-01-15', status: 'due', amount: 2340 },
];

export const products: Product[] = [
  { id: '1', name: 'Form Builder CP', category: 'Software', price: 89, stock: 248, rating: 4.8, status: 'active', description: 'A powerful form builder for creating custom forms with drag-and-drop.' },
  { id: '2', name: 'Visual Studio X', category: 'Development', price: 149, stock: 124, rating: 4.6, status: 'active', description: 'Next-gen IDE with AI-powered code completion.' },
  { id: '3', name: 'Analytics Plus', category: 'Analytics', price: 59, stock: 0, rating: 4.2, status: 'draft', description: 'Advanced analytics dashboard for business intelligence.' },
  { id: '4', name: 'Server Monitor', category: 'DevOps', price: 39, stock: 512, rating: 4.9, status: 'active', description: 'Real-time server monitoring and alerting system.' },
  { id: '5', name: 'Design System Kit', category: 'Design', price: 199, stock: 67, rating: 4.7, status: 'active', description: 'Complete design system with 500+ components.' },
  { id: '6', name: 'Cloud Storage Pro', category: 'Storage', price: 29, stock: 1024, rating: 4.4, status: 'active', description: 'Secure cloud storage with end-to-end encryption.' },
  { id: '7', name: 'API Gateway', category: 'Development', price: 79, stock: 310, rating: 4.5, status: 'active', description: 'High-performance API gateway with rate limiting.' },
  { id: '8', name: 'Email Templates', category: 'Marketing', price: 49, stock: 0, rating: 3.9, status: 'archived', description: 'Beautiful responsive email templates.' },
];

export const transactions: Transaction[] = [
  { id: '1', description: 'Subscription payment', date: '2025-12-22', amount: 89, type: 'credit', status: 'completed', category: 'Revenue' },
  { id: '2', description: 'Server hosting', date: '2025-12-21', amount: 249, type: 'debit', status: 'completed', category: 'Infrastructure' },
  { id: '3', description: 'Pro plan upgrade', date: '2025-12-20', amount: 149, type: 'credit', status: 'completed', category: 'Revenue' },
  { id: '4', description: 'Ad campaign', date: '2025-12-19', amount: 500, type: 'debit', status: 'pending', category: 'Marketing' },
  { id: '5', description: 'Affiliate payout', date: '2025-12-18', amount: 120, type: 'debit', status: 'completed', category: 'Commissions' },
  { id: '6', description: 'Enterprise license', date: '2025-12-17', amount: 599, type: 'credit', status: 'completed', category: 'Revenue' },
  { id: '7', description: 'Domain renewal', date: '2025-12-16', amount: 14, type: 'debit', status: 'completed', category: 'Infrastructure' },
  { id: '8', description: 'Refund – Order #004', date: '2025-12-15', amount: 245, type: 'debit', status: 'completed', category: 'Refunds' },
  { id: '9', description: 'Consultation fee', date: '2025-12-14', amount: 350, type: 'credit', status: 'pending', category: 'Services' },
  { id: '10', description: 'Software license', date: '2025-12-13', amount: 79, type: 'debit', status: 'cancelled', category: 'Tools' },
];

export const tasks: Task[] = [
  { id: '1', title: 'Product page redesign', status: 'todo', priority: 'high', assignee: 'Alex Shatov', dueDate: '2025-12-28', tags: ['Design', 'UI'] },
  { id: '2', title: 'Update API documentation', status: 'todo', priority: 'medium', assignee: 'Philip Harbach', dueDate: '2025-12-30', tags: ['Docs'] },
  { id: '3', title: 'Fix checkout flow bug', status: 'in_progress', priority: 'urgent', assignee: 'Sara Kinsella', dueDate: '2025-12-24', tags: ['Bug', 'E-Commerce'] },
  { id: '4', title: 'Implement dark mode', status: 'in_progress', priority: 'medium', assignee: 'Yuki Tanaka', tags: ['Feature', 'UI'] },
  { id: '5', title: 'Database optimization', status: 'review', priority: 'high', assignee: 'Burak Long', dueDate: '2025-12-26', tags: ['Backend', 'Performance'] },
  { id: '6', title: 'Add unit tests for auth', status: 'review', priority: 'medium', assignee: 'Mirko Fisuk', tags: ['Testing'] },
  { id: '7', title: 'Deploy v2.0 to staging', status: 'done', priority: 'high', assignee: 'Olga Semklo', tags: ['DevOps'] },
  { id: '8', title: 'Customer onboarding flow', status: 'done', priority: 'medium', assignee: 'Mary Rosales', tags: ['Feature', 'UX'] },
  { id: '9', title: 'SSL certificate renewal', status: 'todo', priority: 'urgent', assignee: 'Lars Eriksson', dueDate: '2025-12-25', tags: ['Security'] },
  { id: '10', title: 'Mobile responsive fixes', status: 'in_progress', priority: 'low', assignee: 'Rodrigo Bauer', tags: ['Bug', 'Mobile'] },
];

export const conversations: Conversation[] = [
  { id: '1', participantName: 'Alex Shatov', lastMessage: 'Hey, can you review the new dashboard?', lastMessageTime: '2025-12-22T14:30:00Z', unreadCount: 2, online: true },
  { id: '2', participantName: 'Sara Kinsella', lastMessage: 'The checkout bug is fixed now.', lastMessageTime: '2025-12-22T13:15:00Z', unreadCount: 0, online: true },
  { id: '3', participantName: 'Philip Harbach', lastMessage: 'Sent the API docs for review.', lastMessageTime: '2025-12-22T11:00:00Z', unreadCount: 1, online: false },
  { id: '4', participantName: 'Olga Semklo', lastMessage: 'Deployment is complete!', lastMessageTime: '2025-12-21T18:45:00Z', unreadCount: 0, online: false },
  { id: '5', participantName: 'Yuki Tanaka', lastMessage: 'Dark mode is looking great 🌙', lastMessageTime: '2025-12-21T16:20:00Z', unreadCount: 0, online: true },
];

export const messages: Message[] = [
  { id: '1', senderId: '1', senderName: 'Alex Shatov', content: 'Hey, can you review the new dashboard?', timestamp: '2025-12-22T14:30:00Z', read: false },
  { id: '2', senderId: 'me', senderName: 'You', content: 'Sure, I\'ll take a look now.', timestamp: '2025-12-22T14:32:00Z', read: true },
  { id: '3', senderId: '1', senderName: 'Alex Shatov', content: 'Great, let me know if you have any feedback.', timestamp: '2025-12-22T14:33:00Z', read: false },
];

export const communityUsers: CommunityUser[] = [
  { id: '1', name: 'Dominik McNeail', handle: '@dominik', location: 'New York, US', bio: 'Full-stack developer passionate about clean architecture.', followers: 1420, following: 210, posts: 48, bgColor: '#6366f1' },
  { id: '2', name: 'Ivan Mesaroš', handle: '@ivan', location: 'Zagreb, HR', bio: 'UI/UX designer crafting beautiful interfaces.', followers: 890, following: 145, posts: 32, bgColor: '#0ea5e9' },
  { id: '3', name: 'Tisha Yanchev', handle: '@tisha', location: 'Sofia, BG', bio: 'DevOps engineer automating everything.', followers: 650, following: 98, posts: 21, bgColor: '#22c55e' },
  { id: '4', name: 'Jerzy Wierzy', handle: '@jerzy', location: 'Warsaw, PL', bio: 'Backend developer building scalable APIs.', followers: 1200, following: 180, posts: 67, bgColor: '#f59e0b' },
  { id: '5', name: 'Mirko Grewing', handle: '@mirko', location: 'Munich, DE', bio: 'Product manager turning ideas into reality.', followers: 2100, following: 320, posts: 89, bgColor: '#ec4899' },
  { id: '6', name: 'Tara Šimunović', handle: '@tara', location: 'Berlin, DE', bio: 'Data scientist exploring ML frontiers.', followers: 780, following: 120, posts: 15, bgColor: '#8b5cf6' },
];

export const feedPosts: FeedPost[] = [
  { id: '1', author: 'Dominik McNeail', content: 'Just shipped a new feature! The real-time analytics dashboard is live. Check it out and let me know what you think. 🚀', likes: 42, comments: 8, shares: 3, time: '2025-12-22T10:00:00Z', liked: false },
  { id: '2', author: 'Ivan Mesaroš', content: 'Working on a new design system. Here\'s a sneak peek at the component library. Over 200 components built with accessibility in mind.', likes: 89, comments: 15, shares: 12, time: '2025-12-21T16:30:00Z', liked: true },
  { id: '3', author: 'Tisha Yanchev', content: 'Automated our entire CI/CD pipeline. Deployments went from 45 minutes to 3 minutes. Infrastructure as code FTW! 🔧', likes: 67, comments: 11, shares: 7, time: '2025-12-20T14:00:00Z', liked: false },
];

export const forumPosts: ForumPost[] = [
  { id: '1', title: 'Best practices for React state management in 2025', author: 'Dominik McNeail', category: 'Development', replies: 24, views: 1420, lastActivity: '2025-12-22T14:00:00Z', pinned: true },
  { id: '2', title: 'How to optimize PostgreSQL queries for large datasets', author: 'Jerzy Wierzy', category: 'Database', replies: 18, views: 890, lastActivity: '2025-12-22T11:30:00Z', pinned: false },
  { id: '3', title: 'Figma vs Sketch in 2025 – which do you prefer?', author: 'Ivan Mesaroš', category: 'Design', replies: 45, views: 2340, lastActivity: '2025-12-21T18:00:00Z', pinned: false },
  { id: '4', title: 'Kubernetes vs Docker Swarm for small teams', author: 'Tisha Yanchev', category: 'DevOps', replies: 31, views: 1650, lastActivity: '2025-12-21T10:00:00Z', pinned: true },
  { id: '5', title: 'Tips for remote team collaboration', author: 'Mirko Grewing', category: 'General', replies: 56, views: 3200, lastActivity: '2025-12-20T15:00:00Z', pinned: false },
];

export const meetups: Meetup[] = [
  { id: '1', title: 'React Summit 2026', description: 'The biggest React conference in Europe.', date: '2026-03-15', location: 'Amsterdam, NL', attendees: 840, maxAttendees: 1000, tags: ['React', 'JavaScript', 'Frontend'] },
  { id: '2', title: 'DevOps Days Berlin', description: 'Community-driven DevOps conference.', date: '2026-02-10', location: 'Berlin, DE', attendees: 320, maxAttendees: 500, tags: ['DevOps', 'Cloud', 'CI/CD'] },
  { id: '3', title: 'UX Design Workshop', description: 'Hands-on workshop on user research and prototyping.', date: '2026-01-20', location: 'Online', attendees: 120, maxAttendees: 150, tags: ['UX', 'Design', 'Workshop'] },
  { id: '4', title: 'AI/ML Hackathon', description: 'Build AI-powered solutions in 48 hours.', date: '2026-04-05', location: 'San Francisco, US', attendees: 200, maxAttendees: 250, tags: ['AI', 'ML', 'Hackathon'] },
];

export const jobs: Job[] = [
  { id: '1', title: 'Senior Frontend Developer', company: 'Acme Corp', location: 'New York, US', type: 'full-time', salary: '$120k - $160k', posted: '2025-12-20', tags: ['React', 'TypeScript', 'GraphQL'], featured: true },
  { id: '2', title: 'DevOps Engineer', company: 'CloudBase', location: 'Remote', type: 'full-time', salary: '$110k - $140k', posted: '2025-12-19', tags: ['AWS', 'Kubernetes', 'Terraform'], featured: true },
  { id: '3', title: 'UI/UX Designer', company: 'DesignHub', location: 'London, UK', type: 'full-time', salary: '£65k - £85k', posted: '2025-12-18', tags: ['Figma', 'Design Systems', 'User Research'], featured: false },
  { id: '4', title: 'Backend Developer', company: 'DataFlow', location: 'Berlin, DE', type: 'contract', salary: '€80k - €100k', posted: '2025-12-17', tags: ['Node.js', 'PostgreSQL', 'Redis'], featured: false },
  { id: '5', title: 'Product Manager', company: 'StartupXYZ', location: 'San Francisco, US', type: 'full-time', salary: '$130k - $170k', posted: '2025-12-16', tags: ['Strategy', 'Agile', 'Analytics'], featured: true },
  { id: '6', title: 'Data Analyst', company: 'Analytix', location: 'Remote', type: 'part-time', salary: '$50k - $70k', posted: '2025-12-15', tags: ['SQL', 'Python', 'Tableau'], featured: false },
];

export const calendarEvents: CalendarEvent[] = [
  { id: '1', title: 'Team standup', start: '2025-12-22T09:00:00', end: '2025-12-22T09:30:00', color: '#6366f1', allDay: false },
  { id: '2', title: 'Sprint review', start: '2025-12-22T14:00:00', end: '2025-12-22T15:00:00', color: '#0ea5e9', allDay: false },
  { id: '3', title: 'Product launch', start: '2025-12-25T00:00:00', end: '2025-12-25T23:59:00', color: '#22c55e', allDay: true },
  { id: '4', title: 'Design workshop', start: '2025-12-23T10:00:00', end: '2025-12-23T12:00:00', color: '#f59e0b', allDay: false },
  { id: '5', title: 'Holiday party', start: '2025-12-24T18:00:00', end: '2025-12-24T22:00:00', color: '#ec4899', allDay: false },
];

export const campaigns: Campaign[] = [
  { id: '1', name: 'Holiday Sale 2025', status: 'active', type: 'Email', sent: 24500, opened: 14200, clicked: 3800, conversion: 8.2, startDate: '2025-12-15' },
  { id: '2', name: 'New Year Promo', status: 'draft', type: 'Email', sent: 0, opened: 0, clicked: 0, conversion: 0, startDate: '2025-12-28' },
  { id: '3', name: 'Black Friday', status: 'completed', type: 'Social', sent: 18900, opened: 12400, clicked: 5600, conversion: 12.4, startDate: '2025-11-29' },
  { id: '4', name: 'Product Launch', status: 'active', type: 'Multi-channel', sent: 8200, opened: 5100, clicked: 1900, conversion: 6.8, startDate: '2025-12-20' },
  { id: '5', name: 'Re-engagement', status: 'paused', type: 'Email', sent: 6400, opened: 2100, clicked: 420, conversion: 2.1, startDate: '2025-12-01' },
];

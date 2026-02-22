import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ── Users ──
  const pw = await bcrypt.hash(process.env.SEED_PASSWORD ?? "ChangeMe123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@acme.com" },
    update: {},
    create: { email: "admin@acme.com", name: "Acme Inc.", password: pw, role: "ADMIN", location: "New York, USA", bio: "Building the future of SaaS." },
  });
  const mgr = await prisma.user.upsert({
    where: { email: "manager@acme.com" },
    update: {},
    create: { email: "manager@acme.com", name: "Sales Manager", password: pw, role: "MANAGER", location: "London, UK" },
  });
  await prisma.user.upsert({
    where: { email: "viewer@acme.com" },
    update: {},
    create: { email: "viewer@acme.com", name: "Read Only", password: pw, role: "VIEWER", location: "Berlin, DE" },
  });

  // ── Customers ──
  const custData = [
    { name: "Alex Shatov", email: "alex@company.com", location: "New York, US", orders: 24, spent: 3890, status: "active" },
    { name: "Philip Harbach", email: "philip@company.com", location: "Berlin, DE", orders: 18, spent: 2767, status: "active" },
    { name: "Mirko Fisuk", email: "mirko@company.com", location: "Paris, FR", orders: 9, spent: 1220, status: "inactive" },
    { name: "Olga Semklo", email: "olga@company.com", location: "London, UK", orders: 32, spent: 4580, status: "active" },
    { name: "Burak Long", email: "burak@company.com", location: "Istanbul, TR", orders: 5, spent: 862, status: "pending" },
    { name: "Mary Rosales", email: "mary@company.com", location: "Madrid, ES", orders: 14, spent: 2340, status: "active" },
    { name: "Rodrigo Bauer", email: "rodrigo@company.com", location: "São Paulo, BR", orders: 7, spent: 1128, status: "inactive" },
    { name: "Sara Kinsella", email: "sara@company.com", location: "Dublin, IE", orders: 21, spent: 3190, status: "active" },
    { name: "Yuki Tanaka", email: "yuki@company.com", location: "Tokyo, JP", orders: 16, spent: 2890, status: "active" },
    { name: "Lars Eriksson", email: "lars@company.com", location: "Stockholm, SE", orders: 3, spent: 480, status: "pending" },
  ];
  await prisma.customer.deleteMany();
  const customers = await Promise.all(custData.map((c) => prisma.customer.create({ data: { ...c, lastOrder: new Date("2025-12-18") } })));

  // ── Orders ──
  const orderData = [
    { customer: "Alex Shatov", status: "COMPLETED" as const, items: 3, total: 489, paymentMethod: "Visa •••• 4242" },
    { customer: "Philip Harbach", status: "PROCESSING" as const, items: 1, total: 129, paymentMethod: "PayPal" },
    { customer: "Olga Semklo", status: "COMPLETED" as const, items: 5, total: 890, paymentMethod: "Mastercard •••• 8888" },
    { customer: "Mirko Fisuk", status: "CANCELLED" as const, items: 2, total: 245, paymentMethod: "Visa •••• 1234" },
    { customer: "Sara Kinsella", status: "COMPLETED" as const, items: 1, total: 67, paymentMethod: "Apple Pay" },
    { customer: "Burak Long", status: "REFUNDED" as const, items: 4, total: 512, paymentMethod: "Visa •••• 5678" },
    { customer: "Mary Rosales", status: "PENDING" as const, items: 2, total: 198, paymentMethod: "PayPal" },
    { customer: "Yuki Tanaka", status: "COMPLETED" as const, items: 3, total: 340, paymentMethod: "Visa •••• 9999" },
    { customer: "Lars Eriksson", status: "PROCESSING" as const, items: 1, total: 89, paymentMethod: "Mastercard •••• 3333" },
    { customer: "Rodrigo Bauer", status: "COMPLETED" as const, items: 6, total: 1240, paymentMethod: "PayPal" },
  ];
  await prisma.order.deleteMany();
  for (let i = 0; i < orderData.length; i++) {
    const o = orderData[i];
    const cust = customers.find((c) => c.name === o.customer);
    await prisma.order.create({
      data: { customer: o.customer, customerId: cust?.id, date: new Date(Date.now() - i * 86400000), status: o.status, items: o.items, total: o.total, paymentMethod: o.paymentMethod },
    });
  }

  // ── Invoices ──
  const invData = [
    { number: "INV-0001", customer: "Alex Shatov", dueDate: "2025-12-31", status: "PAID" as const, amount: 3890 },
    { number: "INV-0002", customer: "Philip Harbach", dueDate: "2026-01-04", status: "DUE" as const, amount: 2767 },
    { number: "INV-0003", customer: "Mirko Fisuk", dueDate: "2025-12-15", status: "OVERDUE" as const, amount: 1220 },
    { number: "INV-0004", customer: "Olga Semklo", dueDate: "2026-01-09", status: "PAID" as const, amount: 4580 },
    { number: "INV-0005", customer: "Burak Long", dueDate: "2026-01-11", status: "DRAFT" as const, amount: 862 },
    { number: "INV-0006", customer: "Sara Kinsella", dueDate: "2026-01-13", status: "DUE" as const, amount: 3190 },
    { number: "INV-0007", customer: "Yuki Tanaka", dueDate: "2026-01-14", status: "PAID" as const, amount: 2890 },
    { number: "INV-0008", customer: "Mary Rosales", dueDate: "2026-01-15", status: "DUE" as const, amount: 2340 },
  ];
  await prisma.invoice.deleteMany();
  for (const inv of invData) {
    const cust = customers.find((c) => c.name === inv.customer);
    await prisma.invoice.create({
      data: { number: inv.number, customer: inv.customer, customerId: cust?.id, date: new Date(), dueDate: new Date(inv.dueDate), status: inv.status, amount: inv.amount },
    });
  }

  // ── Products ──
  await prisma.product.deleteMany();
  const prods = [
    { name: "Form Builder CP", category: "Software", price: 89, stock: 248, rating: 4.8, status: "ACTIVE" as const, description: "A powerful form builder for creating custom forms with drag-and-drop." },
    { name: "Visual Studio X", category: "Development", price: 149, stock: 124, rating: 4.6, status: "ACTIVE" as const, description: "Next-gen IDE with AI-powered code completion." },
    { name: "Analytics Plus", category: "Analytics", price: 59, stock: 0, rating: 4.2, status: "DRAFT" as const, description: "Advanced analytics dashboard for business intelligence." },
    { name: "Server Monitor", category: "DevOps", price: 39, stock: 512, rating: 4.9, status: "ACTIVE" as const, description: "Real-time server monitoring and alerting system." },
    { name: "Design System Kit", category: "Design", price: 199, stock: 67, rating: 4.7, status: "ACTIVE" as const, description: "Complete design system with 500+ components." },
    { name: "Cloud Storage Pro", category: "Storage", price: 29, stock: 1024, rating: 4.4, status: "ACTIVE" as const, description: "Secure cloud storage with end-to-end encryption." },
    { name: "API Gateway", category: "Development", price: 79, stock: 310, rating: 4.5, status: "ACTIVE" as const, description: "High-performance API gateway with rate limiting." },
    { name: "Email Templates", category: "Marketing", price: 49, stock: 0, rating: 3.9, status: "ARCHIVED" as const, description: "Beautiful responsive email templates." },
  ];
  for (const p of prods) await prisma.product.create({ data: p });

  // ── Transactions ──
  await prisma.transaction.deleteMany();
  const txData = [
    { description: "Subscription payment", amount: 89, type: "CREDIT" as const, status: "COMPLETED" as const, category: "Revenue" },
    { description: "Server hosting", amount: 249, type: "DEBIT" as const, status: "COMPLETED" as const, category: "Infrastructure" },
    { description: "Pro plan upgrade", amount: 149, type: "CREDIT" as const, status: "COMPLETED" as const, category: "Revenue" },
    { description: "Ad campaign", amount: 500, type: "DEBIT" as const, status: "PENDING" as const, category: "Marketing" },
    { description: "Affiliate payout", amount: 120, type: "DEBIT" as const, status: "COMPLETED" as const, category: "Commissions" },
    { description: "Enterprise license", amount: 599, type: "CREDIT" as const, status: "COMPLETED" as const, category: "Revenue" },
    { description: "Domain renewal", amount: 14, type: "DEBIT" as const, status: "COMPLETED" as const, category: "Infrastructure" },
    { description: "Refund – Order #004", amount: 245, type: "DEBIT" as const, status: "COMPLETED" as const, category: "Refunds" },
    { description: "Consultation fee", amount: 350, type: "CREDIT" as const, status: "PENDING" as const, category: "Services" },
    { description: "Software license", amount: 79, type: "DEBIT" as const, status: "CANCELLED" as const, category: "Tools" },
  ];
  for (let i = 0; i < txData.length; i++) {
    await prisma.transaction.create({ data: { ...txData[i], date: new Date(Date.now() - i * 86400000) } });
  }

  // ── Tasks ──
  await prisma.task.deleteMany();
  const taskData = [
    { title: "Product page redesign", status: "TODO" as const, priority: "HIGH" as const, assignee: "Alex Shatov", dueDate: "2025-12-28", tags: ["Design", "UI"] },
    { title: "Update API documentation", status: "TODO" as const, priority: "MEDIUM" as const, assignee: "Philip Harbach", dueDate: "2025-12-30", tags: ["Docs"] },
    { title: "Fix checkout flow bug", status: "IN_PROGRESS" as const, priority: "URGENT" as const, assignee: "Sara Kinsella", dueDate: "2025-12-24", tags: ["Bug", "E-Commerce"] },
    { title: "Implement dark mode", status: "IN_PROGRESS" as const, priority: "MEDIUM" as const, assignee: "Yuki Tanaka", tags: ["Feature", "UI"] },
    { title: "Database optimization", status: "REVIEW" as const, priority: "HIGH" as const, assignee: "Burak Long", dueDate: "2025-12-26", tags: ["Backend", "Performance"] },
    { title: "Add unit tests for auth", status: "REVIEW" as const, priority: "MEDIUM" as const, assignee: "Mirko Fisuk", tags: ["Testing"] },
    { title: "Deploy v2.0 to staging", status: "DONE" as const, priority: "HIGH" as const, assignee: "Olga Semklo", tags: ["DevOps"] },
    { title: "Customer onboarding flow", status: "DONE" as const, priority: "MEDIUM" as const, assignee: "Mary Rosales", tags: ["Feature", "UX"] },
    { title: "SSL certificate renewal", status: "TODO" as const, priority: "URGENT" as const, assignee: "Lars Eriksson", dueDate: "2025-12-25", tags: ["Security"] },
    { title: "Mobile responsive fixes", status: "IN_PROGRESS" as const, priority: "LOW" as const, assignee: "Rodrigo Bauer", tags: ["Bug", "Mobile"] },
  ];
  for (const t of taskData) {
    await prisma.task.create({
      data: {
        title: t.title, status: t.status, priority: t.priority, tags: t.tags,
        dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
        assignedUserId: admin.id, createdById: admin.id,
      },
    });
  }

  // ── Conversations & Messages ──
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  const convos = [
    { participantName: "Alex Shatov", lastMessage: "Hey, can you review the new dashboard?", unreadCount: 2, online: true },
    { participantName: "Sara Kinsella", lastMessage: "The checkout bug is fixed now.", unreadCount: 0, online: true },
    { participantName: "Philip Harbach", lastMessage: "Sent the API docs for review.", unreadCount: 1, online: false },
    { participantName: "Olga Semklo", lastMessage: "Deployment is complete!", unreadCount: 0, online: false },
    { participantName: "Yuki Tanaka", lastMessage: "Dark mode is looking great 🌙", unreadCount: 0, online: true },
  ];
  for (let i = 0; i < convos.length; i++) {
    const c = convos[i];
    const convo = await prisma.conversation.create({
      data: { participantName: c.participantName, lastMessage: c.lastMessage, lastMessageTime: new Date(Date.now() - i * 3600000), unreadCount: c.unreadCount, online: c.online },
    });
    if (i === 0) {
      await prisma.message.createMany({
        data: [
          { conversationId: convo.id, senderName: "Alex Shatov", content: "Hey, can you review the new dashboard?", read: false },
          { conversationId: convo.id, senderId: admin.id, senderName: "You", content: "Sure, I'll take a look now.", read: true },
          { conversationId: convo.id, senderName: "Alex Shatov", content: "Great, let me know if you have any feedback.", read: false },
        ],
      });
    }
  }

  // ── Community Users ──
  await prisma.communityUser.deleteMany();
  const cuData = [
    { name: "Dominik McNeail", handle: "@dominik", location: "New York, US", bio: "Full-stack developer passionate about clean architecture.", followers: 1420, following: 210, posts: 48, bgColor: "#6366f1" },
    { name: "Ivan Mesaroš", handle: "@ivan", location: "Zagreb, HR", bio: "UI/UX designer crafting beautiful interfaces.", followers: 890, following: 145, posts: 32, bgColor: "#0ea5e9" },
    { name: "Tisha Yanchev", handle: "@tisha", location: "Sofia, BG", bio: "DevOps engineer automating everything.", followers: 650, following: 98, posts: 21, bgColor: "#22c55e" },
    { name: "Jerzy Wierzy", handle: "@jerzy", location: "Warsaw, PL", bio: "Backend developer building scalable APIs.", followers: 1200, following: 180, posts: 67, bgColor: "#f59e0b" },
    { name: "Mirko Grewing", handle: "@mirko", location: "Munich, DE", bio: "Product manager turning ideas into reality.", followers: 2100, following: 320, posts: 89, bgColor: "#ec4899" },
    { name: "Tara Šimunović", handle: "@tara", location: "Berlin, DE", bio: "Data scientist exploring ML frontiers.", followers: 780, following: 120, posts: 15, bgColor: "#8b5cf6" },
  ];
  for (const u of cuData) await prisma.communityUser.create({ data: u });

  // ── Feed Posts ──
  await prisma.feedPost.deleteMany();
  const fpData = [
    { author: "Dominik McNeail", content: "Just shipped a new feature! The real-time analytics dashboard is live. Check it out and let me know what you think. 🚀", likes: 42, comments: 8, shares: 3 },
    { author: "Ivan Mesaroš", content: "Working on a new design system. Here's a sneak peek at the component library. Over 200 components built with accessibility in mind.", likes: 89, comments: 15, shares: 12 },
    { author: "Tisha Yanchev", content: "Automated our entire CI/CD pipeline. Deployments went from 45 minutes to 3 minutes. Infrastructure as code FTW! 🔧", likes: 67, comments: 11, shares: 7 },
  ];
  for (let i = 0; i < fpData.length; i++) {
    await prisma.feedPost.create({ data: { ...fpData[i], createdAt: new Date(Date.now() - i * 86400000) } });
  }

  // ── Forum Posts ──
  await prisma.forumPost.deleteMany();
  const forumData = [
    { title: "Best practices for React state management in 2025", author: "Dominik McNeail", category: "Development", replies: 24, views: 1420, pinned: true },
    { title: "How to optimize PostgreSQL queries for large datasets", author: "Jerzy Wierzy", category: "Database", replies: 18, views: 890, pinned: false },
    { title: "Figma vs Sketch in 2025 – which do you prefer?", author: "Ivan Mesaroš", category: "Design", replies: 45, views: 2340, pinned: false },
    { title: "Kubernetes vs Docker Swarm for small teams", author: "Tisha Yanchev", category: "DevOps", replies: 31, views: 1650, pinned: true },
    { title: "Tips for remote team collaboration", author: "Mirko Grewing", category: "General", replies: 56, views: 3200, pinned: false },
  ];
  for (const f of forumData) await prisma.forumPost.create({ data: f });

  // ── Meetups ──
  await prisma.meetup.deleteMany();
  const meetupData = [
    { title: "React Summit 2026", description: "The biggest React conference in Europe.", date: "2026-03-15", location: "Amsterdam, NL", attendees: 840, maxAttendees: 1000, tags: ["React", "JavaScript", "Frontend"] },
    { title: "DevOps Days Berlin", description: "Community-driven DevOps conference.", date: "2026-02-10", location: "Berlin, DE", attendees: 320, maxAttendees: 500, tags: ["DevOps", "Cloud", "CI/CD"] },
    { title: "UX Design Workshop", description: "Hands-on workshop on user research and prototyping.", date: "2026-01-20", location: "Online", attendees: 120, maxAttendees: 150, tags: ["UX", "Design", "Workshop"] },
    { title: "AI/ML Hackathon", description: "Build AI-powered solutions in 48 hours.", date: "2026-04-05", location: "San Francisco, US", attendees: 200, maxAttendees: 250, tags: ["AI", "ML", "Hackathon"] },
  ];
  for (const m of meetupData) await prisma.meetup.create({ data: { ...m, date: new Date(m.date) } });

  // ── Jobs ──
  await prisma.job.deleteMany();
  const jobData = [
    { title: "Senior Frontend Developer", company: "Acme Corp", location: "New York, US", type: "FULL_TIME" as const, salary: "$120k - $160k", tags: ["React", "TypeScript", "GraphQL"], featured: true },
    { title: "DevOps Engineer", company: "CloudBase", location: "Remote", type: "FULL_TIME" as const, salary: "$110k - $140k", tags: ["AWS", "Kubernetes", "Terraform"], featured: true },
    { title: "UI/UX Designer", company: "DesignHub", location: "London, UK", type: "FULL_TIME" as const, salary: "£65k - £85k", tags: ["Figma", "Design Systems", "User Research"], featured: false },
    { title: "Backend Developer", company: "DataFlow", location: "Berlin, DE", type: "CONTRACT" as const, salary: "€80k - €100k", tags: ["Node.js", "PostgreSQL", "Redis"], featured: false },
    { title: "Product Manager", company: "StartupXYZ", location: "San Francisco, US", type: "FULL_TIME" as const, salary: "$130k - $170k", tags: ["Strategy", "Agile", "Analytics"], featured: true },
    { title: "Data Analyst", company: "Analytix", location: "Remote", type: "PART_TIME" as const, salary: "$50k - $70k", tags: ["SQL", "Python", "Tableau"], featured: false },
  ];
  for (let i = 0; i < jobData.length; i++) {
    await prisma.job.create({ data: { ...jobData[i], posted: new Date(Date.now() - i * 86400000) } });
  }

  // ── Calendar Events ──
  await prisma.calendarEvent.deleteMany();
  const now = new Date();
  const evData = [
    { title: "Team standup", start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30), color: "#6366f1", allDay: false },
    { title: "Sprint review", start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0), color: "#0ea5e9", allDay: false },
    { title: "Product launch", start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 0, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59), color: "#22c55e", allDay: true },
    { title: "Design workshop", start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12, 0), color: "#f59e0b", allDay: false },
    { title: "Holiday party", start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 18, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 22, 0), color: "#ec4899", allDay: false },
  ];
  for (const e of evData) await prisma.calendarEvent.create({ data: e });

  // ── Campaigns ──
  await prisma.campaign.deleteMany();
  const campData = [
    { name: "Holiday Sale 2025", status: "ACTIVE" as const, type: "Email", sent: 24500, opened: 14200, clicked: 3800, conversion: 8.2, startDate: "2025-12-15" },
    { name: "New Year Promo", status: "DRAFT" as const, type: "Email", sent: 0, opened: 0, clicked: 0, conversion: 0, startDate: "2025-12-28" },
    { name: "Black Friday", status: "COMPLETED" as const, type: "Social", sent: 18900, opened: 12400, clicked: 5600, conversion: 12.4, startDate: "2025-11-29" },
    { name: "Product Launch", status: "ACTIVE" as const, type: "Multi-channel", sent: 8200, opened: 5100, clicked: 1900, conversion: 6.8, startDate: "2025-12-20" },
    { name: "Re-engagement", status: "PAUSED" as const, type: "Email", sent: 6400, opened: 2100, clicked: 420, conversion: 2.1, startDate: "2025-12-01" },
  ];
  for (const c of campData) await prisma.campaign.create({ data: { ...c, startDate: new Date(c.startDate) } });

  // ── Notifications ──
  await prisma.notification.deleteMany();
  const notifData = [
    { type: "INFO" as const, title: "Welcome!", message: "Your account is ready to use." },
    { type: "SUCCESS" as const, title: "Payment received", message: "$2,450 from Alex Shatov." },
    { type: "WARNING" as const, title: "Server usage high", message: "CPU usage exceeded 90%." },
    { type: "INFO" as const, title: "New feature", message: "Dark mode is now available.", read: true },
  ];
  for (let i = 0; i < notifData.length; i++) {
    const n = notifData[i];
    await prisma.notification.create({
      data: { userId: admin.id, type: n.type, title: n.title, message: n.message, read: n.read ?? false, createdAt: new Date(Date.now() - i * 600000) },
    });
  }

  console.log("✅ Seed complete");
  console.log(`   Admin: admin@acme.com / ${process.env.SEED_PASSWORD ?? "ChangeMe123!"}`);
  console.log(`   Manager: manager@acme.com / ${process.env.SEED_PASSWORD ?? "ChangeMe123!"}`);
  console.log(`   Viewer: viewer@acme.com / ${process.env.SEED_PASSWORD ?? "ChangeMe123!"}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });

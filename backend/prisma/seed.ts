import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient, Role, DealStatus, TaskStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function upsertUser(email: string, name: string, role: Role, password: string) {
  const hash = await bcrypt.hash(password, 12);
  return prisma.user.upsert({
    where: { email },
    update: { name, role, password: hash },
    create: { email, name, role, password: hash },
  });
}

async function main() {
  const seedPassword = process.env.SEED_PASSWORD ?? "ChangeMe123!";

  const admin = await upsertUser("admin@crm.local", "System Admin", Role.ADMIN, seedPassword);
  const manager = await upsertUser("manager@crm.local", "Sales Manager", Role.MANAGER, seedPassword);
  const viewer = await upsertUser("viewer@crm.local", "Read Only User", Role.VIEWER, seedPassword);

  const client = await prisma.client.upsert({
    where: { id: "seed-client-1" },
    update: {},
    create: {
      id: "seed-client-1",
      name: "Acme Corp",
      email: "contact@acme.example",
      phone: "+1-555-0101",
      company: "Acme Corp",
      source: "Website",
      assignedManagerId: manager.id,
    },
  });

  const deal = await prisma.deal.upsert({
    where: { id: "seed-deal-1" },
    update: {},
    create: {
      id: "seed-deal-1",
      title: "Q1 Platform Subscription",
      amount: 15000,
      status: DealStatus.PROPOSAL,
      clientId: client.id,
      managerId: manager.id,
      notes: "Interested in annual billing with onboarding.",
    },
  });

  await prisma.task.upsert({
    where: { id: "seed-task-1" },
    update: {},
    create: {
      id: "seed-task-1",
      title: "Follow up proposal feedback",
      description: "Schedule a review call and update the deal note.",
      status: TaskStatus.TODO,
      assignedUserId: manager.id,
      createdById: admin.id,
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: admin.id,
      action: "seeded-initial-data",
      entityType: "Deal",
      entityId: deal.id,
      metadata: { viewerId: viewer.id },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

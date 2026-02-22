import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import customersRoutes from "../modules/customers/customers.routes";
import ordersRoutes from "../modules/orders/orders.routes";
import invoicesRoutes from "../modules/invoices/invoices.routes";
import productsRoutes from "../modules/products/products.routes";
import transactionsRoutes from "../modules/transactions/transactions.routes";
import tasksRoutes from "../modules/tasks/tasks.routes";
import conversationsRoutes from "../modules/conversations/conversations.routes";
import communityRoutes from "../modules/community/community.routes";
import jobsRoutes from "../modules/jobs/jobs.routes";
import calendarRoutes from "../modules/calendar/calendar.routes";
import campaignsRoutes from "../modules/campaigns/campaigns.routes";
import notificationsRoutes from "../modules/notifications/notifications.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "mosaic-backend", timestamp: new Date().toISOString() });
});

router.use("/auth", authRoutes);
router.use("/customers", customersRoutes);
router.use("/orders", ordersRoutes);
router.use("/invoices", invoicesRoutes);
router.use("/products", productsRoutes);
router.use("/transactions", transactionsRoutes);
router.use("/tasks", tasksRoutes);
router.use("/conversations", conversationsRoutes);
router.use("/community", communityRoutes);
router.use("/jobs", jobsRoutes);
router.use("/calendar", calendarRoutes);
router.use("/campaigns", campaignsRoutes);
router.use("/notifications", notificationsRoutes);

export default router;

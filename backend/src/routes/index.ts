import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import usersRoutes from "../modules/users/users.routes";
import clientsRoutes from "../modules/clients/clients.routes";
import dealsRoutes from "../modules/deals/deals.routes";
import tasksRoutes from "../modules/tasks/tasks.routes";
import activityRoutes from "../modules/activity/activity.routes";
import analyticsRoutes from "../modules/analytics/analytics.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "crm-backend" });
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/clients", clientsRoutes);
router.use("/deals", dealsRoutes);
router.use("/tasks", tasksRoutes);
router.use("/activities", activityRoutes);
router.use("/analytics", analyticsRoutes);

export default router;

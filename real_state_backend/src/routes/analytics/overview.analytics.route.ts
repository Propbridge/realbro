import express from "express";
import { authMiddleware } from "../../middleware/auth";
import { requireAdminOrSuperAdmin } from "../../middleware/staff";
import { getOverviewAnalytics } from "../../controllers/analytics/overview.analytics";

const router = express.Router();

router.get("/overview", authMiddleware, requireAdminOrSuperAdmin, getOverviewAnalytics);

export default router;

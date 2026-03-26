import express from "express";
import userAnalytics from "./user.analytics.route";
import propertiesAnalytics from "./properties.analytics.route";
import financialsAnalytics from "./financials.analytics.route";
import overviewAnalytics from "./overview.analytics.route";

const router = express.Router();

router.use("/analytics", userAnalytics);
router.use("/analytics", propertiesAnalytics);
router.use("/analytics", financialsAnalytics);
router.use("/analytics", overviewAnalytics);

export default router;
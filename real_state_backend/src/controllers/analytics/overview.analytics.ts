import { Request, Response } from "express";
import { getAnalyticsOverview } from "../../services/analytics/overview.analytics.service";

export async function getOverviewAnalytics(req: Request, res: Response) {
  try {
    const data = await getAnalyticsOverview();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Overview analytics error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

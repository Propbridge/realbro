import { prisma } from "../../config/prisma";

type AnalyticsOverview = {
  activeListings: number;
  totalUsers: number;
  activeRequirements: number;
  revenue: number;
  payableGems: number;
};

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  const [
    activeUserListings,
    activeExclusiveListings,
    totalUsers,
    activeRequirements,
    soldOutExclusiveRevenue,
    totalPaidGems,
  ] = await Promise.all([
    prisma.property.count({
      where: {
        status: "ACTIVE",
      },
    }),
    prisma.exclusiveProperty.count({
      where: {
        status: "ACTIVE",
      },
    }),
    prisma.user.count(),
    prisma.propertyRequirement.count({
      where: {
        status: "ACTIVE",
      },
    }),
    prisma.exclusiveProperty.aggregate({
      where: {
        status: "SOLD_OUT",
      },
      _sum: {
        listingPrice: true,
      },
    }),
    prisma.gemTransaction.aggregate({
      where: {
        txnType: "CREDIT",
      },
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    activeListings: activeUserListings + activeExclusiveListings,
    totalUsers,
    activeRequirements,
    revenue: soldOutExclusiveRevenue._sum.listingPrice ?? 0,
    payableGems: totalPaidGems._sum.amount ?? 0,
  };
}

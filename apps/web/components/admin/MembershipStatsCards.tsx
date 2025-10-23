"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@uwdsc/ui";
import { Users, DollarSign, GraduationCap } from "lucide-react";
import type { MembershipStats } from "@/types/api";

interface MembershipStatsCardsProps {
  stats: MembershipStats;
}

export function MembershipStatsCards({ stats }: MembershipStatsCardsProps) {
  const paidPercentage =
    stats.totalUsers > 0
      ? ((stats.paidUsers / stats.totalUsers) * 100).toFixed(1)
      : "0.0";

  const mathSocPercentage =
    stats.paidUsers > 0
      ? ((stats.mathSocMembers / stats.paidUsers) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      {/* Total Users */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground">Registered members</p>
        </CardContent>
      </Card>

      {/* Paid Users */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Members</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.paidUsers}</div>
          <p className="text-xs text-muted-foreground">
            {paidPercentage}% of total users
          </p>
        </CardContent>
      </Card>

      {/* MathSoc Members */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">MathSoc Members</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.mathSocMembers}</div>
          <p className="text-xs text-muted-foreground">
            {mathSocPercentage}% of paid users
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

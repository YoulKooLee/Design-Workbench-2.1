import React from "react";
import { MetricCard } from "../metric-card";
import { RevenueChart } from "../charts/revenue-chart";
import { PipelineOverview } from "../charts/pipeline-overview";
import { RecentDeals } from "../recent-deals";
import { TopPerformers } from "../top-performers";
import { DollarSign, TrendingUp, Users, Target } from "lucide-react";

export function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="总收入"
          value="$2.4M"
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
          delay={0}
        />
        <MetricCard
          title="转化率"
          value="24.8%"
          change="+3.2%"
          changeType="positive"
          icon={TrendingUp}
          delay={1}
        />
        <MetricCard
          title="活跃交易"
          value="147"
          change="-5"
          changeType="negative"
          icon={Target}
          delay={2}
        />
        <MetricCard
          title="新增线索"
          value="892"
          change="+18.3%"
          changeType="positive"
          icon={Users}
          delay={3}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <PipelineOverview />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDeals />
        <TopPerformers />
      </div>
    </div>
  );
}

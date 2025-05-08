"use client";

import { VisitorsPieChart } from "@/components/dashboard/pie-chart";
import { SkillProgressChart } from "@/components/dashboard/skill-progress-chart";
import { LearnersAgeChart } from "@/components/dashboard/learners-age-chart";
import { MessagesActivityChart } from "@/components/dashboard/messages-activity-chart";
import { PopularTopicsChart } from "@/components/dashboard/popular-topics-chart";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VisitorsPieChart />
        <SkillProgressChart />
        <LearnersAgeChart />
        <MessagesActivityChart />
        <PopularTopicsChart />
      </div>
    </div>
  );
}

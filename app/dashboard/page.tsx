"use client";

import { VisitorsPieChart } from "@/components/dashboard/pie-chart";
import { SkillProgressChart } from "@/components/dashboard/skill-progress-chart";
import { UserEngagementChart } from "@/components/dashboard/user-engagement-chart";
import { LessonCompletionChart } from "@/components/dashboard/lesson-completion-chart";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VisitorsPieChart />
        <SkillProgressChart />
        <UserEngagementChart />
        <LessonCompletionChart />
      </div>
    </div>
  );
}

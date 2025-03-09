"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const monthlyEngagementData = [
  { date: "2024-01", users: 1200, sessions: 3800, avgDuration: 45 },
  { date: "2024-02", users: 1350, sessions: 4200, avgDuration: 48 },
  { date: "2024-03", users: 1500, sessions: 4600, avgDuration: 52 },
  { date: "2024-04", users: 1800, sessions: 5100, avgDuration: 55 },
  { date: "2024-05", users: 2100, sessions: 5800, avgDuration: 58 },
  { date: "2024-06", users: 2400, sessions: 6200, avgDuration: 60 },
];

export function UserEngagementChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly User Engagement</CardTitle>
        <CardDescription>Active users and session trends</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart
          width={400}
          height={300}
          data={monthlyEngagementData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="hsl(var(--chart-1))" />
          <Line type="monotone" dataKey="sessions" stroke="hsl(var(--chart-2))" />
        </LineChart>
      </CardContent>
    </Card>
  );
} 
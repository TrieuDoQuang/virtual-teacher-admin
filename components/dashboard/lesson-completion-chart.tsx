"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const lessonCompletionData = [
  { month: "Jan", completed: 65, ongoing: 35, dropped: 10 },
  { month: "Feb", completed: 75, ongoing: 45, dropped: 8 },
  { month: "Mar", completed: 85, ongoing: 55, dropped: 12 },
  { month: "Apr", completed: 95, ongoing: 65, dropped: 15 },
  { month: "May", completed: 105, ongoing: 75, dropped: 11 },
  { month: "Jun", completed: 115, ongoing: 85, dropped: 9 },
];

export function LessonCompletionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lesson Completion Trends</CardTitle>
        <CardDescription>Monthly completion and dropout rates</CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChart
          width={400}
          height={300}
          data={lessonCompletionData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorOngoing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="completed" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorCompleted)" />
          <Area type="monotone" dataKey="ongoing" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorOngoing)" />
        </AreaChart>
      </CardContent>
    </Card>
  );
} 
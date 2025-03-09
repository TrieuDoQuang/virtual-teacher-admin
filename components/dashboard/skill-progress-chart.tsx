"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const skillProgressData = [
  { name: "Speaking", score: 85 },
  { name: "Listening", score: 78 },
  { name: "Reading", score: 92 },
  { name: "Writing", score: 88 },
  { name: "Grammar", score: 75 },
];

export function SkillProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Language Skills Progress</CardTitle>
        <CardDescription>Average scores across different skills</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          width={400}
          height={300}
          data={skillProgressData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
            {skillProgressData.map((entry, index) => (
              <Cell key={index} fill={`hsl(var(--chart-${index + 1}))`} />
            ))}
          </Bar>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </CardContent>
    </Card>
  );
} 
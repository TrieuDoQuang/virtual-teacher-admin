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

const colors = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--destructive))",
  "hsl(var(--muted))",
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
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {skillProgressData.map((entry, index) => (
              <Cell 
                key={index} 
                fill={colors[index]} 
                fillOpacity={0.9}
              />
            ))}
          </Bar>
          <XAxis 
            dataKey="name" 
            stroke="currentColor"
            tick={{ fill: "currentColor" }}
          />
          <YAxis 
            stroke="currentColor"
            tick={{ fill: "currentColor" }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            contentStyle={{ 
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              color: "#1a1a1a",
              borderRadius: "6px",
              padding: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              zIndex: 9999,
              fontSize: "14px",
              fontWeight: "500"
            }}
            wrapperStyle={{ outline: 'none' }}
            labelStyle={{ 
              color: "#1a1a1a",
              fontWeight: "600",
              marginBottom: "4px"
            }}
            formatter={(value) => [`${value}%`, 'Score']}
            labelFormatter={(label) => `Skill: ${label}`}
          />
        </BarChart>
      </CardContent>
    </Card>
  );
} 
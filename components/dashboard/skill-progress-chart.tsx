"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { lessonsByLevel } from "@/services/staticService";

const colors = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--destructive))",
  "hsl(var(--muted))",
  "hsl(var(--popover))",
  "hsl(var(--card))",
];

export function SkillProgressChart() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await lessonsByLevel();
        if (response?.data) {
          // Sort levels in a specific order
          const levelOrder = ["ENTRANCE_TEST", "A1", "A2", "B1", "B2", "C1", "C2"];
          
          const chartData = levelOrder.map(level => ({
            level,
            count: (response.data[level] as number) || 0,
          }));
          
          setData(chartData);
        }
      } catch (error) {
        console.error("Error fetching lessons data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lessons by Level</CardTitle>
          <CardDescription>Distribution of lessons across proficiency levels</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          Loading...
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-lg">
          <p className="font-medium text-sm">Level: {label}</p>
          <p className="text-sm">Lessons: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lessons by Level</CardTitle>
        <CardDescription>Distribution of lessons across proficiency levels</CardDescription>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <div className="relative" style={{ height: "300px" }}>
            <BarChart
              width={400}
              height={300}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="level" 
                stroke="currentColor"
                tick={{ fill: "currentColor" }}
                axisLine={{ stroke: "currentColor", opacity: 0.3 }}
                tickLine={{ stroke: "currentColor", opacity: 0.3 }}
              />
              <YAxis 
                stroke="currentColor"
                tick={{ fill: "currentColor" }}
                axisLine={{ stroke: "currentColor", opacity: 0.3 }}
                tickLine={{ stroke: "currentColor", opacity: 0.3 }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                wrapperStyle={{ 
                  zIndex: 1000, 
                  position: "relative",
                  pointerEvents: "auto" 
                }}
              />
              <Bar 
                dataKey="count" 
                radius={[4, 4, 0, 0]}
                animationDuration={750}
              >
                {data.map((entry: any, index: number) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                    fillOpacity={0.9}
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  );
} 
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { popularLessonsTopics } from "@/services/staticService";

export function PopularTopicsChart() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Add CSS for dark mode chart
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .dark .popular-topics-chart .recharts-bar-rectangle path,
      .dark .popular-topics-chart .recharts-bar-rectangle rect {
        fill: white !important;
        stroke: white !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Set limit to 5 to get top 5 popular topics
        const response = await popularLessonsTopics(5);
        
        if (response && response.data) {
          // Sort data by count in descending order
          const sortedData = response.data.sort((a: any, b: any) => b.count - a.count);
          setData(sortedData);
        }
      } catch (error) {
        console.error("Error fetching popular topics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border border-border rounded-md shadow-lg">
          <p className="font-medium text-sm">Topic: {payload[0].payload.topic}</p>
          <p className="text-sm">Lessons: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle>Popular Lesson Topics</CardTitle>
          <CardDescription>Most frequently used lesson topics</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          Loading...
        </CardContent>
      </Card>
    );
  }

  // Define colors for the bars
  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--destructive))",
    "hsl(var(--muted))",
  ];

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Popular Lesson Topics</CardTitle>
        <CardDescription>Most frequently used lesson topics</CardDescription>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <div className="relative" style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                className="text-foreground popular-topics-chart"
                layout="vertical"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  opacity={0.2}
                  stroke="currentColor"
                />
                <XAxis
                  type="number"
                  stroke="currentColor"
                  tick={{ fill: "currentColor" }}
                  axisLine={{ stroke: "currentColor", opacity: 0.3 }}
                  tickLine={{ stroke: "currentColor", opacity: 0.3 }}
                />
                <YAxis
                  type="category"
                  dataKey="topic"
                  stroke="currentColor"
                  tick={{ fill: "currentColor" }}
                  axisLine={{ stroke: "currentColor", opacity: 0.3 }}
                  tickLine={{ stroke: "currentColor", opacity: 0.3 }}
                  width={150}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                  wrapperStyle={{
                    zIndex: 1000,
                    pointerEvents: "auto",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                  animationDuration={750}
                >
                  {data.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      fillOpacity={1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
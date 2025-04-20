"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { conversationCompletionStats } from "@/services/staticService";

export function LessonCompletionChart() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await conversationCompletionStats();
        if (response?.data) {
          const { total, completed, inProgress, completionRate } = response.data;
          
          // Transform data for chart
          const chartData = [
            { name: "Completed", value: completed, fill: "hsl(var(--primary))" },
            { name: "In Progress", value: inProgress, fill: "hsl(var(--secondary))" },
          ];
          
          setData({ 
            total, 
            chartData,
            completionRate 
          });
        }
      } catch (error) {
        console.error("Error fetching conversation completion data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-lg">
          <p className="font-medium text-sm">{payload[0].name}</p>
          <p className="text-sm">Conversations: {payload[0].value}</p>
          {data?.total && (
            <p className="text-xs text-gray-500">
              {Math.round((payload[0].value / data.total) * 100)}% of total
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conversation Completion</CardTitle>
          <CardDescription>Completed vs. in progress conversations</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          Loading...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation Completion</CardTitle>
        <CardDescription>
          {data?.completionRate ? `Completion rate: ${data.completionRate.toFixed(1)}%` : 'No data available'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data?.chartData && data.chartData.length > 0 ? (
          <div>
            <div className="relative" style={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data.chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    paddingAngle={4}
                  >
                    {data.chartData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={<CustomTooltip />}
                    wrapperStyle={{ 
                      zIndex: 1000, 
                      position: "absolute",
                      pointerEvents: "auto"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {data.chartData.map((entry: any, index: number) => (
                <div key={`stat-${index}`} className="flex flex-col items-center">
                  <div className="text-2xl font-bold">{entry.value}</div>
                  <div className="text-sm text-muted-foreground">{entry.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {Math.round((entry.value / data.total) * 100)}% of total
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-muted-foreground">Total conversations: {data.total}</div>
            </div>
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
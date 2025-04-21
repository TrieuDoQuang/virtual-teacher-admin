"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { interactionCount } from "@/services/staticService";

export function UserEngagementChart() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await interactionCount();
        if (response?.data) {
          const { total, byRole } = response.data;
          
          // Transform data for chart
          const chartData = Object.entries(byRole).map(([role, count]) => ({
            role,
            count: count as number,
          }));
          
          setData({ 
            total, 
            chartData 
          });
        }
      } catch (error) {
        console.error("Error fetching interaction data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-lg">
          <p className="font-medium text-sm">Role: {label}</p>
          <p className="text-sm">Interactions: {payload[0].value}</p>
          <p className="text-xs text-gray-500">
            {Math.round((payload[0].value / data.total) * 100)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle>Interaction Distribution</CardTitle>
          <CardDescription>Total interactions by role</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          Loading...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Interaction Distribution</CardTitle>
        <CardDescription>Total interactions by role <strong>({data?.total || 0} interactions)</strong></CardDescription>
      </CardHeader>
      <CardContent>
        {data?.chartData && data.chartData.length > 0 ? (
          <div>
            <div className="relative" style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data.chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis 
                    dataKey="role" 
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
                      pointerEvents: "auto"
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={750}
                  >
                    {data.chartData.map((entry: any, index: number) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={colors[index % colors.length]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {data.chartData.map((entry: any, index: number) => (
                <div key={`stat-${index}`} className="flex flex-col items-center">
                  <div className="text-2xl font-bold">{entry.count}</div>
                  <div className="text-sm text-muted-foreground">{entry.role}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {Math.round((entry.count / data.total) * 100)}% of total
                  </div>
                </div>
              ))}
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
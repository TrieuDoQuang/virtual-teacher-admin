"use client"

import * as React from "react"
import { PieChart, Pie, Cell, Label, Tooltip, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { learnersByLevel } from "@/services/staticService"

export function VisitorsPieChart() {
  const [data, setData] = useState<any>(null);
  const [totalLearners, setTotalLearners] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await learnersByLevel();
        if (response?.data) {
          // Sort levels in a specific order
          const levelOrder = ["ENTRANCE_TEST", "A1", "A2", "B1", "B2", "C1", "C2"];
          
          const chartData = levelOrder.map((level, index) => ({
            name: level,
            value: (response.data[level] as number) || 0,
            fill: `hsl(var(--chart-${(index % 6) + 1}))`
          }));
          
          const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
          setData(chartData);
          setTotalLearners(total);
        }
      } catch (error) {
        console.error("Error fetching learners data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Learners by Level</CardTitle>
          <CardDescription>Distribution across CEFR levels</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          Loading...
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-lg">
          <p className="font-medium text-sm">Level: {payload[0].name}</p>
          <p className="text-sm">Learners: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Learners by Level</CardTitle>
        <CardDescription>Distribution across CEFR levels</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {data && data.length > 0 ? (
          <div className="relative" style={{ height: "250px" }}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Tooltip 
                  content={<CustomTooltip />}
                  wrapperStyle={{ 
                    zIndex: 1000, 
                    position: "relative",
                    pointerEvents: "auto" 
                  }}
                />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalLearners}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                                Learners
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[250px]">
            No data available
          </div>
        )}
      </CardContent>
      <CardContent className="pt-4">
        {data && data.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {data.filter((entry: {name: string, value: number, fill: string}) => entry.value > 0).map((entry: any, index: number) => (
              <div key={`legend-${index}`} className="flex items-center gap-2">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="text-sm font-medium">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

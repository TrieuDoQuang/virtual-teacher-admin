"use client"

import * as React from "react"
import { PieChart, Pie, Cell, Label, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { learnersByLevel, lessonsByLevel, learnersByAgeGroup } from "@/services/staticService"

interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--primary))",
];

export function VisitorsPieChart() {
  const [data, setData] = useState<ChartDataItem[] | null>(null);
  const [learnerData, setLearnerData] = useState<any>(null);
  const [totalLearners, setTotalLearners] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sort levels in a specific order
        const levelOrder = ["ENTRANCE_TEST", "A1", "A2", "B1", "B2", "C1", "C2"];
        
        // Fetch learners by level data
        const response = await learnersByLevel();
        if (response?.data) {
          const chartData: ChartDataItem[] = levelOrder.map((level, index) => ({
            name: level,
            value: (response.data[level] as number) || 0,
            fill: colors[index % colors.length]
          }));
          
          const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
          setData(chartData);
          setTotalLearners(total);
        }

        // Fetch learners by age group data
        const learnerResponse = await learnersByAgeGroup();
        if (learnerResponse?.data) {
          setLearnerData(learnerResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
          <CardTitle>Learning Analytics</CardTitle>
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
        <div className="bg-background p-3 border border-border rounded-md shadow-lg">
          <p className="font-medium text-sm">Level: {payload[0].name}</p>
          <p className="text-sm">Learners: {payload[0].value}</p>
          <p className="text-sm text-muted-foreground">
            {(payload[0].payload.value / totalLearners * 100).toFixed(0)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomAgeGroupTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-lg">
          <p className="font-medium">Age Group: {label}</p>
          <p className="font-bold">{payload[0].value} learner{payload[0].value !== 1 ? 's' : ''}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Learning Analytics</CardTitle>
        <CardDescription>Distribution across levels and age groups</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          {/* Learners by Level Chart - Pie Chart */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-center">Learners by Level</h3>
            {data && data.length > 0 ? (
              <div className="relative" style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip 
                      content={<CustomTooltip />}
                      wrapperStyle={{ 
                        zIndex: 1000, 
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
                      {data.map((entry, index) => (
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
              <div className="flex items-center justify-center h-[300px]">
                No data available
              </div>
            )}
            <div className="pt-4">
              {data && data.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {data.filter(entry => entry.value > 0).map((entry, index) => (
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

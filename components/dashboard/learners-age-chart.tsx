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
  PieChart,
  Pie,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { learnersByAgeGroup, countMessagesByDay } from "@/services/staticService";

export function LearnersAgeChart() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState("30"); // Default to 30 days
  const [chartType, setChartType] = useState("bar"); // "bar" or "pie"

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // For the learners by age group data
        const ageGroupResponse = await learnersByAgeGroup();
        
        // For the time-based message data
        const messageResponse = await countMessagesByDay(parseInt(timePeriod));
        
        if (ageGroupResponse && ageGroupResponse.data) {
          const chartData = ageGroupResponse.data.map((item: { ageGroup: string; count: number }) => ({
            ageGroup: item.ageGroup,
            count: item.count,
            fill: item.ageGroup === "Under 18" 
              ? "hsl(var(--primary))" 
              : item.ageGroup === "From 18 to 30" 
                ? "hsl(var(--secondary))" 
                : "hsl(var(--accent))",
          }));

          const total = chartData.reduce((acc: number, curr: { count: number }) => acc + curr.count, 0);

          setData({
            total,
            chartData,
            messageData: messageResponse,
            period: timePeriod
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timePeriod]);

  const colors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"];

  const handlePeriodChange = (value: string) => {
    setTimePeriod(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-lg">
          <p className="font-medium text-sm">Age Group: {label || payload[0].name}</p>
          <p className="text-sm">Learners: {payload[0].value}</p>
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
          <CardTitle>Learners by Age Group</CardTitle>
          <CardDescription>Distribution of learners by age</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          Loading...
        </CardContent>
      </Card>
    );
  }

  const renderBarChart = () => (
    <div className="relative" style={{ height: "300px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data.chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            opacity={0.2}
          />
          <XAxis
            dataKey="ageGroup"
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
              pointerEvents: "auto",
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
                fill={entry.fill}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderPieChart = () => (
    <div className="relative" style={{ height: "300px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data.chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            innerRadius={40}
            fill="#8884d8"
            dataKey="count"
            nameKey="ageGroup"
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
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Learners by Age Group</CardTitle>
          <CardDescription>
            Distribution of learners by age{" "}
            <strong>({data?.total || 0} learners)</strong>
          </CardDescription>
        </div>
        
      </CardHeader>
      <CardContent>
        {data?.chartData && data.chartData.length > 0 ? (
          <div>
            <Tabs defaultValue="bar" className="mb-4" onValueChange={setChartType}>
              <TabsList className="grid w-[180px] grid-cols-2 mx-auto">
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                <TabsTrigger value="pie">Pie Chart</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {chartType === "bar" ? renderBarChart() : renderPieChart()}
            
            <div className="mt-4 grid grid-cols-3 gap-4">
              {data.chartData.map((entry: any, index: number) => (
                <div
                  key={`stat-${index}`}
                  className="flex flex-col items-center"
                >
                  <div className="text-2xl font-bold">{entry.count}</div>
                  <div className="text-sm text-muted-foreground">
                    {entry.ageGroup}
                  </div>
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
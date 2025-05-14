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
              ? "var(--chart-color-1)" 
              : item.ageGroup === "From 18 to 30" 
                ? "var(--chart-color-2)" 
                : "var(--chart-color-3)",
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

  // Define colors using CSS variables that will change with theme
  useEffect(() => {
    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    // Set different color values based on the theme
    if (isDarkMode) {
      document.documentElement.style.setProperty('--chart-color-1', '#ffffff'); // White for dark mode
      document.documentElement.style.setProperty('--chart-color-2', '#ffffff');  // Slightly transparent white
      document.documentElement.style.setProperty('--chart-color-3', '#ffffff');  // More transparent white
    } else {
      document.documentElement.style.setProperty('--chart-color-1', '#000000'); // Black for light mode
      document.documentElement.style.setProperty('--chart-color-2', '#000000');  // Slightly transparent black
      document.documentElement.style.setProperty('--chart-color-3', '#000000');  // More transparent black
    }
    
    // Listen for theme changes and update colors accordingly
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkMode = document.documentElement.classList.contains('dark');
          if (isDarkMode) {
            document.documentElement.style.setProperty('--chart-color-1', '#ffffff'); // White for dark mode
            document.documentElement.style.setProperty('--chart-color-2', 'rgba(255, 255, 255, 0.8)');  // Slightly transparent white
            document.documentElement.style.setProperty('--chart-color-3', 'rgba(255, 255, 255, 0.6)');  // More transparent white
          } else {
            document.documentElement.style.setProperty('--chart-color-1', '#000000'); // Black for light mode
            document.documentElement.style.setProperty('--chart-color-2', 'rgba(0, 0, 0, 0.8)');  // Slightly transparent black
            document.documentElement.style.setProperty('--chart-color-3', 'rgba(0, 0, 0, 0.6)');  // More transparent black
          }
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const colors = ["var(--chart-color-1)", "var(--chart-color-2)", "var(--chart-color-3)"];

  const handlePeriodChange = (value: string) => {
    setTimePeriod(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border border-border rounded-md shadow-lg">
          <p className="font-medium text-sm">Age Group: {label || payload[0].name}</p>
          <p className="text-sm">Learners: {payload[0].value}</p>
          <p className="text-xs text-muted-foreground">
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
          className="text-foreground"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            opacity={0.2}
            stroke="currentColor"
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
            fill="var(--chart-color-1)"
            radius={[4, 4, 0, 0]}
            animationDuration={750}
            className="!fill-foreground"
          >
            {data.chartData.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill}
                className="!opacity-90"
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
        <PieChart className="text-foreground">
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
            className="!opacity-90"
          >
            {data.chartData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.fill} className="!opacity-90" />
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
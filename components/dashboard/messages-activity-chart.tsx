"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
import { countMessagesByDay } from "@/services/staticService";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

type MessageData = {
  date: string;
  teacher: number;
  user: number;
  total?: number;
};

export function MessagesActivityChart() {
  const [data, setData] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState("30");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await countMessagesByDay(parseInt(timePeriod));
        
        if (response) {
          // Add a total property to each item
          const formattedData = response.data.map((item: MessageData) => ({
            ...item,
            total: item.teacher + item.user,
            // Format date to display more user-friendly
            date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }));
          
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching messages data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timePeriod]);

  const handleTimePeriodChange = (value: string) => {
    setTimePeriod(value);
  };

  // Custom tooltip to improve visibility of data points
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border border-border rounded-md shadow-lg">
          <p className="font-bold text-base mb-2">{label}</p>
          <div className="space-y-2">
            <p className="text-sm flex items-center">
              <span className="inline-block w-3 h-3 bg-[#8884d8] mr-2 rounded-full"></span>
              Teacher Messages: {payload[0].value}
            </p>
            <p className="text-sm flex items-center">
              <span className="inline-block w-3 h-3 bg-[#82ca9d] mr-2 rounded-full"></span>
              Learner Messages: {payload[1].value}
            </p>
            <p className="text-sm flex items-center font-medium">
              <span className="inline-block w-3 h-3 bg-[#ffc658] mr-2 rounded-full"></span>
              Total Messages: {payload[2].value}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Message Activity</CardTitle>
          <CardDescription>Daily message volume between teachers and learners</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[350px]">
          Loading...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Message Activity</CardTitle>
          <CardDescription>Daily message volume between teachers and learners</CardDescription>
        </div>
        <Select value={timePeriod} onValueChange={handleTimePeriodChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">1 Week</SelectItem>
            <SelectItem value="14">2 Weeks</SelectItem>
            <SelectItem value="30">1 Month</SelectItem>
            <SelectItem value="90">3 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  width={30}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  iconType="circle"
                  iconSize={10}
                />
                <Area
                  type="monotone"
                  dataKey="teacher"
                  name="Teacher Messages"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="user"
                  name="Learner Messages"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Total Messages"
                  stroke="#ffc658"
                  fill="#ffc658"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[350px]">
            No message data available
          </div>
        )}
      </CardContent>
    </Card>
  );
} 
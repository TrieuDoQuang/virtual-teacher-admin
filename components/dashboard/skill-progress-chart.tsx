"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid, LineChart, Line, Legend, ResponsiveContainer, PieChart, Pie, Sector, LabelList, RadialBarChart, RadialBar, Treemap, ComposedChart, Area, Scatter } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { lessonsByLevel, learnersByAgeGroup } from "@/services/staticService";

export function SkillProgressChart() {
  const [lessonData, setLessonData] = useState<any>(null);
  const [learnerData, setLearnerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Define colors using CSS variables that will change with theme
  useEffect(() => {
    // Check if dark mode is active
    const darkModeActive = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkModeActive);
    
    // Set different color values based on the theme
    if (darkModeActive) {
      document.documentElement.style.setProperty('--skill-chart-color', 'white');
    } else {
      document.documentElement.style.setProperty('--skill-chart-color', 'black');
    }
    
    // Listen for theme changes and update colors accordingly
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const darkModeActive = document.documentElement.classList.contains('dark');
          setIsDarkMode(darkModeActive);
          if (darkModeActive) {
            document.documentElement.style.setProperty('--skill-chart-color', 'white');
          } else {
            document.documentElement.style.setProperty('--skill-chart-color', 'black');
          }
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch lessons by level data
        const lessonResponse = await lessonsByLevel();
        if (lessonResponse?.data) {
          // Sort levels in a specific order
          const levelOrder = ["ENTRANCE TEST", "A1", "A2", "B1", "B2", "C1", "C2"];
          
          const chartData = levelOrder.map(level => ({
            level,
            count: (lessonResponse.data[level] as number) || 0,
            fill: "var(--skill-chart-color)",
          }));
          
          setLessonData(chartData);
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
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle>Learning Analytics</CardTitle>
          <CardDescription>Distribution of lessons and learners</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          Loading...
        </CardContent>
      </Card>
    );
  }

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border border-border rounded-md shadow-lg">
          <p className="font-medium text-sm">Level: {label}</p>
          <p className="text-sm">Lessons: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };



  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-midAngle * Math.PI / 180);
    const cos = Math.cos(-midAngle * Math.PI / 180);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke="#fff"
          strokeWidth={2}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="currentColor" fontSize={12}>
          {payload.ageGroup}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="currentColor" fontSize={12} fontWeight="bold">
          {`${value} ${value === 1 ? 'learner' : 'learners'}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={36} textAnchor={textAnchor} fill="currentColor" fontSize={10}>
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Learning Analytics</CardTitle>
        <CardDescription>Distribution of lessons and learners</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          {/* Lessons by Level Chart */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-center">Lessons by Level</h3>
            {lessonData && lessonData.length > 0 ? (
              <div className="relative" style={{ height: "300px", width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={lessonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    className="text-foreground recharts-bar-chart"
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} stroke="currentColor" />
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
                      content={<CustomBarTooltip />}
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
                      fill="var(--skill-chart-color)"
                    >
                      {lessonData.map((entry: any, index: number) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill="var(--skill-chart-color)"
                          stroke="var(--skill-chart-color)"
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
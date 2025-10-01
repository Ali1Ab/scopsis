"use client";

import { Task } from "@/types/task";
import { useTheme } from "@/hooks/useTheme";
import {
    PieChart,
    Pie,
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface TaskAnalyticsProps {
    tasks: Task[];
}


const CHART_COLORS = [
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ef4444", // red
    "#6b7280", // gray
    "#22c55e", // green
    "#10b981", // emerald
    "#6366f1", // indigo
    "#ec4899", // pink
    "#f59e0b", // amber
    "#06b6d4", // cyan
];

export default function TaskAnalytics({ tasks }: TaskAnalyticsProps) {
    const { theme } = useTheme();

    const chartStyles = {
        background: theme === "dark" ? "#1f2937" : "#ffffff",
        text: theme === "dark" ? "#f3f4f6" : "#374151",
        grid: theme === "dark" ? "#374151" : "#e5e7eb",
        tooltipBg: theme === "dark" ? "rgba(31, 41, 55, 0.95)" : "rgba(255, 255, 255, 0.95)",
        tooltipBorder: theme === "dark" ? "#4b5563" : "#e5e7eb",
    };

    const tagCounts: Record<string, number> = {};
    let totalTags = 0;

    tasks.forEach((task) => {
        if (task.tags && task.tags.length > 0) {
            task.tags.forEach((tag) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                totalTags++;
            });
        }
    });

    const pieChartData = Object.entries(tagCounts).map(([name, count]) => ({
        name,
        value: count,
        percentage: ((count / totalTags) * 100).toFixed(1),
    }));


    const completedCount = tasks.filter((task) => task.completed).length;
    const activeCount = tasks.filter((task) => !task.completed).length;

    const barChartData = [
        {
            name: "Tasks",
            Completed: completedCount,
            Active: activeCount,
        },
    ];


    const renderCustomLabel = (props: {
        cx?: string | number;
        cy?: string | number;
        midAngle?: number;
        innerRadius?: string | number;
        outerRadius?: string | number;
        percent?: number;
    }) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

        if (
            cx === undefined ||
            cy === undefined ||
            midAngle === undefined ||
            innerRadius === undefined ||
            outerRadius === undefined ||
            percent === undefined
        ) {
            return null;
        }

        const RADIAN = Math.PI / 180;
        const cxNum = typeof cx === "string" ? parseFloat(cx) : cx;
        const cyNum = typeof cy === "string" ? parseFloat(cy) : cy;
        const innerRadiusNum = typeof innerRadius === "string" ? parseFloat(innerRadius) : innerRadius;
        const outerRadiusNum = typeof outerRadius === "string" ? parseFloat(outerRadius) : outerRadius;

        const radius = innerRadiusNum + (outerRadiusNum - innerRadiusNum) * 0.5;
        const x = cxNum + radius * Math.cos(-midAngle * RADIAN);
        const y = cyNum + radius * Math.sin(-midAngle * RADIAN);
        const percentage = (percent * 100).toFixed(1);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cxNum ? "start" : "end"}
                dominantBaseline="central"
                className="text-xs font-semibold"
            >
                {`${percentage}%`}
            </text>
        );
    };

    return (
        <div className="w-full space-y-8">

            <div
                className="rounded-lg shadow-md p-6"
                style={{ backgroundColor: chartStyles.background }}
            >
                <h2
                    className="text-xl font-bold mb-4"

                >
                    Task Status Overview
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barChartData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={chartStyles.grid}
                            opacity={0.3}
                        />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: chartStyles.text }}
                            axisLine={{ stroke: chartStyles.grid }}
                            tickLine={{ stroke: chartStyles.grid }}
                        />
                        <YAxis
                            tick={{ fill: chartStyles.text }}
                            axisLine={{ stroke: chartStyles.grid }}
                            tickLine={{ stroke: chartStyles.grid }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: chartStyles.tooltipBg,
                                border: `1px solid ${chartStyles.tooltipBorder}`,
                                borderRadius: "0.5rem",
                                color: chartStyles.text,
                            }}
                            itemStyle={{ color: chartStyles.text }}
                        />
                        <Legend
                            wrapperStyle={{
                                paddingTop: "20px",
                                color: chartStyles.text,
                            }}
                            iconType="circle"
                        />
                        <Bar dataKey="Completed" fill="#22c55e" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="Active" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 flex justify-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span style={{ color: chartStyles.text }}>
                            Completed: <strong>{completedCount}</strong>
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span style={{ color: chartStyles.text }}>
                            Active: <strong>{activeCount}</strong>
                        </span>
                    </div>
                </div>
            </div>


            <div
                className="rounded-lg shadow-md p-6 "
                style={{ backgroundColor: chartStyles.background }}
            >
                <h2
                    className="text-xl font-bold mb-4"

                >
                    Tags Distribution
                </h2>
                {pieChartData.length > 0 ? (
                    <>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomLabel}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: chartStyles.tooltipBg,
                                        border: `1px solid ${chartStyles.tooltipBorder}`,
                                        borderRadius: "0.5rem",
                                        color: chartStyles.text,
                                    }}
                                    formatter={(value: number) => [`${value} tasks`, ""]}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    wrapperStyle={{
                                        paddingTop: "20px",
                                        color: chartStyles.text,
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-24 md:mt-12 grid grid-cols-2 md:grid-cols-3 gap-3">
                            {pieChartData.map((item, index) => (
                                <div
                                    key={item.name}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                            backgroundColor:
                                                CHART_COLORS[index % CHART_COLORS.length],
                                        }}
                                    ></div>
                                    <span >
                                        {item.name}: <strong>{item.value}</strong> (
                                        {item.percentage}%)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div
                        className="text-center py-12"
                        style={{ color: chartStyles.text }}
                    >
                        No tags found in tasks
                    </div>
                )}
            </div>
        </div>
    );
}


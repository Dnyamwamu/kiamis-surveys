"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Users,
    PieChart as PieIcon,
    Home,
    BarChart3,
    Activity,
} from "lucide-react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    PieChart,
    Pie,
    Cell,
} from "recharts";

interface DemographicsData {
    name: string;
    value: number;
    percentage?: number;
}

interface HouseholdRangeData {
    range: string;
    value: number;
}

interface DailyProgressData {
    day: string;
    Visited: number;
}

interface TargetComparisonData {
    name: string;
    Surveyed: number;
    Target: number;
}

interface MaizeDemographicsTabProps {
    activeDailyProgressData: DailyProgressData[];
    activeGenderData: DemographicsData[];
    activeRegistrationData: DemographicsData[];
    activeHouseholdRangeData: HouseholdRangeData[];
    activeTargetComparisonData: TargetComparisonData[];
    COLORS: string[];
}

export default function MaizeDemographicsTab({
    activeDailyProgressData,
    activeGenderData,
    activeRegistrationData,
    activeHouseholdRangeData,
    activeTargetComparisonData,
    COLORS,
}: MaizeDemographicsTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Daily Registration Progress */}
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-600" />
                        Daily Assessment Progress (30-Day Trend)
                    </CardTitle>
                    <CardDescription>
                        Tracking the daily volume of farmers visited by field agripreneurs over the last 30 days.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activeDailyProgressData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Date / Day', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Farmers Visited', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={60} />
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Bar dataKey="Visited" name="Farmers Reached" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={45}>
                                    <LabelList dataKey="Visited" position="top" style={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Chart 3: Gender Segregation */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <PieIcon className="w-5 h-5 text-emerald-600" />
                        Gender Segregation of Visited Farmers
                    </CardTitle>
                    <CardDescription>
                        Breakdown of visited maize farmers segregated by gender.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activeGenderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {activeGenderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 w-full">
                        {activeGenderData.map((item, index) => (
                            <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-slate-800">{item.value.toLocaleString()}</span>
                                    <span className="text-xs text-slate-500 ml-2">({item.percentage}%)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Chart 4: KIAMIS Registered vs New Farmers */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        KIAMIS Registered vs New Farmers
                    </CardTitle>
                    <CardDescription>
                        Comparison between farmers pre-existing in KIAMIS vs new ones discovered/registered during the survey.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activeRegistrationData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    outerRadius={80}
                                    paddingAngle={0}
                                    dataKey="value"
                                >
                                    {activeRegistrationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 w-full">
                        {activeRegistrationData.map((item, index) => (
                            <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: COLORS[(index + 1) % COLORS.length] }} />
                                    <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-slate-800">{item.value.toLocaleString()}</span>
                                    <span className="text-xs text-slate-500 ml-2">({item.percentage}%)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Chart 5: Household Size Distribution */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Home className="w-5 h-5 text-emerald-600" />
                        Household Size Distribution
                    </CardTitle>
                    <CardDescription>
                        Number of surveyed farmers categorized by household member ranges.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activeHouseholdRangeData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Household Size Range', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Farmers Count', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={60} />
                                <Tooltip
                                    contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                    formatter={(value: unknown) => [
                                        Number(value || 0).toLocaleString(),
                                        "Farmers",
                                    ]}
                                />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Bar dataKey="value" name="Farmers Surveyed" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={50}>
                                    {activeHouseholdRangeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                    <LabelList dataKey="value" position="top" style={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Chart 5: Survey Maize Farmers vs KIAMIS Target */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                        Surveyed Maize Farmers vs Target
                    </CardTitle>
                    <CardDescription>
                        Comparison of the completed field survey records against the target goal.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activeTargetComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Category', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Farmers Count', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={60} />
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Bar dataKey="Surveyed" fill="#10b981" radius={[8, 8, 0, 0]} maxBarSize={120}>
                                    <LabelList dataKey="Surveyed" position="top" style={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                </Bar>
                                <Bar dataKey="Target" fill="#cbd5e1" radius={[8, 8, 0, 0]} maxBarSize={120}>
                                    <LabelList dataKey="Target" position="top" style={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

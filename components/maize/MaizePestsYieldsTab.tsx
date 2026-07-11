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
    AlertTriangle,
    HelpCircle,
    LineChart as LineIcon,
    PieChart as PieIcon,
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
    Cell,
    PieChart,
    Pie,
    LineChart,
    Line,
} from "recharts";

interface PestDiseaseData {
    name: string;
    Present: number;
    Absent: number;
}

interface DiseaseSymptomsData {
    name: string;
    percentage: number;
    color: string;
}

interface HistoricalYieldData {
    year: string;
    Yield: number;
}

interface MaizeUseData {
    name: string;
    value: number;
    color: string;
}

interface PoorPerformanceCauses {
    cause: string;
    percentage: number;
    color: string;
}

interface MaizePestsYieldsTabProps {
    activePestDiseaseData: PestDiseaseData[];
    activeDiseaseSymptomsData: DiseaseSymptomsData[];
    activeHistoricalYieldData: HistoricalYieldData[];
    activeMaizeUseData: MaizeUseData[];
    activePoorPerformanceCauses: PoorPerformanceCauses[];
}

export default function MaizePestsYieldsTab({
    activePestDiseaseData,
    activeDiseaseSymptomsData,
    activeHistoricalYieldData,
    activeMaizeUseData,
    activePoorPerformanceCauses,
}: MaizePestsYieldsTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pest Pressure Distribution */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Weed & Pest Infestation Pressure
                    </CardTitle>
                    <CardDescription>
                        Proportion of visited maize acreage reporting active pest, borer, or heavy weed choking presence.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activePestDiseaseData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Threat Category', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Prevalence (%)', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={60} />
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Bar dataKey="Present" name="Present (%)" fill="#ef4444" radius={[6, 6, 0, 0]} maxBarSize={60}>
                                    <LabelList dataKey="Present" position="top" style={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => `${val}%`} />
                                </Bar>
                                <Bar dataKey="Absent" name="Absent (%)" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={60}>
                                    <LabelList dataKey="Absent" position="top" style={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => `${val}%`} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Disease Symptoms Distribution */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-emerald-600" />
                        Disease Symptoms Distribution
                    </CardTitle>
                    <CardDescription>
                        Occurrence percentage of major maize diseases spotted during inspections.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activeDiseaseSymptomsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="percentage"
                                >
                                    {activeDiseaseSymptomsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 w-full">
                        {activeDiseaseSymptomsData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800">{item.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Historical Yield Trends */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <LineIcon className="w-5 h-5 text-emerald-600" />
                        Historical Maize Yield Trends (Bags/Acre)
                    </CardTitle>
                    <CardDescription>
                        Average productivity recorded across seasons compared with expected yield for 2026.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activeHistoricalYieldData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Year', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Yield (Bags / Acre)', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={60} />
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Line type="monotone" dataKey="Yield" name="Maize Yield" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} isAnimationActive={false}>
                                    <LabelList dataKey="Yield" position="top" style={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} formatter={(val: unknown) => `${val} Bags`} />
                                </Line>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Maize Use Profile */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <PieIcon className="w-5 h-5 text-emerald-600" />
                        Post-Harvest Maize Utilisation
                    </CardTitle>
                    <CardDescription>
                        Reported proportion of maize harvested designated for home use, commercial sales, and animal feeds.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activeMaizeUseData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {activeMaizeUseData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 w-full">
                        {activeMaizeUseData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Causes for Poor Yield/Performance */}
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Primary Causes for Poor Crop Performance
                    </CardTitle>
                    <CardDescription>
                        Farmers&apos; feedback on key issues causing reduced growth and under-performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activePoorPerformanceCauses} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="cause" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Primary Cause', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Prevalence (%)', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={60} />
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Bar dataKey="percentage" name="Prevalence (%)" radius={[8, 8, 0, 0]}>
                                    {activePoorPerformanceCauses.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                    <LabelList dataKey="percentage" position="top" style={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} formatter={(val: unknown) => `${val}%`} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

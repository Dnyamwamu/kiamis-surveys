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

interface MajorPestData {
    pest: string;
    incidence: number;
    severity: "Low" | "Moderate" | "High";
}

interface WeedLevelData {
    name: string;
    percentage: number;
    color: string;
}

interface MaizePestsYieldsTabProps {
    activePestDiseaseData: PestDiseaseData[];
    activeDiseaseSymptomsData: DiseaseSymptomsData[];
    activeHistoricalYieldData: HistoricalYieldData[];
    activeMaizeUseData: MaizeUseData[];
    activePoorPerformanceCauses: PoorPerformanceCauses[];
    activeMajorPests: MajorPestData[];
    activeAverageFawDamage: number;
    activeWeedLevels: WeedLevelData[];
    activeDominantWeeds: string[];
}

export default function MaizePestsYieldsTab({
    activePestDiseaseData,
    activeDiseaseSymptomsData,
    activeHistoricalYieldData,
    activeMaizeUseData,
    activePoorPerformanceCauses,
    activeMajorPests,
    activeAverageFawDamage,
    activeWeedLevels,
    activeDominantWeeds,
}: MaizePestsYieldsTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Major Pests */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Major Pests
                    </CardTitle>
                    <CardDescription>
                        Incidence rate and severity profile of dominant maize crop pests.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-6 space-y-6">
                    <div className="border border-slate-100 rounded-xl overflow-hidden">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-3 font-semibold text-left text-xs uppercase tracking-wider">Pest</th>
                                    <th className="p-3 font-semibold text-right text-xs uppercase tracking-wider">Incidence (%)</th>
                                    <th className="p-3 font-semibold text-right text-xs uppercase tracking-wider">Severity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {activeMajorPests.map((item) => (
                                    <tr key={item.pest} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-3 font-bold text-slate-800 text-xs sm:text-sm">{item.pest}</td>
                                        <td className="p-3 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.incidence.toFixed(1)}%</td>
                                        <td className="p-3 text-right">
                                            <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${
                                                item.severity === "High"
                                                    ? "bg-red-50 text-red-700 border-red-200"
                                                    : item.severity === "Moderate"
                                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            }`}>
                                                {item.severity}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700">Average FAW Damage</span>
                        <span className="text-lg font-extrabold text-red-600 font-mono">{activeAverageFawDamage.toFixed(1)}%</span>
                    </div>
                </CardContent>
            </Card>

            {/* Weed Infestation */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-emerald-600" />
                        Weed Infestation
                    </CardTitle>
                    <CardDescription>
                        Severity distribution of weeds and identified dominant species.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-6 space-y-6">
                    <div className="border border-slate-100 rounded-xl overflow-hidden">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-3 font-semibold text-left text-xs uppercase tracking-wider">Weed Level</th>
                                    <th className="p-3 font-semibold text-right text-xs uppercase tracking-wider">Percentage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {activeWeedLevels.map((item) => (
                                    <tr key={item.name} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-3 font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                                            <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            {item.name}
                                        </td>
                                        <td className="p-3 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.percentage.toFixed(1)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                        <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Dominant weeds:</span>
                        <ul className="grid grid-cols-2 gap-2 pl-2">
                            {activeDominantWeeds.slice(0, 5).map((weed) => (
                                <li key={weed} className="text-sm text-slate-700 flex items-center gap-2 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                    {weed}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>

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
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Prevalence (%)', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={80} />
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
                        Diseases
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
                    <div className="w-full">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-2 font-semibold text-left text-xs uppercase tracking-wider">Disease</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Incidence (%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {activeDiseaseSymptomsData.map((item) => (
                                    <tr key={item.name} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-2 font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                                            <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            {item.name}
                                        </td>
                                        <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.percentage.toFixed(1)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Yield (Bags / Acre)', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={80} />
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
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Prevalence (%)', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={80} />
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

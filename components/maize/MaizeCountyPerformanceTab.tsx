"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Compass,
    ClipboardList,
    BarChart3,
    Activity,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
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
} from "recharts";
import KenyaFarmersD3Map from "@/components/maps/kenya-farmers-d3-map";

interface CountyPerformanceData {
    county: string;
    project: string;
    visited: number;
    target: number;
}

interface ChartData {
    name: string;
    Reached: number;
    Target: number;
}

interface DailyProgressData {
    day: string;
    Visited: number;
}

interface MaizeCountyPerformanceTabProps {
    selectedCounty: string;
    setSelectedCounty: (val: string) => void;
    setSelectedSubCounty: (val: string) => void;
    setSelectedWard: (val: string) => void;
    filteredCountyData: CountyPerformanceData[];
    topCountiesChartData: ChartData[];
    navcdpReached: number;
    navcdpTarget: number;
    navcdpCountCounties: number;
    fsrpReached: number;
    fsrpTarget: number;
    fsrpCountCounties: number;
    activeDailyProgressData: DailyProgressData[];
}

export default function MaizeCountyPerformanceTab({
    selectedCounty,
    setSelectedCounty,
    setSelectedSubCounty,
    setSelectedWard,
    filteredCountyData,
    topCountiesChartData,
    navcdpReached,
    navcdpTarget,
    navcdpCountCounties,
    fsrpReached,
    fsrpTarget,
    fsrpCountCounties,
    activeDailyProgressData,
}: MaizeCountyPerformanceTabProps) {
    const [sortField, setSortField] = React.useState<"county" | "visited" | "target" | "coverage">("county");
    const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

    const sortedCountyData = React.useMemo(() => {
        const data = [...filteredCountyData];
        data.sort((a, b) => {
            let valA: string | number;
            let valB: string | number;

            if (sortField === "coverage") {
                valA = a.visited / (a.target || 1);
                valB = b.visited / (b.target || 1);
            } else {
                valA = a[sortField];
                valB = b[sortField];
            }

            if (typeof valA === "string" && typeof valB === "string") {
                return sortOrder === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            } else if (typeof valA === "number" && typeof valB === "number") {
                return sortOrder === "asc"
                    ? valA - valB
                    : valB - valA;
            }
            return 0;
        });
        return data;
    }, [filteredCountyData, sortField, sortOrder]);

    const handleSort = (field: "county" | "visited" | "target" | "coverage") => {
        if (sortField === field) {
            setSortOrder(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder(field === "county" ? "asc" : "desc");
        }
    };

    const renderSortIcon = (field: "county" | "visited" | "target" | "coverage") => {
        if (sortField !== field) {
            return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-40 ml-1 shrink-0" />;
        }
        return sortOrder === "asc"
            ? <ArrowUp className="w-3.5 h-3.5 text-emerald-600 font-bold ml-1 shrink-0" />
            : <ArrowDown className="w-3.5 h-3.5 text-emerald-600 font-bold ml-1 shrink-0" />;
    };
    return (
        <div className="space-y-8 animate-in fade-in-50 duration-300">



            {/* Top 10 chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Daily Assessment Progress */}
                <Card className="shadow-md border-slate-200 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-emerald-600" />
                            Daily Assessment Progress
                        </CardTitle>
                        <CardDescription>
                            Track the daily number of farmers visited by field agripreneurs over time.                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[320px]">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <BarChart data={activeDailyProgressData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Date / Day', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Farmers Visited', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={80} />
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

                <Card className="shadow-md border-slate-200 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-emerald-600" />
                            Top 10 Counties (By Reach)
                        </CardTitle>
                        <CardDescription>
                            Highest performing counties showing farmers reached vs target.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <BarChart data={topCountiesChartData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'County', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Farmers Count', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={80} />
                                    <Tooltip
                                        contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                        formatter={(value: unknown, name: unknown) => [
                                            Number(value || 0).toLocaleString(),
                                            String(name || ""),
                                        ]}
                                    />
                                    <Legend verticalAlign="top" height={36} iconType="circle" />
                                    <Bar dataKey="Reached" fill="#10b981" radius={[4, 4, 0, 0]}>
                                        <LabelList dataKey="Reached" position="top" style={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                    </Bar>
                                    <Bar dataKey="Target" fill="#cbd5e1" radius={[4, 4, 0, 0]}>
                                        <LabelList dataKey="Target" position="top" style={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Full Counties List Table */}
                <Card className="shadow-md border-slate-200 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800">
                            All Counties Performance Registry ({filteredCountyData.length})
                        </CardTitle>
                        <CardDescription>
                            Table of reached farmers, targets, and percentage coverage.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                            <div className="max-h-[400px] overflow-y-auto">
                                <table className="w-full border-collapse text-left text-sm">
                                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-bold border-b border-slate-200 z-10">
                                        <tr>
                                            <th className="p-4 font-semibold w-12">#</th>
                                            <th className="p-4 font-semibold cursor-pointer select-none hover:bg-slate-200/40 transition-colors" onClick={() => handleSort("county")}>
                                                <div className="flex items-center">
                                                    County
                                                    {renderSortIcon("county")}
                                                </div>
                                            </th>
                                            <th className="p-4 font-semibold">Project</th>
                                            <th className="p-4 font-semibold text-right cursor-pointer select-none hover:bg-slate-200/40 transition-colors" onClick={() => handleSort("visited")}>
                                                <div className="flex items-center justify-end">
                                                    Farmers Reached
                                                    {renderSortIcon("visited")}
                                                </div>
                                            </th>
                                            <th className="p-4 font-semibold text-right cursor-pointer select-none hover:bg-slate-200/40 transition-colors" onClick={() => handleSort("target")}>
                                                <div className="flex items-center justify-end">
                                                    Target
                                                    {renderSortIcon("target")}
                                                </div>
                                            </th>
                                            <th className="p-4 font-semibold text-right cursor-pointer select-none hover:bg-slate-200/40 transition-colors" onClick={() => handleSort("coverage")}>
                                                <div className="flex items-center justify-end">
                                                    Coverage Rate
                                                    {renderSortIcon("coverage")}
                                                </div>
                                            </th>
                                            <th className="p-4 font-semibold w-40">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {sortedCountyData.map((item, index) => {
                                            const percent = parseFloat(((item.visited / item.target) * 100).toFixed(1));
                                            return (
                                                <tr key={item.county} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="p-4 font-bold text-slate-800 uppercase">{index + 1}</td>
                                                    <td className="p-4 font-bold text-slate-800 uppercase">{item.county}</td>
                                                    <td className="p-4">
                                                        <Badge className={
                                                            item.project === "NAVCDP"
                                                                ? "bg-blue-50 text-blue-700 border border-blue-200 font-semibold"
                                                                : "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold"
                                                        }>
                                                            {item.project}
                                                        </Badge>
                                                    </td>
                                                    <td className="p-4 text-right font-medium text-slate-700">{item.visited.toLocaleString()}</td>
                                                    <td className="p-4 text-right text-slate-500">{item.target.toLocaleString()}</td>
                                                    <td className="p-4 text-right font-bold text-slate-800">{percent}%</td>
                                                    <td className="p-4">
                                                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                                                            <div
                                                                className={`h-2.5 rounded-full ${percent >= 95 ? "bg-emerald-500" : percent >= 85 ? "bg-amber-500" : "bg-red-500"
                                                                    }`}
                                                                style={{ width: `${Math.min(100, percent)}%` }}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {filteredCountyData.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">
                                                    No counties match your search criteria.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

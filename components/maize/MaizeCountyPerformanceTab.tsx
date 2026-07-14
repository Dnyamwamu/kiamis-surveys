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
    Search,
    Compass,
    ClipboardList,
    BarChart3,
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

interface MaizeCountyPerformanceTabProps {
    countySearch: string;
    setCountySearch: (val: string) => void;
    countyProjectFilter: "ALL" | "NAVCDP" | "FSRP";
    setCountyProjectFilter: (val: "ALL" | "NAVCDP" | "FSRP") => void;
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
}

export default function MaizeCountyPerformanceTab({
    countySearch,
    setCountySearch,
    countyProjectFilter,
    setCountyProjectFilter,
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
}: MaizeCountyPerformanceTabProps) {
    return (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
            {/* Filters bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search county..."
                        value={countySearch}
                        onChange={(e) => setCountySearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="text-sm font-medium text-slate-500 shrink-0">Category by Project:</span>
                    <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto">
                        <button
                            onClick={() => setCountyProjectFilter("ALL")}
                            className={`flex-1 md:flex-none text-xs font-semibold py-1.5 px-3 rounded-md transition-all ${countyProjectFilter === "ALL"
                                ? "bg-white text-slate-800 shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setCountyProjectFilter("NAVCDP")}
                            className={`flex-1 md:flex-none text-xs font-semibold py-1.5 px-3 rounded-md transition-all ${countyProjectFilter === "NAVCDP"
                                ? "bg-white text-slate-800 shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            NAVCDP
                        </button>
                        <button
                            onClick={() => setCountyProjectFilter("FSRP")}
                            className={`flex-1 md:flex-none text-xs font-semibold py-1.5 px-3 rounded-md transition-all ${countyProjectFilter === "FSRP"
                                ? "bg-white text-slate-800 shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            FSRP
                        </button>
                    </div>
                </div>
            </div>



            {/* Top 10 chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="shadow-md border-slate-200 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-emerald-600" />
                            Top 10 Counties (By Reached)
                        </CardTitle>
                        <CardDescription>
                            Highest performing counties showing farmers reached vs target for the selected sponsor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
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
                            Complete searchable table of reached farmers, targets, and percentage completion.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                            <div className="max-h-[400px] overflow-y-auto">
                                <table className="w-full border-collapse text-left text-sm">
                                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-bold border-b border-slate-200 z-10">
                                        <tr>
                                            <th className="p-4 font-semibold">County</th>
                                            <th className="p-4 font-semibold">Project</th>
                                            <th className="p-4 font-semibold text-right">Farmers Reached</th>
                                            <th className="p-4 font-semibold text-right">Target</th>
                                            <th className="p-4 font-semibold text-right">Coverage Rate</th>
                                            <th className="p-4 font-semibold w-40">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {filteredCountyData.map((item) => {
                                            const percent = parseFloat(((item.visited / item.target) * 100).toFixed(1));
                                            return (
                                                <tr key={item.county} className="hover:bg-slate-50/50 transition-colors">
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

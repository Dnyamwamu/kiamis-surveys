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
    Sprout,
    CalendarDays,
    PieChart as PieIcon,
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
    Cell,
    PieChart,
    Pie,
    AreaChart,
    Area
} from "recharts";

interface CountyAcreageData {
    county: string;
    acres: number;
    rainfed: number;
    irrigated: number;
}

interface PlantingDateData {
    period: string;
    Percentage: number;
}

interface SeedSourceData {
    name: string;
    value: number;
    percentage: number;
    color: string;
}

interface SeedVarietyData {
    name: string;
    value: number;
    color: string;
}

interface MaizeCropEstablishmentTabProps {
    topCountiesAcreageData: CountyAcreageData[];
    sortedCountyMaizeAcreageData: CountyAcreageData[];
    totalMaizeAcreage: number;
    activePlantingDateData: PlantingDateData[];
    activeSeedSourceData: SeedSourceData[];
    activeSeedVarietyData: SeedVarietyData[];
    COLORS: string[];
}

export default function MaizeCropEstablishmentTab({
    topCountiesAcreageData,
    sortedCountyMaizeAcreageData,
    totalMaizeAcreage,
    activePlantingDateData,
    activeSeedSourceData,
    activeSeedVarietyData,
    COLORS,
}: MaizeCropEstablishmentTabProps) {
    return (
        <div className="space-y-8 animate-fadeIn">
            {/* 1. Area under Maize Production */}
            <Card className="shadow-md border-slate-200">
                <CardHeader className="border-b border-slate-100 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Sprout className="w-5 h-5 text-emerald-600" />
                                Area under Maize Production
                            </CardTitle>
                            <CardDescription>
                                Analysis of smallholder rainfed vs. irrigated cultivation areas by county.
                            </CardDescription>
                        </div>
                        <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 shrink-0">
                            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Total Cultivated Area</span>
                            <span className="text-lg font-black text-emerald-950 mt-0.5 block">{totalMaizeAcreage.toLocaleString()} Acres</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Column 1: Stacked Bar Chart */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">Top Counties - Rainfed vs Irrigated comparison</h4>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        layout="vertical"
                                        data={topCountiesAcreageData}
                                        margin={{ top: 5, right: 20, left: 10, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                        <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Maize Area (Acres)', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                        <YAxis dataKey="county" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={100} label={{ value: 'County', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                                        <Tooltip
                                            contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                            formatter={(value: unknown, name: unknown) => [`${Number(value || 0).toLocaleString()} Acres`, String(name ?? "")]}
                                        />
                                        <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} iconType="circle" />
                                        <Bar dataKey="rainfed" name="Rainfed Area" stackId="a" fill="#3b82f6">
                                            <LabelList dataKey="rainfed" position="inside" style={{ fill: '#ffffff', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => Number(val) > 2000 ? Number(val).toLocaleString() : ""} />
                                        </Bar>
                                        <Bar dataKey="irrigated" name="Irrigated Area" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]}>
                                            <LabelList dataKey="irrigated" position="inside" style={{ fill: '#ffffff', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => Number(val) > 2000 ? Number(val).toLocaleString() : ""} />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Column 2: Scrollable Table of County vs Rainfed vs Irrigated */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">Irrigation Ledger</h4>
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <div className="overflow-y-auto max-h-[298px]">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                                            <tr>
                                                <th className="p-3 font-semibold text-left text-xs">County</th>
                                                <th className="p-2 font-semibold text-right text-xs">Total Area (Ac)</th>
                                                <th className="p-2 font-semibold text-right text-xs">Rainfed (Ac)</th>
                                                <th className="p-2 font-semibold text-right text-xs">Rainfed %</th>
                                                <th className="p-2 font-semibold text-right text-xs">Irrigated (Ac)</th>
                                                <th className="p-2 font-semibold text-right text-xs">Irrigated %</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {sortedCountyMaizeAcreageData.map((item) => {
                                                const rainfedPercent = item.acres > 0 ? Math.round((item.rainfed / item.acres) * 100) : 0;
                                                const irrPercent = item.acres > 0 ? 100 - rainfedPercent : 0;
                                                return (
                                                    <tr key={item.county} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="p-3 font-bold text-slate-800 text-xs">{item.county}</td>
                                                        <td className="p-2 text-slate-800 font-mono text-right text-xs font-semibold">{item.acres.toLocaleString()}</td>
                                                        <td className="p-2 text-slate-600 font-mono text-right text-xs">{item.rainfed.toLocaleString()}</td>
                                                        <td className="p-2 text-slate-500 font-mono text-right text-xs">{rainfedPercent}%</td>
                                                        <td className="p-2 text-slate-600 font-mono text-right text-xs">{item.irrigated.toLocaleString()}</td>
                                                        <td className="p-2 text-emerald-600 font-mono text-right text-xs font-semibold">{irrPercent}%</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Seed Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Source of Seeds */}
                <Card className="shadow-md border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <PieIcon className="w-5 h-5 text-emerald-600" />
                            Source of Seeds
                        </CardTitle>
                        <CardDescription>
                            Maize seed varieties classification based on seed source acquisition.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                        <div className="w-[200px] h-[200px] shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={activeSeedSourceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {activeSeedSourceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-4 w-full">
                            {activeSeedSourceData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
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

                {/* Type of Seed Variety */}
                <Card className="shadow-md border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-emerald-600" />
                            Type of Seed Variety
                        </CardTitle>
                        <CardDescription>
                            Distribution of major maize seed varieties used by surveyed farmers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={activeSeedVarietyData} layout="vertical" margin={{ top: 10, right: 40, left: 35, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                    <XAxis type="number" stroke="#475569" fontSize={11} tickLine={false} label={{ value: 'Number of Farmers', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                    <YAxis dataKey="name" type="category" stroke="#475569" fontSize={11} tickLine={false} width={130} label={{ value: 'Seed Variety', angle: -90, position: 'insideLeft', offset: 25, fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                                    <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                    <Bar dataKey="value" name="Farmers Reached" fill="#10b981" radius={[0, 4, 4, 0]}>
                                        {activeSeedVarietyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                        ))}
                                        <LabelList dataKey="value" position="right" style={{ fill: '#334155', fontSize: 10, fontWeight: 600 }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Planting Period */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-emerald-600" />
                        Planting Period
                    </CardTitle>
                    <CardDescription>
                        Estimated distribution of fields by planting period during the season.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activePlantingDateData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                                <defs>
                                    <linearGradient id="colorPercentage" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Planting Window', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} label={{ value: 'Percentage of Farmers', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={80} />
                                <Tooltip 
                                    contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                    formatter={(val: unknown) => [`${val}%`, "Percentage of Farmers"]}
                                />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Area type="monotone" dataKey="Percentage" name="Percentage of Farmers" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPercentage)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

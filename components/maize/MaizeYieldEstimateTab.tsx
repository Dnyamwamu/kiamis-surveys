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
    FileSpreadsheet,
    TrendingUp,
    Layers,
    CheckCircle,
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

interface YieldEstimateData {
    county: string;
    maize_acres: number;
    silage_acres: number;
    green_acres: number;
    dry_grain_acres: number;
    expected_yield_outlook: number;
    total_expected_yield: number;
    family_consumption: number;
    commercial_sale: number;
    animal_feed: number;
}

interface MaizeYieldEstimateTabProps {
    totalExpectedYieldBags: number;
    totalGreenAcreage: number;
    totalSilageAcreage: number;
    totalMaizeAcreage: number;
    sortedYieldEstimateData: YieldEstimateData[];
    topCountiesYieldData: YieldEstimateData[];
}

export default function MaizeYieldEstimateTab({
    totalExpectedYieldBags,
    totalGreenAcreage,
    totalSilageAcreage,
    totalMaizeAcreage,
    sortedYieldEstimateData,
    topCountiesYieldData,
}: MaizeYieldEstimateTabProps) {
    return (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
            {/* KPI Mini Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Expected Yield Bags */}
                <Card className="shadow-md border-slate-200 bg-emerald-50/20">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Expected Yield</CardDescription>
                        <CardTitle className="text-2xl font-extrabold text-slate-800">
                            {totalExpectedYieldBags.toLocaleString()} <span className="text-lg font-semibold text-slate-500">Bags</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-slate-500">
                            Calculated on area under maize less silage acreage at an average outlook of <strong className="text-emerald-700">16.5 Bags/Acre</strong>.
                        </div>
                    </CardContent>
                </Card>

                {/* Card 2: Green Maize & Silage */}
                <Card className="shadow-md border-slate-200 bg-blue-50/20">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Acreage Allocation</CardDescription>
                        <CardTitle className="text-2xl font-extrabold text-slate-800">
                            {totalGreenAcreage.toLocaleString()} <span className="text-sm font-semibold text-slate-500">Ac Green</span> / {totalSilageAcreage.toLocaleString()} <span className="text-sm font-semibold text-slate-500">Ac Silage</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-slate-500">
                            Acres dedicated to early green harvest (12%) and silage processing (8%).
                        </div>
                    </CardContent>
                </Card>

                {/* Card 3: Consumption vs Commercial */}
                <Card className="shadow-md border-slate-200 bg-amber-50/20">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Primary Maize Use</CardDescription>
                        <CardTitle className="text-2xl font-extrabold text-slate-800">
                            55% <span className="text-sm font-semibold text-slate-500">Family</span> / 30% <span className="text-sm font-semibold text-slate-500">Sale</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-slate-500">
                            Dry grain post-harvest allocation including <strong className="text-amber-700">15%</strong> for animal feed.
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detail Block 1: 5a. Acreage Utilisation (Green Maize vs Silage) */}
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                        Acreage Utilisation (Green Maize vs. Silage)
                    </CardTitle>
                    <CardDescription>
                        County-level and aggregate allocation of maize crop acreage for green maize, silage, and dry grain.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Donut Chart */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">Aggregate Allocation Breakdowns</h4>
                            <div className="h-[250px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: "Dry Grain (Ac)", value: totalMaizeAcreage - totalGreenAcreage - totalSilageAcreage },
                                                { name: "Green Maize (Ac)", value: totalGreenAcreage },
                                                { name: "Silage (Ac)", value: totalSilageAcreage },
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            <Cell fill="#10b981" />
                                            <Cell fill="#3b82f6" />
                                            <Cell fill="#f59e0b" />
                                        </Pie>
                                        <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} formatter={(val: unknown) => `${Number(val).toLocaleString()} Acres`} />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">Acreage Allocation Ledger</h4>
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <div className="overflow-y-auto max-h-[240px]">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                                            <tr>
                                                <th className="p-3 font-semibold text-left text-xs">County</th>
                                                <th className="p-2 font-semibold text-right text-xs">Green (Acres)</th>
                                                <th className="p-2 font-semibold text-right text-xs">Silage (Acres)</th>
                                                <th className="p-2 font-semibold text-right text-xs">Dry Grain (Acres)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {sortedYieldEstimateData.map((item) => (
                                                <tr key={item.county} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="p-3 font-bold text-slate-800 text-xs">{item.county}</td>
                                                    <td className="p-2 text-slate-600 font-mono text-right text-xs">{item.green_acres.toLocaleString()}</td>
                                                    <td className="p-2 text-slate-600 font-mono text-right text-xs">{item.silage_acres.toLocaleString()}</td>
                                                    <td className="p-2 text-slate-800 font-mono font-semibold text-right text-xs">{item.dry_grain_acres.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Detail Block 2: 5b. Yield Estimate Outlook */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-md border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                            Expected Yield Outlook vs. Benchmarks
                        </CardTitle>
                        <CardDescription>
                            Average expected bags/acre for the 2026 season compared with historical seasons.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={[
                                        { year: "2022", Yield: 12.8 },
                                        { year: "2023", Yield: 14.2 },
                                        { year: "2024", Yield: 15.6 },
                                        { year: "2025", Yield: 14.8 },
                                        { year: "2026 (Exp)", Yield: 16.5 }
                                    ]}
                                    margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Season Year', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Yield (Bags / Acre)', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={60} />
                                    <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                    <Legend verticalAlign="top" height={36} iconType="circle" />
                                    <Line type="monotone" dataKey="Yield" name="Yield Outlook" stroke="#fbbf24" strokeWidth={3} dot={{ fill: "#fbbf24", strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} isAnimationActive={false}>
                                        <LabelList dataKey="Yield" position="top" style={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} formatter={(val: unknown) => `${val} Bags`} />
                                    </Line>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-emerald-600" />
                            County Production Outlook (Dry Grain)
                        </CardTitle>
                        <CardDescription>
                            Total expected dry grain bags output computed on area under maize (less silage).
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                            <div className="overflow-y-auto max-h-[250px]">
                                <table className="w-full border-collapse text-left text-sm">
                                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                                        <tr>
                                            <th className="p-3 font-semibold text-left text-xs">County</th>
                                            <th className="p-2 font-semibold text-right text-xs">Outlook (Bags/Ac)</th>
                                            <th className="p-2 font-semibold text-right text-xs">Total Expected (Bags)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {sortedYieldEstimateData.map((item) => (
                                            <tr key={item.county} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="p-3 font-bold text-slate-800 text-xs">{item.county}</td>
                                                <td className="p-2 text-slate-600 font-mono text-right text-xs">{item.expected_yield_outlook}</td>
                                                <td className="p-2 text-emerald-700 font-mono font-semibold text-right text-xs">{item.total_expected_yield.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detail Block 3: 5c. Maize use (Dry grain) */}
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        Post-Harvest Dry Grain Utilisation (Maize Use)
                    </CardTitle>
                    <CardDescription>
                        Distribution of expected harvested dry grain bags allocated for family consumption, commercial purposes, and feed.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Horizontal Stacked Bar Chart */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">Top 10 Counties Utilisation (Bags)</h4>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        layout="vertical"
                                        data={topCountiesYieldData}
                                        margin={{ top: 5, right: 20, left: 10, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                        <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Expected Harvest (Bags)', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                        <YAxis dataKey="county" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={100} label={{ value: 'County', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                                        <Tooltip
                                            contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                            formatter={(value: unknown, name: unknown) => [`${Number(value || 0).toLocaleString()} Bags`, String(name ?? "")]}
                                        />
                                        <Legend verticalAlign="top" height={36} iconType="circle" />
                                        <Bar dataKey="family_consumption" name="Family Consumption" stackId="a" fill="#3b82f6">
                                            <LabelList dataKey="family_consumption" position="inside" style={{ fill: '#ffffff', fontSize: 8, fontWeight: 600 }} formatter={(val: unknown) => Number(val) > 40000 ? Number(val).toLocaleString() : ""} />
                                        </Bar>
                                        <Bar dataKey="commercial_sale" name="Commercial Sale" stackId="a" fill="#10b981">
                                            <LabelList dataKey="commercial_sale" position="inside" style={{ fill: '#ffffff', fontSize: 8, fontWeight: 600 }} formatter={(val: unknown) => Number(val) > 40000 ? Number(val).toLocaleString() : ""} />
                                        </Bar>
                                        <Bar dataKey="animal_feed" name="Animal Feed" stackId="a" fill="#f59e0b" radius={[0, 4, 4, 0]}>
                                            <LabelList dataKey="animal_feed" position="inside" style={{ fill: '#ffffff', fontSize: 8, fontWeight: 600 }} formatter={(val: unknown) => Number(val) > 20000 ? Number(val).toLocaleString() : ""} />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Detailed Table */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">County Maize Use Breakdown (Bags)</h4>
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <div className="overflow-y-auto max-h-[298px]">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                                            <tr>
                                                <th className="p-3 font-semibold text-left text-xs">County</th>
                                                <th className="p-2 font-semibold text-right text-xs">Family Cons.</th>
                                                <th className="p-2 font-semibold text-right text-xs">Commercial</th>
                                                <th className="p-2 font-semibold text-right text-xs">Animal Feed</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {sortedYieldEstimateData.map((item) => (
                                                <tr key={item.county} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="p-3 font-bold text-slate-800 text-xs">{item.county}</td>
                                                    <td className="p-2 text-slate-600 font-mono text-right text-xs">{item.family_consumption.toLocaleString()}</td>
                                                    <td className="p-2 text-slate-600 font-mono text-right text-xs">{item.commercial_sale.toLocaleString()}</td>
                                                    <td className="p-2 text-slate-600 font-mono text-right text-xs">{item.animal_feed.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

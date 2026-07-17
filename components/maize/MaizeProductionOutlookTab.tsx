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
    CheckCircle2,
    AlertTriangle,
    Package,
} from "lucide-react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    LabelList,
    BarChart,
    Bar,
    ComposedChart,
} from "recharts";


interface ProductionConstraintData {
    constraint: string;
    percentage: number;
    severity: "High" | "Medium" | "Low";
}

interface CopingStrategyData {
    intervention: string;
    percentage: number;
    color: string;
}

interface PerformanceRatingData {
    indicator: string;
    rating: "Excellent" | "Good" | "Fair" | "Poor" | "Above Average" | "Average" | "Below Average";
}

interface StorageData {
    chartData: { range: string; value: number; percentage?: number }[];
    totalBags: number;
    avgBags: number;
    withStoragePct: number;
}

interface MaizeProductionOutlookTabProps {
    totalMaizeAcreage: number;
    totalGreenAcreage: number;
    totalSilageAcreage: number;
    totalExpectedYieldBags: number;
    activeProductionConstraints: ProductionConstraintData[];
    activeCopingStrategies: CopingStrategyData[];
    activePerformanceRatings: PerformanceRatingData[];
    activeVisitedFarmers: number;
    activeStorageDataProp?: StorageData;
}

export default function MaizeProductionOutlookTab({
    totalMaizeAcreage,
    totalGreenAcreage,
    totalSilageAcreage,
    totalExpectedYieldBags,
    activeProductionConstraints,
    activeCopingStrategies,
    activePerformanceRatings,
    activeVisitedFarmers,
    activeStorageDataProp,
}: MaizeProductionOutlookTabProps) {
    const COLORS = ["#059669", "#0284c7", "#ea580c", "#7c3aed", "#db2777"];

    const activeStorageData = React.useMemo(() => {
        if (activeStorageDataProp) {
            return activeStorageDataProp;
        }

        const zeroBags = Math.round(activeVisitedFarmers * 0.48);
        const oneToFiveBags = Math.round(activeVisitedFarmers * 0.24);
        const sixToTenBags = Math.round(activeVisitedFarmers * 0.15);
        const elevenToTwentyBags = Math.round(activeVisitedFarmers * 0.08);
        const overTwentyBags = Math.round(activeVisitedFarmers * 0.05);

        const totalBags = (oneToFiveBags * 3) + (sixToTenBags * 8) + (elevenToTwentyBags * 15) + (overTwentyBags * 30);
        const avgBags = activeVisitedFarmers > 0 ? (totalBags / activeVisitedFarmers) : 0;
        const withStoragePct = activeVisitedFarmers > 0 ? ((activeVisitedFarmers - zeroBags) / activeVisitedFarmers) * 100 : 0;

        return {
            chartData: [
                { range: "0 bags", value: zeroBags, percentage: 48.0 },
                { range: "1 - 5 bags", value: oneToFiveBags, percentage: 24.0 },
                { range: "6 - 10 bags", value: sixToTenBags, percentage: 15.0 },
                { range: "11 - 20 bags", value: elevenToTwentyBags, percentage: 8.0 },
                { range: "20+ bags", value: overTwentyBags, percentage: 5.0 },
            ],
            totalBags,
            avgBags,
            withStoragePct
        };
    }, [activeVisitedFarmers, activeStorageDataProp]);

    const grainMaizeAcreage = Math.max(0, totalMaizeAcreage - totalGreenAcreage - totalSilageAcreage);


    const categories = [
        { name: "Grain maize", value: grainMaizeAcreage, color: "#10b981" },
        { name: "Green maize", value: totalGreenAcreage, color: "#3b82f6" },
        { name: "Silage", value: totalSilageAcreage, color: "#f59e0b" },
    ];

    const totalAcreage = categories.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in-50 duration-300">
            {/* Area Utilization */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                        Area Utilization
                    </CardTitle>
                    <CardDescription>
                        Distribution of surveyed maize crop acreage by utilization category.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-8">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categories}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                    formatter={(val: unknown) => [`${Number(val).toLocaleString()} Acres`, "Acreage"]}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-full">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-2 font-semibold text-left text-xs uppercase tracking-wider">Category</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Acres</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Share (%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {categories.map((item) => {
                                    const share = totalAcreage > 0 ? (item.value / totalAcreage) * 100 : 0;
                                    return (
                                        <tr key={item.name} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-2 font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                                                <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                                {item.name}
                                            </td>
                                            <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.value.toLocaleString()}</td>
                                            <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{share.toFixed(1)}%</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Expected Yield */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        Expected Yield
                    </CardTitle>
                    <CardDescription>
                        Key productivity benchmarks and crop yield outlook for the current season.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                    <div className="border border-slate-100 rounded-xl overflow-hidden">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-3 font-semibold text-left text-xs uppercase tracking-wider">Indicator</th>
                                    <th className="p-3 font-semibold text-right text-xs uppercase tracking-wider">Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                <tr className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-3 font-bold text-slate-700 text-xs sm:text-sm">Average expected yield (Bags/Acre) (E09)</td>
                                    <td className="p-3 text-slate-800 font-mono text-right text-xs sm:text-sm font-bold">20.0</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-3 font-bold text-slate-700 text-xs sm:text-sm">Expected total production (Bags)</td>
                                    <td className="p-3 text-emerald-700 font-mono text-right text-xs sm:text-sm font-bold">{totalExpectedYieldBags.toLocaleString()}</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-3 font-bold text-slate-700 text-xs sm:text-sm">Previous year&apos;s yield (Bags/Acre) (E13)</td>
                                    <td className="p-3 text-slate-800 font-mono text-right text-xs sm:text-sm font-bold">5.0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Five-Year Yield Trend (Uses Mock/Fallback Data)
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        Five-Year Yield Trend
                    </CardTitle>
                    <CardDescription>
                        Historical average crop productivity compared with the current season projection.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart
                                    data={[
                                        { year: "2022", Yield: 5 },
                                        { year: "2023", Yield: 6 },
                                        { year: "2024", Yield: 4 },
                                        { year: "2025", Yield: 5 },
                                        { year: "2026 (Exp)", Yield: 20 }
                                    ]}
                                    margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Yield (Bags / Acre)', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={80} />
                                    <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                    <Legend verticalAlign="top" height={36} iconType="circle" />
                                    <Bar dataKey="Yield" name="Yield (Bags/Acre)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={35} />
                                    <Line type="monotone" dataKey="Yield" name="Yield Trend" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }}>
                                        <LabelList dataKey="Yield" position="top" style={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} formatter={(val: unknown) => `${val} Bags`} />
                                    </Line>
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="border border-slate-100 rounded-xl overflow-hidden h-fit">
                            <table className="w-full border-collapse text-left text-sm">
                                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                    <tr>
                                        <th className="p-3 font-semibold text-left text-xs uppercase tracking-wider">Year</th>
                                        <th className="p-3 font-semibold text-right text-xs uppercase tracking-wider">Average Yield (Bags/Acre)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-3 font-bold text-slate-700 text-xs sm:text-sm">2022</td>
                                        <td className="p-3 text-slate-800 font-mono text-right text-xs sm:text-sm font-bold">5.0</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-3 font-bold text-slate-700 text-xs sm:text-sm">2023</td>
                                        <td className="p-3 text-slate-800 font-mono text-right text-xs sm:text-sm font-bold">6.0</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-3 font-bold text-slate-700 text-xs sm:text-sm">2024</td>
                                        <td className="p-3 text-slate-800 font-mono text-right text-xs sm:text-sm font-bold">4.0</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-3 font-bold text-slate-700 text-xs sm:text-sm">2025</td>
                                        <td className="p-3 text-slate-800 font-mono text-right text-xs sm:text-sm font-bold">5.0</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors bg-emerald-50/20">
                                        <td className="p-3 font-bold text-emerald-800 text-xs sm:text-sm">2026 Expected</td>
                                        <td className="p-3 text-emerald-700 font-mono text-right text-xs sm:text-sm font-extrabold">20.0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardContent>
            </Card>
            */}

            {/* Expected Utilization of Harvest (Uses Mock/Fallback Data)
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        Expected Utilization of Harvest
                    </CardTitle>
                    <CardDescription>
                        Intended post-harvest allocation and utilization of expected maize production bags.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center justify-around gap-8">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: "Household consumption", value: totalExpectedYieldBags * 0.55, color: "#3b82f6" },
                                        { name: "Commercial sale", value: totalExpectedYieldBags * 0.30, color: "#10b981" },
                                        { name: "Livestock feed", value: totalExpectedYieldBags * 0.10, color: "#f59e0b" },
                                        { name: "Seed", value: totalExpectedYieldBags * 0.03, color: "#ec4899" },
                                        { name: "Other", value: totalExpectedYieldBags * 0.02, color: "#64748b" },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell fill="#3b82f6" />
                                    <Cell fill="#10b981" />
                                    <Cell fill="#f59e0b" />
                                    <Cell fill="#ec4899" />
                                    <Cell fill="#64748b" />
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                    formatter={(val: unknown) => [`${Math.round(Number(val)).toLocaleString()} Bags`, "Volume"]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-full">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-3 font-semibold text-left text-xs uppercase tracking-wider">Intended Use</th>
                                    <th className="p-3 font-semibold text-right text-xs uppercase tracking-wider">Estimated Bags</th>
                                    <th className="p-3 font-semibold text-right text-xs uppercase tracking-wider">Percentage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {[
                                    { name: "Household consumption", pct: 55, color: "#3b82f6" },
                                    { name: "Commercial sale", pct: 30, color: "#10b981" },
                                    { name: "Livestock feed", pct: 10, color: "#f59e0b" },
                                    { name: "Seed", pct: 3, color: "#ec4899" },
                                    { name: "Other", pct: 2, color: "#64748b" },
                                ].map((item) => {
                                    const bags = Math.round(totalExpectedYieldBags * (item.pct / 100));
                                    return (
                                        <tr key={item.name} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-3 font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                                                <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                                {item.name}
                                            </td>
                                            <td className="p-3 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{bags.toLocaleString()}</td>
                                            <td className="p-3 text-slate-800 font-mono font-bold text-right text-xs sm:text-sm">{item.pct.toFixed(1)}%</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
            */}

            {/* Chart: Maize Storage from Previous Year (Uses Mock/Fallback Data)
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Package className="w-5 h-5 text-emerald-600" />
                        Maize Stocks in Storage (Previous Year&apos;s Harvest)
                    </CardTitle>
                    <CardDescription>
                        Distribution of surveyed farmers currently holding maize bags in storage from the previous year&apos;s harvest.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-2 h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={activeStorageData.chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Bags in Storage (90Kg)', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Farmers Count', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={80} />
                                    <Tooltip
                                        contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                        formatter={(value: unknown) => [
                                            Number(value || 0).toLocaleString(),
                                            "Farmers",
                                        ]}
                                    />
                                    <Bar dataKey="value" name="Farmers Surveyed" fill="#059669" radius={[4, 4, 0, 0]} maxBarSize={60}>
                                        {activeStorageData.chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? "#cbd5e1" : COLORS[index % COLORS.length]} />
                                        ))}
                                        <LabelList dataKey="value" position="top" style={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-5">
                            <h4 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2">Storage Summary Stats</h4>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-xs font-semibold text-slate-500">Total Bags in Storage</span>
                                    <span className="text-sm font-extrabold text-emerald-700 font-mono">
                                        {Math.round(activeStorageData.totalBags).toLocaleString()} bags
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-xs font-semibold text-slate-500">Farmers with Maize in Stock</span>
                                    <span className="text-sm font-extrabold text-slate-800">
                                        {activeStorageData.withStoragePct.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-500">Average Stock / Household</span>
                                    <span className="text-sm font-extrabold text-slate-800">
                                        {activeStorageData.avgBags.toFixed(1)} bags
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-150 rounded-lg p-3 text-xs text-slate-500 leading-normal font-medium">
                                <strong className="text-slate-700 block mb-1">Post-Harvest Note:</strong>
                                Out of the total surveyed maize farming households, approximately <strong className="text-emerald-700">{activeStorageData.withStoragePct.toFixed(0)}%</strong> still retain stocks in storage from the previous year. This shows stable grain security buffer levels.
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            */}

            {/* Key Constraints Affecting Production (Uses Mock/Fallback Data)
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Key Constraints Affecting Production
                    </CardTitle>
                    <CardDescription>
                        Main factors limiting crop productivity and severity levels among surveyed farmers.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                    <div className="border border-slate-100 rounded-xl overflow-hidden">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-2 font-semibold text-left text-xs uppercase tracking-wider">Constraint</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Farmers Affected (%)</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Severity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {activeProductionConstraints.map((item) => (
                                    <tr key={item.constraint} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-2 font-bold text-slate-800 text-xs sm:text-sm">{item.constraint}</td>
                                        <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.percentage.toFixed(1)}%</td>
                                        <td className="p-2 text-right">
                                            <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full border ${item.severity === "High"
                                                    ? "bg-red-50 text-red-700 border-red-200"
                                                    : item.severity === "Medium"
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
                </CardContent>
            </Card>
            */}

            {/* Farmers' Coping Strategies (Uses Mock/Fallback Data)
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        Farmers&apos; Coping Strategies
                    </CardTitle>
                    <CardDescription>
                        Interventions and coping mechanisms adopted by farmers to mitigate production stress.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[180px] h-[180px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activeCopingStrategies}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={75}
                                    paddingAngle={3}
                                    dataKey="percentage"
                                >
                                    {activeCopingStrategies.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} formatter={(val: unknown) => `${val}%`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-2 font-semibold text-left text-xs uppercase tracking-wider">Intervention</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Farmers (%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {activeCopingStrategies.map((item) => (
                                    <tr key={item.intervention} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-2 font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                                            <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            {item.intervention}
                                        </td>
                                        <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.percentage.toFixed(1)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
            */}

            {/* Overall Performance Rating (Uses Mock/Fallback Data)
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        Overall Performance Rating
                    </CardTitle>
                    <CardDescription>
                        Season performance scorecards across key agronomic and management indicators.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                    <div className="border border-slate-100 rounded-xl overflow-hidden">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-3 font-semibold text-left text-xs uppercase tracking-wider">Indicator</th>
                                    <th className="p-3 font-semibold text-right text-xs uppercase tracking-wider">Rating</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {activePerformanceRatings.map((item) => (
                                    <tr key={item.indicator} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-3 font-bold text-slate-700 text-xs sm:text-sm">{item.indicator}</td>
                                        <td className="p-3 text-right">
                                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${item.rating === "Excellent" || item.rating === "Above Average"
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                    : item.rating === "Good" || item.rating === "Average"
                                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                                        : item.rating === "Fair"
                                                            ? "bg-amber-50 text-amber-700 border-amber-200"
                                                            : "bg-red-50 text-red-700 border-red-200"
                                                }`}>
                                                {item.rating}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
            */}
        </div>
    );
}

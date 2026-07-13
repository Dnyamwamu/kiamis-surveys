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
    FileSpreadsheet,
    Sun,
    BarChart3,
    CalendarDays,
    Droplets,
    Leaf,
    Layers,
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
    AreaChart,
    Area,
    PieChart,
    Pie,
} from "recharts";

interface CountyAcreageData {
    county: string;
    acres: number;
    rainfed: number;
    irrigated: number;
}

interface CountySunflowerData {
    county: string;
    interested: number;
}

interface GrowthStageData {
    stage: string;
    Count: number;
}

interface PlantingDateData {
    period: string;
    Percentage: number;
}

interface IrrigationData {
    name: string;
    value: number;
    percentage: number;
    color: string;
}

interface CropUniformityData {
    name: string;
    value: number;
    percentage: number;
    color: string;
}

interface GrowthStageDetailed {
    stage: string;
    acreage: string;
    uniformity: string;
    color: string;
    irrigation: string;
}

interface PlantColorData {
    name: string;
    value: number;
    percentage: number;
    color: string;
}

interface MaizeGrowthTabProps {
    topCountiesAcreageData: CountyAcreageData[];
    sortedCountyMaizeAcreageData: CountyAcreageData[];
    totalMaizeAcreage: number;
    topCountiesSunflowerData: CountySunflowerData[];
    sortedCountySunflowerData: CountySunflowerData[];
    totalSunflowerInterested: number;
    activeGrowthStageData: GrowthStageData[];
    activePlantingDateData: PlantingDateData[];
    activeIrrigationData: IrrigationData[];
    activeCropUniformityData: CropUniformityData[];
    activePlantColorData: PlantColorData[];
    activeGrowthStageDetailedData: GrowthStageDetailed[];
    COLORS: string[];
    averageAcreage: number;
}

export default function MaizeGrowthTab({
    topCountiesAcreageData,
    sortedCountyMaizeAcreageData,
    totalMaizeAcreage,
    topCountiesSunflowerData,
    sortedCountySunflowerData,
    totalSunflowerInterested,
    activeGrowthStageData,
    activePlantingDateData,
    activeIrrigationData,
    activeCropUniformityData,
    activePlantColorData,
    activeGrowthStageDetailedData,
    COLORS,
    averageAcreage,
}: MaizeGrowthTabProps) {
    const rainfedAcreage = sortedCountyMaizeAcreageData.reduce((sum, item) => sum + (item.rainfed || 0), 0);
    const irrigatedAcreage = sortedCountyMaizeAcreageData.reduce((sum, item) => sum + (item.irrigated || 0), 0);
    const totalGrowthCount = activeGrowthStageData.reduce((sum, item) => sum + (item.Count || 0), 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Area Under Maize (County vs Acres) */}
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                        Area Under Maize (County vs Acres)
                    </CardTitle>
                    <CardDescription>
                        Distribution of surveyed maize crop acreage by county and total cultivated area.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Column 1: Horizontal Bar Chart of Top Counties */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">Top 5 Counties by Maize Acreage</h4>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        layout="vertical"
                                        data={topCountiesAcreageData}
                                        margin={{ top: 5, right: 35, left: 10, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                        <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Maize Area (Acres)', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                        <YAxis dataKey="county" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={100} label={{ value: 'County', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                                        <Tooltip
                                            contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                            formatter={(value: unknown) => [`${Number(value).toLocaleString()} Acres`, "Acreage"]}
                                        />
                                        <Legend verticalAlign="top" height={36} iconType="circle" />
                                        <Bar dataKey="acres" name="Cultivated Maize Area" fill="#10b981" radius={[0, 4, 4, 0]}>
                                            <LabelList dataKey="acres" position="right" style={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Column 2: Area under Maize Production Summary Table */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">Area under Maize Production</h4>
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <table className="w-full border-collapse text-left text-sm">
                                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                        <tr>
                                            <th className="p-3 font-semibold text-left">Indicator</th>
                                            <th className="p-3 font-semibold text-right">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-3 font-medium text-slate-700 text-xs sm:text-sm">Total maize acreage assessed</td>
                                            <td className="p-3 text-slate-800 font-bold text-right text-xs sm:text-sm font-mono">{totalMaizeAcreage.toLocaleString()} Acres</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-3 font-medium text-slate-700 text-xs sm:text-sm">Rain-fed acreage</td>
                                            <td className="p-3 text-slate-800 font-bold text-right text-xs sm:text-sm font-mono">{rainfedAcreage.toLocaleString()} Acres</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-3 font-medium text-slate-700 text-xs sm:text-sm">Irrigated acreage</td>
                                            <td className="p-3 text-slate-800 font-bold text-right text-xs sm:text-sm font-mono">{irrigatedAcreage.toLocaleString()} Acres</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-3 font-medium text-slate-700 text-xs sm:text-sm">Average acreage per household</td>
                                            <td className="p-3 text-slate-800 font-bold text-right text-xs sm:text-sm font-mono">{averageAcreage.toFixed(1)} Acres</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Column 3: Scrollable Table of County vs Acres */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-slate-700">County Acreage</h4>
                                <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50">
                                    Total: {totalMaizeAcreage.toLocaleString()} Acres
                                </Badge>
                            </div>
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <div className="overflow-y-auto max-h-[298px]">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                                            <tr>
                                                <th className="p-3 font-semibold text-left">County</th>
                                                <th className="p-3 font-semibold text-right">Maize Area (Acres)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {sortedCountyMaizeAcreageData.map((item) => (
                                                <tr key={item.county} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="p-3 font-bold text-slate-800 text-xs sm:text-sm">{item.county}</td>
                                                    <td className="p-3 text-slate-600 font-mono text-right text-xs sm:text-sm">{item.acres.toLocaleString()}</td>
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

            {/* Sunflower Cultivation Interest by County */}
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Sun className="w-5 h-5 text-amber-500" />
                        Sunflower Cultivation Interest (County Comparison)
                    </CardTitle>
                    <CardDescription>
                        Distribution of farmers who expressed interest in sunflower cultivation as a crop diversification option.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Column 1: Horizontal Bar Chart of Top Counties */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">Top 5 Counties by Sunflower Interest</h4>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        layout="vertical"
                                        data={topCountiesSunflowerData}
                                        margin={{ top: 5, right: 35, left: 10, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                        <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Interested Farmers', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                        <YAxis dataKey="county" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={100} label={{ value: 'County', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                                        <Tooltip
                                            contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                            formatter={(value: unknown) => [`${Number(value).toLocaleString()} Farmers`, "Interested"]}
                                        />
                                        <Legend verticalAlign="top" height={36} iconType="circle" />
                                        <Bar dataKey="interested" name="Interested Farmers" fill="#fbbf24" radius={[0, 4, 4, 0]}>
                                            <LabelList dataKey="interested" position="right" style={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Column 2: Scrollable Table of County vs Sunflower Interest */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-slate-700">County Sunflower Interest</h4>
                                <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 font-bold">
                                    Total: {totalSunflowerInterested.toLocaleString()} Farmers
                                </Badge>
                            </div>
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <div className="overflow-y-auto max-h-[298px]">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                                            <tr>
                                                <th className="p-3 font-semibold text-left">County</th>
                                                <th className="p-3 font-semibold text-right">Interested Farmers</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {sortedCountySunflowerData.map((item) => (
                                                <tr key={item.county} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="p-3 font-bold text-slate-800 text-xs sm:text-sm">{item.county}</td>
                                                    <td className="p-3 text-slate-600 font-mono text-right text-xs sm:text-sm">{item.interested.toLocaleString()}</td>
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

            {/* Irrigation Mode Comparison (County Comparison) */}
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                        Source of Water Comparison (County Comparison)
                    </CardTitle>
                    <CardDescription>
                        County-level comparison of rainfed vs. irrigated cultivated area (top 10 counties).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            {/* Crop Growth Stages */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                        Crop Growth Stage Distribution
                    </CardTitle>
                    <CardDescription>
                        Growth stage representation of surveyed maize fields at the time of visit.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activeGrowthStageData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="stage" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Growth Stage', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Number of Farmers', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={80} />
                                <Tooltip 
                                    contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} 
                                    formatter={(value: unknown) => {
                                        const numVal = Number(value);
                                        const percent = totalGrowthCount > 0 ? ((numVal / totalGrowthCount) * 100).toFixed(1) : "0.0";
                                        return [`${numVal.toLocaleString()} (${percent}%)`, "Surveyed Fields"];
                                    }}
                                />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Bar dataKey="Count" name="Surveyed Fields" fill="#10b981" radius={[6, 6, 0, 0]}>
                                    {activeGrowthStageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                    <LabelList 
                                        dataKey="Count" 
                                        position="top" 
                                        style={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} 
                                        formatter={(val: unknown) => {
                                            const numVal = Number(val);
                                            const percent = totalGrowthCount > 0 ? ((numVal / totalGrowthCount) * 100).toFixed(0) : "0";
                                            return `${numVal.toLocaleString()} (${percent}%)`;
                                        }} 
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Planting Window Timeline */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-emerald-600" />
                        Planting Window Period
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

            {/* Irrigation & Water Source Profile */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-blue-600" />
                        Source of Water
                    </CardTitle>
                    <CardDescription>
                        Distribution of water sources used by farmers for maize production.                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activeIrrigationData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {activeIrrigationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 w-full">
                        {activeIrrigationData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-slate-800">{item.value.toLocaleString()} farmers</span>
                                    <span className="text-xs text-slate-500 ml-2">({item.percentage}%)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Crop Uniformity & Vigor */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-emerald-600" />
                        Crop Uniformity & Growth Vigor
                    </CardTitle>
                    <CardDescription>
                        Field observations on crop uniformity, patchiness, or stunting.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activeCropUniformityData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {activeCropUniformityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 w-full">
                        {activeCropUniformityData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-slate-800">{item.value.toLocaleString()} Fields</span>
                                    <span className="text-xs text-slate-500 ml-2">({item.percentage}%)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Crop Colour */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-emerald-600" />
                        Crop Colour
                    </CardTitle>
                    <CardDescription>
                        Visual color observation of maize crops across surveyed fields.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activePlantColorData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {activePlantColorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} 
                                    formatter={(value: unknown) => [`${Number(value).toLocaleString()} Fields`, "Observations"]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-2 font-semibold text-left text-xs uppercase tracking-wider">Observation</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Percentage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {activePlantColorData.map((item) => (
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

            {/* Detailed Crop Growth & Health Matrix */}
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-emerald-600" />
                        Detailed Crop Growth & Health Matrix
                    </CardTitle>
                    <CardDescription>
                        Granular details of crop acreage, uniformity, leaf color, and irrigation per growth stage.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm">
                                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                    <tr>
                                        <th className="p-4 font-semibold">Growth Stage</th>
                                        <th className="p-4 font-semibold">Estimated Acreage</th>
                                        <th className="p-4 font-semibold">Uniformity Profile</th>
                                        <th className="p-4 font-semibold">Vigor & Leaf Color</th>
                                        <th className="p-4 font-semibold">Primary Water Source</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {activeGrowthStageDetailedData.map((item) => (
                                        <tr key={item.stage} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4 font-bold text-slate-800">{item.stage}</td>
                                            <td className="p-4 text-slate-600 font-medium">{item.acreage}</td>
                                            <td className="p-4">
                                                <Badge className={
                                                    item.uniformity.includes("Even")
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                        : "bg-amber-50 text-amber-700 border border-amber-200"
                                                }>
                                                    {item.uniformity}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-slate-600">{item.color}</td>
                                            <td className="p-4">
                                                <Badge className={
                                                    item.irrigation.includes("Rainfed")
                                                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                                                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                }>
                                                    {item.irrigation}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

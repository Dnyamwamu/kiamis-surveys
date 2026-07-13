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
    PieChart as PieIcon,
    Sprout,
    AlertTriangle,
    Leaf,
    CheckCircle2,
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
} from "recharts";

interface SeedSourceData {
    name: string;
    value: number;
    percentage: number;
    color: string;
}

interface SeedVarietyData {
    name: string;
    value: number;
    percentage: number;
}

interface NutrientDeficiencyData {
    deficiency: string;
    Present: number;
    Absent: number;
}

interface FertilizerUseData {
    name: string;
    value: number;
    percentage: number;
    color: string;
}

interface MaizeFertilizerSeedTabProps {
    activeSeedSourceData: SeedSourceData[];
    activeSeedVarietyData: SeedVarietyData[];
    activeNutrientDeficiencyData: NutrientDeficiencyData[];
    activeFertilizerUseData: FertilizerUseData[];
    activeFertilizerApplicationData: FertilizerUseData[];
    activeVisitedFarmers: number;
    COLORS: string[];
}

export default function MaizeFertilizerSeedTab({
    activeSeedSourceData,
    activeSeedVarietyData,
    activeNutrientDeficiencyData,
    activeFertilizerUseData,
    activeFertilizerApplicationData,
    activeVisitedFarmers,
    COLORS,
}: MaizeFertilizerSeedTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fertilizer Use */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <PieIcon className="w-5 h-5 text-emerald-600" />
                        Fertilizer Use
                    </CardTitle>
                    <CardDescription>
                        Distribution of fertilizer applications and sources among surveyed fields.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activeFertilizerUseData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {activeFertilizerUseData.map((entry, index) => (
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
                                    <th className="p-2 font-semibold text-left text-xs uppercase tracking-wider">Indicator</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Responses</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Percentage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {(() => {
                                    // Subsidized
                                    const subsidizedItem = activeFertilizerUseData.find(d => d.name.toLowerCase().includes("subsidized"));
                                    const subsidized = subsidizedItem?.percentage || 0;
                                    const subsidizedVal = subsidizedItem?.value || 0;

                                    // Commercial
                                    const commercialItem = activeFertilizerUseData.find(d => d.name.toLowerCase().includes("commercial"));
                                    const commercial = commercialItem?.percentage || 0;
                                    const commercialVal = commercialItem?.value || 0;

                                    // Organic
                                    const organicItem = activeFertilizerUseData.find(d => d.name.toLowerCase().includes("organic") || d.name.toLowerCase().includes("manure"));
                                    const organic = organicItem?.percentage || 0;
                                    const organicVal = organicItem?.value || 0;

                                    // Total applying
                                    const totalApplying = subsidized + commercial + organic;
                                    const totalApplyingVal = subsidizedVal + commercialVal + organicVal;

                                    const rows = [
                                        { name: "Farmers applying fertilizer", val: totalApplyingVal, pct: totalApplying, color: "#10b981" },
                                        { name: "Government subsidized fertilizer", val: subsidizedVal, pct: subsidized, color: "#059669" },
                                        { name: "Commercial fertilizer", val: commercialVal, pct: commercial, color: "#3b82f6" },
                                        { name: "Organic manure", val: organicVal, pct: organic, color: "#fbbf24" }
                                    ];

                                    return rows.map((item) => (
                                        <tr key={item.name} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-2 font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                                                <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                                {item.name}
                                            </td>
                                            <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.val.toLocaleString()}</td>
                                            <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.pct.toFixed(1)}%</td>
                                        </tr>
                                    ));
                                })()}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Fertilizer Application */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        Fertilizer Application
                    </CardTitle>
                    <CardDescription>
                        Progress of basal and top-dressing fertilizer applications across surveyed fields.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={(() => {
                                        const completed = activeFertilizerApplicationData.find(d => d.name.toLowerCase().includes("completed"))?.value || 0;
                                        const completedPct = activeFertilizerApplicationData.find(d => d.name.toLowerCase().includes("completed"))?.percentage || 0;
                                        const pending = activeFertilizerApplicationData.find(d => d.name.toLowerCase().includes("pending"))?.value || 0;
                                        const pendingPct = activeFertilizerApplicationData.find(d => d.name.toLowerCase().includes("pending"))?.percentage || 0;
                                        const totalVisited = activeVisitedFarmers || (completed + pending);
                                        const noFertVal = Math.max(0, totalVisited - (completed + pending));
                                        const noFertPct = Math.max(0, 100 - (completedPct + pendingPct));

                                        return [
                                            { name: "Basal & Top Dressing Completed", value: completed, percentage: completedPct, color: "#3b82f6" },
                                            { name: "Basal Only (Top Dressing Pending)", value: pending, percentage: pendingPct, color: "#fbbf24" },
                                            { name: "No Fertilizer Applied", value: noFertVal, percentage: noFertPct, color: "#64748b" }
                                        ];
                                    })()}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {[
                                        { color: "#3b82f6" },
                                        { color: "#fbbf24" },
                                        { color: "#64748b" }
                                    ].map((entry, index) => (
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
                                    <th className="p-2 font-semibold text-left text-xs uppercase tracking-wider">Application</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Responses</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Farmers (%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {activeFertilizerApplicationData.map((item) => (
                                    <tr key={item.name} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-2 font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                                            <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            {item.name}
                                        </td>
                                        <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.value.toLocaleString()}</td>
                                        <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.percentage.toFixed(1)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Seed Source Distribution */}
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

            {/* Seed Variety Distribution */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Sprout className="w-5 h-5 text-emerald-600" />
                        Type of Seed Variety
                    </CardTitle>
                    <CardDescription>
                        Distribution of major maize seed varieties used by surveyed farmers.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activeSeedVarietyData} layout="vertical" margin={{ top: 10, right: 40, left: 35, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Farmers Count', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={11} tickLine={false} width={130} label={{ value: 'Seed Variety', angle: -90, position: 'insideLeft', offset: 25, fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Bar dataKey="value" name="Farmers Count" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                                    {activeSeedVarietyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                    <LabelList dataKey="value" position="right" style={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Nutrient Deficiencies */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Nutrient Deficiency Indicators
                    </CardTitle>
                    <CardDescription>
                        Visual symptoms of nutrient deficiencies observed across surveyed fields.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={(() => {
                                        const nitrogenPct = activeNutrientDeficiencyData.find(d => d.deficiency.toLowerCase().includes("nitrogen"))?.Present || 15.0;
                                        const phosphorusPct = activeNutrientDeficiencyData.find(d => d.deficiency.toLowerCase().includes("phosphorus"))?.Present || 12.0;
                                        const healthyPct = Math.max(0, 100 - (nitrogenPct + phosphorusPct));

                                        return [
                                            { name: "Nitrogen deficiency", percentage: nitrogenPct, color: "#fbbf24" },
                                            { name: "Phosphorus deficiency", percentage: phosphorusPct, color: "#3b82f6" },
                                            { name: "No deficiency detected", percentage: healthyPct, color: "#10b981" }
                                        ];
                                    })()}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="percentage"
                                >
                                    {[
                                        { color: "#fbbf24" },
                                        { color: "#3b82f6" },
                                        { color: "#10b981" }
                                    ].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                    formatter={(value: unknown) => [`${value}%`, "Prevalence"]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-2 font-semibold text-left text-xs uppercase tracking-wider">Deficiency</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Responses</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Percentage of Farms</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {(() => {
                                    const nitrogenPct = activeNutrientDeficiencyData.find(d => d.deficiency.toLowerCase().includes("nitrogen"))?.Present || 15.0;
                                    const phosphorusPct = activeNutrientDeficiencyData.find(d => d.deficiency.toLowerCase().includes("phosphorus"))?.Present || 12.0;

                                    const rows = [
                                        { name: "Nitrogen deficiency", val: Math.round(activeVisitedFarmers * (nitrogenPct / 100)), pct: nitrogenPct, color: "#fbbf24" },
                                        { name: "Phosphorus deficiency", val: Math.round(activeVisitedFarmers * (phosphorusPct / 100)), pct: phosphorusPct, color: "#3b82f6" }
                                    ];

                                    return rows.map((item) => (
                                        <tr key={item.name} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-2 font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                                                <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                                {item.name}
                                            </td>
                                            <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.val.toLocaleString()}</td>
                                            <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">{item.pct.toFixed(1)}%</td>
                                        </tr>
                                    ));
                                })()}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

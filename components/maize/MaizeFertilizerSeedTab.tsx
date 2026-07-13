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
    AlertTriangle,
} from "lucide-react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

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
    activeNutrientDeficiencyData: NutrientDeficiencyData[];
    activeFertilizerUseData: FertilizerUseData[];
    activeFertilizerApplicationData: FertilizerUseData[];
    activeVisitedFarmers: number;
    COLORS: string[];
}

export default function MaizeFertilizerSeedTab({
    activeNutrientDeficiencyData,
    activeFertilizerUseData,
    activeFertilizerApplicationData,
    activeVisitedFarmers,
    COLORS,
}: MaizeFertilizerSeedTabProps) {
    const nitrogenPct = activeNutrientDeficiencyData.find(d => d.deficiency.toLowerCase().includes("nitrogen"))?.Present || 15.0;
    const phosphorusPct = activeNutrientDeficiencyData.find(d => d.deficiency.toLowerCase().includes("phosphorus"))?.Present || 12.0;
    const healthyPct = Math.max(0, 100 - (nitrogenPct + phosphorusPct));

    const pieData = [
        { name: "Nitrogen deficiency", percentage: nitrogenPct, color: "#fbbf24" },
        { name: "Phosphorus deficiency", percentage: phosphorusPct, color: "#3b82f6" },
        { name: "No deficiency detected", percentage: healthyPct, color: "#10b981" }
    ];

    const tableRows = [
        { name: "Nitrogen deficiency", val: Math.round(activeVisitedFarmers * (nitrogenPct / 100)), pct: nitrogenPct, color: "#fbbf24" },
        { name: "Phosphorus deficiency", val: Math.round(activeVisitedFarmers * (phosphorusPct / 100)), pct: phosphorusPct, color: "#3b82f6" }
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Fertilizer Use */}
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
                                    <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-4 w-full">
                            {activeFertilizerUseData.map((item) => (
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

                {/* 2. Fertilizer Application */}
                <Card className="shadow-md border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <PieIcon className="w-5 h-5 text-emerald-600" />
                            Fertilizer Application
                        </CardTitle>
                        <CardDescription>
                            Proportion of fields according to the fertilizer application type (Basal vs Top Dressing).
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                        <div className="w-[200px] h-[200px] shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={activeFertilizerApplicationData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {activeFertilizerApplicationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-4 w-full">
                            {activeFertilizerApplicationData.map((item) => (
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
            </div>

            {/* 3. Nutrient Deficiency */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Nutrient Deficiency
                    </CardTitle>
                    <CardDescription>
                        Observation details of primary nutrient deficiency symptoms in maize plants.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center justify-around gap-8">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="percentage"
                                >
                                    {pieData.map((entry, index) => (
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
                                    <th className="p-2 font-semibold text-left text-xs uppercase tracking-wider">Deficiency Symptom</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Response Count</th>
                                    <th className="p-2 font-semibold text-right text-xs uppercase tracking-wider">Percentage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {tableRows.map((item) => (
                                    <tr key={item.name} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-2 font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                                            <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            {item.name}
                                        </td>
                                        <td className="p-2 text-slate-600 font-mono text-right text-xs sm:text-sm font-semibold">
                                            {item.val.toLocaleString()}
                                        </td>
                                        <td className="p-2 text-slate-800 font-mono font-bold text-right text-xs sm:text-sm">
                                            {item.pct.toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

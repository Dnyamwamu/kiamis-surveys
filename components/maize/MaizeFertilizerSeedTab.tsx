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

interface PlantColorData {
    name: string;
    value: number;
    color: string;
}

interface MaizeFertilizerSeedTabProps {
    activeSeedSourceData: SeedSourceData[];
    activeSeedVarietyData: SeedVarietyData[];
    activeNutrientDeficiencyData: NutrientDeficiencyData[];
    activePlantColorData: PlantColorData[];
    activeVisitedFarmers: number;
    COLORS: string[];
}

export default function MaizeFertilizerSeedTab({
    activeSeedSourceData,
    activeSeedVarietyData,
    activeNutrientDeficiencyData,
    activePlantColorData,
    activeVisitedFarmers,
    COLORS,
}: MaizeFertilizerSeedTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                        Percentage of fields showing nitrogen and phosphorus deficiency visual symptoms.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activeNutrientDeficiencyData} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Prevalence (%)', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis dataKey="deficiency" type="category" stroke="#475569" fontSize={12} tickLine={false} label={{ value: 'Nutrient indicator', angle: -90, position: 'insideLeft', offset: 25, fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Bar dataKey="Present" name="Present (%)" fill="#fbbf24" stackId="a" radius={[0, 4, 4, 0]}>
                                    <LabelList dataKey="Present" position="inside" style={{ fill: '#ffffff', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => `${val}%`} />
                                </Bar>
                                <Bar dataKey="Absent" name="Not Detected (%)" fill="#10b981" stackId="a" radius={[0, 0, 0, 0]}>
                                    <LabelList dataKey="Absent" position="inside" style={{ fill: '#ffffff', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => `${val}%`} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Plant Color Profile */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-emerald-600" />
                        Plant Color Profile (Leaf Health)
                    </CardTitle>
                    <CardDescription>
                        Leaf color diagnostics signifying nutrient status and crop vigor.
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
                                    innerRadius={0}
                                    outerRadius={80}
                                    dataKey="value"
                                >
                                    {activePlantColorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 w-full">
                        {activePlantColorData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800">
                                    {activeVisitedFarmers > 0 ? ((item.value / activeVisitedFarmers) * 100).toFixed(1) : 0}%
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

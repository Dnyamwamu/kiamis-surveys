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
    BarChart3,
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
    PieChart,
    Pie,
} from "recharts";

interface GrowthStageData {
    stage: string;
    Count: number;
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
    activeGrowthStageData: GrowthStageData[];
    activeCropUniformityData: CropUniformityData[];
    activePlantColorData: PlantColorData[];
    activeGrowthStageDetailedData: GrowthStageDetailed[];
    COLORS: string[];
}

export default function MaizeGrowthTab({
    activeGrowthStageData,
    activeCropUniformityData,
    activePlantColorData,
    activeGrowthStageDetailedData,
    COLORS,
}: MaizeGrowthTabProps) {
    const totalGrowthCount = activeGrowthStageData.reduce((sum, item) => sum + (item.Count || 0), 0);

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* 1. Crop Growth Stage Distribution */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                        Current Crop Growth Stage
                    </CardTitle>
                    <CardDescription>
                        Growth stage representation of surveyed maize fields at the time of visit.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
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
                                        style={{ fill: '#334155', fontSize: 10, fontWeight: 600 }}
                                        formatter={(val: unknown) => {
                                            const numVal = Number(val);
                                            const percent = totalGrowthCount > 0 ? ((numVal / totalGrowthCount) * 100).toFixed(1) : "0.0";
                                            return `${numVal.toLocaleString()} (${percent}%)`;
                                        }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 2. Crop Uniformity */}
                <Card className="shadow-md border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-emerald-600" />
                            Crop Uniformity
                        </CardTitle>
                        <CardDescription>
                            Field observations on crop uniformity, patchiness, or stunting.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                        <div className="w-[200px] h-[200px] shrink-0">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
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
                                        <span className="text-sm font-bold text-slate-800">{item.value.toLocaleString()} </span>
                                        <span className="text-xs text-slate-500 ml-2">({item.percentage}%)</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Crop Colour (Uses Mock/Fallback Data)
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
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
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
                */}
            </div>

            {/* Detailed Crop Growth & Health Matrix */}
            <Card className="shadow-md border-slate-200">
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

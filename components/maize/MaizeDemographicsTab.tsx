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
    Users,
    PieChart as PieIcon,
    Home,
    BarChart3,
    Activity,
    Compass,
} from "lucide-react";
import KenyaFarmersD3Map from "@/components/maps/kenya-farmers-d3-map";
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
    PieChart,
    Pie,
    Cell,
} from "recharts";

interface DemographicsData {
    name: string;
    value: number;
    percentage?: number;
}

interface HouseholdRangeData {
    range: string;
    value: number;
}

interface DailyProgressData {
    day: string;
    Visited: number;
}

interface TargetComparisonData {
    name: string;
    Surveyed: number;
    Target: number;
}

interface MaizeDemographicsTabProps {
    activeDailyProgressData: DailyProgressData[];
    activeGenderData: DemographicsData[];
    activeRegistrationData: DemographicsData[];
    activeHouseholdRangeData: HouseholdRangeData[];
    activeTargetComparisonData: TargetComparisonData[];
    COLORS: string[];
    filteredCountyData: { county: string; visited: number; target: number; project: string }[];
    liveCountyPerformanceData: { county: string; visited: number; target: number; project: string }[];
    selectedCounty: string;
    setSelectedCounty: (val: string) => void;
    setSelectedSubCounty: (val: string) => void;
    setSelectedWard: (val: string) => void;
}

export default function MaizeDemographicsTab({
    activeDailyProgressData,
    activeGenderData,
    activeRegistrationData,
    activeHouseholdRangeData,
    activeTargetComparisonData,
    COLORS,
    filteredCountyData,
    liveCountyPerformanceData,
    selectedCounty,
    setSelectedCounty,
    setSelectedSubCounty,
    setSelectedWard,
}: MaizeDemographicsTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interactive Map Card */}
            <Card className="shadow-md border-slate-200 lg:col-span-2 relative overflow-hidden">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Compass className="w-5 h-5 text-emerald-600" />
                                Interactive County Assessment Map
                            </CardTitle>
                            <CardDescription>
                                Geographical distribution of progress. Click any county to filter the entire dashboard.
                            </CardDescription>
                        </div>
                        {selectedCounty && (
                            <button
                                onClick={() => {
                                    setSelectedCounty("");
                                    setSelectedSubCounty("");
                                    setSelectedWard("");
                                }}
                                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                            >
                                Clear Map Filter
                            </button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="bg-slate-50/50 min-h-[500px] p-4 flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 flex flex-col justify-between">
                        <KenyaFarmersD3Map
                            showCardWrapper={false}
                            selectedCounty={selectedCounty}
                            onCountySelect={(county) => {
                                setSelectedCounty(county);
                                setSelectedSubCounty("");
                                setSelectedWard("");
                            }}
                            surveyData={filteredCountyData}
                        />

                        {/* Map Legend Overlay */}
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-600">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span>95%+ Completion</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-amber-500" />
                                <span>85% - 95% Completion</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                <span>&lt;85% Completion</span>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable County performance list */}
                    <div className="w-full lg:w-80 bg-white border border-slate-200 rounded-xl p-4 flex flex-col h-[480px]">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                            <span>Counties Summary</span>
                            <span className="text-xs text-slate-500 font-semibold">{liveCountyPerformanceData.length} Counties</span>
                        </h4>
                        <div className="overflow-y-auto flex-1 space-y-2 pr-1 select-none">
                            {liveCountyPerformanceData.map((item) => {
                                const isSelected = selectedCounty.toLowerCase() === item.county.toLowerCase();
                                const completionRate = item.target > 0 ? (item.visited / item.target) * 100 : 0;
                                return (
                                    <div
                                        key={item.county}
                                        onClick={() => {
                                            if (isSelected) {
                                                setSelectedCounty("");
                                            } else {
                                                setSelectedCounty(item.county);
                                            }
                                            setSelectedSubCounty("");
                                            setSelectedWard("");
                                        }}
                                        className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                                            isSelected
                                                ? "bg-emerald-50 border-emerald-500 shadow-sm"
                                                : "bg-slate-50 hover:bg-slate-100/80 border-slate-100 hover:border-slate-200"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-sm font-bold ${isSelected ? "text-emerald-950" : "text-slate-800"}`}>
                                                {item.county}
                                            </span>
                                            <span className={`text-xs font-semibold ${isSelected ? "text-emerald-700" : "text-slate-500"}`}>
                                                {item.project}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                                            <span>Reached: <strong className="text-slate-700 font-bold">{item.visited.toLocaleString()}</strong></span>
                                            <span>{completionRate.toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                                            <div
                                                className={`h-1.5 rounded-full ${isSelected ? "bg-emerald-600" : "bg-emerald-500"}`}
                                                style={{ width: `${Math.min(100, completionRate)}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Chart 1: Daily Registration Progress */}
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-600" />
                        Daily Assessment Progress
                    </CardTitle>
                    <CardDescription>
                        Tracking the daily volume of farmers visited by field agripreneurs over the last 30 days.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activeDailyProgressData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Date / Day', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Farmers Visited', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={60} />
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

            {/* Chart 3: Gender Segregation */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <PieIcon className="w-5 h-5 text-emerald-600" />
                        Gender Segregation of Visited Farmers
                    </CardTitle>
                    <CardDescription>
                        Breakdown of visited maize farmers segregated by gender.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activeGenderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {activeGenderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 w-full">
                        {activeGenderData.map((item, index) => (
                            <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
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

            {/* Chart 4: KIAMIS Registered vs New Farmers */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        KIAMIS Registered vs New Farmers
                    </CardTitle>
                    <CardDescription>
                        Comparison between farmers pre-existing in KIAMIS vs new ones discovered/registered during the survey.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="w-[200px] h-[200px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activeRegistrationData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    outerRadius={80}
                                    paddingAngle={0}
                                    dataKey="value"
                                >
                                    {activeRegistrationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 w-full">
                        {activeRegistrationData.map((item, index) => (
                            <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: COLORS[(index + 1) % COLORS.length] }} />
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

            {/* Chart 5: Household Size Distribution */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Home className="w-5 h-5 text-emerald-600" />
                        Household Size Distribution
                    </CardTitle>
                    <CardDescription>
                        Number of surveyed farmers categorized by household member ranges.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activeHouseholdRangeData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Household Size Range', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Farmers Count', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={60} />
                                <Tooltip
                                    contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                    formatter={(value: unknown) => [
                                        Number(value || 0).toLocaleString(),
                                        "Farmers",
                                    ]}
                                />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Bar dataKey="value" name="Farmers Surveyed" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={50}>
                                    {activeHouseholdRangeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                    <LabelList dataKey="value" position="top" style={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Chart 5: Survey Maize Farmers vs KIAMIS Target */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                        Surveyed Maize Farmers vs Target
                    </CardTitle>
                    <CardDescription>
                        Comparison of the completed field survey records against the target goal.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activeTargetComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Category', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Farmers Count', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={60} />
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Bar dataKey="Surveyed" fill="#10b981" radius={[8, 8, 0, 0]} maxBarSize={120}>
                                    <LabelList dataKey="Surveyed" position="top" style={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                </Bar>
                                <Bar dataKey="Target" fill="#cbd5e1" radius={[8, 8, 0, 0]} maxBarSize={120}>
                                    <LabelList dataKey="Target" position="top" style={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} formatter={(val: unknown) => Number(val).toLocaleString()} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

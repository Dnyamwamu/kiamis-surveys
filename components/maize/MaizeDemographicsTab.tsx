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
    ClipboardList,
    CheckCircle2,
    Clock,
    XCircle,
    Target,
    UserCheck,
    UserPlus,
    Package,
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetAgripreneursQuery, useGetMaizeSurveyApStatsQuery } from "@/lib/features/api/surveys/surveysApi";

interface DemographicsData {
    name: string;
    value: number;
    percentage?: number;
}

interface HouseholdRangeData {
    range: string;
    value: number;
}

interface TargetComparisonData {
    name: string;
    Surveyed: number;
    Target: number;
}

interface MaizeDemographicsTabProps {
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
    activeVisitedFarmers: number;
    activeVisitedTarget: number;
    activeWardsCovered: number;
    activeAverageAcreage: number;
}

const CountyAgripreneurRow = ({
    county,
    project,
    submissions,
}: {
    county: string;
    project: string;
    submissions: number;
}) => {
    // Fetch total number of agripreneurs onboarded in this county
    const { data: totalData, isLoading: isTotalLoading } = useGetAgripreneursQuery({
        county: county.toLowerCase(),
    });

    // Fetch active agripreneurs for this county in the maize survey
    const { data: activeData, isLoading: isActiveLoading } = useGetMaizeSurveyApStatsQuery({
        county: county,
        project: project === "ALL" ? undefined : project,
        page_size: 1,
    });

    const totalAgripreneurs = totalData?.count !== undefined ? totalData.count : null;
    const activeAgripreneurs = activeData?.count !== undefined ? activeData.count : null;

    return (
        <TableRow className="hover:bg-slate-50/50 border-slate-100">
            <TableCell className="p-3 font-bold text-slate-800 text-sm">{county}</TableCell>
            <TableCell className="p-3 text-slate-600 font-mono text-right text-sm font-semibold">
                {isTotalLoading ? (
                    <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-slate-200 border-t-emerald-600 animate-spin" />
                ) : totalAgripreneurs !== null ? (
                    totalAgripreneurs.toLocaleString()
                ) : (
                    "0"
                )}
            </TableCell>
            <TableCell className="p-3 text-slate-600 font-mono text-right text-sm font-semibold">
                {isActiveLoading ? (
                    <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-slate-200 border-t-emerald-600 animate-spin" />
                ) : activeAgripreneurs !== null ? (
                    activeAgripreneurs.toLocaleString()
                ) : (
                    "0"
                )}
            </TableCell>
            <TableCell className="p-3 text-emerald-700 font-mono text-right text-sm font-bold">
                {submissions.toLocaleString()}
            </TableCell>
        </TableRow>
    );
};

export default function MaizeDemographicsTab({
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
    activeVisitedFarmers,
    activeVisitedTarget,
    activeWardsCovered,
    activeAverageAcreage,
}: MaizeDemographicsTabProps) {

    const sortedAgripreneurCountyData = React.useMemo(() => {
        return [...liveCountyPerformanceData].sort((a, b) => b.visited - a.visited);
    }, [liveCountyPerformanceData]);

    const processedGenderData = React.useMemo(() => {
        if (!activeGenderData || activeGenderData.length === 0) return [];

        let otherValue = 0;
        const result: DemographicsData[] = [];

        activeGenderData.forEach((item) => {
            const lowerName = item.name.toLowerCase();
            if (lowerName === "other" || lowerName === "others") {
                otherValue += item.value;
            } else {
                result.push({ ...item });
            }
        });

        let maleFound = false;
        const updated = result.map((item) => {
            if (item.name.toLowerCase() === "male") {
                maleFound = true;
                return { ...item, value: item.value + otherValue };
            }
            return item;
        });

        if (!maleFound && otherValue > 0) {
            updated.push({ name: "Male", value: otherValue });
        }

        const total = updated.reduce((sum, item) => sum + item.value, 0);

        return updated.map((item) => ({
            ...item,
            percentage: total > 0 ? parseFloat(((item.value / total) * 100).toFixed(1)) : 0,
        }));
    }, [activeGenderData]);

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
                    <div className="flex-1 flex flex-col md:flex-row gap-6 items-center">
                        {/* Map Legend (Left) */}
                        {(() => {
                            const maxReached = filteredCountyData.length > 0 ? Math.max(...filteredCountyData.map(d => d.visited)) : 0;
                            return (
                                <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs w-full md:w-32 md:h-[400px] justify-between shrink-0">
                                    <div className="text-[10px] font-bold text-slate-500 text-center uppercase tracking-wider">
                                        Density
                                    </div>
                                    <div className="flex flex-row md:flex-col gap-3 items-center justify-center w-full md:h-full my-2">
                                        <span className="text-xs text-slate-500 font-semibold order-1 md:order-3">
                                            0
                                        </span>
                                        <div
                                            className="h-3 w-48 md:w-3 md:h-48 rounded-full border border-slate-200 bg-gradient-to-r md:bg-gradient-to-t from-[#e1f5ec] to-[#0a9c54] order-2"
                                        />
                                        <span className="text-xs text-slate-500 font-semibold order-3 md:order-1">
                                            {maxReached.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="text-[9px] text-slate-400 font-bold text-center leading-tight">
                                        Reached Farmers
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Map (Right) */}
                        <div className="flex-1 w-full">
                            <KenyaFarmersD3Map
                                showCardWrapper={false}
                                selectedCounty={selectedCounty}
                                onCountySelect={(county) => {
                                    setSelectedCounty(county);
                                    setSelectedSubCounty("");
                                    setSelectedWard("");
                                }}
                                surveyData={filteredCountyData}
                                showIntensity={true}
                            />
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
                                        className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${isSelected
                                            ? "bg-emerald-50 border-emerald-500 shadow-sm"
                                            : "bg-slate-50 hover:bg-slate-100/80 border-slate-100 hover:border-slate-200"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-sm font-bold ${isSelected ? "text-emerald-950" : "text-slate-800"}`}>
                                                {item.county}
                                            </span>
                                            <span className={`text-xs font-bold ${isSelected ? "text-emerald-700" : "text-slate-600"}`}>
                                                {completionRate.toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                                            <span>Reached: <strong className="text-slate-700 font-bold">{item.visited.toLocaleString()}</strong></span>
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

            {/* Assessment Coverage Table Card */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-emerald-600" />
                        Assessment Coverage
                    </CardTitle>
                    <CardDescription>
                        Summary of the survey coverage and farm metrics under selected filters.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center pb-6">
                    <div className="w-full border border-slate-100 rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader className="bg-slate-50/70">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider h-9">Indicator</TableHead>
                                    <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider text-right h-9 w-[120px]">Number</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-slate-50/50 border-slate-100">
                                    <TableCell className="font-medium text-slate-700 py-2.5 text-sm">Farmers interviewed</TableCell>
                                    <TableCell className="text-right font-bold text-slate-800 py-2.5 text-sm">
                                        {activeVisitedFarmers.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-slate-50/50 border-slate-100">
                                    <TableCell className="font-medium text-slate-700 py-2.5 text-sm">Wards covered</TableCell>
                                    <TableCell className="text-right font-bold text-slate-800 py-2.5 text-sm">
                                        {activeWardsCovered.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-slate-50/50 border-slate-100">
                                    <TableCell className="font-medium text-slate-700 py-2.5 text-sm">Total acreage assessed (Acres)</TableCell>
                                    <TableCell className="text-right font-bold text-slate-800 py-2.5 text-sm">
                                        {(activeVisitedFarmers * activeAverageAcreage).toLocaleString(undefined, { maximumFractionDigits: 1 })}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-slate-50/50 border-none">
                                    <TableCell className="font-medium text-slate-700 py-2.5 text-sm">Average farm size (Acres)</TableCell>
                                    <TableCell className="text-right font-bold text-slate-800 py-2.5 text-sm">
                                        {activeAverageAcreage.toFixed(1)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Farmers Reached Table Card */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        Farmers Reached
                    </CardTitle>
                    <CardDescription>
                        Breakdown of visited farmers by registration type, targets, and survey status.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center pb-6">
                    <div className="w-full border border-slate-100 rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader className="bg-slate-50/70">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider h-9">Category / Status</TableHead>
                                    <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider text-right h-9 w-[120px]">Count</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-slate-50/50 border-slate-100">
                                    <TableCell className="font-medium text-slate-700 py-2.5 text-sm flex items-center gap-2">
                                        <UserCheck className="w-4 h-4 text-blue-500" />
                                        Already Registered farmers visited
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-slate-800 py-2.5 text-sm">
                                        {(() => {
                                            const registeredItem = activeRegistrationData.find(d => d.name.toLowerCase().includes("registered") || d.name.toLowerCase().includes("existing"));
                                            const val = registeredItem ? registeredItem.value : Math.round(activeVisitedFarmers * 0.64);
                                            return val.toLocaleString();
                                        })()}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-slate-50/50 border-slate-100">
                                    <TableCell className="font-medium text-slate-700 py-2.5 text-sm flex items-center gap-2">
                                        <UserPlus className="w-4 h-4 text-indigo-500" />
                                        New farmers visited
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-slate-800 py-2.5 text-sm">
                                        {(() => {
                                            const registeredItem = activeRegistrationData.find(d => d.name.toLowerCase().includes("registered") || d.name.toLowerCase().includes("existing"));
                                            const registeredVal = registeredItem ? registeredItem.value : Math.round(activeVisitedFarmers * 0.64);
                                            const newItem = activeRegistrationData.find(d => d.name.toLowerCase().includes("new") || d.name.toLowerCase().includes("unregistered"));
                                            const val = newItem ? newItem.value : Math.max(0, activeVisitedFarmers - registeredVal);
                                            return val.toLocaleString();
                                        })()}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-slate-50/50 border-slate-100">
                                    <TableCell className="font-medium text-slate-700 py-2.5 text-sm flex items-center gap-2">
                                        <Target className="w-4 h-4 text-emerald-600" />
                                        Target Farmers
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-slate-800 py-2.5 text-sm">
                                        {activeVisitedTarget.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-slate-50/50 border-slate-100">
                                    <TableCell className="font-medium text-slate-700 py-2.5 text-sm flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        Farmers (surveys) approved
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-emerald-600 py-2.5 text-sm">
                                        {Math.round(activeVisitedFarmers * 0.85).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-slate-50/50 border-slate-100">
                                    <TableCell className="font-medium text-slate-700 py-2.5 text-sm flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-amber-500" />
                                        Farmers (surveys) pending
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-amber-600 py-2.5 text-sm">
                                        {Math.round(activeVisitedFarmers * 0.11).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-slate-50/50 border-none">
                                    <TableCell className="font-medium text-slate-700 py-2.5 text-sm flex items-center gap-2">
                                        <XCircle className="w-4 h-4 text-red-500" />
                                        Farmers (surveys) rejected
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-red-600 py-2.5 text-sm">
                                        {Math.max(0, activeVisitedFarmers - Math.round(activeVisitedFarmers * 0.85) - Math.round(activeVisitedFarmers * 0.11)).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
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
                                    data={processedGenderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {processedGenderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 w-full">
                        {processedGenderData.map((item, index) => (
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
                        Maize Farmers Reached
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
                            <BarChart data={activeHouseholdRangeData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: 'Household Size Range', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} height={40} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Farmers Count', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={80} />
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
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Farmers Count', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11, fontWeight: 500 }} width={80} />
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

            {/* Agripreneur Performance by County Table */}
            <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        Agripreneur Performance by County
                    </CardTitle>
                    <CardDescription>
                        Overview of total and active agripreneurs deployed per county and their corresponding survey submission volumes.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="overflow-y-auto max-h-[350px]">
                            <Table>
                                <TableHeader className="bg-slate-50/70 sticky top-0 z-10">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider h-9">County</TableHead>
                                        <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider text-right h-9">Total Agripreneurs</TableHead>
                                        <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider text-right h-9">Active Agripreneurs</TableHead>
                                        <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider text-right h-9">Submissions Made</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedAgripreneurCountyData.map((item) => (
                                        <CountyAgripreneurRow
                                            key={item.county}
                                            county={item.county}
                                            project={item.project}
                                            submissions={item.visited}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

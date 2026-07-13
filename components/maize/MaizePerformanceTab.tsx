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
    CheckCircle2,
    AlertTriangle,
    FileText,
    TrendingUp,
    Sprout,
    Activity,
    FolderHeart,
    Flame,
    Utensils,
    Info,
    Calendar
} from "lucide-react";

interface PerformanceRatingData {
    indicator: string;
    rating: "Excellent" | "Good" | "Fair" | "Poor" | "Above Average" | "Average" | "Below Average";
}

interface MaizePerformanceTabProps {
    totalExpectedYieldBags: number;
    totalMaizeAcreage: number;
    activeVisitedFarmers: number;
    activePerformanceRatings: PerformanceRatingData[];
}

export default function MaizePerformanceTab({
    totalExpectedYieldBags,
    totalMaizeAcreage,
    activeVisitedFarmers,
    activePerformanceRatings,
}: MaizePerformanceTabProps) {
    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Top Ministry Notice Alert Banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-6 shadow-lg border border-emerald-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl border border-white/20">
                        <FileText className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">MoALD Official Reporting Format</h3>
                        <p className="text-xs text-emerald-100/80 max-w-3xl leading-relaxed mt-1">
                            This reporting layout translates individual farmer questionnaire responses into structured county, regional, and national maize performance reports. Designed for the Ministry of Agriculture and Livestock Development, it supports seasonal production forecasting, food security assessments, and crop monitoring.
                        </p>
                    </div>
                </div>
                <div className="shrink-0 flex items-center gap-2 px-4 py-2 bg-emerald-700/40 rounded-xl border border-emerald-600/30 text-xs font-semibold">
                    <Calendar className="w-4 h-4 text-emerald-300" />
                    Long Rains 2026
                </div>
            </div>

            {/* 1. Overall Performance Rating */}
            <Card className="shadow-md border-slate-200">
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
                                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${
                                                item.rating === "Excellent" || item.rating === "Above Average"
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

            {/* Key Findings Grid */}
            <div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Key Findings</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Executive synthesis of the major maize production indicators across the six primary assessment areas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Area 1: Crop Establishment and Stand */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <span className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                                    <Sprout className="w-5 h-5" />
                                </span>
                                <span className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                                    Good / Excellent
                                </span>
                            </div>
                            <CardTitle className="text-lg font-bold text-slate-800 mt-4">
                                Crop Establishment & Stand
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Germination rates have been highly favorable across the high-potential zones of Rift Valley and Western. Strong seedling emergence stands at an average rating of <strong>Good</strong>, with only minor stand gaps reported due to localized early-season moisture fluctuations.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Area 2: Crop Growth and Vigour */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <span className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                                    <Activity className="w-5 h-5" />
                                </span>
                                <span className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                                    Good Vigour
                                </span>
                            </div>
                            <CardTitle className="text-lg font-bold text-slate-800 mt-4">
                                Crop Growth & Vigour
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Vegetative vigour is rated <strong>Good</strong> across most areas, buoyed by the consistent performance of the long rains. Drier agro-ecological zones (Lower Eastern) experienced minor dry spells causing temporary growth retardation, but overall canopy development remains on track.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Area 3: Input Utilization */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <span className="p-2 bg-amber-50 text-amber-700 rounded-lg">
                                    <FolderHeart className="w-5 h-5" />
                                </span>
                                <span className="px-2.5 py-1 text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
                                    85.0% Fertilizer Use
                                </span>
                            </div>
                            <CardTitle className="text-lg font-bold text-slate-800 mt-4">
                                Input Utilization
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Fertilizer application rates reached <strong>85.0%</strong> among surveyed smallholders, driven by national input subsidy programs. Certified seed adoption is stable, with <strong>74.5%</strong> of farmers utilizing high-yielding hybrid varieties to maximize potential yields.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Area 4: Pest and Disease Situation */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <span className="p-2 bg-red-50 text-red-700 rounded-lg">
                                    <Flame className="w-5 h-5" />
                                </span>
                                <span className="px-2.5 py-1 text-xs font-bold bg-red-50 text-red-700 border border-red-200 rounded-full">
                                    24.5% Avg FAW Damage
                                </span>
                            </div>
                            <CardTitle className="text-lg font-bold text-slate-800 mt-4">
                                Pest & Disease Situation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Fall Armyworm remains the most significant threat, with an average incidence of <strong>24.5%</strong>. Disease symptoms (Streak Virus and Blight) remain localized. Active pest monitoring and farmer outreach have successfully managed and restricted outbreaks below epidemic levels.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Area 5: Yield Prospects */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <span className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                                    <TrendingUp className="w-5 h-5" />
                                </span>
                                <span className="px-2.5 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full">
                                    18.4 Bags / Acre
                                </span>
                            </div>
                            <CardTitle className="text-lg font-bold text-slate-800 mt-4">
                                Yield Prospects
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                National yield outlook is projected at an average of <strong>18.4 bags/acre</strong>, translating to a total forecast of <strong>{totalExpectedYieldBags.toLocaleString()} bags</strong> across the assessed <strong>{totalMaizeAcreage.toLocaleString()} acres</strong> of grain maize.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Area 6: Food Security Implications */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <span className="p-2 bg-rose-50 text-rose-700 rounded-lg">
                                    <Utensils className="w-5 h-5" />
                                </span>
                                <span className="px-2.5 py-1 text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded-full">
                                    Stable National Supply
                                </span>
                            </div>
                            <CardTitle className="text-lg font-bold text-slate-800 mt-4">
                                Food Security Implications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Overall domestic availability of maize is expected to remain stable, safeguarding the national food basket. However, localized production deficits require prompt logistics and redistribution strategies.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Conclusion & Season Assessment Card */}
            <Card className="shadow-md border-slate-200">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <CardTitle className="text-xl font-bold text-slate-800">Conclusion</CardTitle>
                    </div>
                    <CardDescription>
                        Comprehensive assessment of the season outlook, principal performance drivers, and required interventions.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pb-6">
                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Season Performance Rating</span>
                            <span className="text-lg font-black text-emerald-950 mt-1 block">Normal to Above Normal maize production expected</span>
                        </div>
                        <span className="px-3.5 py-1.5 text-xs font-black bg-emerald-600 text-white rounded-full uppercase tracking-wider shrink-0">
                            Normal to Above Normal
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                <Info className="w-4 h-4 text-emerald-600" />
                                Principal Factors Influencing Performance
                            </h4>
                            <ul className="space-y-2.5 text-sm text-slate-600 list-disc list-inside pl-1">
                                <li><strong>Subsidized Input Supply:</strong> Timely access to subsidized fertilizers greatly enhanced application rates.</li>
                                <li><strong>Precipitation Pattern:</strong> Adequate distribution of long rains across prime grain-basket counties.</li>
                                <li><strong>Active Pest Mitigation:</strong> Extensive outreach and pest control reduced FAW impact.</li>
                                <li><strong>High-Quality Seed:</strong> High adoption of certified hybrid seed buffered against weather variability.</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                Required Policy & Operational Interventions
                            </h4>
                            <ul className="space-y-2.5 text-sm text-slate-600 list-disc list-inside pl-1">
                                <li><strong>Logistical Redistribution:</strong> Move maize supply from surplus regions to deficit drylands.</li>
                                <li><strong>Post-Harvest Management:</strong> Empower farmers with drying technology to avoid aflatoxin contamination.</li>
                                <li><strong>Pre-positioning Reserves:</strong> Pre-position strategic grain reserves at key NCPB depots.</li>
                                <li><strong>Irrigation Infrastructure:</strong> Scale up supplemental water access to mitigate mid-season dry spells.</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

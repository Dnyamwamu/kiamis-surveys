"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    LineChart as LineIcon,
    BarChart3,
    PieChart as PieIcon,
    Calendar,
    AlertTriangle,
    FileSpreadsheet,
    Download,
    CheckCircle,
    HelpCircle,
    Activity,
    ArrowUpRight,
    ClipboardList,
    Search,
    Sprout,
    Droplets,
    CalendarDays,
    Leaf,
    TrendingUp,
    Sparkles,
    Layers,
    Target,
    Sun,
    Home,
} from "lucide-react";
import Link from "next/link";
import { AdminUnitFilter } from "@/components/admin-unit-filter";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
    Legend,
    LineChart,
    Line,
    ComposedChart,
} from "recharts";

// Mock data reflecting the Maize Performance Assessment Programme
const kpiStats = {
    visitedFarmers: 145280,
    visitedTarget: 150000,
    visitedPercent: 96.85,
    countiesCovered: 42,
    avgHouseholdSize: 5.4,
    averageAcreage: 3.2,
};

const genderData = [
    { name: "Male", value: 84262, percentage: 58 },
    { name: "Female", value: 59565, percentage: 41 },
    { name: "Other", value: 1453, percentage: 1 },
];

const registrationData = [
    { name: "KIAMIS Registered", value: 112500, percentage: 77.4 },
    { name: "New Registrants", value: 32780, percentage: 22.6 },
];

const householdRangeData = [
    { range: "1 - 3 members", value: 38240 },
    { range: "4 - 6 members", value: 68520 },
    { range: "7 - 9 members", value: 26810 },
    { range: "10+ members", value: 11710 },
];

const dailyProgressData = [
    { day: "Jun 26", Visited: 8200 },
    { day: "Jun 27", Visited: 9400 },
    { day: "Jun 28", Visited: 10100 },
    { day: "Jun 29", Visited: 9800 },
    { day: "Jun 30", Visited: 11200 },
    { day: "Jul 1", Visited: 10500 },
    { day: "Jul 2", Visited: 10800 },
    { day: "Jul 3", Visited: 11200 },
    { day: "Jul 4", Visited: 11500 },
    { day: "Jul 5", Visited: 12100 },
    { day: "Jul 6", Visited: 12400 },
    { day: "Jul 7", Visited: 12900 },
    { day: "Jul 8", Visited: 13200 },
    { day: "Jul 9", Visited: 13580 },
];

const targetComparisonData = [
    { name: "Long Rains Maize Survey", Surveyed: 145280, Target: 150000 },
];

const seedSourceData = [
    { name: "Subsidized Seeds", value: 65376, percentage: 45, color: "#10b981" },
    { name: "Agrodealers", value: 50848, percentage: 35, color: "#3b82f6" },
    { name: "Retained Seeds", value: 29056, percentage: 20, color: "#f59e0b" },
];

const growthStageData = [
    { stage: "Emergence", Count: 5811 },
    { stage: "Vegetative", Count: 24698 },
    { stage: "Tasseling", Count: 36320 },
    { stage: "Milking", Count: 29056 },
    { stage: "Grain Fill", Count: 33415 },
    { stage: "Maturity", Count: 15980 },
];

const nutrientDeficiencyData = [
    { deficiency: "Nitrogen (Yellowing)", Present: 34, Absent: 66 },
    { deficiency: "Phosphorus (Purpling)", Present: 18, Absent: 82 },
];

const plantColorData = [
    { name: "Deep Green (Healthy)", value: 78451, color: "#065f46" },
    { name: "Pale Green (Mild Stress)", value: 43584, color: "#34d399" },
    { name: "Yellowing (Nitrogen Def)", value: 17433, color: "#fbbf24" },
    { name: "Purpling (Phosphorus Def)", value: 5812, color: "#8b5cf6" },
];

const irrigationData = [
    { name: "Rainfed", value: 418406, percentage: 90, color: "#3b82f6" },
    { name: "Irrigated", value: 46490, percentage: 10, color: "#10b981" },
];

const seedVarietyData = [
    { name: "Kenya Seed H614", value: 139468, percentage: 30 },
    { name: "Kenya Seed H6213", value: 92979, percentage: 20 },
    { name: "Seed Co SC627", value: 69734, percentage: 15 },
    { name: "Pannar PAN 691", value: 46490, percentage: 10 },
    { name: "Local / Retained Seeds", value: 92979, percentage: 20 },
    { name: "Others", value: 23250, percentage: 5 },
];

const plantingDateData = [
    { period: "Feb 1-15", Fields: 8400 },
    { period: "Feb 16-28", Fields: 15200 },
    { period: "Mar 1-15", Fields: 48900 },
    { period: "Mar 16-31", Fields: 52100 },
    { period: "Apr 1-15", Fields: 16800 },
    { period: "Apr 16-30", Fields: 3880 },
];

const harvestingMonthData = [
    { month: "June", Fields: 5400 },
    { month: "July", Fields: 24500 },
    { month: "August", Fields: 68700 },
    { month: "September", Fields: 35100 },
    { month: "October", Fields: 11580 },
];

const cropUniformityData = [
    { name: "Even growth", value: 104602, percentage: 72, color: "#10b981" },
    { name: "Patchy growth", value: 26150, percentage: 18, color: "#f59e0b" },
    { name: "Stunted areas", value: 14528, percentage: 10, color: "#ef4444" },
];

const growthStageDetailedData = [
    { stage: "Emergence", acreage: "18,595 Ac", uniformity: "Even (92%)", color: "Deep Green (88%)", irrigation: "Rainfed (95%)" },
    { stage: "Vegetative", acreage: "79,033 Ac", uniformity: "Even (81%)", color: "Deep Green (76%)", irrigation: "Rainfed (90%)" },
    { stage: "Tasseling", acreage: "116,224 Ac", uniformity: "Even (74%)", color: "Deep Green (62%)", irrigation: "Rainfed (88%)" },
    { stage: "Milking", acreage: "92,979 Ac", uniformity: "Even (68%)", color: "Deep Green (54%)", irrigation: "Rainfed (89%)" },
    { stage: "Grain Fill", acreage: "106,928 Ac", uniformity: "Even (70%)", color: "Deep Green (58%)", irrigation: "Rainfed (91%)" },
    { stage: "Maturity", acreage: "51,136 Ac", uniformity: "Even (85%)", color: "Deep/Pale Green (94%)", irrigation: "Rainfed (93%)" },
];

const pestDiseaseData = [
    { name: "Fall Armyworm (FAW)", Present: 28, Absent: 72 },
    { name: "Stalk Borer", Present: 15, Absent: 85 },
    { name: "Weed Competition (Medium-High)", Present: 38, Absent: 62 },
];

const diseaseSymptomsData = [
    { name: "None / Healthy", percentage: 74, color: "#10b981" },
    { name: "Leaf Blight / Rust", percentage: 12, color: "#ef4444" },
    { name: "Maize Streak Virus", percentage: 8, color: "#f59e0b" },
    { name: "Grey Leaf Spot", percentage: 4, color: "#ec4899" },
    { name: "Maize Lethal Necrosis", percentage: 1, color: "#8b5cf6" },
    { name: "Maize Head Smut", percentage: 1, color: "#6b7280" },
];

const historicalYieldData = [
    { year: "2022", Yield: 12.5 },
    { year: "2023", Yield: 14.2 },
    { year: "2024", Yield: 11.8 },
    { year: "2025", Yield: 15.6 },
    { year: "2026 (Expected)", Yield: 16.5 },
];

const maizeUseData = [
    { name: "Family Consumption", value: 55, color: "#10b981" },
    { name: "Commercial Sale", value: 30, color: "#3b82f6" },
    { name: "Animal Feed", value: 15, color: "#f59e0b" },
];

const poorPerformanceCauses = [
    { cause: "Rainfall deficit", percentage: 48, color: "#3b82f6" },
    { cause: "Soil Fertility", percentage: 22, color: "#8b5cf6" },
    { cause: "Pests and Diseases", percentage: 18, color: "#ef4444" },
    { cause: "Seed Quality", percentage: 8, color: "#f59e0b" },
    { cause: "Others", percentage: 4, color: "#6b7280" },
];

const countyPerformanceData = [
    { county: "BUNGOMA", project: "NAVCDP", visited: 12450, target: 12500 },
    { county: "TRANS NZOIA", project: "NAVCDP", visited: 10800, target: 11000 },
    { county: "NANDI", project: "NAVCDP", visited: 9200, target: 9500 },
    { county: "NAKURU", project: "NAVCDP", visited: 8900, target: 9200 },
    { county: "UASIN GISHU", project: "NAVCDP", visited: 8400, target: 8500 },
    { county: "MERU", project: "NAVCDP", visited: 7600, target: 8000 },
    { county: "KAKAMEGA", project: "NAVCDP", visited: 7100, target: 7500 },
    { county: "BOMET", project: "NAVCDP", visited: 6900, target: 7000 },
    { county: "KERICHO", project: "NAVCDP", visited: 6400, target: 6500 },
    { county: "NAROK", project: "NAVCDP", visited: 6100, target: 6200 },
    { county: "WEST POKOT", project: "FSRP", visited: 5800, target: 6000 },
    { county: "BARINGO", project: "FSRP", visited: 5400, target: 5500 },
    { county: "ELGEYO MARAKWET", project: "FSRP", visited: 5100, target: 5200 },
    { county: "MIGORI", project: "NAVCDP", visited: 4800, target: 5000 },
    { county: "KISII", project: "NAVCDP", visited: 4600, target: 4800 },
    { county: "HOMABAY", project: "NAVCDP", visited: 4400, target: 4500 },
    { county: "NYANDARUA", project: "NAVCDP", visited: 4100, target: 4200 },
    { county: "MURANG'A", project: "NAVCDP", visited: 3900, target: 4000 },
    { county: "KIAMBU", project: "NAVCDP", visited: 3600, target: 3800 },
    { county: "NYERI", project: "NAVCDP", visited: 3400, target: 3500 },
    { county: "KIRINYAGA", project: "NAVCDP", visited: 3100, target: 3200 },
    { county: "EMBU", project: "NAVCDP", visited: 2900, target: 3000 },
    { county: "MACHAKOS", project: "NAVCDP", visited: 2700, target: 2800 },
    { county: "MAKUENI", project: "NAVCDP", visited: 2600, target: 2700 },
    { county: "KITUI", project: "NAVCDP", visited: 2400, target: 2500 },
    { county: "THARAKA NITHI", project: "NAVCDP", visited: 2100, target: 2200 },
    { county: "LAIKIPIA", project: "NAVCDP", visited: 1900, target: 2000 },
    { county: "KAJIADO", project: "NAVCDP", visited: 1700, target: 1800 },
    { county: "KISUMU", project: "NAVCDP", visited: 1600, target: 1700 },
    { county: "SIAYA", project: "NAVCDP", visited: 1500, target: 1600 },
    { county: "BUSIA", project: "NAVCDP", visited: 1400, target: 1500 },
    { county: "VIHIGA", project: "NAVCDP", visited: 1200, target: 1300 },
    { county: "NYAMIRA", project: "NAVCDP", visited: 1100, target: 1200 },
    { county: "KWALE", project: "NAVCDP", visited: 950, target: 1000 },
    { county: "KILIFI", project: "NAVCDP", visited: 850, target: 900 },
    { county: "TAITA TAVETA", project: "NAVCDP", visited: 750, target: 800 },
    { county: "LAMU", project: "FSRP", visited: 650, target: 700 },
    { county: "TANA RIVER", project: "FSRP", visited: 580, target: 600 },
    { county: "SAMBURU", project: "FSRP", visited: 480, target: 500 },
    { county: "TURKANA", project: "FSRP", visited: 380, target: 400 },
    { county: "MARSABIT", project: "FSRP", visited: 280, target: 300 },
    { county: "ISIOLO", project: "FSRP", visited: 180, target: 200 },
    { county: "GARISSA", project: "FSRP", visited: 140, target: 150 },
    { county: "WAJIR", project: "FSRP", visited: 90, target: 100 },
    { county: "MANDERA", project: "FSRP", visited: 40, target: 50 },
    { county: "MOMBASA", project: "NAVCDP", visited: 30, target: 50 },
    { county: "NAIROBI", project: "NAVCDP", visited: 10, target: 20 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#ef4444"];

const emptySubscribe = () => () => { };
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function SurveysPage() {
    const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
    const [activeSubTab, setActiveSubTab] = useState<
        "demographics" | "maize-growth" | "fertilizer-seed" | "pests-yields" | "county-performance"
    >("demographics");
    const [countySearch, setCountySearch] = useState("");
    const [countyProjectFilter, setCountyProjectFilter] = useState<"ALL" | "FSRP" | "NAVCDP">("ALL");
    const [selectedCounty, setSelectedCounty] = useState("");
    const [selectedSubCounty, setSelectedSubCounty] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    // Filtered County Performance Data for the top level KPI calculations
    const filteredLocationData = countyPerformanceData.filter((item) => {
        const matchesProject =
            countyProjectFilter === "ALL" ||
            item.project === countyProjectFilter;
        const matchesCounty =
            !selectedCounty ||
            item.county.toLowerCase() === selectedCounty.toLowerCase();
        return matchesProject && matchesCounty;
    });

    // Calculate reached & target based on filtered location
    let reachedSum = 0;
    let targetSum = 0;
    let activeCountiesCount = 0;

    if (selectedCounty) {
        const match = filteredLocationData.find(item => item.county.toLowerCase() === selectedCounty.toLowerCase());
        if (match) {
            reachedSum = match.visited;
            targetSum = match.target;
            activeCountiesCount = 1;
        }

        // Apply deterministic reduction factors for subcounty and ward
        if (selectedSubCounty) {
            const subFactor = 0.25 + (selectedSubCounty.charCodeAt(0) % 5) * 0.05; // 0.25 to 0.45
            reachedSum = Math.round(reachedSum * subFactor);
            targetSum = Math.round(targetSum * subFactor);

            if (selectedWard) {
                const wardFactor = 0.15 + (selectedWard.charCodeAt(0) % 4) * 0.05; // 0.15 to 0.30
                reachedSum = Math.round(reachedSum * wardFactor);
                targetSum = Math.round(targetSum * wardFactor);
            }
        }
    } else {
        // Sum all counties matching project
        filteredLocationData.forEach((item) => {
            reachedSum += item.visited;
            targetSum += item.target;
            if (item.visited > 0) activeCountiesCount++;
        });
    }

    // Set active stats
    const activeVisitedFarmers = reachedSum;
    const activeVisitedTarget = targetSum;
    const activeVisitedPercent = targetSum > 0 ? parseFloat(((reachedSum / targetSum) * 100).toFixed(2)) : 0;
    const activeCountiesCovered = selectedCounty ? 1 : activeCountiesCount;
    const activeAverageAcreage = 2.4;
    const activeAvgHouseholdSize = 5.2;

    // Calculate dynamic scale factor
    const scaleFactor = activeVisitedFarmers / 145280;

    // Scale datasets
    const activeGenderData = genderData.map(item => ({
        ...item,
        value: Math.round(item.value * scaleFactor)
    }));

    const activeRegistrationData = registrationData.map(item => ({
        ...item,
        value: Math.round(item.value * scaleFactor)
    }));

    const activeHouseholdRangeData = householdRangeData.map(item => ({
        ...item,
        value: Math.round(item.value * scaleFactor)
    }));

    const activeSeedSourceData = seedSourceData.map(item => ({
        ...item,
        value: Math.round(item.value * scaleFactor)
    }));

    const activeGrowthStageData = growthStageData.map(item => ({
        ...item,
        Count: Math.round(item.Count * scaleFactor)
    }));

    const activeNutrientDeficiencyData = nutrientDeficiencyData.map(item => ({
        ...item,
        Present: item.Present, // percentages can stay constant
        Absent: item.Absent
    }));

    const activePlantColorData = plantColorData.map(item => ({
        ...item,
        value: Math.round(item.value * scaleFactor)
    }));

    const activeSeedVarietyData = seedVarietyData.map(item => ({
        ...item,
        value: Math.round(item.value * scaleFactor)
    }));

    const activePlantingDateData = plantingDateData.map(item => ({
        ...item,
        Fields: Math.round(item.Fields * scaleFactor)
    }));

    const activeIrrigationData = irrigationData.map(item => ({
        ...item,
        value: Math.round(item.value * scaleFactor)
    }));

    const activeCropUniformityData = cropUniformityData.map(item => ({
        ...item,
        value: Math.round(item.value * scaleFactor)
    }));

    const activeGrowthStageDetailedData = growthStageDetailedData.map(item => {
        const acreageNum = parseInt(item.acreage.replace(/[^0-9]/g, ""), 10);
        const scaledAcreage = Math.round(acreageNum * scaleFactor);
        return {
            ...item,
            acreage: `${scaledAcreage.toLocaleString()} Ac`
        };
    });

    const activePestDiseaseData = pestDiseaseData.map(item => ({
        ...item,
        Present: item.Present, // percentages
        Absent: item.Absent
    }));

    const activeDiseaseSymptomsData = diseaseSymptomsData.map(item => ({
        ...item,
        percentage: item.percentage // percentages
    }));

    const activeHistoricalYieldData = historicalYieldData.map(item => ({
        ...item,
        Yield: item.Yield // yields
    }));

    const activeMaizeUseData = maizeUseData.map(item => ({
        ...item,
        value: item.value // percentages
    }));

    const activePoorPerformanceCauses = poorPerformanceCauses.map(item => ({
        ...item,
        percentage: item.percentage // percentages
    }));

    const activeSunflowerInterestCount = Math.round(48250 * scaleFactor);
    const activeAvgAgpSubmissions = Math.max(50, Math.round(363 * (0.9 + (activeVisitedFarmers % 30) * 0.01)));

    const activeDailyProgressData = dailyProgressData.map(item => ({
        ...item,
        Visited: Math.round(item.Visited * scaleFactor)
    }));

    const activeTargetComparisonData = [
        { name: "Long Rains Maize Survey", Surveyed: activeVisitedFarmers, Target: activeVisitedTarget },
    ];

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500 font-medium">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                    Loading Survey Reports...
                </div>
            </div>
        );
    }

    // Filter county performance data
    const filteredCountyData = countyPerformanceData.filter((item) => {
        const matchesSearch = item.county.toLowerCase().includes(countySearch.toLowerCase());
        const matchesProject =
            countyProjectFilter === "ALL" ||
            item.project === countyProjectFilter;
        const matchesCounty =
            !selectedCounty ||
            item.county.toLowerCase() === selectedCounty.toLowerCase();
        return matchesSearch && matchesProject && matchesCounty;
    });

    // Get top 10 counties for the bar chart based on current project filter
    const topCountiesData = countyPerformanceData
        .filter((item) => {
            return countyProjectFilter === "ALL" ||
                (countyProjectFilter === "FSRP" && item.project === "FSRP") ||
                (countyProjectFilter === "NAVCDP" && item.project === "NAVCDP");
        })
        .sort((a, b) => b.visited - a.visited)
        .slice(0, 10);

    const topCountiesChartData = topCountiesData.map((item) => ({
        name: item.county,
        Reached: item.visited,
        Target: item.target,
    }));

    const exportCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Metric,Value\n"
            + `Farmers Visited,${activeVisitedFarmers}\n`
            + `Target Farmers,${activeVisitedTarget}\n`
            + `Completion Rate,${activeVisitedPercent}%\n`
            + `Counties Covered,${activeCountiesCovered}\n`
            + `Average Household Size,${activeAvgHouseholdSize}\n`
            + `Average Acreage under Maize,${activeAverageAcreage} acres\n`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "maize_survey_summary.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50">
            {/* Hero Header Section */}
            <section className="relative py-20 bg-linear-to-br from-green-900 to-green-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.08),transparent)]" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Long Rains Assessment
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-emerald-100 via-teal-50 to-white bg-clip-text text-transparent">
                                Maize Survey Assessment Report
                            </h1>
                            <p className="text-lg text-emerald-100/80 leading-relaxed mb-6">
                                Comprehensive data and analytics from the long rains maize crop establishment, growth, input status, pests pressure, and yield forecasts across Kenya.
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-200/70">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-emerald-400" />
                                    Season: Long Rains 2026
                                </span>
                                <span className="h-4 w-px bg-emerald-800" />
                                <span className="flex items-center gap-1.5">
                                    <Activity className="w-4 h-4 text-emerald-400" />
                                    Status: Analysis Completed
                                </span>
                            </div>
                        </div>

                        {/* Right column: Floating Graphs, Charts & Stats Widgets */}
                        <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
                            <div className="relative w-full max-w-md p-4">
                                {/* Decorative Glow */}
                                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl" />

                                {/* Main Glassmorphic Panel */}
                                <div className="relative bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl rounded-3xl p-6 overflow-hidden">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">Field Surveys</span>
                                            <h4 className="text-3xl font-extrabold text-white mt-1">
                                                {activeVisitedFarmers.toLocaleString()}
                                            </h4>
                                            <p className="text-emerald-200/60 text-xs mt-0.5">Completed Records</p>
                                        </div>
                                        <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
                                            <Users className="w-5 h-5 text-emerald-300 animate-pulse" />
                                        </div>
                                    </div>

                                    {/* Sparkline Chart */}
                                    <div className="h-[90px] w-full mt-4 -mx-2">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={activeDailyProgressData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                                <defs>
                                                    <linearGradient id="colorVisited" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                                                    </linearGradient>
                                                </defs>
                                                <Area
                                                    type="monotone"
                                                    dataKey="Visited"
                                                    stroke="#34d399"
                                                    strokeWidth={2}
                                                    fillOpacity={1}
                                                    fill="url(#colorVisited)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="flex justify-between items-center text-xs text-emerald-200/50 mt-2 border-t border-white/10 pt-3">
                                        <span>Survey Trend (Last 14 Days)</span>
                                        <span className="flex items-center gap-1 text-emerald-300 font-medium">
                                            <TrendingUp className="w-3.5 h-3.5" />
                                            Active Daily Submissions
                                        </span>
                                    </div>
                                </div>

                                {/* Floating Card 1: Target Goal (Top-Right overlap) */}
                                <div className="absolute -top-2 -right-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-xl rounded-2xl p-3 flex items-center gap-3 hover:-translate-y-1 transition-transform duration-300">
                                    <div className="bg-amber-500/20 p-2 rounded-lg border border-amber-500/30">
                                        <Target className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-slate-400 block font-medium">Target Goal</span>
                                        <span className="text-xs font-bold text-white">
                                            {activeVisitedTarget.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Floating Card 2: Progress (Bottom-Left overlap) */}
                                <div className="absolute -bottom-2 -left-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-xl rounded-2xl p-3 flex items-center gap-3 hover:translate-y-1 transition-transform duration-300">
                                    <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
                                        <CheckCircle className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-slate-400 block font-medium">Completion Rate</span>
                                        <span className="text-xs font-bold text-white">
                                            {activeVisitedPercent}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="-mt-12 container mx-auto px-6 max-w-7xl relative z-20 mb-6">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-end justify-between">
                        <div className="flex-1 w-full">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Filter Dashboard by Region</h3>
                            <AdminUnitFilter
                                onFilterChange={(filters) => {
                                    setSelectedCounty(filters.county);
                                    setSelectedSubCounty(filters.subcounty);
                                    setSelectedWard(filters.ward);
                                }}
                            />
                        </div>
                        <div className="w-full lg:w-80">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Project Sponsor</h3>
                            <div className="flex bg-slate-100 p-1 rounded-lg w-full">
                                <button
                                    onClick={() => setCountyProjectFilter("ALL")}
                                    className={`flex-1 text-xs font-semibold py-2 px-3 rounded-md transition-all ${countyProjectFilter === "ALL"
                                        ? "bg-white text-slate-800 shadow-xs"
                                        : "text-slate-600 hover:text-slate-900"
                                        }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setCountyProjectFilter("NAVCDP")}
                                    className={`flex-1 text-xs font-semibold py-2 px-3 rounded-md transition-all ${countyProjectFilter === "NAVCDP"
                                        ? "bg-white text-slate-800 shadow-xs"
                                        : "text-slate-600 hover:text-slate-900"
                                        }`}
                                >
                                    NAVCDP
                                </button>
                                <button
                                    onClick={() => setCountyProjectFilter("FSRP")}
                                    className={`flex-1 text-xs font-semibold py-2 px-3 rounded-md transition-all ${countyProjectFilter === "FSRP"
                                        ? "bg-white text-slate-800 shadow-xs"
                                        : "text-slate-600 hover:text-slate-900"
                                        }`}
                                >
                                    FSRP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Selected Filters Summary Bar */}
            <section className="-mt-4 mb-6 container mx-auto px-6 max-w-7xl relative z-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-100/70 border border-slate-200/50 rounded-xl px-4 py-2.5">
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">Active Filters:</span>

                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none font-semibold text-xs px-2.5 py-1 flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Sponsor: {countyProjectFilter === "ALL" ? "All Projects" : countyProjectFilter}
                        </Badge>

                        <Badge className={`border-none font-semibold text-xs px-2.5 py-1 flex items-center gap-1.5 shadow-2xs ${selectedCounty ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : 'bg-slate-200/60 text-slate-500 hover:bg-slate-200/60'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedCounty ? 'bg-blue-500' : 'bg-slate-400'}`} />
                            County: {selectedCounty || "All Counties"}
                        </Badge>

                        <Badge className={`border-none font-semibold text-xs px-2.5 py-1 flex items-center gap-1.5 shadow-2xs ${selectedSubCounty ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' : 'bg-slate-200/60 text-slate-500 hover:bg-slate-200/60'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedSubCounty ? 'bg-purple-500' : 'bg-slate-400'}`} />
                            Sub-County: {selectedSubCounty || "All Sub-Counties"}
                        </Badge>

                        <Badge className={`border-none font-semibold text-xs px-2.5 py-1 flex items-center gap-1.5 shadow-2xs ${selectedWard ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : 'bg-slate-200/60 text-slate-500 hover:bg-slate-200/60'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedWard ? 'bg-amber-500' : 'bg-slate-400'}`} />
                            Ward: {selectedWard || "All Wards"}
                        </Badge>
                    </div>

                    <Button
                        onClick={exportCSV}
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 font-semibold text-xs h-8 px-3 shadow-xs shrink-0 self-start md:self-auto"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Export Summary CSV
                    </Button>
                </div>
            </section>

            {/* KPI Cards Section */}
            <section className="container mx-auto px-6 max-w-7xl relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Farmers Reached */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Farmers Reached</CardDescription>
                                <CardTitle className="text-3xl font-extrabold text-slate-800">
                                    {activeVisitedFarmers.toLocaleString()}
                                </CardTitle>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                                <Users className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-medium">
                                    {activeVisitedPercent}% of Target
                                </Badge>
                                <span className="text-xs text-muted-foreground">Active registrations</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 2: Gender Distribution */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Gender Distribution</CardDescription>
                                <CardTitle className="text-xl font-extrabold text-slate-800 tracking-tight">
                                    {activeGenderData[0]?.value.toLocaleString()} M / {activeGenderData[1]?.value.toLocaleString()} F
                                </CardTitle>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                                <Activity className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                                    {activeGenderData[0]?.percentage}% Male
                                </span>
                                <span className="text-[11px] font-semibold bg-pink-50 text-pink-700 px-2 py-0.5 rounded border border-pink-100">
                                    {activeGenderData[1]?.percentage}% Female
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 3: Target to Be Reached */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">KIAMIS Survey Target</CardDescription>
                                <CardTitle className="text-3xl font-extrabold text-slate-800">
                                    {activeVisitedTarget.toLocaleString()}
                                </CardTitle>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shadow-inner">
                                <Target className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">Maize farmers in KIAMIS</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 4: Acreage Covered */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Maize Acreage Covered</CardDescription>
                                <CardTitle className="text-3xl font-extrabold text-slate-800">
                                    {(activeVisitedFarmers * activeAverageAcreage).toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-lg font-semibold text-slate-500">Ac</span>
                                </CardTitle>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shadow-inner">
                                <Sprout className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none font-medium">
                                    Rainfed Dominant
                                </Badge>
                                <span className="text-xs text-muted-foreground">Avg: {activeAverageAcreage} Ac / farm</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 5: Expected Yield */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Expected Yield</CardDescription>
                                <CardTitle className="text-3xl font-extrabold text-slate-800">
                                    16.5 <span className="text-lg font-semibold text-slate-500">Bags/Ac</span>
                                </CardTitle>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">Expected 2026 average bags/acre</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 6: Maize Utilisation */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Maize Utilisation</CardDescription>
                                <CardTitle className="text-xl font-extrabold text-slate-800 leading-tight">
                                    Home Consumption
                                </CardTitle>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-medium text-slate-600">55% Family | 30% Sale | 15% Feed</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 7: Sunflower Interest */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sunflower Interest</CardDescription>
                                <CardTitle className="text-3xl font-extrabold text-slate-800">
                                    {activeSunflowerInterestCount.toLocaleString()}
                                </CardTitle>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
                                <Sun className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-medium">
                                    33.2% Interested
                                </Badge>
                                <span className="text-xs text-muted-foreground">Of reached farmers</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 8: Avg Submission by AGP */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Submissions / AGP</CardDescription>
                                <CardTitle className="text-3xl font-extrabold text-slate-800">
                                    {activeAvgAgpSubmissions.toLocaleString()}
                                </CardTitle>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                                <ClipboardList className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">Per active field agripreneur</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Main Tabs Selection */}
            <section className="py-8 container mx-auto px-6 max-w-7xl">
                <div className="flex flex-wrap items-center justify-center bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm max-w-4xl mx-auto mb-8 gap-1">
                    <button
                        onClick={() => setActiveSubTab("demographics")}
                        className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "demographics"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        General & Demographics
                    </button>
                    <button
                        onClick={() => setActiveSubTab("maize-growth")}
                        className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "maize-growth"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        Maize Growth
                    </button>
                    <button
                        onClick={() => setActiveSubTab("fertilizer-seed")}
                        className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "fertilizer-seed"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        Fertilizer & Seed
                    </button>
                    <button
                        onClick={() => setActiveSubTab("pests-yields")}
                        className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "pests-yields"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        Pests, Diseases & Yields
                    </button>
                    <button
                        onClick={() => setActiveSubTab("county-performance")}
                        className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "county-performance"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        County Performance
                    </button>
                </div>

                {/* Tab 1: General & Demographics */}
                {activeSubTab === "demographics" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Chart 1: Daily Registration Progress */}
                        <Card className="shadow-md border-slate-200 lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-emerald-600" />
                                    Daily Assessment Progress (14-Day Trend)
                                </CardTitle>
                                <CardDescription>
                                    Tracking the daily volume of farmers visited by field agripreneurs over the last two weeks.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[320px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={activeDailyProgressData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                            <Bar dataKey="Visited" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={45} />
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
                                        <BarChart data={activeHouseholdRangeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                                formatter={(value: number | string | readonly (string | number)[] | undefined) => [
                                                    (typeof value === "number" ? value : Number(value || 0)).toLocaleString(),
                                                    "Farmers",
                                                ]}
                                            />
                                            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={50}>
                                                {activeHouseholdRangeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
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
                                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                            <Legend verticalAlign="top" height={36} />
                                            <Bar dataKey="Surveyed" fill="#10b981" radius={[8, 8, 0, 0]} maxBarSize={120} />
                                            <Bar dataKey="Target" fill="#cbd5e1" radius={[8, 8, 0, 0]} maxBarSize={120} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Tab 2: Maize Growth */}
                {activeSubTab === "maize-growth" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                        <BarChart data={activeGrowthStageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="stage" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                            <Bar dataKey="Count" fill="#10b981" radius={[6, 6, 0, 0]}>
                                                {activeGrowthStageData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
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
                                    Planting Window Timeline
                                </CardTitle>
                                <CardDescription>
                                    Estimated distribution of fields by planting period during the season.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={activePlantingDateData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorFields" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                            <Area type="monotone" dataKey="Fields" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorFields)" />
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
                                    Irrigation & Water Source Profile
                                </CardTitle>
                                <CardDescription>
                                    Classification of surveyed fields based on irrigation status.
                                </CardDescription>
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
                                                <span className="text-sm font-bold text-slate-800">{item.value.toLocaleString()} Fields</span>
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
                )}

                {/* Tab 3: Fertilizer & Seed */}
                {activeSubTab === "fertilizer-seed" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Seed Source Distribution */}
                        <Card className="shadow-md border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <PieIcon className="w-5 h-5 text-emerald-600" />
                                    Seed Source Distribution
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
                                    Top Seed Varieties Adopted
                                </CardTitle>
                                <CardDescription>
                                    Distribution of major maize seed varieties used by surveyed farmers.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={activeSeedVarietyData} layout="vertical" margin={{ top: 10, right: 30, left: 35, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                            <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                            <YAxis dataKey="name" type="category" stroke="#475569" fontSize={11} tickLine={false} width={130} />
                                            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                            <Bar dataKey="value" name="Farmers" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                                                {activeSeedVarietyData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
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
                                        <BarChart data={activeNutrientDeficiencyData} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                            <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                            <YAxis dataKey="deficiency" type="category" stroke="#475569" fontSize={12} tickLine={false} />
                                            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                            <Legend />
                                            <Bar dataKey="Present" fill="#fbbf24" stackId="a" radius={[0, 4, 4, 0]} />
                                            <Bar dataKey="Absent" fill="#10b981" stackId="a" radius={[0, 0, 0, 0]} />
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
                )}

                {/* Tab 3: Pests, Diseases & Yields */}
                {activeSubTab === "pests-yields" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Pest Pressure Distribution */}
                        <Card className="shadow-md border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                    Weed & Pest Infestation Pressure
                                </CardTitle>
                                <CardDescription>
                                    Proportion of visited maize acreage reporting active pest, borer, or heavy weed choking presence.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={activePestDiseaseData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                            <Legend />
                                            <Bar dataKey="Present" fill="#ef4444" radius={[6, 6, 0, 0]} maxBarSize={60} />
                                            <Bar dataKey="Absent" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={60} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Disease Symptoms Distribution */}
                        <Card className="shadow-md border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-emerald-600" />
                                    Disease Symptoms Distribution
                                </CardTitle>
                                <CardDescription>
                                    Occurrence percentage of major maize diseases spotted during inspections.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                                <div className="w-[200px] h-[200px] shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={activeDiseaseSymptomsData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={3}
                                                dataKey="percentage"
                                            >
                                                {activeDiseaseSymptomsData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-4 w-full">
                                    {activeDiseaseSymptomsData.map((item) => (
                                        <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                            </div>
                                            <span className="text-sm font-bold text-slate-800">{item.percentage}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Historical Yield Trends */}
                        <Card className="shadow-md border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <LineIcon className="w-5 h-5 text-emerald-600" />
                                    Historical Maize Yield Trends (Bags/Acre)
                                </CardTitle>
                                <CardDescription>
                                    Average productivity recorded across seasons compared with expected yield for 2026.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={activeHistoricalYieldData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                            <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                            <Line type="monotone" dataKey="Yield" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Maize Use Profile */}
                        <Card className="shadow-md border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <PieIcon className="w-5 h-5 text-emerald-600" />
                                    Post-Harvest Maize Utilisation
                                </CardTitle>
                                <CardDescription>
                                    Reported proportion of maize harvested designated for home use, commercial sales, and animal feeds.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6">
                                <div className="w-[200px] h-[200px] shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={activeMaizeUseData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {activeMaizeUseData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-4 w-full">
                                    {activeMaizeUseData.map((item) => (
                                        <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                            </div>
                                            <span className="text-sm font-bold text-slate-800">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Causes for Poor Yield/Performance */}
                        <Card className="shadow-md border-slate-200 lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                    Primary Causes for Poor Crop Performance
                                </CardTitle>
                                <CardDescription>
                                    Farmers&apos; feedback on key issues causing reduced growth and under-performance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={activePoorPerformanceCauses} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="cause" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                                            <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                                                {activePoorPerformanceCauses.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Tab 4: County Performance */}
                {activeSubTab === "county-performance" && (
                    <div className="space-y-8 animate-in fade-in-50 duration-300">
                        {/* Filters bar */}
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search county..."
                                    value={countySearch}
                                    onChange={(e) => setCountySearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                                />
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <span className="text-sm font-medium text-slate-500 shrink-0">Project Sponsor:</span>
                                <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto">
                                    <button
                                        onClick={() => setCountyProjectFilter("ALL")}
                                        className={`flex-1 md:flex-none text-xs font-semibold py-1.5 px-3 rounded-md transition-all ${countyProjectFilter === "ALL"
                                            ? "bg-white text-slate-800 shadow-xs"
                                            : "text-slate-600 hover:text-slate-900"
                                            }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setCountyProjectFilter("NAVCDP")}
                                        className={`flex-1 md:flex-none text-xs font-semibold py-1.5 px-3 rounded-md transition-all ${countyProjectFilter === "NAVCDP"
                                            ? "bg-white text-slate-800 shadow-xs"
                                            : "text-slate-600 hover:text-slate-900"
                                            }`}
                                    >
                                        NAVCDP
                                    </button>
                                    <button
                                        onClick={() => setCountyProjectFilter("FSRP")}
                                        className={`flex-1 md:flex-none text-xs font-semibold py-1.5 px-3 rounded-md transition-all ${countyProjectFilter === "FSRP"
                                            ? "bg-white text-slate-800 shadow-xs"
                                            : "text-slate-600 hover:text-slate-900"
                                            }`}
                                    >
                                        FSRP
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Top 10 chart */}
                            <Card className="shadow-md border-slate-200 lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                                        Top 10 Counties (By Reached)
                                    </CardTitle>
                                    <CardDescription>
                                        Highest performing counties showing farmers reached vs target for the selected sponsor.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[350px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={topCountiesChartData} margin={{ top: 20, right: 10, left: -10, bottom: 20 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                                                    formatter={(
                                                        value: number | string | readonly (string | number)[] | undefined,
                                                        name: number | string | undefined
                                                    ) => [
                                                        (typeof value === "number" ? value : Number(value || 0)).toLocaleString(),
                                                        String(name || ""),
                                                    ]}
                                                />
                                                <Legend />
                                                <Bar dataKey="Reached" fill="#10b981" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="Target" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Summary Card */}
                            <Card className="shadow-md border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        <ClipboardList className="w-5 h-5 text-emerald-600" />
                                        Project Summary
                                    </CardTitle>
                                    <CardDescription>
                                        Summary of performance under FSRP and NAVCDP programs.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                                        <h4 className="text-sm font-bold text-blue-900 mb-1">NAVCDP Performance</h4>
                                        <p className="text-xs text-blue-700/80 mb-3">Sponsoring 34 counties focusing on value chains.</p>
                                        <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
                                            <span>Reached: 127,110</span>
                                            <span>Target: 131,270</span>
                                        </div>
                                        <div className="w-full bg-blue-100 rounded-full h-2.5 mt-2">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(127110 / 131270 * 100).toFixed(1)}%` }} />
                                        </div>
                                        <div className="text-right text-xs font-bold text-blue-700 mt-1">96.8% Completion</div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                                        <h4 className="text-sm font-bold text-emerald-900 mb-1">FSRP Performance</h4>
                                        <p className="text-xs text-emerald-700/80 mb-3">Sponsoring 13 dryland resilience counties.</p>
                                        <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
                                            <span>Reached: 18,170</span>
                                            <span>Target: 18,730</span>
                                        </div>
                                        <div className="w-full bg-emerald-100 rounded-full h-2.5 mt-2">
                                            <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${(18170 / 18730 * 100).toFixed(1)}%` }} />
                                        </div>
                                        <div className="text-right text-xs font-bold text-emerald-700 mt-1">97.0% Completion</div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Full Counties List Table */}
                            <Card className="shadow-md border-slate-200 lg:col-span-3">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-slate-800">
                                        All Counties Performance Registry ({filteredCountyData.length})
                                    </CardTitle>
                                    <CardDescription>
                                        Complete searchable table of reached farmers, targets, and percentage completion.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                                        <div className="max-h-[400px] overflow-y-auto">
                                            <table className="w-full border-collapse text-left text-sm">
                                                <thead className="sticky top-0 bg-slate-100 text-slate-700 font-bold border-b border-slate-200 z-10">
                                                    <tr>
                                                        <th className="p-4 font-semibold">County</th>
                                                        <th className="p-4 font-semibold">Project</th>
                                                        <th className="p-4 font-semibold text-right">Farmers Reached</th>
                                                        <th className="p-4 font-semibold text-right">Target</th>
                                                        <th className="p-4 font-semibold text-right">Completion Rate</th>
                                                        <th className="p-4 font-semibold w-40">Progress</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-200">
                                                    {filteredCountyData.map((item) => {
                                                        const percent = parseFloat(((item.visited / item.target) * 100).toFixed(1));
                                                        return (
                                                            <tr key={item.county} className="hover:bg-slate-50/50 transition-colors">
                                                                <td className="p-4 font-bold text-slate-800 uppercase">{item.county}</td>
                                                                <td className="p-4">
                                                                    <Badge className={
                                                                        item.project === "NAVCDP"
                                                                            ? "bg-blue-50 text-blue-700 border border-blue-200 font-semibold"
                                                                            : "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold"
                                                                    }>
                                                                        {item.project}
                                                                    </Badge>
                                                                </td>
                                                                <td className="p-4 text-right font-medium text-slate-700">{item.visited.toLocaleString()}</td>
                                                                <td className="p-4 text-right text-slate-500">{item.target.toLocaleString()}</td>
                                                                <td className="p-4 text-right font-bold text-slate-800">{percent}%</td>
                                                                <td className="p-4">
                                                                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                                                                        <div
                                                                            className={`h-2.5 rounded-full ${percent >= 95 ? "bg-emerald-500" : percent >= 85 ? "bg-amber-500" : "bg-red-500"
                                                                                }`}
                                                                            style={{ width: `${Math.min(100, percent)}%` }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                    {filteredCountyData.length === 0 && (
                                                        <tr>
                                                            <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">
                                                                No counties match your search criteria.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </section>


        </div>
    );
}

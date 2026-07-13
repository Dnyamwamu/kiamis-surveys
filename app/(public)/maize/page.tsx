"use client";

import React, { useState, useSyncExternalStore } from "react";
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
    Calendar,
    Download,
    CheckCircle,
    Activity,
    ClipboardList,
    Sprout,
    Layers,
    Target,
    Sun,
    TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { AdminUnitFilter } from "@/components/admin-unit-filter";

import MaizeDemographicsTab from "@/components/maize/MaizeDemographicsTab";
import MaizeGrowthTab from "@/components/maize/MaizeGrowthTab";
import MaizeFertilizerSeedTab from "@/components/maize/MaizeFertilizerSeedTab";
import MaizePestsYieldsTab from "@/components/maize/MaizePestsYieldsTab";
import MaizeYieldEstimateTab from "@/components/maize/MaizeYieldEstimateTab";
import MaizeCountyPerformanceTab from "@/components/maize/MaizeCountyPerformanceTab";
import {
    useGetMaizeSurveyDailyProgressQuery,
    useGetMaizeSurveyDemographicsQuery,
    useGetMaizeSurveyGrowthQuery,
    useGetMaizeSurveyGrowthDetailedQuery,
    useGetMaizeSurveyInputsQuery,
    useGetMaizeSurveyHealthQuery,
    useGetMaizeSurveyYieldUseQuery,
    useGetMaizeSurveyCountyPerformanceQuery,
    useGetMaizeSurveyCountyStatsQuery,
} from "@/lib/features/api/surveys/surveysApi";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
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
    { name: "Male", value: 1021, percentage: 46.9 },
    { name: "Female", value: 1097, percentage: 50.4 },
    { name: "Other", value: 58, percentage: 2.7 },
];

const registrationData = [
    { name: "Registered Farmers", value: 112500, percentage: 77.4 },
    { name: "New Farmers", value: 32780, percentage: 22.6 },
];

const householdRangeData = [
    { range: "1 - 3 members", value: 38240 },
    { range: "4 - 6 members", value: 68520 },
    { range: "7 - 9 members", value: 26810 },
    { range: "10+ members", value: 11710 },
];

const dailyProgressData = [
    { day: "Jun 10", Visited: 3100 },
    { day: "Jun 11", Visited: 3400 },
    { day: "Jun 12", Visited: 3800 },
    { day: "Jun 13", Visited: 3500 },
    { day: "Jun 14", Visited: 4200 },
    { day: "Jun 15", Visited: 4500 },
    { day: "Jun 16", Visited: 4800 },
    { day: "Jun 17", Visited: 5100 },
    { day: "Jun 18", Visited: 4900 },
    { day: "Jun 19", Visited: 5600 },
    { day: "Jun 20", Visited: 6100 },
    { day: "Jun 21", Visited: 6400 },
    { day: "Jun 22", Visited: 6800 },
    { day: "Jun 23", Visited: 6500 },
    { day: "Jun 24", Visited: 7200 },
    { day: "Jun 25", Visited: 7800 },
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



const growthStageData = [
    { stage: "Emergence", Count: 5811 },
    { stage: "Vegetative", Count: 24698 },
    { stage: "Tasseling", Count: 36320 },
    { stage: "Milking", Count: 29056 },
    { stage: "Grain Fill", Count: 33415 },
    { stage: "Maturity", Count: 15980 },
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





const cropUniformityData = [
    { name: "Even growth", value: 104602, percentage: 72, color: "#10b981" },
    { name: "Patchy growth", value: 26150, percentage: 18, color: "#f59e0b" },
    { name: "Stunted areas", value: 14528, percentage: 10, color: "#ef4444" },
];









const countyMaizeAcreageData = [
    { county: "BUNGOMA", acres: 92100 },
    { county: "TRANS NZOIA", acres: 107200 },
    { county: "NANDI", acres: 73400 },
    { county: "NAKURU", acres: 84600 },
    { county: "UASIN GISHU", acres: 98500 },
    { county: "MERU", acres: 42800 },
    { county: "KAKAMEGA", acres: 68900 },
    { county: "BOMET", acres: 48600 },
    { county: "KERICHO", acres: 51200 },
    { county: "NAROK", acres: 59300 },
    { county: "WEST POKOT", acres: 35600 },
    { county: "BARINGO", acres: 24500 },
    { county: "ELGEYO MARAKWET", acres: 22800 },
    { county: "MIGORI", acres: 38400 },
    { county: "KISII", acres: 28900 },
    { county: "HOMABAY", acres: 31200 },
    { county: "NYANDARUA", acres: 18600 },
    { county: "MURANG'A", acres: 15200 },
    { county: "KIAMBU", acres: 12400 },
    { county: "NYERI", acres: 10800 },
    { county: "KIRINYAGA", acres: 8900 },
    { county: "EMBU", acres: 23200 },
    { county: "MACHAKOS", acres: 21600 },
    { county: "MAKUENI", acres: 19800 },
    { county: "KITUI", acres: 16500 },
    { county: "THARAKA NITHI", acres: 11400 },
    { county: "LAIKIPIA", acres: 14200 },
    { county: "KAJIADO", acres: 8600 },
    { county: "KISUMU", acres: 9800 },
    { county: "SIAYA", acres: 17400 },
    { county: "BUSIA", acres: 25600 },
    { county: "VIHIGA", acres: 7800 },
    { county: "NYAMIRA", acres: 13200 },
    { county: "KWALE", acres: 6400 },
    { county: "KILIFI", acres: 7100 },
    { county: "TAITA TAVETA", acres: 5200 },
    { county: "LAMU", acres: 4800 },
    { county: "TANA RIVER", acres: 3900 },
    { county: "SAMBURU", acres: 2800 },
    { county: "TURKANA", acres: 1900 },
    { county: "MARSABIT", acres: 1200 },
    { county: "ISIOLO", acres: 800 },
    { county: "GARISSA", acres: 600 },
    { county: "WAJIR", acres: 400 },
    { county: "MANDERA", acres: 200 },
    { county: "MOMBASA", acres: 100 },
    { county: "NAIROBI", acres: 50 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#ef4444"];

const emptySubscribe = () => () => { };
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function SurveysPage() {
    const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
    const [activeSubTab, setActiveSubTab] = useState<
        "demographics" | "maize-growth" | "fertilizer-seed" | "pests-yields" | "yield-estimate" | "county-performance"
    >("demographics");
    const [countySearch, setCountySearch] = useState("");
    const [countyProjectFilter, setCountyProjectFilter] = useState<"ALL" | "FSRP" | "NAVCDP">("ALL");
    const [selectedCounty, setSelectedCounty] = useState("");
    const [selectedSubCounty, setSelectedSubCounty] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    const [adminUnits, setAdminUnits] = useState<any | null>(null);

    React.useEffect(() => {
        fetch("/admin_units.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load admin units");
                return res.json();
            })
            .then((data) => {
                setAdminUnits(data);
            })
            .catch((err) => {
                console.error("Error loading admin units in page.tsx:", err);
            });
    }, []);

    const { data: countyPerformanceDataRaw, isLoading: isCountyPerformanceLoading } = useGetMaizeSurveyCountyPerformanceQuery({
        page_size: 100,
    });

    const liveCountyPerformanceData = React.useMemo(() => {
        return (countyPerformanceDataRaw?.results || []).map(item => ({
            county: item.county,
            project: item.project,
            visited: item.visited,
            target: item.target || 0
        }));
    }, [countyPerformanceDataRaw]);

    // Filtered County Performance Data for the top level KPI calculations
    const filteredLocationData = liveCountyPerformanceData.filter((item) => {
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

    const { data: maizeStatsData, isLoading: isMaizeStatsLoading } = useGetMaizeSurveyCountyStatsQuery({
        county: selectedCounty || undefined,
        project: countyProjectFilter === "ALL" ? undefined : countyProjectFilter,
        subcounty: selectedSubCounty || undefined,
        ward: selectedWard || undefined,
    });

    // Set active stats
    const activeVisitedFarmers = maizeStatsData ? maizeStatsData.visited_farmers : reachedSum;
    const activeVisitedTarget = maizeStatsData ? maizeStatsData.target : targetSum;
    const activeVisitedPercent = maizeStatsData ? maizeStatsData.visited_percent : (targetSum > 0 ? parseFloat(((reachedSum / targetSum) * 100).toFixed(2)) : 0);
    const activeCountiesCovered = maizeStatsData ? maizeStatsData.counties_covered : (selectedCounty ? 1 : activeCountiesCount);
    const activeAverageAcreage = maizeStatsData ? maizeStatsData.average_acreage : 2.4;
    const activeAverageAcreageTotal = maizeStatsData ? maizeStatsData.average_acreage * 1.33 : 3.2;
    const activeAvgHouseholdSize = maizeStatsData ? maizeStatsData.avg_household_size : 5.2;

    const { data: demographicsData, isLoading: isDemographicsLoading } = useGetMaizeSurveyDemographicsQuery({
        county: selectedCounty || undefined,
        project: countyProjectFilter === "ALL" ? undefined : countyProjectFilter,
        subcounty: selectedSubCounty || undefined,
        ward: selectedWard || undefined,
    });

    const { data: dailyProgressDataRaw, isLoading: isDailyProgressLoading } = useGetMaizeSurveyDailyProgressQuery({
        county: selectedCounty || undefined,
        project: countyProjectFilter === "ALL" ? undefined : countyProjectFilter,
        subcounty: selectedSubCounty || undefined,
        ward: selectedWard || undefined,
    });

    const { data: growthData, isLoading: isGrowthLoading } = useGetMaizeSurveyGrowthQuery({
        county: selectedCounty || undefined,
        project: countyProjectFilter === "ALL" ? undefined : countyProjectFilter,
        subcounty: selectedSubCounty || undefined,
        ward: selectedWard || undefined,
    });

    const { data: growthDetailedData, isLoading: isGrowthDetailedLoading } = useGetMaizeSurveyGrowthDetailedQuery({
        county: selectedCounty || undefined,
        project: countyProjectFilter === "ALL" ? undefined : countyProjectFilter,
        subcounty: selectedSubCounty || undefined,
        ward: selectedWard || undefined,
    });

    const { data: inputsData, isLoading: isInputsLoading } = useGetMaizeSurveyInputsQuery({
        county: selectedCounty || undefined,
        project: countyProjectFilter === "ALL" ? undefined : countyProjectFilter,
        subcounty: selectedSubCounty || undefined,
        ward: selectedWard || undefined,
    });

    const { data: healthData, isLoading: isHealthLoading } = useGetMaizeSurveyHealthQuery({
        county: selectedCounty || undefined,
        project: countyProjectFilter === "ALL" ? undefined : countyProjectFilter,
        subcounty: selectedSubCounty || undefined,
        ward: selectedWard || undefined,
    });

    const { data: yieldUseData, isLoading: isYieldUseLoading } = useGetMaizeSurveyYieldUseQuery({
        county: selectedCounty || undefined,
        project: countyProjectFilter === "ALL" ? undefined : countyProjectFilter,
        subcounty: selectedSubCounty || undefined,
        ward: selectedWard || undefined,
    });

    // Calculate dynamic scale factor
    const scaleFactor = activeVisitedFarmers / 145280;

    // Scale datasets
    const activeGenderData = demographicsData?.gender_distribution || [];

    const activeRegistrationData = demographicsData?.registration_status || [];

    const activeHouseholdRangeData = demographicsData?.household_size_ranges || [];

    const activeSeedSourceData = (inputsData?.seed_sources || []).map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const activeGrowthStageData = growthData?.growth_stages.map(item => ({
        stage: item.stage,
        Count: item.count
    })) || [];

    const activeNutrientDeficiencyData = (healthData?.nutrient_deficiency || []).map(item => ({
        deficiency: item.deficiency,
        Present: item.present,
        Absent: item.absent
    }));

    const activePlantColorData = (growthData?.plant_color || []).map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const activeWardsCovered = React.useMemo(() => {
        if (!adminUnits) return 0;
        if (selectedWard) return 1;
        if (selectedSubCounty) {
            return adminUnits.wards.filter(
                (w: any) => w.subcounty.toLowerCase() === selectedSubCounty.toLowerCase()
            ).length;
        }
        if (selectedCounty) {
            return adminUnits.wards.filter(
                (w: any) => w.county.toLowerCase() === selectedCounty.toLowerCase()
            ).length;
        }
        const projectCounties = filteredLocationData.map(c => c.county.toLowerCase());
        return adminUnits.wards.filter(
            (w: any) => projectCounties.includes(w.county.toLowerCase())
        ).length;
    }, [adminUnits, selectedCounty, selectedSubCounty, selectedWard, filteredLocationData]);

    const activeSeedVarietyData = inputsData?.seed_varieties || [];

    const activePlantingDateData = (inputsData?.planting_dates || []).map(item => ({
        period: item.period,
        Fields: item.fields
    }));

    const activeIrrigationData = (growthData?.irrigation || []).map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const activeCropUniformityData = (growthData?.crop_uniformity || []).map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const activeGrowthStageDetailedData = growthDetailedData || [];

    const activePestDiseaseData = (healthData?.pest_presence || []).map(item => ({
        name: item.name,
        Present: item.present,
        Absent: item.absent
    }));

    const activeDiseaseSymptomsData = (healthData?.disease_symptoms || []).map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const activeHistoricalYieldData = (yieldUseData?.historical_yields || []).map(item => ({
        year: item.year,
        Yield: item.yield
    }));

    const activeMaizeUseData = (yieldUseData?.maize_use || []).map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const activePoorPerformanceCauses = (yieldUseData?.poor_performance_causes || []).map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const activeSunflowerInterestCount = Math.round(48250 * scaleFactor);
    const activeAvgAgpSubmissions = Math.max(50, Math.round(363 * (0.9 + (activeVisitedFarmers % 30) * 0.01)));

    const activeDailyProgressData = dailyProgressDataRaw?.map(item => ({
        day: item.day,
        Visited: item.visited
    })) || [];

    const activeTargetComparisonData = [
        { name: "Long Rains Maize Survey", Surveyed: activeVisitedFarmers, Target: activeVisitedTarget },
    ];

    const activeCountyMaizeAcreageData = countyMaizeAcreageData
        .filter((item) => {
            const matchesCounty = !selectedCounty || item.county.toLowerCase() === selectedCounty.toLowerCase();
            const matchingPerf = liveCountyPerformanceData.find(p => p.county === item.county);
            const matchesProject = countyProjectFilter === "ALL" || (matchingPerf && matchingPerf.project === countyProjectFilter);
            return matchesCounty && matchesProject;
        })
        .map((item) => {
            let acres = item.acres;
            acres = Math.round(acres * scaleFactor);
            if (selectedCounty && item.county.toLowerCase() === selectedCounty.toLowerCase()) {
                if (selectedSubCounty) {
                    const subFactor = 0.25 + (selectedSubCounty.charCodeAt(0) % 5) * 0.05;
                    acres = Math.round(acres * subFactor);
                    if (selectedWard) {
                        const wardFactor = 0.15 + (selectedWard.charCodeAt(0) % 4) * 0.05;
                        acres = Math.round(acres * wardFactor);
                    }
                }
            }

            // Compute rainfed and irrigated dynamically based on county name hash
            const hash = item.county.charCodeAt(0) + (item.county.charCodeAt(1) || 0);
            const irrigatedPercent = 5 + (hash % 26); // 5% to 30% irrigated
            const irrigated = Math.round((acres * irrigatedPercent) / 100);
            const rainfed = acres - irrigated;

            return {
                ...item,
                acres,
                rainfed,
                irrigated
            };
        });

    const sortedCountyMaizeAcreageData = [...activeCountyMaizeAcreageData].sort((a, b) => b.acres - a.acres);
    const topCountiesAcreageData = sortedCountyMaizeAcreageData.slice(0, 10);
    const totalMaizeAcreage = activeCountyMaizeAcreageData.reduce((sum, item) => sum + item.acres, 0);

    const activeCountySunflowerData = activeCountyMaizeAcreageData.map((item) => {
        const interested = Math.round(item.acres * 0.28);
        return {
            county: item.county,
            interested
        };
    });
    const sortedCountySunflowerData = [...activeCountySunflowerData].sort((a, b) => b.interested - a.interested);
    const topCountiesSunflowerData = sortedCountySunflowerData.slice(0, 10);
    const totalSunflowerInterested = activeCountySunflowerData.reduce((sum, item) => sum + item.interested, 0);

    const activeYieldEstimateData = activeCountyMaizeAcreageData.map((item) => {
        const maize_acres = item.acres;
        const silage_acres = Math.round(maize_acres * 0.08);
        const green_acres = Math.round(maize_acres * 0.12);
        const dry_grain_acres = maize_acres - silage_acres - green_acres;
        const expected_yield_outlook = 16.5; // Bags/Acre
        const total_expected_yield = Math.round((maize_acres - silage_acres) * expected_yield_outlook);

        // 5c. Maize use breakdown
        const family_consumption = Math.round(total_expected_yield * 0.55);
        const commercial_sale = Math.round(total_expected_yield * 0.30);
        const animal_feed = Math.round(total_expected_yield * 0.15);

        return {
            county: item.county,
            maize_acres,
            silage_acres,
            green_acres,
            dry_grain_acres,
            expected_yield_outlook,
            total_expected_yield,
            family_consumption,
            commercial_sale,
            animal_feed
        };
    });

    const sortedYieldEstimateData = [...activeYieldEstimateData].sort((a, b) => b.total_expected_yield - a.total_expected_yield);
    const topCountiesYieldData = sortedYieldEstimateData.slice(0, 10);
    const totalGreenAcreage = activeYieldEstimateData.reduce((sum, item) => sum + item.green_acres, 0);
    const totalSilageAcreage = activeYieldEstimateData.reduce((sum, item) => sum + item.silage_acres, 0);
    const totalExpectedYieldBags = activeYieldEstimateData.reduce((sum, item) => sum + item.total_expected_yield, 0);

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
    const filteredCountyData = liveCountyPerformanceData.filter((item) => {
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
    const topCountiesData = liveCountyPerformanceData
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

    // Compute NAVCDP & FSRP performance metrics dynamically
    const navcdpCounties = liveCountyPerformanceData.filter(item => item.project === "NAVCDP");
    const navcdpReached = navcdpCounties.reduce((sum, item) => sum + item.visited, 0);
    const navcdpTarget = navcdpCounties.reduce((sum, item) => sum + item.target, 0);
    const navcdpCountCounties = navcdpCounties.length;

    const fsrpCounties = liveCountyPerformanceData.filter(item => item.project === "FSRP");
    const fsrpReached = fsrpCounties.reduce((sum, item) => sum + item.visited, 0);
    const fsrpTarget = fsrpCounties.reduce((sum, item) => sum + item.target, 0);
    const fsrpCountCounties = fsrpCounties.length;

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
        link.setAttribute("download", `maize_survey_summary_${selectedCounty || "national"}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-16">
            {/* Header Banner */}
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
                                    Status: Live Updates
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
                            Project: {countyProjectFilter === "ALL" ? "All Projects" : countyProjectFilter}
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

                    {/* Card 3: Avg Household Size */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Household Size</CardDescription>
                                <CardTitle className="text-3xl font-extrabold text-slate-800">
                                    {activeAvgHouseholdSize} <span className="text-lg font-semibold text-slate-500">Members</span>
                                </CardTitle>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                                <Users className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">Average size of surveyed households</span>
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
                                    {(activeVisitedFarmers * activeAverageAcreage).toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-lg font-semibold text-slate-500">Acres</span>
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
                                <span className="text-xs text-muted-foreground">Avg: {activeAverageAcreage} Acres / farm</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 6: Total Land Acreage */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Land Acreage</CardDescription>
                                <CardTitle className="text-3xl font-extrabold text-slate-800">
                                    {(activeVisitedFarmers * activeAverageAcreageTotal).toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-lg font-semibold text-slate-500">Acres</span>
                                </CardTitle>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
                                <Layers className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 border-none font-medium">
                                    Total Farm Holdings
                                </Badge>
                                <span className="text-xs text-muted-foreground">Avg: {activeAverageAcreageTotal} Acre / farm</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 5: Expected Yield */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Expected Yield</CardDescription>
                                <CardTitle className="text-3xl font-extrabold text-slate-800">
                                    16.5 <span className="text-lg font-semibold text-slate-500">Bags/Acres</span>
                                </CardTitle>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">Expected 2026 average bags(90Kg)/acre</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 8: Avg Submission by AGP */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Average Daily Submissions</CardDescription>
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

                    {/* Card 7: Sunflower Interest */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sunflower</CardDescription>
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
                                    33.2% Farmers
                                </Badge>
                                <span className="text-xs text-muted-foreground">Interested to grow sunflower</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 6: Maize Utilisation */}
                    <Card className="shadow-lg border-slate-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-1 space-y-0">
                            <div className="space-y-0.5">
                                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">Maize Utilisation</CardDescription>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-1.5 mt-2">
                                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-1">
                                    <span className="text-slate-500 font-medium">Family Consumption:</span>
                                    <span className="font-bold text-slate-700">55%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-1">
                                    <span className="text-slate-500 font-medium">Commercial Sale:</span>
                                    <span className="font-bold text-slate-700">30%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-1">
                                    <span className="text-slate-500 font-medium">Animal Feed:</span>
                                    <span className="font-bold text-slate-700">15%</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-3">
                                Distribution of maize usage by surveyed smallholder farming households.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Main Tabs Selection */}
            <section className="py-8 container mx-auto px-6 max-w-7xl">
                <div className="flex flex-wrap items-center justify-center bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm max-w-5xl mx-auto mb-8 gap-1">
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
                        onClick={() => setActiveSubTab("yield-estimate")}
                        className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "yield-estimate"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        Yield Estimate
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
                    isDemographicsLoading || isDailyProgressLoading || isCountyPerformanceLoading || isMaizeStatsLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 border border-slate-200 rounded-2xl bg-white shadow-xs">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                            <span className="text-sm font-semibold text-slate-500">Loading Demographics Data...</span>
                        </div>
                    ) : (
                        <MaizeDemographicsTab
                            activeDailyProgressData={activeDailyProgressData}
                            activeGenderData={activeGenderData}
                            activeRegistrationData={activeRegistrationData}
                            activeHouseholdRangeData={activeHouseholdRangeData}
                            activeTargetComparisonData={activeTargetComparisonData}
                            COLORS={COLORS}
                            filteredCountyData={filteredCountyData}
                            liveCountyPerformanceData={liveCountyPerformanceData}
                            selectedCounty={selectedCounty}
                            setSelectedCounty={setSelectedCounty}
                            setSelectedSubCounty={setSelectedSubCounty}
                            setSelectedWard={setSelectedWard}
                            activeVisitedFarmers={activeVisitedFarmers}
                            activeVisitedTarget={activeVisitedTarget}
                            activeWardsCovered={activeWardsCovered}
                            activeAverageAcreage={activeAverageAcreage}
                        />
                    )
                )}

                {/* Tab 2: Maize Growth */}
                {activeSubTab === "maize-growth" && (
                    isGrowthLoading || isGrowthDetailedLoading || isInputsLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 border border-slate-200 rounded-2xl bg-white shadow-xs">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                            <span className="text-sm font-semibold text-slate-500">Loading Crop Growth Data...</span>
                        </div>
                    ) : (
                        <MaizeGrowthTab
                            topCountiesAcreageData={topCountiesAcreageData}
                            sortedCountyMaizeAcreageData={sortedCountyMaizeAcreageData}
                            totalMaizeAcreage={totalMaizeAcreage}
                            topCountiesSunflowerData={topCountiesSunflowerData}
                            sortedCountySunflowerData={sortedCountySunflowerData}
                            totalSunflowerInterested={totalSunflowerInterested}
                            activeGrowthStageData={activeGrowthStageData}
                            activePlantingDateData={activePlantingDateData}
                            activeIrrigationData={activeIrrigationData}
                            activeCropUniformityData={activeCropUniformityData}
                            activeGrowthStageDetailedData={activeGrowthStageDetailedData}
                            COLORS={COLORS}
                        />
                    )
                )}

                {/* Tab 3: Fertilizer & Seed */}
                {activeSubTab === "fertilizer-seed" && (
                    isInputsLoading || isGrowthLoading || isHealthLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 border border-slate-200 rounded-2xl bg-white shadow-xs">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                            <span className="text-sm font-semibold text-slate-500">Loading Fertilizer & Seed Data...</span>
                        </div>
                    ) : (
                        <MaizeFertilizerSeedTab
                            activeSeedSourceData={activeSeedSourceData}
                            activeSeedVarietyData={activeSeedVarietyData}
                            activeNutrientDeficiencyData={activeNutrientDeficiencyData}
                            activePlantColorData={activePlantColorData}
                            activeVisitedFarmers={activeVisitedFarmers}
                            COLORS={COLORS}
                        />
                    )
                )}

                {/* Tab 4: Pests, Diseases & Yields */}
                {activeSubTab === "pests-yields" && (
                    isHealthLoading || isYieldUseLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 border border-slate-200 rounded-2xl bg-white shadow-xs">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                            <span className="text-sm font-semibold text-slate-500">Loading Pests, Diseases & Yields Data...</span>
                        </div>
                    ) : (
                        <MaizePestsYieldsTab
                            activePestDiseaseData={activePestDiseaseData}
                            activeDiseaseSymptomsData={activeDiseaseSymptomsData}
                            activeHistoricalYieldData={activeHistoricalYieldData}
                            activeMaizeUseData={activeMaizeUseData}
                            activePoorPerformanceCauses={activePoorPerformanceCauses}
                        />
                    )
                )}

                {/* Tab 5: Yield Estimate */}
                {activeSubTab === "yield-estimate" && (
                    <MaizeYieldEstimateTab
                        totalExpectedYieldBags={totalExpectedYieldBags}
                        totalGreenAcreage={totalGreenAcreage}
                        totalSilageAcreage={totalSilageAcreage}
                        totalMaizeAcreage={totalMaizeAcreage}
                        sortedYieldEstimateData={sortedYieldEstimateData}
                        topCountiesYieldData={topCountiesYieldData}
                    />
                )}

                {/* Tab 6: County Performance */}
                {activeSubTab === "county-performance" && (
                    isCountyPerformanceLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 border border-slate-200 rounded-2xl bg-white shadow-xs">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                            <span className="text-sm font-semibold text-slate-500">Loading County Performance Data...</span>
                        </div>
                    ) : (
                        <MaizeCountyPerformanceTab
                            countySearch={countySearch}
                            setCountySearch={setCountySearch}
                            countyProjectFilter={countyProjectFilter}
                            setCountyProjectFilter={setCountyProjectFilter}
                            selectedCounty={selectedCounty}
                            setSelectedCounty={setSelectedCounty}
                            setSelectedSubCounty={setSelectedSubCounty}
                            setSelectedWard={setSelectedWard}
                            filteredCountyData={filteredCountyData}
                            topCountiesChartData={topCountiesChartData}
                            navcdpReached={navcdpReached}
                            navcdpTarget={navcdpTarget}
                            navcdpCountCounties={navcdpCountCounties}
                            fsrpReached={fsrpReached}
                            fsrpTarget={fsrpTarget}
                            fsrpCountCounties={fsrpCountCounties}
                        />
                    )
                )}
            </section>
        </div>
    );
}

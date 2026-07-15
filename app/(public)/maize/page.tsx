"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
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
    Package,
} from "lucide-react";
import Link from "next/link";
import { AdminUnitFilter } from "@/components/admin-unit-filter";

import MaizeDemographicsTab from "@/components/maize/MaizeDemographicsTab";
import MaizeGrowthTab from "@/components/maize/MaizeGrowthTab";
import MaizeFertilizerSeedTab from "@/components/maize/MaizeFertilizerSeedTab";
import MaizePestsYieldsTab from "@/components/maize/MaizePestsYieldsTab";
import MaizeProductionOutlookTab from "@/components/maize/MaizeProductionOutlookTab";
import MaizeCropEstablishmentTab from "@/components/maize/MaizeCropEstablishmentTab";
import MaizePerformanceTab from "@/components/maize/MaizePerformanceTab";
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

interface AdminUnitCounty {
    county_id: number | string;
    county: string;
}

interface AdminUnitSubCounty {
    subcounty_id: number | string;
    subcounty: string;
    county: string;
    county_id: number | string;
}

interface AdminUnitWard {
    ward_id: number | string;
    ward: string;
    subcounty: string;
    county: string;
    subcounty_id: number | string;
    county_id: number | string;
}

interface AdminUnitsData {
    counties: AdminUnitCounty[];
    subcounties: AdminUnitSubCounty[];
    wards: AdminUnitWard[];
}

export default function SurveysPage() {
    const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
    const [activeSubTab, setActiveSubTab] = useState<
        "general" | "crop-establishment" | "crop-growth" | "input-use" | "pests-diseases-weeds" | "production-outlook" | "performance"
    >("general");

    const [countyProjectFilter, setCountyProjectFilter] = useState<"ALL" | "FSRP" | "NAVCDP">("ALL");
    const [selectedCounty, setSelectedCounty] = useState("");
    const [selectedSubCounty, setSelectedSubCounty] = useState("");
    const [selectedWard, setSelectedWard] = useState("");



    const [adminUnits, setAdminUnits] = useState<AdminUnitsData | null>(null);

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
            reachedSum = match.visited || 0;
            targetSum = (match.target as number | null) || 0;
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
            reachedSum += item.visited || 0;
            targetSum += (item.target as number | null) || 0;
            if (item.visited > 0) activeCountiesCount++;
        });
    }

    const { data: maizeStatsData, isLoading: isMaizeStatsLoading } = useGetMaizeSurveyCountyStatsQuery({
        county: selectedCounty || undefined,
        project: countyProjectFilter === "ALL" ? undefined : countyProjectFilter,
        subcounty: selectedSubCounty || undefined,
        ward: selectedWard || undefined,
    });

    const activeMaizeUtilization = React.useMemo(() => {
        const defaultUtil = {
            familyConsumption: 174519.61,
            commercialSale: 251554.32,
            animalFeeds: 10020.79,
            familyConsumptionPct: 40.0,
            commercialSalePct: 57.7,
            animalFeedsPct: 2.3,
            totalBags: 436094.72,
        };

        const apiUtil = maizeStatsData?.maize_utilization;
        if (!apiUtil) return defaultUtil;

        const familyConsumption = apiUtil.family_consumption || 0;
        const commercialSale = apiUtil.commercial_sale || 0;
        const animalFeeds = apiUtil.animal_feeds || 0;

        const total = familyConsumption + commercialSale + animalFeeds;
        if (total <= 0) return defaultUtil;

        return {
            familyConsumption,
            commercialSale,
            animalFeeds,
            familyConsumptionPct: parseFloat(((familyConsumption / total) * 100).toFixed(1)),
            commercialSalePct: parseFloat(((commercialSale / total) * 100).toFixed(1)),
            animalFeedsPct: parseFloat(((animalFeeds / total) * 100).toFixed(1)),
            totalBags: total,
        };
    }, [maizeStatsData]);

    // Set active stats
    const activeVisitedFarmers = maizeStatsData ? maizeStatsData.visited_farmers : reachedSum;
    const activeVisitedTarget = (maizeStatsData ? maizeStatsData.target : targetSum) || 0;
    const activeVisitedPercent = maizeStatsData ? maizeStatsData.visited_percent : (targetSum > 0 ? parseFloat(((reachedSum / targetSum) * 100).toFixed(2)) : 0);
    const activeCountiesCovered = maizeStatsData ? maizeStatsData.counties_covered : (selectedCounty ? 1 : activeCountiesCount);
    const activeAverageAcreage = maizeStatsData ? maizeStatsData.average_acreage : 2.4;
    const activeAverageAcreageTotal = maizeStatsData?.average_acreage_total !== undefined
        ? maizeStatsData.average_acreage_total
        : (maizeStatsData ? maizeStatsData.average_acreage * 1.33 : 3.2);
    const activeAvgHouseholdSize = maizeStatsData ? maizeStatsData.avg_household_size : 5.2;

    const activeTotalMaizeAcreage = maizeStatsData?.total_maize_acreage !== undefined
        ? maizeStatsData.total_maize_acreage
        : Math.round(activeVisitedFarmers * activeAverageAcreage);

    const activeTotalLandAcreage = maizeStatsData?.total_land_acreage !== undefined
        ? maizeStatsData.total_land_acreage
        : Math.round(activeVisitedFarmers * activeAverageAcreageTotal);

    const activeExpectedYieldBagsPerAcre = maizeStatsData?.expected_yield_bags_per_acre !== undefined
        ? maizeStatsData.expected_yield_bags_per_acre
        : 16.5;

    const activeStorageAvgBags = React.useMemo(() => {
        if (maizeStatsData?.average_maize_stored !== undefined) {
            return maizeStatsData.average_maize_stored;
        }
        if (activeVisitedFarmers <= 0) return 0;
        const oneToFiveBags = Math.round(activeVisitedFarmers * 0.24);
        const sixToTenBags = Math.round(activeVisitedFarmers * 0.15);
        const elevenToTwentyBags = Math.round(activeVisitedFarmers * 0.08);
        const overTwentyBags = Math.round(activeVisitedFarmers * 0.05);

        const totalBags = (oneToFiveBags * 3) + (sixToTenBags * 8) + (elevenToTwentyBags * 15) + (overTwentyBags * 30);
        return totalBags / activeVisitedFarmers;
    }, [activeVisitedFarmers, maizeStatsData]);

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

    const activeMaleFarmersCount = activeGenderData.find(d => d.name.toLowerCase() === "male")?.value
        || maizeStatsData?.male_farmers_count
        || Math.round(activeVisitedFarmers * 0.469);

    const activeFemaleFarmersCount = activeGenderData.find(d => d.name.toLowerCase() === "female")?.value
        || maizeStatsData?.female_farmers_count
        || Math.round(activeVisitedFarmers * 0.504);

    const activeRegistrationData = demographicsData?.registration_status || [];

    const activeHouseholdRangeData = demographicsData?.household_size_ranges || [];

    const activeStorageDataProp = React.useMemo(() => {
        if (demographicsData?.storage_distribution && demographicsData?.storage_summary) {
            return {
                chartData: demographicsData.storage_distribution,
                totalBags: demographicsData.storage_summary.total_bags,
                avgBags: demographicsData.storage_summary.average_bags,
                withStoragePct: demographicsData.storage_summary.with_storage_percentage,
            };
        }
        return undefined;
    }, [demographicsData]);


    const activeSeedSourceData = (inputsData?.seed_sources || []).map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const rawFertilizerData = inputsData?.fertilizer_use || [];
    const mappedFertilizerData = rawFertilizerData.map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const defaultFertilizerData = [
        { name: "Government subsidized fertilizer", value: Math.round(activeVisitedFarmers * 0.452), percentage: 45.2, color: "#059669" },
        { name: "Commercial fertilizer", value: Math.round(activeVisitedFarmers * 0.328), percentage: 32.8, color: "#3b82f6" },
        { name: "Organic manure", value: Math.round(activeVisitedFarmers * 0.120), percentage: 12.0, color: "#fbbf24" },
        { name: "No fertilizer", value: Math.round(activeVisitedFarmers * 0.100), percentage: 10.0, color: "#64748b" }
    ];

    const activeFertilizerUseData = mappedFertilizerData.length > 0 ? mappedFertilizerData : defaultFertilizerData;

    const rawApplicationData = inputsData?.fertilizer_application || [];
    const mappedApplicationData = rawApplicationData.map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const defaultApplicationData = [
        { name: "Basal applied", value: Math.round(activeVisitedFarmers * 0.785), percentage: 78.5, color: "#10b981" },
        { name: "Top dressing completed", value: Math.round(activeVisitedFarmers * 0.448), percentage: 44.8, color: "#3b82f6" },
        { name: "Top dressing pending", value: Math.round(activeVisitedFarmers * 0.337), percentage: 33.7, color: "#fbbf24" }
    ];

    const activeFertilizerApplicationData = mappedApplicationData.length > 0 ? mappedApplicationData : defaultApplicationData;

    const activeGrowthStageData = growthData?.growth_stages.map(item => ({
        stage: item.stage,
        Count: item.count
    })) || [];

    const activeNutrientDeficiencyData = (healthData?.nutrient_deficiency || []).map(item => ({
        deficiency: item.deficiency,
        Present: item.present,
        Absent: item.absent
    }));

    const colorNameMap: Record<string, string> = {
        "dark green": "Deep Green",
        "deep green": "Deep Green",
        "light green": "Pale Green",
        "pale green": "Pale Green",
        "yellowish": "Yellowing",
        "yellowing": "Yellowing",
        "purplish": "Purpling",
        "purpling": "Purpling"
    };

    const rawPlantColorData = growthData?.plant_color || [];
    const totalColorCount = rawPlantColorData.reduce((sum, item) => sum + item.value, 0);

    const mappedPlantColorData = rawPlantColorData.map((item) => {
        const mappedName = colorNameMap[item.name.toLowerCase()] || item.name;
        const percentage = totalColorCount > 0 ? parseFloat(((item.value / totalColorCount) * 100).toFixed(1)) : 0;
        return {
            name: mappedName,
            value: item.value,
            percentage,
            color: mappedName === "Deep Green" ? "#065f46" : (mappedName === "Pale Green" ? "#34d399" : (mappedName === "Yellowing" ? "#fbbf24" : "#a855f7"))
        };
    });

    const defaultColorData = [
        { name: "Deep Green", value: Math.round(activeVisitedFarmers * 0.75), percentage: 75.0, color: "#065f46" },
        { name: "Pale Green", value: Math.round(activeVisitedFarmers * 0.15), percentage: 15.0, color: "#34d399" },
        { name: "Yellowing", value: Math.round(activeVisitedFarmers * 0.08), percentage: 8.0, color: "#fbbf24" },
        { name: "Purpling", value: Math.round(activeVisitedFarmers * 0.02), percentage: 2.0, color: "#a855f7" }
    ];

    const activePlantColorData = mappedPlantColorData.length > 0 ? mappedPlantColorData : defaultColorData;

    const activeWardsCovered = React.useMemo(() => {
        if (!adminUnits) return 0;
        if (selectedWard) return 1;
        if (selectedSubCounty) {
            return adminUnits.wards.filter(
                (w) => w.subcounty.toLowerCase() === selectedSubCounty.toLowerCase()
            ).length;
        }
        if (selectedCounty) {
            return adminUnits.wards.filter(
                (w) => w.county.toLowerCase() === selectedCounty.toLowerCase()
            ).length;
        }
        const projectCounties = filteredLocationData.map(c => c.county.toLowerCase());
        return adminUnits.wards.filter(
            (w) => projectCounties.includes(w.county.toLowerCase())
        ).length;
    }, [adminUnits, selectedCounty, selectedSubCounty, selectedWard, filteredLocationData]);

    const activeSeedVarietyData = (inputsData?.seed_varieties || []).map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const plantingDates = inputsData?.planting_dates || [];
    let earlyFields = 0;
    let timelyFields = 0;
    let lateFields = 0;

    plantingDates.forEach(item => {
        const periodLower = item.period.toLowerCase();
        if (periodLower.includes("early march")) {
            earlyFields += item.fields;
        } else if (periodLower.includes("mid march") || periodLower.includes("late march") || periodLower.includes("timely")) {
            timelyFields += item.fields;
        } else {
            lateFields += item.fields;
        }
    });

    const totalFields = earlyFields + timelyFields + lateFields;
    const earlyPercentage = totalFields > 0 ? parseFloat(((earlyFields / totalFields) * 100).toFixed(1)) : 22.3;
    const timelyPercentage = totalFields > 0 ? parseFloat(((timelyFields / totalFields) * 100).toFixed(1)) : 58.4;
    const latePercentage = totalFields > 0 ? parseFloat(((lateFields / totalFields) * 100).toFixed(1)) : 19.3;

    const activePlantingDateData = [
        { period: "Early planting", Percentage: earlyPercentage },
        { period: "Timely planting", Percentage: timelyPercentage },
        { period: "Late planting", Percentage: latePercentage }
    ];

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

    const rawMajorPests = healthData?.major_pests || [];
    const defaultMajorPests = [
        { pest: "Fall Armyworm", incidence: 42.5, severity: "Moderate" as const },
        { pest: "Stalk Borer", incidence: 28.3, severity: "Low" as const }
    ];
    const activeMajorPests = rawMajorPests.length > 0 ? rawMajorPests : defaultMajorPests;
    const activeAverageFawDamage = healthData?.average_faw_damage ?? 24.5;

    const rawWeedLevels = healthData?.weed_levels || [];
    const defaultWeedLevels = [
        { name: "Clean", percentage: 45.5, color: "#10b981" },
        { name: "Low", percentage: 28.2, color: "#34d399" },
        { name: "Moderate", percentage: 18.3, color: "#fbbf24" },
        { name: "High", percentage: 8.0, color: "#ef4444" }
    ];
    const activeWeedLevels = rawWeedLevels.length > 0
        ? rawWeedLevels.map((item, idx) => ({ ...item, color: COLORS[idx % COLORS.length] }))
        : defaultWeedLevels;

    const activeDominantWeeds = healthData?.dominant_weeds || ["Grasses", "Broadleaf", "Striga", "Others"];

    const diseaseNameMap: Record<string, string> = {
        "maize streak virus": "Maize Streak Virus",
        "msv": "Maize Streak Virus",
        "grey leaf spot": "Grey Leaf Spot",
        "gls": "Grey Leaf Spot",
        "leaf blight": "Leaf Blight",
        "rust": "Rust",
        "mlnd": "MLND",
        "maize lethal necrosis": "MLND",
        "head smut": "Head Smut"
    };

    const rawDiseaseData = healthData?.disease_symptoms || [];
    const mappedDiseaseData = rawDiseaseData.map((item, idx) => {
        const mappedName = diseaseNameMap[item.name.toLowerCase()] || item.name;
        return {
            name: mappedName,
            percentage: item.percentage,
            color: COLORS[idx % COLORS.length]
        };
    });

    const defaultDiseaseData = [
        { name: "Maize Streak Virus", percentage: 28.0, color: COLORS[0 % COLORS.length] },
        { name: "Grey Leaf Spot", percentage: 18.0, color: COLORS[1 % COLORS.length] },
        { name: "Leaf Blight", percentage: 15.0, color: COLORS[2 % COLORS.length] },
        { name: "Rust", percentage: 12.0, color: COLORS[3 % COLORS.length] },
        { name: "MLND", percentage: 22.0, color: COLORS[4 % COLORS.length] },
        { name: "Head Smut", percentage: 5.0, color: COLORS[5 % COLORS.length] }
    ];

    const activeDiseaseSymptomsData = mappedDiseaseData.length > 0 ? mappedDiseaseData : defaultDiseaseData;

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

    const rawProductionConstraints = yieldUseData?.production_constraints || [];
    const defaultProductionConstraints = [
        { constraint: "Poor rainfall", percentage: 52.4, severity: "High" as const },
        { constraint: "Moisture stress", percentage: 45.8, severity: "High" as const },
        { constraint: "Flooding", percentage: 12.3, severity: "Low" as const },
        { constraint: "Soil fertility", percentage: 38.6, severity: "Medium" as const },
        { constraint: "Fertilizer availability", percentage: 29.1, severity: "Medium" as const },
        { constraint: "Seed quality", percentage: 18.5, severity: "Low" as const },
        { constraint: "Pest infestation", percentage: 41.2, severity: "High" as const },
        { constraint: "Diseases", percentage: 33.4, severity: "Medium" as const },
        { constraint: "Weed pressure", percentage: 22.8, severity: "Low" as const },
        { constraint: "Other", percentage: 9.5, severity: "Low" as const }
    ];
    const activeProductionConstraints = rawProductionConstraints.length > 0 ? rawProductionConstraints : defaultProductionConstraints;

    const rawCopingStrategies = yieldUseData?.coping_strategies || [];
    const defaultCopingStrategies = [
        { intervention: "Replanting", percentage: 24.5 },
        { intervention: "Relay cropping", percentage: 15.2 },
        { intervention: "Supplemental irrigation", percentage: 8.4 },
        { intervention: "No intervention", percentage: 45.1 },
        { intervention: "Other", percentage: 6.8 }
    ];
    const activeCopingStrategies = (rawCopingStrategies.length > 0 ? rawCopingStrategies : defaultCopingStrategies).map((item, idx) => ({
        ...item,
        color: COLORS[idx % COLORS.length]
    }));

    const rawPerformanceRatings = yieldUseData?.performance_ratings || [];
    const defaultPerformanceRatings = [
        { indicator: "Crop establishment", rating: "Good" as const },
        { indicator: "Crop vigour", rating: "Good" as const },
        { indicator: "Pest management", rating: "Fair" as const },
        { indicator: "Disease status", rating: "Good" as const },
        { indicator: "Yield outlook", rating: "Average" as const },
        { indicator: "Overall season performance", rating: "Good" as const }
    ];
    const activePerformanceRatings = rawPerformanceRatings.length > 0 ? rawPerformanceRatings : defaultPerformanceRatings;

    const activeSunflowerInterestCount = maizeStatsData?.sunflower_interest_count !== undefined
        ? maizeStatsData.sunflower_interest_count
        : Math.round(48250 * scaleFactor);
    const activeSunflowerInterestPercent = maizeStatsData?.sunflower_interest_percent !== undefined
        ? maizeStatsData.sunflower_interest_percent
        : 33.2;
    const activeAvgAgpSubmissions = maizeStatsData?.avg_daily_submissions_per_agripreneur !== undefined
        ? maizeStatsData.avg_daily_submissions_per_agripreneur
        : Math.max(50, Math.round(363 * (0.9 + (activeVisitedFarmers % 30) * 0.01)));

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
    const topCountiesAcreageData = sortedCountyMaizeAcreageData.slice(0, 5);
    const totalMaizeAcreage = activeCountyMaizeAcreageData.reduce((sum, item) => sum + item.acres, 0);

    const activeCountySunflowerData = activeCountyMaizeAcreageData.map((item) => {
        const interested = Math.round(item.acres * 0.28);
        return {
            county: item.county,
            interested
        };
    });
    const sortedCountySunflowerData = [...activeCountySunflowerData].sort((a, b) => b.interested - a.interested);
    const topCountiesSunflowerData = sortedCountySunflowerData.slice(0, 5);
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
        const matchesProject =
            countyProjectFilter === "ALL" ||
            item.project === countyProjectFilter;
        const matchesCounty =
            !selectedCounty ||
            item.county.toLowerCase() === selectedCounty.toLowerCase();
        return matchesProject && matchesCounty;
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
            + `Coverage Rate,${activeVisitedPercent}%\n`
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
                                Maize Performance Assessment Report
                            </h1>
                            <p className="text-lg text-emerald-100/80 leading-relaxed mb-6">
                                A high-level summary of the current maize season, highlighting crop performance, growth status and production outlook.                            </p>
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
                                            <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">Maize Farmers Reached</span>
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
                                        <span>Survey Trend </span>
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
                                        <span className="text-[10px] text-slate-400 block font-medium">Coverage Rate</span>
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
                    <Card className="relative overflow-hidden shadow-sm hover:shadow-md hover:shadow-emerald-500/10 border border-slate-200/60 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-500" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-4 px-5">
                            <div className="space-y-1 max-w-[calc(100%-3rem)]">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Farmers Reached</CardDescription>
                                <CardTitle className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                                    {activeVisitedFarmers.toLocaleString()} <span className="text-xs font-bold text-slate-400"></span>
                                </CardTitle>
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20 shadow-xs shrink-0">
                                <Users className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15 border-none font-semibold text-[10px] py-0.5 px-2">
                                    {activeVisitedPercent}% coverage
                                </Badge>
                                <span className="text-[11px] font-medium text-slate-500"> of Targeted Maize Farmers <span className="text-sm font-bold text-black">({activeVisitedTarget.toLocaleString()})</span></span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 2: Gender Distribution */}
                    <Card className="relative overflow-hidden shadow-sm hover:shadow-md hover:shadow-blue-500/10 border border-slate-200/60 hover:border-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-4 px-5">
                            <div className="space-y-1 max-w-[calc(100%-3rem)]">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gender Distribution</CardDescription>
                                <CardTitle className="text-xl font-black text-slate-800 tracking-tight leading-none py-1">
                                    {activeMaleFarmersCount.toLocaleString()} M / {activeFemaleFarmersCount.toLocaleString()} F
                                </CardTitle>
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue-600 flex items-center justify-center border border-blue-500/20 shadow-xs shrink-0">
                                <Activity className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-700 px-1.5 py-0.5 rounded border border-blue-500/10">
                                    {(activeMaleFarmersCount + activeFemaleFarmersCount > 0 ? (activeMaleFarmersCount / (activeMaleFarmersCount + activeFemaleFarmersCount)) * 100 : 46.9).toFixed(1)}% Male
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-pink-500/10 text-pink-700 px-1.5 py-0.5 rounded border border-pink-500/10">
                                    {(activeMaleFarmersCount + activeFemaleFarmersCount > 0 ? (activeFemaleFarmersCount / (activeMaleFarmersCount + activeFemaleFarmersCount)) * 100 : 50.4).toFixed(1)}% Female
                                </span>
                                <span className="text-[11px] font-medium text-slate-500">of the farmers reached</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 3: Avg Household Size */}
                    <Card className="relative overflow-hidden shadow-sm hover:shadow-md hover:shadow-indigo-500/10 border border-slate-200/60 hover:border-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-purple-500" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-4 px-5">
                            <div className="space-y-1 max-w-[calc(100%-3rem)]">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Household Size</CardDescription>
                                <CardTitle className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                                    {Math.round(activeAvgHouseholdSize)} <span className="text-lg font-bold text-slate-400">Members</span>
                                </CardTitle>
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-indigo-600 flex items-center justify-center border border-indigo-500/20 shadow-xs shrink-0">
                                <Users className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-medium text-slate-500">Average size of surveyed households</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 4: Target to Be Reached */}
                    {/* <Card className="relative overflow-hidden shadow-sm hover:shadow-md hover:shadow-slate-500/10 border border-slate-200/60 hover:border-slate-500/30 hover:-translate-y-0.5 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-slate-500 to-slate-700" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-4 px-5">
                            <div className="space-y-1 max-w-[calc(100%-3rem)]">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">KIAMIS Survey Target</CardDescription>
                                <CardTitle className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                                    {activeVisitedTarget.toLocaleString()}
                                </CardTitle>
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-slate-500/10 to-slate-700/10 text-slate-600 flex items-center justify-center border border-slate-500/20 shadow-xs shrink-0">
                                <Target className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-medium text-slate-500">Maize farmers in KIAMIS</span>
                            </div>
                        </CardContent>
                    </Card> */}

                    {/* Card 5: Acreage Covered */}
                    <Card className="relative overflow-hidden shadow-sm hover:shadow-md hover:shadow-emerald-500/10 border border-slate-200/60 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-green-500" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-4 px-5">
                            <div className="space-y-1 max-w-[calc(100%-3rem)]">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Area Under Maize</CardDescription>
                                <CardTitle className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                                    {activeTotalMaizeAcreage.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    <span className="text-sm font-bold text-slate-400">  Acres</span>
                                </CardTitle>
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20 shadow-xs shrink-0">
                                <Sprout className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">

                            <div className="flex items-center gap-2">
                                <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15 border-none font-semibold text-[10px] py-0.5 px-2">
                                    {(activeTotalLandAcreage > 0 ? (activeTotalMaizeAcreage / activeTotalLandAcreage) * 100 : 0).toFixed(1)}%
                                </Badge>
                                <span className="text-[11px] font-medium text-slate-500">of Total Registered Land <span className="text-xm font-bold text-black">({activeTotalLandAcreage.toLocaleString(undefined, { maximumFractionDigits: 0 })} Acres) </span></span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 6: Total Land Acreage */}
                    {/* <Card className="relative overflow-hidden shadow-sm hover:shadow-md hover:shadow-teal-500/10 border border-slate-200/60 hover:border-teal-500/30 hover:-translate-y-0.5 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-500 to-cyan-500" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-4 px-5">
                            <div className="space-y-1 max-w-[calc(100%-3rem)]">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Land Acreage</CardDescription>
                                <CardTitle className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                                    {activeTotalLandAcreage.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-lg font-bold text-slate-400">Acres</span>
                                </CardTitle>
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 text-teal-600 flex items-center justify-center border border-teal-500/20 shadow-xs shrink-0">
                                <Layers className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-teal-500/10 text-teal-700 hover:bg-teal-500/15 border-none font-semibold text-[10px] py-0.5 px-2">
                                    Total Farm Holdings
                                </Badge>
                                <span className="text-[11px] font-medium text-slate-500">Avg: {activeAverageAcreageTotal} Acre / farm</span>
                            </div>
                        </CardContent>
                    </Card> */}

                    {/* Card 7: Expected Yield */}
                    <Card className="relative overflow-hidden shadow-sm hover:shadow-md hover:shadow-amber-500/10 border border-slate-200/60 hover:border-amber-500/30 hover:-translate-y-0.5 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 to-orange-500" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-4 px-5">
                            <div className="space-y-1 max-w-[calc(100%-3rem)]">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expected Yield</CardDescription>
                                <CardTitle className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                                    {activeExpectedYieldBagsPerAcre.toFixed(1)} <span className="text-base font-bold text-slate-400">Bags/Acre</span>
                                </CardTitle>
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20 shadow-xs shrink-0">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-medium text-slate-500">Expected yield for the year 2026 average bags (90Kg)/acre</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 8: Avg Submission by AGP */}
                    <Card className="relative overflow-hidden shadow-sm hover:shadow-md hover:shadow-blue-500/10 border border-slate-200/60 hover:border-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 to-blue-500" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-4 px-5">
                            <div className="space-y-1 max-w-[calc(100%-3rem)]">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Daily Submissions</CardDescription>
                                <CardTitle className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                                    {activeAvgAgpSubmissions.toLocaleString()}
                                </CardTitle>
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-500/10 text-sky-600 flex items-center justify-center border border-sky-500/20 shadow-xs shrink-0">
                                <ClipboardList className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-medium text-slate-500">Per active field agripreneur</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 9: Sunflower Interest */}
                    <Card className="relative overflow-hidden shadow-sm hover:shadow-md hover:shadow-amber-400/10 border border-slate-200/60 hover:border-amber-400/30 hover:-translate-y-0.5 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-yellow-500" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-4 px-5">
                            <div className="space-y-1 max-w-[calc(100%-3rem)]">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Interested in Growing Sunflower</CardDescription>
                                <CardTitle className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                                    {activeSunflowerInterestCount.toLocaleString()} <span className="text-base font-bold text-slate-400">Farmers</span>
                                </CardTitle>
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-400/10 to-yellow-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20 shadow-xs shrink-0">
                                <Sun className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-semibold text-[10px] py-0.5 px-2">
                                    {activeSunflowerInterestPercent.toFixed(1)}%
                                </Badge>
                                <span className="text-[11px] font-medium text-slate-500">of Surveyed Farmers <span className="text-sm font-bold text-black">({activeVisitedFarmers.toLocaleString()})</span></span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card: Average Maize Stored */}
                    {/* <Card className="relative overflow-hidden shadow-sm hover:shadow-md hover:shadow-emerald-500/10 border border-slate-200/60 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-green-600" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-4 px-5">
                            <div className="space-y-1 max-w-[calc(100%-3rem)]">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Maize Stored (Prev Year)</CardDescription>
                                <CardTitle className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                                    {activeStorageAvgBags.toFixed(1)} <span className="text-base font-bold text-slate-400">Bags</span>
                                </CardTitle>
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20 shadow-xs shrink-0">
                                <Package className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-medium text-slate-500">Average 90Kg bags held in stock per household</span>
                            </div>
                        </CardContent>
                    </Card> */}

                    {/* Card 10: Maize Utilisation */}
                    <Card className="relative overflow-hidden shadow-sm hover:shadow-md hover:shadow-emerald-500/10 border border-slate-200/60 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-emerald-600" />
                        <CardHeader className="flex flex-row items-center justify-between pb-1 space-y-0 pt-4 px-5">
                            <div className="space-y-1 max-w-[calc(100%-3rem)]">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Maize Utilisation</CardDescription>
                                <CardTitle className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                                    {Math.round(activeMaizeUtilization.totalBags).toLocaleString()} <span className="text-base font-bold text-slate-400">Bags</span>
                                </CardTitle>
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20 shadow-xs shrink-0">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">
                            <div className="space-y-2.5 mt-2">
                                <div>
                                    <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-0.5">
                                        <span>Family Consumption</span>
                                        <span>{activeMaizeUtilization.familyConsumptionPct}% ({Math.round(activeMaizeUtilization.familyConsumption).toLocaleString()} Bags)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${activeMaizeUtilization.familyConsumptionPct}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-0.5">
                                        <span>Commercial Sale</span>
                                        <span>{activeMaizeUtilization.commercialSalePct}% ({Math.round(activeMaizeUtilization.commercialSale).toLocaleString()} Bags)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${activeMaizeUtilization.commercialSalePct}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-0.5">
                                        <span>Animal Feed</span>
                                        <span>{activeMaizeUtilization.animalFeedsPct}% ({Math.round(activeMaizeUtilization.animalFeeds).toLocaleString()} Bags)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${activeMaizeUtilization.animalFeedsPct}%` }} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Main Tabs Selection */}
            <section className="sticky top-0 z-40 bg-slate-50/95 backdrop-blur-md py-6 border-b border-slate-200/50 container mx-auto px-6 max-w-7xl">
                <div className="flex flex-wrap items-center justify-center mb-4 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm max-w-5xl mx-auto gap-1">
                    <button
                        onClick={() => setActiveSubTab("general")}
                        className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "general"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        General
                    </button>
                    <button
                        onClick={() => setActiveSubTab("crop-establishment")}
                        className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "crop-establishment"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        Crop Establishment
                    </button>
                    <button
                        onClick={() => setActiveSubTab("crop-growth")}
                        className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "crop-growth"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        Crop Growth
                    </button>
                    <button
                        onClick={() => setActiveSubTab("input-use")}
                        className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "input-use"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        Input use Assessment
                    </button>
                    <button
                        onClick={() => setActiveSubTab("pests-diseases-weeds")}
                        className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "pests-diseases-weeds"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        Pest, Disease and Weed Situation
                    </button>
                    <button
                        onClick={() => setActiveSubTab("production-outlook")}
                        className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "production-outlook"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        Production Outlook
                    </button>
                    <button
                        onClick={() => setActiveSubTab("performance")}
                        className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSubTab === "performance"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        Performance
                    </button>
                </div>

                {/* Tab 1: General (Assessment Coverage & Demographics) */}
                {activeSubTab === "general" && (
                    <div className="space-y-12">
                        {/* a. Assessment Coverage Progress */}
                        <div className="space-y-6">
                            <div className="border-b border-slate-200 pb-2">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Assessment Coverage Progress</h2>
                                <p className="text-sm text-slate-500 mt-1">Track county-level progress, target allocations, and survey coverage.</p>
                            </div>
                            {isCountyPerformanceLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-3 border border-slate-200 rounded-2xl bg-white shadow-xs">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                                    <span className="text-sm font-semibold text-slate-500">Loading Assessment Coverage...</span>
                                </div>
                            ) : (
                                <MaizeCountyPerformanceTab
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
                                    activeDailyProgressData={activeDailyProgressData}
                                />
                            )}
                        </div>
                        {/* b. Demographics & Activity */}
                        <div className="space-y-6">
                            <div className="border-b border-slate-200 pb-2">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Demographics & Activity</h2>
                                <p className="text-sm text-slate-500 mt-1">Demographics analysis of visited farming households, age profiles, and gender splits.</p>
                            </div>

                            {isDemographicsLoading || isDailyProgressLoading || isMaizeStatsLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-3 border border-slate-200 rounded-2xl bg-white shadow-xs">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                                    <span className="text-sm font-semibold text-slate-500">Loading Demographics Data...</span>
                                </div>
                            ) : (
                                <MaizeDemographicsTab
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

                            )}
                        </div>



                    </div>
                )}

                {/* Tab 2: Crop Establishment */}
                {activeSubTab === "crop-establishment" && (
                    isGrowthLoading || isInputsLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 border border-slate-200 rounded-2xl bg-white shadow-xs">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                            <span className="text-sm font-semibold text-slate-500">Loading Crop Establishment Data...</span>
                        </div>
                    ) : (
                        <MaizeCropEstablishmentTab
                            topCountiesAcreageData={topCountiesAcreageData}
                            sortedCountyMaizeAcreageData={sortedCountyMaizeAcreageData}
                            totalMaizeAcreage={totalMaizeAcreage}
                            activePlantingDateData={activePlantingDateData}
                            activeSeedSourceData={activeSeedSourceData}
                            activeSeedVarietyData={activeSeedVarietyData}
                            COLORS={COLORS}
                        />
                    )
                )}

                {/* Tab 3: Crop Growth */}
                {activeSubTab === "crop-growth" && (
                    isGrowthLoading || isGrowthDetailedLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 border border-slate-200 rounded-2xl bg-white shadow-xs">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                            <span className="text-sm font-semibold text-slate-500">Loading Crop Growth Data...</span>
                        </div>
                    ) : (
                        <MaizeGrowthTab
                            activeGrowthStageData={activeGrowthStageData}
                            activeCropUniformityData={activeCropUniformityData}
                            activePlantColorData={activePlantColorData}
                            activeGrowthStageDetailedData={activeGrowthStageDetailedData}
                            COLORS={COLORS}
                        />
                    )
                )}

                {/* Tab 4: Input use Assessment */}
                {activeSubTab === "input-use" && (
                    isInputsLoading || isGrowthLoading || isHealthLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 border border-slate-200 rounded-2xl bg-white shadow-xs">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                            <span className="text-sm font-semibold text-slate-500">Loading Input Assessment Data...</span>
                        </div>
                    ) : (
                        <MaizeFertilizerSeedTab
                            activeNutrientDeficiencyData={activeNutrientDeficiencyData}
                            activeFertilizerUseData={activeFertilizerUseData}
                            activeFertilizerApplicationData={activeFertilizerApplicationData}
                            activeVisitedFarmers={activeVisitedFarmers}
                            COLORS={COLORS}
                        />
                    )
                )}

                {/* Tab 5: Pest, Disease and Weed Situation */}
                {activeSubTab === "pests-diseases-weeds" && (
                    isHealthLoading || isYieldUseLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 border border-slate-200 rounded-2xl bg-white shadow-xs">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                            <span className="text-sm font-semibold text-slate-500">Loading Pest, Disease & Weed Data...</span>
                        </div>
                    ) : (
                        <MaizePestsYieldsTab
                            activePestDiseaseData={activePestDiseaseData}
                            activeDiseaseSymptomsData={activeDiseaseSymptomsData}
                            activeHistoricalYieldData={activeHistoricalYieldData}
                            activeMaizeUseData={activeMaizeUseData}
                            activePoorPerformanceCauses={activePoorPerformanceCauses}
                            activeMajorPests={activeMajorPests}
                            activeAverageFawDamage={activeAverageFawDamage}
                            activeWeedLevels={activeWeedLevels}
                            activeDominantWeeds={activeDominantWeeds}
                        />
                    )
                )}

                {/* Tab 6: Production Outlook */}
                {activeSubTab === "production-outlook" && (
                    <MaizeProductionOutlookTab
                        totalMaizeAcreage={totalMaizeAcreage}
                        totalGreenAcreage={totalGreenAcreage}
                        totalSilageAcreage={totalSilageAcreage}
                        totalExpectedYieldBags={totalExpectedYieldBags}
                        activeProductionConstraints={activeProductionConstraints}
                        activeCopingStrategies={activeCopingStrategies}
                        activePerformanceRatings={activePerformanceRatings}
                        activeVisitedFarmers={activeVisitedFarmers}
                        activeStorageDataProp={activeStorageDataProp}
                    />
                )}


                {/* Tab 7: Performance */}
                {activeSubTab === "performance" && (
                    <MaizePerformanceTab
                        totalExpectedYieldBags={totalExpectedYieldBags}
                        totalMaizeAcreage={totalMaizeAcreage}
                        activeVisitedFarmers={activeVisitedFarmers}
                        activePerformanceRatings={activePerformanceRatings}
                    />
                )}
            </section>
        </div>
    );
}

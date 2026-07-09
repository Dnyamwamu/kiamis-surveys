"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
    Sprout,
    BarChart3,
    Users,
    MapPin,
    Calendar,
    ArrowRight,
    Activity,
    ClipboardList,
    ShieldCheck,
    Layers,
    Clock,
    FileText,
} from "lucide-react";

export default function SurveysLandingPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-green-950 via-green-900 to-emerald-900 text-white py-24 sm:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.1),transparent)]" />
                
                {/* Decorative Grid */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left Content */}
                        <div className="lg:col-span-7 space-y-6">
                            <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
                                Ministry of Agriculture (MoALD)
                            </Badge>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                                KIAMIS Surveys <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-white bg-clip-text text-transparent">Portal</span>
                            </h1>
                            
                            <p className="text-lg text-emerald-100/80 leading-relaxed max-w-2xl">
                                A centralized national platform enabling the digital design, field data collection, real-time monitoring, and analysis of national agricultural surveys, censuses, and crop yield assessments across {"Kenya's"} 47 counties.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-6 rounded-xl shadow-lg shadow-emerald-950/20 gap-2">
                                    <Link href="/maize">
                                        Explore Maize Survey <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="border-emerald-500/30 text-emerald-200 hover:bg-white/10 hover:text-white font-semibold px-6 py-6 rounded-xl">
                                    <Link href="/about">
                                        Learn More
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right Feature Panel */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl rounded-3xl p-6 text-white overflow-hidden max-w-md mx-auto">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg border-b border-white/10 pb-3 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-emerald-400" />
                                        Platform Metrics
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <span className="text-emerald-300 text-xs block">Active Counties</span>
                                            <span className="text-2xl font-black mt-1 block">47 / 47</span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <span className="text-emerald-300 text-xs block">Survey Status</span>
                                            <span className="text-2xl font-black mt-1 block text-emerald-400">Live</span>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                                        <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
                                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <span className="text-slate-200 text-xs font-semibold block">Data Privacy Protection</span>
                                            <span className="text-[11px] text-emerald-200/60">Fully compliant with Data Protection Act (2019)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Surveys Section */}
            <section className="py-20 container mx-auto px-6 max-w-7xl">
                <div className="space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight sm:text-4xl">
                            National Survey Portfolio
                        </h2>
                        <p className="text-slate-500">
                            Explore active assessments and upcoming national agricultural monitoring programs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Maize Survey - Active */}
                        <Card className="flex flex-col justify-between border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <CardHeader className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                                        <Sprout className="w-6 h-6" />
                                    </div>
                                    <Badge className="bg-emerald-100 text-emerald-800 border-none font-semibold uppercase text-[10px]">
                                        Active
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg font-bold text-slate-800 pt-2">
                                    Maize Crop Assessment
                                </CardTitle>
                                <CardDescription className="text-xs text-slate-500 leading-relaxed">
                                    Long Rains crop establishment, growth stages, input application, pest pressures, and yield forecasts.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl mt-4">
                                    <Link href="/maize" className="flex items-center justify-center gap-1.5">
                                        View Survey Report <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* National Farmer Census - Upcoming */}
                        <Card className="flex flex-col justify-between border-slate-200 shadow-md opacity-80">
                            <CardHeader className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-semibold uppercase text-[10px]">
                                        Upcoming
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg font-bold text-slate-700 pt-2">
                                    National Farmer Census
                                </CardTitle>
                                <CardDescription className="text-xs text-slate-500 leading-relaxed">
                                    Comprehensive household farmer survey mapping agrarian demographics, holdings, and land use patterns.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <Button disabled className="w-full bg-slate-100 text-slate-400 border border-slate-200 text-xs font-bold rounded-xl mt-4 gap-1.5">
                                    <Clock className="w-3.5 h-3.5" /> In Design Stage
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Livestock Health Survey - Upcoming */}
                        <Card className="flex flex-col justify-between border-slate-200 shadow-md opacity-80">
                            <CardHeader className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-semibold uppercase text-[10px]">
                                        Upcoming
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg font-bold text-slate-700 pt-2">
                                    Livestock Health Survey
                                </CardTitle>
                                <CardDescription className="text-xs text-slate-500 leading-relaxed">
                                    Vaccination coverage, disease prevalence, and husbandry inputs telemetry across animal corridors.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <Button disabled className="w-full bg-slate-100 text-slate-400 border border-slate-200 text-xs font-bold rounded-xl mt-4 gap-1.5">
                                    <Clock className="w-3.5 h-3.5" /> In Design Stage
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Seed Variety Adoption - Upcoming */}
                        <Card className="flex flex-col justify-between border-slate-200 shadow-md opacity-80">
                            <CardHeader className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500">
                                        <Layers className="w-6 h-6" />
                                    </div>
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-semibold uppercase text-[10px]">
                                        Upcoming
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg font-bold text-slate-700 pt-2">
                                    Seed Adoption Survey
                                </CardTitle>
                                <CardDescription className="text-xs text-slate-500 leading-relaxed">
                                    Analysis of drought-tolerant and high-yield seed variety adoption rates within diverse agro-climatic zones.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <Button disabled className="w-full bg-slate-100 text-slate-400 border border-slate-200 text-xs font-bold rounded-xl mt-4 gap-1.5">
                                    <Clock className="w-3.5 h-3.5" /> In Design Stage
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="bg-white py-20 border-t border-slate-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="flex gap-4">
                            <div className="bg-emerald-50 text-emerald-600 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100 shadow-inner">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="font-bold text-slate-800 text-lg">Digital Design & Collection</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Structured questionnaire flow built to align directly with KIAMIS registries, minimizing errors and ensuring consistent geographic tracking.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-emerald-50 text-emerald-600 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100 shadow-inner">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="font-bold text-slate-800 text-lg">Real-Time Data Telemetry</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Live field survey reporting directly showing enumerator progress, active coverage, and demographic insights as they are submitted from the field.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-emerald-50 text-emerald-600 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100 shadow-inner">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="font-bold text-slate-800 text-lg">47 Counties Analytical Depth</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Drill-down views to County, Sub-County, and Ward levels enabling targeted resource allocation, regional comparisons, and yield projections.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

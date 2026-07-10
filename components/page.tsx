"use client";

import { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import {
    CloudArrowUpIcon,
    LockClosedIcon,
    ServerIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Zap,
    Target,
    ShieldCheck,
    BarChart3,
    Users2,
    Tractor as TractorIcon,
    Ticket,
    Globe,
    Package,
} from "lucide-react";
import { KiamisImpactAccordion } from "@/components/public/KiamisImpactAccordion";
import { DynamicImageGrid } from "@/components/public/dynamic-image-grid";
import { DynamicImageGridReverse } from "@/components/public/dynamic-image-grid-reverse";
import KenyaFarmersChoropleth from "@/components/maps/kenya-farmers-choropleth";
import KenyaFarmersD3Map from "@/components/maps/kenya-farmers-d3-map";



export default function FarmersPage() {
    const stats = [
        { id: 1, name: "Farmers Supported", value: "7.4M+" },
        { id: 2, name: "Counties Covered", value: "47" },
        { id: 3, name: "Delivery Rate", value: "98%" },
    ];

    // Auto-scroll logic for partners
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const scrollContainer = document.getElementById('partner-scroll');
        if (!scrollContainer) return;

        const interval = setInterval(() => {
            if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth - 10) {
                scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative isolate overflow-hidden px-6 pt-24 pb-32 lg:px-8 bg-linear-to-b from-gray-100 via-gray-50 to-white">
                {/* Background pattern */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <svg
                        aria-hidden="true"
                        className="absolute top-0 left-1/2 h-[600px] w-[80rem] -translate-x-1/2 mask-[radial-gradient(40rem_40rem_at_top,white,transparent)] stroke-gray-400/30"
                    >
                        <defs>
                            <pattern
                                id="grid-pattern"
                                x="50%"
                                y={-1}
                                width={120}
                                height={120}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M120 0V120M0 0H120" fill="none" />
                            </pattern>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#grid-pattern)"
                            strokeWidth={0}
                        />
                    </svg>
                </div>

                {/* Soft gradient blobs */}
                <div
                    aria-hidden="true"
                    className="absolute -top-40 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl"
                >
                    <div className="h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-green-300 to-emerald-400 opacity-20" />
                </div>

                <div
                    aria-hidden="true"
                    className="absolute top-20 right-10 -z-10 transform-gpu blur-3xl"
                >
                    <div className="h-[22rem] w-[22rem] rounded-full bg-gradient-to-tr from-lime-200 to-green-500 opacity-15" />
                </div>

                <div
                    aria-hidden="true"
                    className="absolute top-20 left-10 -z-10 transform-gpu blur-3xl"
                >
                    <div className="h-[22rem] w-[22rem] rounded-full bg-gradient-to-tr from-red-200 to-red-500 opacity-15" />
                </div>

                {/* Hero content */}
                <div className="mx-auto max-w-7xl">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                        {/* Left Column: Text Content */}
                        <div className="text-center lg:text-left">
                            <div className="mb-6 flex justify-center lg:justify-start">
                                <div className="group inline-flex items-center overflow-hidden rounded-full bg-green-50 ring-1 ring-green-200 transition-all duration-300 ease-out hover:px-5 hover:py-2 px-4 py-2">
                                    <span className="whitespace-nowrap text-sm font-semibold text-green-700 tracking-wide">
                                        NSPD →
                                    </span>
                                    <div className="flex items-center overflow-hidden transition-all duration-300 ease-out max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 ml-0 group-hover:ml-3">
                                        <span className="h-4 w-px bg-green-300 mx-2" />
                                        <span className="whitespace-nowrap text-xs font-medium text-green-600">
                                            Farmer Registration
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                                National Farmer Registration Program
                            </h1>

                            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto lg:mx-0">
                                A centralized platform capturing detailed demographic and agricultural data for every farmer across Kenya to support evidence-based decision making and resource allocation.
                            </p>



                            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                                <a href="login" className="rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-green-800 transition-colors">
                                    Login to Dashboard →
                                </a>
                            </div>
                        </div>

                        {/* Right Column: KPI Cards */}
                        <div className="mt-16 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                {
                                    label: "Farmers Registered",
                                    value: "7.4M+",
                                    icon: Users2,
                                    color: "text-blue-600",
                                    bg: "bg-blue-50",
                                    border: "border-blue-100",
                                },
                                {
                                    label: "Beneficiaries",
                                    value: "1.8M+",
                                    icon: Users2,
                                    color: "text-emerald-600",
                                    bg: "bg-emerald-50",
                                    border: "border-emerald-100",
                                },
                                {
                                    label: "Agripreneurs",
                                    value: "120K+",
                                    icon: Ticket,
                                    color: "text-indigo-600",
                                    bg: "bg-indigo-50",
                                    border: "border-indigo-100",
                                },
                                {
                                    label: "Farms Mapped",
                                    value: "120K+",
                                    icon: Package, // better semantic icon than Ticket
                                    color: "text-cyan-600",
                                    bg: "bg-cyan-50",
                                    border: "border-cyan-100",
                                },
                                {
                                    label: "Total Area (Acres)",
                                    value: "5.2M+",
                                    icon: BarChart3,
                                    color: "text-amber-600",
                                    bg: "bg-amber-50",
                                    border: "border-amber-100",
                                },
                                {
                                    label: "Counties Covered",
                                    value: "47",
                                    icon: Globe,
                                    color: "text-purple-600",
                                    bg: "bg-purple-50",
                                    border: "border-purple-100",
                                },
                            ].map((kpi, idx) => {
                                const Icon = kpi.icon; // cleaner component usage

                                return (
                                    <motion.div
                                        key={idx} // safer than label if labels ever repeat
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ y: -4 }}
                                        className={`relative overflow-hidden rounded-2xl border ${kpi.border} ${kpi.bg} p-6 shadow-sm`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl bg-white shadow-sm ${kpi.color}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    {kpi.label}
                                                </p>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {kpi.value}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Subtle background decoration */}
                                        <div className="absolute -right-2 -bottom-2 opacity-5">
                                            <Icon className="h-24 w-24" />
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Additional full-width card for season/info */}
                            <div className="sm:col-span-2 rounded-2xl bg-white border border-gray-100 p-4 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-sm font-medium text-gray-600">
                                        Active Season: 2025/2026 Planting
                                    </span>
                                </div>

                                <Badge
                                    variant="secondary"
                                    className="bg-emerald-50 text-emerald-700 border-none"
                                >
                                    LIVE UPDATES
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* Feature Section (About KIAMIS) */}
            <div
                id="about"
                className="relative isolate overflow-hidden bg-linear-to-b from-green-900 to-green-800 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 transform skew-y-3 origin-top my-10 border-y-8 border-green-800/50"
            >
                <div className="-skew-y-3">
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <svg
                            aria-hidden="true"
                            className="absolute top-0 left-[max(50%,25rem)] h-[640px] w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-400/30"
                        >
                            <defs>
                                <pattern
                                    id="grid-pattern"
                                    x="50%"
                                    y={-1}
                                    width={200}
                                    height={200}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path d="M100 200V.5M.5 .5H200" fill="none" />
                                </pattern>
                            </defs>

                            <svg x="50%" y={-1} className="overflow-visible fill-gray-500/20">
                                <path
                                    d="M-100.5 0h201v201h-201Z
           M699.5 0h201v201h-201Z
           M499.5 400h201v201h-201Z
           M-300.5 600h201v201h-201Z"
                                    strokeWidth={0}
                                />
                            </svg>

                            <rect
                                fill="url(#grid-pattern)"
                                width="100%"
                                height="100%"
                                strokeWidth={0}
                            />
                        </svg>
                    </div>


                </div>
            </div>


            {/* Map Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-16">

                <div>
                    <KenyaFarmersD3Map />
                </div>
            </div>

            {/* Strategic Partners Slider */}
            <section className="bg-white py-16 border-t border-gray-100 overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>

                            <h2 className="text-2xl font-bold text-gray-900">
                                Strategic Partners & Collaborators
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Working together to transform Kenya&apos;s agricultural landscape through digital innovation.
                            </p>
                        </div>

                        {/* Slider Controls */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    const scrollContainer = document.getElementById('partner-scroll');
                                    if (scrollContainer) scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
                                }}
                                className="p-3 rounded-full border border-gray-200 hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-all shadow-sm bg-white group"
                                aria-label="Previous partner"
                            >
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={() => {
                                    const scrollContainer = document.getElementById('partner-scroll');
                                    if (scrollContainer) scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
                                }}
                                className="p-3 rounded-full border border-gray-200 hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-all shadow-sm bg-white group"
                                aria-label="Next partner"
                            >
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div
                            id="partner-scroll"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            className="flex gap-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 items-center"
                        >
                            {[
                                { name: "MoALD", src: "/MoALD.png", alt: "Ministry of Agriculture" },
                                { name: "GoK", src: "/emblem.png", alt: "GoK Emblem" },
                                { name: "World Bank", src: "/worldbank.png", alt: "World Bank" },
                                { name: "NAVCDP", src: "/Navcdp.png", alt: "NAVCDP" },
                                { name: "FSRP", src: "/fsrp.png", alt: "FSRP" },
                                { name: "SAFARICOM", src: "/safaricom.png", alt: "SAFARICOM" },
                                { name: "NCPB", src: "/ncpb.png", alt: "NCPB" },
                                { name: "COG", src: "/cog.png", alt: "COG" },
                                // Duplicate for smooth infinite feel
                                { name: "MoALD-2", src: "/MoALD.png", alt: "Ministry of Agriculture" },
                                { name: "GoK-2", src: "/emblem.png", alt: "GoK Emblem" },
                                { name: "World Bank-2", src: "/worldbank.png", alt: "World Bank" },
                            ].map((partner, idx) => (
                                <div
                                    key={partner.name + idx}
                                    className="flex-shrink-0 snap-center px-4"
                                >
                                    <div className="relative group  transition-all duration-500 hover:scale-110">
                                        <img
                                            src={partner.src}
                                            alt={partner.alt}
                                            className="h-16 w-auto object-contain"
                                        />
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Gradient Masks */}
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
                    </div>
                </div>

                <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
            </section>
        </div>
    );
}

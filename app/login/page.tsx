"use client";

import LoginForm from "@/components/login-form";
import { Unlock, ArrowLeft, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
    const { setTheme } = useTheme();
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        setTheme("light");
    }, [setTheme]);

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push("/dashboard");
        }
    }, [isAuthenticated, isLoading, router]);

    return (
        <div className="light bg-white text-slate-950 min-h-screen">
            <div className="flex min-h-screen">
                {/* Left Panel - Hero Image */}
                <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
                    <Image
                        src="/login-hero.png"
                        alt="Agricultural dashboard overview"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient overlay - Green theme for fertilizer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/60 to-emerald-900/70" />

                    {/* Content on top of image */}
                    <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                        {/* Logo */}
                        <div className="flex items-center justify-between">
                            {/* <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                                    <Leaf className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-yellow-300 font-bold text-lg leading-tight">
                                        KIAMIS
                                    </p>
                                    <p className="text-white/70 text-xs text-balance">
                                        National Agricultural Dashboard
                                    </p>
                                </div>
                            </div> */}
                            <div className="p-2 h-18 w-42 rounded-lg overflow-hidden bg-white">
                                <Image
                                    src="/kadic-logo.jpeg"
                                    alt="KADIC Logo"
                                    width={150}
                                    height={150}
                                />
                            </div>
                            <div>
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 text-sm font-medium text-yellow-300 hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Go back home
                                </Link>
                            </div>
                        </div>

                        {/* Main text */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    Department of Agriculture
                                </span>
                                <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                                    Empowering Kenya&apos;s
                                    <br />
                                    <span className="text-yellow-300">Agricultural</span>
                                    <br />
                                    Sector
                                </h1>
                                <p className="text-white/75 text-lg leading-relaxed max-w-md">
                                    Real-time monitoring of agricultural programmes, farmer services, and national interventions across all 47 counties.
                                </p>
                            </div>

                            {/* Stats row */}
                            <div className="flex gap-8">
                                {[
                                    { value: "7.4M+", label: "Farmers Registered" },
                                    { value: "4", label: "Active Programmes" },
                                    { value: "47", label: "Counties Covered" },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <p className="text-yellow-300 font-bold text-2xl">{stat.value}</p>
                                        <p className="text-white text-sm">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <p className="text-white/40 text-sm">
                            © {new Date().getFullYear()} Kenya Agricultural Information Digital Information Centre (KADIC)
                            All rights reserved.
                        </p>
                    </div>
                </div>

                {/* Right side - Login Form */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white relative">
                    <div className="w-full max-w-7xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <Image
                                    src="/emblem.png"
                                    alt="Government Logo"
                                    width={80}
                                    height={80}
                                />
                                <Image
                                    src="/cog.png"
                                    alt="Government Logo"
                                    width={90}
                                    height={90}
                                />
                            </div>
                            <h2 className="text-3xl font-bold text-emerald-800">KIAMIS</h2>
                            <h5 className="text-lg font-semibold mb-4 text-balance text-gray-700">
                                National Agricultural Dashboard
                            </h5>

                            <div className="flex max-w-screen-md mx-auto items-center my-4 mb-8">
                                <span className="flex-grow border-t border-gray-300"></span>
                                <span className="px-3 text-gray-500 text-xs uppercase tracking-wide">
                                    Government of Kenya
                                </span>
                                <span className="flex-grow border-t border-gray-300"></span>
                            </div>

                            <p className="text-sm mt-4 text-justify text-gray-600 leading-relaxed">
                                A centralized, data-driven dashboard used by both national and county governments to monitor agricultural programmes and interventions across Kenya. By offering clear visibility into farmer registration, subsidy redemption, and livestock vaccination, the platform strengthens transparency, supports decision-making, and enhances coordination.
                            </p>
                        </div>
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <Unlock className="mb-2 text-emerald-600" />
                                <p className="text-muted-foreground text-sm">
                                    Sign in to access KIAMIS Dashboard
                                </p>
                            </div>
                        </div>
                        <LoginForm />
                        <div className="flex max-w-screen-md mx-auto items-center my-4 mt-8">
                            <span className="flex-grow border-t border-gray-300"></span>
                            <span className="px-3 text-gray-500"></span>
                            <span className="flex-grow border-t border-gray-300"></span>
                        </div>

                        {/* Footer Section */}
                        <footer className=" max-w-screen-lg mt-8 flex gap-6 flex-wrap items-center justify-between  transition-all duration-300">
                            {[
                                { src: "/MoALD.png", alt: "MoALD logo", width: 140 },
                                { src: "/Navcdp.png", alt: "NAVCDP logo", width: 80 },
                                { src: "/fsrp.png", alt: "FSRP logo", width: 60 },
                                { src: "/worldbank.png", alt: "Worldbank logo", width: 80 },
                            ].map((logo) => (
                                <Image
                                    key={logo.alt}
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={logo.width}
                                    height={logo.width}
                                    className="object-contain"
                                />
                            ))}
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}

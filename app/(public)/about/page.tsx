import { Target, Globe, ShieldCheck, Users2, Database, LayoutDashboard, Sprout, CalendarDays, TrendingUp, Layers, HelpCircle } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white pb-16">
            {/* Hero Section */}
            <section className="relative isolate overflow-hidden px-6 py-12 sm:py-20 lg:px-8 bg-linear-to-b from-emerald-50 to-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.100),white)] opacity-50" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-emerald-600/10 ring-1 ring-emerald-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-emerald-700 ring-1 ring-emerald-600/20 hover:ring-emerald-600/30 font-semibold bg-emerald-50/50 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            KIAMIS Survey Ecosystem
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                        KIAMIS Surveys Portal
                    </h1>

                    <p className="mt-6 text-md leading-8 text-slate-600 font-medium">
                        The Kenya Agricultural Management Information System (KIAMIS) Surveys Portal is Kenya’s centralized agricultural digital data collection, monitoring, and analytics system. Developed to support evidence-based policy formulation, the portal integrates field data into a unified, digital ecosystem to drive informed planning, targeted resource allocation, and food security management.
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="px-6 py-4 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-12">

                    {/* Active Module: Maize Survey Assessment Tool */}
                    <div className="bg-green-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-green-800">
                        <div className="absolute inset-0 -z-10 opacity-20 mix-blend-multiply">
                            <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-green-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
                                <defs>
                                    <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                                        <path d="M100 200V.5M.5 .5H200" fill="none" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                            </svg>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between relative z-10">
                            <div className="space-y-4 max-w-3xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-800 border border-green-700 text-green-300 text-xs font-bold uppercase tracking-wider">
                                    <Sprout className="w-3.5 h-3.5" />
                                    Active Program
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                                    Maize Survey Assessment Tool
                                </h2>
                                <p className="text-green-100/90 text-base leading-relaxed">
                                    The primary active module of KIAMIS Surveys is the **Maize Performance Assessment Tool**. It enables digital collection, verification, and analytical dashboard visualization of maize crop parameters across Kenya. Sponsoring projects like NAVCDP and FSRP leverage this tool to track field achievements against target goals, map county cultivated acreage, and plan logistics.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    <div className="flex items-start gap-2.5">
                                        <div className="bg-green-800 p-1.5 rounded-lg border border-green-700 shrink-0">
                                            <Target className="w-4 h-4 text-green-300" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold block text-white">Growth Stage & Vigor Diagnostics</span>
                                            <span className="text-xs text-green-200/70">Monitoring crop progress (emergence to maturity) and leaf color diagnostics.</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <div className="bg-green-800 p-1.5 rounded-lg border border-green-700 shrink-0">
                                            <Database className="w-4 h-4 text-green-300" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold block text-white">Fertilizer & Seed Source Tracking</span>
                                            <span className="text-xs text-green-200/70">Verifying seed varieties, subsidized inputs usage, and water sources (rainfed vs irrigated).</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <div className="bg-green-800 p-1.5 rounded-lg border border-green-700 shrink-0">
                                            <AlertTriangle className="w-4 h-4 text-green-300" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold block text-white">Weed, Pest & Disease Monitoring</span>
                                            <span className="text-xs text-green-200/70">Real-time reporting on Fall Armyworm, stalk borers, and localized nutrient deficiencies.</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <div className="bg-green-800 p-1.5 rounded-lg border border-green-700 shrink-0">
                                            <TrendingUp className="w-4 h-4 text-green-300" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold block text-white">Expected Yield Projections</span>
                                            <span className="text-xs text-green-200/70">Forecasting production output in bags/acre and determining post-harvest utilization.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        </div>
    );
}

// Add mock AlertTriangle icon definition to prevent import issue if missing
function AlertTriangle(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );
}

import { Target, Globe, ShieldCheck, Users2, Database, LayoutDashboard } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative isolate overflow-hidden px-6 py-12 sm:py-24 lg:px-8 bg-linear-to-b from-green-50 to-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.green.100),white)] opacity-50" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-green-600/10 ring-1 ring-green-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-green-700 ring-1 ring-green-600/20 hover:ring-green-600/30 font-medium bg-green-50/50">
                            About KIAMIS Surveys
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        KIAMIS Surveys Portal
                    </h1>

                    <p className="mt-6 text-md leading-8 text-gray-600 font-medium">
                        A centralised national platform enabling the digital design, field data collection, real-time monitoring, and analysis of agricultural related surveys across all 47 counties.

                        The platform empowers both the public and national and county governments with actionable insights on survey participation, Maize Survey Assessment Reports, food security statistics, livestock vaccination coverage, and seed variety adoption. With robust county-level analytics, it drives data-informed agricultural planning, policy formulation, and food security management.
                    </p>

                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 py-4 lg:px-8">
                <div className="mx-auto max-w-7xl text-base leading-7 text-gray-700 space-y-10">
                    <p className="text-xl leading-8 text-gray-900 font-medium drop-shadow-sm">
                        The KIAMIS Surveys Portal serves as Kenya’s centralized agricultural data collection and monitoring system, designed to provide real-time visibility into the implementation and results of nationwide agricultural surveys and censuses. Developed to support evidence-based policy formulation, the portal integrates data from household farmer surveys, crop yield assessments, livestock health evaluations, and other national research initiatives into a single unified digital ecosystem.
                    </p>

                    <div className="relative pl-9 border-l-4 border-green-600">
                        <p className="text-lg text-gray-700">
                            The platform was established by the Ministry of Agriculture and Livestock Development in collaboration with the Kenya Agricultural Digital and Information Centre to address longstanding challenges in agricultural data fragmentation, inconsistent reporting, and data collection delays. Historically, agricultural surveys were conducted through disconnected paper-based systems or isolated digital tools, making it difficult to track data quality, monitor survey progress, aggregate statistics, and react in a timely manner to emerging agricultural trends and food security concerns.
                        </p>
                    </div>

                    <div className="my-16 rounded-3xl bg-green-900 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
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
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-green-800 rounded-lg inline-flex ring-1 ring-white/20">
                                <Database className="w-8 h-8 text-green-300" />
                            </div>
                            <h3 className="text-3xl font-bold">Empowering Stakeholders</h3>
                        </div>
                        <p className="text-xl leading-relaxed text-green-50 font-light">
                            Through KIAMIS Surveys, government institutions, researchers, and development partners are now able to access centralized, clean, and continuously updated survey datasets from all 47 counties. This enables more efficient resource allocation, early warning systems for crop failures, and targeted interventions. The portal enhances the precision of yield projections, streamlines the registration of survey respondents, and supports rapid response to animal disease outbreaks and seed supply chains.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <LayoutDashboard className="w-6 h-6 text-green-700" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Digital Survey Workflows</h4>
                            <p className="text-gray-600">
                                The platform advances digital transformation in the Kenyan agricultural sector by implementing electronic survey workflows. This includes GPS-verified field data entry, automatic validation checks, offline questionnaire capabilities for remote areas, and seamless integration between field enumerators and national databases.
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                            <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-green-800" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Actionable Statistical Insights</h4>
                            <p className="text-gray-700">
                                By consolidating agricultural survey data into a single intelligent analytics platform, KIAMIS provides decision-makers with the actionable statistical insights needed to boost agricultural productivity, strengthen household food security, ensure resource transparency, and drive sustainable agricultural development.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

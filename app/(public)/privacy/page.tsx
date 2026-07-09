"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Data Collection",
      content: "We collect personal and agricultural information necessary to conduct surveys, including but not limited to: full name, national ID, contact details, farm locations (GPS coordinates), crop acreage, livestock inventories, and survey questionnaire responses."
    },
    {
      title: "2. Purpose of Collection",
      content: "Your survey responses are used to compile national agricultural statistics, evaluate project performance, inform policy-making, guide resource allocation, and strengthen food security monitoring in Kenya."
    },
    {
      title: "3. Data Protection Compliance",
      content: "The KIAMIS Surveys Portal is built and operated in strict compliance with the Kenya Data Protection Act (2019). We implement robust technical, administrative, and organizational measures to protect your data against unauthorized access, disclosure, loss, or misuse."
    },
    {
      title: "4. Information Sharing",
      content: "We do not sell, rent, or trade your personal data. Anonymized, aggregated survey statistics may be published for public research. Individually identifiable information is shared only with authorized government statistical and planning agencies solely for national policy evaluation."
    },
    {
      title: "5. Data Storage & Retention",
      content: "Data is stored on secure, government-managed cloud servers. We retain survey datasets in accordance with national records retention policies and statistical archives."
    },
    {
      title: "6. Your Rights",
      content: "As a survey participant, you have the right to access your data, request corrections to inaccurate profile details, and be informed about how your survey responses are processed and aggregated."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden px-6 py-16 sm:py-24 lg:px-8 bg-linear-to-b from-green-50 to-white border-b border-gray-100">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.green.100),white)] opacity-50" />
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold text-green-700 tracking-widest uppercase bg-green-50 px-3 py-1 rounded-full border border-green-200">
              Data Privacy
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm font-semibold text-gray-500">
              Last Updated: January 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative pl-6 sm:pl-8 border-l-2 border-green-600/30 hover:border-green-600 transition-colors"
              >
                <div className="absolute -left-[6px] top-1.5 h-2.5 w-2.5 rounded-full bg-green-600" />
                <h2 className="text-xl font-bold text-gray-900 mb-3 sm:mb-4">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{section.content}</p>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-gray-100 bg-green-50/30 rounded-2xl p-6 border border-green-100"
          >
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              For data protection inquiries or to exercise your rights, please contact the <span className="font-semibold text-green-700">Data Protection Officer</span> at the Ministry of Agriculture & Livestock Development or the <span className="font-semibold text-green-700">Kenya Agricultural Digital and Information Centre (KADIC)</span>.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

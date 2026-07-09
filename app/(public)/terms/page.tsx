"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the KIAMIS Surveys Portal, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from accessing or participating in surveys on the platform."
    },
    {
      title: "2. Purpose of the Platform",
      content: "The KIAMIS Surveys Portal is a national digital system managed by the Ministry of Agriculture & Livestock Development (MoALD). It is designed to collect agricultural survey data, evaluate crop production, assess livestock health, and manage survey responses to inform national agricultural planning."
    },
    {
      title: "3. User & Respondent Responsibilities",
      content: "Survey respondents and field enumerators are responsible for providing accurate, truthful, and complete information. Providing intentionally misleading data, impersonating others, or attempting to compromise portal security is strictly prohibited."
    },
    {
      title: "4. Data Accuracy & Verification",
      content: "While MoALD strives to ensure the statistical reliability of survey outcomes, the Ministry does not guarantee that all datasets or raw respondent inputs are completely free of errors. Submitted survey data is subject to quality checks and verification by KADIC statistical teams."
    },
    {
      title: "5. Intellectual Property",
      content: "All surveys, questionnaires, designs, aggregated data, and portal software are the property of the Government of Kenya and its partners, protected by applicable intellectual property and statistical laws."
    },
    {
      title: "6. Limitation of Liability",
      content: "The Ministry shall not be liable for any direct, indirect, or consequential decisions, losses, or damages arising from the use of survey data or inability to participate in surveys on this portal."
    },
    {
      title: "7. Modifications to Terms",
      content: "We reserve the right to update these terms at any time to reflect changing statistical methodologies or regulatory frameworks. Continued use of the portal after changes are posted constitutes acceptance of the updated terms."
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
              Legal Framework
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Terms of Service
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
              If you have any questions regarding these terms, please contact the <span className="font-semibold text-green-700">Kenya Agricultural Digital and Information Centre (KADIC)</span> or your nearest County Agricultural Office.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

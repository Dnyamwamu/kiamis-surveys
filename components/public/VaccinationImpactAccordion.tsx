"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, Target, Package, Zap, Users2, BarChart3 } from "lucide-react";

export function VaccinationImpactAccordion() {
  const faqs = [
    {
      id: "item-1",
      question: "What is the main goal of this National vaccination campaign?",
      answer: "The main goal is to reduce the prevalence and eventually achieve freedom from Foot and Mouth Disease (FMD) and Peste des Petits Ruminants (PPR) in the country by vaccinating cattle against FMD and sheep and goats against PPR.",
      icon: Target,
    },
    {
      id: "item-2",
      question: "Why is the government undertaking this campaign?",
      answer: "To protect Kenyan livestock in accordance with national, regional, and global control strategies against FMD and PPR, which cause significant production losses, impact food security, and lead to trade restrictions.",
      icon: ShieldCheck,
    },
    {
      id: "item-3",
      question: "Who is the manufacturer of the vaccines?",
      answer: "Vaccines are produced locally by the Kenya Veterinary Vaccines Production Institute (KEVEVAPI). The vaccines are Fotivax™ for FMD and Pestevax™ for PPR.",
      icon: Package,
    },
    {
      id: "item-4",
      question: "How will the vaccination process be carried out?",
      answer: "Coordination is handled by the Directorate of Veterinary Services (DVS), and implementation is by County governments with support from private veterinarians and stakeholders using a risk-based approach.",
      icon: HeartPulse,
    },
    {
      id: "item-5",
      question: "When will the campaign begin and how long will it last?",
      answer: "The campaign begins in January 2025 and will be conducted over three years. We aim to achieve at least 70% vaccination coverage within one year to significantly reduce prevalence.",
      icon: Zap,
    },
    {
      id: "item-6",
      question: "Are there any costs associated with vaccination?",
      answer: "Vaccination is a costly exercise. Costs for vaccines, delivery, and monitoring are met through mobilization of resources from national and county governments, development partners, and livestock sector players.",
      icon: BarChart3,
    },
    {
      id: "item-7",
      question: "How can farmers contribute to the campaign's success?",
      answer: "By availing animals for vaccination, collaborating with veterinary officers, adhering to biosecurity measures, and reporting sick animals (which should not be presented for vaccination).",
      icon: Users2,
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto lg:mx-0"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Vaccination FAQs</h3>
        <div className="h-1 w-20 bg-blue-500 rounded-full" />
      </div>

      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqs.map((faq) => {
          const Icon = faq.icon;
          return (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-white/10 rounded-xl px-4 bg-white/5 overflow-hidden transition-all hover:bg-white/10"
            >
              <AccordionTrigger className="hover:no-underline py-4 text-left group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 group-data-[state=open]:bg-blue-500/40 transition-colors">
                    <Icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors leading-snug">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-sm pb-4 pl-12 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GridItemProps {
  src: string;
  alt: string;
  className?: string;
  title?: string;
  description?: string;
}

const GridItem = ({ src, alt, className, title, description }: GridItemProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative group overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 border border-gray-200/30 dark:border-gray-700/30 shadow-lg transition-all duration-300",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {title && <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{title}</h3>}
        {description && <p className="text-sm text-gray-200 line-clamp-2">{description}</p>}
      </div>
      <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
    </motion.div>
  );
};

export function VaccinationDynamicImageGridReverse() {
  const items = [
    {
      src: "/vaccination-login-hero.png",
      alt: "E-Voucher System",
      title: "E-Voucher System",
      description: "Seamless digital redemption of fertilizer vouchers at authorized NCPB and KNTC depots.",
      size: "small",
    },

    {
      src: "/vaccination2.png",
      alt: "Last-Mile Delivery",
      title: "Last-Mile Delivery",
      description: "Precisely tracking fertilizer movement from national warehouses to individual farmers.",
      size: "large",
    },

    {
      src: "/vaccination4.png",
      alt: "Real-Time Monitoring",
      title: "Real-Time Monitoring",
      description: "Data-driven insights into fertilizer uptake and distribution across all 47 counties.",
      size: "small",
    },

  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-0">
      {/* LEFT: map first two items */}
      <div className="grid grid-rows-2 gap-6">
        {items
          .filter((item) => item.size === "small")
          .map((item, index) => (
            <GridItem
              key={index}
              src={item.src}
              alt={item.alt}
              title={item.title}
              description={item.description}
              className="h-[150px] md:h-[200px]"
            />
          ))}
      </div>

      {/* RIGHT: map the large item */}
      {items
        .filter((item) => item.size === "large")
        .map((item, index) => (
          <GridItem
            key={index}
            src={item.src}
            alt={item.alt}
            title={item.title}
            description={item.description}
            className="h-[250px] md:h-[420px]"
          />
        ))}
    </div>
  );
}
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

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {title && (
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-gray-200 line-clamp-2">{description}</p>
        )}
      </div>

      {/* Glass Border Effect */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
    </motion.div>
  );
};

export function DynamicImageGrid() {
  const items = [
    {
      src: "/fertilizer1.png",
      alt: "Fertilizer Distribution",
      title: "Fertilizer Distribution",
      description: "Ensuring equitable access to subsidized fertilizer for all registered farmers across Kenya.",
      className: "md:col-span-2 md:row-span-2 aspect-[4/3]",
    },
    {
      src: "/fertilizer3.png",
      alt: "Soil Health",
      title: "Soil Health",
      description: "Tailored fertilizer blends based on soil mapping and localized crop requirements.",
      className: "md:col-span-1 md:row-span-1 aspect-[4/3]",
    },
    {
      src: "/fertilizer2.png",
      alt: "Yield Optimization",
      title: "Yield Optimization",
      description: "Boosting national food security through improved access to high-quality farm inputs.",
      className: "md:col-span-1 md:row-span-1 aspect-[4/3]",
    },



  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-4 md:p-0">
      {items.map((item, index) => (
        <GridItem key={index} {...item} />
      ))}
    </div>
  );
}
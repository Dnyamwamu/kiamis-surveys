"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  const getLinkClass = (path: string) => {
    const baseClass = "relative py-1 text-sm font-semibold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-green-700 after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-left";
    if (isActive(path)) {
      return `${baseClass} text-green-700 after:scale-x-100`;
    }
    return `${baseClass} text-gray-900 hover:text-green-700 after:scale-x-0`;
  };

  const getMobileLinkClass = (path: string) => {
    const baseClass = "block rounded-lg px-3 py-3 text-base font-semibold transition-colors";
    if (isActive(path)) {
      return `${baseClass} text-green-700 bg-green-50/50`;
    }
    return `${baseClass} text-gray-900 hover:bg-gray-50`;
  };

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <div className="bg-white">
      {/* Top Contact Bar */}
      <div className="w-full  bg-linear-to-b from-green-900 to-green-800 text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex flex-wrap justify-between">
          <span>Email: info@kilimo.go.ke </span>
          <span>| Toll Free: 0800 724 891</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 ">
        {/* TOP HEADER */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">

            {/* LEFT LOGO SECTION */}
            <div className="flex items-center">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
                <Image
                  alt="KIAMIS Logo"
                  src="/emblem-template.png"
                  width={70}
                  height={80}
                />
                <span className="text-2xl font-bold">KIAMIS</span>
              </Link>
            </div>

            {/* Center LOGO */}
            <div className="flex items-center">
              <div className="flex items-center justify-center">
                <Image
                  src="/COG.jpeg"
                  alt="KADIC Logo"
                  width={45}
                  height={45}
                  className="object-contain sm:w-[65px] sm:h-[65px]"
                />
              </div>
            </div>

            {/* RIGHT LOGO */}
            <div className="flex items-center mr-2 lg:mr-0">
              <div className="flex items-center justify-center">
                <Image
                  src="/kadic-logo.jpeg"
                  alt="KADIC Logo"
                  width={75}
                  height={75}
                  className="object-contain sm:w-[130px] sm:h-[130px]"
                />
              </div>
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-700 hover:bg-gray-100"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav
          aria-label="Global"
          className="hidden lg:block border-t border-gray-100 bg-white"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-10">
                <Link
                  href="/maize"
                  className={getLinkClass("/maize")}
                >
                  Maize Performance Assessment Report
                </Link>
                <Link
                  href="/about"
                  className={getLinkClass("/about")}
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/20" />

          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm">
            {/* MOBILE HEADER */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <Image
                  alt="KIAMIS Logo"
                  src="/emblem-template.png"
                  width={55}
                  height={55}
                  className="object-contain"
                />

                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-bold text-black">
                    KIAMIS
                  </span>

                  <span className="text-[10px] text-gray-500">
                    Kenya National Agricultural Dashboard
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* MOBILE NAV */}
            <div className="mt-8 space-y-2">
              <Link
                href="/maize"
                className={getMobileLinkClass("/maize")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Maize Performance Assessment Report
              </Link>

              <Link
                href="/about"
                className={getMobileLinkClass("/about")}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>




            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-3">
          <div>
            <h5 className="font-semibold text-white text-3xl">KIAMIS Surveys</h5>
            <p className="text-xs font-medium text-gray-400 mb-4 tracking-wider">KENYA INTEGRATED AGRICULTURAL MANAGEMENT INFORMATION SYSTEM - SURVEYS</p>
            <p className="mt-2 text-sm leading-relaxed">
              A centralised national platform enabling the digital design, field data collection, real-time monitoring, and analysis of agricultural related surveys across all 47 counties.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">Active Surveys</h5>
            <ul className="mt-2 space-y-3 text-sm">
              <li>
                <Link href="/maize" className="hover:text-amber-300 transition-colors">Maize Crop Assessment Survey</Link>
              </li>

              <li>
                <a href="https://kilimo.go.ke" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">Ministry of Agriculture (MoALD)</a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">Powered By</h5>
            <p className="mt-2 text-sm">
              Ministry of Agriculture & Livestock Development (MoALD)
              <br />
              <span className="text-gray-400">Kenya Agricultural Digital and Information Centre (KADIC)</span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-xs">
            <a href="/terms" className="hover:text-amber-300 transition-colors">Terms of Service</a>
            <a href="/privacy" className="hover:text-amber-300 transition-colors">Privacy Policy</a>
          </div>
          <p className="text-[10px] text-gray-500">
            Compliance with Kenya Data Protection Act (2019)
          </p>
        </div>

        <div className="border-t border-gray-700 text-center py-4 text-xs mt-8">
          © {new Date().getFullYear()} <span className="text-amber-300">KADIC - MoALD</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

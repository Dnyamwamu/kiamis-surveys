import type React from "react"
import type { Metadata } from "next"
import { Poppins, Geist_Mono, Figtree } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/lib/providers";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import { cn } from "@/lib/utils"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "KIAMIS Surveys Portal - Kenya Integrated Agricultural Management Information System",
  description:
    "A centralised national platform enabling the digital design, field data collection, real-time monitoring, and analysis of agricultural related surveys across all 47 counties in Kenya. Established and maintained by the Ministry of Agriculture and Livestock Development (MoALD) in collaboration with the Kenya Agricultural Digital and Information Centre (KADIC).",
  icons: {
    icon: [
      {
        url: "/kadic-logo.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        figtree.variable
      )}
    >
      <body>
        <Providers>
          {children}
          <Toaster />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </Providers>
      </body>
    </html>
  )
}

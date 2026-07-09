import type React from "react"
import type { Metadata } from "next"
import { Poppins, Geist_Mono, Figtree } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { StoreProvider } from "@/app/StoreProvider"
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
  title: "Kenya Integrated Agricultural Management Information System Dashboard",
  description:
    "A centralised national platform enabling real-time monitoring and management of agricultural programmes, farmer registration, and government e-subsidy interventions across all 47 counties. The platform empowers both the public and national and county governments with actionable insights on farmer enrolment, fertiliser subsidy, seed  Subidy and, livestock vaccination Sudsidy, programme performance, and service delivery. With robust county-level analytics, it drives data-informed decision-making, transparency, and efficient delivery of agricultural support services.",
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
        <StoreProvider>
          {children}
          <Toaster />
          <Analytics />
        </StoreProvider>
      </body>
    </html>
  )
}

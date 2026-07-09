# 🇰🇪 Kenya Integrated Agricultural Management Information System (KIAMIS) Surveys Portal

A centralised national platform enabling the digital design, field data collection, real-time monitoring, and analysis of agricultural related surveys across all 47 counties in Kenya.

Established and maintained by the **Ministry of Agriculture and Livestock Development (MoALD)** in collaboration with the **Kenya Agricultural Digital and Information Centre (KADIC)**.

---

## 📋 Overview

The **KIAMIS Surveys Portal** serves as Kenya’s centralized agricultural data collection, monitoring, and analysis platform. It is designed to provide real-time visibility into the implementation and findings of nationwide agricultural surveys and censuses.

By integrating telemetry from ongoing field data collection, crop yield assessments, and livestock evaluations into a single unified digital ecosystem, the portal empowers both the public and national/county administrations with actionable agricultural insights. This drives evidence-based policy formulation, food security planning, and efficient delivery of support services.

---

## 🚀 Key Features & Active Surveys

### 🌽 1. Maize Survey Assessment
- **Growth Stage Monitoring**: Tracks crop development milestones from emergence, vegetative, to maturity.
- **Input Tracking**: Analyzes fertilizer and seed variety usage across farming regions.
- **Pest & Disease Pressure**: Maps hotspots for Fall Armyworm, Maize Lethal Necrosis (MLN), and nutrient deficiencies.
- **Yield Forecasting**: Compiles field survey records to generate county-level production forecasts.

### 📋 2. Digital Survey Design & Telemetry
- **Real-Time Progress**: Monitors survey completion rates, active data collectors, and daily submission rates.
- **Dynamic Sampling**: Connects directly to the KIAMIS farmer registry to draw verified samples.
- **Progress Tracking**: Tracks ongoing field work against targets set per county, sub-county, and ward.

### 📊 3. County-Level Analytics & Interactive Mapping
- **Hierarchical Filters**: Refines dashboard stats by County, Sub-County, and Ward levels.
- **Interactive GIS**: Fully integrated interactive mapping for visual geographical comparisons.
- **Demographic Insights**: Breaks down surveyed populations by gender, household size, and register status.

---

## 🛠️ Technology Stack

The portal leverages a modern web framework and visualization libraries:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack support)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for fluid, fast-loading, and responsive designs
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [Jotai](https://jotai.org/)
- **Data Visualization**: [Recharts](https://recharts.org/) for modern interactive graphics
- **Geospatial Mapping**: [React Leaflet](https://react-leaflet.js.org/) and D3 for geo-projection mapping
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18.x or v20.x+ recommended)
- `pnpm` (package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd surveys
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` or `.env.local` file in the root directory.

4. **Run the Development Server:**
   ```bash
   pnpm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5. **Validation Scripts:**
   ```bash
   pnpm run lint        # Verify code compliance and formatting
   pnpm run typecheck   # Run full TypeScript validation
   ```

6. **Production Build:**
   ```bash
   pnpm run build
   ```

---

## 🛡️ Data Compliance & Standards
This platform fully complies with the **Kenya Data Protection Act (2019)**, ensuring secure management of farmer records, role-based access control for local and national officials, and end-to-end security of financial and personal data.

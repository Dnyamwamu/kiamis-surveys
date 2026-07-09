# Standalone Portable Map Module

This directory is a completely self-contained, portable React/Next.js map dashboard system extracted from the Kenya Food Systems Dashboard. 

It is designed to be dropped directly into any other Next.js/React project with **zero external dependencies on the main project's backend or database schema**. It communicates purely via properties and generic API specifications.

---

## Folder Structure

```text
map-module/
├── index.ts                     # Main entrypoint exposing all components & utilities
├── types.ts                     # Database-agnostic TypeScript definitions
├── components/                  # React & D3 Map rendering components
│   ├── DataMap.tsx              # Interactive D3 Map SVG renderer
│   ├── DataMap.module.css
│   ├── IndicatorMap.tsx         # Page orchestrator wrapping map, legend, layout
│   ├── IndicatorMap.module.css
│   ├── IndicatorLayout.tsx      # Main layout wrapper (headers, titles, grids)
│   ├── IndicatorLayout.module.css
│   ├── IndicatorContextBar.tsx  # View mode toggles & drop-down selectors
│   ├── IndicatorContextBar.module.css
│   ├── ItemSelect.tsx           # Dropdown for value chains (Maize, Sorghum, Beans)
│   ├── RegionLevelSelect.tsx    # Dropdown for county/national boundaries
│   ├── Tooltip.tsx              # Floating mouse tooltip
│   ├── Tooltip.module.css
│   ├── NumericalLegend.tsx      # Multi-shade numerical legend scale
│   ├── NumericalLegend.module.css
│   ├── OrdinalLegend.tsx        # Ordinal bullet-point legend scale
│   ├── OrdinalLegend.module.css
│   ├── Legend.tsx               # General legend border card & sources list
│   ├── Legend.module.css
│   ├── Select.tsx               # Base select UI component
│   ├── Select.module.css
│   ├── Icon.tsx                 # Zero-dependency inline SVG icon library
│   ├── LocalizedAttribute.tsx   # Multi-language translation utility
│   ├── LoadingOverlay.tsx       # Loading spinner overlay
│   ├── LoadingOverlay.module.css
│   └── topologyData.ts          # GeoJSON topology loader hook
├── state/
│   └── atoms.ts                 # Decoupled Jotai filter and setting atoms
└── utils/
    ├── fetcher.ts               # SWR JSON fetcher
    ├── formatValue.ts           # Number and unit formatting
    ├── indicatorColorScale.ts   # D3.js automatic color scales generator
    ├── interQuartileRange.ts    # Mathematical outlier filters for data
    ├── regionLevelFromSlug.ts   # URL level parsing helper
    ├── useAnimationFrameThrottle.ts
    └── useMousePosition.ts
```

---

## 1. Prerequisites & Dependencies

To use this module in another project, make sure to install the following packages:

```bash
npm install d3 topojson-client jotai swr lodash classnames react-measure d3-geo-projection
npm install --save-dev @types/d3 @types/topojson-client @types/lodash @types/react-measure
```

---

## 2. API contracts

The components communicate with three API endpoints. Make sure your destination project implements routes returning data in the following formats:

### A. Regions (County boundaries list)
Endpoint: `/api/regions/countries/[code]?adminLevel=[RegionLevel]`
Response:
```json
{
  "regions": [
    { "id": 1, "name": "Mombasa", "alpha3Code": "MSA" },
    { "id": 2, "name": "Kwale", "alpha3Code": "KWL" }
  ]
}
```

### B. Indicator Metadata (Options, details & value chains)
Endpoint: `/api/indicators/[indicatorId]?countryId=[countryId]`
Response:
```json
{
  "name": "Crop Yield",
  "unit": "Tonnes/Ha",
  "ordinalValues": [], // Mapped ordinal keys if any
  "items": [
    { "id": "Wheat", "name": "Wheat" },
    { "id": "Maize", "name": "Maize" },
    { "id": "Sorghum", "name": "Sorghum" }
  ],
  "sources": [
    { "id": 1, "label": "MoALD", "url": "https://kilimo.go.ke" }
  ],
  "error": null
}
```

---

## 3. Drop-in Code Example

To render the dashboard layout with the interactive D3 map, drop this into your Next.js page:

```tsx
'use client';

import React from 'react';
import {
  IndicatorMap,
  IndicatorYearsContainer
} from './map-module';

// 1. Mocking Indicator metadata (Can be fetched from your custom database/API)
const mockIndicator = {
  id: 1,
  name: "Crop Yield",
  slug: "crop-yield",
  unit: "Tonnes/Ha",
  allowCSVDownload: true,
  significantFigures: 2,
  minYear: 2012,
  maxYear: 2024,
  ordinalSetId: null,
  sources: [{ id: 1, label: "Ministry of Agriculture", url: null }],
  items: ["Wheat", "Maize", "Sorghum", "Beans"]
};

const mockSubsector = {
  id: 1,
  slug: "production-systems-and-input-supply",
  name: "Production Systems",
  sectorId: 1,
  sector: {
    id: 1,
    slug: "food-supply-chains",
    name: "Food Supply Chains",
    color: "#105d6d"
  }
};

// 2. Mapped Region Data (Counties matched to values over time)
const mockData = {
  msa: [
    { value: 4.5, startYear: 2024, endYear: 2024 },
    { value: 4.1, startYear: 2023, endYear: 2023 }
  ],
  kwl: [
    { value: 2.8, startYear: 2024, endYear: 2024 }
  ]
};

const mockRegions = [
  { id: 1, name: "Mombasa", alpha3Code: "MSA" },
  { id: 2, name: "Kwale", alpha3Code: "KWL" }
];

export default function Page() {
  return (
    <IndicatorYearsContainer minYear={2012} maxYear={2024} activeYears={[2012, 2023, 2024]}>
      <IndicatorMap
        topoJSONURL="/data/regions/ken/admin-1.json" // Absolute path to your topojson file
        indicator={mockIndicator}
        subsector={mockSubsector}
        regions={mockRegions}
        data={mockData}
        countryAlpha3Code="KEN"
        adminLevel="admin-1"
      />
    </IndicatorYearsContainer>
  );
}
```

# 🌽 Maize Performance Assessment Dashboard Documentation

This documentation provides a detailed layout of the **Maize Performance Assessment Dashboard**, describing every KPI card, tab, section, chart, and table, along with their mapped RTK Query hooks and backend API endpoints.

---

## 🔑 Global Configuration & State

All survey queries share the same filters, which are managed globally in the `SurveysPage` component (`app/(public)/maize/page.tsx`). Filters include:

- `county` (selected via the map or dropdown)
- `subcounty`
- `ward`
- `project` (value chain sponsor filter: `ALL`, `FSRP`, or `NAVCDP`)

---

## 📊 1. Top KPI Stat Cards

Located at the top of the dashboard. Redesigned with premium gradient accents and hover effects.

| Metric / Stat Card               | Source Field in API                                        | RTK Query Hook                      | API Endpoint                          | Description                                                           |
| :------------------------------- | :--------------------------------------------------------- | :---------------------------------- | :------------------------------------ | :-------------------------------------------------------------------- |
| **Farmers Reached**              | `visited_farmers`                                          | `useGetMaizeSurveyCountyStatsQuery` | `/api/kyf/maize_survey/county_stats/` | Number of farmers visited; shows percentage progress against target.  |
| **Gender Distribution**          | `male_farmers_count` / `female_farmers_count`              | `useGetMaizeSurveyCountyStatsQuery` | `/api/kyf/maize_survey/county_stats/` | Breakdown of visited farmers by Male vs. Female count and percentage. |
| **Avg Household Size**           | `avg_household_size`                                       | `useGetMaizeSurveyCountyStatsQuery` | `/api/kyf/maize_survey/county_stats/` | Average members in surveyed farming households.                       |
| **KIAMIS Survey Target**         | `target`                                                   | `useGetMaizeSurveyCountyStatsQuery` | `/api/kyf/maize_survey/county_stats/` | Total target goal of maize farmers to reach.                          |
| **Maize Acreage Covered**        | `total_maize_acreage`                                      | `useGetMaizeSurveyCountyStatsQuery` | `/api/kyf/maize_survey/county_stats/` | Total assessed land under grain maize (Rainfed/Irrigated).            |
| **Total Land Acreage**           | `total_land_acreage`                                       | `useGetMaizeSurveyCountyStatsQuery` | `/api/kyf/maize_survey/county_stats/` | Combined total land holdings of visited farmers.                      |
| **Expected Yield**               | `expected_yield_bags_per_acre`                             | `useGetMaizeSurveyCountyStatsQuery` | `/api/kyf/maize_survey/county_stats/` | Projected average yield in 90kg bags per acre.                        |
| **Average Daily Submissions**    | `avg_daily_submissions_per_agripreneur`                    | `useGetMaizeSurveyCountyStatsQuery` | `/api/kyf/maize_survey/county_stats/` | Submissions uploaded per active field agripreneur.                    |
| **Sunflower Interest**           | `sunflower_interest_count` / `sunflower_interest_percent`  | `useGetMaizeSurveyCountyStatsQuery` | `/api/kyf/maize_survey/county_stats/` | Visited farmers expressing interest in growing sunflowers.            |
| **Avg Maize Stored (Prev Year)** | `average_maize_stored`                                     | `useGetMaizeSurveyCountyStatsQuery` | `/api/kyf/maize_survey/county_stats/` | Average 90Kg bags held in stock per household from previous harvest.  |
| **Maize Utilisation**            | Static/Derived (55% Consumption, 30% Commercial, 15% Feed) | N/A                                 | N/A                                   | Horizontal progress bars showing intended usage of expected yields.   |

---

## 🗂️ 2. Tab-by-Tab Section Details

### 📂 Tab 1: General (Demographics & Coverage)

Manages the overview, geographical progress, and basic demographics of surveyed farmers.

#### A. Interactive County Assessment Map (Recharts / SVG D3 Map)

- **Description**: Shows the density of reached farmers across all 47 counties. Colored based on target Coverage Rates. Clickable to filter the entire page.
- **API Hook**: `useGetMaizeSurveyCountyPerformanceQuery`
- **Endpoint**: `/api/kyf/maize_survey/county_performance/`
- **Data Fields**: Array of `{ county, project, visited, target, acreage }`

#### B. Daily Assessment Progress (Bar Chart)

- **Description**: Volume of surveys uploaded day-by-day over the last 30 days.
- **API Hook**: `useGetMaizeSurveyDailyProgressQuery`
- **Endpoint**: `/api/kyf/maize_survey/daily_progress/`
- **Data Fields**: Array of `{ day, visited }` mapped to `{ day, Visited }`

#### C. Assessment Coverage & Farmers Reached (Tables)

- **Description**: Details total acreage, wards covered, registration types, and approval ledger.
- **API Hooks**: `useGetMaizeSurveyDemographicsQuery` and `useGetMaizeSurveyCountyStatsQuery`
- **Endpoints**: `/api/kyf/maize_survey/demographics/` and `/api/kyf/maize_survey/county_stats/`
- **Data Fields**: `registration_status`, `surveys_approved`, `surveys_pending`, `surveys_rejected`

#### D. Gender Segregation & Maize Farmers Reached (Pie Charts)

- **Description**: Two pie charts visualizing gender breakdown and KIAMIS registration status (Registered vs New).
- **API Hook**: `useGetMaizeSurveyDemographicsQuery`
- **Endpoint**: `/api/kyf/maize_survey/demographics/`
- **Data Fields**: `gender_distribution` (Male/Female/Other), `registration_status`

#### E. Household Size Distribution (Bar Chart)

- **Description**: Classifies households into ranges of member counts (e.g. 1-3 members, 4-6 members).
- **API Hook**: `useGetMaizeSurveyDemographicsQuery`
- **Endpoint**: `/api/kyf/maize_survey/demographics/`
- **Data Fields**: `household_size_ranges` (range, value)

#### F. Maize Stocks in Storage (Bar Chart & Summary Stats Panel)

- **Description**: Displays the number of bags currently in storage from the previous year's harvest, along with stock averages.
- **API Hook**: Dynamically calculated in `MaizeDemographicsTab.tsx` using `activeVisitedFarmers`.

#### G. County-wise Performance (Table)

- **Description**: Tabular progress report listing reached and target farmers per county.
- **API Hook**: `useGetMaizeSurveyCountyPerformanceQuery`
- **Endpoint**: `/api/kyf/maize_survey/county_performance/`

---

### 📂 Tab 2: Crop Establishment

Analyzes areas under maize production, seed sourcing, and crop varieties.

#### A. Area under Maize Production (Bar Chart & Table)

- **Description**: Displays the top 10 counties by maize acreage alongside a complete county ledger.
- **API Hook**: `useGetMaizeSurveyCountyPerformanceQuery`
- **Endpoint**: `/api/kyf/maize_survey/county_performance/`

#### B. Source of Seeds (Pie Chart)

- **Description**: Shows where farmers acquired their seed supply (e.g. Agro-dealers, Cooperatives, Local Market).
- **API Hook**: `useGetMaizeSurveyInputsQuery`
- **Endpoint**: `/api/kyf/maize_survey/inputs/`
- **Data Fields**: `seed_sources` (name, value, percentage)

#### C. Type of Seed Variety (Bar Chart)

- **Description**: Distributes major seed varieties in use (e.g. H614, H6213, Duma 43).
- **API Hook**: `useGetMaizeSurveyInputsQuery`
- **Endpoint**: `/api/kyf/maize_survey/inputs/`
- **Data Fields**: `seed_varieties` (name, value, percentage)

#### D. Planting Period (Bar Chart)

- **Description**: Planting timeline breakdown (Early planting, Timely planting, Late planting).
- **API Hook**: `useGetMaizeSurveyInputsQuery`
- **Endpoint**: `/api/kyf/maize_survey/inputs/`
- **Data Fields**: `planting_dates` (period, fields)

---

### 📂 Tab 3: Crop Growth

Tracks crop development stages, uniformity, vigor, and field logging.

#### A. Growth Stage Distribution (Bar Chart)

- **Description**: Number of fields in each growth stage (e.g. Land Prep, Vegetative, Flowering, Maturing).
- **API Hook**: `useGetMaizeSurveyGrowthQuery`
- **Endpoint**: `/api/kyf/maize_survey/growth/`
- **Data Fields**: `growth_stages` (stage, count)

#### B. Crop Uniformity & Crop Vigour / Colour (Pie Charts)

- **Description**: Visual ratings for uniform plant growth and leaf color.
- **API Hook**: `useGetMaizeSurveyGrowthQuery`
- **Endpoint**: `/api/kyf/maize_survey/growth/`
- **Data Fields**: `crop_uniformity` (Excellent, Good, Fair, Poor), `plant_color` (Dark Green, Light Green, etc.)

#### C. Maize Growth Ledger (Detailed Table)

- **Description**: Individual logs for monitored fields showing growth stage, acreage, uniformity, color, and watering methods.
- **API Hook**: `useGetMaizeSurveyGrowthDetailedQuery`
- **Endpoint**: `/api/kyf/maize_survey/growth_detailed/`

---

### 📂 Tab 4: Input Use

Monitors fertilizer uptake, application methods, irrigation, and crop nutrition.

#### A. Fertilizer Use Distribution (Pie Chart)

- **Description**: Proportions of subsidized fertilizer, commercial fertilizer, manure, or none.
- **API Hook**: `useGetMaizeSurveyInputsQuery`
- **Endpoint**: `/api/kyf/maize_survey/inputs/`
- **Data Fields**: `fertilizer_use` (name, value, percentage)

#### B. Fertilizer Application Stage (Bar Chart)

- **Description**: Compares basal application, top dressing completion, and pending top dressing.
- **API Hook**: `useGetMaizeSurveyInputsQuery`
- **Endpoint**: `/api/kyf/maize_survey/inputs/`
- **Data Fields**: `fertilizer_application` (name, value, percentage)

#### C. Irrigation Systems (Pie Chart)

- **Description**: Farming reliance on Rainfed vs. Drip, Sprinkler, or other systems.
- **API Hook**: `useGetMaizeSurveyGrowthQuery`
- **Endpoint**: `/api/kyf/maize_survey/growth/`
- **Data Fields**: `irrigation` (name, value, percentage)

#### D. Nutrient Deficiency Indicators (Bar Chart)

- **Description**: Field incidence levels of Nitrogen (N), Phosphorus (P), and Potassium (K) deficiencies.
- **API Hook**: `useGetMaizeSurveyHealthQuery`
- **Endpoint**: `/api/kyf/maize_survey/health/`
- **Data Fields**: `nutrient_deficiency` (deficiency, present, absent)

---

### 📂 Tab 5: Pests, Diseases & Weeds

Tracks crop health hazards, armyworm attacks, diseases, and weed issues.

#### A. Major Pests Incidence & Dominant Disease Symptoms (Bar Charts)

- **Description**: Percentage of fields reporting active pest attacks (FAW, Stem borer, etc.) and diseases (MLND, MSV, Rust).
- **API Hook**: `useGetMaizeSurveyHealthQuery`
- **Endpoint**: `/api/kyf/maize_survey/health/`
- **Data Fields**: `pest_presence` (name, present, absent), `disease_symptoms` (name, percentage)

#### B. Weed Infestation Levels & Dominant Weeds (Table & List)

- **Description**: Choking level classification (Clean, Low, Moderate, High) and the top 5 dominant weeds.
- **API Hook**: `useGetMaizeSurveyHealthQuery`
- **Endpoint**: `/api/kyf/maize_survey/health/`
- **Data Fields**: `weed_levels` (name, percentage), `dominant_weeds` (array of strings, sliced to top 5)

#### C. Weed & Pest Infestation Pressure (Bar Chart)

- **Description**: Joint comparison of weed choke levels, pest damage, and defoliation indices.
- **API Hook**: `useGetMaizeSurveyHealthQuery`
- **Endpoint**: `/api/kyf/maize_survey/health/`

---

### 📂 Tab 6: Production Outlook

Forecasts crop yield volume, constraints, and coping methods.

#### A. Expected Yield Indicators (Table)

- **Description**: Compares current average expected yield (Bags/Acre) and total forecast against historical seasons.
- **API Hooks**: `useGetMaizeSurveyCountyStatsQuery` and `useGetMaizeSurveyYieldUseQuery`
- **Endpoints**: `/api/kyf/maize_survey/county_stats/` and `/api/kyf/maize_survey/yield_use/`

#### B. Five-Year Yield Trend (Line Chart & Stats Panel)

- **Description**: Trend line of maize productivity per acre from 2022 up to the 2026 expected yield.
- **API Hook**: `useGetMaizeSurveyYieldUseQuery`
- **Endpoint**: `/api/kyf/maize_survey/yield_use/`
- **Data Fields**: `historical_yields` (year, yield)

#### C. Production Constraints (Bar Chart)

- **Description**: Yield limiting factors (Poor rainfall, Soil fertility, Pests, Input costs) colored by severity level (High, Medium, Low).
- **API Hook**: `useGetMaizeSurveyYieldUseQuery`
- **Endpoint**: `/api/kyf/maize_survey/yield_use/`
- **Data Fields**: `production_constraints` (constraint, percentage, severity)

#### D. Coping Strategies (Pie Chart)

- **Description**: Practices employed by farmers to mitigate stress (e.g. Replanting, Relay cropping, Supplemental irrigation).
- **API Hook**: `useGetMaizeSurveyYieldUseQuery`
- **Endpoint**: `/api/kyf/maize_survey/yield_use/`
- **Data Fields**: `coping_strategies` (intervention, percentage)

---

## 📂 Tab 7: Performance Ratings

Indexes qualitative feedback on the current crop season.

#### A. Detailed Performance Index (Table)

- **Description**: Categorized checklist of qualitative ratings (Excellent, Good, Fair, Poor) for establishment, vigor, disease levels, and yields.
- **API Hook**: `useGetMaizeSurveyYieldUseQuery`
- **Endpoint**: `/api/kyf/maize_survey/yield_use/`
- **Data Fields**: `performance_ratings` (indicator, rating)

#### B. Causes of Poor Performance (Pie Chart)

- **Description**: Primary reasons cited for below-average outcomes (Prolonged drought, FAW infestation, Seed quality, etc.).
- **API Hook**: `useGetMaizeSurveyYieldUseQuery`
- **Endpoint**: `/api/kyf/maize_survey/yield_use/`
- **Data Fields**: `poor_performance_causes` (cause, percentage)

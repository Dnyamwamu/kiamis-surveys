# 🚜 KIAMIS Maize Survey Module API Specification

This document details the required API endpoints and data schemas for the **Maize Performance Assessment Dashboard**. Implementing these endpoints on the backend will allow the frontend to display live, dynamic assessment data instead of fallback dummy values.

---

## 🔑 Global Configuration & Authentication

- **Base URL**: Set via the `NEXT_PUBLIC_KIAMIS_API_URL` environment variable.
- **Authentication**: Token-based authentication. The frontend includes this header in all requests:
  ```http
  Authorization: Token <token>
  ```

---

## 📌 Query Parameters (Location & Project Filtering)

Most endpoints support filtering by administrative units and sponsor projects. When a user selects a filter on the dashboard, the corresponding query parameter is appended to the request.

| Parameter   | Type     | Required | Description                                                           |
| :---------- | :------- | :------- | :-------------------------------------------------------------------- |
| `county`    | `string` | No       | Upper-case name of the selected county (e.g., `BARINGO`).             |
| `subcounty` | `string` | No       | Upper-case name of the selected sub-county (e.g., `BARINGO CENTRAL`). |
| `ward`      | `string` | No       | Upper-case name of the selected ward (e.g., `SACHO`).                 |
| `project`   | `string` | No       | Sponsor project filter: `ALL`, `FSRP`, or `NAVCDP`.                   |

---

## 📡 Endpoints

### 1. County Stats Summary

Returns overall KPIs for visited farmers, targets, and average acreages based on selected filters.

- **RTK Query Hook**: `useGetMaizeSurveyCountyStatsQuery`
- **Method**: `GET`
- **Endpoint URL**: `/api/kyf/maize_survey/county_stats/`
- **Example Request**: `/api/kyf/maize_survey/county_stats/?county=BARINGO&project=FSRP`
- **Response Schema (`MaizeSurveyCountyStats`)**:
  ```json
  {
    "visited_farmers": 145280,
    "target": 150000,
    "visited_percent": 96.85,
    "counties_covered": 42,
    "avg_household_size": 5.4,
    "average_acreage": 2.4,
    "average_acreage_total": 3.2,
    "total_maize_acreage": 348672,
    "total_land_acreage": 464896,
    "expected_yield_bags_per_acre": 16.5,
    "avg_daily_submissions_per_agripreneur": 363,
    "sunflower_interest_count": 48250,
    "sunflower_interest_percent": 33.2,
    "already_registered_visited": 112500,
    "new_farmers_visited": 32780,
    "surveys_approved": 123488,
    "surveys_pending": 15980,
    "surveys_rejected": 5812,
    "male_farmers_count": 74383,
    "female_farmers_count": 70897,
    "other_farmers_count": 0
  }
  ```

---

### 2. Demographics Distribution

Returns demographics data (gender breakdown, pre-existing vs. new registrations, and household size ranges).

- **RTK Query Hook**: `useGetMaizeSurveyDemographicsQuery`
- **Method**: `GET`
- **Endpoint URL**: `/api/kyf/maize_survey/demographics/`
- **Example Request**: `/api/kyf/maize_survey/demographics/?county=BARINGO`
- **Response Schema (`MaizeSurveyDemographics`)**:
  ```json
  {
    "gender_distribution": [
      { "name": "Male", "value": 1021, "percentage": 46.9 },
      { "name": "Female", "value": 1097, "percentage": 50.4 },
      { "name": "Other", "value": 58, "percentage": 2.7 }
    ],
    "registration_status": [
      { "name": "Registered Farmers", "value": 112500, "percentage": 77.4 },
      { "name": "New Farmers", "value": 32780, "percentage": 22.6 }
    ],
    "household_size_ranges": [
      { "range": "1 - 3 members", "value": 38240 },
      { "range": "4 - 6 members", "value": 68520 },
      { "range": "7 - 9 members", "value": 26810 },
      { "range": "10+ members", "value": 11710 }
    ]
  }
  ```

---

### 3. Daily Assessment Progress

Returns daily progress logs of Visited/Reached farmers over the past 30 days.

- **RTK Query Hook**: `useGetMaizeSurveyDailyProgressQuery`
- **Method**: `GET`
- **Endpoint URL**: `/api/kyf/maize_survey/daily_progress/`
- **Example Request**: `/api/kyf/maize_survey/daily_progress/?county=BARINGO`
- **Response Schema (`DailyProgressRecord[]`)**:
  ```json
  [
    { "day": "Jun 10", "visited": 3100 },
    { "day": "Jun 11", "visited": 3400 },
    { "day": "Jun 12", "visited": 3800 }
  ]
  ```

---

### 4. Maize Growth

Returns agronomy data including growth stages, crop uniformity, plant leaf color profile, and irrigation methods.

- **RTK Query Hook**: `useGetMaizeSurveyGrowthQuery`
- **Method**: `GET`
- **Endpoint URL**: `/api/kyf/maize_survey/growth/`
- **Example Request**: `/api/kyf/maize_survey/growth/?county=BARINGO`
- **Response Schema (`MaizeSurveyGrowth`)**:
  ```json
  {
    "growth_stages": [
      { "stage": "Land Preparation", "count": 12450 },
      { "stage": "Vegetative", "count": 48200 },
      { "stage": "Flowering", "count": 35400 },
      { "stage": "Tasseling", "count": 28900 },
      { "stage": "Maturing", "count": 18320 },
      { "stage": "Harvesting", "count": 5210 }
    ],
    "crop_uniformity": [
      { "name": "Excellent", "value": 450, "percentage": 30.0 },
      { "name": "Good", "value": 750, "percentage": 50.0 },
      { "name": "Fair", "value": 225, "percentage": 15.0 },
      { "name": "Poor", "value": 75, "percentage": 5.0 }
    ],
    "plant_color": [
      { "name": "Dark Green", "value": 75 },
      { "name": "Light Green", "value": 15 },
      { "name": "Yellowish", "value": 8 },
      { "name": "Purplish", "value": 2 }
    ],
    "irrigation": [
      { "name": "Rainfed", "value": 1250, "percentage": 83.3 },
      { "name": "Drip Irrigation", "value": 150, "percentage": 10.0 },
      { "name": "Sprinkler", "value": 75, "percentage": 5.0 },
      { "name": "Other", "value": 25, "percentage": 1.7 }
    ]
  }
  ```

---

### 5. Detailed Growth Records Table

Returns a raw tabular list of crop growth details per record/field.

- **RTK Query Hook**: `useGetMaizeSurveyGrowthDetailedQuery`
- **Method**: `GET`
- **Endpoint URL**: `/api/kyf/maize_survey/growth_detailed/`
- **Example Request**: `/api/kyf/maize_survey/growth_detailed/?county=BARINGO`
- **Response Schema (`MaizeSurveyGrowthDetailedRecord[]`)**:
  ```json
  [
    {
      "stage": "Flowering",
      "acreage": "3.5 Acres",
      "uniformity": "Good",
      "color": "Dark Green",
      "irrigation": "Rainfed"
    },
    {
      "stage": "Vegetative",
      "acreage": "1.2 Acres",
      "uniformity": "Excellent",
      "color": "Dark Green",
      "irrigation": "Drip Irrigation"
    }
  ]
  ```

---

### 6. Farm Inputs (Seeds & Sources)

Returns seed varieties, seed sourcing channels, and planting periods.

- **RTK Query Hook**: `useGetMaizeSurveyInputsQuery`
- **Method**: `GET`
- **Endpoint URL**: `/api/kyf/maize_survey/inputs/`
- **Example Request**: `/api/kyf/maize_survey/inputs/?county=BARINGO`
- **Response Schema (`MaizeSurveyInputsResponse`)**:
  ```json
  {
    "seed_sources": [
      { "name": "Agro-Dealers", "value": 75200, "percentage": 51.8 },
      { "name": "Cooperatives", "value": 28400, "percentage": 19.5 },
      { "name": "Government/MoALD", "value": 19100, "percentage": 13.1 },
      { "name": "Local Market", "value": 13450, "percentage": 9.3 },
      { "name": "Saved Seeds", "value": 9130, "percentage": 6.3 }
    ],
    "seed_varieties": [
      { "name": "H614", "value": 45200, "percentage": 31.1 },
      { "name": "H6213", "value": 28400, "percentage": 19.5 },
      { "name": "Duma 43", "value": 21800, "percentage": 15.0 },
      { "name": "Pannar", "value": 18200, "percentage": 12.5 },
      { "name": "DK 8031", "value": 15900, "percentage": 10.9 },
      { "name": "Other", "value": 15780, "percentage": 11.0 }
    ],
    "planting_dates": [
      { "period": "Early March", "fields": 32400 },
      { "period": "Mid March", "fields": 56800 },
      { "period": "Late March", "fields": 28100 },
      { "period": "Early April", "fields": 18900 },
      { "period": "Mid April", "fields": 9080 }
    ],
    "fertilizer_use": [
      { "name": "Government subsidized fertilizer", "value": 65660, "percentage": 45.2 },
      { "name": "Commercial fertilizer", "value": 47650, "percentage": 32.8 },
      { "name": "Organic manure", "value": 17430, "percentage": 12.0 },
      { "name": "No fertilizer", "value": 14540, "percentage": 10.0 }
    ],
    "fertilizer_application": [
      { "name": "Basal applied", "value": 114000, "percentage": 78.5 },
      { "name": "Top dressing completed", "value": 65100, "percentage": 44.8 },
      { "name": "Top dressing pending", "value": 48900, "percentage": 33.7 }
    ]
  }
  ```

---

### 7. Crop Health & Pest Prevalence

Returns prevalence of pests (e.g., Fall Armyworm), nutrient deficiency visual symptoms, and crop disease profiles.

- **RTK Query Hook**: `useGetMaizeSurveyHealthQuery`
- **Method**: `GET`
- **Endpoint URL**: `/api/kyf/maize_survey/health/`
- **Example Request**: `/api/kyf/maize_survey/health/?county=BARINGO`
- **Response Schema (`MaizeSurveyHealthResponse`)**:
  ```json
  {
    "pest_presence": [
      { "name": "Fall Armyworm", "present": 35, "absent": 65 },
      { "name": "Stem Borer", "present": 22, "absent": 78 },
      { "name": "Cutworms", "present": 12, "absent": 88 },
      { "name": "Maize Weevil", "present": 8, "absent": 92 }
    ],
    "nutrient_deficiency": [
      { "deficiency": "Nitrogen (N) Deficiency", "present": 42, "absent": 58 },
      {
        "deficiency": "Phosphorus (P) Deficiency",
        "present": 28,
        "absent": 72
      },
      { "deficiency": "Potassium (K) Deficiency", "present": 15, "absent": 85 }
    ],
    "disease_symptoms": [
      { "name": "Maize Lethal Necrosis (MLND)", "percentage": 42 },
      { "name": "Maize Streak Virus (MSV)", "percentage": 28 },
      { "name": "Grey Leaf Spot (GLS)", "percentage": 18 },
      { "name": "Common Rust", "percentage": 12 }
    ],
    "major_pests": [
      { "pest": "Fall Armyworm", "incidence": 42.5, "severity": "Moderate" },
      { "pest": "Stalk Borer", "incidence": 28.3, "severity": "Low" }
    ],
    "average_faw_damage": 24.5,
    "weed_levels": [
      { "name": "Clean", "percentage": 45.5 },
      { "name": "Low", "percentage": 28.2 },
      { "name": "Moderate", "percentage": 18.3 },
      { "name": "High", "percentage": 8.0 }
    ],
    "dominant_weeds": ["Grasses", "Broadleaf", "Striga", "Others"]
  }
  ```

---

### 8. Yield Outcomes & Maize Utilization

Returns historical yield levels, crop usage distributions (consumption vs. marketing), harvest cycles, constraints on production, coping strategies, and overall performance ratings.

- **RTK Query Hook**: `useGetMaizeSurveyYieldUseQuery`
- **Method**: `GET`
- **Endpoint URL**: `/api/kyf/maize_survey/yield_use/`
- **Example Request**: `/api/kyf/maize_survey/yield_use/?county=BARINGO`
- **Response Schema (`MaizeSurveyYieldUseResponse`)**:
  ```json
  {
    "historical_yields": [
      { "year": "2022", "yield": 12.8 },
      { "year": "2023", "yield": 14.2 },
      { "year": "2024", "yield": 15.6 },
      { "year": "2025", "yield": 14.8 },
      { "year": "2026 (Exp)", "yield": 16.5 }
    ],
    "maize_use": [
      { "name": "Home Consumption", "value": 72 },
      { "name": "Commercial Sale", "value": 18 },
      { "name": "Animal Feed", "value": 7 },
      { "name": "Saved Seed / Other", "value": 3 }
    ],
    "harvesting_months": [
      { "month": "August", "fields": 15400 },
      { "month": "September", "fields": 58200 },
      { "month": "October", "fields": 42100 },
      { "month": "November", "fields": 21800 },
      { "month": "December", "fields": 7780 }
    ],
    "poor_performance_causes": [
      { "cause": "Prolonged Drought", "percentage": 45 },
      { "cause": "Pests Infestation (FAW)", "percentage": 25 },
      { "cause": "High Input Costs", "percentage": 18 },
      { "cause": "Poor Seed Quality", "percentage": 8 },
      { "cause": "Other Factors", "percentage": 4 }
    ],
    "production_constraints": [
      { "constraint": "Poor rainfall", "percentage": 52.4, "severity": "High" },
      { "constraint": "Moisture stress", "percentage": 45.8, "severity": "High" },
      { "constraint": "Flooding", "percentage": 12.3, "severity": "Low" },
      { "constraint": "Soil fertility", "percentage": 38.6, "severity": "Medium" },
      { "constraint": "Fertilizer availability", "percentage": 29.1, "severity": "Medium" },
      { "constraint": "Seed quality", "percentage": 18.5, "severity": "Low" },
      { "constraint": "Pest infestation", "percentage": 41.2, "severity": "High" },
      { "constraint": "Diseases", "percentage": 33.4, "severity": "Medium" },
      { "constraint": "Weed pressure", "percentage": 22.8, "severity": "Low" },
      { "constraint": "Other", "percentage": 9.5, "severity": "Low" }
    ],
    "coping_strategies": [
      { "intervention": "Replanting", "percentage": 24.5 },
      { "intervention": "Relay cropping", "percentage": 15.2 },
      { "intervention": "Supplemental irrigation", "percentage": 8.4 },
      { "intervention": "No intervention", "percentage": 45.1 },
      { "intervention": "Other", "percentage": 6.8 }
    ],
    "performance_ratings": [
      { "indicator": "Crop establishment", "rating": "Good" },
      { "indicator": "Crop vigour", "rating": "Good" },
      { "indicator": "Pest management", "rating": "Fair" },
      { "indicator": "Disease status", "rating": "Good" },
      { "indicator": "Yield outlook", "rating": "Average" },
      { "indicator": "Overall season performance", "rating": "Good" }
    ]
  }
  ```

---

### 9. County-wise Performance Table

Returns paginated list of performance metrics (Visited, Target, Maize Acreage) grouped by county.

- **RTK Query Hook**: `useGetMaizeSurveyCountyPerformanceQuery`
- **Method**: `GET`
- **Endpoint URL**: `/api/kyf/maize_survey/county_performance/`
- **Example Request**: `/api/kyf/maize_survey/county_performance/?page=1&page_size=100`
- **Response Schema (`MaizeSurveyCountyPerformanceResponse`)**:
  ```json
  {
    "count": 47,
    "next": null,
    "previous": null,
    "results": [
      {
        "county": "BARINGO",
        "project": "FSRP",
        "visited": 12450,
        "target": 130000,
        "acreage": 28450.5
      },
      {
        "county": "BUNGOMA",
        "project": "NAVCDP",
        "visited": 22100,
        "target": 25000,
        "acreage": 58900.2
      }
    ]
  }
  ```

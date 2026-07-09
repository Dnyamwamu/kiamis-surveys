export interface RedemptionSummary {
  farmers: number
  redemptions: number
  units: number
  total_value: number
  client_payment: number
}

// Daily Redemptions
export interface DailyRedemptionEntry {
  entry_date: string
  farmers: number
  redemptions: number
  units: number
  total_value: number
  subsidy: number
  client_payment: number
}

export interface DailyRedemptionResponse {
  description_for_daily: string
  description_for_summary: string
  summary: RedemptionSummary
  daily: DailyRedemptionEntry[]
}

export interface DailyRedemptionParams {
  start_date?: string
  end_date?: string
  county?: string
  subcounty?: string
  ward?: string
}

// Redemptions by Admin Units
export interface RedemptionByAdminUnit {
  name: string
  farmers: number
  units: number
  total_value: number
  number_of_redemptions: number
  total_client_payment_amount: number
}

export interface RedemptionByAdminUnitsResponse {
  grouping: "county" | "subcounty" | "ward"
  results: RedemptionByAdminUnit[]
}

export interface RedemptionByAdminUnitsParams {
  county?: string
  subcounty?: string
  ward?: string
  fertilizer_type?: string
}

// Redemptions by Value chains
export interface RedemptionByValuechain {
  redeemed_value_chain: string
  number_of_farmers: number
  number_of_redemptions: number
  total_product_value: number
  total_client_payment_amount: number
  total_number_of_product_units: number
  total_subsidy_amount: number
}

export interface RedemptionByValuechainsResponse {
  grouping: "county" | "subcounty" | "ward"
  results: RedemptionByValuechain[]
}

export interface RedemptionByValuechainsParams {
  county?: string
  subcounty?: string
  ward?: string
  fertilizer_type?: string
}

// Redeemed Evouchers
export interface RedeemedEvouchers {
  _id_: string
  county: string
  date_redeemed: string
  service_point_name: string
  user_name: string
  user_mobile_number: string
  farmer_name: string
  farmer_mobile_number: string
  formatted_farmer_mobile: string
  nationalid: string
  national_id_no: number
  transaction_quantity: number
  transaction_value: number
  payment_amount: number
  voucher_code: string
  fertilizer_type: string
  value_chain: string
  season: string
}

export interface RedeemedEvouchersResponse {
  description: string
  count: number
  total_pages: number
  current_page: number
  page_size: number
  next_page: null | number
  next_page_url: null
  previous_page_url: null
  previous_page: null
  results: RedeemedEvouchers[]
}

export interface RedeemedEvouchersParams {
  county?: string
  subcounty?: string
  ward?: string
  fertilizer_type?: string
  user_mobile_number?: string
  value_chain?: string
  season?: string
  start_date?: string
  end_date?: string
  service_point_name?: string
  page?: number
  page_size?: number
}

// Service Points
export interface ServicePoint {
  county: string
  service_points: string[]
}

export interface ServicePointsResponse {
  description: string
  results: ServicePoint[]
}

export interface ServicePointsParams {
  county?: string
}

// Fertilizer Type
export interface FertilizerTypesResponse {
  fertilizer_type: string
  farmers: number
  units: number
  total_value: number
  number_of_redemptions: number
  total_client_payment_amount: number
}

export interface FertilizerTypesParams {
  county?: string
  subcounty?: string
  ward?: string
}

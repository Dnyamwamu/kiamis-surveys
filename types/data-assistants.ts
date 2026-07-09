export interface DataCollectorData {
  user_id: string;
  user_name: string;
  mobile_number: string;
  county: string;
  subcounty: string;
  ward: string;
  total_registered_animals: number;
  total_farmers_served: number;
  first_entry_date: string;
  last_entry_date: string;
}

export interface DataCollectorResponse {
  page: number;
  limit: number;
  count: number;
  total_collectors: number;
  total_pages: number;
  next_page: number | null;
  previous_page: number | null;
  next_page_url: string | null;
  previous_page_url: string | null;
  results: DataCollectorData[];
}

export interface DataCollectorTransaction {
  request_id: string;
  user_id: string;
  user_name: string;
  mobile_number: string;
  livestock_name: string;
  total_animals_registered: number;
  farmer_id: string;
  national_id_no: string;
  mobile_no: string;
  farmer_name: string;
  entry_date: string;
  county: string;
  subcounty: string;
  ward: string;
  project: string;
}

export interface DataCollectorTransactionsResponse {
  user_summary: {
    user_id: string;
    user_name: string;
    mobile_number: string;
    total_transactions: number;
    total_animals_registered: number;
  };
  page: number;
  limit: number;
  count: number;
  total_records: number;
  total_pages: number;
  next_page: number | null;
  previous_page: number | null;
  next_page_url: string | null;
  previous_page_url: string | null;
  results: DataCollectorTransaction[];
}

export interface DataCollectorCountyStat {
  county: string;
  total_data_assistants: number;
  total_farmers_served: number;
  total_animals_registered: number;
}

export interface DataCollectorCountyStatsResponse {
  project: string;
  filters_used: {
    county: string | null;
    subcounty: string | null;
    ward: string | null;
    entry_date_from: string | null;
    entry_date_to: string | null;
  };
  totals: {
    total_data_assistants: number;
    total_farmers_served: number;
    total_animals_registered: number;
  };
  counties: DataCollectorCountyStat[];
}

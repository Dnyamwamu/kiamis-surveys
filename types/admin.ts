// Hierarchical structure (returned by adminApi)
export interface Ward {
  ward: string;
}

export interface SubCounty {
  subcounty: string;
  wards: string[];
}

export interface AdminUnit {
  county: string;
  project?: string;
  subcounties: SubCounty[];
}

export type AdminUnitsResponse = AdminUnit[];

// Flat structure (used by some filters)
export interface FlatCounty {
  county_id: string;
  county: string;
}

export interface FlatSubCounty {
  subcounty_id: string;
  subcounty: string;
  county: string;
  county_id: string;
}

export interface FlatWard {
  ward_id: string;
  ward: string;
  subcounty: string;
  subcounty_id: string;
}

export interface AdminUnitsData {
  counties: FlatCounty[];
  subcounties: FlatSubCounty[];
  wards: FlatWard[];
}

// organize administrative units organized by county and subcounty
export interface AdministrativeUnits {
  counties: string[];
  subCounties: Record<string, string[]>;
  wards: Record<string, string[]>;
}

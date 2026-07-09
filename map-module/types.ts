export type RegionLevel = 'WORLD' | 'REGION' | 'SUBREGION' | 'COUNTRY' | 'LEVEL_1' | 'LEVEL_2';

export type UrbanRural = 'ALL' | 'URBAN' | 'RURAL';
export type FemaleMale = 'ALL' | 'FEMALE' | 'MALE';

export interface Source {
  id: number;
  label: string;
  url: string | null;
}

export interface Localization {
  id: number;
  name: string;
  languageCode: string;
}

export interface Sector {
  id: number;
  slug: string;
  name: string;
  color: string;
  position: number | null;
}

export interface Subsector {
  id: number;
  slug: string;
  name: string;
  sectorId: number;
  sector: Sector;
  position: number | null;
}

export interface Indicator {
  id: number;
  name: string;
  slug: string;
  goalMinimum: number | null;
  goalMaxiumum: number | null;
  allowCSVDownload: boolean;
  unit: string | null;
  significantFigures: number | null;
  minYear: number | null;
  maxYear: number | null;
  ordinalSetId: number | null;
  group: string | null;
  position: number | null;
  definition: string | null;
  relevance: string | null;
  calculation: string | null;
  treatmentOfMissingValues: string | null;
  additionalInformation: string | null;
  regionId: number;
  sources: Source[];
  localizations?: {
    localization: Localization;
    name: string;
  }[];
  items?: string[];
  ordinalValues?: { position: number; label: string }[];
}

export interface Region {
  id: number;
  name: string;
  slug: string | null;
  alpha2Code: string | null;
  alpha3Code: string | null;
  level: RegionLevel;
}

export type ViewMode = 'map' | 'graph' | 'table';

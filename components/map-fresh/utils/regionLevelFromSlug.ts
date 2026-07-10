import { RegionLevel } from '../types';

const levelSlugs: Record<string, RegionLevel> = {
  national: 'COUNTRY',
  'admin-1': 'LEVEL_1',
  'admin-2': 'LEVEL_2',
};

const regionLevels = Object.values(levelSlugs) as string[];

export type AdminLevelSlug = keyof typeof levelSlugs;

export const regionLevelFromSlug = (slug: AdminLevelSlug): RegionLevel => {
  return regionLevels.includes(slug) ? (slug as RegionLevel) : levelSlugs[slug];
};

const slugLevels: Record<string, string> = Object.fromEntries(
  Object.keys(levelSlugs).map((slug) => [levelSlugs[slug], slug]),
);

export const slugFromRegionLevel = (level: RegionLevel): AdminLevelSlug => {
  return slugLevels[level];
};

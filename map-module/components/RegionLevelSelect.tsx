'use client';

import React from 'react';
import { useParams, useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Select } from './Select';
import { regionLevelFromSlug } from '../utils/regionLevelFromSlug';
import { RegionLevel } from '../types';

interface Props {
  mapLevels?: Record<string, string>;
  onChange?: (level: RegionLevel) => void;
}

// Fallback default levels if none provided via props
const DEFAULT_MAP_LEVELS: Record<string, string> = {
  LEVEL_1: 'Counties',
  COUNTRY: 'National',
};

export const RegionLevelSelect: React.FC<Props> = (props) => {
  const { mapLevels = DEFAULT_MAP_LEVELS, onChange } = props;

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Find level slug from path segment (like admin-1 or national)
  const currentLevelSlug = params?.level as string | undefined;
  const defaultValue = currentLevelSlug ? regionLevelFromSlug(currentLevelSlug) : '';

  if (!mapLevels || Object.keys(mapLevels).length < 2) {
    return null;
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = event.currentTarget.value as RegionLevel;

    if (onChange) {
      onChange(selectedLevel);
      return;
    }

    // Default: update URL path level segment dynamically using Next.js router
    if (currentLevelSlug && pathname) {
      const parts = pathname.split('/');
      const index = parts.indexOf(currentLevelSlug);
      if (index !== -1) {
        // Map RegionLevel back to slug (COUNTRY -> national, LEVEL_1 -> admin-1)
        const newSlug = selectedLevel === 'COUNTRY' ? 'national' : selectedLevel === 'LEVEL_1' ? 'admin-1' : 'admin-2';
        parts[index] = newSlug;
        const newPath = parts.join('/');
        router.push(`${newPath}?${searchParams?.toString() ?? ''}`);
      }
    }
  };

  return (
    <Select
      value={defaultValue}
      onChange={handleSelectChange}
      secondary
    >
      {Object.keys(mapLevels).map((option) => (
        <option value={option} key={option}>
          {mapLevels[option]}
        </option>
      ))}
    </Select>
  );
};

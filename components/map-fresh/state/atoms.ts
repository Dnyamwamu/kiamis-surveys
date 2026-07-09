import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// State atoms helper to read/write safely from/to localStorage in client-side Next.js
const safeStorage = <T>(key: string, initialValue: T) => {
  return atomWithStorage<T>(
    key,
    initialValue,
    {
      getItem(k, init) {
        if (typeof window === 'undefined') return init;
        const storedValue = localStorage.getItem(k);
        try {
          return storedValue ? JSON.parse(storedValue) : init;
        } catch {
          return init;
        }
      },
      setItem(k, value) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(k, JSON.stringify(value));
        }
      },
      removeItem(k) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(k);
        }
      },
    }
  );
};

// Map View Settings State
export const mapSettingsState = safeStorage('mapSettings', {
  latestDataVisible: true,
});

// Localization / Language State
export const localizationState = atom({
  languageCode: 'en',
});

// Selected Disaggregations (Urban/Rural and Female/Male filters)
export const selectedDisaggregationState = safeStorage<{
  urbanRural?: string;
  femaleMale?: string;
}>('selectedDisaggregation', {});

// Selected Food System Types (Sub-national County Diagnostics filters)
export const selectedFoodSystemTypesState = atom<string[]>([]);

// Selected Income Classifications (Sub-national County Diagnostics filters)
export const selectedIncomeClassificationsState = atom<string[]>([]);

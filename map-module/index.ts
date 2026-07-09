// Core Decoupled React Components
export { IndicatorMap } from './components/IndicatorMap';
export { DataMap } from './components/DataMap';
export { IndicatorLayout } from './components/IndicatorLayout';
export { IndicatorContextBar } from './components/IndicatorContextBar';
export { RegionLevelSelect } from './components/RegionLevelSelect';
export { ItemSelect } from './components/ItemSelect';
export { IndicatorYearsContainer, useIndicatorYears } from './components/IndicatorYearsContainer';
export { NumericalLegend } from './components/NumericalLegend';
export { OrdinalLegend } from './components/OrdinalLegend';
export { Legend } from './components/Legend';
export { Tooltip } from './components/Tooltip';
export { LoadingOverlay } from './components/LoadingOverlay';
export { Icon } from './components/Icon';
export { LocalizedAttribute } from './components/LocalizedAttribute';

// Decoupled Jotai State Atoms
export {
  mapSettingsState,
  localizationState,
  selectedDisaggregationState,
  selectedFoodSystemTypesState,
  selectedIncomeClassificationsState,
} from './state/atoms';

// Decoupled Helper Utilities
export { formatValue } from './utils/formatValue';
export { regionLevelFromSlug, slugFromRegionLevel } from './utils/regionLevelFromSlug';
export { indicatorColorScale } from './utils/indicatorColorScale';
export { useMousePosition } from './utils/useMousePosition';
export { useAnimationFrameThrottle } from './utils/useAnimationFrameThrottle';
export { useTopology, formatGEOJSON } from './components/topologyData';

// Shared TypeScript Type Definitions
export * from './types';

'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

type YearRange = [number, number];

interface Context {
  minYear: number;
  maxYear: number;
  activeYears: number[];
  selectedYearRange: YearRange;
  setSelectedYearRange: React.Dispatch<React.SetStateAction<YearRange>>;
}

const SelectedYearRangeContext = createContext<Context | undefined>(undefined);

interface Props {
  minYear: number;
  maxYear: number;
  activeYears: number[];
  defaultSelectedYearRange?: YearRange;
  children: ReactNode;
}

export const IndicatorYearsContainer: React.FC<Props> = (props) => {
  const { minYear, maxYear, activeYears, defaultSelectedYearRange, children } =
    props;

  const [selectedYearRange, setSelectedYearRange] = useState<YearRange>(
    defaultSelectedYearRange ?? [maxYear, maxYear],
  );

  const value = useMemo(
    () => ({
      minYear,
      maxYear,
      activeYears,
      selectedYearRange,
      setSelectedYearRange,
    }),
    [minYear, maxYear, activeYears, selectedYearRange, setSelectedYearRange],
  );

  return (
    <SelectedYearRangeContext.Provider value={value}>
      {children}
    </SelectedYearRangeContext.Provider>
  );
};

export const useIndicatorYears = () => {
  const context = useContext(SelectedYearRangeContext);

  if (context == null) {
    throw new Error(
      'useIndicatorYears was called outside of a IndicatorYearsContainer',
    );
  }

  return context;
};

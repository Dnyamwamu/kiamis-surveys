'use client';

import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { localizationState } from '../state/atoms';

interface LocalizedRecord {
  localizations?: {
    localization: { languageCode: string };
  }[];
}

interface Props<T extends LocalizedRecord> {
  object: T;
  attribute: keyof T;
}

export const LocalizedAttribute = <T extends LocalizedRecord>(
  props: Props<T>,
) => {
  const { object, attribute } = props;

  const { languageCode } = useAtomValue(localizationState);

  const value = useMemo(() => {
    const localizedValue = object.localizations?.find(
      (localization) =>
        localization.localization?.languageCode === languageCode,
    );

    return (
      (localizedValue as Record<string, unknown> | undefined)?.[
        attribute as string
      ] ?? object[attribute]
    );
  }, [attribute, languageCode, object]);

  return <>{value as React.ReactNode}</>;
};

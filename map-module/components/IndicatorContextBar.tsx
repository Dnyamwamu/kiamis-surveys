'use client';

import styles from './IndicatorContextBar.module.css';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

import { Indicator, Subsector, RegionLevel, ViewMode } from '../types';
import { Icon } from './Icon';
import { RegionLevelSelect } from './RegionLevelSelect';
import { ItemSelect } from './ItemSelect';

interface Props {
  indicator: Indicator | null;
  subsector: Subsector | null;
  countryId?: number;
  regionLevel?: RegionLevel;
  items?: { id: string; name: string }[];
  onViewChange?: (view: ViewMode) => void;
  onLevelChange?: (level: RegionLevel) => void;
  onItemChange?: (item: string) => void;
  mapLevels?: Record<string, string>;
  hideViewToggles?: boolean;
}

export const IndicatorContextBar: React.FC<Props> = (props) => {
  const {
    indicator,
    subsector,
    items = [],
    onViewChange,
    onLevelChange,
    onItemChange,
    mapLevels,
    hideViewToggles = false,
  } = props;

  const pathname = usePathname();
  // const searchParams = useSearchParams();

  // Infer view from path or query parameters
  const currentView = useMemo(() => {
    if (pathname?.endsWith('/graph')) return 'graph';
    if (pathname?.endsWith('/table')) return 'table';
    return 'map';
  }, [pathname]);

  const handleViewClick = (view: ViewMode, event: React.MouseEvent) => {
    if (onViewChange) {
      event.preventDefault();
      onViewChange(view);
    }
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.noSelectedIndicator]: indicator == null,
      })}
    >
      {indicator != null && subsector != null && !hideViewToggles && (
        <nav className={styles.viewModeNav}>
          <Link
            href="#"
            onClick={(e) => handleViewClick('map', e)}
            className={classNames(styles.viewModeLink, {
              [styles.viewModeLinkActive]: currentView === 'map',
            })}
          >
            <Icon icon="Globe" inline />
            Map View
          </Link>

          <Link
            href="#"
            onClick={(e) => handleViewClick('graph', e)}
            className={classNames(styles.viewModeLink, {
              [styles.viewModeLinkActive]: currentView === 'graph',
            })}
          >
            <Icon icon="Graph" inline />
            Graph View
          </Link>

          <Link
            href="#"
            onClick={(e) => handleViewClick('table', e)}
            className={classNames(styles.viewModeLink, {
              [styles.viewModeLinkActive]: currentView === 'table',
            })}
          >
            <Icon icon="Table" inline />
            Table View
          </Link>
        </nav>
      )}

      <div className={styles.sourceWrapper}>
        <RegionLevelSelect mapLevels={mapLevels} onChange={onLevelChange} />

        {items && items.length > 0 && (
          <ItemSelect items={items} onChange={onItemChange} />
        )}
      </div>
    </div>
  );
};

// Helper useMemo wrapper
import { useMemo } from 'react';

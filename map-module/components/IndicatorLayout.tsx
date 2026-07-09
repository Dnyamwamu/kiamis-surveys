'use client';

import styles from './IndicatorLayout.module.css';

import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Indicator, Subsector } from '../types';
import { LocalizedAttribute } from './LocalizedAttribute';

interface Props {
  indicator: Indicator | null;
  subsector: Subsector | null;
  menu?: ReactNode;
  filters?: ReactNode;
  timeline?: ReactNode;
  content: ReactNode;
  contextBar?: ReactNode;
}

export const IndicatorLayout: React.FC<Props> = (props) => {
  const {
    indicator,
    // subsector,
    menu,
    filters,
    timeline,
    content,
    contextBar,
  } = props;

  // Responsive: If no menu/sidebar provided, run full-width!
  const hasSidebar = menu != null;

  return (
    <section className={styles.container}>
      <div className={styles.contentContainer}>
        <div
          className={classNames(styles.row, {
            [styles.modalMenu]: !hasSidebar,
          })}
          style={{
            gridTemplateColumns: hasSidebar ? undefined : '1fr',
          }}
        >
          {hasSidebar && (
            <div className={styles.menu}>{menu}</div>
          )}

          <div className={styles.main}>
            <div className={styles.header}>
              {indicator != null && (
                <div className={styles.titleBar}>
                  <div className={styles.title}>
                    <h1 className={styles.name}>
                      <LocalizedAttribute object={indicator} attribute="name" />

                      {indicator.unit && (
                        <span className={styles.unit}> ({indicator.unit})</span>
                      )}
                    </h1>
                  </div>
                </div>
              )}

              {(filters || timeline) && (
                <div className={styles.dataFilters}>
                  {filters}
                  {timeline}
                </div>
              )}
            </div>

            <div className={styles.content}>
              {contextBar}
              <div className={styles.contentBody}>{content}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

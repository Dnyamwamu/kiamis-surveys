import styles from './Legend.module.css';
import { ReactNode } from 'react';
import { Indicator } from '../types';

interface Props {
  indicator: Indicator;
  children: ReactNode;
}

const isPresentString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const Legend: React.FC<Props> = (props) => {
  const { indicator, children } = props;

  return (
    <div className={styles.container}>
      <div>
        {isPresentString(indicator.unit) && (
          <div className={styles.unit}>in {indicator.unit}</div>
        )}
      </div>

      <div>{children}</div>

      {indicator.sources && indicator.sources.length > 0 && (
        <div className={styles.sources}>
          Data from:{' '}
          {indicator.sources.map((source, index) => (
            <span key={source.id}>
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  {source.label}
                </a>
              ) : (
                <span>{source.label}</span>
              )}
              {index < indicator.sources.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

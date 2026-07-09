import styles from './NumericalLegend.module.css';
import { formatValue } from '../utils/formatValue';
import { Legend } from './Legend';
import { Indicator } from '../types';

interface Props {
  indicator: Indicator;
  minValue: number | null;
  maxValue: number | null;
  colorScale(value: number): string;
}

export const NumericalLegend: React.FC<Props> = (props) => {
  const { indicator, minValue, maxValue, colorScale } = props;

  const { unit } = indicator;

  const noValue = minValue == null || maxValue == null;
  const singleValue = !noValue && minValue == maxValue;

  return (
    <Legend indicator={indicator}>
      <div className={styles.range}>
        {singleValue && (
          <div className={styles.singleValue}>
            <div
              style={{ background: colorScale(minValue) }}
              className={styles.iconSquare}
            />
            {formatValue(minValue, {
              unit: unit?.length === 1 ? unit : null,
            })}
          </div>
        )}
        {!(noValue || singleValue) && (
          <>
            <div
              className={styles.rangeGradient}
              style={{
                background: `linear-gradient(90deg, ${colorScale(
                  minValue,
                )}, ${colorScale((minValue + maxValue) / 2)}, ${colorScale(
                  maxValue,
                )})`,
              }}
            />{' '}
            <div className={styles.rangeLabels}>
              <div>
                {formatValue(minValue, {
                  unit: unit?.length === 1 ? unit : null,
                })}
              </div>

              <div>
                {formatValue(maxValue, {
                  unit: unit?.length === 1 ? unit : null,
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </Legend>
  );
};

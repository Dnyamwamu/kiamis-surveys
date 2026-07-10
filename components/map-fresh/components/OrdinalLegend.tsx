import styles from './OrdinalLegend.module.css';
import { Legend } from './Legend';
import { Indicator } from '../types';

interface Props {
  indicator: Indicator;
  ordinalValues: { position: number; label: string }[];
  colorScale(value: number | string): string;
}

export const OrdinalLegend: React.FC<Props> = (props) => {
  const { indicator, ordinalValues, colorScale } = props;

  return (
    <Legend indicator={indicator}>
      {ordinalValues.map((ordinalValue) => (
        <div key={ordinalValue.position} className={styles.item}>
          <div
            style={{ backgroundColor: colorScale(ordinalValue.label) }}
            className={styles.icon}
          />
          <div>{ordinalValue.label}</div>
        </div>
      ))}
    </Legend>
  );
};

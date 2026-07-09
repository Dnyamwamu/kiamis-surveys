import styles from './Tooltip.module.css';
import { useMousePosition } from '../utils/useMousePosition';

interface Props {
  color?: string | null;
  children: React.ReactNode;
}

export const Tooltip: React.FC<Props> = (props) => {
  const { color, children } = props;

  const mousePosition = useMousePosition();

  if (!mousePosition || children == null) {
    return null;
  }

  return (
    <div
      className={styles.tooltip}
      style={{
        top: `${mousePosition[1] + 15}px`,
        left: `${mousePosition[0] + 15}px`,
        borderLeft: color != null ? `solid 4px ${color}` : undefined,
      }}
    >
      {children}
    </div>
  );
};

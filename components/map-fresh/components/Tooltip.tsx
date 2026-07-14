import styles from './Tooltip.module.css';
import { useMousePosition } from '../utils/useMousePosition';
import { createPortal } from 'react-dom';

interface Props {
  color?: string | null;
  children: React.ReactNode;
}

export const Tooltip: React.FC<Props> = (props) => {
  const { color, children } = props;

  const mousePosition = useMousePosition();

  if (!mousePosition || children == null || typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className={styles.tooltip}
      style={{
        top: `${mousePosition[1] + 15}px`,
        left: `${mousePosition[0] + 15}px`,
        borderLeft: color != null ? `solid 4px ${color}` : undefined,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

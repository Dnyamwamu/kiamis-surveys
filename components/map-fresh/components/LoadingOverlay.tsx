import styles from './LoadingOverlay.module.css';

interface Props {}

export const LoadingOverlay: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>Loading…</div>
    </div>
  );
};

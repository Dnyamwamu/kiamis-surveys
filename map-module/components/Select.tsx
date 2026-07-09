import styles from './Select.module.css';
import classNames from 'classnames';

type HTMLSelectElementProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

interface Props extends Omit<HTMLSelectElementProps, 'id' | 'className'> {
  secondary?: boolean;
}

export const Select: React.FC<Props> = (props) => {
  const { secondary = false, ...selectProps } = props;

  return (
    <div
      className={classNames(styles.container, {
        [styles.primary]: !secondary,
      })}
    >
      <div className={styles.icon}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
      <select
        className={classNames(styles.select, {
          [styles.primary]: !secondary,
        })}
        {...selectProps}
      />
    </div>
  );
};

// Spinner.tsx
import { FC } from 'react';
import styles from './Spinner.module.scss';


export interface SpinnerProps {
    size?: number | string;
    color?: string;
}


export const Spinner: FC<SpinnerProps> = ({ size = 16, color = 'currentColor' }) => {
    return (
        <svg
            className={styles.spinner}
            width={size}
            height={size}
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                className={styles.path}
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke={color}
                strokeWidth="5"
            />
        </svg>
    );
};


export default Spinner;





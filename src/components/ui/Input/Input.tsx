import styles from './Input.module.css';
import React, {forwardRef} from 'react';

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label ?: string,
}

// используем forwardRef для получения ref из компонента родителя
export const Input = forwardRef<HTMLInputElement, TInputProps>(({label, className, ...props}, ref) => {
     return (
    
        <div className={styles.wrapper}>
            {/* если есть label рендерим его */}
            {label && <label className={styles['wrapper__label']}>{label}</label>}
            <input 
                {...props} 
                ref={ref} 
                className={`${styles['wrapper__input']} ${className ?? ''}`}
            />
        </div>
    
    );
})



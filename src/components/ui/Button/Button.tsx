import styles from './button.module.css';

// в пропсы прокидываем все стандартные атрибуты кнопки
type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({children, ...props}: TButtonProps) => {

    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    )

}
import styles from './button.module.css';

type TButtonVariant = 'primary' | 'danger' | 'success'; 

// в пропсы прокидываем все стандартные атрибуты кнопки
type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: TButtonVariant
};

export const Button = ({children, className, variant = 'primary', ...props}: TButtonProps) => {

    // динамически собираем массив классов
    const buttonClasses = [
        styles.button,
        styles[variant],
        className
        // фильтруем от лишних значений типа undefined, null etc
    ].filter(Boolean).join(' ');


    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    )

}
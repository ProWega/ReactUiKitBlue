import React, { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';
import cls from './Button.module.scss';
import { Spinner } from '../../Spinner';


export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'text' | 'icon' | 'iconOutline';
export type ButtonSize = 'small' | 'medium' | 'large';


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    active?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    error?: boolean;
    loading?: boolean;
}


export const Button: FC<ButtonProps> = ({
                                            variant = 'primary',
                                            size = 'medium',
                                            active = false,
                                            icon,
                                            iconPosition = 'left',
                                            children,
                                            disabled,
                                            error,
                                            className,
                                            loading = false,
                                            ...rest
                                        }) => {
    // Объединяем классы через clsx. Предполагается, что в Button.module.scss прописаны классы
    // .button, .primary, .secondary, .small, .medium, .large, .disabled, .loading и т.д.
    const combinedClassName = clsx(
        cls.button,
        cls[variant],
        cls[size],
        {
            [cls.disabled]: disabled,
            [cls.error]: error,
            [cls.active]: active,
        },
        className
    );


    return (
        <button
            type="button"
            className={combinedClassName}
            disabled={disabled}
            {...rest}
        >
            {/* Иконка слева, если задана */}
            {loading ? (
                <span className={cls.icon}>
                    <Spinner size={14} />
                </span>
            ) : (
                icon && iconPosition === 'left' && (
                    <span className={cls.icon}>
                        {icon}
                    </span>
                )
            )}


            {/* Текст кнопки */}
            {children && (
                <span>{children}</span>
            )}


            {/* Иконка справа, если задана */}
            {icon && iconPosition === 'right' && (
                <span className={cls.icon}>
          {icon}
        </span>
            )}
        </button>
    );
};
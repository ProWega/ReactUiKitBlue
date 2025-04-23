import {ChangeEvent, FC, ReactNode} from "react";
import cls from "./Input.module.scss"
import {Icon} from "@/app/shared/ui/Icon";

export interface InputProps {
    value?: string,
    width?: number,
    onChange?: (value: string) => void,
    showClear?: boolean,
    onClear?: () => void,
    addonLeft?: ReactNode,
    iconName?: string,
    addonRight?: ReactNode,
    label?: string,
    helper?: string,
    placeholder?: string,
    inputIconName?: string,
    disabled?: boolean,
}

export const Input: FC<InputProps> = (
    {
        value,
        onChange,
        showClear,
        onClear,
        addonLeft,
        iconName,
        addonRight,
        label,
        helper,
        placeholder,
        disabled,

    }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={cls.inputContainer}>
            {label && (
                <span className={cls.label}>{label}</span>
            )}
            <div className={cls.inputWrap}>
                {addonLeft && (
                    <div className={cls.addonLeft}>{addonLeft}</div>
                )}
                <div className={cls.inputBox}>
                    {iconName && (
                        <div className={cls.inputIcon}>
                            <Icon name={iconName} width={28} height={28}/>
                        </div>
                    )}
                    <input
                        className={cls.inputElement}
                        value={value}
                        type="text"
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        disabled={disabled}/>
                    <button
                        type="button"
                        className={cls.clearButton}
                        onClick={onClear}
                        disabled={disabled || !onClear}>

                        <div className={cls.clearIcon}>
                            {showClear && onClear && value && (
                                <Icon
                                    name={"close"}
                                    width={8}
                                    height={8}/>
                            )}
                        </div>

                    </button>
                </div>
                {addonRight && (
                    <div className={cls.addonRight}>{addonRight}</div>
                )}
            </div>

            <span className={cls.helper}>{helper}</span>
        </div>
    )
}
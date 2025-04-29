import {FC, ReactNode} from "react";
import clsx from "clsx";
import cls from "./MySelect.module.scss"
import {Icon} from "@/app/shared/ui/Icon";
import {useMySelect} from "@/app/shared/ui/MySelect/hooks/useMySelect";

export type Value = string | number | undefined

export type MySelectVariant = "default" | "status"

export interface Option {
    node: ReactNode,
    value: Value,
    disabled: boolean
}

export interface MySelectProps {
    variant?: MySelectVariant,
    label?: string,
    onChange?: (val: Value) => void,
    options: Option[],
    value: Value,
    defaultValue: Value
    disabled?: boolean,
    noOptionsText: string
    className?: string
}

export const MySelect: FC<MySelectProps> = (
    {
        variant="default",
        label,
        onChange,
        options,
        value,
        defaultValue,
        disabled = false,
        className
    }

) => {


    const {
        containerRef,
        isOpen,
        //open,
        //close,
        toggle,
        selected,
        selectOption
    } = useMySelect(
        {
            options,
            value,
            defaultValue,
            onChange
        }
    )


    const combinedClassname = clsx(
        cls.select,
        className,
        cls[variant],
        {
            [cls.disabled] : disabled
        }
    )
    return (

        <div ref={containerRef} className={`${combinedClassname} bodyRegular14`}>
            <div className={cls.label}>{label}</div>
            <div className={`${cls.selectBox} bodyRegular14`} onClick={toggle}>
                <div className={cls.value}>
                    {options.map((opt: Option) => {
                        if (opt.value === selected) return (<>{opt.node}</>)
                    })}
                </div>
                <div className={cls.arrow} >
                    <Icon name={"arrow_down"} width={16} height={16}/>
                </div>
            </div>


            {options.length > 0 &&
                isOpen ?
                    <div className={cls.dropdownWrap}>
                        <div className={cls.items}>
                            {options.map((opt:Option) => {
                                return (
                                    <div
                                        key={value}
                                        className={`${cls.item} ${opt.value === selected ? cls.selected : ""}`}
                                        onClick={() => selectOption(opt)}
                                    >
                                        <>
                                        {opt.value}
                                        </>
                                        <Icon name={"ok"} width={16} height={16} className={cls.ok}/>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={cls.scroll}>
                            <div className={cls.scrollStick}></div>
                        </div>
                    </div>
                :
                        <></>
            }
        </div>
    )
}
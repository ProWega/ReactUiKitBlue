//MyAutoTag.tsx

import {FC, JSX} from 'react';
import cls from './MyAutoTags.module.scss';
import clsx from "clsx";
import {Icon} from "@/app/shared/ui/Icon";
import {useMyAutoTags} from "@/app/shared/ui/MyAutoTags/hooks/useMyAutoTags";
import {Option} from '../hooks/useMyAutoTags'

export interface MyAutoTagsProps {
    options: Option[];
    value: Option[];
    className?: string;
    onChange: (newValue: Option[]) => void;
}


export const MyAutoTags: FC<MyAutoTagsProps> = (
    {
        options,
        value,
        className = "",
        onChange = (o) => {
        },
    }): JSX.Element => {

    const {
        containerRef,
        isOpen,
        setIsOpen,
        open,
        close,
        toggle,
        inputValue,
        setInputValue,
        handleInputChange,
        filteredOptions,
        handleRemove,
        handleSelect,
    } = useMyAutoTags({options: options, value, onChange});

    const combinedClasses = clsx(
        cls.myAutoTags,
        className
    )


    // const handleInputChange = (text: string) => {
    //     setInputValue(text)
    //     if (!isOpen) open()
    // }


    console.log('rendered with: ', value)

    return (
        <div ref={containerRef} className={`${combinedClasses} ${isOpen ? cls.open : ""}`}>
            <div className={`${cls.selectBox} ${isOpen ? cls.open : ""}`} onClick={toggle}>
                <div className={cls.value}>
                    <div className={`${cls.tagsBox} bodyRegular12`}>
                        {value.map((opt: Option) => (
                            <div key={opt.value} className={cls.tag}>
                                <div className={cls.tagText}>{opt.label}</div>
                                <Icon
                                    className={cls.tagIcon}
                                    name="close"
                                    width={8}
                                    height={8}
                                    onClick={(e) => {
                                        //e.stopPropagation()
                                        console.log("sd;rlgjv")
                                        handleRemove(opt)
                                    }
                                    }
                                />
                            </div>
                        ))}

                        <input type={"text"}
                               className={cls.input}
                               value={inputValue}
                               onChange={e => handleInputChange(e.target.value)}/>
                    </div>
                </div>
                <div className={cls.arrow}>
                    <Icon name={"arrow_down"} width={16} height={16}/>
                </div>
            </div>

            {isOpen && (
                <div className={cls.dropdown}>
                    <ul className={cls.menu}>
                        {filteredOptions.map((opt: Option) => {
                            const selected = value.some(v => v.value === opt.value);
                            return (
                                <li
                                    key={opt.value}
                                    className={`${cls.menuItem} ${selected ? cls.selected : ''}`}
                                    onClick={() => handleSelect(opt)}
                                >
                                    {opt.label}
                                    <Icon name={"ok"} width={16} height={16} className={cls.ok}/>
                                </li>
                            );
                        })}

                    </ul>
                    <div className={cls.scroll}>
                        <div className={cls.scrollStick}></div>
                    </div>
                </div>
            )}


        </div>
    )
}

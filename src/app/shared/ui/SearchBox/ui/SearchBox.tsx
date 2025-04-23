import cls from "./SearchBox.module.scss";
import React, {ChangeEvent, FC} from "react";
import CloseIcon from "../../Icon/ui/icons/close.svg?react";
import SearchIcon from "../../Icon/ui/icons/search.svg?react";

export interface SearchBoxProps {
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    onClear?: () => void;
    placeholder?: string;
    disabled?: boolean;
    showClear?: boolean;
}

export const SearchBox: FC<SearchBoxProps> = (
    {value,
    onChange,
    onSearch,
    onClear,
    placeholder = "Введите текст...",
    disabled,
    showClear}) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>)=> {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=> {
        if (e.key === "Enter" && onSearch && value && value.length >= 1) {
            onSearch(value);
        }
    };


    return (
        <div className={cls.searchBox}>
            <input
            className={cls.input}
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            />
                <button
                    type="button"
                    className={cls.clearButton}
                    onClick={onClear}
                    disabled={disabled || !onClear}>

                        <div className={cls.clearIcon}>
                            {showClear && onClear && value && (
                            <CloseIcon
                                width={8}
                                height={8}/>
                            )}
                        </div>

                </button>
            <button className={cls.searchButton}
                    type="button"
                    onClick={() => value ? onSearch?.(value) : ""}
                    disabled={disabled || !onSearch}>
                <div className={cls.searchIcon}>
                    <SearchIcon width={34} height={38}/>
                </div>
            </button>
        </div>
    )

}
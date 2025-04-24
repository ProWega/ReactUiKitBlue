import React from 'react';
import {Option, useSelect} from '../hooks/useSelect';
import cls from './Select.module.scss';
import {Icon} from "@/app/shared/ui/Icon";


export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    options: Option[];
    multiple?: boolean;
    /** Контролируемое значение */
    value?: string | number | Array<string | number>;
    /** Начальное неконтролируемое значение */
    defaultValue?: string | number | Array<string | number>;
    /** Вызывается при изменении */
    onChange?: (value: string | number | Array<string | number>) => void;
    filterable?: boolean;
    asyncOptions?: (input: string) => Promise<Option[]>;
    placeholder?: string;
    noOptionsText?: string;
    loadingText?: string;
    clearable?: boolean;
    optionRenderer?: (opt: Option, selected: boolean) => React.ReactNode;
    tagRenderer?: (opt: Option, remove: () => void) => React.ReactNode;
    className?: string;
}


export const Select: React.FC<SelectProps> = ({
                                                  options: staticOptions,
                                                  multiple = false,
                                                  value,
                                                  defaultValue,
                                                  onChange,
                                                  filterable = true,
                                                  asyncOptions,
                                                  placeholder = 'Select…',
                                                  noOptionsText = 'No options',
                                                  loadingText = 'Loading…',
                                                  clearable = true,
                                                  optionRenderer,
                                                  tagRenderer,
                                                  className = '',
                                                  ...rest
                                              }) => {
    const {
        containerRef,
        isOpen,
        toggle,
        // inputValue,
        // setInputValue,
        options,
        selected,
        selectOption,
        clear,
        loading,
    } = useSelect({
        options: staticOptions,
        multiple,
        value,
        defaultValue,
        onChange,
        filterable,
        asyncOptions,
    });


    return (
        <div
            ref={containerRef}
            className={`${cls.selectContainer} ${className}`}
            {...rest}
        >
            <div className={cls.selectControl} onClick={toggle}>
                {multiple ? (
                    <div className={cls.selectTags}>
                        {Array.isArray(selected) && selected.length > 0 ? (
                            selected.map((v) => {
                                const opt = options.find((o) => o.value === v);
                                if (!opt) return null;
                                const remove = () => selectOption(opt);
                                return tagRenderer ? (
                                    <React.Fragment key={v}>
                                        {tagRenderer(opt, remove)}
                                    </React.Fragment>
                                ) : (
                                    <span key={v} className={cls.selectTag}>
                    {opt.label}
                                        <button
                                            className={cls.tagRemove}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                remove();
                                            }}
                                        >
                      <Icon name={"close"} width={16} height={16}/>
                    </button>
                  </span>
                                );
                            })
                        ) : (
                            <span className={cls.selectPlaceholder}>{placeholder}</span>
                        )}
                    </div>
                ) : selected == null ? (
                    <span className={cls.selectPlaceholder}>{placeholder}</span>
                ) : (
                    <span className={cls.selectValue}>
            {(() => {
                const selOpt = options.find((o) => o.value === selected);
                return selOpt ? selOpt.label : <span className={cls.selectPlaceholder}>{placeholder}</span>;
            })()}
          </span>
                )}


                {clearable &&
                    ((multiple && Array.isArray(selected) && selected.length > 0) ||
                        (!multiple && selected != null)) && (
                        <button
                            className={cls.selectClearBtn}
                            onClick={(e) => {
                                e.stopPropagation();
                                clear();
                            }}
                        >
                            <Icon name={"close"} width={14} height={14}/>
                        </button>
                    )}


                <span
                    className={`${cls.selectArrow} ${
                        isOpen ? cls.open : ''
                    }`}
                >
                    
          <Icon className={cls.arrow} name={"arrow_down"} width={16} height={16}/>

        </span>
            </div>


            {isOpen && (
                <div className={cls.selectDropdown}>
                    {/*{filterable && (*/}
                    {/*    <input*/}
                    {/*        className={cls.selectInput}*/}
                    {/*        value={inputValue}*/}
                    {/*        onChange={(e) => setInputValue(e.target.value)}*/}
                    {/*        autoFocus*/}
                    {/*    />*/}
                    {/*)}*/}
                    {loading ? (
                        <div className={cls.selectLoading}>{loadingText}</div>
                    ) : options.length === 0 ? (
                        <div className={cls.selectEmpty}>{noOptionsText}</div>
                    ) : (
                        options.map((opt) => {
                            const sel = multiple
                                ? Array.isArray(selected) && selected.includes(opt.value)
                                : selected === opt.value;
                            return (
                                <div
                                    key={opt.value}
                                    className={`${cls.selectOption} ${
                                        sel ? cls.selected : ''
                                    } ${opt.disabled ? cls.disabled : ''}`}
                                    onClick={() => selectOption(opt)}
                                >
                                    {optionRenderer ? optionRenderer(opt, !!sel) : opt.label}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};


export default Select;





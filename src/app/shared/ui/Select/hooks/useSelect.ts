import React, { useState, useEffect, useRef, RefObject } from 'react';


export type Value = string | number;


export interface Option {
    value: Value;
    label: React.ReactNode;
    disabled?: boolean;
}


export interface UseSelectProps {
    options: Option[];
    multiple?: boolean;
    value?: Value | Value[];
    defaultValue?: Value | Value[];
    onChange?: (value: Value | Value[]) => void;
    /** Показывать инпут для фильтрации */
    filterable?: boolean;
    /** Асинхронная подгрузка вместо статических options */
    asyncOptions?: (input: string) => Promise<Option[]>;
}


export interface UseSelectReturn {
    containerRef: RefObject<HTMLDivElement | null>;
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    inputValue: string;
    setInputValue: (v: string) => void;
    options: Option[];
    selected: Value | Value[] | undefined;
    selectOption: (opt: Option) => void;
    clear: () => void;
    loading: boolean;
}


export function useSelect(props: UseSelectProps): UseSelectReturn {
    const {
        options: staticOptions,
        asyncOptions,
        multiple = false,
        value: controlledValue,
        defaultValue,
        onChange,
        filterable = true,
    } = props;


    const isControlled = controlledValue !== undefined;


    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [options, setOptions] = useState<Option[]>(staticOptions);
    const [loading, setLoading] = useState<boolean>(false);


    const [innerSelected, setInnerSelected] = useState<
        Value | Value[] | undefined
    >(
        isControlled
            ? controlledValue
            : defaultValue !== undefined
                ? defaultValue
                : multiple
                    ? []
                    : undefined
    );


    // синхронизируем контролируемое значение
    useEffect(() => {
        if (isControlled) {
            setInnerSelected(controlledValue);
        }
    }, [controlledValue, isControlled]);


    // фильтрация или async‑загрузка
    useEffect(() => {
        if (asyncOptions) {
            setLoading(true);
            asyncOptions(inputValue)
                .then(opts => setOptions(opts))
                .finally(() => setLoading(false));
        } else if (filterable) {
            setOptions(
                staticOptions.filter(o => {
                    const s = o.label != null ? String(o.label) : '';
                    return s.toLowerCase().includes(inputValue.toLowerCase());
                })
            );
        } else {
            setOptions(staticOptions);
        }
    }, [inputValue, staticOptions, asyncOptions, filterable]);


    const selectOption = (opt: Option): void => {
        if (opt.disabled) return;
        let next: Value | Value[];
        if (multiple) {
            const arr = Array.isArray(innerSelected) ? [...innerSelected] : [];
            const idx = arr.indexOf(opt.value);
            if (idx >= 0) arr.splice(idx, 1);
            else arr.push(opt.value);
            next = arr;
        } else {
            next = opt.value;
            setIsOpen(false);
        }
        if (!isControlled) setInnerSelected(next);
        onChange?.(next);
        setInputValue('');
    };


    const clear = (): void => {
        const empty = multiple ? [] : undefined;
        if (!isControlled) setInnerSelected(empty);
        onChange?.(empty as Value | Value[]);
    };


    const open = (): void => setIsOpen(true);
    const close = (): void => setIsOpen(false);
    const toggle = (): void => setIsOpen(v => !v);


    // клик вне — закрыть
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const h = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                close();
            }
        };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);


    return {
        containerRef,
        isOpen,
        open,
        close,
        toggle,
        inputValue,
        setInputValue,
        options,
        selected: innerSelected,
        selectOption,
        clear,
        loading,
    };
}





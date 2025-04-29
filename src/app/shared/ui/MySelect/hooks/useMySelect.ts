// hooks/useMySelect.ts


import { RefObject, useEffect, useRef, useState } from "react";
import { Option, Value } from "@/app/shared/ui/MySelect/ui/MySelect";


export interface UseMySelectProps {
    options: Option[];
    value?: Value;
    defaultValue?: Value;
    onChange?: (value: Value) => void;
}


export interface UseMySelectReturn {
    /** Тут может быть HTMLDivElement или null */
    containerRef: RefObject<HTMLDivElement | null>;
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    selected: Value | undefined;
    selectOption: (opt: Option) => void;
}


export function useMySelect(props: UseMySelectProps): UseMySelectReturn {
    const { value: controlValue, defaultValue, onChange } = props;
    const isControl = controlValue !== undefined;


    const [isOpen, setIsOpen] = useState(false);
    const [innerSelected, setInnerSelected] = useState<Value>(
        isControl ? controlValue! : defaultValue!
    );


    // При контролируемом режиме следим за внешним value
    useEffect(() => {
        if (isControl) {
            setInnerSelected(controlValue);
        }
    }, [controlValue, isControl]);


    const selectOption = (opt: Option) => {
        if (opt.disabled) return;
        if (!isControl) setInnerSelected(opt.value);
        setIsOpen(false);
        onChange?.(opt.value);
    };


    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen(v => !v);


    // здесь useRef с nullable initial
    const containerRef = useRef<HTMLDivElement | null>(null);


    // Click-outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                close();
            }
        };


        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef]);


    return {
        containerRef,
        isOpen,
        open,
        close,
        toggle,
        selected: innerSelected,
        selectOption,
    };
}





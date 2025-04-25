import {Option, Value} from "@/app/shared/ui/MySelect/ui/MySelect";
import {RefObject, useEffect, useRef, useState} from "react";


export interface UseMySelectProps {
    options: Option[];
    value?: Value
    defaultValue?: Value;
    onChange?: (value: Value) => void;
}

export interface UseMySelectReturn {
    containerRef: RefObject<HTMLDivElement | null>;
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    selected: Value | undefined;
    selectOption: (opt: Option) => void;
}

export function useMySelect(props: UseMySelectProps) : UseMySelectReturn {
    const {
        value: controlValue,
        defaultValue,
        onChange
    } = props

    const isControl = controlValue !== undefined;

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [innerSelected, setInnerSelected] = useState<Value | undefined>(
        isControl ? controlValue : defaultValue
    )

    useEffect(() => {
        if (isControl) {
            setInnerSelected(controlValue)
        }

    }, [controlValue, isControl]);

    const selectOption = (opt: Option) => {
        if (opt.disabled) return;
        if (!isControl) setInnerSelected(opt.value);
        setIsOpen(false)
        onChange?.(opt.value)
    }

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
        selected: innerSelected,
        selectOption
    };
}
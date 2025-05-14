//useMyAutoTag

import {RefObject, useEffect, useRef, useState} from "react";

export interface Option {
    label: string;
    value: string;
}

export interface useMyAutoTagsProps {
    options: Option[];
    value: Option[];
    onChange: (value: Option[]) => void;
}

export interface UseMyAutoTagsReturn {
    containerRef: RefObject<HTMLDivElement | null>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    open: () => void;
    close: () => void;
    toggle: () => void;
    inputValue: string;
    setInputValue: (value: string) => void;
    handleInputChange: (value: string) => void;
    filteredOptions: Option[];
    handleRemove: (tag: Option) => void;
    handleSelect: (value: Option) => void;
}

export function useMyAutoTags(props: {
    options: Option[];
    value: Option[];
    onChange: (o) => void
}): UseMyAutoTagsReturn {
    const {options, value, onChange} = props;
    const [isOpen, setIsOpen] = useState(false)
    const [hiddenTagsCount, setHiddenTagsCount] = useState(0);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen(v => !v);

    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (text: string) => {
        setInputValue(text)
        if (!isOpen) open()
    }

    // Фильтруем по введённому тексту
    const filteredOptions = options
        .filter(opt => opt.label.toLowerCase().includes(inputValue.toLowerCase()));

    // здесь useRef с nullable initial
    const containerRef = useRef<HTMLDivElement | null>(null);
    const tagsRef = useRef<HTMLDivElement | null>(null); // Реф для контейнера с тегами

    // Функция для точного измерения ширины элемента с учетом отступов и границ
    const getElementWidth = (element: HTMLElement | null) => {
        if (element) {
            const {width, left} = element.getBoundingClientRect();
            return width + left;
        }
        return 0;
    };

    // Измеряем размер контейнера с тегами и вычисляем, сколько тегов не помещаются
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (tagsRef.current && containerRef.current) {
                const tagsWidth = getElementWidth(tagsRef.current);
                const containerWidth = getElementWidth(containerRef.current);


                // Проверяем, сколько тегов не помещается в контейнер
                const totalWidth = tagsWidth;
                if (totalWidth > containerWidth) {
                    const visibleTagsWidth = containerWidth - 50; // учитываем ширину стрелки и input
                    const visibleTags = value.slice(0, Math.floor(visibleTagsWidth / 70)); // 70 - предполагаемая ширина одного тега
                    const remainingTags = value.length - visibleTags.length;
                    setHiddenTagsCount(remainingTags);
                } else {
                    setHiddenTagsCount(0);
                }
            }
        });


        // Наблюдаем за изменениями в контейнере
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }


        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, [value]);


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


    // Удаление тега
    const handleRemove = (tag: Option) => {
        const newValue = value.filter(v => v.value !== tag.value);
        onChange(newValue);
    }


// Добавление тега
    const handleSelect = (opt: Option) => {
        const alreadySelected = value.some(v => v.value === opt.value);
        if (!alreadySelected) {
            onChange([...value, opt]);
        }
        setInputValue("");  // очищаем поле ввода
        close();            // закрываем список
    }

    return {
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
        handleSelect
    }
}
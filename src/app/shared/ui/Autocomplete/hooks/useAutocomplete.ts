// hooks/useAutocomplete.ts


import { useState, useEffect, RefObject } from 'react'


export interface OptionType {
    label: string
    value: string
}


export interface UseAutocompleteProps<
    T extends OptionType,
    E extends HTMLElement = HTMLElement
> {
    options: T[]
    value: T[]
    onChange: (value: T[]) => void
    /** RefObject<E> — ваш контейнерный элемент (div, ul и т.п.) */
    containerRef: RefObject<E>
}


/**
 * Хук возвращает всё необходимое для контролируемого мультиселект-автокомплита.
 *
 * @param options — полный список опций
 * @param value — текущий массив выбранных опций
 * @param onChange — колбэк при изменении выбранных опций
 * @param containerRef — ref контейнера для обработки кликов вне
 */
export function useAutocomplete<
    T extends OptionType,
    E extends HTMLElement = HTMLElement
>({
      options,
      value,
      onChange,
      containerRef,
  }: UseAutocompleteProps<T, E>) {
    const [inputValue, setInputValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)


    // Фильтруем по введённому тексту
    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase())
    )


    // Поддерживаем корректный highlightedIndex
    useEffect(() => {
        if (filteredOptions.length === 0) {
            setHighlightedIndex(-1)
        } else if (highlightedIndex >= filteredOptions.length) {
            setHighlightedIndex(0)
        }
    }, [filteredOptions, highlightedIndex])


    const openMenu = () => setIsOpen(true)
    // Прячем меню
    const closeMenu = () => setIsOpen(false)


    const handleInputChange = (text: string) => {
        setInputValue(text)
        if (!isOpen) openMenu()
    }


    const handleOptionSelect = (option: T) => {
        const exists = value.some(v => v.value === option.value)
        const next = exists
            ? value.filter(v => v.value !== option.value)
            : [...value, option]
        onChange(next)
        setInputValue('')
    }


    const handleTagRemove = (option: T) => {
        onChange(value.filter(v => v.value !== option.value))
    }


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                if (!isOpen) openMenu()
                else
                    setHighlightedIndex(idx =>
                        idx < filteredOptions.length - 1 ? idx + 1 : 0
                    )
                break


            case 'ArrowUp':
                e.preventDefault()
                if (!isOpen) openMenu()
                else
                    setHighlightedIndex(idx =>
                        idx > 0 ? idx - 1 : filteredOptions.length - 1
                    )
                break


            case 'Enter':
                e.preventDefault()
                if (isOpen && highlightedIndex >= 0) {
                    handleOptionSelect(filteredOptions[highlightedIndex])
                }
                break


            case 'Escape':
                closeMenu()
                break


            case 'Backspace':
                // при пустом инпуте удаляем последний тег
                if (inputValue === '' && value.length > 0) {
                    onChange(value.slice(0, value.length - 1))
                }
                break


            default:
                break
        }
    }


    // Закрытие меню при клике вне контейнера
    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                closeMenu()
            }
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => {
            document.removeEventListener('mousedown', onClickOutside)
        }
    }, [containerRef])


    return {
        inputValue,
        isOpen,
        filteredOptions,
        highlightedIndex,
        handleInputChange,
        handleOptionSelect,
        handleTagRemove,
        handleInputKeyDown: handleKeyDown,
        openMenu,
    }
}





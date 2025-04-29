// ui/Autocomplete.tsx
import React, { useRef } from 'react'
import styles from './Autocomplete.module.scss'
import { useAutocomplete, OptionType } from '../hooks/useAutocomplete'


export interface AutocompleteProps {
    options: OptionType[]
    value: OptionType[]
    onChange: (value: OptionType[]) => void
    placeholder?: string
    maxTagCount?: number
    id?: string
    className?: string
}


export const Autocomplete: React.FC<AutocompleteProps> = ({
                                                       options,
                                                       value,
                                                       onChange,
                                                       placeholder = '',
                                                       maxTagCount = 2,
                                                       id,
                                                       className = '',
                                                   }) => {
    const containerRef = useRef<HTMLDivElement>(null!)


    const {
        inputValue,
        isOpen,
        filteredOptions,
        highlightedIndex,
        handleInputChange,
        handleInputKeyDown,
        handleOptionSelect,
        handleTagRemove,
        openMenu,
        // closeMenu  ← удалили, он не используется
    } = useAutocomplete<OptionType, HTMLDivElement>({
        options,
        value,
        onChange,
        containerRef,
    })


    return (
        <div
            id={id}
            ref={containerRef}
            className={`${styles.autocomplete} ${
                isOpen ? styles['autocomplete--focused'] : ''
            } ${className}`}
        >
            {value.length > 0 && (
                <div className={styles.autocomplete__tags}>
                    {value.slice(0, maxTagCount).map(item => (
                        <span key={item.value} className={styles.autocomplete__tag}>
              {item.label}
                            <button
                                type="button"
                                className={styles.autocomplete__tagRemove}
                                onClick={() => handleTagRemove(item)}
                                aria-label={`Удалить ${item.label}`}
                            >
                ×
              </button>
            </span>
                    ))}
                    {value.length > maxTagCount && (
                        <span
                            className={styles.autocomplete__tag}
                            title={value.map(v => v.label).join(', ')}
                        >
              +{value.length - maxTagCount}
            </span>
                    )}
                </div>
            )}


            <input
                className={styles.autocomplete__input}
                type="text"
                value={inputValue}
                onChange={e => handleInputChange(e.target.value)}
                onKeyDown={handleInputKeyDown}
                onFocus={openMenu}
                placeholder={placeholder}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-autocomplete="list"
            />


            {isOpen && filteredOptions.length > 0 && (
                <ul className={styles.autocomplete__menu} role="listbox">
                    {filteredOptions.map((opt, i) => {
                        const selected = value.some(v => v.value === opt.value)
                        const highlighted = i === highlightedIndex
                        return (
                            <li
                                key={opt.value}
                                role="option"
                                aria-selected={selected}
                                className={`${styles.autocomplete__option} ${
                                    highlighted
                                        ? styles['autocomplete__option--highlighted']
                                        : ''
                                }`}
                                onMouseDown={e => {
                                    e.preventDefault()
                                    handleOptionSelect(opt)
                                }}
                            >
                                <span>{opt.label}</span>
                                {selected && <span>✓</span>}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}


export default Autocomplete





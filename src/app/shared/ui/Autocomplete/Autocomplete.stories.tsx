// Autocomplete.stories.tsx


import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Autocomplete, { AutocompleteProps } from './ui/Autocomplete'
import { OptionType } from './hooks/useAutocomplete'


const OPTIONS: OptionType[] = [
    { label: 'Игрок', value: 'player' },
    { label: 'Администратор', value: 'admin' },
    { label: 'Тренер', value: 'coach' },
    { label: 'Менеджер', value: 'manager' },
    { label: 'Судья', value: 'referee' },
    { label: 'Врач', value: 'doctor' },
    { label: 'Физиотерапевт', value: 'therapist' },
    { label: 'Спонсор', value: 'sponsor' },
]


const meta: Meta<typeof Autocomplete> = {
    title: 'UI/Autocomplete',
    component: Autocomplete,
    tags: ['autodocs'],
}


export default meta
type Story = StoryObj<typeof Autocomplete>


/**
 * Функция-рендер без аннотации React.FC.
 * Здесь можно использовать React Hooks — ESLint это не поругает.
 */
function DefaultTemplate(args: AutocompleteProps) {
    const [selected, setSelected] = React.useState<OptionType[]>([])
    return (
        <Autocomplete
            {...args}
            options={OPTIONS}
            value={selected}
            onChange={setSelected}
        />
    )
}


export const Default: Story = {
    args: {
        placeholder: 'Выберите роли участников',
        maxTagCount: 2,
    },
    render: DefaultTemplate,
}


/**
 * То же для примера с предвыбранными опциями
 */
function PreselectedTemplate(args: AutocompleteProps) {
    const [selected, setSelected] = React.useState<OptionType[]>(OPTIONS.slice(0, 4))
    return (
        <Autocomplete
            {...args}
            options={OPTIONS}
            value={selected}
            onChange={setSelected}
        />
    )
}


export const Preselected: Story = {
    args: {
        placeholder: 'Роль участников (предвыбрано)',
        maxTagCount: 2,
    },
    render: PreselectedTemplate,
}





// src/components/Select/Select.stories.tsx
import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Select, { SelectProps } from './ui/Select';
import type { Option, Value } from './hooks/useSelect';


const sampleOptions: Option[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date', disabled: true },
];


const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
    parameters: { controls: { expanded: true } },
    argTypes: {
        multiple: { control: 'boolean' },
        filterable: { control: 'boolean' },
        clearable: { control: 'boolean' },
    },
};
export default meta;


const Template: StoryFn<SelectProps> = (args) => {
    // Тип состояния зависит от multiple
    const initial = args.defaultValue ?? (args.multiple ? [] : undefined);
    const [value, setValue] = useState<Value | Value[] | undefined>(initial);


    return (
        <Select
            {...args}
            value={value}
            onChange={(v) => setValue(v)}
        />
    );
};


export const Single = Template.bind({});
Single.args = {
    options: sampleOptions,
    multiple: false,
    filterable: true,
    clearable: true,
    placeholder: 'Select a fruit…',
};


export const Multiple = Template.bind({});
Multiple.args = {
    options: sampleOptions,
    multiple: true,
    filterable: true,
    clearable: true,
    placeholder: 'Select fruits…',
    defaultValue: ['banana', 'cherry'],
};


export const Async = Template.bind({});
Async.args = {
    options: [],
    multiple: false,
    filterable: true,
    clearable: true,
    placeholder: 'Type to search…',
    asyncOptions: async (input: string): Promise<Option[]> => {
        await new Promise((r) => setTimeout(r, 500));
        return sampleOptions.filter((o) =>
            String(o.label).toLowerCase().includes(input.toLowerCase())
        );
    },
    noOptionsText: 'Nothing found',
    loadingText: 'Searching…',
};





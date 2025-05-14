import type {Meta, StoryObj} from '@storybook/react';
import {MyAutoTags, MyAutoTagsProps} from './ui/MyAutoTags';
import React from "react";


const meta: Meta<typeof MyAutoTags> = {
    title: 'Component/MyAutoTags',
    component: MyAutoTags,
    argTypes: {},
    tags: ['autodocs'],
};

const exampleSeleted = [
    {
        label: "Игрок",
        value: "Игрок",
    },
    {
        label: "Администратор",
        value: "Администратор",
    },]

const exampleOptions = [
    {
        label: "Тренер",
        value: "Тренер",
    },
    {
        label: "Игрок",
        value: "Игрок",
    },
    {
        label: "Администратор",
        value: "Администратор",
    },
    {
        label: "Менеджер",
        value: "Менеджер",
    },
]
export default meta;
type Story = StoryObj<typeof MyAutoTags>;


function DefaultTemplate(args: MyAutoTagsProps) {
    const [selected, setSelected] = React.useState(exampleSeleted)
    return (
        <MyAutoTags options={exampleOptions} value={selected} onChange={setSelected}/>
    )
}


export const Default: Story = {
    args: {},
    render: DefaultTemplate,
}


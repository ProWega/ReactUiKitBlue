import type {Meta, StoryFn} from '@storybook/react';
import {MySelect, MySelectProps, Value} from './ui/MySelect';

import {useState} from "react";
import {StatusTag} from "@/app/shared/ui/StatusTag";



const meta: Meta<typeof MySelect> = {
    title: 'Component/MySelect',
    component: MySelect,
    tags: ['autodocs'],
};


export default meta;


const Template: StoryFn<MySelectProps> = (args) => {
    // Тип состояния зависит от multiple
    const [value, setValue] = useState<Value | undefined>();
    return (
        <MySelect
            {...args}
            value={value}
            onChange={(v) => setValue(v)}
        />
    );
};

export const Single = Template.bind({});
Single.args = {
    options: [
        {
            node: "Lucy",
            value: 'Lucy',
            disabled: false
        },
        {
            node: "Илья",
            value: 'Илья',
            disabled: false
        },
        {
            node: "Дмитрий",
            value: 'Дмитрий',
            disabled: false
        },
        {
            node: "Леонид",
            value: 'Леонид',
            disabled: false
        },
    ],
    defaultValue: "Леонид"
};

export const Status = Template.bind({});
Status.args = {
    variant: "status",
    options: [
        {
            node: <StatusTag variant={"active"}/>,
            value: "Активный",
            disabled: false
        },
        {
            node: <StatusTag variant={"moderation"}/>,
            value: "На модерации",
            disabled: false
        },
        {
            node: <StatusTag variant={"blocked"}/>,
            value: "Заблокирован",
            disabled: false
        },
    ],
    defaultValue: "Активный"
}
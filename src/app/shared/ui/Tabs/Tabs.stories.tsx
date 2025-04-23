import { Meta, StoryObj} from '@storybook/react'
import {Tabs} from "./ui/Tabs";
import {useState} from "react";

const meta: Meta<typeof Tabs> = {
    title: "Component/Tabs",
    component: Tabs,
    argTypes: {
        tabs: {control: "object"},
        size: {
            control: "inline-radio",
            options: ["small", "medium", "large"],
        },
    }
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    render: (args) => {
        const [selectedIndex, setSelectedIndex] = useState(0)
        const tabs = args.tabs || [
            {label: "Tab 1"},
            {label: "Tab 2"},
            {label: "Tab 3"},
        ]
        return (
            <Tabs tabs={tabs} selectedIndex={selectedIndex} onSelect={setSelectedIndex}/>
        )

    }
};

export const NoOneSelected: Story = {
    render: (args) => {
        const [selectedIndex, setSelectedIndex] = useState(-1)
        const tabs = args.tabs || [
            {label: "Tab 1"},
            {label: "Tab 2"},
            {label: "Tab 3"},
        ]
        return (
            <Tabs tabs={tabs} selectedIndex={selectedIndex} onSelect={setSelectedIndex}/>
        )

    }
};
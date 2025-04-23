import { Meta, StoryObj} from '@storybook/react'
import {Tab} from "./ui/Tab";

const meta: Meta<typeof Tab> = {
    title: "Component/Tab",
    component: Tab,
    argTypes: {
        onClick: {action: "clicked"},
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
    args: {
        label: "Tab1",
        selected: false,
        disabled: false,
        size: "medium",
    },
};

export const Selected: Story = {
    args: {
        label: "Tab1",
        selected: true,
        disabled: false,
        size: "medium",
    }
}

export const Disabled: Story = {
    args: {
        label: "Tab1",
        selected: false,
        disabled: true,
        size: "medium",
    }
}

export const Small: Story = {
    args: {
        label: "Tab1",
        size: "small",
    }
}

export const Large: Story = {
    args: {
        label: "Tab1",
        size: "large",
    }
}
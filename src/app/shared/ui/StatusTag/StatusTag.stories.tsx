import type {Meta, StoryObj} from "@storybook/react";
import {StatusTag} from "@/app/shared/ui/StatusTag";

const meta: Meta<typeof StatusTag> = {
    title: 'Components/StatusTag',
    component: StatusTag,
    argTypes: {
        variant: {
            control: 'select',
            options: ['active', 'moderation', 'blocked',],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
    },
    tags: ['autodocs'],
};


export default meta;
type Story = StoryObj<typeof StatusTag>;

export const Active: Story = {
    args: {
        variant: "active",
        size: 'medium',
    }
}
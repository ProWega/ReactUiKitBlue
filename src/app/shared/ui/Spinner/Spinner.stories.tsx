import { Meta, StoryObj} from '@storybook/react'
import {Spinner} from "./ui/Spinner";

const meta: Meta<typeof Spinner> = {
    title: "Component/Spinner",
    component: Spinner,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const DefaultSpinner: Story = {
    args: {
        size: 24,
    },
}
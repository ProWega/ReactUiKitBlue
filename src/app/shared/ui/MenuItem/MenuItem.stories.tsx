import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './ui/MenuItem';

const meta: Meta<typeof MenuItem> = {
    title: 'Component/MenuItem',
    component: MenuItem,
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'active', 'disabled'],
        },
        onClick: { action: 'clicked' },
    },
    tags: ['autodocs']
};


export default meta;
type Story = StoryObj<typeof MenuItem>;


export const Default: Story = {
    args: {
        icon: "home",
        label: 'Составы',
        variant: 'default',
    },
};


export const Active: Story = {
    args: {
        icon: "home",
        label: 'Составы',
        variant: 'active',
    },
};


export const Disabled: Story = {
    args: {
        icon: "home",
        label: 'Составы',
        variant: 'disabled',
    },
};


export const WithSubItems: Story = {
    args: {
        icon: "home",
        label: 'Составы',
        variant: 'default',
        subItems: [
            { label: 'Команды и составы', onClick: () => alert('Clicked 1') },
            { label: 'Команды и составы', onClick: () => alert('Clicked 2') },
        ],
        defaultOpen: true,
    },
};







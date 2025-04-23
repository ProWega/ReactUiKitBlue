import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './ui/Button';
import { Icon } from '../Icon';


const meta: Meta<typeof Button> = {
    title: 'Component/Button',
    component: Button,
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'link', 'text', 'icon', 'iconOutline',],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        iconPosition: {
            control: 'inline-radio',
            options: ['left', 'right'],
        },
        onClick: { action: 'clicked' },
    },
    tags: ['autodocs'],
};


export default meta;
type Story = StoryObj<typeof Button>;


export const Primary: Story = {
    args: {
        variant: 'primary',
        size: 'medium',
        children: 'Button Title',
        icon: <Icon name="search_white" width={14} height={14} />,
        iconPosition: 'left',
        disabled: false,
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        size: 'medium',
        children: 'Button Title',
        disabled: false,
    },
};


export const WithIcon: Story = {
    args: {
        variant: 'primary',
        size: 'medium',
        children: 'Search',
        icon: <Icon name="search_white" width={14} height={14} />,
        iconPosition: 'left',
        disabled: false,
    },
};

export const Link: Story = {
    args: {
        variant: 'link',
        size: 'medium',
        children: 'Button Title',
        disabled: false,
        active: false,
        error: false,
    },
};


export const IconOnly: Story = {
    args: {
        variant: 'icon',
        size: 'medium',
        icon: <Icon name="search_white" width={14} height={14} />,
        disabled: false,
    },
};

export const IconOutline: Story = {
    args: {
        variant: 'iconOutline',
        size: 'medium',
        icon: <Icon name="search_white" width={14} height={14} />,
        disabled: false,
    },
};
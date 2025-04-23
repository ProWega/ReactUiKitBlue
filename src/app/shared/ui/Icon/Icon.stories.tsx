// Icon.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './ui/Icon';
import icons from "@/app/shared/ui/Icon/ui/IconRegistry";

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    argTypes: {
        name: {
            control: { type: 'radio' },
            options: ['close', 'search'], // предполагается, что у вас есть иконки 'close' и 'search'
        },
        width: {
            control: { type: 'text' },
            description: 'Ширина иконки (например, "24" или "24px")',
        },
        height: {
            control: { type: 'text' },
            description: 'Высота иконки (например, "24" или "24px")',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const CloseIcon: Story = {
    args: {
        name: 'close',
        width: '24',  // можно передавать и как число, но здесь удобнее задать как строку
        height: '24',
    },
};

export const SearchIcon: Story = {
    args: {
        name: 'search',
        width: '32',
        height: '32',
    },
};

export const ColorIcon: Story = {
    args: {
        name: 'search_white',
        width: '32',
        height: '32',
        fill: 'white',
    },
};

export const AllIcons: Story = {
    render: () => {
        return (
            <div style={{ padding: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Icon Name</th>
                        <th style={{ textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Icon</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(icons).map(([name, IconComponent]) => (
                        <tr key={name}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{name}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                <IconComponent width={24} height={24} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    },
};

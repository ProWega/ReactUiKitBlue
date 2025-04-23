import type { Meta, StoryObj } from '@storybook/react';
import icons from './ui/IconRegistry';


const meta: Meta = {
    title: 'Component/AllIcons',
    parameters: {
        layout: 'fullscreen',
    },
};


export default meta;
type Story = StoryObj;


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
                                <IconComponent width={24} height={24}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    },
};





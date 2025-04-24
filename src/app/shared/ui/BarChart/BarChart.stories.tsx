import type { Meta, StoryObj } from '@storybook/react'
import { BarChart, type BarChartProps } from './ui/BarChart'


const labels = [
    'Янв.', 'Фев.', 'Мар.', 'Апр.', 'Май', 'Июн.',
    'Июл.', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'
]


const simpleData = [25, 40, 95, 56, 75, 45, 78, 81, 38, 76, 73, 84]
const greyData   = [0, 0, 0, 58, 0, 0, 0, 0, 0, 0, 0, 0]
//const ctxData    = [25, 40, 95, 56, 75, 45, 78, 81, 38, 76, 73, 84]


const meta: Meta<typeof BarChart> = {
    title: 'Components/BarChart',
    component: BarChart,
    parameters: { layout: 'padded' },
    argTypes: {
        id: { control: false },
    },
}
export default meta
type Story = StoryObj<BarChartProps>


export const Simple: Story = {
    args: {
        labels,
        datasets: [
            {
                label: 'Процент',
                data: simpleData,
                backgroundColor: 'rgba(255,159,64,1)',
                borderRadius: 4,
                barThickness: 20,
            },
        ],
    },
}


export const Grouped: Story = {
    args: {
        labels,
        datasets: [
            {
                label: 'Основная',
                data: simpleData,
                backgroundColor: 'rgba(255,159,64,1)',
                borderRadius: 4,
            },
            {
                label: 'Доп. серия',
                data: greyData,
                backgroundColor: 'rgba(75,85,99,1)',
                borderRadius: 4,
            },
        ],
        options: {
            scales: {
                x: { stacked: false },
                y: { stacked: false },
            },
        },
    },
}


export const Stacked: Story = {
    args: {
        labels,
        datasets: [
            {
                label: 'Состав A',
                data: simpleData,
                backgroundColor: 'rgba(255,159,64,1)',
                stack: 'stack1',
            },
            {
                label: 'Состав B',
                data: [5, 10, 20, 0, 10, 5, 12, 9, 3, 14, 12, 8],
                backgroundColor: 'rgba(75,192,192,1)',
                stack: 'stack1',
            },
            {
                label: 'Состав C',
                data: [10, 5, 0, 15, 5, 20, 3, 8, 2, 5, 7, 4],
                backgroundColor: 'rgba(255,99,132,1)',
                stack: 'stack1',
            },
        ],
        options: {
            scales: {
                x: { stacked: true },
                y: { stacked: true },
            },
        },
    },
}


export const CurrencyStacked: Story = {
    args: {
        labels,
        datasets: [
            {
                label: 'Женский состав',
                data: [200, 300, 500, 150, 600, 400, 550, 620, 320, 580, 610, 700],
                backgroundColor: 'rgba(75,85,99,1)',
                stack: 'stack1',
            },
            {
                label: 'Мужской состав',
                data: [100, 150, 200, 80, 300, 250, 320, 400, 180, 350, 380, 420],
                backgroundColor: 'rgba(255,159,64,1)',
                stack: 'stack1',
            },
        ],
        options: {
            scales: {
                x: { stacked: true },
                y: {
                    stacked: true,
                    ticks: {
                        callback: (val) => `${val} ₽`,
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const v = ctx.parsed.y as number
                            return `${v} ₽ — ${ctx.dataset.label}`
                        },
                    },
                },
            },
        },
    },
}





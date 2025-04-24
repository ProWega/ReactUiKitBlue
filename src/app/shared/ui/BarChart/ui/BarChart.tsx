import React from 'react'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    ChartOptions,
    ChartDataset,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'


// register all the components we need
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


export interface BarChartProps {
    /** Labels along the X axis (e.g. months) */
    labels: string[]
    /** One or more data series */
    datasets: ChartDataset<'bar', number[]>[]
    /** Pass through any Chart.js BarOptions */
    options?: ChartOptions<'bar'>
    /** Chart.js canvas id (optional) */
    id?: string
}


export const BarChart: React.FC<BarChartProps> = ({
                                                      labels,
                                                      datasets,
                                                      options,
                                                      id,
                                                  }) => {
    const data = { labels, datasets }


    const defaultOptions: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.05)' },
            },
        },
    }


    return <Bar id={id} options={{ ...defaultOptions, ...options }} data={data} />
}


export default BarChart





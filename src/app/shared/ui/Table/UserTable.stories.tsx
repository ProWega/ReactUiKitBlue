import type { Meta, StoryObj } from '@storybook/react'
import UserTable, { User, UserTableProps } from './ui/UserTable'


const DUMMY: User[] = [
    {
        id: 123,
        name: 'Характеров Федот',
        source: 'Прямая ссылка',
        registrationDate: '16.04.2024, 00:00',
        roles: ['Игрок','Администратор'],
        status: 'active',
    },
    {
        id: 432,
        name: 'Монакова Эмма',
        source: 'Яндекс директ',
        registrationDate: '10.02.2024, 15:48',
        roles: ['Игрок','Администратор','Тренер'],
        status: 'active',
    },
    {
        id: 50,
        name: 'Рассказова Ефросинья',
        source: 'Прямая ссылка',
        registrationDate: '21.08.2024, 15:48',
        roles: ['Администратор'],
        status: 'active',
    },
    {
        id: 598,
        name: 'Пичугина Эвелина',
        source: 'VK реклама',
        registrationDate: '13.07.2024, 21:00',
        roles: ['Менеджер'],
        status: 'active',
    },
    {
        id: 87,
        name: 'Умберг Борис',
        source: 'Прямая ссылка',
        registrationDate: '10.02.2024, 15:48',
        roles: [],
        status: 'moderation',
    },
    {
        id: 66,
        name: 'Хабибуллина Маргарита',
        source: 'VK реклама',
        registrationDate: '14.06.2024, 13:22',
        roles: [],
        status: 'blocked',
    },
    // ... добавьте ещё, чтобы проверить пагинацию
]


const meta: Meta<typeof UserTable> = {
    title: 'Components/UserTable',
    component: UserTable,
    tags: ['autodocs'],
}


export default meta
type Story = StoryObj<typeof UserTable>


/**
 * Таблица с дефолтным pageSize = 5
 * Можно вводить в поиск, выбирать статус, переключать страницы.
 */
export const Default: Story = {
    args: {
        data: DUMMY,
    } as UserTableProps,
}


/**
 * То же, но с кастомным pageSize = 3
 */
export const SmallPage: Story = {
    args: {
        data: DUMMY,
        pageSize: 3,
    } as UserTableProps,
}






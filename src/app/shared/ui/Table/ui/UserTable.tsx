// ui/UserTable.tsx
import React, {useEffect, useMemo, useState} from 'react'
import {SearchBox} from '@/app/shared/ui/SearchBox'
import {MySelect, Option as SelectOption, Value,} from '@/app/shared/ui/MySelect/ui/MySelect'
import {StatusTag, StatusVariant} from '@/app/shared/ui/StatusTag/ui/StatusTag'
import styles from './UserTable.module.scss'


export interface User {
    id: number
    name: string
    source: string
    registrationDate: string
    roles: string[]
    status: StatusVariant
}


export interface UserTableProps {
    data: User[]
    pageSize?: number
}


export const UserTable: React.FC<UserTableProps> = ({
                                                        data,
                                                        pageSize = 5,
                                                    }) => {
    // тексты из пропсов SearchBox / MySelect
    const [searchText, setSearchText] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<Value>(undefined)
    const [page, setPage] = useState<number>(1)


    // локальное хранение того, какой label (Value) выбран в каждой строке
    const [rowStatuses, setRowStatuses] = useState<Record<number, Value>>({})


    // мэппинги между variant и label
    const variantToLabel: Record<StatusVariant, string> = {
        active: 'Активный',
        moderation: 'На модерации',
        blocked: 'Заблокирован',
    }
    const labelToVariant: Record<string, StatusVariant> = {
        'Активный': 'active',
        'На модерации': 'moderation',
        'Заблокирован': 'blocked',
    }


    // инициализируем rowStatuses из props.data
    useEffect(() => {
        const init: Record<number, Value> = {}
        data.forEach(u => {
            init[u.id] = variantToLabel[u.status]
        })
        setRowStatuses(init)
    }, [data])


    // опции для селекта (и глобального фильтра, и row-level)
    const statusOptions: SelectOption[] = [
        {
            node: <StatusTag variant="active"/>,
            value: variantToLabel['active'],
            disabled: false,
        },
        {
            node: <StatusTag variant="moderation"/>,
            value: variantToLabel['moderation'],
            disabled: false,
        },
        {
            node: <StatusTag variant="blocked"/>,
            value: variantToLabel['blocked'],
            disabled: false,
        },
    ]


    // 1) Фильтрация по name + по глобальному статус-фильтру
    const filtered = useMemo(() => {
        return data.filter(u => {
            const matchesName = u.name
                .toLowerCase()
                .includes(searchText.toLowerCase())


            const matchesStatus =
                statusFilter === undefined ||
                labelToVariant[statusFilter as string] === u.status


            return matchesName && matchesStatus
        })
    }, [data, searchText, statusFilter, rowStatuses])


    // 2) Пагинация
    const totalPages = Math.max(Math.ceil(filtered.length / pageSize), 1)
    const pageData = useMemo(() => {
        const start = (page - 1) * pageSize
        return filtered.slice(start, start + pageSize)
    }, [filtered, page, pageSize])


    useEffect(() => {
        if (page > totalPages) setPage(1)
    }, [totalPages, page])


    // обновление статуса конкретной строки
    const handleRowStatusChange = (id: number, newLabel: Value) => {
        setRowStatuses(prev => ({...prev, [id]: newLabel}))
    }


    return (
        <div className={styles.userTable}>
            {/* Фильтры */}
            <div className={styles.userTable__filters}>
                <SearchBox
                    value={searchText}
                    onChange={setSearchText}
                    placeholder="Поиск по ФИО"
                />
                <MySelect
                    variant="status"
                    className={styles.statusFilter}
                    options={[
                        ...statusOptions,
                    ]}
                    value={statusFilter}
                    defaultValue={"Активный"}
                    onChange={setStatusFilter}
                    noOptionsText="Нет статусов"
                />
            </div>


            {/* Таблица */}
            <table className={styles.userTable__table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Пользователь</th>
                    <th>Источник</th>
                    <th>Дата регистрации</th>
                    <th>Роли</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {pageData.map(u => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.source}</td>
                        <td>{u.registrationDate}</td>
                        <td>{u.roles.join(', ')}</td>
                        <td>
                            <MySelect
                                variant="status"
                                options={statusOptions}
                                value={rowStatuses[u.id]}
                                defaultValue={rowStatuses[u.id]}
                                onChange={val => handleRowStatusChange(u.id, val)}
                                noOptionsText="Нет статусов"
                            />
                        </td>
                    </tr>
                ))}
                {pageData.length === 0 && (
                    <tr>
                        <td colSpan={6} style={{textAlign: 'center', padding: '1rem'}}>
                            Нет данных
                        </td>
                    </tr>
                )}
                </tbody>
            </table>


            {/* Пагинация */}
            <div className={styles.userTable__pagination}>
                <button
                    className={styles.userTable__pageButton}
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                >
                    Prev
                </button>
                {Array.from({length: totalPages}, (_, i) => (
                    <button
                        key={i + 1}
                        className={`${styles.userTable__pageButton} ${
                            page === i + 1
                                ? styles['userTable__pageButton--active']
                                : ''
                        }`}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className={styles.userTable__pageButton}
                    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}


export default UserTable





import { useState, useMemo, useEffect } from 'react'


export interface UseTableProps<T> {
    data: T[]
    /** Функция фильтрации: (item, query) => boolean */
    filterFn?: (item: T, query: string) => boolean
    /** Стартовое значение фильтра */
    initialFilter?: string
    /** Опции размера страницы */
    pageSizeOptions?: number[]
    /** Стартовый размер страницы */
    initialPageSize?: number
}


export function useTable<T>({
                                data,
                                filterFn,
                                initialFilter = '',
                                pageSizeOptions = [5, 10, 20],
                                initialPageSize = 5,
                            }: UseTableProps<T>) {
    const [query, setQuery] = useState(initialFilter)
    const [pageSize, setPageSize] = useState(initialPageSize)
    const [pageIndex, setPageIndex] = useState(0)


    // Фильтрация
    const filteredData = useMemo(() => {
        if (!filterFn || query.trim() === '') return data
        return data.filter(item => filterFn(item, query))
    }, [data, filterFn, query])


    // Всего страниц
    const totalPages = Math.ceil(filteredData.length / pageSize)


    // Данные текущей страницы
    const currentData = useMemo(() => {
        const start = pageIndex * pageSize
        return filteredData.slice(start, start + pageSize)
    }, [filteredData, pageIndex, pageSize])


    // Переход по страницам
    const goToPage = (idx: number) => {
        const i = Math.max(0, Math.min(idx, totalPages - 1))
        setPageIndex(i)
    }
    const nextPage = () => goToPage(pageIndex + 1)
    const prevPage = () => goToPage(pageIndex - 1)


    // Если сменился фильтр или pageSize – сбрасываем на первую страницу
    useEffect(() => {
        setPageIndex(0)
    }, [query, pageSize])


    return {
        query,
        setQuery,
        pageSize,
        setPageSize,
        pageIndex,
        totalPages,
        pageSizeOptions,
        currentData,
        nextPage,
        prevPage,
        goToPage,
    }
}



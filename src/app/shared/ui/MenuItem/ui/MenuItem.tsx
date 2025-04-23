import { useState, FC } from 'react';
import clsx from 'clsx';
import cls from './MenuItem.module.scss';
// Предположим, у вас есть компонент иконки Icon
import { Icon } from '@/app/shared/ui/Icon'; // или любой путь к вашему Icon-компоненту


export type MenuItemVariant = 'default' | 'active' | 'disabled';


export interface SubItem {
    label: string;
    onClick?: () => void;  // Доп. поведение при клике
}


export interface MenuItemProps {
    /** Иконка, например <Icon name="home" /> */
    icon?: string;
    /** Текст пункта меню */
    label: string;
    /** Вариант оформления (например, подсветка активного пункта) */
    variant?: MenuItemVariant;
    /** Подпункты меню (выпадающий список) */
    subItems?: SubItem[];
    /** Начальное состояние (раскрыт список или нет) */
    defaultOpen?: boolean;
    /** Обработчик клика на сам пункт (без раскрытия) */
    onClick?: () => void;
}


export const MenuItem: FC<MenuItemProps> = ({
                                                icon = "home",
                                                label,
                                                variant = 'default',
                                                subItems,
                                                defaultOpen = false,
                                                onClick,
                                            }) => {
    // Локальное состояние для управления раскрытием подпунктов
    const [isOpen, setIsOpen] = useState(defaultOpen);


    const hasSubItems = subItems && subItems.length > 0;


    // При клике на основной элемент: если есть подпункты, переключаем раскрытие; если нет – вызываем onClick
    const handleMainClick = () => {
        if (hasSubItems) {
            setIsOpen((prev) => !prev);
        } else {
            onClick?.();
        }
    };


    const containerClass = clsx(
        cls.menuItem,
        cls[variant],
        { [cls.open]: isOpen },
    );

    const subItemClasses = clsx(
        "bodyRegular12",
        cls.subItem
    )


    return (
        <button className={containerClass}>
            {/* Основной блок пункта меню */}
            <div className={cls.menuItemContainer} onClick={handleMainClick}>
                <div className={cls.menuItemContent} >

                    <div className={cls.iconBg}>
                        <Icon name={icon} width={24} height={24} className={cls.icon}/>
                    </div>
                    <span className={cls.label}>{label}</span>



                </div>
                {/* Если есть подпункты, отображаем значок стрелочки */}
                {hasSubItems && (
                    <Icon
                        name={isOpen ? 'arrow_up' : 'arrow_down'}
                        width={16}
                        height={16}
                        className={cls.chevronIcon}
                    />
                )}
            </div>


            {/* Выпадающий список подпунктов */}
            {isOpen && hasSubItems && (
                <ul className={cls.subItems}>
                    {subItems.map((item) => (
                        <li key={item.label} className={subItemClasses} onClick={item.onClick}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </button>
    );
};





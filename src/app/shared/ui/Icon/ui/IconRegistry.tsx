import React from 'react';

// Используем import.meta.glob с опцией eager: true, чтобы сразу импортировать все SVG с ?react
const modules = import.meta.glob('./icons/*.svg', { eager: true });


// Интерфейс для импортированного модуля
interface IconModule {
    default: React.FC<React.SVGProps<SVGSVGElement>>;
}

const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {};

// Пройдём по всем модулям и сформируем маппинг: имя файла -> React-компонент
Object.entries(modules).forEach(([path, module]) => {
    // Извлекаем имя иконки из пути, например: '@/app/shared/assets/img/close.svg?react'
    console.log(path)
    const match = path.match(/\/([^/]+)\.svg/);
    if (match && match[1]) {
        const iconName = match[1];
        icons[iconName] = (module as IconModule).default;
    }
});

console.log(icons);

export default icons;
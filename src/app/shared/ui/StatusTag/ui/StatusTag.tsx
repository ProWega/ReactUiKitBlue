import {FC} from "react";
import cls from "./StatusTag.module.scss"
import clsx from "clsx";

export type StatusVariant = "active" | "moderation" | "blocked"

export interface StatusTagProps {
    className?: string
    variant?: StatusVariant,
    size?: "small" | "medium" | "large",
    labels?: {
        "active": string,
        "moderation": string,
        "blocked": string
    }
}

export const StatusTag : FC<StatusTagProps> = (
    {
        className,
        variant = "active",
        size = "medium",
        labels = {
            "active": "Активный",
            "moderation": "На модерации",
            "blocked": "Заблокирован"
        }
    }) => {

    const combinedClassName = clsx(
        cls.statusTag,
        cls[variant],
        cls[size],
        className,
        "bodyRegular12"
    );

    return (
        <div className={combinedClassName}>
            <span>
                {labels[variant]}
            </span>
        </div>
    )
}
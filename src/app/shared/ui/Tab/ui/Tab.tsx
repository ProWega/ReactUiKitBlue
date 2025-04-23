import React from "react";
import cls from "./Tab.module.scss";

export interface TabProps {
    label: string;
    selected?: boolean;
    disabled?: boolean;
    size: "small" | "medium" | "large";
    onClick: (event: React.MouseEvent) => void;
}

export const Tab: React.FC<TabProps> = (props) => {
    const {
        label,
        selected = false,
        disabled = false,
        size = "medium",
        onClick,
    } = props;

    const classNames = [cls.tab, cls[size]];

    if (selected) {
        classNames.push(cls.selected)
    }

    if (disabled) {
        classNames.push(cls.disabled)
    }

    return (
        <button
        type="button"
        className={classNames.join(" ")}
        onClick={onClick}
        disabled={disabled}
        >
            {label}
        </button>
    )
}
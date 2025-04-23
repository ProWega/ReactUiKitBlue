import React from 'react';
import icons from "@/app/shared/ui/Icon/ui/IconRegistry";

export type IconName = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    width?: number | string;
    height?: number | string;
    className?: string;
}


export const Icon: React.FC<IconProps> = ({ name, width=8, height=8, className, ...props }) => {
    const SelectedIcon = icons[name];
    if (!SelectedIcon) {
        return null;
    }
    return <SelectedIcon {...props} className={className} width={width} height={height} />;
};

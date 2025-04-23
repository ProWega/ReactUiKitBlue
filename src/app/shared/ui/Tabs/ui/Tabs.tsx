import {Tab, TabProps} from "../../Tab/ui/Tab";
import cls from "./Tabs.module.scss"

interface TabItem {
    label: string,
    disabled?: boolean,
}

export interface TabsProps {
    tabs: TabItem[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    size?: TabProps['size'];
}

export const Tabs: React.FC<TabsProps> = (props) => {
    const {
        tabs,
        selectedIndex,
        onSelect,
        size='medium'
    } = props;
    return (
        <div className={cls.tabsContainer}>
            <div className={cls.tabs}>
                {tabs.map((tab, index) => (
                    <Tab label={tab.label}
                         disabled={tab.disabled}
                         selected={selectedIndex === index}
                         size={size}
                         onClick = {() => onSelect(index)}/>
                ))}
            </div>
        </div>
    )
}
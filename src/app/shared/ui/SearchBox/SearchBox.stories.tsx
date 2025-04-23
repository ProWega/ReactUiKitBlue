import { Meta, StoryObj} from '@storybook/react'
import {SearchBox, SearchBoxProps} from "./ui/SearchBox";
import {useState} from "react";

const meta: Meta<typeof SearchBox> = {
    title: "Component/SearchBox",
    component: SearchBox,
    argTypes: {
        onChange: {action: "onChange"},
        onSearch: {action: "onSearch"},
        onClear: {action: "onClear"},
    }
};

export default meta;

type Story = StoryObj<typeof SearchBox>;

const StatefulSearchBox = (args: SearchBoxProps) => {
    const [value, setValue] = useState("");

    const handleChange = (val: string) => {
        setValue(val);
        args.onChange?.(val)
    }

    const handleClear = () => {
        setValue("");
        args.onClear?.();
    }

    const handleSearch = () => {
        args.onSearch?.(value);
    }

    return (
        <SearchBox
            {...args}
            value={value}
            onChange={handleChange}
            onSearch={handleSearch}
            onClear={handleClear}/>
    )

}

export const DefaultSearch: Story = {
    render: (args) => <StatefulSearchBox {...args}/>,
    args: {
        placeholder: "Введите текст...",
        showClear: true,
    }
};

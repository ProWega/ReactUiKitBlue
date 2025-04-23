import {Meta, StoryObj} from '@storybook/react'
import {Input, InputProps} from "./ui/Input";
import {useState} from "react";

const meta: Meta<typeof Input> = {
    title: "Component/Input",
    component: Input,
    argTypes: {
        onChange: {action: "onChange"},
        onClear: {action: "onClear"},
        addonLeft: {control: "text"}
    }
};

export default meta;

type Story = StoryObj<typeof Input>;

const StatefulInput = (args: InputProps) => {
    const [value, setValue] = useState("");

    const handleChange = (val: string) => {
        setValue(val);
        args.onChange?.(val)
    }

    const handleClear = () => {
        setValue("");
        args.onClear?.();
    }


    return (
        <Input
            {...args}
            value={value}
            onChange={handleChange}
            onClear={handleClear}/>
    )

}

export const Default: Story = {
    render: (args) => <StatefulInput {...args}/>,
    args: {
        placeholder: "Введите текст...",
        showClear: true,

    }
};

export const Tunned: Story = {
    render: (args) => <StatefulInput {...args}/>,
    args: {
        placeholder: "Введите текст...",
        showClear: true,
        addonLeft: "https://",
        addonRight: ".ru",
        iconName: "home",
    }
};

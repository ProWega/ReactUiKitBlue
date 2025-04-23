import {Decorator} from "@storybook/react";
import "@/app/styles/index.scss"

export const StyleDecorator: Decorator = (Story) => {
    return (
        <div className="my-story-wrapper" style={{margin: '20px'}}>
            <Story />
        </div>
    )
};
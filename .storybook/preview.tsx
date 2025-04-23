import type { Preview } from '@storybook/react'
import '../src/app/styles/index.scss'
//import {StyleDecorator} from "../src/app/providers/storybook/decorators/StyleDecorator";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },
    //decorators: [StyleDecorator],

}

export default preview;
import { createGlobalStyle } from "styled-components";
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export const GlobalStyles = createGlobalStyle`
    *,
    ::before,
    ::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        vertical-align: baseline;
        list-style: none;
        border: 0;
        font-family: "Roboto", sans-serif;
        text-decoration: none; 
    }
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background-color: #0e091b;
        border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #808080;
        border-radius: 8px;
    }
`
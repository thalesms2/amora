import { createGlobalStyle } from "styled-components";

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
    }
    a {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.secondary };
    }
    body {
        background-color: ${({ theme }) => theme.colors.primary };
        color: ${({ theme }) => theme.colors.secondary };
    }
`
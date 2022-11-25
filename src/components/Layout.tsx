import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useCookies } from 'react-cookie'

import { GlobalStyles } from "../styles/globalstyles";
import { light, dark } from '../styles/Themes'
import Login from "./Login";

const Layout: React.FC = () => {
    const [cookies, setCookie, removeCookie] = useCookies()
    const [theme, setTheme] = React.useState(() => {
        if(cookies.theme) {
            const isDarkMode = cookies.theme == 'dark'
            return isDarkMode ? dark : light 
        } else {
            const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            return isDarkMode ? dark : light 
        }
    })
    const [isLogIn, setLogin] = React.useState(() => {
        return cookies.log == 'true'
    })
    const toggleTheme = () => {
        document.body.style.transition = "linear .2s";
        if(theme === light) {
            setTheme(dark)
            setCookie('theme', 'dark')
        } else {
            setTheme(light)
            setCookie('theme', 'light')
        } 
    }
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <nav>
                <Link to="/">Home</Link>
                <Link to="/storage">Storage</Link>
            </nav>
            <button onClick={toggleTheme}>Theme</button>
            { !isLogIn ? <Login /> : ''}
            <Outlet />
        </ThemeProvider>
    );
};
export default Layout;

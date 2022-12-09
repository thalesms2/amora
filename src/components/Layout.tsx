import React from "react";
import { Outlet } from "react-router-dom";
import {
    IconButton,
    Button,
    Typography,
    Box,
    Paper,
    useMediaQuery,
    Tooltip
} from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { ToastContainer, Flip } from 'react-toastify'
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { GlobalStyles } from "../styles/globalstyles";
import Login from "./Login";
import Nav from "./Nav";
import Sign from "./Sign";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const ThemeButton = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <Tooltip title="Change theme">
            <IconButton
                onClick={colorMode.toggleColorMode}
                color="inherit"
                sx={{
                    padding: ".5em",
                    marginLeft: ".5em",
                }}
            >
                {theme.palette.mode === "dark" ? (
                    <DarkModeIcon />
                ) : (
                    <LightModeIcon />
                )}
            </IconButton>
        </Tooltip>
    );
};

const Layout: React.FC = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = React.useState<"light" | "dark">(() => {
        if (localStorage.theme === 'dark' || localStorage.theme === 'light') {
            return localStorage.theme;
        } 
        const theme = prefersDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        return theme;
    });
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newTheme = prevMode === "light" ? "dark" : "light"
                    localStorage.setItem('theme', newTheme)
                    return newTheme
                }
                );
            },
        }),
        []
    );
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    const [login, setLogin] = React.useState(() => {
        const result = window.sessionStorage.getItem("userId")
            ? "logged"
            : "login";
        console.log(result);
        return result;
    });
    const setLogout = () => {
        setLogin("login");
        window.sessionStorage.clear();
    };
    return (
        <ColorModeContext.Provider value={colorMode}>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
            <ToastContainer
                theme={mode == 'dark' ? 'light' : 'dark'}
                position="bottom-right"
                transition={Flip}
                autoClose={5000}
            />
                <Paper
                    elevation={0}
                    sx={{
                        margin: 0,
                        height: "100vh",
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: "100vw",
                        borderRadius: 0,
                        transition: ".4s ease-out",
                    }}
                >
                    
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingTop: ".5em",
                        }}
                    >
                        <Nav />
                        <Box>
                            {login == "logged" ? (
                                <Typography variant="overline">
                                    {window.sessionStorage.name}
                                </Typography>
                            ) : (
                                ""
                            )}
                            {login == "logged" ? (
                                <Tooltip title="Logout">
                                    <Button 
                                        onClick={setLogout}
                                        sx={{
                                            padding: "1em 1.5em",
                                            marginLeft: ".5em",
                                        }}
                                    >Logout</Button>
                                </Tooltip>
                            ) : (
                                ""
                            )}
                            <ThemeButton />
                        </Box>
                    </Box>

                    <Login open={login} setLogin={setLogin} />
                    <Sign open={login} setLogin={setLogin} />
                    <Outlet />
                </Paper>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Layout;

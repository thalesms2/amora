import { lazy, Suspense, createContext, useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { Button, Typography, Box, Paper, Tooltip, useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Nav from "./Nav";
import layoutHooks from "../hooks/layoutHooks";
import ThemeButton from "./ThemeButton";

const Login = lazy(() => import("./Login"));
const Sign = lazy(() => import("./Sign"));

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function Layout() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [mode, setMode] = useState<"light" | "dark">(() => {
        if (localStorage.theme === "dark" || localStorage.theme === "light") {
            return localStorage.theme;
        }
        const theme = prefersDarkMode ? "dark" : "light";
        localStorage.setItem("theme", theme);
        return theme;
    });
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newTheme = prevMode === "light" ? "dark" : "light";
                    localStorage.setItem("theme", newTheme);
                    return newTheme;
                });
            },
        }),
        []
    );
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );
    const { login, setLogout, setLogin, popUpStatus, setPopUpStatus } = layoutHooks()
    return (
        <ColorModeContext.Provider value={colorMode}>
            <Global
                styles={css`
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
                        background-color: ${mode === "dark"
                            ? theme.palette.primary.dark
                            : theme.palette.primary.light};
                        border-radius: 8px;
                    }

                    ::-webkit-scrollbar-thumb {
                        background-color: #808080;
                        border-radius: 8px;
                    }
                    ::-moz-selection {
                        /* Code for Firefox */
                        color: #000;
                        background: #808080;
                    }

                    ::selection {
                        color: #000;
                        background: #808080;
                    }
                `}
            />
            <ThemeProvider theme={theme}>
                <ToastContainer
                    theme={mode == "dark" ? "light" : "dark"}
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
                                    >
                                        Logout
                                    </Button>
                                </Tooltip>
                            ) : (
                                ""
                            )}
                            <ThemeButton theme={theme} colorMode={colorMode} />
                        </Box>
                    </Box>
                    <Suspense fallback={""}>
                        {login === "login" ? (
                            <Login open={login} setLogin={setLogin} />
                        ) : null}
                        {login === "sign" ? (
                            <Sign open={login} setLogin={setLogin} />
                        ) : null}
                        <Outlet context={[popUpStatus, setPopUpStatus]} />
                    </Suspense>
                </Paper>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
import React from "react";
import { Outlet } from "react-router-dom";
import {
    IconButton,
    Button,
    Typography,
    Box,
    Paper,
} from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
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
        <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            sx={{
                padding: 0,
                margin: 0,
            }}
        >
            {theme.palette.mode === "dark" ? (
                <DarkModeIcon />
            ) : (
                <LightModeIcon />
            )}
        </IconButton>
    );
};

const Layout: React.FC = () => {
    const [mode, setMode] = React.useState<"light" | "dark">("light");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
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
                                <Button onClick={setLogout}>logout</Button>
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

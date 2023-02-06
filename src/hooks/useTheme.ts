import React from "react";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const useTheme = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [mode, setMode] = React.useState<"light" | "dark">(() => {
        if (localStorage.theme === "dark" || localStorage.theme === "light") {
            return localStorage.theme;
        }
        const theme = prefersDarkMode ? "dark" : "light";
        localStorage.setItem("theme", theme);
        return theme;
    });
    const colorMode = React.useMemo(
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
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );
    return { ColorModeContext, theme, mode, setMode, colorMode };
};

export default useTheme;

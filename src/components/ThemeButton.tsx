import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton, Tooltip } from "@mui/material";
import themeHooks from '../hooks/themeHooks'
import { useTheme } from "@mui/material/styles";

const ThemeButton: React.FC = () => {
    const { colorMode } = themeHooks()
    const theme = useTheme()
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

export default ThemeButton;

import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton, Tooltip } from "@mui/material";

const ThemeButton: React.FC<{theme: any, colorMode: any}> = ({ theme, colorMode }) => {
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

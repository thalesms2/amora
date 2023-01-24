import React from 'react'
import { Button, Menu, MenuItem, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

interface NavItemCellProps {
    setStatus: React.Dispatch<React.SetStateAction<HTMLElement>>
    to: string
    title: string
}

const NavItemCell: React.FC<NavItemCellProps> = (props) => {
    const theme = useTheme();
    const handleClose = () => {
        props.setStatus(null);
    };
    return (
        <Link to={props.to}>
            <MenuItem
                onClick={handleClose}
                divider
                sx={{
                    color: theme.palette.text.primary,
                }}
            >
                {props.title}
            </MenuItem>
        </Link>
    )
}

export default NavItemCell
import React from 'react'
import { Button, Menu } from "@mui/material";

interface NavItemProps {
    status: HTMLElement | null
    setStatus: React.Dispatch<React.SetStateAction<HTMLElement>>
    title: string
    children: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = (props) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.setStatus(event.currentTarget);
    };
    const handleClose = () => {
        props.setStatus(null);
    };
    return (
        <>
            <Button
                aria-controls={Boolean(props.status) ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(props.status) ? "true" : undefined}
                onClick={handleClick}
                sx={{
                    padding: ".5em 1em",
                    marginRight: ".5em",
                }}
            >
                {props.title}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={props.status}
                open={Boolean(props.status)}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                sx={{
                    marginRight: ".5em",
                }}
            >
                {props.children}
            </Menu>
    </>
    )
}

export default NavItem
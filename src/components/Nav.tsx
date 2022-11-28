import React from 'react'
import { Button, Menu, MenuItem, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from "@mui/material/styles";

const Nav = () => {
    const theme = useTheme();
    
    const [sell, setSell] = React.useState<null | HTMLElement>(null);
    const [storage, setStorage] = React.useState<null | HTMLElement>(null);
    const [product, setProduct] = React.useState<null | HTMLElement>(null);
    const [company, setCompany] = React.useState<null | HTMLElement>(null);
    const [config, setConfig] = React.useState<null | HTMLElement>(null);
    
    const handleStorageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setStorage(event.currentTarget);
    };
    const handleProductClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProduct(event.currentTarget);
    };
    const handleCompanyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCompany(event.currentTarget);
    };
    const handleConfigClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setConfig(event.currentTarget);
    };
    const handleSellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSell(event.currentTarget);
    };

    const handleStorageClose = () => {
        setStorage(null);
    };
    const handleProductClose = () => {
        setProduct(null);
    };
    const handleCompanyClose = () => {
        setCompany(null);
    };
    const handleConfigClose = () => {
        setConfig(null);
    };
    const handleSellClose = () => {
        setSell(null);
    };
    
return(
    <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "space-between"
    }}>
        <Link to="/">
            <Button>Home</Button>
        </Link>

        <Button
            aria-controls={
                Boolean(storage) ? "basic-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={
                Boolean(storage) ? "true" : undefined
            }
            onClick={handleStorageClick}
        >
            Storage
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={storage}
            open={Boolean(storage)}
            onClose={handleStorageClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
        >
            <Link to="/">
                <MenuItem 
                    onClick={handleStorageClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Profile
                </MenuItem>
            </Link>
            <MenuItem divider onClick={handleStorageClose}>
                My account
            </MenuItem>
            <MenuItem divider onClick={handleStorageClose}>
                Logout
            </MenuItem>
        </Menu>

        
        <Button
            aria-controls={
                Boolean(product) ? "basic-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={
                Boolean(product) ? "true" : undefined
            }
            onClick={handleProductClick}
        >
            Product
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={product}
            open={Boolean(product)}
            onClose={handleProductClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
        >
            <Link to="/">
                <MenuItem 
                    onClick={handleProductClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Profile
                </MenuItem>
            </Link>
            <MenuItem divider onClick={handleProductClose}>
                My account
            </MenuItem>
            <MenuItem divider onClick={handleProductClose}>
                Logout
            </MenuItem>
        </Menu>


        <Button
            aria-controls={
                Boolean(sell) ? "basic-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={
                Boolean(sell) ? "true" : undefined
            }
            onClick={handleSellClick}
        >
            Sell
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={sell}
            open={Boolean(sell)}
            onClose={handleSellClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
        >
            <Link to="/">
                <MenuItem 
                    onClick={handleSellClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Profile
                </MenuItem>
            </Link>
            <MenuItem divider onClick={handleSellClose}>
                My account
            </MenuItem>
            <MenuItem divider onClick={handleSellClose}>
                Logout
            </MenuItem>
        </Menu>


        <Button
            aria-controls={
                Boolean(company) ? "basic-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={
                Boolean(company) ? "true" : undefined
            }
            onClick={handleCompanyClick}
        >
            Company
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={company}
            open={Boolean(company)}
            onClose={handleCompanyClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
        >
            <Link to="/">
                <MenuItem 
                    onClick={handleCompanyClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Profile
                </MenuItem>
            </Link>
            <MenuItem divider onClick={handleCompanyClose}>
                My account
            </MenuItem>
            <MenuItem divider onClick={handleCompanyClose}>
                Logout
            </MenuItem>
        </Menu>


        <Button
            aria-controls={
                Boolean(config) ? "basic-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={
                Boolean(config) ? "true" : undefined
            }
            onClick={handleConfigClick}
        >
            Config
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={config}
            open={Boolean(config)}
            onClose={handleConfigClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
        >
            <Link to="/">
                <MenuItem 
                    onClick={handleConfigClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Profile
                </MenuItem>
            </Link>
            <MenuItem divider onClick={handleConfigClose}>
                My account
            </MenuItem>
            <MenuItem divider onClick={handleConfigClose}>
                Logout
            </MenuItem>
        </Menu>
    </Box>
    )
}

export default Nav
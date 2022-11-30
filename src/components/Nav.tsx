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
        <Link to="/product">
            <MenuItem 
                onClick={handleProductClose}
                divider
                sx={{
                    color: theme.palette.text.primary
                }}
            >
                Consult all products
            </MenuItem>
        </Link>
        <Link to="/product/create">
            <MenuItem 
                onClick={handleProductClose}
                divider
                sx={{
                    color: theme.palette.text.primary
                }}
            >
                Create new product
            </MenuItem>
        </Link>
        </Menu>

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
            <Link to="/storage">
                <MenuItem 
                    onClick={handleStorageClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Consult
                </MenuItem>
            </Link>
            <Link to="/storage">
                <MenuItem 
                    onClick={handleStorageClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Create
                </MenuItem>
            </Link>
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
            <Link to="/sell">
                <MenuItem 
                    onClick={handleSellClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Sells
                </MenuItem>
            </Link>
            <Link to="/sell">
                <MenuItem 
                    onClick={handleSellClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Sells
                </MenuItem>
            </Link>
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
            <Link to="/company">
                <MenuItem 
                    onClick={handleCompanyClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Company
                </MenuItem>
            </Link>
            <Link to="/company">
                <MenuItem 
                    onClick={handleCompanyClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Company
                </MenuItem>
            </Link>
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
            <Link to="/config">
                <MenuItem 
                    onClick={handleConfigClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Config
                </MenuItem>
            </Link>
            <Link to="/config">
                <MenuItem 
                    onClick={handleConfigClose}
                    divider
                    sx={{
                        color: theme.palette.text.primary
                    }}
                >
                    Config
                </MenuItem>
            </Link>
        </Menu>
    </Box>
    )
}

export default Nav
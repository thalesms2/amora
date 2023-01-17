import React from "react";
import { Button, Menu, MenuItem, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Nav = () => {
    const theme = useTheme();
    const [product, setProduct] = React.useState<null | HTMLElement>(null);
    const [storage, setStorage] = React.useState<null | HTMLElement>(null);
    const [sell, setSell] = React.useState<null | HTMLElement>(null);
    const [shop, setShop] = React.useState<null | HTMLElement>(null);
    const [company, setCompany] = React.useState<null | HTMLElement>(null);
    const [config, setConfig] = React.useState<null | HTMLElement>(null);
    const handleProductClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProduct(event.currentTarget);
    };
    const handleStorageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setStorage(event.currentTarget);
    };
    const handleSellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSell(event.currentTarget);
    };
    const handleCompanyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCompany(event.currentTarget);
    };
    const handleShopClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setShop(event.currentTarget);
    };
    const handleConfigClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setConfig(event.currentTarget);
    };
    const handleProductClose = () => {
        setProduct(null);
    };
    const handleStorageClose = () => {
        setStorage(null);
    };
    const handleSellClose = () => {
        setSell(null);
    };
    const handleShopClose = () => {
        setShop(null);
    };
    const handleCompanyClose = () => {
        setCompany(null);
    };
    const handleConfigClose = () => {
        setConfig(null);
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "space-between",
            }}
        >
            <Link to="/">
                <Button
                    sx={{
                        padding: "1em 1.5em",
                        marginRight: ".5em",
                    }}
                >
                    Home
                </Button>
            </Link>
            <Button
                aria-controls={Boolean(product) ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(product) ? "true" : undefined}
                onClick={handleProductClick}
                sx={{
                    padding: ".5em 1em",
                    marginRight: ".5em",
                }}
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
                sx={{
                    marginRight: ".5em",
                }}
            >
                <Link to="/product/create">
                    <MenuItem
                        onClick={handleProductClose}
                        divider
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        Create new product
                    </MenuItem>
                </Link>
                <Link to="/product">
                    <MenuItem
                        onClick={handleProductClose}
                        divider
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        List all products
                    </MenuItem>
                </Link>
            </Menu>

            <Button
                aria-controls={Boolean(storage) ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(storage) ? "true" : undefined}
                onClick={handleStorageClick}
                sx={{
                    marginRight: ".5em",
                }}
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
                            color: theme.palette.text.primary,
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
                            color: theme.palette.text.primary,
                        }}
                    >
                        Create
                    </MenuItem>
                </Link>
            </Menu>

            <Button
                aria-controls={Boolean(sell) ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(sell) ? "true" : undefined}
                onClick={handleSellClick}
                sx={{
                    marginRight: ".5em",
                }}
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
                            color: theme.palette.text.primary,
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
                            color: theme.palette.text.primary,
                        }}
                    >
                        Sells
                    </MenuItem>
                </Link>
            </Menu>
            <Button
                aria-controls={Boolean(shop) ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(shop) ? "true" : undefined}
                onClick={handleShopClick}
                sx={{
                    marginRight: ".5em",
                }}
            >
                Shop
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={shop}
                open={Boolean(shop)}
                onClose={handleShopClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Link to="/shop/client/create">
                    <MenuItem
                        onClick={handleSellClose}
                        divider
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        Create a new client
                    </MenuItem>
                </Link>
                <Link to="/shop/client">
                    <MenuItem
                        onClick={handleSellClose}
                        divider
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        List all clients
                    </MenuItem>
                </Link>
            </Menu>

            <Button
                aria-controls={Boolean(company) ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(company) ? "true" : undefined}
                onClick={handleCompanyClick}
                sx={{
                    marginRight: ".5em",
                }}
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
                <Link to="/company/seller/create">
                    <MenuItem
                        onClick={handleCompanyClose}
                        divider
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        Create a Seller
                    </MenuItem>
                </Link>
                <Link to="/company/log">
                    <MenuItem
                        onClick={handleCompanyClose}
                        divider
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        Log
                    </MenuItem>
                </Link>
                <Link to="/company/user">
                    <MenuItem
                        onClick={handleCompanyClose}
                        divider
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        User
                    </MenuItem>
                </Link>
            </Menu>

            <Button
                aria-controls={Boolean(config) ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(config) ? "true" : undefined}
                onClick={handleConfigClick}
                sx={{
                    marginRight: ".5em",
                }}
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
                <Link to="/config/test">
                    <MenuItem
                        onClick={handleConfigClose}
                        divider
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        Test
                    </MenuItem>
                </Link>
                <Link to="/config/clear">
                    <MenuItem
                        onClick={handleConfigClose}
                        divider
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        Clear Data
                    </MenuItem>
                </Link>
            </Menu>
        </Box>
    );
};

export default Nav;

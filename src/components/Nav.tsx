import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

import NavItem from './NavItem'
import NavItemCell from './NavItemCell'

const Nav = () => {
    const [product, setProduct] = React.useState<null | HTMLElement>(null);
    const [storage, setStorage] = React.useState<null | HTMLElement>(null);
    const [sell, setSell] = React.useState<null | HTMLElement>(null);
    const [shop, setShop] = React.useState<null | HTMLElement>(null);
    const [company, setCompany] = React.useState<null | HTMLElement>(null);
    const [config, setConfig] = React.useState<null | HTMLElement>(null);
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
            <NavItem
                status={product}
                setStatus={setProduct}
                title="Product"
            >
                <NavItemCell
                    setStatus={setProduct}
                    to="/product/create"
                    title="Create new product"
                />
                <NavItemCell
                    setStatus={setProduct}
                    to="/product"
                    title="List all products"
                />
            </NavItem>
            <NavItem
                status={storage}
                setStatus={setStorage}
                title="Storage"
            >
                <NavItemCell
                    setStatus={setStorage}
                    to="/storage/create"
                    title="Create a deposit"
                />
                <NavItemCell
                    setStatus={setStorage}
                    to="/storage"
                    title="Consult a deposit"
                />
            </NavItem>
            <NavItem
                status={sell}
                setStatus={setSell}
                title="Sell"
            >
                <NavItemCell
                    setStatus={setSell}
                    to="/sell"
                    title="Sells"
                />
            </NavItem>
            <NavItem
                status={shop}
                setStatus={setShop}
                title="Shop"
            >
                <NavItemCell
                    setStatus={setShop}
                    to="/shop/client/create"
                    title="Create a new client"
                />
                <NavItemCell
                    setStatus={setShop}
                    to="/shop/client"
                    title="List all clients"
                />
            </NavItem>
            <NavItem
                status={company}
                setStatus={setCompany}
                title="Company"
            >
                <NavItemCell
                    setStatus={setCompany}
                    to="/company/seller/create"
                    title="Create a Seller"
                />
                <NavItemCell
                    setStatus={setCompany}
                    to="/company/log"
                    title="Log"
                />
                <NavItemCell
                    setStatus={setCompany}
                    to="/company/user"
                    title="User"
                />
            </NavItem>
            <NavItem
                status={config}
                setStatus={setConfig}
                title="Config"
            >
                <NavItemCell
                    setStatus={setConfig}
                    to="/config/test"
                    title="Test"
                />
                <NavItemCell
                    setStatus={setConfig}
                    to="/config/clear"
                    title="Clear data"
                />
            </NavItem>
        </Box>
    );
};

export default Nav;

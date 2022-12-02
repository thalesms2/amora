import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Home";
import Storage from "./Storage";
import Product from "./Product";
import Sell from "./Sell";
import Company from "./Company";
import Config from "./Config";
import ProductCreate from "./ProductCreate";
import Log from "./Log";
import User from "./User";
import Shop from "./Shop";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/storage" element={<Storage />} />
                <Route path="/product" element={<Product />} />
                <Route path="/product/create" element={<ProductCreate />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/company" element={<Company />} />
                <Route path="/company/user" element={<User />} />
                <Route path="/company/log" element={<Log />} />
                <Route path="/config" element={<Config />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

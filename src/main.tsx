import ReactDOM from "react-dom/client";
import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Storage = lazy(() => import("./pages/Storage/Storage"));
const Product = lazy(() => import("./pages/Product/Product"));
const Sell = lazy(() => import("./pages/Sell/Sell"));
const Company = lazy(() => import("./pages/Company/Company"));
const Clear = lazy(() => import("./pages/Config/Clear"));
const Test = lazy(() => import("./pages/Config/Test"));
const CreateProduct = lazy(() => import("./pages/Product/CreateProduct"));
const CreateClient = lazy(() => import("./pages/Sell/Client/CreateClient"));
const Log = lazy(() => import("./pages/Company/Log"));
const User = lazy(() => import("./pages/Company/User"));
const Shop = lazy(() => import("./pages/Sell/Shop"));
const Client = lazy(() => import("./pages/Sell/Client/Client"));
const CreateSellers = lazy(() => import("./pages/Company/CreateSellers"));
const CreateDeposit = lazy(() => import("./pages/Storage/CreateDeposit"));
const CreateProvider = lazy(() => import("./pages/Company/CreateProvider"));

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/storage" element={<Storage />} />
                <Route path="/storage/create" element={<CreateDeposit />} />
                <Route path="/product" element={<Product />} />
                <Route path="/product/create" element={<CreateProduct />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/client" element={<Client />} />
                <Route path="/shop/client/create" element={<CreateClient />} />
                <Route path="/company" element={<Company />} />
                <Route path="/company/user" element={<User />} />
                <Route
                    path="/company/provider/create"
                    element={<CreateProvider />}
                />
                <Route
                    path="/company/seller/create"
                    element={<CreateSellers />}
                />
                <Route path="/company/log" element={<Log />} />
                <Route path="/config/clear" element={<Clear />} />
                <Route path="/config/test" element={<Test />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

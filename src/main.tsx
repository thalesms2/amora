import ReactDOM from "react-dom/client";
import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout'

const Home = lazy(() => import("./Home"))
const Storage = lazy(() => import("./Storage"))
const Product = lazy(() => import("./Product"))
const Sell = lazy(() => import("./Sell"))
const Company = lazy(() => import("./Company"))
const Config = lazy(() => import("./Config"))
const ProductCreate = lazy(() => import("./ProductCreate"))
const Log = lazy(() => import("./Log"))
const User = lazy(() => import("./User"))
const Shop = lazy(() => import("./Shop"))

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

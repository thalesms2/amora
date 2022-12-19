import ReactDOM from "react-dom/client";
import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout'

const Home = lazy(() => import("./pages/Home"))
const Storage = lazy(() => import("./pages/Storage"))
const Product = lazy(() => import("./pages/Product"))
const Sell = lazy(() => import("./pages/Sell"))
const Company = lazy(() => import("./pages/Company"))
const Clear = lazy(() => import("./pages/Clear"))
const Test = lazy(() => import("./pages/Test"))
const CreateProduct = lazy(() => import("./pages/CreateProduct"))
const CreateClient = lazy(() => import("./pages/CreateClient"))
const Log = lazy(() => import("./pages/Log"))
const User = lazy(() => import("./pages/User"))
const Shop = lazy(() => import("./pages/Shop"))
const Client = lazy(() => import("./pages/Client"))

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
                <Route path="/product" element={<Product />} />
                <Route path="/product/create" element={<CreateProduct />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/client" element={<Client />} />
                <Route path="/shop/client/create" element={<CreateClient />} />
                <Route path="/company" element={<Company />} />
                <Route path="/company/user" element={<User />} />
                <Route path="/company/log" element={<Log />} />
                <Route path="/config/clear" element={<Clear />} />
                <Route path="/config/test" element={<Test />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

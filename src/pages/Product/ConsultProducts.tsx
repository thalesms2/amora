import { Paper } from "@mui/material";
import { toast } from 'react-toastify'
import { useState, useEffect } from "react";

import api from "../../hooks/api";
import promiseResults from "../../hooks/toastPromiseDefault";

import { ContentTable } from "../../components/ContentTable";

import { Product, Column } from "../../types/types"

const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 30, align: "right" },
    { id: "description", label: "Description", minWidth: 200, align: "center" },
    { id: "measurement", label: "Measurement", minWidth: 30, align: "right" },
    { id: "cost", label: "Cost", minWidth: 30, align: "right" },
    { id: "profit", label: "Profit", minWidth: 30, align: "right" },
    { id: "price", label: "Price", minWidth: 30, align: "right" },
];
export default function ConsultProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        async function getProducts() {
            try {
                const { data } = await toast.promise(
                    api.get("/product"), promiseResults) 
                setProducts(data);
            } catch (err) {
                alert("Ocorreu um erro ao buscar os produtos");
            }
        }
        getProducts();
    }, []);
    return (
        <Paper sx={{ 
            padding: "1em",
            margin: "1em",
        }}>
            <ContentTable title="Products" list={products} columns={columns} />
        </Paper>
    );
};
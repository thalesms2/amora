import { Paper } from "@mui/material";

import { ContentTable } from "../../components/ContentTable";
import useProducts from "../../hooks/useProducts";

import { Column } from "../../types/types"

const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 30, align: "right" },
    { id: "description", label: "Description", minWidth: 200, align: "center" },
    { id: "measurement", label: "Measurement", minWidth: 30, align: "right" },
    { id: "cost", label: "Cost", minWidth: 30, align: "right" },
    { id: "profit", label: "Profit", minWidth: 30, align: "right" },
    { id: "price", label: "Price", minWidth: 30, align: "right" },
];
export default function ConsultProducts() {
    const products = useProducts()
    return (
        <Paper sx={{ 
            padding: "1em",
            margin: "1em",
        }}>
            <ContentTable title="Products" list={products} columns={columns} />
        </Paper>
    );
};
import {
    Container,
    Box,
    Typography,
    TableBody,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TablePagination
} from "@mui/material";
import React from "react";
import api from "./lib/api";

interface Product {
    id: number;
    description: string;
    cost: number;
    measurement: string;
    price: number;
    profit: number;
}

interface Column {
    id: "id" | "description" | "cost" | "measurement" | "price" | "profit";
    label: string;
    minWidth?: number;
    align?: "right" | "center";
}

const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 30, align: "right" },
    { id: "description", label: "Description", minWidth: 200, align: "center" },
    { id: "cost", label: "Cost", minWidth: 30, align: "right" },
    { id: "measurement", label: "Measurement", minWidth: 30, align: "right" },
    { id: "price", label: "Price", minWidth: 30, align: "right" },
    { id: "profit", label: "Profit", minWidth: 30, align: "right" },
];

const Product: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [products, setProducts] = React.useState<Product[]>([]);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    React.useEffect(() => {
        async function getProducts() {
            try {
                const { data } = await api.get("/product");
                setProducts(data);
            } catch (err) {
                alert("Ocorreu um erro ao buscar os produtos");
            }
        }
        getProducts();
    }, []);
    return (
        <TableContainer sx={{}}>
            <Typography variant="h3">Products</Typography>
            <Table stickyHeader aria-label="stycky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((product) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={product.id}
                                >
                                    {columns.map((column) => {
                                        const value = product[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default Product;
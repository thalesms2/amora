// {
//     name: String(name),
//     cpf: String(cpf),
//     cityId: Number(cityId),
//     adress: String(adress),
//     neighborhood: String(neighborhood),
//     cep: String(cep),
//     priceTable: Number(priceTable),
// }

import React from "react";
import {
    Paper,
    Typography,
    TableBody,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TablePagination,
} from "@mui/material";
import { toast } from "react-toastify";

import promiseResults from "../../../hooks/toastPromiseDefault";
import api from "../../../hooks/api";

interface Client {
    id: string;
    name: string;
    cpf: string;
    cityId: number;
    adress: string;
    neighborhood: string;
    cep: string;
    priceTable: number;
    status: string;
}

interface Column {
    id: "id" | "name" | "status";
    label: string;
    minWidth?: number;
    align?: "right" | "center";
}

const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 30, align: "right" },
    { id: "name", label: "Name", minWidth: 200, align: "center" },
    { id: "status", label: "Status", minWidth: 30, align: "right" },
];

const Client: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [clients, setClients] = React.useState<Client[]>([]);
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
        async function getClients() {
            try {
                const { data } = await toast.promise(
                    api.get("/client"),
                    promiseResults
                );
                setClients(data);
            } catch (err) {
                alert("Error");
            }
        }
        getClients();
    }, []);
    return (
        <Paper
            sx={{
                padding: "1em",
                margin: "1em",
            }}
        >
            <TableContainer
                sx={{
                    maxHeight: "80vh",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        marginBotton: ".5em",
                    }}
                >
                    Clients
                </Typography>
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
                        {clients
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((client) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={`${client.id} - key`}
                                    >
                                        {columns.map((column) => {
                                            const value = client[column.id];
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
                    rowsPerPageOptions={[10, 15, 30]}
                    component="div"
                    count={clients.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    );
};

export default Client;

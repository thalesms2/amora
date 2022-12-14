import React from "react";
import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { toast } from 'react-toastify'
import api from "../lib/api";
import promiseResults from "../lib/toastPromiseDefault";

interface Column {
    id: "id" | "type" | "description" | "user" | "createdAt";
    label: string;
    minWidth?: number;
    align?: "right" | "center";
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: "id", label: "Id", minWidth: 170 },
    { id: "type", label: "Type", minWidth: 100 },
    {
        id: "description",
        label: "Description",
        minWidth: 170,
    },
    {
        id: "user",
        label: "User",
        minWidth: 170,
    },
    {
        id: "createdAt",
        label: "Created At",
        minWidth: 170,
        format: (value: number) => value.toFixed(2),
    },
];
interface Log {
    id: number;
    type: "CREATE" | "EDIT" | "DELETE" | "LOGIN";
    description: string;
    userId: number;
    createdAt: Date;
}

interface User {
    id: number;
    name: string;
}

const Log: React.FC = () => {
    const [logs, setLogs] = React.useState<Log[]>([]);
    const [users, setUsers] = React.useState<User[]>([]);
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
        async function getAllLogs() {
            try {
                const { data } = await toast.promise(api.get("/log"), promiseResults) 
                setLogs(data);
            } catch (err) {
                alert("Houve um erro ao consultar logs");
            }
        }
        getAllLogs();
    }, []);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{
            padding: "1em",
            margin: "1em",
        }}>
            <TableContainer sx={{
                maxHeight: "75vh",
            }}>
                <Typography 
                    variant="h3"
                    sx={{
                        marginBotton: '.5em',
                    }}
                >Logs</Typography>
                <Table stickyHeader aria-label="sticky table">
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
                        {logs
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((log) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={log.id}
                                    >
                                        {columns.map((column) => {
                                            const value = log[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[15, 30, 100]}
                component="div"
                count={logs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default Log;

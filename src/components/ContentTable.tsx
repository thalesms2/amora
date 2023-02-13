import {
    TableBody,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TablePagination,
    Typography
} from "@mui/material";
import { useState } from 'react'

import { Column } from "../types/types";

interface ContentTableProps {
    title: string;
    list: any[]
    columns: readonly Column[]
}

export function ContentTable(props: ContentTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return(
        <TableContainer sx={{
            maxHeight: "80vh"
        }}>
            <Typography 
                variant="h3"
                sx={{
                    marginBotton: '.5em',
                }}
            >{props.title}</Typography>
            <Table stickyHeader aria-label="stycky table">
                <TableHead>
                    <TableRow>
                        {props.columns.map((column) => (
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
                    {props.list
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((item) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={item.id}
                                >
                                    {props.columns.map((column) => {
                                        const value = item[column.id];
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
                count={props.list.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}
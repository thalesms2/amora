import { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import { toast } from "react-toastify";

import promiseResults from "../../../hooks/toastPromiseDefault";
import api from "../../../hooks/api";

import { Client,  Column } from '../../../types/types'
import { ContentTable } from "../../../components/ContentTable";

const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 30, align: "right" },
    { id: "name", label: "Name", minWidth: 200, align: "center" },
    { id: "status", label: "Status", minWidth: 30, align: "right" },
];

export default function ConsultClients() {
    const [clients, setClients] = useState<Client[]>([])
    useEffect(() => {
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
            <ContentTable title="Clients" list={clients} columns={columns}/>
        </Paper>
    );
};
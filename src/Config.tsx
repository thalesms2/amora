import React from "react";
import { Box, Paper, Button } from '@mui/material'
import api from "./lib/api";

const Config: React.FC = () => {
    const clearLogs = async () => {
        try {
            await api.delete("/log/all");
            alert('Logs excluidos com sucesso!')
        } catch (err) {
            alert("Houve um erro ao tentar conectar a API");
        }
    };
    return (
        <Box>
            <Button onClick={clearLogs}>Clear Logs</Button>
        </Box>
    ) 
};

export default Config;

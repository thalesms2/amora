import React from "react";
import { Box, Paper, Button } from '@mui/material'
import { ToastContainer, toast, Flip } from 'react-toastify'
import api from "./lib/api";

import 'react-toastify/dist/ReactToastify.css';

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
            <Button onClick={() => toast('🦄 toast!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip,
            })}>Toast</Button>
        </Box>
    ) 
};

export default Config;

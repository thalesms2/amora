import React from "react";
import { Box, Paper, Button, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import api from "./lib/api";

import 'react-toastify/dist/ReactToastify.css';

const Config: React.FC = () => {
    const clearLogs = async () => {
        try {
            toast.promise(api.delete("/log/all"), 
            {
                pending: "Loading 😴",
                success: "Loading completed 🥳",
                error: "Error 😦",
            })
            toast('♻️All logs deleted')
        } catch (err) {
            toast('⚠️Error')
        }
    };
    return (
        <Box
            sx={{
                
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    marginBottom: ".5em",
                }}
            >
                Configs
            </Typography>
            <Button 
                onClick={clearLogs}
                sx={{
                    padding: ".5em 1em",
                    marginRight: ".5em",
                }}
            >Clear Logs</Button>
            <Button 
                onClick={() => toast('🦄 toast!')}
                sx={{
                    padding: ".5em 1em",
                }}
            >Testing Toast Totification</Button>
        </Box>
    ) 
};

export default Config;

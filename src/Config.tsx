import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { toast } from "react-toastify";
import api from "./lib/api";

import "react-toastify/dist/ReactToastify.css";

const Config: React.FC = () => {
    const [toastText, setToastText] = React.useState('')

    const clearLogs = async () => {
        try {
            toast.promise(api.delete("/log/all"), {
                pending: "Loading 😴",
                success: "Loading completed 🥳",
                error: "Error 😦",
            });
            toast("All logs deleted ♻️");
        } catch (err) {
            toast("Error⚠️");
        }
    };

    const clearBrands = async () => {

    }
    const clearGroups = async () => {

    }
    const clearMeasurements = async () => {
        
    }

    return (
        <Box sx={{}}>
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
            >
                Clear Logs
            </Button>
            <Button
                onClick={clearBrands}
                sx={{
                    padding: ".5em 1em",
                    marginRight: ".5em",
                }}
            >
                Clear Brands
            </Button>
            <Button
                onClick={clearGroups}
                sx={{
                    padding: ".5em 1em",
                    marginRight: ".5em",
                }}
            >
                Clear Groups
            </Button>
            <Button
                onClick={clearMeasurements}
                sx={{
                    padding: ".5em 1em",
                    marginRight: ".5em",
                }}
            >
                Clear Measurements
            </Button>
            <TextField
                label="Toast Text"
                variant="standard"
                value={toastText}
                onChange={(e) => setToastText(e.target.value)}
            />
            <Button
                onClick={() => toast(`🦄 ${toastText}!`)}
                sx={{
                    padding: ".5em 1em",
                }}
            >
                Testing Toast Totification
            </Button>
            <Button
                onClick={() => toast(`🦄 ${window.sessionStorage.getItem('userId')}!`)}
                sx={{
                    padding: ".5em 1em",
                }}
            >
                User ID
            </Button>
        </Box>
    );
};

export default Config;

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import api from "../../hooks/api";
import promiseResults from "../../hooks/toastPromiseDefault";

const Clear: React.FC = () => {
    const clearLogs = async () => {
        try {
            toast.promise(api.delete("/log/all"), promiseResults);
            toast("All logs deleted ♻️");
        } catch (err) {
            toast("Error⚠️");
        }
    };

    const clearBrands = async () => {
        try {
            toast.promise(api.delete("/brand/all"), promiseResults);
            toast("All brands deleted ♻️");
        } catch (err) {
            toast("Error⚠️");
        }
    };

    const clearGroups = async () => {
        try {
            toast.promise(api.delete("/group/all"), promiseResults);
            toast("All groups deleted ♻️");
        } catch (err) {
            toast("Error⚠️");
        }
    };
    const clearMeasurements = async () => {
        try {
            toast.promise(api.delete("/measurement/all"), promiseResults);
            toast("All measurements deleted ♻️");
        } catch (err) {
            toast("Error⚠️");
        }
    };

    return (
        <Box sx={{}}>
            <Typography
                variant="h3"
                sx={{
                    marginBottom: ".5em",
                }}
            >
                Clear Data
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
        </Box>
    );
};

export default Clear;

import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

import api from "../lib/api";

const CreateDeposit: React.FC = () => {
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    const handleSubmit = async () => {
        try{
            const response = await api.post("/deposit", {
                // info
            });    
            toast('Deposit created 🥳')
        } catch (err) {
            toast('Error 😦')
        }
    };
    const handleClear = async () => {
        setId('')
        setName('')
        setDescription('')
    }

    return (
        <Box>
            <TextField
                autoFocus
                label="ID"
                value={id}
                type="number"
                variant="standard"
                onChange={(e) => setId(String(e.target.value))}
            />
            <TextField
                label="Name"
                value={name}
                type="text"
                variant="standard"
                onChange={(e) => setName(String(e.target.value))}
            />
            <TextField
                label="Description"
                value={description}
                type="text"
                variant="standard"
                onChange={(e) => setDescription(String(e.target.value))}
            />
            <Button
                variant="outlined"
                size="large"
                sx={{
                    marginRight: ".5em",
                }}
                onClick={handleClear}
            >
                Clear
            </Button>
            <Button variant="contained" size="large" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};

export default CreateDeposit;

import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

import api from "../../hooks/api";

const CreateSellers: React.FC = () => {
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [comission, setComission] = React.useState("");
    
    const handleSubmit = async () => {
        try {
            const response = await api.post("/sellers", {
                // info
            });
            toast("Product created 🥳");
        } catch (err) {
            toast("Error 😦");
        }
    };
    const handleClear = async () => {
        setId("");
        setName("");
        setComission("");
    };
    return (
        <Box>
            <TextField
                autoFocus
                margin="dense"
                variant="standard"
                value={id}
                label="ID"
                type="Number"
                onChange={(e) => {
                    setId(String(e.target.value));
                }}
            />
            <TextField
                margin="dense"
                variant="standard"
                value={name}
                label="Name"
                type="text"
                onChange={(e) => {
                    setName(String(e.target.value));
                }}
            />
            <TextField
                margin="dense"
                variant="standard"
                value={comission}
                label="Comission"
                type="number"
                onChange={(e) => {
                    setComission(String(e.target.value));
                }}
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

export default CreateSellers;

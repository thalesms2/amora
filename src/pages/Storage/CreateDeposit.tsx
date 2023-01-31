import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";

import promiseResults from '../lib/toastPromiseDefault'
import api from "../lib/api";
import { handleKeydown } from "../lib/formHooks";

const CreateDeposit: React.FC = () => {
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    const handleSubmit = async () => {
        try{
            const response = await toast.promise(api.post("/deposit", {
                id: Number,
                description: description,
                userId: window.sessionStorage.getItem('userId')
            }), promiseResults)
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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "1em",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    marginBotton: '.5em',
                    alignSelf: "flex-start"
                }}
            >Create a deposit</Typography>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "25vw",
                    padding: "1em",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        marginBottom: ".5em"
                    }}
                >
                    <TextField
                        autoFocus
                        label="ID"
                        value={id}
                        type="number"
                        variant="standard"
                        sx={{
                            width: "5vw"
                        }}
                        onChange={(e) => setId(String(e.target.value))}
                    />
                    <TextField
                        label="Name"
                        value={name}
                        type="text"
                        variant="standard"
                        sx={{
                            marginLeft: ".5em",
                            width: "100%"
                        }}
                        onChange={(e) => setName(String(e.target.value))}
                    />
                </Box>
                <TextField
                    label="Description"
                    value={description}
                    type="text"
                    variant="standard"
                    onKeyDown={(e) => handleKeydown(e, handleSubmit)}
                    onChange={(e) => setDescription(String(e.target.value))}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: ".5em"
                    }}
                >
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
            </Paper>
        </Box>
    );
};

export default CreateDeposit;

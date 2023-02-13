import { useRef } from "react";
import { Typography, Paper, Box, TextField, Autocomplete } from "@mui/material";

import useProvider from "../../hooks/useProvider";

export default function CreateEntry() {
    const idRef = useRef('')
    const providerRef = useRef('')
    const providers = useProvider()
    return (
        <Paper
            elevation={6}
            sx={{
                margin: ".5em",
                padding: ".5em",
                display: "flex",
                flexGrow: 0,
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography variant="h3" sx={{ alignSelf: "flex-start", marginBottom: "1vw", }}>
                Create a new entry
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    marginBottom: ".5em",
                }}
            >
                <TextField 
                    label="ID"
                    inputRef={idRef}
                    type="number"
                    variant="standard"
                    autoFocus
                    sx={{
                        marginRight: "1vw",
                        width: "5vw",
                    }}
                />
                <Autocomplete
                        disablePortal
                        disableClearable
                        options={providers}
                        ref={providerRef}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        sx={{
                            width: "12vw",
                            marginBottom: "1vw",
                            marginRight: "1vw",
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Providers"
                                variant="standard"
                            ></TextField>
                        )}
                    />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    marginBottom: "1vw",
                }}
            >
                <TextField />
                <TextField />
            </Box>
        </Paper>
    );
}

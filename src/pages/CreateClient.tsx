// {
//     name: String(name),
//     cpf: String(cpf),
//     cityId: Number(cityId),
//     adress: String(adress),
//     neighborhood: String(neighborhood),
//     cep: String(cep),
//     birth: birth,
//     priceTable: Number(priceTable),
// }

import React from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Autocomplete,
    Button,
} from "@mui/material";
import api from "../lib/api";

const CreateClient: React.FC = () => {
    const [id, setId] = React.useState<number>(null);
    const [name, setName] = React.useState<string>(null);
    const [cpf, setCpf] = React.useState<string>(null);
    const [cityId, setCityId] = React.useState<number>(null);
    const [state, setState] = React.useState<number>(null);
    const [street, setStreet] = React.useState<string>(null);
    const [number, setNumber] = React.useState<string>(null);
    const [neighborhood, setNeighborhood] = React.useState<string>(null);
    const [cep, setCep] = React.useState<string>(null);
    const [complement, setComplement] = React.useState<string>(null);
    const [birth, setBirth] = React.useState<string>(null);
    const [priceTable, setPriceTable] = React.useState<number>(null);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <Typography variant="h3">Create a new Client</Typography>
            <Paper
                elevation={6}
                sx={{
                    padding: "1em",
                    marginTop: "1em",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box>
                    <TextField
                        label="ID"
                        value={id}
                        onChange={(e) => setId(Number(e.target.value))}
                        variant="standard"
                        autoFocus
                        sx={{
                            marginBottom: ".5em",
                            marginRight: ".5em",
                        }}
                    />
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="standard"
                        sx={{
                            marginBottom: ".5em",
                            marginRight: ".5em",
                        }}
                    />
                    <TextField
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        label="CPF"
                        variant="standard"
                        sx={{
                            marginBottom: ".5em",
                        }}
                    />
                </Box>
                <Box>
                    <TextField
                        value={cityId}
                        onChange={(e) => setCityId(Number(e.target.value))}
                        label="City"
                        variant="standard"
                        sx={{
                            marginBottom: ".5em",
                            marginRight: ".5em",
                        }}
                    />
                    <TextField
                        value={state}
                        onChange={(e) => setState(Number(e.target.value))}
                        label="State"
                        variant="standard"
                        sx={{
                            marginBottom: ".5em",
                            marginRight: ".5em",
                        }}
                    />
                    <TextField
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        label="Street"
                        variant="standard"
                        sx={{
                            marginBottom: ".5em",
                            marginRight: ".5em",
                        }}
                    />
                    <TextField
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        label="Number"
                        variant="standard"
                        sx={{
                            marginBottom: ".5em",
                        }}
                    />
                </Box>
                <Box>
                    <TextField
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        label="Neighborhood"
                        variant="standard"
                        sx={{
                            marginBottom: ".5em",
                            marginRight: ".5em",
                        }}
                    />
                    <TextField
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        label="CEP"
                        variant="standard"
                        sx={{
                            marginBottom: ".5em",
                            marginRight: ".5em",
                        }}
                    />
                    <TextField
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        label="Complement"
                        variant="standard"
                        sx={{
                            marginBottom: ".5em",
                        }}
                    />
                </Box>
                <TextField 
                    label="Birth" 
                    variant="standard" 
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                />
                <TextField 
                    label="Price Table" 
                    variant="standard" 
                    value={priceTable}
                    onChange={(e) => setPriceTable(Number(e.target.value))}
                />
                <Box
                    sx={{
                        alignSelf: "flex-end",
                    }}
                >
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{
                            marginRight: ".5em",
                        }}
                    >
                        Clear
                    </Button>
                    <Button variant="contained" size="large">
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default CreateClient;

import React from 'react'
import {
    Box,
    Paper,
    Typography,
    TextField,
    Autocomplete,
    Button,
} from "@mui/material";

const CreateProvider: React.FC = () => {
    const [id, setId] = React.useState<string>('')
    const [socialName, setSocialName] = React.useState<string>('')
    const [fantasy, setFantasy] = React.useState<string>('')
    const [cnpj, setCnpj] = React.useState<string>('')
    const [ie, setIe] = React.useState<string>('')
    const [cep, setCep] = React.useState<string>('')
    const [street, setStreet] = React.useState<string>('')
    const [neighborhood, setNeighborhood] = React.useState<string>('')
    const [number, setNumber] = React.useState<string>('')
    const [complement, setComplement] = React.useState<string>('')
    function handleClear() {
        return 0
    }
    function handleSubmit() {
        return 0
    }
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
                    padding: ".5em",
                    marginTop: ".5em",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <TextField 
                        label="ID"
                        value={id}
                        type="number"
                        onChange={(e) => setId(e.target.value)}
                        variant="standard"
                        autoFocus
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "5vw",
                        }}
                    />
                    <TextField 
                        label="Social Name"
                        value={socialName}
                        variant="standard"
                        onChange={(e) => setSocialName(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "35vw"
                        }}
                    />
                    <TextField 
                        label="CNPJ"
                        value={cnpj}
                        variant="standard"
                        onChange={(e) => setCnpj(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            width: "15vw",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <TextField 
                        label="Fantasy"
                        value={fantasy}
                        variant="standard"
                        onChange={(e) => setFantasy(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "41vw"
                        }}
                    />
                    <TextField 
                        label="IE"
                        value={ie}
                        variant="standard"
                        onChange={(e) => setIe(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            width: "15vw",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "display",
                    }}
                >
                    <TextField 
                        label="CEP"
                        value={cep}
                        variant="standard"
                        onChange={(e) => setCep(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "15vw",
                        }}
                    />
                    <TextField 
                        label="Street"
                        value={street}
                        variant="standard"
                        onChange={(e) => setStreet(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "35vw"
                        }}
                    />
                    <TextField 
                        label="Number"
                        value={number}
                        variant="standard"
                        onChange={(e) => setNumber(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            width: "5vw",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <TextField 
                        label="Neighborhood"
                        value={neighborhood}
                        variant="standard"
                        onChange={(e) => setNeighborhood(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "41vw"
                        }}
                    />
                    <TextField 
                        label="Complement"
                        value={complement}
                        variant="standard"
                        onChange={(e) => setComplement(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            width: "15vw",
                        }}
                    />
                </Box>
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
    )
}

export default CreateProvider
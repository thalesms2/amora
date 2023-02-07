// {
//     
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
import api from "../../../hooks/api";
import { toast } from "react-toastify";

import promiseResults from '../../../hooks/toastPromiseDefault'

interface City {
    code: number;
    name: string;
}

interface State {
    code: string;
    name: string;
}

const CreateClient: React.FC = () => {
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState<string>("");
    const [cpf, setCpf] = React.useState<string>("");
    const [street, setStreet] = React.useState<string>("");
    const [number, setNumber] = React.useState<string>("");
    const [neighborhood, setNeighborhood] = React.useState<string>("");
    const [cep, setCep] = React.useState<string>("");
    const [complement, setComplement] = React.useState<string>("");
    const [cityValue, setCityValue] = React.useState("");
    const [cityCode, setCityCode] = React.useState<Number>(null);
    const [stateValue, setStateValue] = React.useState("");
    const [stateCode, setStateCode] = React.useState<Number>(null);
    const [citys, setCitys] = React.useState<City[]>([]);
    const [states, setStates] = React.useState<State[]>([]);

    async function getCitys() {
        try {
            const { data } = await api.get("/city");
            const res: any = [];
            data.map((city: City) => {
                res.push({
                    key: `${city.code} - ${city.name}`,
                    label: city.name,
                    content: city.code,
                });
            });
            setCitys(res);
        } catch (err) {
            toast("Error to get citys 😦");
        }
    }
    async function getStates() {
        try {
            const { data } = await api.get("/state");
            const res: any = [];
            data.map((state: State) => {
                res.push({
                    key: `${state.code} - ${state.name}`,
                    label: state.name,
                    content: state.code,
                });
            });
            setStates(res);
        } catch (err) {
            toast("Error to get states 😦");
        }
    }
    React.useEffect(() => {
        getStates();
        getCitys();
    }, []);

    async function handleSubmit() {
        try {
            await toast.promise(api.post("/client", {
                id: Number(id),
                name: String(name),
                cpf: String(cpf),
                cityCode: Number(cityCode),
                cep: String(cep),
                neighborhood: String(neighborhood),
                street: String(street),
                adressNumber: String(number),
                complement: String(complement),
                userId: window.sessionStorage.getItem('userId')
            }), promiseResults)
            toast('Client created 🥳')
            handleClear()
        } catch (err) {
            toast('Error 😦')
        }
    }
    function handleClear() {
        setId('')
        setName('')
        setCpf('')
        setCityCode(null)
        setStateCode(null)
        setCep('')
        setNeighborhood('')
        setStreet('')
        setNumber('')
        setComplement('')
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
                        onChange={(e) => setId(String(e.target.value))}
                        variant="standard"
                        autoFocus
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "6.5vw",
                        }}
                    />
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="standard"
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "30vw",
                        }}
                    />
                    <TextField
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        label="CPF"
                        variant="standard"
                        sx={{
                            marginBottom: "1vw",
                            width: "10w",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <TextField
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        label="CEP"
                        variant="standard"
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "8vw",
                        }}
                    />
                    <Autocomplete
                        disablePortal
                        disableClearable
                        options={states}
                        value={stateValue}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        sx={{
                            width: "12vw",
                            marginBottom: "1vw",
                            marginRight: "1vw",
                        }}
                        onChange={(event: any, state: any) => {
                            setStateCode(state.content);
                            setStateValue(state.label);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="States"
                                variant="standard"
                            ></TextField>
                        )}
                    />
                    <Autocomplete
                        disablePortal
                        disableClearable
                        options={citys}
                        value={cityValue}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        sx={{
                            width: "10vw",
                            marginBottom: "1vw",
                            marginRight: "1vw",
                        }}
                        onChange={(event: any, city: any) => {
                            setCityCode(city.content);
                            setCityValue(city.label);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Citys"
                                variant="standard"
                            ></TextField>
                        )}
                    />

                    <TextField
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        label="Neighborhood"
                        variant="standard"
                        sx={{
                            marginBottom: "1vw",
                            width: "17.5vw",
                        }}
                    />
                </Box>
                <Box>
                    <TextField
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        label="Street"
                        variant="standard"
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "20vw",
                        }}
                    />
                    <TextField
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        label="Number"
                        variant="standard"
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "5vw",
                        }}
                    />
                    <TextField
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        label="Complement"
                        variant="standard"
                        sx={{
                            marginBottom: "1vw",
                            width: "23.5vw",
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
                        onClick={handleClear}
                        sx={{
                            marginRight: ".5em",
                        }}
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

export default CreateClient;

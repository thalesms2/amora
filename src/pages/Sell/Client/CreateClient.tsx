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
import cepApi from "../../../hooks/consultCep";
import { toast } from "react-toastify";

import { usePopup } from "../../../hooks/usePopup";
import promiseResults from '../../../hooks/toastPromiseDefault'


const CreateCity = React.lazy(() => import("../../../components/CreateCity"));
const CreateState = React.lazy(() => import("../../../components/CreateState"));

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
    const [stateCode, setStateCode] = React.useState<String>('');
    const [citys, setCitys] = React.useState<City[]>([]);
    const [states, setStates] = React.useState<State[]>([]);
    const [create, setCreate] = usePopup();

    const numRef = React.useRef(null)

    function checkPress(e) {
        if(e.keyCode == 13 || e.keyCode == 9) {
            e.preventDefault()
            numRef.current.focus()
        }
    }

    async function getCitys(stateCode) {
        try {
            const { data } = await api.get(`/city/all/${stateCode}`);
            const res: any = [];
            data.map((city: City) => {
                res.push({
                    key: `${city.code} - ${city.name}`,
                    label: city.name,
                    content: city.code,
                });
            });
            toast("Got the citys 🥳");
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
            toast("Got the states 🥳");
            setStates(res);
        } catch (err) {
            toast("Error to get states 😦");
        }
    }
    React.useEffect(() => {
        getStates();
    }, []);
    async function selectedStateUpdateCitys(state) {
        setStateCode(state.content);
        setStateValue(state.label);
        getCitys(state.content)
    }
    async function handleCaptureCep() {
        const { data } = await toast.promise(cepApi.get(`/${cep}/json`), promiseResults)
        setStateCode(data.uf);
        const searchStateLabel = states.map((state: any) => {
            if (state.content == data.uf) return state.label
        })
        selectedStateUpdateCitys({content: 'SC' , label: 'Santa Catarina'})
        setStateValue(String(searchStateLabel));
        setCityValue(data.localidade)
        const searchCityCode = citys.map((city:any) => {
            if(city.label == data.localidade) return city.content
        })
        setCityCode(Number(searchCityCode));
        setNeighborhood(data.bairro)
        setStreet(data.logradouro)
    }

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
        setCityValue('')
        setStateCode(null)
        setStateValue('')
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
            {create === 'city' ? <CreateCity getCitys={getCitys} open={create} setCreateCityOpen={setCreate} stateCode={stateCode} />: null}
            {create === 'state' ? <CreateState getStates={getStates} open={create} setCreateStateOpen={setCreate} />: null}
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
                            width: "5vw",
                        }}
                    />
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setCep(String(e.target.value))}
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
                        onKeyDown={(e) => checkPress(e)}
                        label="CEP"
                        variant="standard"
                        onBlur={(e) => handleCaptureCep()}
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
                            selectedStateUpdateCitys(state)
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
                        inputRef={numRef}
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

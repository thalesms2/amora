import React from 'react'
import {
    Box,
    Paper,
    Typography,
    TextField,
    Autocomplete,
    Button,
} from "@mui/material";
import { toast } from "react-toastify"
import { usePopup } from '../../hooks/usePopup';
import promiseResults from '../../hooks/toastPromiseDefault';
import cepApi from '../../hooks/consultCep';
import api from '../../hooks/api';


interface City {
    code: number;
    name: string;
}

interface State {
    code: string;
    name: string;
}

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
    const [cityValue, setCityValue] = React.useState("");
    const [cityCode, setCityCode] = React.useState<Number>(null);
    const [stateValue, setStateValue] = React.useState("");
    const [stateCode, setStateCode] = React.useState<String>('');
    const [citys, setCitys] = React.useState<City[]>([]);
    const [states, setStates] = React.useState<State[]>([]);
    const [create, setCreate] = usePopup();
    
    const numRef = React.useRef(null)

    async function handleSubmit() {
        try {
            await toast.promise(api.post("/provider", {
                id: Number(id),
                socialName: String(socialName),
                fantasyName: String(fantasy),
                cnpj: String(cnpj),
                ie: String(ie),
                cep: String(cep),
                cityCode: Number(cityCode),
                street: String(street),
                adressNumber: String(number),
                neighborhood: String(neighborhood),
                complement: String(complement),
                userId: window.sessionStorage.getItem('userId')
            }), promiseResults)
            toast('Provider created 🥳')
            handleClear()
        } catch (err) {
            console.log(err)
            toast('Error 😦')
        }
    }
    function handleClear() {
        setId('')
        setSocialName('')
        setFantasy('')
        setCnpj('')
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
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <Typography variant="h3">Create a new Provider</Typography>
            <Paper
                elevation={6}
                sx={{
                    padding: "5.em",
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
                            width: "25vw"
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
                            width: "36vw"
                        }}
                    />
                    <TextField 
                        label="IE"
                        value={ie}
                        variant="standard"
                        onChange={(e) => setIe(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            width: "10vw",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <TextField 
                        label="CEP"
                        value={cep}
                        variant="standard"
                        onChange={(e) => setCep(e.target.value)}
                        onKeyDown={(e) => checkPress(e)}
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
                        label="Street"
                        value={street}
                        variant="standard"
                        onChange={(e) => setStreet(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            width: "14vw"
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
                            width: "25vw"
                        }}
                    />
                    <TextField 
                        label="Number"
                        value={number}
                        variant="standard"
                        inputRef={numRef}
                        onChange={(e) => setNumber(e.target.value)}
                        sx={{
                            marginBottom: "1vw",
                            marginRight: "1vw",
                            width: "5vw",
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
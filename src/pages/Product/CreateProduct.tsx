import React, { lazy } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Autocomplete,
    InputAdornment,
    Input,
    FormControl,
    InputLabel,
    Button,
} from "@mui/material";
import { useOutletContext } from 'react-router-dom'
import { toast } from "react-toastify";

import api from "../../lib/api";

const CreateBrand = lazy(() => import("../../components/CreateBrand"))
const CreateGroup = lazy(() => import("../../components/CreateGroup"))
const CreateMeasurement = lazy(() => import("../../components/CreateMeasurement"))

interface Brand {
    id: number;
    description: string;
}

interface Group {
    id: number;
    description: string;
}

interface Measurement {
    id: number;
    description: string;
    initials: string;
}

const ButtonStyle = (position?: String) =>{
    return {
        width: "15vw",
        marginBottom: "1vw",
        marginRight: position == 'right' ? "1vw" : '',
        height: '10vh',
    }
} 

const CreateProduct: React.FC = () => {
    const [brands, setBrands] = React.useState<Brand[]>([]);
    const [groups, setGroups] = React.useState<Group[]>([]);
    const [measurements, setMeasurements] = React.useState<Measurement[]>([]);
    const [description, setDescription] = React.useState<String>('');
    const [cost, setCost] = React.useState<String>('');
    const [profit, setProfit] = React.useState<String>('');
    const [price, setPrice] = React.useState<String>('');
    const [brandValue, setBrandValue] = React.useState<String>('');
    const [groupValue, setGroupValue] = React.useState<String>('');
    const [measurementValue, setMeasurementValue] = React.useState<String>('');
    const [brandId, setBrandId] = React.useState<Number>(null);
    const [groupId, setGroupId] = React.useState<Number>(null);
    const [measurementId, setMeasurementId] = React.useState<Number>(null);
    // const [create, setCreate] = React.useState<"brand" | "group" | "measurement" |"closed">('closed')
    const [create, setCreate] = useOutletContext();
    async function getBrands() {
        try {
            const { data } = await api.get("/brand")
            const res: any = []
            data.map((brand: Brand) => {
                res.push({
                    key: `${brand.id} - ${brand.description}`,
                    label: brand.description,
                    content: brand.id
                })
            })
            setBrands(res)
        } catch (err) {
            toast('Error to get brands 😦')
        }
    }
    async function getGroups() {
        try {
            const { data } = await api.get("/group")
            const res: any = []
            data.map((group: Group) => {
                res.push({
                    key: `${group.id} - ${group.description}`,
                    label: group.description,
                    content: group.id
                })
            })
            setGroups(res)
        } catch (err) {
            toast('Error to get groups 😦')
            console.log(err)
        }
    }
    async function getMeasurements() {
        try {
            const { data } = await api.get("/measurement")
            const res: any = []
            data.map((measurement: Measurement) => {
                res.push({
                    key: `${measurement.id} - ${measurement.description}`,
                    label: `${measurement.initials} | ${measurement.description}`,
                    content: measurement.id
                })
            })
            setMeasurements(res)
        } catch (err) {
            toast('Error to get measurement 😦')
            console.log(err)
        }
    }
    React.useEffect(() => {
        getBrands()
        getGroups()
        getMeasurements()
    }, [])
    const handleSubmit = async () => {
        try{
            const response = await api.post("/product", {
                description: description,
                cost: cost,
                profit: profit,
                price: price,
                brandId: brandId,
                groupId: groupId,
                measurementId: measurementId,
            });    
            toast('Product created 🥳')
        } catch (err) {
            toast('Error 😦')
        }
    };
    const handleClear = async () => {
        setDescription('')
        setCost('')
        setProfit('')
        setPrice('')
        setBrandValue('')
        setBrandId(0)
        setGroupValue('')
        setGroupId(0)
        setMeasurementValue('')
        setMeasurementId(0)
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
            {create === 'brand' ? <CreateBrand getBrands={getBrands} open={create} setCreateBrandOpen={setCreate} />: null}
            {create === 'group' ? <CreateGroup getGroups={getGroups} open={create} setCreateGroupOpen={setCreate} />: null}
            {create === 'measurement' ? <CreateMeasurement getMeasurements={getMeasurements} open={create} setCreateMeasurementOpen={setCreate} />: null}
            <Typography variant="h3">Create a new product</Typography>
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
                <TextField
                    label="Description"
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        marginBottom: "1vw",
                        width: "47vw",
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Autocomplete
                        disablePortal
                        disableClearable
                        options={brands}
                        value={brandValue}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        sx={{
                            width: "15vw",
                            marginBottom: "1vw",
                            marginRight: "1vw",
                        }}
                        onChange={(event: any, brand:any) => {
                            setBrandId(brand.content);
                            setBrandValue(brand.label)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Brands" variant="standard" ></TextField>
                        )}
                    />
                    <Autocomplete
                        disableClearable
                        disablePortal
                        options={groups}
                        value={groupValue}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        sx={{
                            width: "15vw",
                            marginBottom: "1vw",
                            marginRight: "1vw",
                        }}
                        onChange={(event: any, group:any) => {
                            setGroupId(group.content);
                            setGroupValue(group.label);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} variant="standard" label="Groups"></TextField>
                        )}
                    />
                    <Autocomplete
                        disablePortal
                        disableClearable
                        options={measurements}
                        value={measurementValue}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        sx={{
                            width: "15vw",
                            marginBottom: "1vw",
                        }}
                        onChange={(event: any, measurement:any) => {
                            setMeasurementId(measurement.content);
                            setMeasurementValue(measurement.label)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} variant="standard" label="Measurements"></TextField>
                        )}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Button
                        onClick={() => setCreate('brand')}
                        variant="contained"
                        sx={ ButtonStyle('right') }
                    >New Brand</Button>
                    <Button
                        onClick={() => setCreate('group')}
                        variant="contained"
                        sx={ ButtonStyle('right') }
                    >New Group</Button>
                    <Button
                        onClick={() => setCreate('measurement')}
                        variant="contained"
                        sx={ ButtonStyle() }
                    >New Measurement</Button>
                </Box>
                <Box>
                    <TextField
                        label="Cost"
                        type="number"
                        variant="standard"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        sx={{
                            width: "15vw",
                            marginBottom: "1vw",
                            marginRight: "1vw",
                        }}
                    />
                    <FormControl variant="standard">
                        <InputLabel>Profit</InputLabel>
                        <Input
                            value={profit}
                            onChange={(e) => setProfit(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            }
                            aria-describedby="standard-profit-helper-text"
                            inputProps={{
                                "aria-label": "profit",
                            }}
                            sx={{
                                marginBottom: "1vw",
                                marginRight: "1vw",
                                width: "15vw",
                            }}
                        />
                    </FormControl>
                    <TextField
                        label="Price"
                        type="number"
                        variant="standard"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        sx={{
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
                        variant="contained"
                        size="large"
                        sx={{
                            marginRight: "1vw",
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

export default CreateProduct;

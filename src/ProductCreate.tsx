import React from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Autocomplete,
    InputAdornment,
    OutlinedInput,
    FormControl,
    FormHelperText,
    Button,
} from "@mui/material";
import api from "./lib/api";
import { toast } from "react-toastify";

interface Brand {
    id: number;
    description: string;
}

interface Group {
    id: number;
    description: string;
}

const measurements = [
    { label: "Peça", content: "PC" },
    { label: "Unidade", content: "UN" },
    { label: "Kilograma", content: "KG" },
    { label: "Litro", content: "LT" },
];

const ProductCreate: React.FC = () => {
    const [brands, setBrands] = React.useState<Brand[]>([]);
    const [groups, setGroups] = React.useState<Group[]>([]);
    const [description, setDescription] = React.useState<String>("");
    const [measurement, setMeasurement] = React.useState<String>("");
    const [cost, setCost] = React.useState<String>("");
    const [profit, setProfit] = React.useState<String>("");
    const [price, setPrice] = React.useState<String>("");
    const [brandValue, setBrandValue] = React.useState<String>("");
    const [groupValue, setGroupValue] = React.useState<String>("");
    const [brandId, setBrandId] = React.useState<Number>(0);
    const [groupId, setGroupId] = React.useState<Number>(0);

    React.useEffect(() => {
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
            }
        }
        getBrands()
        getGroups()
    }, [])
    const handleSubmit = async () => {
        try{
            const response = await api.post("/product", {
                description: description,
                measurement: measurement,
                cost: cost,
                profit: profit,
                price: price,
                brandId: brandId,
                groupId: groupId,
            });    
            toast('Product created 🥳')
        } catch (err) {
            toast('Error 😦')
        }
    };
    const handleClear = async () => {
        setDescription('')
        setMeasurement('')
        setCost('')
        setProfit('')
        setPrice('')
        setBrandValue('')
        setBrandId(0)
        setGroupValue('')
        setGroupId(0)
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
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        marginBottom: ".5em",
                        width: "50vw",
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
                        disableClearable={false}
                        options={brands}
                        value={brandValue}
                        sx={{
                            width: "15vw",
                            marginBottom: ".5em",
                            marginRight: ".5em",
                        }}
                        onChange={(event: any, brand:any) => {
                            setBrandId(brand.content);
                            setBrandValue(brand.label)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Brands"></TextField>
                        )}
                    />
                    <Autocomplete
                        disablePortal
                        options={groups}
                        value={groupValue}
                        sx={{
                            width: "15vw",
                            marginBottom: ".5em",
                            marginRight: ".5em",
                        }}
                        onChange={(event: any, group:any) => {
                            setGroupId(group.content);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Groups"></TextField>
                        )}
                    />
                    <Autocomplete
                        disablePortal
                        options={measurements}
                        sx={{
                            width: "15vw",
                            marginBottom: ".5em",
                        }}
                        onChange={(event: any, measurement:any) => {
                            setMeasurement(measurement.content);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Measurements"></TextField>
                        )}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Cost"
                        type="number"
                        variant="outlined"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        sx={{
                            width: "15vw",
                            marginBottom: ".5em",
                            marginRight: ".5em",
                        }}
                    />
                    <FormControl variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-profit"
                            value={profit}
                            onChange={(e) => setProfit(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            }
                            aria-describedby="outlined-profit-helper-text"
                            inputProps={{
                                "aria-label": "profit",
                            }}
                            sx={{
                                marginBottom: ".5em",
                                marginRight: ".5em",
                                width: "15vw",
                            }}
                        />
                        <FormHelperText id="outlined-profit-helper-text">
                            Profit
                        </FormHelperText>
                    </FormControl>
                    <TextField
                        label="Price"
                        type="number"
                        variant="outlined"
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

export default ProductCreate;

import React from 'react'
import {
    Autocomplete,
    Box,
    TextField
} from '@mui/material'
import { toast } from 'react-toastify';

import api from "../lib/api";

interface City {
    code: String
    name: String
}

interface State {
    code: String
    name: String
    citys: City[]
}
const CreateCityAndState: React.FC = () => {
    const [states, setStates] = React.useState<State[] | Promise<State[]>>(async () => {
        try{
            const { data } = await api.get("/state")
            return (data)
        } catch(err) {
            toast('Error to get the states 😦')
        }
    })
    const [stateValue, setStateValue] = React.useState<String>('')
    const [stateCode, setStateCode] = React.useState<String>('')
    return (
        <Box>
            <Autocomplete
                disablePortal
                disableClearable
                options={states}
                value={stateValue}
                isOptionEqualToValue={(option, value) => option.id === value.code}
                sx={{
                    width: "15vw",
                }}
                onChange={(event: any, state: any) => {
                    setStateCode(state.code)
                    setStateValue(state.label)
                }}
                renderInput={(params) => (
                    <TextField {...params} label="State"></TextField>
                )}
            >
                
            </Autocomplete>
        </Box>
    )
}

export default CreateCityAndState
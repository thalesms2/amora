import React from 'react'
import {
    Autocomplete,
    Box,
    TextField
} from '@mui/material'
import { toast } from 'react-toastify';

import api from "../../hooks/api";

interface City {
    code: String
    name: String
}

interface State {
    code: String
    name: String
    citys: City[]
    key: String
    label: String
    content: String
}
const CreateCityAndState: React.FC = () => {
    const [states, setStates] = React.useState<State[]>([])
    const [stateValue, setStateValue] = React.useState<String>('')
    const [stateCode, setStateCode] = React.useState<String>('')
    React.useEffect(() => {
        getStates()
    }, [])
    async function getStates() {
        try{
            const { data } = await api.get("/state")
            const res: any = []
            data.map((state: State) => {
                res.pus({
                    key:`${state.code} - ${state.name}`,
                    label: state.name,
                    content: state.name
                })
            })
            setStates(res)
        } catch(err) {
            toast('Error to get the states 😦')
        }
    }
    return (
        <Box>
            <Autocomplete
                disablePortal
                disableClearable
                options={states}
                value={stateValue}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
            />
        </Box>
    )
}

export default CreateCityAndState
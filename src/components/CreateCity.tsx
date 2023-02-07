import React from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";

import api from "../hooks/api";
import promiseResults from '../hooks/toastPromiseDefault'
import { handleKeydown } from "../hooks/formHooks";

interface CreateCityProps {
    open: String;
    setCreateCityOpen: React.Dispatch<React.SetStateAction<string>>;
    getCitys: (stateCode: any) => Promise<void>;
    stateCode: String
}

const CreateCity: React.FC<CreateCityProps> = (props) => {
    const open = props.open == "city";
    const [id, setId] = React.useState('')
    const [description, setDescription] = React.useState('')

    const handleSubmit = async () => {
        try {
            await toast.promise(api.post("/brand", {
                id: id,
                description: description,
                userId: window.sessionStorage.getItem('userId')
            }), promiseResults)
            toast('Brand created! 😎')
            props.getCitys(props.stateCode);
            props.setCreateCityOpen('closed')
        } catch (err) {
            toast('Error 😦😦')
            console.error(err)
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={() => props.setCreateCityOpen('close')}
        >
            <DialogTitle>Create New Brand</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    label="ID"
                    type="number"
                    variant="standard"
                    value={id}
                    sx={{
                        marginRight: '1vw',
                        width: '5vw',
                    }}
                    onChange={(e) => setId(String(e.target.value))}
                />
                <TextField
                    label="Description"
                    type="text"
                    variant="standard"
                    onKeyDown={(e) => handleKeydown(e, handleSubmit)}
                    value={description}
                    sx={{
                        width: '20vw',
                    }}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setCreateCityOpen('close')}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateCity;

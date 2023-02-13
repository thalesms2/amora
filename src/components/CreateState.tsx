import { useState, Dispatch, SetStateAction } from "react";
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

interface CreateStateProps {
    open: String;
    setCreateStateOpen: Dispatch<SetStateAction<string>>;
    getStates: () => void;
}

export default function CreateState(props: CreateStateProps) {
    const open = props.open == "state";
    const [id, setId] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async () => {
        try {
            await toast.promise(api.post("/brand", {
                id: id,
                description: description,
                userId: window.sessionStorage.getItem('userId')
            }), promiseResults)
            toast('Brand created! 😎')
            props.getStates();
            props.setCreateStateOpen('closed')
        } catch (err) {
            toast('Error 😦😦')
            console.error(err)
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={() => props.setCreateStateOpen('close')}
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
                <Button onClick={() => props.setCreateStateOpen('close')}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};
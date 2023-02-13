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

interface CreateGroupProps {
    open: String;
    setCreateGroupOpen: Dispatch<SetStateAction<string>>;
    getGroups: () => void;
}

export default function CreateGroup(props: CreateGroupProps) {
    const open = props.open == "group";
    const [id, setId] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async () => {
        try {
            await toast.promise(api.post("/group", {
                id: id,
                description: description,
                userId: window.sessionStorage.getItem('userId'),
            }), promiseResults)
            toast('Group created! 😎')
            props.getGroups()
            props.setCreateGroupOpen('close')
        } catch (err) {
            toast('Error 😦😦')
            console.log(err)
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={() => props.setCreateGroupOpen('close')}
        >
            <DialogTitle>Create New Group</DialogTitle>
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
                    onChange={(e) => setId(e.target.value)}
                />
                <TextField
                    label="Description"
                    type="text"
                    variant="standard"
                    sx={{
                        width: '20vw',
                    }}
                    onKeyDown={(e) => handleKeydown(e, handleSubmit)}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setCreateGroupOpen('close')}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};
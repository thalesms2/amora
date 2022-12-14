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
import api from "../lib/api";
import promiseResults from '../lib/toastPromiseDefault'

interface CreateGroupProps {
    open: String;
    setCreateGroupOpen: React.Dispatch<React.SetStateAction<string>>;
    getGroups: () => void;
}

const CreateGroup: React.FC<CreateGroupProps> = (props) => {
    const open = props.open == "group";
    const [description, setDescription] = React.useState<String>(null)

    const handleKeydown = async (e: React.KeyboardEvent) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await toast.promise(api.post("/group", {
                description: description,
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
                    label="Description"
                    type="text"
                    variant="standard"
                    onKeyDown={handleKeydown}
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

export default CreateGroup;

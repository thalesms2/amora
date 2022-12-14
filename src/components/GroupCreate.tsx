import React from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@mui/material";
import { toast } from "react-toastify";
import api from "../lib/api";

interface GroupCreateProps {
    open: String;
    setGroupCreateOpen: React.Dispatch<React.SetStateAction<string>>;
}

const GroupCreate: React.FC<GroupCreateProps> = (props) => {
    const open = props.open == "group";
    const [description, setDescription] = React.useState<String>('')

    const handleKeydown = async (e: React.KeyboardEvent) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post("/group", {
                description: description,
            })
            toast('Group created! 😎')
            props.setGroupCreateOpen('close')
        } catch (err) {
            toast('Error 😦😦')
            console.log(err)
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={() => props.setGroupCreateOpen('close')}
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
                <Button onClick={() => props.setGroupCreateOpen('close')}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GroupCreate;
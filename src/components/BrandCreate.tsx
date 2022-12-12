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

interface BrandCreateProps {
    open: String;
    setBrandCreateOpen: React.Dispatch<React.SetStateAction<string>>;
}

const BrandCreate: React.FC<BrandCreateProps> = (props) => {
    const open = props.open == "brand";
    const [description, setDescription] = React.useState<String>('')

    const handleKeydown = async (e: React.KeyboardEvent) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const response = await toast.promise(
                api.post("/brand", {
                    description: description,
                }),
                {
                    pending: "Loading 😴",
                    success: "Loading completed 🥳",
                    error: "Error 😦",
                }
            ) 
            toast('Brand created! 😎')
            props.setBrandCreateOpen('close')
        } catch (err) {
            toast('Error 😦😦')
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={() => props.setBrandCreateOpen('close')}
        >
            <DialogTitle>Create New Brand</DialogTitle>
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
                <Button onClick={() => props.setBrandCreateOpen('close')}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BrandCreate;

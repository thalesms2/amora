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

interface CreateBrandProps {
    open: String;
    setCreateBrandOpen: React.Dispatch<React.SetStateAction<string>>;
    getBrands: () => void;
}

const CreateBrand: React.FC<CreateBrandProps> = (props) => {
    const open = props.open == "brand";
    const [description, setDescription] = React.useState<String>(null)

    const handleKeydown = async (e: React.KeyboardEvent) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await toast.promise(api.post("/brand", {
                description: description,
                userId: window.sessionStorage.getItem('userId')
            }), promiseResults)
            toast('Brand created! 😎')
            props.getBrands();
            props.setCreateBrandOpen('closed')
        } catch (err) {
            toast('Error 😦😦')
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={() => props.setCreateBrandOpen('close')}
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
                <Button onClick={() => props.setCreateBrandOpen('close')}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateBrand;

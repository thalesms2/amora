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

interface MeasurementCreateProps {
    open: String;
    setMeasurementCreateOpen: React.Dispatch<React.SetStateAction<string>>;
}

const MeasurementCreate: React.FC<MeasurementCreateProps> = (props) => {
    const open = props.open == "brand";
    const [description, setDescription] = React.useState<String>('')

    const handleKeydown = async (e: React.KeyboardEvent) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post("/measurement", {
                description: description,
                userId: window.sessionStorage.getItem('userId')
            })
            toast('Measument created! 😎')
            props.setMeasurementCreateOpen('closed')
        } catch (err) {
            toast('Error 😦😦')
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={() => props.setMeasurementCreateOpen('close')}
        >
            <DialogTitle>Create New Measurement</DialogTitle>
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
                <Button onClick={() => props.setMeasurementCreateOpen('close')}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MeasurementCreate;

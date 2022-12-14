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
    getMeasurements: () => void;
}

const MeasurementCreate: React.FC<MeasurementCreateProps> = (props) => {
    const open = props.open == "measurement";
    const [description, setDescription] = React.useState<String>('')
    const [initials, setInitials] = React.useState<String>('')

    const handleKeydown = async (e: React.KeyboardEvent) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await toast.promise(api.post("/measurement", {
                description: description,
                initials: initials,
                userId: window.sessionStorage.getItem('userId')
            }),{
                pending: "Loading 😴",
                success: "Loading completed 🥳",
                error: "Error 😦",
            })
            toast('Measument created! 😎')
            props.getMeasurements()
            props.setMeasurementCreateOpen('closed')
        } catch (err) {
            toast('Error 😦😦')
            console.log(err)
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={() => props.setMeasurementCreateOpen('close')}
        >
            <DialogTitle>Create New Measurement</DialogTitle>
            <DialogContent 
                sx={{ 
                    display: "flex",
                    flexDirection: "column",
            }}>
                <TextField
                    autoFocus
                    label="Description"
                    type="text"
                    variant="standard"
                    value={description}
                    sx={{
                        marginBottom: ".5em",
                    }}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Initials"
                    type="text"
                    variant="standard"
                    onKeyDown={handleKeydown}
                    value={initials}
                    onChange={(e) => setInitials(e.target.value)}
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

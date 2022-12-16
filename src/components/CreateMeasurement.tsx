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
import promiseResults from "../lib/toastPromiseDefault";

interface CreateMeasurementProps {
    open: String;
    setCreateMeasurementOpen: React.Dispatch<React.SetStateAction<string>>;
    getMeasurements: () => void;
}

const CreateMeasurement: React.FC<CreateMeasurementProps> = (props) => {
    const open = props.open == "measurement";
    const [description, setDescription] = React.useState<String>(null)
    const [initials, setInitials] = React.useState<String>(null)

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
            }), promiseResults)
            toast('Measument created! 😎')
            props.getMeasurements()
            props.setCreateMeasurementOpen('closed')
        } catch (err) {
            toast('Error 😦😦')
            console.log(err)
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={() => props.setCreateMeasurementOpen('close')}
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
                <Button onClick={() => props.setCreateMeasurementOpen('close')}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateMeasurement;

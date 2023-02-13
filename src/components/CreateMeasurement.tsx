import { useState, SetStateAction, Dispatch } from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
} from "@mui/material";
import { toast } from "react-toastify";

import api from "../hooks/api";
import promiseResults from "../hooks/toastPromiseDefault";
import { handleKeydown } from "../hooks/formHooks";

interface CreateMeasurementProps {
    open: String;
    setCreateMeasurementOpen: Dispatch<SetStateAction<string>>;
    getMeasurements: () => void;
}

export default function CreateMeasurement(props: CreateMeasurementProps) {
    const open = props.open == "measurement";
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const [initials, setInitials] = useState("");

    const handleSubmit = async () => {
        try {
            await toast.promise(
                api.post("/measurement", {
                    id: id,
                    description: description,
                    initials: initials,
                    userId: window.sessionStorage.getItem("userId"),
                }),
                promiseResults
            );
            toast("Measument created! 😎");
            props.getMeasurements();
            props.setCreateMeasurementOpen("closed");
        } catch (err) {
            toast("Error 😦😦");
            console.log(err);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => props.setCreateMeasurementOpen("close")}
        >
            <DialogTitle>Create New Measurement</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    label="ID"
                    type="number"
                    variant="standard"
                    value={id}
                    sx={{
                        marginRight: "1vw",
                        width: "5vw",
                    }}
                    onChange={(e) => setId(e.target.value)}
                />
                <TextField
                    label="Description"
                    type="text"
                    variant="standard"
                    value={description}
                    sx={{
                        width: "20vw",
                        marginRight: '1vw',
                    }}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Initials"
                    type="text"
                    variant="standard"
                    sx={{
                        width: '5vw',
                    }}
                    onKeyDown={(e) => handleKeydown(e, handleSubmit)}
                    value={initials}
                    onChange={(e) => setInitials(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setCreateMeasurementOpen("close")}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};
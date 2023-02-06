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

import api from "../hooks/api";
import promiseResults from "../hooks/toastPromiseDefault";
import { handleKeydown } from "../hooks/formHooks";

interface EditUserProps {
    open: String;
    setEdit: React.Dispatch<React.SetStateAction<string>>;
    id: Number;
    getAllUsers: () => void
}

const EditUser: React.FC<EditUserProps> = (props) => {
    const [name, setName] = React.useState<String>(null);
    const [password, setPassword] = React.useState<String>(null);
    const open = props.open == "open";

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try{
            const response = await toast.promise(
                api.put("/user", {
                    id: props.id,
                    name: name,
                    password: password,
                }), promiseResults);
            toast("User edited 🥳");
        } catch (err) {
            toast("Wrong ID or Password 🥶");
            console.error(err)
        }
        props.getAllUsers()
        props.setEdit("closed");
    };
    return (
        <Dialog open={open}>
            <DialogTitle>Edit user</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    value={name}
                    onChange={(e) => setName(String(e.target.value))}
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onKeyDown={(e) => handleKeydown(e, handleSubmit)}
                />
                <TextField
                    margin="dense"
                    value={password}
                    onChange={(e) => setPassword(String(e.target.value))}
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onKeyDown={(e) => handleKeydown(e, handleSubmit)}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={() => props.setEdit('close')}>
                    Close
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUser;

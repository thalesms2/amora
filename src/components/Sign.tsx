import React from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { toast, Flip } from 'react-toastify'
import api from "../lib/api";

interface SignProps {
    open: String;
    setLogin: React.Dispatch<React.SetStateAction<string>>;
}

const Sign: React.FC<SignProps> = (props) => {
    const [name, setName] = React.useState<String>("");
    const [password, setPassword] = React.useState<String>("");
    const open = props.open == "sign";
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const response = await toast.promise(
            api.post("/user/create", {
                name: name,
                password: password,
            }),
            {
                pending: "Promise is pending",
                success: "Promise resolved 👌",
                error: "Promise rejected 🤯",
            }
        )
        if (response.data.sucess) {
            toast(`💾 Signed up Id - ${response.data.create.id}`)
            props.setLogin("login");
        } else {
            toast('⚠️Error')
        }
    };
    const handleLogin = () => {
        props.setLogin("login");
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Sign In</DialogTitle>
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
                />
                <TextField
                    margin="dense"
                    value={password}
                    onChange={(e) => setPassword(String(e.target.value))}
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button onClick={handleLogin}>Login</Button>
                <Button onClick={handleSubmit}>Sign In</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Sign;

import React from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { toast } from 'react-toastify'
import api from "../lib/api";

interface SignProps {
    open: String;
    setLogin: React.Dispatch<React.SetStateAction<string>>;
}

const Sign: React.FC<SignProps> = (props) => {
    const [name, setName] = React.useState<String>("");
    const [password, setPassword] = React.useState<String>("");
    const open = props.open == "sign";
    
    const handleKeydown = async(e: React.KeyboardEvent) => {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            handleSubmit(e)
        }
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const response = await toast.promise(
            api.post("/user/create", {
                name: name,
                password: password,
            }),
            {
                pending: "Loading 😴",
                success: "Loading completed 🥳",
                error: "Error 😦",
            }
        )
        if (response.data.sucess) {
            toast(`Signed up Id - ${response.data.create.id} 💾`)
            props.setLogin("login");
        } else {
            toast('Error ⚠️')
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
                    onKeyDown={handleKeydown}
                />
                <TextField
                    margin="dense"
                    value={password}
                    onChange={(e) => setPassword(String(e.target.value))}
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onKeyDown={handleKeydown}
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

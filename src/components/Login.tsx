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
import { handleKeydown } from "../lib/formHooks";

interface LoginProps {
    open: String;
    setLogin: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = (props) => {
    const [id, setId] = React.useState<String>('');
    const [password, setPassword] = React.useState<String>('');
    const open = props.open == "login";
    
    const handleSubmit = async () => {
        try{
            const response = await toast.promise(
                api.post("/user", {
                    id: Number(id),
                    password: password,
                }), promiseResults);
                if (response.data.login) {
                    window.sessionStorage.setItem("userId", response.data.id);
                    window.sessionStorage.setItem("name", response.data.name);
                    window.sessionStorage.setItem("login", response.data.login);
                    toast("Logged! 🥳");
                    props.setLogin("logged");
                } else {
                    toast("Wrong ID or Password 🥶");
                }
        } catch(err) {
            toast("Error")
            console.error(err)
        }
    };
    const handleSign = () => {
        props.setLogin("sign");
    };
    return (
        <Dialog open={open}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    value={id}
                    onChange={(e) => setId(String(e.target.value))}
                    label="ID"
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
                    onKeyDown={(e)=> handleKeydown(e, handleSubmit)}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={handleSign}>Sign In</Button>
                <Button variant="contained" type="submit" onClick={handleSubmit}>Log In</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Login;

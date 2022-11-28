import React from "react";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import api from "../lib/api";

interface LoginProps {
    open: String;
    setLogin: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = (props) => {
    const [id, setId] = React.useState<String>('');
    const [password, setPassword] = React.useState<String>('');
    const open = props.open == 'login'

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        api.post("/user", {
            id: Number(id),
            password: password,
        }).then((response) => {
            if (response.data.login) {
                window.sessionStorage.setItem("userId", response.data.id);
                window.sessionStorage.setItem("name", response.data.name);
                window.sessionStorage.setItem("login", response.data.login);
                props.setLogin('logged');
            } else {
                console.log(response);
            }
        });
    };
    const handleSign = () => {
        props.setLogin('sign')
    }
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
                <Button onClick={handleSign}>Sign In</Button>
                <Button onClick={handleSubmit}>Log In</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Login;

import React from "react";
import TextField from "@mui/material/TextField";
import api from "../lib/api"

const Login: React.FC = () => {
    const [id, setId] = React.useState<String>('');
    const [password, setPassword] = React.useState<String>('');
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        api.post("/user", {
            name: Number(id),
            password: password
        }).then((response) => {
            console.log('funcionou')
        })
    };
    return (
        <form>
            <TextField
                value={id}
                type="text"
                onChange={(e) => setId(String(e.target.value))}
                label="ID"
                variant="standard"
            />
            <TextField
                value={password}
                type="password"
                onChange={(e) => setPassword(String(e.target.value))}
                label="PASSWORD"
                variant="standard"
            />
            <input type="submit" value="Sign In" onClick={handleSubmit} />
        </form>
    );
};

export default Login;

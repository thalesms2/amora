import React from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    Box,
    Tooltip,
    FormLabel
} from "@mui/material";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from "react-toastify";
import api from "../lib/api";
import { handleKeydown } from "../lib/formHooks";

interface SignProps {
    open: String;
    setLogin: React.Dispatch<React.SetStateAction<string>>;
}

const Sign: React.FC<SignProps> = (props) => {
    const [id, setId] = React.useState<Number>(null);
    const [name, setName] = React.useState<String>("");
    const [password, setPassword] = React.useState<String>("");
    const [type, setType] = React.useState<"admin" | "normal" | "null">(
        "normal"
    );
    const open = props.open == "sign";

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const response = await toast.promise(
            api.post("/user/create", {
                id: id,
                name: name,
                password: password,
                type: type,
            }),
            {
                pending: "Loading 😴",
                success: "Loading completed 🥳",
                error: "Error 😦",
            }
        );
        if (response.data.sucess) {
            toast(`Signed up Id - ${response.data.create.id} 💾`);
            props.setLogin("login");
        } else {
            toast("Error ⚠️");
        }
    };

    const handleLogin = () => {
        props.setLogin("login");
    };
    const handleChangeType = (input) => {
        if(type === input) {
            setType('null')
        } else {
            setType(input)
        }
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Sign In</DialogTitle>
            <DialogContent>
                <Box>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={id}
                        onChange={(e) => setId(Number(e.target.value))}
                        label="ID"
                        type="number"
                        variant="standard"
                        sx={{
                            maxWidth: '50px',
                            marginRight: '.5em',
                        }}
                    />
                    <TextField
                        margin="dense"
                        value={name}
                        onChange={(e) => setName(String(e.target.value))}
                        label="Name"
                        type="text"
                        variant="standard"
                    />
                </Box>
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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: 'row',
                        marginTop: '.5em',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <FormLabel
                        sx={{
                            marginRight: '.5em',
                        }}
                    >User Type</FormLabel>
                    <Tooltip title="Administrator">
                        <Checkbox
                            checked={type === "admin"}
                            onChange={() => handleChangeType("admin")}
                            icon={<AdminPanelSettingsOutlinedIcon sx={{ fontSize: 35 }} />}
                            checkedIcon={<AdminPanelSettingsIcon sx={{ fontSize: 35 }} />}
                            sx={{
                                marginRight: '.5em',
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Normal user">
                        <Checkbox
                            checked={type === "normal"}
                            onChange={() => handleChangeType("normal")}
                            icon={<AccountCircleOutlinedIcon sx={{ fontSize: 35 }} />}
                            checkedIcon={<AccountCircleIcon sx={{ fontSize: 35 }} />}
                            />
                    </Tooltip>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={handleLogin}>
                    Login
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Sign In
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Sign;

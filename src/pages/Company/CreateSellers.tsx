import { Dispatch, SetStateAction, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { toast } from "react-toastify";

import api from "../../hooks/api";

interface CreateSellersProps {
    open: String;
    setCreateSellerOpen?: Dispatch<SetStateAction<string>>;
    getSellers?: () => void;
}

export default function CreateSellers(props: CreateSellersProps) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [comission, setComission] = useState("");
    const open = props.open == "seller";

    const handleSubmit = async () => {
        try {
            const response = await api.post("/seller", {
                id: Number(id),
                name: String(name),
                comission: Number(comission),
                userId: window.sessionStorage.getItem("userId"),
            });
            toast("Seller created 🥳");
        } catch (err) {
            toast("Error 😦");
        }
    };
    return (
        <Dialog open={open} onClose={() => props.setCreateSellerOpen("close")}>
            <DialogTitle>Create a New Seller</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    value={id}
                    label="ID"
                    type="Number"
                    sx={{
                        marginBottom: "1vw",
                    }}
                    onChange={(e) => {
                        setId(String(e.target.value));
                    }}
                />
                <TextField
                    margin="dense"
                    variant="standard"
                    value={name}
                    label="Name"
                    type="text"
                    onChange={(e) => {
                        setName(String(e.target.value));
                    }}
                />
                <TextField
                    margin="dense"
                    variant="standard"
                    value={comission}
                    label="Comission"
                    type="number"
                    onChange={(e) => {
                        setComission(String(e.target.value));
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setCreateSellerOpen("close")}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

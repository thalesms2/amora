import { Dispatch, SetStateAction } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from '@mui/material'
import { toast } from "react-toastify";

import api from '../hooks/api'
import { handleKeydown } from "../hooks/formHooks";

interface Todo {
    id: Number;
    status: Boolean;
    label: String;
}

interface CreateTodoProps {
    open: String;
    // setTasks: React.Dispatch<SetStateAction<Todo[]>>
    setOpen: Dispatch<'create' | 'edit' | 'closed'>
}

export default function CreateTodo(props: CreateTodoProps) {
    const open = false;
    
    const handleClose = () => {
        toast('close')
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create a to do</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};
import React from "react";
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

import api from '../lib/api'
import { handleKeydown } from "../lib/formHooks";

interface Todo {
    id: Number;
    status: Boolean;
    label: String;
}

interface CreateTodoProps {
    open: String;
    // setTasks: React.Dispatch<React.SetStateAction<Todo[]>>
    setOpen: React.Dispatch<'create' | 'edit' | 'closed'>
}

const CreateTodo: React.FC<CreateTodoProps> = (props) => {
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

export default CreateTodo;

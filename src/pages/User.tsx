import React, { lazy } from "react";
import {
    Typography,
    Box,
    ListSubheader,
    List,
    ListItemIcon,
    ListItemText,
    ListItem,
    IconButton,
    Tooltip
} from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import { toast } from "react-toastify";

import api from "../lib/api";
import promiseResults from "../lib/toastPromiseDefault";

const EditUser = lazy(() => import("../components/EditUser"))

interface User {
    id: number
    name: string
}

const User: React.FC = () => {
    const [users, setUsers] = React.useState<User[]>([])
    const [edit, setEdit] = React.useState<'open' | 'closed'>('closed')
    const [userEdited, setUserEdited] = React.useState<Number>(null)
    const getAllUsers = async () => {
        try {
            const { data } = await toast.promise(
                api.get('/user'), 
                {
                    pending: "Loading 😴",
                    success: "Loading completed 🥳",
                    error: "Error 😦",
                })
            setUsers(data)
        } catch (err) {
            toast('Error 😦')
        }
    }

    React.useEffect(() => {
        getAllUsers()
    }, [])

    const delUser = async (id: number) => {
        try {
            const result = await toast.promise(
                api.delete(`/user/${id}`), promiseResults)
            toast('User deleted 💀')
            getAllUsers()
        } catch (err) {
            toast('Error 😦')
        }
    }
    const editUser = (id: number) => {
        setUserEdited(id)
        setEdit('open')
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                bgcolor: 'background.paper'
            }}
        >
            <List
                sx={{ 
                    width: "100%", 
                    maxWidth: "40vw",
                    maxHeight: "85vh",
                    overflow: 'auto',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                
                subheader={
                    <ListSubheader 
                        component="div" 
                        id="nested-list-subheader"
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                marginBottom: ".5em",
                            }}
                        >
                            Users
                        </Typography>
                    </ListSubheader>
                }
            >
                {
                    users.map((user) => {
                        return (
                            <ListItem
                                key={user.id}
                                secondaryAction={
                                    <Box>
                                        <Tooltip title="Edit">
                                            <IconButton 
                                                edge="end" 
                                                aria-label="Edit"
                                                sx={{
                                                    marginRight: '.2em',
                                                }}
                                                onClick={() => editUser(user.id)}
                                            >
                                                <EditRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton 
                                                edge="end" 
                                                aria-label="Delete"
                                                onClick={() => delUser(user.id)}
                                            >
                                                <DeleteRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                }
                            >
                                <ListItemIcon>
                                    <Person2RoundedIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    id={`${user.name}`}
                                    primary={`${user.id} - ${user.name}`}
                                />
                            </ListItem>
                        )
                    })
                }
            </List>
            { edit ? <EditUser id={userEdited} setEdit={setEdit} open={edit} getAllUsers={getAllUsers} /> : null}
        </Box>
    );
};

export default User;

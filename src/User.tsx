import React from "react";
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

import api from "./lib/api";

interface User {
    id: number
    name: string
}

const User: React.FC = () => {
    const [users, setUsers] = React.useState<User[]>([])

    React.useEffect(() => {
        async function getAllUsers() {
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
                toast('Error')
            }
        }
        getAllUsers()
    }, [])

    const createAllUsers = () => {
        
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
                                            >
                                                <EditRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton edge="end" aria-label="Delete">
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
        </Box>
    );
};

export default User;

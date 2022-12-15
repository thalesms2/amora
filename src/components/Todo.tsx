import React from "react";
import {
    List,
    ListSubheader,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Checkbox,
    Box,
} from "@mui/material";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { toast } from "react-toastify";

const mock = [
    { id: 1, status: false, label: "Relatório de Clientes por Estado" },
    { id: 2, status: false, label: "Relatório de Comissões por Vendedor" },
    { id: 3, status: false, label: "Relatório de Vendas por Período" },
    { id: 4, status: false, label: "Alteração do Preço de Custo" },
    { id: 5, status: false, label: "Movimentação no Estoque" },
    { id: 6, status: false, label: "Consulta Posição Física" },
    { id: 7, status: false, label: "Consulta Movimentação do Produto" },
    { id: 8, status: false, label: "Esqueci a senha" },
];

const Todo: React.FC = () => {
    const [tasks, setTasks] = React.useState(mock);

    const handleToggle = (checked: number) => {
        const newTasks = [];
        tasks.map((task, index) => {
            if (index == checked) {
                task.status = task.status ? false : true;
            }
            newTasks.push(task);
        });
        setTasks(newTasks);
    };

    return (
        <List
            sx={{
                width: "100%",
                maxWidth: '40vw',
                bgcolor: "background.paper",
                height: "85vh",
                overflow: "auto",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <ListSubheader component="div" id="nested-list-subheader">
                        To do List
                    </ListSubheader>
                    <IconButton 
                        edge="end" 
                        aria-label="add"
                        sx={{
                            marginRight: ".2em",
                        }}
                        onClick={() => toast('foi')}
                    >
                        <AddCircleIcon />
                    </IconButton>
                </Box>
            }
        >
            {tasks.map((task, index) => {
                return (
                    <ListItem
                        key={`${task.id} - ${task.label}`}
                        secondaryAction={
                            <>
                                <IconButton 
                                    edge="end" 
                                    aria-label="edit"
                                    sx={{
                                        marginRight: ".1em",
                                    }}
                                    onClick={() => toast('foi')}
                                >
                                    <EditRoundedIcon />
                                </IconButton>
                                <IconButton 
                                    edge="end" 
                                    aria-label="delete"
                                    onClick={() => toast('foi')}
                                >
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </>
                        }
                        disablePadding
                    >
                        <ListItemButton
                            onClick={() => handleToggle(index)}
                            dense
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={task.status}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={task.label} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default Todo;
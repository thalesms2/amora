import React, { lazy } from "react";
import { Typography, Box } from "@mui/material";

import Todo from "../components/Todo";

const CreateTodo = lazy(() => import("../components/CreateTodo"))


const App: React.FC = () => {
    const [popup, setPopup] = React.useState<'create' | 'edit' | 'closed'>('closed')
    const handleChangeOnPopup = (origin: 'create' | 'edit' | 'closed') => {
        if(origin === popup) {
            setPopup('closed')
        } else {
            setPopup(origin)
        }
    }
    return (
        <div>
            {popup === 'create' ? <CreateTodo open={popup} setOpen={handleChangeOnPopup} /> : null}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography 
                    variant="h3"
                    sx={{
                        marginBotton: '.5em',
                    }}
                >SisVendas</Typography>
                <Todo />
            </Box>
        </div>
    );
};

export default App;
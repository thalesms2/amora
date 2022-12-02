import React from "react";
import { Typography } from "@mui/material";

const App: React.FC = () => {
    return (
        <div>
            <Typography
                variant="h3"
                sx={{
                    marginBottom: ".5 em",
                }}
            >
                Hello World { window.sessionStorage.getItem('name')}
            </Typography>  
        </div>
    );
};

export default App;

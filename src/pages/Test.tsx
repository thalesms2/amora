import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { toast } from "react-toastify";

const Clear: React.FC = () => {
    const [toastText, setToastText] = React.useState(null);

    return (
        <Box sx={{}}>
            <Typography
                variant="h3"
                sx={{
                    marginBottom: ".5em",
                }}
            >
                Tests
            </Typography>
            <TextField
                label="Toast Text"
                variant="standard"
                value={toastText}
                onChange={(e) => setToastText(e.target.value)}
            />
            <Button
                onClick={() => toast(`🦄 ${toastText}!`)}
                sx={{
                    padding: ".5em 1em",
                }}
            >
                Testing Toast Totification
            </Button>
            <Button
                onClick={() =>
                    toast(`🦄 ${window.sessionStorage.getItem("userId")}!`)
                }
                sx={{
                    padding: ".5em 1em",
                }}
            >
                User ID
            </Button>
        </Box>
    );
};

export default Clear;

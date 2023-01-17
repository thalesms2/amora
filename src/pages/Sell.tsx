import React from 'react'
import { Typography, Box, TextField } from '@mui/material'

const Sell: React.FC = () => {
    const [id, setId] = React.useState('')
    const [clientId, setClientId] = React.useState('')
    const [clientName, setClientName] = React.useState('')
    const [sellerId, setSelleId] = React.useState('')
    const [sellerName, setSellerName] = React.useState('')
    const [operation, setOperation] = React.useState('')
    const [items, setItems] = React.useState([])

    return (
        <Box>
            <Typography
                variant="h3"
                sx={{
                    marginBottom: ".5 em",
                }}
            >
            Sell
            </Typography>
            <TextField
                autoFocus
                label="ID"
                value={id}
                type="number"
                onChange={(e) => setId(String(e.target.value))}
            />
            <TextField
                autoFocus
                label="ID"
                value={id}
                type="number"
                onChange={(e) => setId(String(e.target.value))}
            />
        </Box>
    )
}

export default Sell
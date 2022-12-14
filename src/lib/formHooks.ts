import React from 'react'

const handleKeydown = async(e: React.KeyboardEvent, handleSubmit: (e: React.SyntheticEvent) => void) => {
    if(e.code === 'Enter' || e.code === 'NumpadEnter') {
        handleSubmit(e)
    }
}

export { handleKeydown }
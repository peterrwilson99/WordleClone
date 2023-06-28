import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

function Tile({ letter, isCorrect, isContained, isSubmitted }) {
    const theme = useTheme();
    const color = isSubmitted ? isCorrect ? theme.palette.primary.main : isContained ? theme.palette.secondary.main : letter ? theme.palette.miss.main : 'transparent' : 'transparent';
    return (
        <Box className="w-14 h-14 flex justify-center items-center" sx={{
            backgroundColor: color,
            border: isSubmitted ? 'none' : '2px solid #d3d6da',
        }}>
            <Typography variant="h5" align="center" className={`${isSubmitted ? 'text-white' : 'text-black'} font-extrabold text-3xl`}>
                {letter ? letter : ''}
            </Typography>
        </Box>
    )
}

export default Tile
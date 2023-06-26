import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

function Tile({ letter, isCorrect, isContained }) {
    const theme = useTheme();
    const color = isCorrect ? theme.palette.primary.main : isContained ? theme.palette.secondary.main : letter ? theme.palette.miss.main : 'transparent';
    return (
        <Box className="w-14 h-14 flex justify-center items-center" sx={{
            backgroundColor: color,
            border: letter ? 'none' : '2px solid #d3d6da',
        }}>
            <Typography variant="h5" align="center" className="text-white">
                {letter ? letter : ''}
            </Typography>
        </Box>
    )
}

export default Tile
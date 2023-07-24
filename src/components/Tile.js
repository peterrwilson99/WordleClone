import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

function Tile({ letter, isCorrect, isContained, isSubmitted, revealRow }) {
    const theme = useTheme();
    const color = isSubmitted ? isCorrect ? theme.palette.primary.main : isContained ? theme.palette.secondary.main : letter ? theme.palette.miss.main : 'transparent' : 'transparent';
    const [flip, setFlip] = React.useState(revealRow);
    
    React.useEffect(() => {
        if (revealRow){
            setFlip(true);
        }
        setTimeout(() => setFlip(false), 750); 
    }, [revealRow]);
    
    return (
        <Box className={`w-14 h-14 flex justify-center items-center ${flip && revealRow ? 'flip' : ''}`} sx={{
            backgroundColor: color,
            border: isSubmitted ? 'none' : `2px solid ${theme.palette.borderDefault.main}`,
        }}>
            <Typography variant="h5" align="center" className={`${isSubmitted && !flip ? 'text-white' : ''} font-extrabold text-3xl`}>
                {letter ? letter : ''}
            </Typography>
        </Box>
    )
}


export default Tile
import { Button, Divider, IconButton, Typography, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'

function Navbar() {
    const theme = useTheme();
    const handleHamburgerClick = (event) => {
        console.log('hamburger clicked')
    }
    console.log(theme);
    return (
        <nav className="h-16 py-2">
            <div className="px-5 grid grid-cols-3">
                <div className="my-auto text-left">
                    <IconButton onClick={handleHamburgerClick} >
                        <MenuIcon sx={{
                            width: '24px',
                            height: '24px',
                        }}/>
                    </IconButton>
                </div>
                <div className="my-auto">
                    <Typography variant="h4" align="center" >
                        Wordle Clone
                    </Typography>
                </div>
                <div className="my-auto text-right">
                    <Button variant="outlined" size="small" sx={{
                        borderRadius: '20px',
                        borderColor: theme.palette.miss.main,
                        color: theme.palette.text.primary,
                    }} color="inherit">
                        Play Real Wordle
                    </Button>
                </div>
            </div>
            <Divider className="w-full mb-2" />
        </nav>
    )
}

export default Navbar
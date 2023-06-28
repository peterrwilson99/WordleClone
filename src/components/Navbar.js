import { Button, ButtonBase, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'

function Navbar() {
    const theme = useTheme();
    const handleHamburgerClick = (event) => {
        console.log('hamburger clicked')
    }

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    return (
        <nav className="min-h-16 py-1">
            <div className="px-5 grid grid-cols-3">
                <div className="flex flex-row my-auto text-left w-full">
                    <IconButton onClick={handleHamburgerClick} >
                        <MenuIcon sx={{
                            width: '24px',
                            height: '24px',
                        }}/>
                    </IconButton>
                    {
                        isSmallScreen ?
                        <Typography variant="h6" className="font-extrabold my-auto align-middle w-full"  align="left" >
                            Wordle Clone
                        </Typography>
                        :
                        <></>
                    }
                </div>
                <div className="my-auto">
                    {!isSmallScreen ?
                        <Typography variant="h4" className="font-extrabold" align="center" >
                            Wordle Clone
                        </Typography>
                        :
                        <></>
                    }
                </div>
                <div className="my-auto text-right">
                    <ButtonBase variant="outlined" size="small" className="text-xs py-1.5 px-6 font-medium" sx={{
                        borderRadius: '20px',
                        border: `1px solid ${theme.palette.miss.main}}`,
                        color: theme.palette.text.primary,
                        textTransform: 'none',
                    }} color="inherit" onClick={() => window.open('https://www.nytimes.com/games/wordle/index.html', '_blank')}>
                        Play Real Wordle
                    </ButtonBase>
                </div>
            </div>
            <Divider className="w-full mb-2" />
        </nav>
    )
}

export default Navbar
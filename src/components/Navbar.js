import { Button, ButtonBase, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React from 'react'

function Navbar() {
    const theme = useTheme();
    const handleHamburgerClick = (event) => {
        console.log('hamburger clicked')
    }
    const handleSettingsClick = (event) => {
        console.log('Settings clicked')
    }
    const handleInfoClick = (event) => {
        console.log('Info clicked')
    }

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <nav className="min-h-[65px] py-1">
            <div className="px-4 min-h-[65px] grid grid-cols-3">
                <div className="my-auto">
                    <IconButton onClick={handleHamburgerClick} >
                        <MenuIcon sx={{
                            width: '24px',
                            height: '24px',
                        }}/>
                    </IconButton>
                </div>
                <div className="my-auto">
                    <Typography variant={isSmallScreen ? "h7" : "h5"} className="font-extrabold" align="center" >
                        Wordle Clone
                    </Typography>
                </div>
                <div className="my-auto">
                    <div className="flex max-w-[300px] flex-row justify-between align-middle items-center">
                        <div>
                            <IconButton sx={{paddingX: '5px', display: isSmallScreen ? 'none' : ''}} onClick={handleInfoClick} >
                                <HelpOutlineIcon sx={{
                                    color: theme.palette.text.primary,
                                    height: isSmallScreen ? '20px' : '30px',
                                    width: isSmallScreen ? '20px' : '30px',
                                }}/>
                            </IconButton>
                            <IconButton sx={{paddingX: '5px', display: isSmallScreen ? 'none' : ''}} onClick={() => window.open('https://github.com/peterrwilson99/', '_blank')} >
                                <GitHubIcon sx={{
                                    color: theme.palette.text.primary,
                                    height: isSmallScreen ? '20px' : '28px',
                                    width: isSmallScreen ? '20px' : '28px',
                                }}/>
                            </IconButton>
                            <IconButton sx={{paddingX: '5px'}} onClick={handleSettingsClick} >
                                <SettingsIcon sx={{
                                    color: theme.palette.text.primary,
                                    height: isSmallScreen ? '20px' : '30px',
                                    width: isSmallScreen ? '20px' : '30px',
                                }}/>
                            </IconButton>
                        </div>
                        <div>
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
                </div>
            </div>
            <Divider className="w-full mb-2" />
        </nav>
    )
}

export default Navbar
import { ButtonBase, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
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
    console.log(isSmallScreen)
    
    return (
        <nav className="py-1">
            <div className={`px-4 min-h-[${isSmallScreen ? '50px' : '65px'}] ${isSmallScreen ? 'flex justify-between' : 'grid grid-cols-3'}`}>
                <div className="my-auto">
                    <IconButton onClick={handleHamburgerClick} >
                        <MenuIcon sx={{
                            width: '24px',
                            height: '24px',
                        }}/>
                    </IconButton>
                    {
                        isSmallScreen ?
                            <Typography variant="h7" className="font-extrabold" align="left" >
                                Wordle Clone
                            </Typography>
                            :
                            <></>
                    }
                </div>
                <div className={`my-auto ${isSmallScreen ? 'w-0' : ''}`}>
                    {
                        isSmallScreen ?
                            <></>
                            :
                            <Typography variant="h5" className="font-extrabold" align="center" >
                                Wordle Clone
                            </Typography>
                    }
                </div>
                <div className="my-auto flex justify-end">
                    <div>
                        <IconButton sx={{paddingX: '5px', display: isSmallScreen}} onClick={handleInfoClick} >
                            <HelpOutlineIcon sx={{
                                color: theme.palette.text.primary,
                                height: '30px',
                                width: '30px',
                            }}/>
                        </IconButton>
                        <IconButton sx={{paddingX: '5px', display: isSmallScreen}} onClick={() => window.open('https://github.com/peterrwilson99/', '_blank')} >
                            <GitHubIcon sx={{
                                color: theme.palette.text.primary,
                                height: '28px',
                                width: '28px',
                            }}/>
                        </IconButton>
                        <IconButton sx={{paddingX: '5px'}} onClick={handleSettingsClick} >
                            <SettingsIcon sx={{
                                color: theme.palette.text.primary,
                                height: '30px',
                                width: '30px',
                            }}/>
                        </IconButton>
                        {
                            isSmallScreen ?
                                <></>
                                :
                                <ButtonBase variant="outlined" size="small" className="text-xs py-1.5 px-6 ml-6 font-medium" sx={{
                                    borderRadius: '20px',
                                    border: `1px solid ${theme.palette.miss.main}}`,
                                    color: theme.palette.text.primary,
                                    textTransform: 'none',
                                }} color="inherit" onClick={() => window.open('https://www.nytimes.com/games/wordle/index.html', '_blank')}>
                                    Play Real Wordle
                                </ButtonBase>
                        }

                    </div>
                </div>
            </div>
            <Divider className="w-full mb-2" />
        </nav>
    )
}

export default Navbar
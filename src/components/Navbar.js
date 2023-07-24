import { Avatar, Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TerminalIcon from '@mui/icons-material/Terminal';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'
import { useMyTheme } from '../../pages/_app';
import { lightTheme, darkTheme } from '../theme';

function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const theme = useTheme();
    const { setMyTheme } = useMyTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleTheme = () => {
        setMyTheme(theme.palette.mode === 'light' ? darkTheme : lightTheme)
        handleClose();
    }

    const handleHamburgerClick = () => {
        setIsDrawerOpen(true);
    }

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    }

    const sliderContent = (
        <div>
            <div className="flex justify-end">
                <IconButton onClick={handleDrawerClose} >
                    <CloseIcon />
                </IconButton>
            </div>
            <div className="flex flex-col justify-center items-center mt-10 min-w-[300px]">
                    <Avatar sx={{ width: 150, height: 150, mb: 2 }} src="https://avatars.githubusercontent.com/u/57307032?v=4" alt="Peter Wilson" />
                    <Typography variant="h5" className="font-extrabold" align="center" >
                        Peter's Wordle Clone
                    </Typography>
                    <Divider className="w-full my-2" />
                    {/* include about section how this was made to practice react */}
                    <Typography variant="body1" align="center" className="my-4 max-w-[200px]" >
                        This website was created by Peter Wilson to practice his React skills and to learn Next.js. It is not affiliated with the New York Times or Josh Wardle.
                    </Typography>
                    <Divider className="w-full my-2" />
                    {/* github linkedin and portfolio links */}
                    <div className="flex flex-row justify-center items-center">
                        <Tooltip title="GitHub">
                            <IconButton sx={{paddingX: '5px'}} onClick={() => window.open('https://github.com/peterrwilson99', '_blank')} >
                                <GitHubIcon sx={{
                                    color: theme.palette.text.primary,
                                    height: '28px',
                                    width: '28px',
                                }}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="LinkedIn">
                            <IconButton sx={{paddingX: '5px'}} onClick={() => window.open('https://www.linkedin.com/in/peterrwilson99/', '_blank')} >
                                <LinkedInIcon sx={{
                                    color: theme.palette.text.primary,
                                    height: '28px',
                                    width: '28px',
                                }}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Portfolio">
                            <IconButton sx={{paddingX: '5px'}} onClick={() => window.open('https://peterwilson.vercel.app/', '_blank')} >
                                <TerminalIcon sx={{
                                    color: theme.palette.text.primary,
                                    height: '28px',
                                    width: '28px',
                                }}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Divider className="w-full my-2" />
                    {/* include link to real wordle */}
                    <ButtonBase variant="outlined" size="small" className="text-xs py-1.5 px-6 ml-6 font-medium" sx={{
                        borderRadius: '20px',
                        border: `1px solid ${theme.palette.miss.main}}`,
                        color: theme.palette.text.primary,
                        textTransform: 'none',
                    }} color="inherit" onClick={() => window.open('https://www.nytimes.com/games/wordle/index.html', '_blank')}>
                        Play Real Wordle
                    </ButtonBase>
                </div>
    </div>
    )

    const handleSettingsClick = (event) => {
        const modalContent = (
            <div cls>
                <DialogTitle>Settings</DialogTitle>
                <DialogContent sx={{ minWidth: '400px' }}>
                    <Divider />
                    <div className="flex justify-between w-100 ">
                        <div className="my-[auto]">
                            <Typography className="my-[auto]" variant="h7">{theme.palette.mode === 'light' ? "Set Dark" : "Set Light"} Mode</Typography>
                        </div>
                        <div>
                            <IconButton onClick={toggleTheme}>
                                {theme.palette.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                            </IconButton>
                        </div>
                    </div>
                    <Divider />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </div>
        )
        setModalContent(modalContent);
        setIsModalOpen(true);
    }

    const handleInfoClick = () => {
        const modalContent = (
            <div cls>
                <DialogTitle>Wordle Clone</DialogTitle>
                <Divider />
                <DialogContent sx={{ minWidth: '400px' }}>
                    <DialogContentText>
                        <Typography variant="h7" className="font-extrabold" align="left" >
                            What is Wordle?
                        </Typography>
                        <Typography variant="body1" align="left" >
                            Wordle is a word game that was created by Josh Wardle and is available to play on the New York Times website. The game consists of a five-letter word that the player must guess. The player has six attempts to guess the word. After each guess, the player is told which letters are correct, which letters are contained in the word, and which letters are not in the word. The player wins if they guess the word in six or fewer attempts.
                        </Typography>
                        <br />
                        <Typography variant="h7" className="font-extrabold" align="left" >
                            How to Play
                        </Typography>
                        <Typography variant="body1" align="left" >
                            To play, simply click on the letters on the keyboard to guess the word. The letters will turn green if they are in the correct position, yellow if they are contained in the word, and red if they are not in the word. You can also use the keyboard to guess the word. Press the backspace key to delete a letter and the enter key to submit your guess. You can also click on the settings icon to toggle between light and dark mode.
                        </Typography>
                        <br />
                        <Typography variant="h7" className="font-extrabold" align="left" >
                            About the Creator
                        </Typography>
                        <Typography variant="body1" align="left" >
                            My name is Peter Wilson and I am a software engineer based in Canada. I created this website to practice my React skills and to learn Next.js. I am not affiliated with the New York Times or Josh Wardle. If you would like to see more of my work, please visit my GitHub page by clicking on the GitHub icon in the top right corner of the page.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </div>
        )
        setModalContent(modalContent);
        setIsModalOpen(true);
    }

    const handleClose = () => {
        setIsModalOpen(false);
    }

    
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
            <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                {sliderContent}
            </Drawer>
            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                {modalContent}
            </Dialog>
        </nav>
    )
}

export default Navbar
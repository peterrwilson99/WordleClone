import { ButtonBase, Container } from '@mui/material'
import React from 'react'
import Tile from './Tile'
import BackspaceIcon from '@mui/icons-material/Backspace';


const TileRow = () => {
    return (
        <div className="w-full flex flex-row justify-center gap-2 my-2">
            <Tile letter="S" isCorrect={true}/>
            <Tile letter="A" />
            <Tile letter="G" isContained={true}/>
            <Tile />
            <Tile />
        </div>
    )
}


function WordleGame() {
    const rows = [
        TileRow(),
        TileRow(),
        TileRow(),
        TileRow(),
        TileRow(),
    ]

    const KeyboardButton = ({letter, isCorrect, isContained, attempted}) => {
        const color = isCorrect ? '#6aaa64' : isContained ? '#c9b458' : attempted ? '#818384' : '#d3d6da';
        const textColor = isCorrect ? '#ffffff' : isContained ? '#ffffff' : attempted ? '#ffffff' : '#000000';
        return (
            <ButtonBase sx={{
                height: '58px',
                width: letter.length > 1 ? '65px' : '43px',
                fontSize: letter.length > 1 ? '0.75em' : '1.25em',
                border: '0',
                padding: '0',
                marginRight: '6px',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: `${color}!important`,
                color: textColor,
                textTransform: 'uppercase',
            }} >
                {letter === 'Back' ? <BackspaceIcon /> : letter}
            </ButtonBase>
        )
    }

    const Keyboard = () => {
        const lettersRow1 = ['Q','W','E','R','T','Y','U','I','O','P']
        const lettersRow2 = ['A','S','D','F','G','H','J','K','L']
        const lettersRow3 = ['Enter', 'Z','X','C','V','B','N','M', 'Back']

        return (
            <div >
                <div className="w-full flex flex-row justify-center my-2">
                    {lettersRow1.map((letter) => {
                        return (
                            <KeyboardButton letter={letter} />
                        )
                    })}
                </div>
                <div className="w-full flex flex-row justify-center my-2">
                    {lettersRow2.map((letter) => {
                        return (
                            <KeyboardButton letter={letter} />
                        )
                    })}
                </div>
                <div className="w-full flex flex-row justify-center my-2">
                    {lettersRow3.map((letter) => {
                        return (
                            <KeyboardButton letter={letter} />
                        )
                    })}
                </div>

            </div>
        )
    }

    return (
        <Container className="text-center m-auto my-4">
            {rows}
            <div className="mt-8">{Keyboard()}</div>
        </Container>
    )
}

export default WordleGame
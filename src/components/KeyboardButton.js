import { ButtonBase, Typography } from "@mui/material";
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

export const KeyboardButton = ({letter, isCorrect, isContained, attempted, handleKeyPress}) => {
    const color = isCorrect ? '#6aaa64' : isContained ? '#c9b458' : attempted ? '#818384' : '#d3d6da';
    const textColor = isCorrect ? '#ffffff' : isContained ? '#ffffff' : attempted ? '#ffffff' : '#000000';

    return (
        <ButtonBase onClick={() => handleKeyPress(letter)} value={letter} sx={{
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
        }}
        >
            {letter === 'BACKSPACE' ? 
                    <BackspaceOutlinedIcon /> 
                : 
                    letter === 'ENTER' ? 
                        <Typography className="font-extrabold text-sm">{letter}</Typography> 
                    : 
                        <Typography className="font-extrabold text-xl">{letter}</Typography>
            }
        </ButtonBase>
    )
}
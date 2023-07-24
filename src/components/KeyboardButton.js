import { ButtonBase, Typography, useTheme } from "@mui/material";
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

export const KeyboardButton = ({letter, isCorrect, isContained, attempted, handleKeyPress, disabled}) => {
    const theme = useTheme();
    const color = isCorrect ? theme.palette.primary.main : isContained ? theme.palette.secondary.main : attempted ? theme.palette.miss.main : theme.palette.borderDefault.main;
    const contrastText = '#FFFFFF';
    const defaultText = theme.palette.text.primary;
    const textColor = isCorrect ? contrastText : isContained ? contrastText : attempted ? contrastText : defaultText;

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
            disabled={disabled}
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
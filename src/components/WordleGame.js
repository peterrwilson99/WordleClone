import { Alert, Container, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Tile from './Tile'
import { KeyboardButton } from './KeyboardButton';
import allWords from '../words/allWords.json'
import possibleGameWords from '../words/possibleGameWords.json'

const correctWord = possibleGameWords[Math.floor(Math.random() * possibleGameWords.length)].toUpperCase();

const attempts = 6;

const keyboardLetters = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M']

const letterRows = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['ENTER', 'Z','X','C','V','B','N','M', 'BACKSPACE'],
]

function WordleGame() {
    const [correctLetters, setCorrectLetters] = useState([]);
    const [containedLetters, setContainedLetters] = useState([]);
    const [incorrectLetters, setIncorrectLetters] = useState([]);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState(0);
    const [submittedRows, setSubmittedRows] = useState(Array.from({ length: attempts }, () => false));
    const [rowInputs, setRowInputs] = useState(Array.from({ length: attempts }, () => ''));
    const [rowFeedbacks, setRowFeedbacks] = useState(Array.from({ length: attempts }, () => [{}, {}, {}, {}, {}]));
    const [revealAnimation, setRevealAnimation] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setIsSnackbarOpen(false);
    };

    const handleKeyPress = (letter) => {
        if (keyboardLetters.includes(letter.toUpperCase())) {
            setRowInputs((prevRowInputs) => {
                return prevRowInputs.map((rowInput, index) => {
                    if (index === currentRow && rowInput.length < 5) {
                        return rowInput + letter;
                    } else {
                        return rowInput;
                    }
                });
            });
            setRevealAnimation(false);
        }else if(letter === 'BACKSPACE'){
            setRowInputs((prevRowInputs) => {
                return prevRowInputs.map((rowInput, index) => {
                    if (index === currentRow && rowInput.length > 0) {
                        return rowInput.slice(0, -1);
                    } else {
                        return rowInput;
                    }
                });
            });
            setRevealAnimation(false);
        }else if(letter === 'ENTER' && rowInputs[currentRow].length === 5){
            // check if word exists in allWords
            const inputString = rowInputs[currentRow].toLowerCase();
            if (!allWords.includes(inputString)) {
                setIsSnackbarOpen(true);
                return;
            }
            setSubmittedRows((prevSubmittedRows) => {
                return prevSubmittedRows.map((submittedRow, index) => {
                    if (index === currentRow) {
                        return true;
                    } else {
                        return submittedRow;
                    }
                });
            });
            setCurrentRow((prevCurrentRow) => prevCurrentRow + 1);
            setRevealAnimation(true);
        }
    }

    useEffect(() => {
        if(gameOver){
            return;
        }
        const handleKeyPressEvent = (e) => handleKeyPress(e.key.toUpperCase());
        window.addEventListener('keydown', handleKeyPressEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyPressEvent);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        if (currentRow === attempts) {
            setGameOver(true);
            setIsModalOpen(true);
        }
        // provide feedback on previous attempt
        const lastInputString = rowInputs[currentRow - 1];
        setRowFeedbacks((prevRowFeedbacks) => {
            return prevRowFeedbacks.map((rowFeedback, index) => {
                if (index === currentRow - 1) {
                    return provideFeedback(lastInputString);
                } else {
                    return rowFeedback;
                }
            });
        });
    }, [currentRow]);

    const TileRow = ({ letters, truthValues, isSubmitted, revealRow }) => {
        letters = letters === '' ? null : letters.toUpperCase();
        const letterArray = letters ? letters.split('') : [];
        return (
            <div className="w-full flex flex-row justify-center gap-2 my-2">
                {truthValues.map((truthValue, index) => (
                    <Tile 
                        key={index}
                        letter={letterArray[index] ? letterArray[index].toUpperCase() : null} 
                        isCorrect={truthValue.isCorrect ?? truthValue.isCorrect} 
                        isContained={truthValue.isContained ?? truthValue.isContained}
                        isSubmitted={isSubmitted}
                        revealRow={revealRow}
                    />
                ))}
            </div>
        )
    }

    const rows = rowInputs.map((rowInput, index) => (
        <TileRow key={index} letters={rowInput} truthValues={rowFeedbacks[index]} isSubmitted={submittedRows[index]} revealRow={currentRow - 1 === index && revealAnimation} />
    ))

    const Keyboard = () => {
        return (
            <div >
                {letterRows.map((letterRow, index ) => {
                    return(
                        <div key={index} className="w-full flex flex-row justify-center my-2">
                            {letterRow.map((letter, index) => {
                                return (
                                    <KeyboardButton key={index} disabled={gameOver} handleKeyPress={handleKeyPress} letter={letter} isCorrect={correctLetters.includes(letter)} isContained={containedLetters.includes(letter)} attempted={incorrectLetters.includes(letter)}/>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }

    const provideFeedback = (inputString) => {
        const letters = inputString.toUpperCase().split('');
        const correctWordLetters = correctWord.toUpperCase().split('');
        const correctLettersCurrent = [];
        const containedLettersCurrent = [];
        const incorrectLettersCurrent = [];
        let truthValues = letters.map((letter, index) => {
            const isCorrect = letter === correctWordLetters[index];
            correctWordLetters[index] = isCorrect ? undefined : correctWordLetters[index];
            const isContained = correctWordLetters.includes(letter);
            if (isCorrect) {
                correctLettersCurrent.push(letter);
            } else if (isContained) {
                containedLettersCurrent.push(letter);
            } else {
                incorrectLettersCurrent.push(letter);
            }
            return { isCorrect, isContained };
        });
        console.log(correctWordLetters);
        truthValues = truthValues.map(({isCorrect, isContained}, index) => {
            isContained = correctWordLetters.includes(letters[index]);
            return { isCorrect, isContained };
        });

        setCorrectLetters((prevCorrectLetters) => {
            return [...prevCorrectLetters, ...correctLettersCurrent];
        });
        setContainedLetters((prevContainedLetters) => {
            return [...prevContainedLetters, ...containedLettersCurrent];
        });
        setIncorrectLetters((prevIncorrectLetters) => {
            return [...prevIncorrectLetters, ...incorrectLettersCurrent];
        });

        if (correctLettersCurrent.length === 5) {
            setIsModalOpen(true);
            setGameWon(true);
            setGameOver(true);
        }
    
        return truthValues;
    }

    return (
        <Container className="text-center m-auto">
            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    {gameWon ? "Congratulations!" : "Maybe next time"}
                </DialogTitle>
                <DialogContent sx={{minWidth: "350px"}}>
                    <DialogContentText id="alert-dialog-description">
                    {gameWon ? "You solved the wordle!" : `The correct word was ${correctWord.toLowerCase()}.`}
                    
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => window.location.reload()} color="primary">
                        Play Again
                    </Button>
                </DialogActions>
            </Dialog>
            {rows}
            <div className="mt-8">{Keyboard()}</div>
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: 'right' }}
                >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Word was not found in word list
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default WordleGame
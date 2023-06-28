import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Tile from './Tile'
import { KeyboardButton } from './KeyboardButton';

const correctWord = "RACED"

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
    const [currentRow, setCurrentRow] = useState(0);
    const [submittedRows, setSubmittedRows] = useState(Array.from({ length: attempts }, () => false));
    const [rowInputs, setRowInputs] = useState(Array.from({ length: attempts }, () => ''));
    const [rowFeedbacks, setRowFeedbacks] = useState(Array.from({ length: attempts }, () => [{}, {}, {}, {}, {}]));

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
        }else if(letter === 'ENTER' && rowInputs[currentRow].length === 5){
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
        }
    }

    useEffect(() => {
        const handleKeyPressEvent = (e) => handleKeyPress(e.key.toUpperCase());
        window.addEventListener('keydown', handleKeyPressEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyPressEvent);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        if (currentRow === attempts) {
            console.log("Game Over");
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

    const TileRow = ({ letters, truthValues, isSubmitted }) => {
        letters = letters === '' ? null : letters.toUpperCase();
        const letterArray = letters ? letters.split('') : [];
        return (
            <div className="w-full flex flex-row justify-center gap-2 my-2">
                {truthValues.map((truthValue, index) => (
                    <Tile 
                        letter={letterArray[index] ? letterArray[index].toUpperCase() : null} 
                        isCorrect={truthValue.isCorrect ?? truthValue.isCorrect} 
                        isContained={truthValue.isContained ?? truthValue.isContained}
                        isSubmitted={isSubmitted}
                    />
                ))}
            </div>
        )
    }

    const rows = rowInputs.map((rowInput, index) => (
        <TileRow letters={rowInput} truthValues={rowFeedbacks[index]} isSubmitted={submittedRows[index]} />
    ))

    const Keyboard = () => {
        return (
            <div >
                {letterRows.map((letterRow) => {
                    return(
                        <div className="w-full flex flex-row justify-center my-2">
                            {letterRow.map((letter) => {
                                return (
                                    <KeyboardButton handleKeyPress={handleKeyPress} letter={letter} isCorrect={correctLetters.includes(letter)} isContained={containedLetters.includes(letter)} attempted={incorrectLetters.includes(letter)}/>
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
        const truthValues = letters.map((letter, index) => {
            const isCorrect = letter === correctWordLetters[index];
            const isContained = correctWord.includes(letter);
            if (isCorrect) {
                correctLettersCurrent.push(letter);
            } else if (isContained) {
                containedLettersCurrent.push(letter);
            } else {
                incorrectLettersCurrent.push(letter);
            }
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
        return truthValues;
    }

    return (
        <Container className="text-center m-auto">
            {rows}
            <div className="mt-8">{Keyboard()}</div>
        </Container>
    )
}

export default WordleGame
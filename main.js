/* Roy Andres Corrales Ramirez
July 15th, 2024
Wordle Clone (Project) */ 

// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    // Initialize the game state variables
    let guessedWords = [[]];
    let availableSpace = 1;
    let word = "dairy";
    let guessedWordCount = 0;

    // Get all the keys from the on-screen keyboard
    const keys = document.querySelectorAll('.keyboard-row button');

    // Function to get the current word array from guessed words
    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    // Function to update the guessed words array with the new letter
    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);
            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    // Function to get the color of the tile based on the letter's correctness
    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)"; // Gray for incorrect letter
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)"; // Green for correct letter in correct position
        }

        return "rgb(181, 159, 59)"; // Yellow for correct letter in incorrect position
    }

    // Function to handle the submission of the current word
    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr.length !== 5) {
            window.alert('Word must be 5 letters!');
            return;
        }

        const currentWord = currentWordArr.join("");

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color: ${tileColor}; border-color: ${tileColor}`;

            }, interval * index);
        });

        guessedWordCount += 1;

        if (currentWord === word) {
            window.alert("Congrats!");
        }

        if (guessedWords.length === 6 && currentWord !== word) {
            window.alert(`Sorry, you lost! The word is ${word}.`);
        }

        guessedWords.push([]);
    }

    // Function to create the squares on the game board
    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    // Function to handle the deletion of the last letter
    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }

    // Add event listeners to the keys on the on-screen keyboard
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === 'enter') {
                handleSubmitWord();
                return;
            }

            if (letter === 'del') {
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter);
        };
    }

    // Add event listener for the dark mode toggle button
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
// Get elements from the DOM
const testTextElement = document.getElementById('test-text');
const userInputElement = document.getElementById('user-input');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const timeElement = document.getElementById('time');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');

const testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime, timerInterval;

testTextElement.value = testText;

startButton.addEventListener('click', startTest);
resetButton.addEventListener('click', resetTest);

userInputElement.addEventListener('input', checkInput);

// starts the typing test
function startTest() {
    startTime = new Date().getTime(); // record start time
    userInputElement.disabled = false; // Enable input field
    userInputElement.focus();
    timerInterval = setInterval(updateTime, 1000); // Start timer
}

// Resets the typing test
function resetTest() {
    clearInterval(timerInterval); // Stops the timer
    userInputElement.value = ''; // Clears input field
    userInputElement.disabled = true; // Disables input field

    // Reset values
    timeElement.textContent = 0;
    wpmElement.textContent = 0;
    accuracyElement.textContent = 0;
}

// checks user input against the test text
function checkInput() {
    const userInput = userInputElement.value;
    if (userInput === testText) {
        endTime = new Date().getTime(); // record end time
        clearInterval(timerInterval); // Stop timer
        calculateResults(); // calculate and display results
    }
}

// updates elapsed time on the UI
function updateTime() {
    const currentTime = new Date().getTime();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    timeElement.textContent = timeElapsed; // Display elapsed time
}

// calculates and displays typing speed and accuracy
function calculateResults() {
    const timeTaken = (endTime - startTime) / 1000; // Calculate time taken
    const wordsTyped = userInputElement.value.split(' ').length; // Count words typed
    const wpm = Math.round((wordsTyped / timeTaken) * 60); // Calculate words per minute
    const accuracy = calculateAccuracy(userInputElement.value, testText); // Calculate accuracy

    // displays results
    wpmElement.textContent = wpm;
    accuracyElement.textContent = accuracy;
}

// calculates accuracy of typed text
// always returns 100, to be fixed
function calculateAccuracy(input, text) {
    const inputWords = input.split(' ');
    const textWords = text.split(' ');

    let correctWords = 0;

    inputWords.forEach((word, index) => {
        if (word === textWords[index]) {
            correctWords++;
        }
    });

    return Math.round((correctWords / textWords.length) * 100); 
}
// Define the list of vocab words
const words = [
    "inference", "theme", "tone", "mood", "diction", "syntax", "motif", "connotation", 
    "denotation", "counterargument", "catharsis", "hubris", "elegy", "foil", 
    "archetype", "epiphora", "didactic", "euphony", "farce", "verisimilitude"
];

// Define prompts for each word (at least one definition or example per word)
const prompts = {
    "inference": [
        "A conclusion drawn from evidence and reasoning.",
        "Based on the clues, she made an ___ about the mystery."
    ],
    "theme": [
        "The central idea or message in a work of literature.",
        "The ___ of love was evident in the novel."
    ],
    "tone": [
        "The author's attitude toward the subject.",
        "The ___ of the letter was formal and polite."
    ],
    "mood": [
        "The atmosphere or feeling created by a literary work.",
        "The dark, stormy night set a ___ of suspense."
    ],
    "diction": [
        "The choice of words used in writing or speech.",
        "The poet's ___ was simple yet profound."
    ],
    "syntax": [
        "The arrangement of words and phrases to create sentences.",
        "The unusual ___ made the sentence difficult to understand."
    ],
    "motif": [
        "A recurring element or idea in a literary work.",
        "The ___ of light and darkness appeared throughout the story."
    ],
    "connotation": [
        "The implied or suggested meaning of a word.",
        "The word 'home' has a warm, positive ___."
    ],
    "denotation": [
        "The literal or dictionary meaning of a word.",
        "The ___ of 'rose' is a type of flower."
    ],
    "counterargument": [
        "An argument made to oppose another argument.",
        "He presented a strong ___ to challenge the main thesis."
    ],
    "catharsis": [
        "The release of pent-up emotions, often through art.",
        "The tragic ending provided a sense of ___ for the audience."
    ],
    "hubris": [
        "Excessive pride or self-confidence leading to downfall.",
        "His ___ led him to ignore all warnings."
    ],
    "elegy": [
        "A poem of serious reflection, typically a lament for the dead.",
        "The poet wrote an ___ to mourn his friend."
    ],
    "foil": [
        "A character who contrasts with another to highlight qualities.",
        "The cheerful character served as a ___ to the brooding protagonist."
    ],
    "archetype": [
        "A typical example of a certain person or thing in literature.",
        "The hero's journey is a classic ___."
    ],
    "epiphora": [
        "The repetition of a word or phrase at the end of successive clauses.",
        "The speaker used ___ for emphasis: 'I want justice, I demand justice.'"
    ],
    "didactic": [
        "Intended to teach, particularly with moral instruction.",
        "The fable was ___ , teaching a clear lesson."
    ],
    "euphony": [
        "Pleasing or sweet sound, especially in language.",
        "The poem's ___ made it delightful to read aloud."
    ],
    "farce": [
        "A comic dramatic work using buffoonery and horseplay.",
        "The play was a ___, full of absurd situations."
    ],
    "verisimilitude": [
        "The appearance of being true or real in literature.",
        "The novel's ___ made the fictional world believable."
    ]
};

// Game state variables
let shuffledWords;
let currentLevel;
let wrongGuesses;
let tries;
let currentWord;

// Start or reset the game
function startGame() {
    // Shuffle the words array
    shuffledWords = words.slice().sort(() => Math.random() - 0.5);
    currentLevel = 0;
    wrongGuesses = 0;
    tries = 0;
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('finalMessage').innerHTML = '';
    document.getElementById('playAgainButton').style.display = 'none';
    displayLevel();
}

// Display the current level
function displayLevel() {
    if (currentLevel < 20) {
        currentWord = shuffledWords[currentLevel];
        // Select a random prompt for the current word
        const promptList = prompts[currentWord];
        const prompt = promptList[Math.floor(Math.random() * promptList.length)];
        document.getElementById('levelInfo').innerHTML = `Level ${currentLevel + 1} of 20`;
        document.getElementById('prompt').innerHTML = prompt;
        document.getElementById('guessInput').value = '';
        document.getElementById('feedback').innerHTML = '';
        updateHP();
    } else {
        endGame();
    }
}

// Update the current HP display
function updateHP() {
    const hp = Math.max(0, 100 - wrongGuesses * 5);
    document.getElementById('hp').innerHTML = `Current HP: ${hp}`;
}

// Handle the guess submission
function handleGuess() {
    const guess = document.getElementById('guessInput').value.toLowerCase().trim();
    if (guess === currentWord) {
        document.getElementById('feedback').innerHTML = 'Correct!';
        currentLevel++;
        tries = 0;
        setTimeout(displayLevel, 1000); // Delay to show feedback
    } else {
        wrongGuesses++;
        tries++;
        if (tries < 3) {
            document.getElementById('feedback').innerHTML = `Incorrect, try again. You have ${3 - tries} tries left.`;
        } else {
            document.getElementById('feedback').innerHTML = `Sorry, the correct word was "${currentWord}".`;
            currentLevel++;
            tries = 0;
            setTimeout(displayLevel, 2000); // Delay to show correct word
        }
        updateHP();
    }
}

// End the game and show final score
function endGame() {
    const finalHP = Math.max(0, 100 - wrongGuesses * 5);
    document.getElementById('finalMessage').innerHTML = `Game over. Your final grade is ${finalHP}/100`;
    document.getElementById('playAgainButton').style.display = 'inline-block';
}

// Event listeners
document.getElementById('submitButton').addEventListener('click', handleGuess);
document.getElementById('playAgainButton').addEventListener('click', startGame);
document.getElementById('guessInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

// Start the game initially
startGame();
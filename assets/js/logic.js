// global variables for tracking game
var questionPointer = 0;
var numberOfQuestions = questions.length;
var userScore;
var initials;
var timer;
var feedbackTimer;

// let's grab some html elements
var timeEl = document.getElementById('time');
var startEl = document.getElementById('start-screen');
var startBtn = document.getElementById('start');
var questionsEl = document.getElementById('questions');
var questionTitle = document.getElementById('question-title');
var choicesEl = document.getElementById('choices');
var endEl = document.getElementById('end-screen');
var finalScoreEl = document.getElementById('final-score');
var initialsEl = document.getElementById('initials');
var submitBtn = document.getElementById('submit');
var feedbackEl = document.getElementById('feedback');

// audio stuff
var correctSound = new Audio('./assets/sfx/correct.wav');
var incorrectSound = new Audio('./assets/sfx/incorrect.wav');
var yay = new Audio('./assets/sfx/yay.mp3');
var awww = new Audio('./assets/sfx/awww.wav');

// starting timer value
var timeCounter = 75;


// a function for starting the timer
// i think this will carry on going while doing other
// stuff below the function call. we'll see...
function startTimer() {

    // for some reason the timer logic delays one interval
    // before executing so doing first logic bit
    // straight away before getting into it solves this
    timeEl.textContent = timeCounter;
    timeCounter--;

    // let's start the timer
    timer = setInterval(function() {

        // set the textcontent of time to counter
        timeEl.textContent = timeCounter;

        // reduce counter by 1
        timeCounter--;

        // check if counter's reached 0
        if (timeCounter < 0) {
            clearTimeout(timer);

            // set user score to zero
            userScore = 0;

            // give em some feedback
            showFeedback('You ran out of time!')
            awww.play();

            // end game
            endGame();
        }
    }, 1000);

}

// a function to show the next question.
// won't be called if there are no more questions
function showQuestion(questionNum, feedback=null) {
    
    // grab the question we're interested in
    var qObj = questions[questionNum];

    // track what question is being shown
    // by creating custom attribute and
    // putting questionNum into it
    questionsEl.dataset.questionNumber = questionNum;

    // show the question in the h2 element
    questionTitle.textContent = qObj.question;

    // clear choices html
    choicesEl.innerHTML = '';

    // cycle through each choice
    // add a custom attribute
    // add a button
    // and append button to choices element
    for (var i = 0; i < qObj.choices.length; i++) {
        var choice = qObj.choices[i];
        var btn = document.createElement('button')

        btn.dataset.index = i; // adding a new index attribute

        btn.innerText = choice;

        choicesEl.appendChild(btn);
    }

    // check to see if loop is the first
    if (feedback !== null) {

        // show appropriate feedback
        if (feedback===true) {
            showFeedback('Correct!');
            correctSound.play();
        } else {
            showFeedback('Wrong!');
            incorrectSound.play();
        }
    }

    // the last thing to do is increment the question pointer
    questionPointer++;
}

// function to show the end screen and final score
function endGame() {
    // hide the question div
    questionsEl.setAttribute('class', 'hide');

    //show the end screen
    endEl.removeAttribute('class')

    // show final score
    finalScoreEl.innerText = userScore;
}

// a function to show some feedback
function showFeedback(message) {
    // show element
    feedbackEl.setAttribute('class', 'feedback');
    feedbackEl.innerText = message;

    // wait 1.5 seconds before hiding feedback
    setTimeout( function() {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1500);
}

// a function to store the score by the user.
// it adds the new score to the locally stored object
// that contains all scores, sorts it, then puts all scores back
function storeScore() {
    var scoreEntry = {initials: initials, score: userScore};
    var currentScores = JSON.parse(localStorage.getItem('quiz_highscores'));
    // check if it's null
    if (currentScores === null) {
        // if it is null, then just put the score as one entry
        localStorage.setItem('quiz_highscores', JSON.stringify([scoreEntry]))
    } else {
        // add to end of array
        currentScores.push(scoreEntry);

        // sort array based on scores (hopefully this works)
        currentScores.sort((a, b) => {
            return b.score - a.score;
        });

        // store the sorted scores
        localStorage.setItem('quiz_highscores',JSON.stringify(currentScores));
    }
}

// function that checks to see if only alphabetic characters
// have been used in a string
function containsOnlyLetters(str) {
    return /^[a-zA-Z]*$/.test(str);
}


// an event listener for starting the game
startBtn.addEventListener('click', function() {
    // start the timer
    startTimer();

    // hide the start screen
    startEl.setAttribute('class', 'hide');

    // show the question div
    questionsEl.removeAttribute('class');

    // show the first question
    showQuestion(questionPointer);
});

// an event listener for when a user click on an answer
choicesEl.addEventListener('click', function(event) {
    // find the element that is being clicked on
    var element = event.target;

    // check if button has been clicked
    if (element.matches('button')) {

        // check what choice user has clicked on
        var userChoice = element.dataset.index;

        // check if it's a winning question
        var winningIndex = questions[questionsEl.dataset.questionNumber].answerIndex;

        // boolean to help with feedback
        var isCorrect = false;

        // a soft equality
        if (userChoice==winningIndex) {
            isCorrect = true;
        } else {
            timeCounter -= 10; // 10 second penalty if wrong
            timeEl.textContent = timeCounter; // need to add this so that it immediately changes time on screen
        }

        // check if another question is possible
        if (questionPointer < numberOfQuestions) {
            showQuestion(questionPointer, isCorrect);
        } else {
            // showing feedback for last question here
            // which probably isn't the best solution but it works
            if (isCorrect) {
                showFeedback('Correct!')
                // correctSound.play();
            } else {
                showFeedback('Wrong');
                // incorrectSound.play();
            }
            yay.play();

            // get the numeric score
            userScore = Number(timeCounter);

            // stop timer
            timeEl.textContent = timeCounter; // need to add this so score on screen matches end time
            clearTimeout(timer);

            // end game
            endGame();
        }
    }
})

// an event listener for when user submits their score to leaderboard
submitBtn.addEventListener('click', function(){
    // grab initials
    initials = initialsEl.value;

    // validate text entry
    if (initials==='') {
        showFeedback('Need at least one character!');
    } else if (containsOnlyLetters(initials)===false) {
        showFeedback('Only enter alphabetic characters!')
    } else {
        // uppercase initials just in case
        initials = initials.toUpperCase();

        // store the score
        storeScore()

        // go to highscores
        document.location.href = './highscores.html';
    }
});
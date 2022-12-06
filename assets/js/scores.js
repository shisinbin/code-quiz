
// grab html elements
var scoresList = document.getElementById('highscores');
var clearBtn = document.getElementById('clear');

// function to render the scores on page from storage
function renderScores() {

    // get scores from storage, if they're there
    var currentScores = JSON.parse(localStorage.getItem('quiz_highscores'));

    // clear inner html of the list, just in case
    scoresList.innerHTML = '';

    if (currentScores!== null) {
        // cycle through already sorted scores and
        // append them as list items
        for (entry of currentScores) {
            // create an li
            var li = document.createElement('li');

            // set inner text of li to entry
            li.innerText = `${entry.initials} - ${entry.score}`;

            // append to list
            scoresList.appendChild(li);
        }
    }
}

// an event lister for clearing scores
clearBtn.addEventListener('click', function() {
    // remove scores from local storage
    localStorage.removeItem('quiz_highscores');

    // clear the list from screen (could call renderScores() instead)
    scoresList.innerHTML='';
})

renderScores();


// seems kinda unnecessary, but here's a separate
// js file that stores the questions (and answers)
var questions = [
    {
        question: 'Which data type is NOT supported by JavaScript?',
        choices: ['object','boolean','number', 'date'],
        answer: 'date',
        answerIndex: 3
    },
    {
        question: 'To remove the first item from an array, using which method would be most suitable?',
        choices: ['push()','shift()','pop()','unshift()'],
        answer: 'shift()',
        answerIndex: 1
    },
    {
        question: 'Which of these options would return true?',
        choices: ["false == 'false'",'false == undefined',"false == '0'",'false == null'],
        answer: "false == '0'",
        answerIndex: 2
    },
    {
        question: "What's a good method to use to stop an interval timer?",
        choices: ['clearInterval()', 'clearTimeout()', 'clearTimer()', 'terminateInterval()'],
        answer: 'clearTimeout()',
        answerIndex: 1
    },
    {
        question: 'Which two forms of notation can be used to access the properties of an object?',
        choices: ['dot and bracket','dash and parentheses','question and brace','comma and curly'],
        answer: 'dot and bracket',
        answerIndex: 0
    }
]




// var questions = [
//     {
//         question: 'which ninja turtle shares his name with the painter of the sistine chapel?',
//         choices: ['donatello','leonardo','raphael', 'michelangelo'],
//         answer: 'michelangelo',
//         answerIndex: 3
//     },
//     {
//         question: 'what should I pack for my summer holiday?',
//         choices: ['the gun','cannoli','monday, tuesday','thursday, wednesday'],
//         answer: 'cannoli',
//         answerIndex: 1
//     },
//     {
//         question: 'what is the true holiday of the season?',
//         choices: ['las posadas','christmas','festivus','hanukkah'],
//         answer: 'festivus',
//         answerIndex: 2
//     },
//     {
//         question: 'why do i feel so blue?',
//         choices: ['it be natural yo','tis but the changing of the season','harsh realities harder to ignore','genetics'],
//         answer: 'it be natural yo',
//         answerIndex: 0
//     }
// ]
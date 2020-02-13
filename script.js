const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame(){
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort( ()=> Math.random() - .5 );
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach( answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');
    }else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide'); 
    }
  
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    }else{
        element.classList.add('wrong');
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            {text: '4 ', correct: true},
            {text: '22', correct: false}
        ]
    },
    {
        question: 'Which animal is larger?',
        answers: [
            {text: 'Zebra', correct: false},
            {text: 'Elephant', correct: true},
            {text: 'Lion', correct: false},
            {text: 'Pelican', correct: false}

        ]
    },
    {
        question: 'What is the capital of Canada?',
        answers: [
            {text: 'Vancouver', correct: false},
            {text: 'Toronto', correct: false},
            {text: 'Montreal', correct: false},
            {text: 'Ottawa', correct: true}
        ]
    },
    {
        question: 'What is a baby turkey called?',
        answers: [
            {text: 'Chick', correct: true},
            {text: 'Turkette', correct: false}
        ]
    },
    {
        question: 'What country was the first to send an object to the surface of the moon?',
        answers: [
            {text: 'The Soviet Union', correct: true},
            {text: 'USA', correct: false},
            {text: 'China', correct: false},
            {text: 'England', correct: false}
        ]
    },
    {
        question: 'What is a group of owls called?',
        answers: [
            {text: 'Hooters', correct: false},
            {text: 'A Parliament', correct: true},
            {text: 'Owlings', correct: false},
            {text: 'Republica of Owls', correct: false}
        ]
    }
]
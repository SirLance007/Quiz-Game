const questions = [
    {
        question: "What is the capital of France?",
        answer: [
            {text : "Paris" , correct : true},
            {text : "London" , correct : false},
            {text : "Berlin" , correct : false},
            {text : "Madrid" , correct : false}
        ]
    },
    {
            question: "Which planet is known as the Red Planet?",
            answer: [
                {text : "Earth" , correct : false},
                {text : "Mars" , correct : true},
                {text : "Jupiter" , correct : false},
                {text : "Saturn" , correct : false}
            ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answer: [
            {text : "Atlantic Ocean" , correct : false},
            {text : "Indian Ocean" , correct : false},
            {text : "Arctic Ocean" , correct : false},
            {text : "Pacific Ocean" , correct : true}
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answer: [
            {text : "Harper Lee" , correct : true},
            {text : "Mark Twain" , correct : false},
            {text : "Ernest Hemingway" , correct : false},
            {text : "F. Scott Fitzgerald" , correct : false}
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answer: [
            {text : "Au" , correct : true},
            {text : "Ag" , correct : false},
            {text : "Pb" , correct : false},
            {text : "Fe" , correct : false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState(); 
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach( answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct ){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach( button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "You scored " + score + "/" + questions.length;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

startQuiz();


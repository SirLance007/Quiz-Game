const questions = [
    {
        question: "Your brain size?",
        answer: [
            {text : "5 macrometer" , correct : false},
            {text : "1 macrometer" , correct : false},
            {text : "0.5 macrometer" , correct : false},
            {text : "Do not exist" , correct : true}
        ]
    },
    {
            question: "Your favourite word?",
            answer: [
                {text : "Bhnekilodi" , correct : false},
                {text : "Madarchod" , correct : false},
                {text : "Bhenkaloda" , correct : false},
                {text : "Sare thode thode bol leti hu" , correct : true}
            ]
    },
    {
        question: "Smallest thing in the world?",
        answer: [
            {text : "Chiti ka baccha" , correct : false},
            {text : "Machar ka nak ka baal" , correct : false},
            {text : "Choti abcd" , correct : false},
            {text : "Unnati" , correct : true}
        ]
    },
    {
        question: " What word is spelled incorrectly in every single dictionary?",
        answer: [
            {text : "Nhi ata" , correct : false},
            {text : "Tumhe bhi nhi pata" , correct : false},
            {text : "Hume bhi nhi pata" , correct : false},
            {text : "Kisiko nhi pata" , correct : true}
        ]
    },
    {
        question: "Whats greater than God and more evil than the devil. Rich people want it, poor people have it. And if you eat it, you’ll die?",
        answer: [
            {text : "Nothing" , correct : true},
            {text : "Apple" , correct : false},
            {text : "Haye mar java gud khake" , correct : false},
            {text : "Bhenco ye bhi nhi pata" , correct : false}
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


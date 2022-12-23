const question = document.getElementById('question'); 
const options = Array.from(document.getElementsByClassName('option-text')); 
const progresstext = document.getElementById('progresstext') ;
const progressbar = document.getElementById('progress-bar-full') ; 
const game = document.getElementById('game') ; 
const loader = document.getElementById('loader') ; 
const scoreelement = document.getElementById('score');
const correct_bonus = 10 ; 
const max_questions = 10 ; 

let currentQuestion = {}; 
let acceptingAnswers = false ; 
let score = 0 ; 
let questionCounter = 0 ; 
let availableQuestions = []; 

let questions = [];

fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple') 
    .then( (res) =>{
    return res.json();
})
    .then((loadedquestions) =>{
        questions= loadedquestions.results.map(loadedquestion =>{
        const formattedquestion = {
            question :JSON.stringify(loadedquestion.question) 
        } ;
        
            
        const answerchoices = [...loadedquestion.incorrect_answers] ; 
        formattedquestion.answer = Math.floor(Math.random()*3 +1 ); 
        
        answerchoices.splice(formattedquestion.answer - 1,0,loadedquestion.correct_answer);
        
        answerchoices.forEach((choice,index) => {
            formattedquestion['choice'+(index+1)] = choice ;
        }) ; 

        return formattedquestion ;
        
    });
    
    startgame();
}) 
    .catch (error =>{
    console.error(error)
}) ; 

startgame = () => {
    questionCounter = 0 ;
    score = 0 ;
    availableQuestions = [...questions] ; 
    getnewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden') ;

}

getnewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= max_questions) {
        return window.location.assign('./endGame.html')
    }
    
    questionCounter ++ ; 
    progresstext.innerText = `Question : ${questionCounter}/${max_questions}` ; 

    progressbar.style.width = `${(questionCounter / max_questions) * 100}%` ; 

    const questionIndex =  Math.floor(Math.random()* availableQuestions.length) ; 
    currentQuestion = availableQuestions[questionIndex] ; 
    question.innerText = currentQuestion.question; 
    options.forEach(option =>{
        const number = option.dataset['number'] ; 
        option.innerText = currentQuestion['choice'+number]

    })
    availableQuestions.splice(questionIndex,1) ; 
    acceptingAnswers = true ; 
}
   
   
  
incrementscore = num => {
    score += num ; 
    scoreelement.innerText = score;
    localStorage.setItem('RecentScore',score)
    
}




options.forEach(option =>{
    option.addEventListener('click', e =>{
        if (!acceptingAnswers) return ; 
        acceptingAnswers = false ; 
        const selectedOption = e.target; 
        const selectedAnswer = selectedOption.dataset['number'];

        let classToApply = 'incorrect'
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct'
            incrementscore(correct_bonus);
        }

        selectedOption.parentElement.classList.add(classToApply);
        

        setTimeout (()=>{
            selectedOption.parentElement.classList.remove(classToApply);
            getnewQuestion();
        },1000)

    })
})

       
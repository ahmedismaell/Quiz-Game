const username = document.getElementById('username') ; 
const saveScoreButtton = document.getElementById('savescorebtn'); 
const finalScore = document.getElementById('finalscore') ; 
const RecentScore = localStorage.getItem('RecentScore') ;
const highScores = JSON.parse(localStorage.getItem('highScores')) || [] ; 
const max_highScores = 10 ;


finalScore.innerText =`Your Score:${RecentScore}` ; 

username.addEventListener('keyup',()=>{
    saveScoreButtton.disabled = !username.value ; 
})

SaveHighScore = (e) => {
    e.preventDefault();
const score = { 
    score : RecentScore , 
    name : username.value 
} ;
highScores.push(score) ; 
highScores.sort((a,b) => b.score - a.score) ; 
highScores.splice(max_highScores) ;
localStorage.setItem('highScores', JSON.stringify(highScores))
window.location.assign('./index.html')

}
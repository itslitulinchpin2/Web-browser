'use strict'
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const CARROT_SIZE=80;
const CARROT_COUNT=5;
const BUG_COUNT=5;
const GAME_DURATION=5;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up')
const popUpText = document.querySelector('.pop-up__message')
const popUpRefresh = document.querySelector('.pop-up__refresh')
let started = false;
let score=0;
let timer = undefined;

const carrotSound = new Audio('./carrot/sound/carrot_pull.mp3')
const bugSound = new Audio('./carrot/sound/bug_pull.mp3')
const winSound = new Audio('./carrot/sound/game_win.mp3')
const backgroundSound = new Audio('./carrot/sound/bg.mp3')
const alertSound = new Audio('./carrot/sound/alert.wav')

field.addEventListener('click',onFieldClick)

gameBtn.addEventListener('click', ()=>{
    if(started){
        stopGame();
    } else {
        startGame();
    }
 
})

popUpRefresh.addEventListener('click',()=>{
    startGame();
    hidePopup();
})

function finishGame(win){
    started=false;
    stopGameTimer();
    hideGameButton();
    stopSound(backgroundSound);
    if(win){
        playSound(winSound);
    } else {
        playSound(bugSound);
    }

    showPopUpWithText(win?'You Won!' : 'You lost!')

}

function startGame(){
    started=true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(backgroundSound);
}

function startGameTimer(){
    let remaingTimeSec = GAME_DURATION;
    updateTimerText(remaingTimeSec);
    timer = setInterval(()=>{
        if(remaingTimeSec<=0){
            clearInterval(timer);
            finishGame(CARROT_COUNT===score);
            return ;
        } else{
            updateTimerText(--remaingTimeSec);
        }
    },1000)
}

function stopGameTimer(){
    clearInterval(timer);
    hideGameButton();
    showPopUpWithText('Replay?');
}

function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time%60;
    gameTimer.innerText=`${minutes}:${seconds}`
}

function stopGame(){
    started=false
    stopGameTimer();
    stopSound(backgroundSound);
    playSound(alertSound);

    
}
function hideGameButton(){
    gameBtn.style.visibility='hidden';
}

function showTimerAndScore(){
    gameTimer.style.visibility='visible';
    gameScore.style.visibility='visible';
}

function showStopButton(){
    const icon = gameBtn.querySelector('.fa-solid')
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showPopUpWithText(text){
    popUpText.innerText=text;
    popUp.classList.remove('pop-up--hide')
}

function hidePopup(){
    popUp.classList.add('pop-up--hide')
}

function onFieldClick(event){
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(score===CARROT_COUNT){
            
            finishGame(true)
        }
    } else if (target.matches('.bug')){
        
        finishGame(false);
    }
}
function playSound(sound){
    sound.currentTime=0;
    sound.play();
}
function stopSound(sound){
    sound.pause();
}

function updateScoreBoard(){
    gameScore.innerText=CARROT_COUNT-score;
}




function initGame(){
    score=0;
    field.innerHTML=''
    gameScore.innerText=CARROT_COUNT;
    //당근과 벌레 생성 후 field에 추가
    //console.log(fieldRect);
    addItem('carrot',CARROT_COUNT,'./carrot/img/carrot.png')
    addItem('bug',BUG_COUNT,'./carrot/img/bug.png')
}

function addItem(className,count,imgPath){
    const x1=0;
    const x2=fieldRect.width-CARROT_SIZE;
    const y1=0;
    const y2=fieldRect.height-CARROT_SIZE;

    for(let i=0;i<count;i++){
        const item = document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src',imgPath);
        item.style.position='absolute';
        const x = randomNumber(x1,x2);
        const y = randomNumber(y1,y2);

        item.style.left =`${x}px`
        item.style.top = `${y}px`

        field.appendChild(item);
    }
}

function randomNumber(min,max){
    return Math.random()*(max-min)+min;

}

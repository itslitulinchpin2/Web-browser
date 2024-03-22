const container = document.querySelector('.background');
//console.log(container);
let containerWidth = container.offsetWidth;
let containerHeight = container.offsetHeight;
//console.log(containerWidth,containerHeight);


// const background = container.getBoundingClientRect();
// console.log(background);

let carrots=[];
let bugs=[];
let timer=10;
function repeatedFunction() {
    const timerH3 = document.querySelector('.timer');
    timer--;
    timerH3.innerHTML=`
    time left: ${timer}`
    if(timer===0){
        alert('시간 초과로 게임 종료!')
        clearAll();
    }
}

// 1초마다 repeatedFunction 함수를 반복 실행합니다.

let intervalId = setInterval(repeatedFunction, 1000);


function createImage(src,name){
    
    for(let i=0;i<10;i++){

        let img = document.createElement('img');
        img.src = src;
        //console.log(img);
        img.classList.add(name);
        img.id=`${name}${i}`;
        
        // 랜덤한 위치 설정
        let x = (Math.random() * (containerWidth-img.width));
        let y = (Math.random() * (containerHeight-img.height));
        
        img.style.left = x + 'px';
        img.style.top = y + 'px';

        // 이미지를 화면에 추가합니다.
        container.appendChild(img);

        if(name==='carrot'){
            carrots.push(img);
        } else if (name==='bug'){
            bugs.push(img);
        }

    }

}

function createImages(){
    createImage('./carrot/img/carrot.png','carrot');
    createImage('./carrot/img/bug.png','bug');

}

createImages();



function clearAll(){
    timer=10;
    for(let i=0;i<10;i++){
        if(carrots[i]!==''){
            let carrot = document.querySelector(`#carrot${i}`);
            container.removeChild(carrot);
        }
        let bug = document.querySelector(`#bug${i}`);
        container.removeChild(bug);
    }
    carrots=[];
    bugs=[];

    createImages();
    carrotClick();
    bugClick();
    
}

function carrotClick(){
    let clicked=0;
    for(i=0;i<10;i++){
        let carrot = document.querySelector(`#carrot${i}`)
        //console.log(carrot);
        carrot.addEventListener('click',function(e){
    
            const id = e.target.id[6];
            //console.log(id)
            //console.log(`carrot${i} clicked`);
            carrots[id]='';
            container.removeChild(carrot);
            clicked++;
            if(clicked===10){
                alert('게임 성공!')
            }
    })}}




function bugClick(){
    for(i=0;i<10;i++){
        let bug = document.querySelector(`#bug${i}`)
        //console.log(bug);
        bug.addEventListener('click',function(i){   
            alert('벌레 클릭으로 게임종료! 다시 시작');
            clearAll();
    })}}

function stopTimer(){
    
    clearInterval(intervalId);
    alert('타이머 일시 정지!')
}

function contineTimer(){
    alert('게임을 다시 재개합니다!')
    intervalId = setInterval(repeatedFunction, 1000);
}



carrotClick();
bugClick();
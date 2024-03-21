//false: 0,-0,'',null,undefined
//true:영을 제외한 모든 숫자, 빈 배열은, 빈 객체는 true임!

let num;

if(num){
    console.log(num);
} else {
    console.log('false');
}

//num이 true이면 (데이터가 있다면)
//즉 위의 코드와 아래줄의 코드는 동일하다.
num && console.log(num);

//&&연산자를 자주 사용하자. 존재한다면을 먼저 검사.

let obj = {
    name:'lee'
}

obj.name && console.log(obj.name);





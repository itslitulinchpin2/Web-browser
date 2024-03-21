function add(num1,num2){
    return num1+num2
}

//함수도 객체이므로 아래 선언이 당연히 가능.
//함수의 이름이 가리키는 곳을 똑같이 가리킴.
//레퍼런스 복사임을 잊지 말자.
const doSomething = add;
console.log(doSomething(1,1))

function surprise(operator){
    const result = operator(2,3); //add(2,3) 과 동일
    console.log(result);
}

surprise(add);


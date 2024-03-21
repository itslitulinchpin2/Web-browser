const obj = {
    name:'lee',
    age:30
}

console.log(obj);

//obj 자체를 바꾸는 것은 불가능.(const)

// obj = {
//     name:'kim',
//     age:39
// }

// console.log(obj);

//하지만 obj.name을 바꾸는 것은 가능함
//refernce주소는 바뀌지 않기 때문.

obj.name='park';
console.log(obj);
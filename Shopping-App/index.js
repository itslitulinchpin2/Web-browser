function handleKeyPress(event) {
    // 엔터 키의 keyCode는 13입니다.
    if (event.keyCode === 13) {
        submit();
    }
}

// 입력란에서 키를 눌렀을 때 handleKeyPress 함수 호출
document.getElementById('textInput').addEventListener('keydown', handleKeyPress);

function submit(e){
    
    const value = getValue();

    const section = document.querySelector('#lists')

    const list = document.createElement('div');
    list.setAttribute("class", "list");
    list.setAttribute("id",value);
    list.innerHTML=`
    <h2>${value}</h2>
    <button onclick="remove('${value}')">삭제</button>`

    section.append(list);



    
    // list.setAttribute("id", )
    // section.append()
}

function remove(value){
    const section = document.querySelector('#lists')
    console.log(section);
    const list = document.getElementById(value);
    console.log(list);
    section.removeChild(list);
    
}



function getValue(){
    let inputElement = document.getElementById('textInput');
    let inputValue = inputElement.value;
    
    console.log(inputValue);
    inputElement.value=''

    return inputValue;
}


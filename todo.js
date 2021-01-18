const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = 'toDos';
const toDos = [];
const CHECKED_TODO = 'checked-line'
const DEL_ICN = 'fas fa-trash'

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));

}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDos(toDo.text);
        });
    }
}

function removeProcess(clicked, selectedToDo){
    const liId = clicked.path[1].id;
    const currentLi = document.getElementById(liId);
    const currentIdx = toDos.findIndex(function(item){return item.id = liId})
    toDos.splice(currentIdx, 1)
    currentLi.remove();
    saveToDos();
}

function checkProcess(clicked, selectedToDo){
    // css 에서 줄긋기
    const liId = clicked.path[1];
    if(liId.classList.contains(CHECKED_TODO)){
        liId.classList.remove(CHECKED_TODO); 
     }else{
        liId.classList.add(CHECKED_TODO);
     }
    // liId.innerText = `<del></del>`
}

function unCheckProcess(clicked, selectedTodo){
    const liId = clicked.path[1]
    if(liId.includes(CHECKED_TODO)){
       liId.classList.remove(CHECKED_TODO); 
    }
}

function selectedToDo(event){
    const clicked = event.target.parentNode;
    return clicked
}

function clickProcess(delBtn, checkBtn) {
    delBtn.addEventListener('click', removeProcess);
    checkBtn.addEventListener('click', checkProcess);
}



function paintToDos(text){
    const li = document.createElement("li");
    const checkBtn = document.createElement("icon");
    const delBtn = document.createElement("icon");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    // delBtn.classList.add(DEL_ICN);
    delBtn.classList.add('fas', 'fa-trash');
    checkBtn.classList.add('fas', 'fa-check');
    span.innerText = text;
    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        id: newId,
        text
    };
    toDos.push(toDoObj);
    saveToDos();
    clickProcess(delBtn, checkBtn);
}

function handelSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDos(currentValue);
    toDoInput.value = "";
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handelSubmit);
}

init();

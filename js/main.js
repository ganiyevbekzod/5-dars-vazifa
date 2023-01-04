const elForm=document.querySelector(".js-form");
const elInput=document.querySelector(".js-input");
const elButton=document.querySelector(".js-button");
const elList=document.querySelector(".js-list");
const elDeleteBtn=document.querySelector(".js-delete-btn");
const newEditBtn=document.querySelector(".js-edit-btn");
const ElAllcount=document.querySelector(".js-Allcount");
const ElComplateSpan=document.querySelector(".js-Complatecount");
const ElUncompleted=document.querySelector(".js-uncomplatecount");
const ElDarkmode=document.querySelector(".js-dark")
const elAllBtns=document.querySelector(".js-btns")
const localData=JSON.parse(window.localStorage.getItem("todos"))
const todos=localData ? localData:[];

const renderTodo=(array,node) =>{
        // TODOlarni obyektdan stringga utkazish
        window.localStorage.setItem("todos",JSON.stringify(todos))
    ElAllcount.textContent=todos.length;
    ElComplateSpan.textContent=todos.filter((item)=>item.isCompleted).length;
    ElUncompleted.textContent=todos.filter((item)=>!item.isCompleted).length;
    node.innerHTML="";
    
    array.forEach((item) => {
       const newItem=document.createElement("li") ;
       const newSpan=document.createElement("span")
       const newInput=document.createElement("input")
       const newDeleteButton=document.createElement("button")
       const newEditButton=document.createElement("button")
       newItem.setAttribute("class","list-group-item d-flex align-items-center")
       newSpan.setAttribute("class","flex-grow-1 mx-4")
       newInput.setAttribute("class","form-check-input m-0 js-check")
       newDeleteButton.setAttribute("class","btn btn-danger mx-3 js-delete-btn")
       newEditButton.setAttribute("class","btn btn-info js-edit-btn")
       newSpan.textContent=item.text;
       newInput.type="checkbox";
       newDeleteButton.textContent="Delete";
       newEditButton.textContent="Edit";    
       newDeleteButton.dataset.todoId=item.id;
       newEditButton.dataset.todoId=item.id;
       newInput.dataset.todoId=item.id;
       newItem.appendChild(newInput);
       newItem.appendChild(newSpan);
       newItem.appendChild(newEditButton);
       newItem.appendChild(newDeleteButton)
       node.appendChild(newItem);
       if(item.isCompleted){
        newInput.checked=true;
        newSpan.style.textDecoration="line-through"
        newSpan.style.color="red";
       }
    });
};
renderTodo(todos,elList)
elForm.addEventListener("submit",function(evt){
    evt.preventDefault();

    const newTodo={
        id:todos.length? todos[todos.length-1].id+1 :1,
        text:elInput.value,
        isCompleted:false,
    }
    todos.push(newTodo);
    elInput.value="";
    renderTodo(todos,elList)


})

elList.addEventListener("click",function(evt){
    if((evt.target.matches(".js-delete-btn"))){
    const todoId=evt.target.dataset.todoId;
    const findedIndex=todos.findIndex((item) => item.id==todoId)
    todos.splice(findedIndex,1);
    renderTodo(todos,elList);
};
    if(evt.target.matches(".js-edit-btn")){
    const todoId=evt.target.dataset.todoId;
    const findedItem=todos.find((item) => item.id==todoId);
    const NewText=prompt("ISMINGIZNI TAHRIRLANG",findedItem.text)
    findedItem.text=NewText
    renderTodo(todos,elList)
}
if(evt.target.matches(".js-check")){
    const todoId=+evt.target.dataset.todoId;
    const findedItem=todos.find((item) => item.id===todoId);
    findedItem.isCompleted=!findedItem.isCompleted;
    renderTodo(todos,elList)
    }
})

elAllBtns.addEventListener("click",function(evt){
    if(evt.target.matches(".js-all")){
        renderTodo(todos,elList)
    }
    if(evt.target.matches(".js-complate")){
        const filteredTodos=todos.filter((item)=>item.isCompleted);
        renderTodo(filteredTodos,elList)
    }
    if(evt.target.matches(".js-uncomplate")){
        const filteredTodos=todos.filter((item)=>!item.isCompleted);
        renderTodo(filteredTodos,elList)
    }
})

// darkmode
let theme=false
ElDarkmode.addEventListener("click",function (){
    theme=!theme
    const bg=theme ? "dark" :"light";
    window.localStorage.setItem("theme",bg)
    changeTheme()
});
function changeTheme() {
    if(window.localStorage.getItem("theme")=="dark"){
        document.body.classList.add("dark");
    }
    else{
        document.body.classList.remove("dark");
    }
    changeTheme()
}




































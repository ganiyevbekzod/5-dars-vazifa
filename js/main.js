const elForm=document.querySelector(".js-form");
const elInput=document.querySelector(".js-input");
const elButton=document.querySelector(".js-button");
const elList=document.querySelector(".js-list");
const elDeleteBtn=document.querySelector(".js-delete-btn");
const newEditBtn=document.querySelector(".js-edit-btn");
const ElAllcount=document.querySelector(".js-Allcount");
const ElComplateSpan=document.querySelector(".js-Complate");

const todos=[];

const renderTodo=(array,node) =>{
    elList.innerHTML="";
    ElAllcount.textContent=todos.length;
    array.forEach(item => {
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


       if(item.isCompleted){
        newInput.checked=true;
        newSpan.style.textDecoration="line-through"
        newSpan.style.color="red";
       }



       newDeleteButton.dataset.todoId=item.id;
       newEditButton.dataset.todoId=item.id;
       newInput.dataset.todoId=item.id;


       newItem.appendChild(newInput);
       newItem.appendChild(newSpan);
       newItem.appendChild(newEditButton);
       newItem.appendChild(newDeleteButton)
      node.appendChild(newItem);

    });
};
elForm.addEventListener("submit",function(evt){
    evt.preventDefault();

    const newTodo={
        id:todos.length+1,
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
    const NewText=prompt("ISMINGIZNI TAHRIRLANG  ",findedItem.text)
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






//     let complateArray = [];
//     elBtnComplate.addEventListener("click", () => {
//     let todoFilter = todos.filter((item) => item.isCompleted == true);
//     complateArray.push(todoFilter);
//     console.log(complateArray[0]);
//     todoFunc(complateArray[0], elList);
//   });
// //   let unComplateArray = [];
//   elUncompBtn.addEventListener("click", () => {
//     let todoFilter = todos.filter((item) => item.isCompleted == false);
//     unComplateArray.push(todoFilter);
//     console.log(unComplateArray[0]);
//     todoFunc(unComplateArray[0], elList);
//   });



































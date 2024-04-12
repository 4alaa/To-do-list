var addNewTask=document.querySelector(".addNewTask")
addNewTask.addEventListener("click",showFixedModel)

var taskDetails

var statusInput=document.getElementById("taskStatus")
var titleInput=document.getElementById("taskTitle")
var categoryInput=document.getElementById("taskCategory")




function returnToNormal() {


    titleInput.value = "";

    titleInput.classList.remove("is-valid")
    titleInput.classList.remove("is-invalid")
    document.querySelector("small").classList.add("d-none")


}


titleInput.classList.remove("is-valid")
titleInput.classList.remove("is-invalid")
document.querySelector("small").classList.add("d-none")


function showFixedModel()
{

    document.querySelector(".fixedmodel").classList.remove("d-none")
}


var addTask=document.querySelector(".addTask")
addTask.addEventListener("click", function () {
  
  validateName()
  if(validateName()==true)
  {
    hideModel()

    document.querySelector("small").classList.add("d-none")


  }

} )


function hideModel()
{

    document.querySelector(".fixedmodel").classList.add("d-none")
}

document.addEventListener('keydown',function (e) {
    
    if(e.key=="Escape")
    {
        hideModel()
        returnToNormal()
    }
    
})

document.addEventListener("click",function (e) {
    
    if (e.target.id=="fixedmodel") {
        
        hideModel()
        returnToNormal()
 
    }
    if(e.target.id=="addForm")
    {
        hideModel()
        returnToNormal()

    }

  })


var allTasks=[]
var mustContainer=document.getElementById("must")
var shouldContainer=document.getElementById("should")
var couldContainer=document.getElementById("could")

// count varibles
var MustCount=document.getElementById("MustCount")
var ShoudCount=document.getElementById("ShoudCount")
var CouldCount=document.getElementById("CouldCount")

if(localStorage.getItem("TasksStorage")!=null)
{

  allTasks=JSON.parse( localStorage.getItem("TasksStorage") )

  for (let i = 0; i < allTasks.length; i++) {

   displayTasks(i)
    
  }
}


// add and update buttons
var addBtn=document.getElementById("addBtn")
var updateBtn=document.getElementById("updateBtn")


var allCOL4=document.querySelectorAll(".col-lg-4")
var allItems=document.querySelectorAll(".item")
var mustProperties=document.getElementById("must")


function addTaskInArray() {
  
  validateName()

  if(validateName()==true)
  {


    taskDetails={
      status:statusInput.value,
      category:categoryInput.value,
      title:titleInput.value,
    }
  
    allTasks.push(taskDetails)
  
    localStorage.setItem("TasksStorage",JSON.stringify(allTasks))
  
    displayTasks(allTasks.length - 1)
  
  
    returnToNormal()
  
  
  


  }
  

}
addBtn.addEventListener("click",addTaskInArray)


var taskHtml
function displaySearch(index)
{
  taskHtml=
  `
      <div class="item main-bg p-3 rounded-3 my-3">
      <h3 class="mb-3">${allTasks[index].title}</h3>
      <a class="text-decoration-none p-2 mt-4 rounded-2 ${allTasks[index].category=="Education" ? "text-white bg-danger" : allTasks[index].category=="Finance" ?"bg-warning text-dark" : allTasks[index].category=="Entertainment" ?"text-white bg-success":"text-white bg-secondary"} ">${allTasks[index].category}</a>
      <div class="icons d-flex gap-3 fs-5 mt-4">
      <i class="fa-solid fa-pen-nib" onclick="selectTaskToUpdate(${index})"></i>
      <i class="fa-solid fa-trash-can"  onclick="removeTask(${index})"></i>
      </div>
      </div>
  `
}
function displayTasks(index) {
  
  taskHtml=
  `
      <div class="item item${index} main-bg p-3 rounded-3 my-3">
      <span class="bg-danger text-white  rounded-pill task-done d-none">Task Done</span>
      <h3 class="mb-3">${allTasks[index].title}</h3>
      <a class="text-decoration-none p-2 mt-4 rounded-2 ${allTasks[index].category=="Education" ? "text-white bg-danger" : allTasks[index].category=="Finance" ?"bg-warning text-dark" : allTasks[index].category=="Entertainment" ?"text-white bg-success":"text-white bg-secondary"} ">${allTasks[index].category}</a>
      <div class="icons d-flex gap-3 fs-5 mt-4">
      
      <i class="fa-solid fa-pen-nib" onclick="selectTaskToUpdate(${index})"></i>
      <i class="fa-solid fa-trash-can"  onclick="removeTask(${index})"></i>

      
      </div>
      </div>
  `

  if(allTasks.length>0)
  {
    document.querySelector(".totalTasks").innerHTML=`Total tasks : ${allTasks.length}`

  }
  else
  {
    document.querySelector(".totalTasks").innerHTML=`Total tasks : No tasks`

  }

  

  setTaskLocation(allTasks[index].status)

  // for (let i = 0; i < addTask.length; i++) {
  
  //   if(localStorage.getItem(`.item${i}`)=="done")
  // {
  //   document.querySelector(`.item${i} .task-done`).classList.remove("d-none") 
  
  // }
  // else if( localStorage.getItem(`.item${i}`)=="notDone")
  // {
  //   document.querySelector(`.item${i} .task-done`).classList.add("d-none") 
  
  // }
  // }


}

if(allTasks.length>0)
{
  document.querySelector(".totalTasks").innerHTML=`Total tasks : ${allTasks.length}`

}
else
{
  document.querySelector(".totalTasks").innerHTML=`Total tasks : No Tasks`

}

//  <i class="fa-solid fa-circle-check"  onclick="Done(${index})"></i>
//  <i class="fa-solid fa-xmark" onclick="notDone(${index})"></i>

// function Done(index) {
  
//   document.querySelector(`.item${index} .task-done`).classList.remove("d-none") 
//   localStorage.setItem(`.item${index}`,"done")
// }
// function notDone(index) {
  
//   document.querySelector(`.item${index} .task-done`).classList.add("d-none")
//   localStorage.setItem(`.item${index}`,"notDone")

// }

// for done and not finished storage
for (let i = 0; i < allItems.length; i++) {
  
  if(localStorage.getItem(`.item${i}`)=="done")
{
  document.querySelector(`.item${i} .task-done`).classList.remove("d-none") 

}
else if( localStorage.getItem(`.item${i}`)=="notDone")
{
  document.querySelector(`.item${i} .task-done`).classList.add("d-none") 

}
}




function setTaskLocation(taskStatus) {

  if(taskStatus=="mustDo")
  {
    
    mustContainer.innerHTML+=taskHtml
    MustCount.innerHTML++
    
  }
  else if(taskStatus=="shouldDo")
  {
    shouldContainer.innerHTML+=taskHtml
    ShoudCount.innerHTML++

  }
  else if(taskStatus=="couldDo")
  {
    couldContainer.innerHTML+=taskHtml
    CouldCount.innerHTML++

  }

}
function clearTreeContainer()
{
  mustContainer.innerHTML=" "
  shouldContainer.innerHTML=" "
  couldContainer.innerHTML=" "
}

function makeCountZero()
{
  MustCount.innerHTML=0
  CouldCount.innerHTML=0
  ShoudCount.innerHTML=0
}

// ! remove tasks
function removeTask(index) {
  
  allTasks.splice(index,1)
  clearTreeContainer()
  makeCountZero()

  localStorage.removeItem(`.item${index}`)


  localStorage.setItem("TasksStorage",JSON.stringify(allTasks))
  for (let g = 0; g < allTasks.length; g++) {

    displayTasks(g)
  }
  
  // for (let i = 0; i < allItems.length; i++) {
  
  //   if(localStorage.getItem(`.item${i}`)=="done")
  // {
  //   document.querySelector(`.item${i} .task-done`).classList.remove("d-none") 
  
  // }
  // else if( localStorage.getItem(`.item${i}`)=="notDone")
  // {
  //   document.querySelector(`.item${i} .task-done`).classList.add("d-none") 
  
  // }
  // }

  if(allTasks.length>0)
  {
    document.querySelector(".totalTasks").innerHTML=`Total tasks : ${allTasks.length}`

  }
  else
  {
    document.querySelector(".totalTasks").innerHTML=`Total tasks : No tasks`

  }
}


// ? update tasks
var updateIndex
function selectTaskToUpdate(index)
{
  updateIndex=index
  statusInput.value=allTasks[index].status
  categoryInput.value=allTasks[index].category
  titleInput.value=allTasks[index].title

  showFixedModel()

  addBtn.classList.add("d-none")
  updateBtn.classList.remove("d-none")

}

function updateTask()
{
  allTasks[updateIndex].status=statusInput.value
  allTasks[updateIndex].category= categoryInput.value
  allTasks[updateIndex].title =titleInput.value


    localStorage.setItem("TasksStorage",JSON.stringify(allTasks))

    clearTreeContainer()
    makeCountZero()
    hideModel()
    for (let i = 0; i < allTasks.length; i++) {
     
      displayTasks(i)
    }
    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")

    returnToNormal()



}
returnToNormal()



updateBtn.addEventListener("click",updateTask)


// search
var searchInput=document.getElementById("searchInput")
function search() {

  clearTreeContainer()
  makeCountZero()
  
  for (let I = 0; I < allTasks.length; I++) {
    
    if(allTasks[I].title.toLowerCase().includes(searchInput.value.trim().toLowerCase())||allTasks[I].category.toLowerCase().includes(searchInput.value.trim().toLowerCase()))
    {
      taskHtml=
      `
          <div class="item main-bg p-3 rounded-3 my-3">
          <h3 class="mb-3">${allTasks[I].title.toLowerCase().replace(searchInput.value.toLowerCase(),`<span class="text-danger">${searchInput.value.toLowerCase()}</span>`)}</h3>
          <a class="text-decoration-none p-2 mt-4 rounded-2 ${allTasks[I].category=="Education" ? "text-white bg-danger" : allTasks[I].category=="Finance" ?"bg-warning text-dark" : allTasks[I].category=="Entertainment" ?"text-white bg-success":"text-white bg-secondary"} ">${allTasks[I].category.toLowerCase().replace(searchInput.value.toLowerCase(),`<span class="text-tomato">${searchInput.value.toLowerCase()}</span>`)}</a>
          <div class="icons d-flex gap-3 fs-5 mt-4">
              <i class="fa-solid fa-wrench" onclick="selectTaskToUpdate(${I})"></i>
              <i class="fa-solid fa-trash-can"  onclick="removeTask(${I})"></i>
          </div>
          </div>
      `
    
      if(searchInput.value=="")
      {
        displaySearch(I)
      }
      setTaskLocation(allTasks[I].status)
     }

  }


}
searchInput.addEventListener("input",search)

// dark mood
var app = document.querySelector("body");
if (localStorage.getItem("pageMoode")=="dark") {
    app.setAttribute("page-mode", "dark");
}


function toggle_light_mode() {
  if (localStorage.getItem("pageMoode")=="dark") {
    localStorage.setItem("pageMoode","light");
    app.setAttribute("page-mode", "light");
    document.querySelector(".allH2").classList.add("text-white")
    document.querySelector(".myNav").classList.add("bg-88")
    document.querySelector(".daily").classList.add("text-white")
    document.querySelector(".fa-bars").classList.add("text-white")
    document.querySelector(".fa-chart-simple").classList.add("text-white")





  } else {
    localStorage.setItem("pageMoode","dark");
      app.setAttribute("page-mode", "dark");
      document.querySelector(".allH2").classList.remove("text-white")
      document.querySelector(".myNav").classList.remove("bg-88")
      document.querySelector(".daily").classList.remove("text-white")
      document.querySelector(".fa-bars").classList.remove("text-white")
      document.querySelector(".fa-chart-simple").classList.remove("text-white")




  }
}

// 
if (localStorage.getItem("pageMoode")=="dark") {
  app.setAttribute("page-mode", "dark");
  document.querySelector(".allH2").classList.remove("text-white")
  document.querySelector(".myNav").classList.remove("bg-88")
  document.querySelector(".daily").classList.remove("text-white")
  document.querySelector(".fa-bars").classList.remove("text-white")
  document.querySelector(".fa-chart-simple").classList.remove("text-white")




} else {
  app.setAttribute("page-mode", "light");
  document.querySelector(".allH2").classList.add("text-white")
  document.querySelector(".myNav").classList.add("bg-88")
  document.querySelector(".daily").classList.add("text-white")
  document.querySelector(".fa-bars").classList.add("text-white")
  document.querySelector(".fa-chart-simple").classList.add("text-white")




}





if(localStorage.getItem("bars")=="true")
{
  changeToBars()
}
else if(localStorage.getItem("bars")=="false")
{
  changeToColumns()
}



function changeToBars() {
  for (let a = 0; a < allCOL4.length; a++) {
    
    allCOL4[a].classList.remove("col-md-6","col-lg-4")
  
  }
  localStorage.setItem("bars","true")


 
}


function changeToColumns() {
  for (let i = 0; i < allCOL4.length; i++) {
    
    allCOL4[i].classList.add("col-md-6","col-lg-4")

  }
  localStorage.setItem("bars","false")


}




var regex
function validateName()
{
  regex=/^[a-zA-z].{1,21}$/
  if(regex.test(titleInput.value)&&titleInput.value!="")
  {
    titleInput.classList.add("is-valid")
    titleInput.classList.remove("is-invalid")
    document.querySelector("small").classList.add("d-none")
    return true
  }
  else
  {
    titleInput.classList.remove("is-valid")
    titleInput.classList.add("is-invalid")
    document.querySelector("small").classList.remove("d-none")

    return false
  }
}






















import { taskFactory } from "./tasks";

import { projectFactory, projectList } from "./project";

taskFactory ();
projectFactory ();

console.log("hello");

//list with all projects 

//const projectList = [];

//create a project factory function to dynamically create projects

// const projectFactory = () =>{
//     //properties
//     let name = addProjectName.value;
//     let id = new Date().getTime().toString();
//     let projectTask = ["Placeholder", "please", "thank"];

//     //Create project DOM element

//     const createProjectElement = () =>{
//         const element = document.createElement("div");
//         element.classList.add("project-item");
//         element.setAttribute("data-id", id);
//         element.innerHTML = name;
//         return element;
//     }

//     const projectElement = createProjectElement();
    
//     return {name, id, projectTask, projectElement}

// }

// ****** SELECT ITEMS **********

const addProjectBtn = document.querySelector(".add-project");
const addProjectName = document.getElementById("project-name"); //input
const projects = document.querySelector(".projects");
const projectForm = document.querySelector(".project-name"); 
const projectFormAddBtn = document.querySelector(".add");
const projectFormCancelBtn = document.querySelector(".cancel");


// const addTasksBtn = document.querySelector(".add-task");
// const addTask = document.getElementById("task-name");
// const tasks = document.querySelector(".tasks");


addProjectBtn.addEventListener("click", ()=> {
    console.log("clicked");
    projectForm.classList.remove("active");

});

//adding a project name and close project form 

//Not sure if this one is needed since we have the submit event listner. 
projectFormAddBtn.addEventListener("click", () => {
    console.log("added");
    removeProjectForm();
    
});
//cancel a project form
projectFormCancelBtn.addEventListener("click", () => {
    console.log("cancel");
    removeProjectForm();
    
})

projectForm.addEventListener("submit", (e)=>{
    addProject(e);
})


/******* FUNCTIONS*********/
function removeProjectForm(){
    projectForm.classList.add("active");
}

function addProject(e){
    e.preventDefault();
    console.log(addProjectName.value);

    const newProject = projectFactory();
    console.log(newProject);

    projects.insertBefore(newProject.projectElement,addProjectBtn);
    projectList.push(newProject);
    console.log(`THE PROJECTLIST IS ${projectList}`);
    setBackToDefault()

}

function setBackToDefault(){
     addProjectName.value = "";
}


// //*********************TASKS****************//

// const newTaskBtn = document.querySelector(".add-task");
// const taskForm = document.querySelector(".task-details");
// const newTask = document.getElementById("task-name");
// const taskFormCancelBtn = document.getElementById("cancel-task");
// const taskFormAddBtn = document.getElementById("add-task");
// const tasksContainer = document.querySelector(".tasks");
// const startDate = document.getElementById("start");

//  //Add EventListeners
// newTaskBtn.addEventListener("click", ()=>{
//     console.log("clicked");
//     taskForm.classList.remove("active");
// });

// taskForm.addEventListener("submit", (e)=> {
//     addTask(e)
// });

// taskFormAddBtn.addEventListener("click",()=>{
//     console.log("added");   
//     removeTaskForm();
// });

// taskFormCancelBtn.addEventListener("click", ()=>{
//     removeTaskForm();
// })


/*************FUNCTIONS************/
//create factory functions for 

// const taskFactory = () =>{
//     //properties
//     let name = newTask.value;
//     let id = new Date().getTime().toString();
//     let taskList = [];
//     const date = startDate.value;

//     //Create task DOM element

//     const createTaskElement = () =>{

//         const element = document.createElement("div");
//         element.classList.add("tasks-item");
//         element.setAttribute("data-id",id);
//         element.innerHTML = `<i class="fa fa-circle-thin fa-lg icon" aria-hidden="true"></i>
//         <h4 class="heading">${name}</h4>
//         <h4 class="date">${date}</h4>
//         <div class="priority">
//           <i class="fa fa-flag" aria-hidden="true"></i>
//         </div`;
//         return element;
//     }

//     const taskElement = createTaskElement();

    
//     return { name, id, taskList, date, taskElement }
// }

// function removeTaskForm(){
//      taskForm.classList.add("active");
// }

// function addTask(e){
//     e.preventDefault();

//     const newTask = taskFactory();
//     console.log(newTask);

//     const currentProject = projectFactory();
//     console.log(`THE CURRENT PROJECT IS ${currentProject.projectTask}`);

//     console.log(newTask.taskElement)

//     tasksContainer.insertBefore(newTask.taskElement,newTaskBtn);
   
//     currentProject.projectTask.push(newTask);
//     console.log(currentProject.projectTask)
//     setTaskFormToDefault()
// }

// function setTaskFormToDefault(){
//     newTask.value = "";
// }
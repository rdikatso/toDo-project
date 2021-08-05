
import { projectFactory } from "./project";
import { storeItems, getStoredItems, updateLocalStorage, deleteTask, deleteProject,editLocalStorage} from "./storage";
import { taskFactory } from "./tasks";


//create DOM project element

const createProjectElement = (id,name) =>{
    const element = document.createElement("div");
    element.classList.add("project-item");
    element.setAttribute("data-id", id);
    element.innerHTML = `<h4>${name}</h4>
    <i class="fa fa-trash delete-icon" aria-hidden="true"></i>`;
    return element;
}

//create DOM task element

const createTaskElement = (name, id, date) =>{

    const element = document.createElement("div");
    element.classList.add("tasks-item");
    element.setAttribute("data-id",id);
    element.innerHTML = `<i class="fa fa-circle-thin fa-lg icon" id="empty-circle" aria-hidden="true"></i>
    <h4 class="heading">${name}</h4>
    <h4 class="date">${date}</h4>
    <i class="fa fa-file-text-o" id="edit-icon" aria-hidden="true"></i>
    <i class="fa fa-times" id="delete-icon" aria-hidden="true"></i>`

    const editForm = document.createElement("form");
    editForm.classList.add("expand-task");
    editForm.innerHTML = `<input type="text" class="edit-input">
    <div class="edit-btns">
    <button type="button" class="edit-btn cancel-edit">Cancel</button>
    <button type="button" class="edit-btn add-edit">Add</button>
    </div>`;
    
    element.appendChild(editForm);

    return element;
    
}

//DISPLAY OBJECTS UI

const displayProjects = () => {

    //****** SELECT ITEMS **********

    const addProjectBtn = document.querySelector(".add-project");
    const addProjectName = document.getElementById("project-name"); //input
    const projects = document.querySelector(".projects");
    const projectForm = document.querySelector(".project-name"); 

    //********ADD EVENT LISTENERS *******/

    //open project form
    addProjectBtn.addEventListener("click", ()=> {
        projectForm.classList.remove("active");
    
    });

    //listen to submit to add project name 
    
    projectForm.addEventListener("submit", (e)=>{
        addProject(e);
    });

    //using add or cancel button to add to cancel project form data

    projectForm.addEventListener("click", (e) =>{
        let target = e.target;
        if(target.classList.contains("add")){
            addProject(e);
            removeProjectForm();
        }else if(target.classList.contains("cancel")){
            removeProjectForm();
        }
    });

    /******* FUNCTIONS*********/
    function removeProjectForm(){
        projectForm.classList.add("active");
    }

    function addProject(e){
        e.preventDefault();
       
        const newProject = projectFactory();
        const newProjectDOM = createProjectElement(newProject.id, newProject.name);

        //add project only when there is a name given 

        if(newProject.name){

            projects.insertBefore(newProjectDOM, addProjectBtn);
            storeItems(newProject);
            setBackToDefault();
        }

    }

    function setBackToDefault(){
        addProjectName.value = "";
    
    }

    
}

function displayStoredProjects(){

    const projects = document.querySelector(".projects");
    const addProjectBtn = document.querySelector(".add-project");

    const availableProjects = getStoredItems();

    if(typeof availableProjects !== "undefined"){
        for (let i=0; i <= availableProjects.length-1; i++){
            const newProjectDOM = createProjectElement(availableProjects[i].id, availableProjects[i].name);
            projects.insertBefore(newProjectDOM, addProjectBtn);
        }
    }

}


const windowLoad = () =>{
    //add event listener to display project stored in local storage
    document.addEventListener("DOMContentLoaded", displayStoredProjects);
    document.addEventListener("DOMContentLoaded", highlightToday);

}

// always highlight today to do list when reloading window.

function highlightToday(){

    const today = Array.from(document.getElementsByClassName("project-item"))[0];

    today.classList.add("current-project");

    //show project name in tasks section 

    const projectTasks = document.querySelector(".tasks");
    const newTaskBtn = document.querySelector(".add-task");

    //project heading in tasks section 

    const projectHeading = document.createElement("p");
    projectHeading.classList.add("project-heading");
    projectHeading.textContent = today.textContent;

    //remove other project headings that could be in page and show currently selected;
    const headingList = document.getElementsByClassName("project-heading");

    Array.from(headingList).forEach(heading => {
        heading.classList.add("active");
    });
    // insert project heading at the top of page
    projectTasks.insertBefore(projectHeading, newTaskBtn);

    const id = today.dataset.id;

    displayStoredProjectTasks(id);
    
}




//Event Listeners for highlighting current project

function highlightCurrentProject(){

    const container = document.querySelector(".container");
    const currentProjects = document.getElementsByClassName("project-item");
    
  
    container.addEventListener("click", (e) =>{
        const target = e.target;
        const id = e.target.dataset.id;

        if(id){
            Array.from(currentProjects).forEach(currentProject => {
                currentProject.classList.remove("current-project");
                target.classList.add("current-project");
            });


            //show project name in tasks section 

            const projectTasks = document.querySelector(".tasks");
            const newTaskBtn = document.querySelector(".add-task");

            //project heading in tasks section 

            const projectHeading = document.createElement("p");
            projectHeading.classList.add("project-heading");
            projectHeading.textContent = target.textContent;

            //remove other project headings that could be in page and show currently selected;
            const headingList = document.getElementsByClassName("project-heading");

            Array.from(headingList).forEach(heading => {
                heading.classList.add("active");
            });
            // insert project heading at the top of page
            projectTasks.insertBefore(projectHeading, newTaskBtn);

            displayStoredProjectTasks(id);

        }


    });
  

}

function displayStoredProjectTasks(id) {
    
    const availableProjects = getStoredItems();
    const projectId = id;

    //hide any other projects that are currently in the DOM

    const currentTasks = document.getElementsByClassName("tasks-item");

    Array.from(currentTasks).forEach(task => {
        task.classList.add("active")
    });
    

    //where to put in DOM
    const projectTasks = document.querySelector(".tasks");
    const newTaskBtn = document.querySelector(".add-task");

    //search for project in available projects using the project id
    function targetProject(project){
        return project.id === projectId;
    }

    const selectedProject = availableProjects.find(targetProject);

    //loop through the projectTask Array 

    const selectedProjectTask = selectedProject.projectTask;

    if(selectedProjectTask !== "undefined"){
        for(let i=0; i <= selectedProjectTask.length-1; i++){
            const taskDOM = createTaskElement(selectedProjectTask[i].name, selectedProjectTask[i].id, selectedProjectTask[i].formattedDate);
            projectTasks.insertBefore(taskDOM,newTaskBtn);
        }
    }

}


// //*********************TASKS****************//

function openNewTask(){

    const container = document.querySelector(".container");
    container.addEventListener("click", (e)=>{
        e.preventDefault();

        if (e.target.classList.contains("add-task")){
            const taskForm = document.querySelector(".task-details");
            taskForm.classList.remove("active");
        }
    });
    
}

function deleteTaskForm(){

    const taskFormCancelBtn = document.getElementById("cancel-task");
    const taskFormAddBtn = document.getElementById("add-task");


    taskFormAddBtn.addEventListener("click",()=>{ 
         removeTaskForm();
    });

    taskFormCancelBtn.addEventListener("click", ()=>{
        removeTaskForm();
    })     
    
}

function submitTask(){

    const taskForm = document.querySelector(".task-details");

    taskForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        addTask(e)
    });
}

function checkTaskOff(){

    const container = document.querySelector(".container");
    
    container.addEventListener("click", (e) => {
        const target = e.target;
        if(!target.classList.contains("delete-icon")){
            const project = document.getElementsByClassName("current-project");
            const projectDOM = Array.from(project)[0];
        
            const projectId = projectDOM.dataset.id;
            
            if (target.id === "empty-circle"){
                const targetId = target.parentElement.dataset.id;
                target.classList.add("checked");

                deleteTask(projectId, targetId);
                //delete after 2 seconds
                setTimeout(function(){
                    target.parentElement.remove()
                }, 250);
                
            }
        }
        
    });

    
}

function deleteProjectFromDOM(){
    

    const container = document.querySelector(".container");

    container.addEventListener("click", (e) => {
        const target = e.target;
        if(target.classList.contains("delete-icon")){
            const targetProjectId = target.parentElement.dataset.id;

            deleteProject(targetProjectId);
            target.parentElement.remove();
        }
    });
}


function removeTaskForm(){
    const taskForm = document.querySelector(".task-details");

    taskForm.classList.add("active");
}

function addTask(e){
   e.preventDefault();

   const newTask = taskFactory();
   const newTaskElement = createTaskElement(newTask.name, newTask.id, newTask.formattedDate);

   const tasksContainer = document.querySelector(".tasks");
   const newTaskBtn = document.querySelector(".add-task");
 
   //get currently selected project
   const selectedProjectDOM = document.getElementsByClassName("current-project")[0];
   const selectedProjectId = selectedProjectDOM.dataset.id;

   const availableProjects = getStoredItems();

   function targetObject(project){
    return project.id === selectedProjectId;
    }   
   

   if(newTask.name){
        tasksContainer.insertBefore(newTaskElement,newTaskBtn);


        //push task into project
        const selectedProject = availableProjects.find(targetObject);

        selectedProject.projectTask.push(newTask);
        updateLocalStorage(selectedProject,newTask);
        
    }

   setTaskFormToDefault()
}

function setTaskFormToDefault(){
    const previousTask = document.getElementById("task-name");
    previousTask.value = "";

}

//delete task in DOM and in storage
function deleteTaskFromDOM(){

    const container = document.querySelector(".container");

    container.addEventListener("click", (e)=>{
        const target = e.target;
        console.log(target);
        if(target.id === "delete-icon"){
            const targetId = target.parentElement.dataset.id;

            const project = document.getElementsByClassName("current-project");

            const projectDOM = Array.from(project)[0];
           
            const projectId = projectDOM.dataset.id;

            //remove from storage and from the DOM.
            deleteTask(projectId, targetId);

            target.parentElement.remove();
            

        }
    })
    
}

//edit task in dom and in storage

function editTask(){
    const container = document.querySelector(".container");

    container.addEventListener("click", (e)=>{
        const target = e.target;
        if (target.id === "edit-icon"){
            //get target.parentElement.id

            const project = document.getElementsByClassName("current-project");

            const projectDOM = Array.from(project)[0];
            console.log(projectDOM);
           
            const projectId = projectDOM.dataset.id;

            //find the index of the task

            let existingProjects = getStoredItems();

            function targetObject(project){
                return project.id === projectId;;
            }

            
            const selectedProject = existingProjects.find(targetObject);

            const currentProjectTask = selectedProject.projectTask;

            const editedTaskId = target.parentElement.dataset.id;

            function targetTask(task){
                return task.id === editedTaskId;
            }
        
            const editedTask = currentProjectTask.find(targetTask);

            const taskIndex = currentProjectTask.indexOf(editedTask);
            console.log("Task Index is.....")

            //show the expand-task 

            const showEditForm = document.getElementsByClassName("expand-task");
            const showEditFormDOM = Array.from(showEditForm)[taskIndex];

            showEditFormDOM.classList.remove("show");
            showEditFormDOM.classList.add("show");

            //get the heading from DOM
            const targetHeading = document.getElementsByClassName("heading");
            const targetHeadingDOM = Array.from(targetHeading)[taskIndex].textContent;
           
            //add task heading to input
            const inputHeader = document.getElementsByClassName("edit-input");
        
            const inputheaderDOM = Array.from(inputHeader)[taskIndex];
           
            inputheaderDOM.setAttribute("value",targetHeadingDOM);
        }


    })

}

//cancel edit form 

function cancelEditForm(){
    
    const container = document.querySelector(".container");

    container.addEventListener("click", (e)=>{
        e.preventDefault();

        if(e.target.classList.contains("cancel-edit")){
            e.target.parentElement.parentElement.classList.remove("show");
   
        }


    })
}
 


// add task edit
function addEditChanges(){

    const container = document.querySelector(".container");

    container.addEventListener("click", (e) => {        
        e.preventDefault();


        if(e.target.classList.contains("add-edit")){
            
            const taskId = e.target.parentElement.parentElement.parentElement.dataset.id;
            
            const currentlySelectedItems = currentlySelected();
            const currentProject = currentlySelectedItems.selectedProject;
            const currentProjectTask = currentlySelectedItems.currentProjectTask;

            //find index of the selected task to edit. 

            function targetTask(task){
                return task.id === taskId;
            }


            const taskToEdit = currentProjectTask.find(targetTask);
            const taskIndex = currentProjectTask.indexOf(taskToEdit);

            console.log("Task index....");

            console.log(taskIndex);

            const editInput = document.getElementsByClassName("edit-input");
            const editInputDOM = Array.from(editInput)[taskIndex];

            const taskHeading = Array.from(document.getElementsByClassName("heading"))[taskIndex];

            taskHeading.textContent = editInputDOM.value;

            const editedTask = {
                name: editInputDOM.value,
                id: taskToEdit.id,
                formattedDate: taskToEdit.formattedDate
            }

            editLocalStorage(currentProject,taskToEdit,editedTask);

            //remove edit form

            const editForm = Array.from(document.getElementsByClassName("expand-task"))[taskIndex];
            editForm.classList.remove("show");
            
        }
       
    })
    
}



// a function that shows currently selected project and project Task

function currentlySelected(){

    const project = document.getElementsByClassName("current-project");

    const projectDOM = Array.from(project)[0];
   
    const projectId = projectDOM.dataset.id;

    //find the index of the task

    let existingProjects = getStoredItems();

    function targetObject(project){
        return project.id === projectId;;
    }

    
    const selectedProject = existingProjects.find(targetObject);

    const currentProjectTask = selectedProject.projectTask;

    return {
        selectedProject,
        currentProjectTask
    }
 

}

function setDefaultDate(){
    const today = document.querySelector("#start");
    let todayDate = new Date();
    today.value = todayDate.getFullYear().toString() + "-" + (todayDate.getMonth()+1).toString().padStart(2,0) + "-" + todayDate.getDate().toString().padStart(2,0);
    // today.valueAsDate = new Date();
}



export { deleteTaskForm, openNewTask, submitTask, displayProjects, windowLoad, createProjectElement, createTaskElement, highlightCurrentProject, checkTaskOff, deleteProjectFromDOM, deleteTaskFromDOM,editTask,cancelEditForm, addEditChanges, setDefaultDate }




// import display.js, project.js
import { displayProjects } from "./display";

import { projectFactory } from "./project"
import { projectList } from "./project";


//stores items in the localStorage
function storeItems(project){

    //check if local storage contains an array with objects
    let existingProjects = getStoredItems();

    if (existingProjects == null || undefined){
        existingProjects = [];
        existingProjects.push(project);
        localStorage.setItem("existingProjects", JSON.stringify(existingProjects));
    }else{

        //replace object in array.

        // first find object with id

        const currentProjectId = project.id;

        function targetObject(project){
            return project.id === currentProjectId;;
        }

        const selectedProject = existingProjects.find(targetObject);

        if(selectedProject){
            const projectIndex = existingProjects.indexOf(selectedProject);
            console.log(projectIndex);

            existingProjects.splice(projectIndex, 1, project);
            console.log(existingProjects);
            localStorage.setItem("existingProjects", JSON.stringify(existingProjects));

        }else{
            existingProjects.push(project);
            localStorage.setItem("existingProjects", JSON.stringify(existingProjects));
        }
        
        
    }
}

function getStoredItems(){

    const storedProjects = JSON.parse(localStorage.getItem("existingProjects"));
    if (storedProjects !== null){
        return storedProjects;
    }
    
}

function updateLocalStorage(currentProject, currentTask){
    const currentProjectId = currentProject.id;

    let existingProjects = getStoredItems();



   // existingProjects = existingProjects ? existingProjects.split(",") : [];

    function targetObject(project){
        return project.id === currentProjectId;
    }

    const selectedProject = existingProjects.find(targetObject);
    console.log(selectedProject.projectTask);

    const currentProjectTask = selectedProject.projectTask;
    const newTaskId = currentTask.id;

    console.log(newTaskId);

    function targetTask(task){
        return task.id === newTaskId;
    }

    const selectedTask = currentProjectTask.find(targetTask);
    console.log(selectedTask);

    if(!selectedTask){
        currentProjectTask.push(currentTask);
        console.log(currentProject);
    }else if (selectedTask){
        console.log("This task already exists!");
        
    }

    storeItems(currentProject);
}

function deleteTask(projectId, taskId){

    console.log("hello delete")
    const currentProjectId = projectId;
    console.log(currentProjectId);
    const currentTaskId = taskId;
    console.log(currentTaskId);

    const existingProjects = getStoredItems();
    console.log(existingProjects);

    function targetObject(project){
        return project.id === currentProjectId;
    }

    const selectedProject = existingProjects.find(targetObject);
    console.log(selectedProject.projectTask);

    const currentProjectTask = selectedProject.projectTask;
    
    function targetTask(task){
        return task.id === currentTaskId;
    }

    const selectedTask = currentProjectTask.find(targetTask);

    if(selectedTask){
        const taskIndex = currentProjectTask.indexOf(selectedTask);

        currentProjectTask.splice(taskIndex, 1);
        localStorage.setItem("existingProjects", JSON.stringify(existingProjects));

    }

}

function deleteProject(id){
    const projectId = id;
    const existingProjects = getStoredItems();
    console.log(existingProjects);

    function targetObject(project){
        return project.id === projectId;
    }

    const selectedProject = existingProjects.find(targetObject);
    
    if(selectedProject){
        const projectIndex = existingProjects.indexOf(selectedProject);

        existingProjects.splice(projectIndex,1);
        localStorage.setItem("existingProjects", JSON.stringify(existingProjects));

    }


}

function editLocalStorage(currentProject, projectTask, editedProjectTask){
    console.log("editing local storage.....")
    console.log(currentProject);
    console.log(projectTask);
    console.log(editedProjectTask);

    const existingProjects = getStoredItems();
    console.log(existingProjects);

    const projectId = currentProject.id;
    console.log(projectId);

    const currentTaskId = projectTask.id;

    function targetObject(project){
        return project.id === projectId;
    }

    const selectedProject = existingProjects.find(targetObject);

    const currentTasks = selectedProject.projectTask;
    
    function targetTask(task){
        return task.id === currentTaskId;
    }

    const selectedTask = currentTasks.find(targetTask);

    if(selectedTask){
        const taskIndex = currentTasks.indexOf(selectedTask);

        currentTasks.splice(taskIndex, 1, editedProjectTask);
        localStorage.setItem("existingProjects", JSON.stringify(existingProjects));

    }

    console.log(existingProjects);






}

export { storeItems, getStoredItems, updateLocalStorage, deleteTask, deleteProject, editLocalStorage }

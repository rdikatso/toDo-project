
import { taskFactory } from "./tasks";

import { projectFactory } from "./project";

import { openNewTask, deleteTaskForm, submitTask, displayProjects, windowLoad, highlightCurrentProject,checkTaskOff, deleteProjectFromDOM, deleteTaskFromDOM, editTask, cancelEditForm, addEditChanges, setDefaultDate } from "./display";


function innit(){

    setDefaultDate();
    windowLoad();

    taskFactory ();
    projectFactory ();

    openNewTask();
    deleteTaskForm();

    displayProjects();
    submitTask();
    highlightCurrentProject();
    checkTaskOff();
    deleteProjectFromDOM();
    deleteTaskFromDOM();
    editTask();
    cancelEditForm();
    addEditChanges();
    setDefaultDate();

}

innit();














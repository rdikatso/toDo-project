
const projectFactory = () =>{

    const addProjectName = document.getElementById("project-name");
    //properties
    let name = addProjectName.value;
    let id = new Date().getTime().toString();
    let projectTask = [];

    return {name, id, projectTask, }

}


export { projectFactory }

import { format, parseISO } from 'date-fns';

const taskFactory = () =>{


    const newTask = document.getElementById("task-name");
    const startDate = document.getElementById("start");

    // //properties
    let name = newTask.value;
    let id = new Date().getTime().toString();
   

    const date = startDate.value;
    const dateString = String(date);
    const formattedDate = format (parseISO(dateString), "PPPP");
    
    return { name, id, formattedDate}
}



export { taskFactory }
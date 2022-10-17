import  TaskCard  from "./TaskCard";
import { TaskContext,Context } from "../TaskContext";
import { useContext } from "react";

interface Props{
    removeTask : (id:number) => void
}

const TaskList = (props:Props) => {

    const contexto = useContext<Context>(TaskContext)

    if(contexto.tareas.length === 0){
        return <h1>No hay tareas</h1>
    }

    return( 
        <ul>
        {
            contexto.tareas.map(task => 
                <TaskCard task={task} key={task.id} removeTask={props.removeTask}/>
            )
        }
        </ul>);
}

export default TaskList;
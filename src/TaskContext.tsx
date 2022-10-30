import {createContext,useContext,useState,useEffect} from "react"
import TaskList from './components/tasks/TaskList'
// import TaskForm_Refs from './components/tasks/TaskForm_Refs'
// import TaskForm_State from './components/tasks/TaskForm_State'
import TaskForm_Reducer from './components/tasks/TaskForm_Reducer'
import type { task } from "./types/tasks";

export interface Context {
    tareas:task[]
}

let firstRun = true;

export const TaskContext = createContext<Context>({tareas:[]})

export function TaskContextProvider() {

    const contexto = useContext(TaskContext)
    const [tareas,setTareas] = useState(contexto.tareas);

    useEffect(()=>{
        if(localStorage.getItem('tareas') && firstRun){
            const getTareas:task[] = JSON.parse(localStorage.getItem('tareas')!)
            firstRun = false
            if (getTareas.length > 0){
                setTareas(getTareas);
            }
        }else{
            localStorage.setItem('tareas',JSON.stringify(tareas))
        }
    },[tareas]);

    const createTask =(newtask:task) =>{
        setTareas((prevtareas)=>[...prevtareas,newtask])
    }
    
    const removeTask =(id:number) =>{
        setTareas(tareas.filter( tarea => tarea.id !== id))
    }

    return(
       <>

        <TaskForm_Reducer createTask={createTask}/>
        <TaskContext.Provider value={{tareas}}>
            <TaskList removeTask={removeTask} />
        </TaskContext.Provider>
       </>
    )
}
import {createContext,useContext,useState,useEffect,useCallback} from "react"
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

    console.log("Running TaskContext")

    const contexto = useContext(TaskContext)
    const [tasks,setTasks] = useState(contexto.tareas);

    useEffect(()=>{
        if(localStorage.getItem('tareas') && firstRun){
            const getTareas:task[] = JSON.parse(localStorage.getItem('tareas')!)
            firstRun = false
            if (getTareas.length > 0){
                setTasks(getTareas);
            }
        }else{
            localStorage.setItem('tareas',JSON.stringify(tasks))
        }
    },[tasks]);

    // const createTask = (newtask:task) =>{
    //     setTaskssetTasks((prevtareas)=>[...prevtareas,newtask])
    // }
    
    const createTask = useCallback((newtask:task) =>{
        setTasks((prevtareas)=>[...prevtareas,newtask])
    },[])
    
    // const removeTask = useCallback((id:number) =>{
    //     setTareas(tareas.filter( tarea => tarea.id !== id))
    // },[tareas])

    const removeTask = (id:number) =>{
        setTasks(tasks.filter( tarea => tarea.id !== id))
    }

    return(
       <>
        <TaskForm_Reducer createTask={createTask} />
        <TaskContext.Provider value={{tareas:tasks}}>
            <TaskList removeTask={removeTask} />
        </TaskContext.Provider>
       </>
    )
}
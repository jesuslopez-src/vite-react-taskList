import React, {createContext,useContext,useState} from "react"
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import type { task } from "./data/tasks";

export interface Context {
    tareas:task[]
}

export const TaskContext = createContext<Context>({tareas:[]})

export function TaskContextProvider() {

    const contexto = useContext(TaskContext)
    const [tareas,setTareas] = useState(contexto.tareas);

    const createTask =(newtask:task) =>{
        setTareas((prevtareas)=>[...prevtareas,newtask])
    }

    const removeTask =(id:number) =>{
        setTareas(tareas.filter( tarea => tarea.id !== id))
    }

    return(
       <>
        <TaskForm createTask={createTask}/>
        <TaskContext.Provider value={{tareas}}>
            <TaskList removeTask={removeTask}/>
        </TaskContext.Provider>
       </>
    )
}
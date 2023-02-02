import { createContext, useContext, useCallback, useState,useEffect } from "react"
import TaskList from './components/tasks/TaskList'
// import TaskForm_Refs from './components/tasks/TaskForm_Refs'
// import TaskForm_State from './components/tasks/TaskForm_State'
import TaskForm_Reducer from './components/tasks/TaskForm_Reducer'
import type { task } from "./types/tasks";

import useTaskContextHook from "./hooks/TaskContextHook"
// import http from "./utilities/http";

export interface Context {
    tareas: task[]
}

export const TaskContext = createContext<Context>({ tareas: [] })

export function TaskContextProvider() {

    console.log("Running TaskContext")

    const contexto = useContext(TaskContext)

    const { tasks, setNewTask, setDeleteTask,
        usingLocalStorage, setUsingLocalStorage, setId 
    } = useTaskContextHook(contexto)


    const createTask = useCallback((newtask: task) => {
        setNewTask(newtask);
        setDeleteTask(false)
    }, [])

    // const removeTask = useCallback((id:number) =>{
    //     setTareas(tareas.filter( tarea => tarea.id !== id))
    // },[tareas])

    const removeTask = useCallback((id: string) => {
        setDeleteTask(true)
        setNewTask(undefined);
        setId(id)
        // setTasks(tasks.filter( tarea => tarea.id !== id))
    }, [])

    const changedRadio = useCallback(() => {
        setUsingLocalStorage((prevState) => !prevState)
        setDeleteTask(false)
        setNewTask(undefined)
    }, [])

    return (
        <>
            <TaskForm_Reducer createTask={createTask} changedRadio={changedRadio} usingLocalStorage={usingLocalStorage} />
            <TaskContext.Provider value={{ tareas: tasks }}>
                <TaskList removeTask={removeTask}/>
            </TaskContext.Provider>
        </>
    )
}
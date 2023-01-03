import { createContext, useContext, useState, useEffect, useCallback } from "react"
import TaskList from './components/tasks/TaskList'
// import TaskForm_Refs from './components/tasks/TaskForm_Refs'
// import TaskForm_State from './components/tasks/TaskForm_State'
import TaskForm_Reducer from './components/tasks/TaskForm_Reducer'
import type { task,tasksJson } from "./types/tasks";

import http from "./utilities/http";


export interface Context {
    tareas: task[]
}

export const TaskContext = createContext<Context>({ tareas: [] })

export function TaskContextProvider() {

    console.log("Running TaskContext")

    const contexto = useContext(TaskContext)
    const [tasks, setTasks] = useState(contexto.tareas);
    const [newTask, setNewTask] = useState<task>()
    const [deleteTask, setDeleteTask] = useState(false)
    const [usingLocalStorage, setUsingLocalStorage] = useState(true)
    const [id, setId] = useState<string>()

    useEffect(() => {
        console.log("effect ")
        if (usingLocalStorage) {
            if (!newTask && localStorage.getItem('tareas') && !deleteTask) {
                const getTareas: task[] = JSON.parse(localStorage.getItem('tareas')!)
                if (getTareas.length > 0) {
                    setTasks(getTareas);
                }
            } else if (newTask && localStorage.getItem('tareas') && !deleteTask) {
                addTasksToStorage(newTask);
                setTasks(getTasks());
            } else if (localStorage.getItem('tareas') && deleteTask) {
                let tasks = getTasks();
                tasks = tasks.filter(tarea => tarea.id !== id)
                localStorage.setItem('tareas', JSON.stringify(tasks))
                setTasks(getTasks());
            } else {
                localStorage.setItem('tareas', JSON.stringify(tasks))
            }
        } else if (!newTask && !deleteTask) {
            //llamar a firebase cargar datos, cargarlos a tasks
            getRemoteTasks();
        } else if (newTask && !deleteTask) {
            //crear nueva tarea en firebase
            const response = http("https://react-test-19e70-default-rtdb.firebaseio.com/tasks.json",false,newTask) as Promise<Response>;
            // verficar si la respuesta es exitosa
            response.then(resp=>{
                if(resp.ok){
                    getRemoteTasks()
                }
            })
            //si la respuesta es exitosa entonces
            // getRemoteTasks();
        } else if (!newTask && deleteTask) {
            //eliminar recurso en firebase
            //revisar esto luego, ahorita no funciona
            // const response = http("https://react-test-19e70-default-rtdb.firebaseio.com/tasks/"+id,true) as Promise<Response>;

            // response.then(resp=>{
            //     if(resp.ok){
            //         getRemoteTasks()
            //     }
            // })
        }
    }, [usingLocalStorage, newTask, id]);

    // const createTask = (newtask:task) =>{
    //     setTaskssetTasks((prevtareas)=>[...prevtareas,newtask])
    // }
    const addTasksToStorage = (newtask: task) => {
        const tasks_from_storage: task[] = JSON.parse(localStorage.getItem('tareas')!)
        const updated_tasks = [...tasks_from_storage, newtask]
        localStorage.setItem('tareas', JSON.stringify(updated_tasks))
    }

    const getTasks = () => {
        const getTareas: task[] = JSON.parse(localStorage.getItem('tareas')!)
        return getTareas
    }
    
    const getRemoteTasks = () => {
        const datos = http("https://react-test-19e70-default-rtdb.firebaseio.com/tasks.json") as Promise<cosa>;
        console.log(datos)
        datos.then(tareas => {
            const mi_array:task[] = []
            // console.log(tareas)
            for (const key in tareas) {
                tareas[key].id=key
                mi_array.push(tareas[key]);
                mi_array
                
            }
            setTasks(mi_array.slice())
            // console.log(mi_array)
        })
    }

    const createTask = useCallback((newtask: task) => {
        setNewTask(newtask);
        setDeleteTask(false)
    }, [])

    // const removeTask = useCallback((id:number) =>{
    //     setTareas(tareas.filter( tarea => tarea.id !== id))
    // },[tareas])

    const removeTask = (id: string) => {
        setDeleteTask(true)
        setNewTask(undefined);
        setId(id)
        // setTasks(tasks.filter( tarea => tarea.id !== id))
    }

    const changedRadio = () => {
        setUsingLocalStorage((prevState) => !prevState)
        setDeleteTask(false)
        setNewTask(undefined)
    }

    return (
        <>
            <TaskForm_Reducer createTask={createTask} changedRadio={changedRadio} usingLocalStorage={usingLocalStorage} />
            <TaskContext.Provider value={{ tareas: tasks }}>
                <TaskList removeTask={removeTask} />
            </TaskContext.Provider>
        </>
    )
}
import {configureStore, createSlice} from "@reduxjs/toolkit"
import type {task} from "../types/tasks"

interface TasksState { tasks:task[],usingLocalStorage:boolean,
    newTask:task|undefined,deleTask:boolean
}

interface TaskActions {
    type:string,
    payload:{newTask:task|undefined,tasks:task[],id:string|undefined}
}

const initialState:TasksState= {tasks:[],usingLocalStorage:true,
    newTask:undefined,deleTask:false}

const tasksSlice = createSlice({
    name : 'tasks',
    initialState,
    reducers: {
        createTask(state,action:TaskActions)
        {
            const tasks_from_storage: task[] = JSON.parse(localStorage.getItem('tareas')!)
            const updated_tasks = [...tasks_from_storage, action.payload.newTask]
            localStorage.setItem('tareas', JSON.stringify(updated_tasks))
            const getTareas: task[] = JSON.parse(localStorage.getItem('tareas')!)
            state.tasks = getTareas;
        },
        removeTask(state,action:TaskActions){
            let tasks_from_storage: task[] = JSON.parse(localStorage.getItem('tareas')!)
            tasks_from_storage = tasks_from_storage.filter(tarea => tarea.id !== action.payload.id)
            localStorage.setItem('tareas', JSON.stringify(tasks_from_storage))
            state.tasks = tasks_from_storage;
        },
        loadLocalTasks(state,action:TaskActions){
            state.tasks = action.payload.tasks
        }
    }
})

const store = configureStore({
    reducer:{tasks:tasksSlice.reducer}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const tasksActions = tasksSlice.actions
export default store ;
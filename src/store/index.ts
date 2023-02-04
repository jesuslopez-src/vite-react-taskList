import {configureStore, createSlice} from "@reduxjs/toolkit"
import type {task} from "../types/tasks"

interface TasksState { tasks:task[],usingLocalStorage:boolean,
    newTask:task|undefined,deletingTask:boolean,addingNewTask:boolean,id:string|undefined
}

interface TaskActions {
    type:string,
    payload:{newTask:task|undefined,tasks:task[],id:string|undefined}
}

const initialState:TasksState= {tasks:[],usingLocalStorage:true,
    newTask:undefined,deletingTask:false,addingNewTask:false,id:""}

const tasksSlice = createSlice({
    name : 'tasks',
    initialState,
    reducers: {
        addTask(state,action:TaskActions)
        {
            state.addingNewTask = true;
            state.deletingTask = false;
            state.newTask = action.payload.newTask;
        },
        removeTask(state,action:TaskActions){

            state.deletingTask = true;
            state.addingNewTask = false;
            state.id = action.payload.id;
            state.newTask = action.payload.newTask
        },
        loadTasks(state,action:TaskActions){
            state.tasks = action.payload.tasks
            state.deletingTask = false;
            state.addingNewTask = false;
            state.newTask = action.payload.newTask
        },usingRemoteOrLocal(state){
            state.usingLocalStorage = !state.usingLocalStorage
            state.deletingTask = false;
            state.addingNewTask = false;
            state.newTask = undefined
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
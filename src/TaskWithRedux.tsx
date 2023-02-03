import { useCallback, useEffect } from "react"
import TaskList from './components/tasks/TaskList'
// import TaskForm_Refs from './components/tasks/TaskForm_Refs'
// import TaskForm_State from './components/tasks/TaskForm_State'
import TaskForm_Reducer from './components/tasks/TaskForm_Reducer'
import { useAppSelector, useAppDispatch } from "./hooks/ReduxHooks"
import { tasksActions } from "./store/index"
import type { task } from "./types/tasks";

// import useTaskContextHook from "./hooks/TaskContextHook"
// import http from "./utilities/http";


export function TaskWithRedux() {

    console.log("Running TaskWithRedux with Redux")
    const tasks = useAppSelector(state => state.tasks.tasks);
    const usingLocalStorage = useAppSelector(state => state.tasks.usingLocalStorage)
    const newTask = useAppSelector(state => state.tasks.newTask)
    const deleteTask = useAppSelector(state => state.tasks.deleTask)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (usingLocalStorage) {
            if (!newTask && localStorage.getItem('tareas') && !deleteTask) {
                const localTasks: task[] = JSON.parse(localStorage.getItem('tareas')!)
                if (localTasks.length > 0) {
                    dispatch(tasksActions.loadLocalTasks({ newTask: undefined, tasks: localTasks, id: undefined }))
                }
            } else {
                localStorage.setItem('tareas', JSON.stringify(tasks))
            }
        }
    }, [])

    const createTask = useCallback((newTask: task) => {
        dispatch(tasksActions.createTask({ newTask, tasks, id: undefined }))
    }, [])

    const removeTask = useCallback((id: string) => {
        dispatch(tasksActions.removeTask({ newTask: undefined, tasks, id }))
    }, [])

    const changedRadio = useCallback(() => {
        // setUsingLocalStorage((prevState) => !prevState)
        // setDeleteTask(false)
        // setNewTask(undefined)
    }, [])

    return (
        <>
            <TaskForm_Reducer createTask={createTask} changedRadio={changedRadio} usingLocalStorage={usingLocalStorage} />
            <TaskList removeTask={removeTask} />
        </>
    )
}
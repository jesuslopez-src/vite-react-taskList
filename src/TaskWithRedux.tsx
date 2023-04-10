import { useCallback, useEffect } from "react"
import TaskList from './components/tasks/TaskList'
// import TaskForm_Refs from './components/tasks/TaskForm_Refs'
// import TaskForm_State from './components/tasks/TaskForm_State'
import TaskForm_Reducer from './components/tasks/TaskForm_Reducer'
import { useAppSelector, useAppDispatch } from "./hooks/ReduxHooks"
import { tasksActions } from "./store/index"
import type { task, tasksJson } from "./types/tasks";

import { getRemoteTasksWithRedux } from "./hooks/TaskContextHook"
import http from "./utilities/http";

export function TaskWithRedux() {

    console.log("Running TaskWithRedux with Redux")
    const tasks = useAppSelector(state => state.tasks.tasks);
    const usingLocalStorage = useAppSelector(state => state.tasks.usingLocalStorage)
    const newTask = useAppSelector(state => state.tasks.newTask)
    const deletingTask = useAppSelector(state => state.tasks.deletingTask)
    const addingNewtask = useAppSelector(state => state.tasks.addingNewTask)
    const id = useAppSelector(state => state.tasks.id)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (usingLocalStorage) {
            if (!addingNewtask && localStorage.getItem('tareas') && !deletingTask) {
                const localTasks: task[] = JSON.parse(localStorage.getItem('tareas')!)
                dispatch(tasksActions.loadTasks({ newTask: undefined, tasks: localTasks, id: undefined }))

            } else if (addingNewtask && localStorage.getItem('tareas')) {

                let tasks_from_storage: task[] = JSON.parse(localStorage.getItem('tareas')!)
                const updated_tasks = [...tasks_from_storage, newTask]
                localStorage.setItem('tareas', JSON.stringify(updated_tasks))
                tasks_from_storage = JSON.parse(localStorage.getItem('tareas')!)
                dispatch(tasksActions.loadTasks({ newTask: undefined, tasks: tasks_from_storage, id: undefined }))

            } else if (deletingTask && localStorage.getItem('tareas')) {

                let tasks_from_storage: task[] = JSON.parse(localStorage.getItem('tareas')!)
                tasks_from_storage = tasks_from_storage.filter(tarea => tarea.id !== id)
                localStorage.setItem('tareas', JSON.stringify(tasks_from_storage))
                dispatch(tasksActions.loadTasks({ newTask: undefined, tasks: tasks_from_storage, id: undefined }))

            } else {
                localStorage.setItem('tareas', JSON.stringify([]))
                dispatch(tasksActions.loadTasks({ newTask: undefined, tasks: [], id: undefined }))
            }
        } else if (!addingNewtask && !deletingTask) {
            //llamar a firebase cargar datos, cargarlos a tasks
            const remoteTasks = getRemoteTasksWithRedux();
            remoteTasks.then(remoteTasks => {
                dispatch(tasksActions.loadTasks({ newTask: undefined, tasks: remoteTasks, id: undefined }))
            })
        } else if (addingNewtask && !deletingTask) {
            //crear nueva tarea en firebase
            const response = http("https://react-test-19e70-default-rtdb.firebaseio.com/tasks.json", false, newTask) as Promise<Response>;
            // si la respuesta es exitosa entonces
            response.then(resp => {
                if (resp.ok) {
                    const remoteTasks = getRemoteTasksWithRedux()
                    remoteTasks.then(tasks => {
                        dispatch(tasksActions.loadTasks({ newTask: undefined, tasks, id: undefined }))
                    })
                }
            })
        } else if (deletingTask) {
            //deep copy del estado de las tareas
            let copied_tasks: task[] = JSON.parse(JSON.stringify(tasks))
            //eliminar la tarea que corresponda con el actual estado id
            copied_tasks = copied_tasks.filter(task => task.id !== id)
            // console.log(copied_tasks);
            // crear un objeto con las tareas a partir del array copied_tasks
            // esto se hace por necesidad de firebase
            const obj: tasksJson = {};
            copied_tasks.forEach(task => {
                obj[task.id] = task
            })
            // console.log(obj);

            //actualizar la base de datos en firebase
            const response = http("https://react-test-19e70-default-rtdb.firebaseio.com/tasks.json", true, obj) as Promise<Response>;

            //actualizar el estado con la tarea ya eliminada
            response.then(resp => {
                if (resp.ok) {
                    dispatch(tasksActions.loadTasks({ newTask: undefined, tasks: copied_tasks, id: undefined }))
                }
            })
        }

    }, [usingLocalStorage, addingNewtask, deletingTask])

    const createTask = useCallback((newTask: task) => {
        dispatch(tasksActions.addTask({ newTask, tasks, id: undefined }))
    }, [])

    const removeTask = useCallback((id: string) => {
        dispatch(tasksActions.removeTask({ newTask: undefined, tasks, id }))
    }, [])

    const changedRadio = useCallback(() => {
        dispatch(tasksActions.usingRemoteOrLocal())
    }, [])

    return (
        <>
            <TaskForm_Reducer createTask={createTask} changedRadio={changedRadio} usingLocalStorage={usingLocalStorage} />
            <TaskList removeTask={removeTask} />
        </>
    )
}
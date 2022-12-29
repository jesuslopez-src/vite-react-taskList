import React, { useReducer } from "react";
import styles from "./taskForm.module.css";
import Button from "../UI/Button";
import btn_styles from "../UI/Button.module.css";
import type { task } from "../../types/tasks";

interface Props {
    createTask: (task: task) => void
}

enum TaskActionType {
    TITLE,
    OWNER,
    DESCRIPTION,
    PRIORITY,
    DATE,
    RESET_FORM
}

// interface for formAction
interface TaskAction {
    type: TaskActionType,
    value?: string
}

// interface for formState
interface TaskState {
    title: string,
    owner: string,
    description: string,
    priority: string,
    deadline: string
}

const priorityDefault = "Urgente";

const TasksReducer: React.Reducer<TaskState, TaskAction> = (state, action) => {
    if(action.type == TaskActionType.TITLE){
        return {
            ...state,
            title: action.value!,
        }
    }        
    else if(action.type == TaskActionType.OWNER){
        return {
            ...state,
            owner: action.value!,
        }
    }
    else if(action.type == TaskActionType.DESCRIPTION){
        return {
            ...state,
            description: action.value!,
        }
    }
    else if(action.type == TaskActionType.PRIORITY){
        return {
            ...state,
            priority: action.value!,
        }
    }
    else if(action.type == TaskActionType.DATE){
        return {
            ...state,
            deadline: action.value!,
        }
    }
    else if(action.type == TaskActionType.RESET_FORM){
        return { title: "", owner: "", description: "", priority: priorityDefault, deadline: "" }
    }else{
        return { ...state }
    }
    
}

const TaskForm = (props: Props) => {

    console.log("TaskForm Running")

    const [tasks, tasksDispatch] = useReducer(TasksReducer, { title: "", owner: "", description: "", priority: priorityDefault, deadline: "" })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (tasks.title.trim() !== "") {
            const newTask: task = {
                id: Math.random(),
                title: tasks.title,
                description: tasks.description,
                owner: tasks.owner,
                priority: tasks.priority,
                deadline: tasks.deadline
            }

            props.createTask(newTask);
            tasksDispatch({type:TaskActionType.RESET_FORM})
        }
    }

    const taskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        tasksDispatch({ type:TaskActionType.TITLE, value: e.target.value });
    }

    const taskOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        tasksDispatch({ type:TaskActionType.OWNER, value: e.target.value });
    }

    const taskDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        tasksDispatch({ type:TaskActionType.DESCRIPTION, value: e.target.value });
    }
    
    const taskPriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        tasksDispatch({ type:TaskActionType.PRIORITY, value: e.target.value });
    }

    const taskDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        tasksDispatch({ type:TaskActionType.DATE, value: e.target.value });
    }


    return (
        <form onSubmit={handleSubmit} className={styles.formulario}>
            <div className={styles["form-field"]} >
                <label htmlFor="task-title">Task:</label>
                <input onChange={taskTitleChange} value={tasks.title} id="task-title" autoFocus type="text" placeholder="name of task" />
            </div>
            <div className={styles["form-field"]} >
                <label htmlFor="task-owner">Task Owner:</label>
                <input onChange={taskOwnerChange} value={tasks.owner} id="task-owner" type="text" placeholder="owner of the task" />
            </div>
            <div className={styles["form-field"]} >
                <label htmlFor="task-description">Task Description:</label>
                <textarea onChange={taskDescriptionChange} value={tasks.description} id="task-description" cols={18} rows={4} placeholder="Descripción de la tarea"></textarea>
            </div>
            <div className={styles["form-field"]} >
                <label htmlFor="task-priority">Task Priority:</label>
                <select onChange={taskPriorityChange} id="task-priority" value={tasks.priority}>
                    <option value={priorityDefault}>{priorityDefault}</option>
                    <option value="Aplazable">Aplazable</option>
                </select>
            </div>
            <div className={styles["form-field"]} >
                <label htmlFor="task-deadline">Task Deadline:</label>
                <input onChange={taskDateChange} value={tasks.deadline} type="date" id="task-deadline" />
            </div>
            <Button classes={btn_styles["add-task"]} type="submit">Guardar</Button>
        </form>
    )
}

export default React.memo(TaskForm);
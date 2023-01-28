import React, { useState } from "react";
import styles from "./taskForm.module.css";
import Button from "../UI/Button";
import btn_styles from "../UI/Button.module.css";
import type { task } from "../../types/tasks";

interface Props {
    usingLocalStorage: boolean,
    createTask: (task: task) => void,
    changedRadio: (input: React.ChangeEvent<HTMLInputElement>) => void
}

const priorityDefault = "Urgente";

const TaskForm = (props: Props) => {

    const [taskTitle, setTaskTitle] = useState("");
    const [taskOwner, setTaskOwner] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState(priorityDefault);
    const [taskDate, setTaskDate] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (taskTitle.trim() !== "") {
            const newTask: task = {
                id: Math.random().toString(),
                title: taskTitle,
                owner: taskOwner,
                description: taskDescription,
                priority: taskPriority,
                deadline: taskDate
            }

            props.createTask(newTask);
            setTaskTitle("");
            setTaskDescription("")
            setTaskOwner("")
            setTaskPriority(priorityDefault)
            setTaskDate("")
        }
    }

    const taskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value);
    }

    const taskOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskOwner(e.target.value);
    }

    const taskDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskDescription(e.target.value);
    }

    const taskPriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskPriority(e.target.value);
    }

    const taskDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDate(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.formulario}>
            <div className={styles["form-field-column"]} >
                <label htmlFor="task-title">Task:</label>
                <input onChange={taskTitleChange} id="task-title" value={taskTitle} autoFocus type="text" placeholder="name of task" />
            </div>
            <div className={styles["form-field-column"]} >
                <label htmlFor="task-owner">Task Owner:</label>
                <input onChange={taskOwnerChange} id="task-owner" value={taskOwner} type="text" placeholder="owner of the task" />
            </div>
            <div className={styles["form-field-column"]} >
                <label htmlFor="task-description">Task Description:</label>
                <textarea onChange={taskDescriptionChange} id="task-description" value={taskDescription} cols={18} rows={4} placeholder="Descripción de la tarea">
                </textarea>
            </div>
            <div className={styles["form-field-column"]} >
                <label htmlFor="task-priority">Task Priority:</label>
                <select onChange={taskPriorityChange} id="task-priority" value={taskPriority}>
                    <option value={priorityDefault}>{priorityDefault}</option>
                    <option value="Aplazable">Aplazable</option>
                </select>
            </div>
            <div className={styles["form-field-column"]} >
                <label htmlFor="task-deadline">Task Deadline:</label>
                <input onChange={taskDateChange} value={taskDate} type="date" id="task-deadline" />
            </div>
            <div className={[styles["form-field-column"], styles["smaller-font"]].join(' ')} >
                <label>
                    <input onChange={props.changedRadio} checked={props.usingLocalStorage} type="radio" name="choice" value="local_storage" />
                    Tasks in LocalStorage
                </label>
                <label>
                    <input onChange={props.changedRadio} checked={!props.usingLocalStorage} type="radio" name="choice" value="remote_DB" />
                    Tasks in Remote Database
                </label>
            </div>
            <Button classes={btn_styles["add-task"]} type="submit">Guardar</Button>
        </form>
    )
}

export default TaskForm;
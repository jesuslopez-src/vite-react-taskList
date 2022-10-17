import React, { useState } from "react";
import styles from "../styles/taskForm.module.css";
import type { task } from "../data/tasks";

interface Props{
    createTask : (task:task) => void
}

const TaskForm = (props:Props) => {

    const [input,setInput] = useState("");
    const [textarea,setTextarea] = useState("");

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(input.trim() !== ""){
            crearTarea(input.trim(),textarea)
            setInput("");
            setTextarea("");
        }
    }

    const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const textAreaChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextarea(e.target.value)
    }

    const crearTarea = (title:string,description:string) => {
        const newTask:task = {id:Math.random(),title,description}
        props.createTask(newTask);
    };


    return( 
    <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className = {styles["form-input"]} >
            <label htmlFor="task-title">Task:</label>
            <input onChange={inputChange} id="task-title" value={input} autoFocus type="text" placeholder="name of task" />
        </div>
        <div className = {styles["form-input"]} >
            <label htmlFor="task-owner">Task Owner:</label>
            <input id="task-owner" type="text" placeholder="owner of the task" />
        </div>
        <div className = {styles["form-input"]} >
            <label htmlFor="task-description">Task Description:</label>
            <textarea value={textarea} id="task-description" onChange={textAreaChange} cols={18} rows={4} placeholder="Descripción de la tarea"></textarea>
        </div>
        <div className = {styles["form-input"]} >
            <label htmlFor="task-priority">Task Priority:</label>
            <select id="task-priority" defaultValue="1">
                <option value="1">Urgente</option>
                <option value="2">Aplazable</option>
            </select>
        </div>
        <div className = {styles["form-input"]} >
            <label htmlFor="task-deadline">Task Deadline:</label>
            <input type="date" id="task-deadline" />
        </div>
        
        <button type="submit">Guardar</button>
    </form>
    )
}

export default TaskForm;
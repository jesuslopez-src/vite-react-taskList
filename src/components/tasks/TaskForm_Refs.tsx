import React, { useRef } from "react";
import styles from "./taskForm.module.css";
import Button from "../UI/Button";
import type { task } from "../../types/tasks";

interface Props{
    createTask : (task:task) => void
}

const priorityDefault = "Urgente";

const TaskForm = (props:Props) => {

    const taskTitleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const taskOwnerRef = useRef<HTMLInputElement>(null)
    const priorityRef = useRef<HTMLSelectElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(taskTitleRef.current!.value.trim() !== ""){
            const newTask:task = {
                id : Math.random(),
                title : taskTitleRef.current!.value,
                description : descriptionRef.current!.value,
                owner : taskOwnerRef.current!.value,
                priority : priorityRef.current!.value,
                deadline : dateRef.current!.value
            }
            
            props.createTask(newTask);
            taskTitleRef.current!.value = ""
            descriptionRef.current!.value = "";
            taskOwnerRef.current!.value = "";
            priorityRef.current!.value = priorityDefault;
            dateRef.current!.value = "";
        }
    }

    return( 
    <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className = {styles["form-field"]} >
            <label htmlFor="task-title">Task:</label>
            <input ref={taskTitleRef} id="task-title" autoFocus type="text" placeholder="name of task" />
        </div>
        <div className = {styles["form-field"]} >
            <label htmlFor="task-owner">Task Owner:</label>
            <input ref= {taskOwnerRef} id="task-owner" type="text" placeholder="owner of the task" />
        </div>
        <div className = {styles["form-field"]} >
            <label htmlFor="task-description">Task Description:</label>
            <textarea ref={descriptionRef} id="task-description" cols={18} rows={4} placeholder="Descripción de la tarea"></textarea>
        </div>
        <div className = {styles["form-field"]} >
            <label htmlFor="task-priority">Task Priority:</label>
            <select ref={priorityRef} id="task-priority" defaultValue={priorityDefault}>
                <option value={priorityDefault}>{priorityDefault}</option>
                <option value="Aplazable">Aplazable</option>
            </select>
        </div>
        <div className = {styles["form-field"]} >
            <label htmlFor="task-deadline">Task Deadline:</label>
            <input ref={dateRef} type="date" id="task-deadline" />
        </div>
        <Button classes="add-task" type="submit">Guardar</Button>
    </form>
    )
}

export default TaskForm;
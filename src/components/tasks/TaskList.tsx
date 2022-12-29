import TaskRow from "./TaskRow";
import { TaskContext, Context } from "../../TaskContext";
import { useState,useContext } from "react";
import styles from "./taskList.module.css"

interface Props {
    removeTask: (id: number) => void,
}

const TaskList = (props: Props) => {

    console.log("Running TaskList")

    const contexto = useContext<Context>(TaskContext)
    const [disableBtns,setDisableBtns] = useState(false);

    if (contexto.tareas.length === 0) {
        return <h1>No hay tareas</h1>
    }

    return (
        <table className={styles['text-center']}>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Owner</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    contexto.tareas.map(task =>
                        <TaskRow task={task} key={task.id} removeTask={props.removeTask} disableBtns={disableBtns} setDisableBtns={setDisableBtns}/>
                    )
                }
            </tbody>

        </table>);
}

export default TaskList;
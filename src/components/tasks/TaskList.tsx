import TaskRow from "./TaskRow";
import { TaskContext, Context } from "../../TaskContext";
import React, { useContext } from "react";
import styles from "./taskList.module.css"
import type { task } from "../../types/tasks";

interface Props {
    removeTask: (id: string) => void,
}

const TaskList = (props: Props) => {

    console.log("Running TaskList")

    const contexto = useContext<Context>(TaskContext)
    // let copied_tasks:task[] = JSON.parse(JSON.stringify(contexto.tareas))
    // console.log(copied_tasks);

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
                        <TaskRow task={task} key={task.id} removeTask={props.removeTask} />
                    )
                }
            </tbody>
        </table>);
}

export default React.memo(TaskList);
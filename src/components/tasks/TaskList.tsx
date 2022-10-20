import TaskRow from "./TaskRow";
import { TaskContext, Context } from "../../TaskContext";
import { useContext } from "react";
import styles from "./taskList.module.css"

interface Props {
    removeTask: (id: number) => void
}

const TaskList = (props: Props) => {

    const contexto = useContext<Context>(TaskContext)

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

export default TaskList;
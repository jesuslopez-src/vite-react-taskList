import type { task } from "../../types/tasks";
import styles from "./taskRow.module.css";
import Button from "../UI/Button";

interface Props {
    task: task,
    removeTask: (id: number) => void
}

const TaskRow = ({ task, removeTask }: Props) => {

    return (
        <tr>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.owner}</td>
            <td>{task.priority}</td>
            <td>{task.deadline}</td>
            <td>
                <Button classes="delete-task" type='button' onClick={()=>removeTask(task.id)}>Eliminar Tarea</Button>
            </td>
        </tr>
    )
}

export default TaskRow;
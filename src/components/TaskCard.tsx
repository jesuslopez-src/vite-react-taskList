import type {task} from "../data/tasks"
import styles from "../styles/taskCard.module.css"

interface Props{
    task:task,
    removeTask : (id:number) => void
}

const TaskCard = ({task,removeTask}:Props) => {
    
    return(
        <li>
            <p>{task.title}</p>
            <p className={task.description?"":styles['no-descrip']}>
                {task.description? task.description: '< No description provided >'}
            </p>
            <button onClick={() => removeTask(task.id)}>Eliminar Tarea</button>
        </li>
    )
}

export default TaskCard;
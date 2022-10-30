import type { task } from "../../types/tasks";
// import styles from "./taskRow.module.css";
import btn_styles from "../UI/Button.module.css";
import { useState } from "react";
import ReactDOM from "react-dom";

import Button from "../UI/Button";
import { Overlay,Modal } from "../UI/Overlay_Modal";

interface Props {
    task: task,
    removeTask: (id: number) => void
}

const TaskRow = ({ task, removeTask }: Props) => {

    const [showOverlay, setShowOverlay] = useState(false);

    const toggleModal = () => {
        setShowOverlay((prevstate) => !prevstate)
    }


    return (
        <>
            <tr>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.owner}</td>
                <td>{task.priority}</td>
                <td>{task.deadline}</td>
                <td>
                    {/* <Button classes="delete-task" type='button' onClick={()=>removeTask(task.id)}>Eliminar Tarea</Button> */}
                    <Button classes={btn_styles["delete-task"]} type='button' onClick={toggleModal}>Eliminar Tarea</Button>
                </td>
            </tr>
            {showOverlay ? document.body!.classList.add("hide_overflow")
             :document.body!.classList.remove("hide_overflow")}
            {showOverlay ? ReactDOM.createPortal(
            <Overlay>
                <Modal toggleModal={toggleModal} removeTask={removeTask} taskID={task.id} title="Delete Task" message="Are you sure you want to delete this task?"/>
            </Overlay>, document.getElementById("root")!) : null}
        </>
    )
}

export default TaskRow;
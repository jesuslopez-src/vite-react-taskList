import type { task } from "../../types/tasks";
// import styles from "./taskRow.module.css";
import btn_styles from "../UI/Button.module.css";
import { useState } from "react";
import ReactDOM from "react-dom";

import Button from "../UI/Button";
import { Overlay,Modal } from "../UI/Overlay_Modal";

interface Props {
    task: task,
    removeTask: (id: string) => void,
}

const TaskRow = ({ task, removeTask }: Props) => {

    console.log("Running TaskRow")

    const [showOverlay, setShowOverlay] = useState(false);

    const showModal = () => {
        document.body!.classList.add("hide_overflow")
        setShowOverlay(true)
    }

    const removeTaskAction = () =>{
        setShowOverlay(false)
        removeTask(task.id)
    }

    const cancelModalAction = () => {
        setShowOverlay(false)   
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
                    <Button classes={btn_styles["delete-task"]} type='button' onClick={showModal}>Eliminar Tarea</Button>
                </td>
            </tr>
            {showOverlay ? ReactDOM.createPortal(
            <Overlay>
                <Modal actionBtnText={"Delete Task"} action={removeTaskAction} cancelModalAction={cancelModalAction} title="Delete Task" message="Are you sure you want to delete this task?"/>
            </Overlay>, document.getElementById("root")!) : null}
        </>
    )
}

export default TaskRow;
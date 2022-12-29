import type { task } from "../../types/tasks";
// import styles from "./taskRow.module.css";
import btn_styles from "../UI/Button.module.css";
import { useState } from "react";
import ReactDOM from "react-dom";

import Button from "../UI/Button";
import { Overlay,Modal } from "../UI/Overlay_Modal";

interface Props {
    task: task,
    disableBtns:boolean,
    setDisableBtns:React.Dispatch<React.SetStateAction<boolean>>,
    removeTask: (id: number) => void
}

const TaskRow = ({ disableBtns,setDisableBtns,task, removeTask }: Props) => {

    console.log("Running TaskRow")

    const [showOverlay, setShowOverlay] = useState(false);

    const HandleSomeStates = (Overlay:boolean,Btns:boolean)=>{
        setDisableBtns(Btns)
        setShowOverlay(Overlay)
    }

    const showModal = () => {
        document.body!.classList.add("hide_overflow")
        HandleSomeStates(true,true)
    }

    const removeTaskAction = () =>{
        HandleSomeStates(false,false)
        removeTask(task.id)
    }

    const cancelModalAction = () => {
        HandleSomeStates(false,false)
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
                    <Button disable={disableBtns}  classes={btn_styles["delete-task"]} type='button' onClick={showModal}>Eliminar Tarea</Button>
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
import { ReactNode } from "react"
import {task} from "../../types/tasks";
import Button from "./Button"
import styles from  "./Overlay_Modal.module.css"
import btn_styles from "./Button.module.css";

interface Props_Modal{
    title:string,
    message:string,
    action:()=>void,
    cancelModalAction:()=>void,
    actionBtnText:string
}

interface Props_Overlay{
    children:ReactNode
}

export const Overlay = (props:Props_Overlay)=>{
    return(
        <div className={styles.overlay}>
            {props.children}
        </div>
    )
}
export const Modal = (props:Props_Modal) =>{

    const runAction = ()=>{
        document.body!.classList.remove("hide_overflow")
        props.action();
    }

    const cancelAction = () =>{
        document.body!.classList.remove("hide_overflow")
        props.cancelModalAction();
    }

    return(
        <div className={styles.modal_card}>
            <h2 className={styles.modal_card__title}>{props.title}</h2>
            <p className={styles.modal_card__message}>{props.message}</p>
            <div className={styles.modal_card__buttons}>
                <Button onClick={runAction} type="button" classes={btn_styles["delete-task"]}>{props.actionBtnText}</Button>
                <Button onClick={cancelAction} type="button" classes={btn_styles["cancel-modal"]}>Cancel</Button>  
            </div>
        </div>
    )
}
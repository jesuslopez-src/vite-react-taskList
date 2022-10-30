import { ReactNode } from "react";
import styles from "./Button.module.css"

interface Props{
    type:'button'|'submit',
    children:ReactNode,
    onClick?:React.MouseEventHandler,
    classes?:string
}

const Button = (props:Props) =>{

    return(
        <button className={`${styles.button} ${props.classes? props.classes:''}`.trim()} onClick={props.onClick} type={props.type}>
            {props.children}
        </button>
    )
}

export default Button;
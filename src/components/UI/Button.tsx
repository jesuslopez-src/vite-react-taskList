import React, { ReactNode } from "react";
import styles from "./Button.module.css"

interface Props{
    type:'button'|'submit',
    disable?:boolean,
    children:ReactNode,
    onClick?:React.MouseEventHandler,
    classes?:string
}

const Button = (props:Props) =>{

    console.log("Button running")

    return(
        <button disabled={props.disable} className={`${styles.button} ${props.classes? props.classes:''}`.trim()} onClick={props.onClick} type={props.type}>
            {props.children}
        </button>
    )
}

// we use memo to avoid re-evaluation of this component
// e.g changing state in the form.
// this is a small component so the use of memo is
// cuestionable here
export default React.memo(Button);
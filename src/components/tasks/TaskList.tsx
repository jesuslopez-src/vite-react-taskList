import TaskRow from "./TaskRow";
import React from "react";
import { TaskContext, Context } from "../../TaskContext";
import { useContext } from "react";
import styles from "./taskList.module.css"
// import type { task } from "../../types/tasks";

//to use with redux
import {useAppSelector} from "../../hooks/ReduxHooks"

interface Props {
    removeTask: (id: string) => void,
}

const TaskList = (props: Props) => {

    console.log("Running TaskList")

    const usingContext = false;
    //Context API
    const tasks = usingContext?
    useContext<Context>(TaskContext).tareas:
    useAppSelector(state=>state.tasks.tasks)

    //redux
    // const tasks =  useAppSelector(state=>state.tasks.tasks)

    if (tasks.length === 0) {
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
                    tasks.map(task =>
                        <TaskRow task={task} key={task.id} removeTask={props.removeTask} />
                    )
                }
            </tbody>
        </table>);
}

export default React.memo(TaskList);
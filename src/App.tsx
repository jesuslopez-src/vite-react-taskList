import styles from './App.module.css'
import {TaskContextProvider} from "./TaskContext"

function App() {

  console.log("App Running")

  return (
    <div className={styles['app-wraper']}>
      <TaskContextProvider/>
    </div>
  )
}

export default App

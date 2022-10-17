import styles from './App.module.css'
import {TaskContextProvider} from "./TaskContext"

function App() {

  return (
    <div className={styles['app-wraper']}>
      <TaskContextProvider/>
    </div>
  )
}

export default App

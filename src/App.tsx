import styles from './App.module.css'
// import { TaskContextProvider } from "./TaskContext"
import { TaskWithRedux } from "./TaskWithRedux"

function App() {

  console.log("App Running")

  return (
    <div className={styles['app-wraper']}>
      {/* <TaskContextProvider/> */}
      <TaskWithRedux/>
    </div>
  )
}

export default App

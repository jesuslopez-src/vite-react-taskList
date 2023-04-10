import styles from './App.module.css'
// import { TaskContextProvider } from "./TaskContext"
import { TaskWithRedux } from "./TaskWithRedux"

// usando firebase/firestore
import { db } from "./firebase/config"
import { collection, getDocs } from "firebase/firestore";

function App() {

  console.log("App Running")

  const datos = async () => {
    
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
    })
  }

  datos();

  return (
    <div className={styles['app-wraper']}>
      {/* <TaskContextProvider/> */}
      <TaskWithRedux/>
    </div>
  )
}

export default App

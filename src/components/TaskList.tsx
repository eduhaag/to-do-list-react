import {Task} from './Task'

import styles from './TaskList.module.css';

interface Task {
  id: string,
  content: string,
  done:boolean,
}

interface TasksProps{
  tasks: Task[],
  deleteTask: (taskId:string)=>void,
  markTaskDone: (taskId:string)=>void,
}


export function TaskList({tasks, deleteTask,markTaskDone}: TasksProps,){
  return(
    <ul className={styles.tasksList}>
    {
      tasks.map((task=>{
        return(
          <Task 
            key={task.id}
            id={task.id}
            content={task.content} 
            done={task.done}
            onDeleteTask={deleteTask}
            onCheckTask={markTaskDone}
          />
        )
      }))
    }
  </ul>
  )
}
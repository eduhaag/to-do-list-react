import {Trash, Check} from 'phosphor-react'

import styles from './Task.module.css';
import { ChangeEvent } from 'react';

interface TaskProps {
  id: string,
  content: string,
  done:boolean,
  onDeleteTask: (taskId:string)=>void;
  onCheckTask: (taskId:string)=>void;
}

export function Task({id, content, done, onDeleteTask, onCheckTask}:TaskProps){
  
  function handleDeleteTask(){
    onDeleteTask(id);
  }

  function handleCheckTask(){
    onCheckTask(id);
  }

  return (
    <li  className={styles.task}>
      <span 
        className={`${styles.checkbox} ${done? styles.checkboxDone : styles.checkboxUndone}`}
        onClick={handleCheckTask}
      >
        <Check className={done? styles.checkIconDone: styles.checkIconUndone}/>
      </span>
      <p className={`${styles.content} ${done? styles.doneTaskContent:''}`}>{content}</p>
      <Trash className={styles.deleteButton} size={16} onClick={handleDeleteTask} />
    </li>
  )
}
import {PlusCircle, ClipboardText} from 'phosphor-react';
import uuid from 'react-uuid';

import { Header } from './components/Header';

import styles from './App.module.css';
import './global.css';
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react';
import { Task } from './components/Task';
import { TaskList } from './components/TaskList';

interface Task {
  id: string;
  content: string;
  done: boolean
}

export function App(){
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [doneTaskCouter, setDoneTaskCouter] = useState(0);

  useEffect(()=>{
    const counter= tasks.reduce((acc, task)=>{
      if(task.done){
        return acc+1;
      }

      return acc;
    },0)

    setDoneTaskCouter(counter);
  },[tasks])

  function handleCreateNewTask(event: FormEvent){
    event.preventDefault();

    const newTask:Task ={
      id: uuid(),
      done: false,
      content: newTaskInput
    }

    setTasks([...tasks, newTask]);
    setNewTaskInput('');
  }

  function handleNewTaskInputChange(event:ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('');

    setNewTaskInput(event.target.value);
  }

  function handleInvalidNewTask(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity('Este campo é obrigatório!');
  }

  function deleteTask(taskId:string){
    const taskListWithoutDeletedTask = tasks.filter(task=>task.id!==taskId);

    setTasks(taskListWithoutDeletedTask);
  }

  function checkTask(taskId: string) {
    const newTaskList = tasks.map(task=>{
      if(task.id===taskId){
        return {
          id: task.id,
          content: task.content,
          done: task.done? false : true,
        }
      }
      else{
        return task;
      }
    });
    setTasks(newTaskList);
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <form onSubmit={handleCreateNewTask}>
          <input 
            type="text" 
            placeholder='Adicione uma nova tarefa'
            value={newTaskInput}
            onChange={handleNewTaskInputChange}
            required
            onInvalid={handleInvalidNewTask}
          />
          <button type="submit">
            Criar
            <PlusCircle size={16} />
          </button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.counters}>
            <div className={styles.totalTasks}>
              <strong>Tarefas criadas</strong>
              <span>{tasks.length}</span>
            </div>
            <div className={styles.totalCheckedTasks}>
              <strong>Concluídas</strong>
              <span>{doneTaskCouter} de {tasks.length}</span>
            </div>
          </div>

          {
            tasks.length>0 
            ? 
            <TaskList tasks={tasks} deleteTask={deleteTask} markTaskDone={checkTask}/>
            :
            <div className={styles.emptyList}>
              <ClipboardText size={56}/>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          }

        </div>
      </main>
    </>


  )
}
import styles from './Header.module.css';

import logoTodo from '../assets/logo.svg'

export function Header(){
  return(
    <header className={styles.header}>
      <img src={logoTodo} alt="Logo do ToDo List" />
    </header>
  )
}
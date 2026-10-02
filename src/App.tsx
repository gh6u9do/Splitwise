import { useState } from 'react';
import styles from './App.module.css';
import { Button } from './components/ui/Button/Button';
import { Input } from './components/ui/Input/Input';

function App() {
  

  return (
    <>
     <section className={styles.wrapper}>
        <Button>Кнопка</Button>
        <Input type='text'>Имя</Input>
     </section>
      
    </>
  )
}

export default App